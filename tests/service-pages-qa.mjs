import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const base = process.env.QA_BASE_URL || 'http://localhost:3000';
const services = [
  ['/taxifahrten', 'Taxifahrt'],
  ['/krankenfahrten', 'Krankenfahrt'],
  ['/flughafentransfer', 'Flughafentransfer'],
  ['/geschaeftsfahrten', 'Geschäftsfahrt'],
  ['/kinderfahrten', 'Kinderfahrt'],
  ['/kurierfahrten', 'Kurierfahrt'],
];
const report = { testedAt: new Date().toISOString(), pages: [], requests: [], runtimeErrors: [] };
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium',
  args: ['--no-sandbox'],
});
const context = await browser.newContext({ locale: 'de-DE', reducedMotion: 'reduce' });
const page = await context.newPage();
page.on('pageerror', (error) => report.runtimeErrors.push(error.message));
await mkdir('work/services', { recursive: true });
try {
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [route, type] of services) {
      await page.goto(base + '/leistungen');
      const link = page.locator(`.services-grid a[href="${route}"]`);
      assert.equal(await link.count(), 1, route);
      await link.click();
      await page.waitForURL(base + route);
      await page.waitForLoadState('networkidle');
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('select[name="rideType"]').inputValue(), type);
      assert.ok((await page.locator('link[rel="canonical"]').getAttribute('href')).endsWith(route));
      assert.ok(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
        route,
      );
      const axe = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();
      assert.deepEqual(
        axe.violations.map((v) => ({ id: v.id, targets: v.nodes.map((n) => n.target) })),
        [],
        route,
      );
      report.pages.push({ route, width, preset: type, violations: 0 });
      if (width === 390)
        await page.screenshot({ path: `work/services/${route.slice(1)}.png`, fullPage: true });
    }
  }
  for (const [route, type] of services) {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto(base + route);
    await page.evaluate(() => {
      window.__opened = [];
      window.open = (url) => {
        window.__opened.push(String(url));
        return null;
      };
    });
    const form = page.locator('.ride-form');
    await form.locator('button[type="submit"]').click();
    assert.ok(await form.getByRole('alert').isVisible());
    assert.equal((await page.evaluate(() => window.__opened)).length, 0);
    await form.locator('input[name="name"]').fill('Anna Müller');
    await form.getByLabel('Start', { exact: false }).fill('Am Markt 4, Ratzeburg');
    await form.getByLabel('Ziel', { exact: false }).fill('Lübeck Bahnhof');
    await form.locator('input[type="date"]').fill('2099-06-20');
    await form.locator('input[type="time"]').fill('12:30');
    await form.locator('textarea[name="wishes"]').fill('Details & Wünsche');
    if (type === 'Kurierfahrt') {
      assert.equal(await form.locator('select[name="passengers"]').count(), 0);
      await form.locator('select[name="rideType"]').selectOption('Taxifahrt');
      assert.ok(await form.locator('select[name="passengers"]').isVisible());
      await form.locator('select[name="rideType"]').selectOption(type);
    } else await form.locator('select[name="passengers"]').selectOption('8');
    await form.locator('button[type="submit"]').click();
    const wa = new URL((await page.evaluate(() => window.__opened)).at(-1));
    assert.equal(wa.origin, 'https://wa.me');
    const message = wa.searchParams.get('text');
    for (const text of [
      `Fahrttyp: ${type}`,
      'Name: Anna Müller',
      'Start: Am Markt 4',
      'Ziel: Lübeck',
      '20.06.2099',
      '12:30',
      'Details & Wünsche',
    ])
      assert.ok(message.includes(text), text);
    assert.equal(message.includes('Personen: 8'), type !== 'Kurierfahrt');
    assert.equal(await form.locator('input[type="tel"]').count(), 0);
    await form.getByRole('radio', { name: 'E-Mail', exact: true }).check();
    await form.locator('input[type="tel"]').fill('+49 173 1234567');
    await form.locator('button[type="submit"]').click();
    const email = new URL((await page.evaluate(() => window.__opened)).at(-1));
    assert.equal(email.protocol, 'mailto:');
    assert.ok(email.searchParams.get('body').includes('Telefon: +49 173 1234567'));
    assert.ok(email.searchParams.get('body').includes(`Fahrttyp: ${type}`));
    assert.equal(
      await form.getByLabel('Nachricht zum Kopieren').inputValue(),
      email.searchParams.get('body'),
    );
    report.requests.push({ route, whatsapp: true, email: true });
  }
  const xml = await (await context.request.get(base + '/sitemap.xml')).text();
  for (const [route] of services) assert.ok(xml.includes(route));
  assert.deepEqual(report.runtimeErrors, []);
  report.passed = true;
} finally {
  await browser.close();
  await writeFile(
    'docs/reports/service-pages-browser.json',
    JSON.stringify(report, null, 2) + '\n',
  );
}
console.log(
  JSON.stringify({
    passed: report.passed,
    pages: report.pages.length,
    requests: report.requests.length,
  }),
);
