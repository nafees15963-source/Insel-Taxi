import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const base = process.env.QA_BASE_URL || 'http://localhost:3000';
const reportDir = process.env.QA_REPORT_DIR || '/workspace/work/qa';
await fs.mkdir(reportDir, { recursive: true });
const report = { date: new Date().toISOString(), base, routes: [], interactions: [], pageErrors: [], externalRequests: [], failedRequests: [] };
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/usr/bin/chromium', headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, locale: 'de-DE', timezoneId: 'Europe/Berlin', reducedMotion: 'reduce' });
const page = await context.newPage();
page.on('pageerror', error => report.pageErrors.push(error.message));
page.on('request', request => { if (!request.url().startsWith(base) && /^https?:/.test(request.url())) report.externalRequests.push(request.url()); });
page.on('response', response => { if (response.status() >= 400) report.failedRequests.push({ url: response.url(), status: response.status() }); });
const routes = ['/', '/leistungen/', '/fahrt-anfragen/', '/krankenfahrten/', '/flughafentransfer/', '/fahrpreis/', '/kontakt/', '/impressum/', '/datenschutz/'];

async function run(name, work) {
  try { await work(); report.interactions.push({ name, passed: true }); console.log(`PASS ${name}`); }
  catch (error) { report.interactions.push({ name, passed: false, message: error.message }); console.log(`FAIL ${name}: ${error.message}`); }
}
async function visit(path) { await page.goto(`${base}${path}`, { waitUntil: 'networkidle' }); await page.evaluate(() => document.fonts.ready); }
async function overflow() {
  return page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
    elements: [...document.querySelectorAll('body *')].filter(e => e.getBoundingClientRect().right > innerWidth + 1 && getComputedStyle(e).position !== 'absolute').slice(0, 8).map(e => `${e.tagName}.${e.className}`) }));
}

