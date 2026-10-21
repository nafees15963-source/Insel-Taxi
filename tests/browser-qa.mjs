import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
await fs.mkdir('work', { recursive: true });
const browser = await chromium.launch({
  executablePath:
    process.env.CHROMIUM_PATH ||
    (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined),
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
const context = await browser.newContext({ locale: 'de-DE', timezoneId: 'Europe/Berlin' });
const page = await context.newPage();
const failures = [],
  errors = [],
  report = { viewports: [], accessibility: [], flows: [] };
page.on('pageerror', (e) => errors.push(e.message));
const routes = [
  '/',
  '/leistungen',
  '/fahrt-anfragen',
  '/fahrpreis',
  '/krankenfahrten',
  '/flughafentransfer',
  '/kontakt',
  '/impressum',
  '/datenschutz',
];
for (const width of [320, 390, 768, 1440]) {
  await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
  for (const route of routes) {
    const r = await page.goto('http://localhost:3000' + route);
    await page.waitForLoadState('networkidle');
    const dimensions = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      client: document.documentElement.clientWidth,
    }));
    if (r.status() !== 200 || dimensions.scroll > width)
      failures.push({ width, route, status: r.status(), ...dimensions });
  }
  report.viewports.push({
    width,
    routes: routes.length,
    passed: !failures.some((x) => x.width === width),
  });
}
await page.setViewportSize({ width: 1440, height: 1000 });
for (const route of routes) {
  await page.goto('http://localhost:3000' + route);
  const axe = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  report.accessibility.push({
    route,
    violations: axe.violations.map((x) => ({
      id: x.id,
      impact: x.impact,
      nodes: x.nodes.map((n) => ({ html: n.html, summary: n.failureSummary })),
    })),
  });
}
await page.goto('http://localhost:3000/fahrt-anfragen');
await page.getByRole('button', { name: 'Per WhatsApp anfragen', exact: true }).click();
if (!(await page.locator('.form-error[role=alert]').isVisible()))
  failures.push('missing error alert');
if (
  !(await page
    .getByLabel('Wo dürfen wir Sie abholen?')
    .evaluate((e) => e === document.activeElement))
)
  failures.push('invalid field not focused');
await page.getByLabel('Wo dürfen wir Sie abholen?').fill('Am Markt 4, Ratzeburg');
await page.getByLabel('Wohin möchten Sie fahren?').fill('Hamburg Airport & Terminal 1');
await page.getByLabel('Datum', { exact: false }).first().fill('2099-06-20');
await page.getByLabel('Uhrzeit', { exact: false }).first().fill('12:30');
await page.getByLabel('Fahrgäste').selectOption('3');
await page.getByLabel('Besondere Wünsche').fill('Rollator & Hilfe');
await page.evaluate(() => {
  window.__opened = [];
  window.open = (url) => {
    window.__opened.push(String(url));
    return null;
  };
});
await page.getByRole('button', { name: 'Per WhatsApp anfragen', exact: true }).click();
const opened = await page.evaluate(() => window.__opened);
const text = new URL(opened[0]).searchParams.get('text');
if (!text.includes('Personen: 3') || !text.includes('Rollator & Hilfe'))
  failures.push('WhatsApp data missing');
report.flows.push('Ride: invalid fields, focus and encoded WhatsApp data passed');
await page.goto('http://localhost:3000/krankenfahrten');
await page.getByText('Regelmäßige Behandlungsfahrt', { exact: true }).click();
await page.getByRole('button', { name: 'Weiter', exact: true }).click();
await page.getByLabel('Wo dürfen wir Sie abholen?').fill('Ratzeburg Bahnhof');
await page.getByLabel('Wohin möchten Sie fahren?').fill('Klinik Lübeck');
await page.getByRole('button', { name: 'Weiter', exact: true }).click();
await page.getByLabel('Datum', { exact: false }).first().fill('2099-06-20');
await page.getByLabel('Uhrzeit', { exact: false }).first().fill('12:30');
await page.getByRole('button', { name: 'Weiter', exact: true }).click();
await page.getByLabel('Möchten Sie auch eine Rückfahrt anfragen?').selectOption('Ja');
await page.getByRole('button', { name: 'Weiter', exact: true }).click();
if (!(await page.locator('.form-error[role=alert]').isVisible()))
  failures.push('medical return validation missing');
await page.getByLabel('Datum der Rückfahrt').fill('2099-06-20');
await page.getByLabel('Uhrzeit der Rückfahrt').fill('16:00');
await page.getByRole('button', { name: 'Weiter', exact: true }).click();
await page.getByRole('button', { name: 'Weiter', exact: true }).click();
await page.evaluate(() => {
  window.__opened = [];
  window.open = (url) => {
    window.__opened.push(String(url));
    return null;
  };
});
await page.getByRole('button', { name: 'Per WhatsApp anfragen', exact: true }).click();
const med = await page.evaluate(() => window.__opened);
if (!new URL(med[0]).searchParams.get('text').includes('Rückfahrt: 20.06.2099 um 16:00'))
  failures.push('medical summary missing');
report.flows.push('Medical: all 6 steps, return validation and message passed');
await page.goto('http://localhost:3000/flughafentransfer');
await page.getByLabel('Richtung').selectOption('Vom Flughafen');
await page.getByLabel('Flughafen', { exact: false }).first().selectOption('Lübeck (LBC)');
if ((await page.getByLabel('Wo dürfen wir Sie abholen?').inputValue()) !== 'Lübeck (LBC)')
  failures.push('airport direction wrong');
