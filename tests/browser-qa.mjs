import { chromium, webkit } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const baseUrl = (process.env.QA_BASE_URL || 'http://localhost:3000').replace(/\/$/, '');
const output = process.env.QA_REPORT_DIR || 'work/redesign';
const reportPath = 'docs/reports/mobile-redesign-browser.json';
const widths = [320, 375, 390, 430, 768, 1440];
const routes = [
  '/',
  '/leistungen',
  '/taxifahrten',
  '/geschaeftsfahrten',
  '/kinderfahrten',
  '/kurierfahrten',
  '/fahrt-anfragen',
  '/fahrpreis',
  '/krankenfahrten',
  '/flughafentransfer',
  '/kontakt',
  '/impressum',
  '/datenschutz',
];
const report = {
  testedAt: new Date().toISOString(),
  baseUrl,
  browsers: [],
  pages: [],
  flows: [],
  failures: [],
  runtimeErrors: [],
  externalRequests: [],
  resourceFailures: [],
  limitations: [],
};
await fs.mkdir(output, { recursive: true });
await fs.mkdir(path.dirname(reportPath), { recursive: true });

function check(condition, message, details) {
  if (!condition) report.failures.push({ message, ...(details ? { details } : {}) });
}
function observe(context) {
  context.on('page', (page) =>
    page.on('pageerror', (error) => report.runtimeErrors.push(error.message)),
  );
  context.on('request', (request) => {
    if (/^https?:/.test(request.url()) && new URL(request.url()).origin !== new URL(baseUrl).origin)
      report.externalRequests.push(request.url());
  });
  context.on('response', (response) => {
    if (
      response.status() >= 400 &&
      response.request().resourceType() !== 'document' &&
      !response.url().includes('/api/route')
    )
      report.resourceFailures.push({ url: response.url(), status: response.status() });
  });
}
async function dimensions(page) {
  return page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    client: document.documentElement.clientWidth,
  }));
}
async function dateTimeBounds(page) {
  return page
    .locator('.ride-form input[type="date"], .ride-form input[type="time"]')
    .evaluateAll((inputs) =>
      inputs.map((input) => {
        const rect = input.getBoundingClientRect();
        const field = input.closest('.field').getBoundingClientRect();
        const form = input.closest('form').getBoundingClientRect();
        return {
          type: input.type,
          width: rect.width,
          left: rect.left,
          right: rect.right,
          fieldRight: field.right,
          formRight: form.right,
          viewport: document.documentElement.clientWidth,
          fontSize: getComputedStyle(input).fontSize,
        };
      }),
    );
}
async function assertInputsFit(page, label) {
  const bounds = await dateTimeBounds(page);
  check(
    bounds.every(
      (x) =>
        x.width > 40 &&
        x.left >= -1 &&
        x.right <= x.viewport + 1 &&
        x.right <= x.fieldRight + 1 &&
        x.fieldRight <= x.formRight + 1,
    ),
    'Date/time input leaves its field, form or viewport',
    { label, bounds },
  );
  check(
    bounds.every((x) => parseFloat(x.fontSize) >= 16),
    'Date/time input text smaller than 16px',
    { label, bounds },
  );
}
async function open(page, route) {
  const response = await page.goto(baseUrl + route);
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => document.fonts.ready);
  return response;
}
async function flow(name, task) {
  const count = report.failures.length;
  try {
    await task();
  } catch (error) {
    report.failures.push({ message: name, details: error.stack || String(error) });
  }
  const passed = report.failures.length === count;
  report.flows.push({ name, passed });
  console.log(`${passed ? 'PASS' : 'FAIL'} ${name}`);
}
async function installOutboundStub(page) {
  await page.evaluate(() => {
    window.__qaOpened = [];
    window.open = (url, target) => {
      window.__qaOpened.push({ url: String(url), target });
      return null;
    };
  });
}
const browser = await chromium.launch({
  executablePath:
    process.env.CHROMIUM_PATH ||
    (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined),
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
report.browsers.push({ name: 'Chromium', version: browser.version() });
const context = await browser.newContext({ locale: 'de-DE', timezoneId: 'Europe/Berlin' });
observe(context);
const page = await context.newPage();
page.setDefaultTimeout(10000);
try {
  for (const width of widths) {
    await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
    for (const route of routes) {
      const response = await open(page, route);
      const size = await dimensions(page);
      const axe = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      const violations = axe.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => ({ target: n.target, html: n.html, summary: n.failureSummary })),
      }));
      const h1 = await page.locator('h1').count();
      const result = { width, route, status: response.status(), ...size, h1, violations };
      report.pages.push(result);
      check(
        response.status() === 200 &&
          size.scroll <= size.client + 1 &&
          h1 === 1 &&
          !violations.length,
        'Page/viewport check failed',
        result,
      );
      await assertInputsFit(page, `${route}@${width}`);
    }
    console.log(`Checked ${width}px (${routes.length} pages)`);
  }

  await flow('Hero, fleet and compact form match the brief', async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    await open(page, '/');
    const heading = (await page.locator('h1').innerText()).replace(/\s+/g, ' ').trim();
    check(
      heading === 'Ihr Ziel. Unser Weg.',
      'Hero must contain only the requested headline',
      heading,
    );
    const body = await page.locator('main').innerText();
    check(
      body.includes('SUV') && /6\s*(Personen|Fahrgäste|Plätze)/i.test(body),
      'SUV capacity missing',
    );
    check(
      /Großraumtaxi/i.test(body) && /8\s*(Personen|Fahrgäste|Plätze)/i.test(body),
      'Large taxi capacity missing',
    );
    const form = page.locator('.ride-form');
    check(await form.locator('input[name="name"]').isVisible(), 'Name is hidden on compact form');
    check(
      await form.locator('select[name="rideType"]').isVisible(),
      'Ride type is hidden on compact form',
    );
    check(
      (await form.locator('select[name="passengers"] option').count()) === 8,
      'Compact passenger choices do not include exactly 1–8',
    );
    check((await form.locator('details').count()) === 0, 'Fields still hidden in an accordion');
    check(
      !(await form.innerText()).includes('weitere Angaben'),
      'Old extra-data accordion remains',
    );
  });

  const data = {
    name: 'Anna Müller & Sohn',
    pickup: 'Am Markt 4, Ratzeburg',
    destination: 'Lübeck, Eingang B + C',
    date: '2099-06-20',
    time: '12:30',
    passengers: '8',
    wishes: 'Rollator & Kindersitz; Rückfahrt 16:00 Uhr.',
    phone: '+49 173 1234567',
  };
  for (const [route, expectedType] of [
    ['/fahrt-anfragen', 'Taxifahrt'],
    ['/krankenfahrten', 'Krankenfahrt'],
    ['/flughafentransfer', 'Flughafentransfer'],
  ]) {
    await flow(`Visible form and WhatsApp/E-Mail data: ${route}`, async () => {
      await page.setViewportSize({ width: 390, height: 844 });
      await open(page, route);
      await installOutboundStub(page);
      const form = page.locator('.ride-form');
      const name = form.locator('input[name="name"]');
      const rideType = form.locator('select[name="rideType"]');
      const date = form.locator('input[type="date"]');
      const time = form.locator('input[type="time"]');
      const passengers = form.locator('select[name="passengers"]');
      check((await rideType.inputValue()) === expectedType, 'Wrong initial ride type', {
        route,
        value: await rideType.inputValue(),
      });
      check(
        (await form.locator('input[type="tel"]').count()) === 0,
        'WhatsApp asks for a telephone number',
      );
      await form.getByRole('button', { name: 'Per WhatsApp anfragen', exact: true }).click();
      check(await form.getByRole('alert').isVisible(), 'Missing required-field error');
      await name
        .evaluate(
          (element) =>
            new Promise((resolve) =>
              requestAnimationFrame(() => resolve(element === document.activeElement)),
            ),
        )
        .then((focused) => check(focused, 'Required name error is not focused'));
      check(
        (await page.evaluate(() => window.__qaOpened)).length === 0,
        'Invalid form opened an external app',
      );
      await name.fill(data.name);
      await form.getByLabel('Start', { exact: false }).fill(data.pickup);
      await form.getByLabel('Ziel', { exact: false }).fill(data.destination);
      await date.fill('2000-06-20');
      await time.fill(data.time);
      await passengers.selectOption(data.passengers);
      await form.getByLabel('Anmerkung', { exact: false }).fill(data.wishes);
      await form.getByRole('button', { name: 'Per WhatsApp anfragen', exact: true }).click();
      check((await page.evaluate(() => window.__qaOpened)).length === 0, 'Past date accepted');
      await date.fill(data.date);
      await assertInputsFit(page, `${route}: filled inputs`);
      await form.getByRole('button', { name: 'Per WhatsApp anfragen', exact: true }).click();
      const wa = new URL((await page.evaluate(() => window.__qaOpened)).at(-1).url);
      const message = wa.searchParams.get('text');
      const expected = [
        'Hallo Insel Taxi, ich möchte gerne eine Fahrt anfragen.',
        '',
        `Name: ${data.name}`,
        `Fahrttyp: ${expectedType}`,
        `Start: ${data.pickup}`,
        `Ziel: ${data.destination}`,
        'Datum: 20.06.2099',
        'Uhrzeit: 12:30 (Ortszeit Deutschland)',
        'Personen: 8',
        `Anmerkung: ${data.wishes}`,
        '',
        'Bitte bestätigen Sie mir die Verfügbarkeit und die Fahrt.',
      ].join('\n');
      check(
        wa.origin === 'https://wa.me' && wa.pathname === '/491739189239' && message === expected,
        'WhatsApp destination or exact message wrong',
        { route, message },
      );
      const status = await form.getByRole('status').innerText();
      check(
        /erst nach unserer Bestätigung/i.test(status) && !/erfolgreich gebucht/i.test(status),
        'Submission wrongly confirms booking',
      );
      await form.getByRole('radio', { name: 'E-Mail', exact: true }).check();
      const phone = form.locator('input[type="tel"]');
      check(await phone.isVisible(), 'Email phone field missing');
      const opensBefore = (await page.evaluate(() => window.__qaOpened)).length;
      await form.getByRole('button', { name: 'Per E-Mail anfragen', exact: true }).click();
      check(
        (await page.evaluate(() => window.__qaOpened)).length === opensBefore,
        'Email opened without required phone',
      );
      check(
        (await phone.getAttribute('aria-invalid')) === 'true',
        'Missing email phone is not marked invalid',
      );
      await phone.fill(data.phone);
      await form.getByRole('button', { name: 'Per E-Mail anfragen', exact: true }).click();
      const mail = new URL(
        await form
          .getByRole('link', { name: 'E-Mail-Entwurf erneut öffnen', exact: true })
          .getAttribute('href'),
      );
      const expectedMail = expected.replace(
        `Anmerkung: ${data.wishes}`,
        `Telefon: ${data.phone}\nAnmerkung: ${data.wishes}`,
      );
      check(
        mail.protocol === 'mailto:' &&
          mail.pathname === 'info@inseltaxi-ratzeburg.de' &&
          mail.searchParams.get('body') === expectedMail,
        'E-Mail destination or exact message wrong',
        { route, actual: mail.href },
      );
      check(
        (await form.getByLabel('Nachricht zum Kopieren').inputValue()) === expectedMail,
        'Email copy fallback differs',
      );
      await form.getByRole('radio', { name: 'WhatsApp', exact: true }).check();
      check(
        (await form.locator('input[type="tel"]').count()) === 0 &&
          (await name.inputValue()) === data.name &&
          (await date.inputValue()) === data.date &&
          (await passengers.inputValue()) === '8',
        'Changing channel loses values or keeps phone visible',
      );
      await form.getByRole('button', { name: 'Per WhatsApp anfragen', exact: true }).click();
      const returned = new URL(
        (await page.evaluate(() => window.__qaOpened)).at(-1).url,
      ).searchParams.get('text');
      check(
        returned === expected && !returned.includes(data.phone),
        'Phone leaks into WhatsApp after channel switch',
      );
      await page.screenshot({
        path: path.join(output, `${route.slice(1)}-mobile.png`),
        fullPage: true,
      });
    });
  }

  await flow('Mobile menu keyboard operation and responsive close', async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    await open(page, '/');
    const toggle = page.getByRole('button', { name: 'Menü öffnen', exact: true });
    await toggle.click();
    await page.keyboard.press('Shift+Tab');
    check(
      await page.evaluate(() => document.activeElement?.closest('.mobile-nav') !== null),
      'Reverse focus does not enter mobile menu',
    );
    await page.keyboard.press('Tab');
    check(
      await page
        .getByRole('button', { name: 'Menü schließen', exact: true })
        .evaluate((el) => el === document.activeElement),
      'Forward focus does not return to toggle',
    );
    await page.keyboard.press('Escape');
    check(
      (await toggle.getAttribute('aria-expanded')) === 'false' &&
        (await toggle.evaluate((el) => el === document.activeElement)),
      'Escape does not close and restore focus',
    );
    await toggle.click();
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.setViewportSize({ width: 390, height: 844 });
    check(
      (await page
        .getByRole('button', { name: 'Menü öffnen', exact: true })
        .getAttribute('aria-expanded')) === 'false',
      'Mobile menu remains open after desktop resize',
    );
  });

  await flow('Keyboard skip link, reduced motion, and 200% equivalent reflow', async () => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await open(page, '/');
    const motion = await page.locator('h1, h1 *, .hero').evaluateAll((elements) =>
      elements.map((e) => ({
        animation: getComputedStyle(e).animationDuration,
        transition: getComputedStyle(e).transitionDuration,
      })),
    );
    check(
      motion.every((m) => m.animation.split(',').every((d) => parseFloat(d) <= 0.001)),
      'Hero motion ignores reduced-motion preference',
      motion,
    );
    await page.keyboard.press('Tab');
    check(
      await page.locator('.skip-link').evaluate((e) => e === document.activeElement),
      'Skip link is not first focus target',
    );
    await page.keyboard.press('Enter');
    check(
      await page.locator('main').evaluate((e) => e === document.activeElement),
      'Skip link fails to focus main',
    );
    // Browser page zoom halves the CSS viewport and reruns media queries.
    // CSS zoom does not, so test the 640px viewport equivalent to 1280px at 200%.
    await page.setViewportSize({ width: 640, height: 500 });
    await open(page, '/fahrt-anfragen');
    const size = await dimensions(page);
    check(
      size.scroll <= size.client + 1,
      'Form overflows at the viewport equivalent to 200% browser zoom',
      size,
    );
    await assertInputsFit(page, '200% equivalent reflow');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
  });

  await flow('Existing tariff and consent flow still work', async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    await open(page, '/fahrpreis');
    await page
      .getByText('Optional: unverbindliche Streckenschätzung öffnen', { exact: true })
      .click();
    await page.getByLabel('Startadresse', { exact: false }).fill('Ratzeburg Bahnhof');
    await page.getByLabel('Zieladresse', { exact: false }).fill('Mölln Bahnhof');
    await page.getByLabel('Wo verläuft Ihre Fahrt?').selectOption('outside');
    await page
      .getByRole('button', { name: 'Unverbindliche Strecke einschätzen', exact: true })
      .click();
    check(
      (await page.locator('.fare-value').count()) === 0,
      'Outside-area price incorrectly uses Kreis tariff',
    );
    await page.getByLabel('Wo verläuft Ihre Fahrt?').selectOption('inside');
    await page.getByLabel('Entfernung in km').fill('10');
    await page
      .getByRole('button', { name: 'Unverbindliche Strecke einschätzen', exact: true })
      .click();
    check(
      (await page.locator('.fare-value').innerText()).includes('33,10'),
      'Day tariff regression',
    );
    await page.getByRole('button', { name: 'Datenschutzeinstellungen', exact: true }).click();
    check(await page.getByRole('dialog').isVisible(), 'Privacy settings do not open');
    await page.getByRole('button', { name: 'Ohne Google fortfahren', exact: true }).click();
    check(!(await page.getByRole('dialog').isVisible()), 'Privacy settings do not close');
  });

  await flow('No JavaScript fallback and contact links', async () => {
    const noJs = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
    });
    const p = await noJs.newPage();
    await p.goto(baseUrl + '/fahrt-anfragen');
    check(
      !(await p.locator('.ride-form').isVisible()),
      'No-JS form can submit personal data as GET',
    );
    check(
      (await p.locator('a[href="tel:+494541802080"]').count()) > 0,
      'No-JS phone fallback missing',
    );
    await noJs.close();
    await open(page, '/');
    const phones = await page
      .locator('a[href^="tel:"]')
      .evaluateAll((links) => links.map((l) => l.getAttribute('href')));
    check(
      phones.length > 0 && phones.every((href) => href === 'tel:+494541802080'),
      'A telephone link uses the wrong number',
      phones,
    );
  });

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    await open(page, '/');
    await page.screenshot({ path: path.join(output, `home-${width}.png`), fullPage: true });
    await page.screenshot({ path: path.join(output, `hero-${width}.png`) });
  }
} catch (error) {
  report.failures.push({
    message: 'Browser matrix interrupted',
    details: error.stack || String(error),
  });
} finally {
  await context.close();
  await browser.close();
}

