const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { gzipSync } = require('node:zlib');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const types = { html: 'text/html', css: 'text/css', js: 'text/javascript', json: 'application/json',
  webp: 'image/webp', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', svg: 'image/svg+xml',
  woff2: 'font/woff2', webmanifest: 'application/manifest+json' };
const cache = new Map();
const server = http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://local').pathname);
  const file = path.resolve(root, '.' + pathname);
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    response.writeHead(404).end();
    return;
  }
  const extension = path.extname(file).slice(1);
  if (!cache.has(file)) {
    const bytes = fs.readFileSync(file);
    cache.set(file, ['html', 'css', 'js', 'json', 'svg'].includes(extension) ? gzipSync(bytes) : bytes);
  }
  const headers = { 'Content-Type': types[extension] || 'application/octet-stream' };
  if (['html', 'css', 'js', 'json', 'svg'].includes(extension)) headers['Content-Encoding'] = 'gzip';
  response.writeHead(200, headers).end(cache.get(file));
});

const limits = {
  'index.html': [720_000, 790_000],
  'actividades.html': [800_000, 950_000],
  'senderismo-guiado.html': [480_000, 480_000],
  'proyecto-intermodular.html': [300_000, 300_000],
  'contacto.html': [350_000, 350_000],
  'equipo.html': [680_000, 780_000],
  'agradecimiento-1-gmn.html': [500_000, 720_000],
  'blog.html': [730_000, 730_000],
  'packs.html': [850_000, 1_350_000]
};

async function run() {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = 'http://127.0.0.1:' + server.address().port + '/';
  const edge = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
  const browser = await chromium.launch(fs.existsSync(edge) ? { executablePath: edge } : {});
  const profiles = [{ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
    { width: 1366, height: 768, deviceScaleFactor: 1 }];
  const full = process.argv.includes('--all');
  const baseline = process.argv.includes('--baseline');
  const pages = full ? fs.readdirSync(root).filter(file => file.endsWith('.html')) : Object.keys(limits);
  const results = [];
  try {
    for (const [profileIndex, { width, height, ...options }] of profiles.entries()) {
      for (const file of pages) {
        const context = await browser.newContext({ viewport: { width, height }, ...options });
        try {
          const page = await context.newPage();
          if (baseline) page.setDefaultTimeout(90_000);
          const failed = [];
          const external = new Set();
          page.on('pageerror', error => failed.push(error.message));
          page.on('response', response => {
            if (response.url().startsWith(base) && response.status() >= 400) failed.push(response.url());
          });
          await page.route('**/*', route => {
            const url = route.request().url();
            if (url.startsWith(base)) return route.continue();
            external.add(new URL(url).hostname);
            return route.abort();
          });
          if (process.argv.includes('--slow')) {
            const cdp = await context.newCDPSession(page);
            await cdp.send('Network.enable');
            await cdp.send('Network.emulateNetworkConditions', {
              offline: false, latency: 120, downloadThroughput: 187_500, uploadThroughput: 93_750
            });
            await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
          }
          await page.addInitScript(() => {
            window.lastLcp = 0;
            new PerformanceObserver(list => {
              window.lastLcp = list.getEntries().at(-1).startTime;
            }).observe({ type: 'largest-contentful-paint', buffered: true });
          });
          await page.goto(base + file, { waitUntil: 'domcontentloaded' });
          await page.waitForLoadState('load');
          await page.waitForFunction(() => performance.getEntriesByName('first-contentful-paint').length > 0);
          await page.waitForLoadState('networkidle');
          // The HTML redirects and deferred widgets can schedule requests after the first idle period.
          await page.waitForFunction(() => !document.querySelector('#nav-placeholder'));
          if (baseline || process.argv.includes('--slow')) await page.waitForTimeout(600);
          const result = await page.evaluate(() => {
            const assets = performance.getEntriesByType('resource').filter(item => item.name.startsWith(location.origin));
            const documentBytes = performance.getEntriesByType('navigation')[0]?.encodedBodySize || 0;
            return {
              bytes: documentBytes + assets.reduce((sum, item) => sum + item.encodedBodySize, 0),
              requests: assets.length + 1,
              fcp: Math.round(performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0),
              lcp: Math.round(window.lastLcp),
              overflow: document.documentElement.scrollWidth > innerWidth + 1,
              largest: assets.sort((a, b) => b.encodedBodySize - a.encodedBodySize).slice(0, 5)
                .map(item => [new URL(item.name).pathname, item.encodedBodySize]),
              assistantFetched: assets.some(item => item.name.includes('/assistant-index.json')),
              homePhotos: assets.filter(item => /\/optimized\/home-\d+\.webp/.test(item.name)).length
            };
          });
          results.push({ file, width, ...result, external: [...external], failed });
          if (!baseline && limits[file]) {
            assert(result.bytes <= limits[file][profileIndex], `${file} ${width}px: ${result.bytes} bytes`);
            assert(!result.assistantFetched, 'The assistant index should load only for a question that needs it');
            assert(![...external].some(host => host.startsWith('fonts.')), 'Fonts should be served locally');
            if (file === 'index.html') assert.equal(result.homePhotos, 1, 'Only one hero candidate should load');
          }
        } finally {
          await context.close();
        }
      }
    }
  } finally {
    await browser.close();
    const output = process.env.NOEXT_PERF_REPORT;
    if (output) fs.writeFileSync(output, JSON.stringify(results, null, 2));
    console.log(JSON.stringify(full ? {
      checks: results.length,
      issues: results.filter(result => result.overflow || result.failed.length || result.external.length),
      heaviest: [...results].sort((a, b) => b.bytes - a.bytes).slice(0, 5)
    } : results.map(({ largest, ...result }) => result)));
  }
  if (!baseline) assert.deepEqual(results.filter(result => result.overflow || result.failed.length), []);
}

run().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => server.close());
