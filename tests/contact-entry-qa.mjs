import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const base = process.env.QA_BASE_URL || 'http://localhost:3200';
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium',
  args: ['--no-sandbox'],
});
const context = await browser.newContext({ locale: 'de-DE', reducedMotion: 'reduce' });
const page = await context.newPage();
const report = {
  testedAt: new Date().toISOString(),
  anchorWidths: [],
  directLinks: 0,
  legalPages: [],
  runtimeErrors: [],
};
page.on('pageerror', (error) => report.runtimeErrors.push(error.message));
await mkdir('work/contact-entry', { recursive: true });
try {
  for (const width of [320, 390, 768, 1100, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(base);
    await page.waitForLoadState('networkidle');
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    if (width === 390 || width === 1440) {
      await page.screenshot({ path: `work/contact-entry/home-${width}.png`, fullPage: true });
      await page.screenshot({ path: `work/contact-entry/hero-${width}.png` });
    }
    await page.getByRole('link', { name: 'Zum WhatsApp-Formular', exact: true }).click();
    assert.equal(new URL(page.url()).hash, '#whatsapp-formular');
    const anchor = page.locator('#whatsapp-formular');
    const bounds = await anchor.boundingBox();
    const header = await page.locator('.site-header').boundingBox();
    assert.ok(
      bounds.y >= header.height && bounds.y < 220,
      `anchor hidden at ${width}: ${bounds.y}`,
    );
    assert.equal(await page.evaluate(() => document.activeElement?.id), 'whatsapp-formular');
    report.anchorWidths.push(width);
  }
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto(base);
  await page.locator('input[name="name"]').fill('Private Testeingabe');
  for (const root of ['.floating-contact', '.mobile-actions', '.site-footer']) {
    const contacts = page.locator(`${root} a[href^="https://wa.me/"], ${root} a[href^="mailto:"]`);
    for (const link of await contacts.all()) {
      const url = new URL(await link.getAttribute('href'));
      assert.equal(url.search, '', `unexpected prefilled contact: ${url}`);
      report.directLinks++;
    }
  }
  assert.ok(report.directLinks >= 6);
  for (const route of ['/impressum', '/datenschutz']) {
    await page.goto(base + route);
    const body = await page.locator('main').innerText();
    for (const value of ['Naeem Ahmed', 'Zittschower Weg 11a', '23909 Ratzeburg'])
      assert.ok(body.includes(value));
    assert.doesNotMatch(body, /VOM BETREIBER|ZU ERGÄNZEN|Betreiberprüfung|Entwurf –/);
    if (route === '/impressum')
      for (const value of ['DE221613879', '600138210', '27 001 02189', '21493 Elmenhorst'])
        assert.ok(body.includes(value));
    else
      for (const value of [
        'Vercel',
        'WhatsApp Ireland Limited',
        'Art. 21',
        'Art. 77',
        'ohne vorgegebenen Nachrichtentext',
      ])
        assert.ok(body.includes(value));
    report.legalPages.push(route);
  }
  assert.deepEqual(report.runtimeErrors, []);
  console.log(JSON.stringify(report));
} finally {
  await writeFile(
    'docs/reports/contact-entry-browser.json',
    JSON.stringify(report, null, 2) + '\n',
  );
  await browser.close();
}