if (existsSync(webkit.executablePath())) {
  let safari;
  try {
    safari = await webkit.launch({ headless: true });
    report.browsers.push({ name: 'WebKit', version: safari.version() });
    const ctx = await safari.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      locale: 'de-DE',
      timezoneId: 'Europe/Berlin',
    });
    const p = await ctx.newPage();
    for (const width of [320, 390, 430]) {
      await p.setViewportSize({ width, height: 844 });
      for (const route of ['/', '/fahrt-anfragen', '/krankenfahrten', '/flughafentransfer']) {
        await open(p, route);
        const size = await dimensions(p);
        check(size.scroll <= size.client + 1, 'WebKit viewport overflow', {
          width,
          route,
          ...size,
        });
        await assertInputsFit(p, `WebKit ${route}@${width}`);
      }
    }
    await ctx.close();
  } catch (error) {
    report.failures.push({ message: 'WebKit run failed', details: String(error) });
  } finally {
    if (safari) await safari.close();
  }
} else
  report.limitations.push(
    'WebKit is not installed. iPhone Safari was not tested on a real device; native date/time containment was checked in Chromium at 320–1440px.',
  );
report.limitations.push(
  'External WhatsApp and E-Mail window opening is intercepted. Encoded links and the copy fallback are inspected; no real messages are sent.',
);
report.limitations.push(
  '200% reflow uses a 640px CSS viewport equivalent to a 1280px browser at 200% page zoom. Real browser zoom, assistive technology and physical devices were not tested.',
);
report.externalRequests = [...new Set(report.externalRequests)];
report.resourceFailures = [...new Map(report.resourceFailures.map((r) => [r.url, r])).values()];
report.runtimeErrors = [...new Set(report.runtimeErrors)];
report.passed =
  report.failures.length === 0 &&
  report.runtimeErrors.length === 0 &&
  report.externalRequests.length === 0 &&
  report.resourceFailures.length === 0;
await fs.writeFile(path.join(output, 'browser-qa.json'), JSON.stringify(report, null, 2) + '\n');
await fs.writeFile(reportPath, JSON.stringify(report, null, 2) + '\n');
console.log(
  JSON.stringify(
    {
      passed: report.passed,
      pages: report.pages.length,
      flows: report.flows,
      failures: report.failures,
      runtimeErrors: report.runtimeErrors,
      externalRequests: report.externalRequests,
      resourceFailures: report.resourceFailures,
      limitations: report.limitations,
    },
    null,
    2,
  ),
);
if (!report.passed) process.exitCode = 1;