try {
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: width > 760 ? 1000 : 844 });
    for (const path of routes) {
      await visit(path);
      const layout = await overflow();
      const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      report.routes.push({ width, path, title: await page.title(), h1Count: await page.locator('h1').count(), layout,
        violations: axe.violations.map(v => ({ id: v.id, impact: v.impact, description: v.description, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })) });
      console.log(`${width} ${path} overflow=${layout.scrollWidth > width} axe=${axe.violations.length}`);
      if (path === '/' && (width === 1440 || width === 390)) await page.screenshot({ path: `${reportDir}/home-${width}.png`, fullPage: true });
      if (path === '/fahrt-anfragen/' && width === 390) await page.screenshot({ path: `${reportDir}/form-mobile.png`, fullPage: true });
    }
  }

  await run('Mobile menu keyboard loop, Escape, link close and desktop resize', async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    await visit('/');
    const toggle = page.getByRole('button', { name: 'Menü öffnen' });
    await toggle.click();
    const openToggle = page.getByRole('button', { name: 'Menü schließen' });
    const last = page.locator('#mobile-menu > a');
    await last.focus(); await page.keyboard.press('Tab');
    assert.equal(await openToggle.evaluate(e => e === document.activeElement), true);
    await page.keyboard.press('Shift+Tab');
    assert.equal(await last.evaluate(e => e === document.activeElement), true);
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#mobile-menu').count(), 0);
    assert.equal(await toggle.evaluate(e => e === document.activeElement), true);
    await toggle.click(); await page.setViewportSize({ width: 1440, height: 1000 });
    await page.waitForFunction(() => !document.querySelector('#mobile-menu'));
    await page.setViewportSize({ width: 390, height: 844 });
    await toggle.click();
    await page.locator('#mobile-menu').getByRole('link', { name: 'Kontakt', exact: true }).click();
    await page.waitForURL('**/kontakt/');
    assert.equal(await page.locator('#mobile-menu').count(), 0);
  });

  await run('Quick request keeps addresses out of query strings and removes private hash', async () => {
    await visit('/');
    await page.getByLabel('Wo dürfen wir Sie abholen?').fill('Möllner Straße 1 & Eingang B, Ratzeburg');
    await page.getByLabel('Wohin möchten Sie?').fill('Bahnhof Ratzeburg');
    await page.getByRole('button', { name: 'Fahrt vorbereiten' }).click();
    await page.waitForURL('**/fahrt-anfragen/**');
    await page.waitForFunction(() => location.hash === '#anfrage');
    assert.equal(new URL(page.url()).search, '');
    assert.equal(await page.getByLabel(/^Abholort/).inputValue(), 'Möllner Straße 1 & Eingang B, Ratzeburg');
    assert.equal(await page.getByLabel(/^Zielort/).inputValue(), 'Bahnhof Ratzeburg');
  });

  const future = new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10);
  const returning = new Date(Date.now() + 4 * 86400000).toISOString().slice(0, 10);
  const display = value => value.split('-').reverse().join('.');
  for (const mode of ['taxi', 'medical', 'airport']) {
    await run(`${mode}: required errors, 9 passengers, return, summary and exact WhatsApp message`, async () => {
      await page.setViewportSize({ width: 390, height: 844 });
      await visit(mode === 'taxi' ? '/fahrt-anfragen/' : mode === 'medical' ? '/krankenfahrten/' : '/flughafentransfer/');
      const form = page.locator('.ride-form-full');
      await form.getByRole('button', { name: 'Weiter zu den Details' }).click();
      assert.ok(await form.locator('[aria-invalid=true]').count() >= 2);
      if (mode === 'medical') await form.getByLabel('Art der Fahrt').selectOption({ label: 'Arzt- oder Behandlungstermin' });
      if (mode === 'airport') {
        await form.getByLabel('Flughafen', { exact: false }).selectOption({ label: 'Hamburg (HAM)' });
        await form.getByLabel('Richtung').selectOption('from');
      }
      const pickup = mode === 'airport' ? 'Hamburg (HAM)' : 'Möllner Straße 1, Ratzeburg';
      const destination = 'Bäckerstraße 2 & Hintereingang, Ratzeburg';
      await form.getByLabel(/^Abholort/).fill(pickup);
      await form.getByLabel(/^Zielort/).fill(destination);
      await form.getByRole('button', { name: 'Weiter zu den Details' }).click();
      await form.getByRole('button', { name: 'Anfrage prüfen' }).click();
      assert.ok(await form.locator('[aria-invalid=true]').count() >= 2);
      await form.getByLabel('Datum *', { exact: true }).fill('2020-01-01');
      await form.getByLabel('Abholzeit').fill('14:30');
      await form.getByRole('button', { name: 'Anfrage prüfen' }).click();
      assert.equal(await form.getByLabel('Datum *', { exact: true }).getAttribute('aria-invalid'), 'true');
      await form.getByLabel('Datum *', { exact: true }).fill(future);
      await form.getByLabel('Fahrgäste').selectOption('9');
      await form.getByLabel('Gepäckstücke').fill('3');
      await form.getByLabel('Ich möchte auch eine Rückfahrt anfragen.').check();
      await form.getByLabel('Rückfahrtdatum').fill(returning);
      await form.getByLabel('Rückfahrtzeit').fill('08:00');
      await form.getByLabel('Hinweise zur Rückfahrt').fill('Abholung am Bahnhof');
      await form.getByLabel('Ihr Name').fill('Müller');
      await form.getByLabel('Besondere Wünsche').fill('Kindersitz bitte\nEingang B + Rückruf');
      if (mode === 'airport') await form.getByLabel('Flugnummer').fill('LH 123');
      await form.getByRole('button', { name: 'Anfrage prüfen' }).click();
      await form.getByRole('heading', { name: 'Ist alles richtig?' }).waitFor();
      const expected = ['Hallo Insel Taxi, ich möchte folgende Fahrt unverbindlich anfragen:', '',
        `Fahrt: ${mode === 'taxi' ? 'Taxifahrt' : mode === 'medical' ? 'Krankenfahrt' : 'Flughafentransfer'}`,
        ...(mode === 'medical' ? ['Anlass: Arzt- oder Behandlungstermin'] : []),
        ...(mode === 'airport' ? ['Flughafen: Hamburg (HAM)', 'Richtung: Vom Flughafen'] : []),
        `Abholort: ${pickup}`, `Zielort: ${destination}`, `Datum: ${display(future)}`,
        'Abholzeit: 14:30 Uhr (Ortszeit Ratzeburg)', 'Fahrgäste: 9',
        'Gruppenanfrage: 9 Personen – bitte passende Fahrzeugaufteilung bestätigen.', 'Gepäckstücke: 3',
        ...(mode === 'airport' ? ['Flugnummer: LH 123'] : []),
        `Rückfahrt: ${display(returning)}, 08:00 Uhr (Ortszeit Ratzeburg)`, 'Hinweise zur Rückfahrt: Abholung am Bahnhof',
        'Name: Müller', 'Besondere Wünsche: Kindersitz bitte\nEingang B + Rückruf', '',
        'Bitte bestätigen Sie die Verfügbarkeit und die Fahrtdetails. Vielen Dank!'].join('\n');
      const href = await form.getByRole('link', { name: 'In WhatsApp öffnen' }).getAttribute('href');
      assert.equal(href, `https://wa.me/491739189239?text=${encodeURIComponent(expected)}`);
      assert.equal(await form.getByRole('link', { name: '04541 802080' }).getAttribute('href'), 'tel:+494541802080');
      assert.match(await form.innerText(), /erst nach unserer persönlichen Bestätigung/);
      const layout = await overflow(); assert.ok(layout.scrollWidth <= 390, `Summary overflow ${layout.scrollWidth}`);
      const axe = await new AxeBuilder({ page }).include('.ride-form-full').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      assert.deepEqual(axe.violations.map(v => v.id), []);
      await page.screenshot({ path: `${reportDir}/${mode}-summary-mobile.png`, fullPage: true });
      await form.getByRole('button', { name: 'Zurück', exact: true }).click();
      assert.equal(await form.getByLabel('Fahrgäste').inputValue(), '9');
      assert.equal(await form.getByLabel('Ihr Name').inputValue(), 'Müller');
    });
  }

  await run('Legal anchor targets, tariff PDF, original logo and missing-page response', async () => {
    await visit('/datenschutz/');
    assert.equal(await page.locator('#google').count(), 1); assert.equal(await page.locator('#whatsapp').count(), 1);
    const pdf = await context.request.get(`${base}/tarife/kreisverordnung-2026-10-01.pdf`); assert.equal(pdf.status(), 200);
    assert.equal((await pdf.body()).subarray(0, 4).toString(), '%PDF');
    const original = await context.request.get(`${base}/logo-original.png`); assert.equal(original.status(), 200);
    const missing = await context.request.get(`${base}/does-not-exist-qa/`); assert.equal(missing.status(), 404);
  });
  await run('No own form submission without JavaScript; phone remains available', async () => {
    const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const noJsPage = await noJs.newPage();
    await noJsPage.goto(`${base}/fahrt-anfragen/`);
    assert.equal(await noJsPage.locator('.ride-form-full').isVisible(), false);
    assert.ok(await noJsPage.locator('a[href="tel:+494541802080"]').count() > 0);
    await noJs.close();
  });
} finally {
  report.externalRequests = [...new Set(report.externalRequests)];
  report.pageErrors = [...new Set(report.pageErrors)];
  report.failedRequests = report.failedRequests.filter((r,i,a) => a.findIndex(x => x.url === r.url && x.status === r.status) === i);
  report.passed = report.routes.every(r => r.layout.scrollWidth <= r.width && r.violations.length === 0 && r.h1Count === 1)
    && report.interactions.every(r => r.passed) && report.pageErrors.length === 0 && report.externalRequests.length === 0 && report.failedRequests.length === 0;
  await fs.writeFile(`${reportDir}/browser-qa.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ passed: report.passed, routes: report.routes.length, interactions: report.interactions, pageErrors: report.pageErrors, externalRequests: report.externalRequests, failedRequests: report.failedRequests }, null, 2));
  await browser.close();
  if (!report.passed) process.exitCode = 1;
}
