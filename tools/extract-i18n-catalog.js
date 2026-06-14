const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const baseUrl = process.env.NOEXT_BASE_URL || 'http://127.0.0.1:8765/';
const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ignoredPages = new Set([]);

const htmlPages = fs.readdirSync(root)
  .filter(name => name.endsWith('.html') && !ignoredPages.has(name))
  .sort();

const normalize = value => value.replace(/\s+/g, ' ').trim();

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: edge });
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  const strings = new Set();
  const pages = {};

  for (const pageName of htmlPages) {
    await page.goto(new URL(pageName, baseUrl).href, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(180);
    const result = await page.evaluate(() => {
      const skip = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE']);
      const visible = element => {
        if (!element || skip.has(element.tagName)) return false;
        const style = getComputedStyle(element);
        return style.display !== 'none' && style.visibility !== 'hidden';
      };
      const texts = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        const value = node.nodeValue.replace(/\s+/g, ' ').trim();
        if (value && visible(node.parentElement)) texts.push(value);
      }
      const attributes = [];
      document.querySelectorAll('[placeholder],[title],[aria-label],[alt]').forEach(element => {
        ['placeholder', 'title', 'aria-label', 'alt'].forEach(attribute => {
          const value = element.getAttribute(attribute)?.replace(/\s+/g, ' ').trim();
          if (value) attributes.push(value);
        });
      });
      return { texts, attributes, title: document.title };
    });
    const pageStrings = [...new Set([...result.texts, ...result.attributes, result.title].map(normalize).filter(Boolean))];
    pageStrings.forEach(value => strings.add(value));
    pages[pageName] = pageStrings;
  }

  await browser.close();
  const output = {
    generatedAt: new Date().toISOString(),
    baseUrl,
    pages,
    strings: [...strings].sort((a, b) => a.localeCompare(b, 'es'))
  };
  fs.writeFileSync(path.join(root, 'i18n', 'source-catalog.json'), JSON.stringify(output, null, 2), 'utf8');
  console.log(JSON.stringify({ pages: htmlPages.length, strings: output.strings.length }));
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
