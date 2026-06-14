const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const baseUrl = process.env.NOEXT_BASE_URL || 'http://127.0.0.1:8765/';
const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const pages = fs.readdirSync(root).filter(name => name.endsWith('.html')).sort();
const languages = ['en', 'fr', 'de', 'it', 'pt'];

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: edge });
  const languageResults = await Promise.all(languages.map(async language => {
    const results = [];
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
      await page.waitForFunction(expected => document.documentElement.lang === expected, language, { timeout: 4000 }).catch(() => {});
      await page.waitForTimeout(60);
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
    await page.goto(new URL('actividades.html', baseUrl).href, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(expected => document.documentElement.lang === expected, language, { timeout: 4000 }).catch(() => {});
    await page.waitForTimeout(80);
    const technicalButtons = page.locator('.ficha-tech-btn');
    const technicalCount = await technicalButtons.count();
    for (let index = 0; index < technicalCount; index += 1) {
      await technicalButtons.nth(index).click();
      await page.waitForTimeout(10);
      const dynamicAudit = await page.evaluate(() => {
        const modal = document.querySelector('#noext-modal');
        const content = document.querySelector('#noext-modal-content');
        const text = content?.textContent?.replace(/\s+/g, ' ').trim() || '';
        const spanishLabels = [
          'Edad recomendada', 'Nivel físico', 'Nivel técnico', 'Experiencia previa',
          'Ratio orientativo', 'Qué traer', 'Temporada recomendada', 'Meteorología límite',
          'Motivos de cambio o cancelación', 'Riesgos principales',
          'Requisitos en versión operativa', 'Nota académica', 'Versiones posibles'
        ];
        const activeLanguage = document.documentElement.lang;
        const sourceLeaks = spanishLabels.filter(label => {
          if (activeLanguage === 'pt' && label === 'Nota académica') return false;
          return text.includes(label);
        });
        const items = [...(content?.querySelectorAll('.technical-item') || [])];
        return {
          language: document.documentElement.lang,
          missing: sourceLeaks.map(text => ({ text, element: 'technical-item', page: 'actividades.html' })),
          missingCount: sourceLeaks.length,
          overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
          title: document.querySelector('#noext-modal-title')?.textContent?.trim() || '',
          modalVisible: Boolean(modal?.classList.contains('open')),
          modalComplete: items.length === 16 && items.every(item => item.textContent.trim().length > 0),
          modalText: text.slice(0, 240)
        };
      });
      results.push({
        page: `actividades.html#technical-sheet-${index + 1}`,
        requestedLanguage: language,
        ...dynamicAudit,
        consoleErrors: [],
      });
      await page.locator('#noext-modal .noext-modal-close').click();
    }
    await context.close();
    return results;
  }));
  const results = languageResults.flat();
  await browser.close();
  const report = {
    generatedAt: new Date().toISOString(),
    pages: pages.length,
    languages,
    failures: results.filter(item => item.language !== item.requestedLanguage || item.missingCount || item.overflow || item.consoleErrors.length || item.modalVisible === false || item.modalComplete === false),
    results
  };
  fs.writeFileSync(path.join(root, 'i18n', 'validation-report.json'), JSON.stringify(report, null, 2), 'utf8');
  console.log(JSON.stringify({ checks: results.length, failures: report.failures.length }));
  if (report.failures.length) process.exitCode = 1;
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