await page.getByLabel('Wohin möchten Sie fahren?').fill('Ratzeburg Bahnhof');
await page.getByLabel('Datum', { exact: false }).first().fill('2099-06-20');
await page.getByLabel('Uhrzeit', { exact: false }).first().fill('12:30');
await page.getByLabel('Flugnummer').fill('LH123');
await page.evaluate(() => {
  window.__opened = [];
  window.open = (url) => {
    window.__opened.push(String(url));
    return null;
  };
});
await page.getByRole('button', { name: 'Per WhatsApp anfragen', exact: true }).click();
const airport = await page.evaluate(() => window.__opened);
if (!new URL(airport[0]).searchParams.get('text').includes('LH123'))
  failures.push('flight number missing');
report.flows.push('Airport: direction, airport and flight data passed');
await page.goto('http://localhost:3000/fahrpreis');
await page.getByLabel('Startadresse').fill('Ratzeburg Bahnhof');
await page.getByLabel('Zieladresse').fill('Mölln Bahnhof');
await page.getByText('Entfernung selbst angeben & Wartezeit').click();
await page.getByLabel('Entfernung in km').fill('12,5');
await page.getByRole('button', { name: 'Fahrpreis prüfen', exact: true }).click();
if (!(await page.getByText('Preis persönlich erfragen', { exact: true }).isVisible()))
  failures.push('unverified fare displayed');
if (!(await page.getByText('12,5 km', { exact: true }).isVisible()))
  failures.push('manual km missing');
report.flows.push('Fare: manual decimal distance and unverified tariff blocked passed');
await page.getByRole('button', { name: 'Datenschutzeinstellungen', exact: true }).click();
if (!(await page.getByRole('dialog').isVisible())) failures.push('privacy settings missing');
await page.getByRole('button', { name: 'Ohne Google fortfahren' }).click();
report.flows.push('Privacy dialog: opens and closes without Google passed');
const external = await page.evaluate(() =>
  performance
    .getEntriesByType('resource')
    .filter((e) => !e.name.startsWith(location.origin))
    .map((e) => e.name),
);
if (external.length) failures.push({ unexpectedExternal: external });
report.flows.push('No external resources before consent passed');
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://localhost:3000/');
await page.getByRole('button', { name: 'Menü öffnen' }).click();
await page.keyboard.press('Shift+Tab');
if (
  (await page.evaluate(() => document.activeElement?.getAttribute('href'))) !== 'tel:+494541802080'
)
  failures.push('mobile menu reverse focus trap failed');
await page.keyboard.press('Tab');
if (
  !(await page
    .getByRole('button', { name: 'Menü schließen' })
    .evaluate((e) => e === document.activeElement))
)
  failures.push('mobile menu focus trap failed');
await page.keyboard.press('Escape');
if (
  (await page.getByRole('button', { name: 'Menü öffnen' }).getAttribute('aria-expanded')) !==
  'false'
)
  failures.push('escape did not close menu');
report.flows.push('Mobile navigation: keyboard focus trap and Escape passed');
await page.goto('http://localhost:3000/');
await page.keyboard.press('Tab');
if (!(await page.locator('.skip-link').evaluate((e) => e === document.activeElement)))
  failures.push('skip link not first focus target');
await page.keyboard.press('Enter');
if (!(await page.locator('main').evaluate((e) => e === document.activeElement)))
  failures.push('skip link target not focused');
await page.locator('.faq-list summary').first().focus();
await page.keyboard.press('Enter');
if (
  !(await page.locator('.faq-list details').first().getAttribute('open')) &&
  (await page.locator('.faq-list details[open]').count()) === 0
)
  failures.push('keyboard FAQ failed');
report.flows.push('Keyboard: skip link and FAQ passed');
await page.goto('http://localhost:3000/');
await page.screenshot({ path: 'work/mobile.png', fullPage: true });
await page.setViewportSize({ width: 1440, height: 1000 });
await page.goto('http://localhost:3000/');
await page.screenshot({ path: 'work/desktop.png', fullPage: true });
await page.screenshot({ path: 'work/desktop-hero.png', fullPage: false });
const api = await page.request.post('http://localhost:3000/api/route', {
  data: { pickup: 'a', destination: 'b', consent: false },
});
if (api.status() !== 503) failures.push('missing-key API fallback failed');
report.flows.push('Routes API: missing server key returns controlled 503 passed');
const noJsContext = await browser.newContext({ javaScriptEnabled: false, locale: 'de-DE' });
const noJsPage = await noJsContext.newPage();
await noJsPage.goto('http://localhost:3000/fahrt-anfragen');
if (await noJsPage.locator('.ride-form').isVisible())
  failures.push('No-JavaScript form must not submit personal data via GET');
if ((await noJsPage.locator('a[href="tel:+494541802080"]').count()) === 0)
  failures.push('No-JavaScript phone fallback missing');
await noJsContext.close();
report.flows.push('Without JavaScript: forms hidden, direct contact remains available');
report.failures = failures;
report.runtimeErrors = errors;
await fs.writeFile('work/browser-qa.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
await browser.close();
if (failures.length || errors.length || report.accessibility.some((a) => a.violations.length))
  process.exitCode = 1;
