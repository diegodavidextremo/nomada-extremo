const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const baseUrl = process.env.NOEXT_BASE_URL || 'http://127.0.0.1:8765/';
const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const pages = fs.readdirSync(root).filter(name => name.endsWith('.html')).sort();
const languages = ['en', 'fr', 'de'];

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: edge });
  const results = [];
  for (const language of languages) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    await context.addInitScript(lang => localStorage.setItem('noext-language', lang), language);
    const page = await context.newPage();
    for (const pageName of pages) {
      const consoleErrors = [];
      const listener = message => {
        if (message.type() === 'error') consoleErrors.push(message.text());
      };
      page.on('console', listener);
      await page.goto(new URL(pageName, baseUrl).href, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(220);
      const audit = await page.evaluate(() => {
        const missing = typeof window.auditI18n === 'function' ? window.auditI18n() : [{ text: 'auditI18n unavailable' }];
        return {
          language: document.documentElement.lang,
          missing: missing.slice(0, 25),
          missingCount: missing.length,
          overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
          title: document.title
        };
      });
      page.off('console', listener);
      results.push({ page: pageName, requestedLanguage: language, ...audit, consoleErrors });
    }
    await context.close();
  }
  await browser.close();
  const report = {
    generatedAt: new Date().toISOString(),
    pages: pages.length,
    languages,
    failures: results.filter(item => item.language !== item.requestedLanguage || item.missingCount || item.overflow || item.consoleErrors.length),
    results
  };
  fs.writeFileSync(path.join(root, 'i18n', 'validation-report.json'), JSON.stringify(report, null, 2), 'utf8');
  console.log(JSON.stringify({ checks: results.length, failures: report.failures.length }));
  if (report.failures.length) process.exitCode = 1;
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
