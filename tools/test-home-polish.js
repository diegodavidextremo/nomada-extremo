const {chromium} = require('playwright');
const fs = require('node:fs'), path = require('node:path'), http = require('node:http');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const server = http.createServer((req, res) => {
  const file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://local').pathname));
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404).end(); return; }
  const types = {'.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css'};
  res.setHeader('Content-Type', (types[path.extname(file)] || 'application/octet-stream') + '; charset=utf-8');
  fs.createReadStream(file).pipe(res);
});
let browser;
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = 'http://127.0.0.1:' + server.address().port + '/';
  browser = await chromium.launch({headless:true, executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
  const page = await browser.newPage({reducedMotion:'reduce'});
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const [width,height] of [[1366,768],[1024,600],[390,844]]) {
    await page.setViewportSize({width,height});
    await page.goto(base+'index.html');
    await page.locator('.season-tab-list').waitFor({state:'attached'});
    await page.locator('.home-team-roles').scrollIntoViewIfNeeded();
    const titles = await page.locator('.home-team-roles .specialist-card__header h3').evaluateAll(elements => elements.map(el => ({color:getComputedStyle(el).color, font:getComputedStyle(el).fontFamily, transform:getComputedStyle(el).textTransform})));
    assert.equal(titles.length,4);
    titles.forEach(style => {assert.equal(style.color,'rgb(255, 255, 255)');assert.equal(style.transform,'uppercase');assert(style.font.includes('Bebas'));});
    await page.screenshot({path:`tools/reports/home-team-polish-${width}.png`});
    if (!(await page.locator('.home-mobile-details:has(#temporadas-home)').evaluate(el=>el.open))) await page.locator('.home-mobile-details:has(#temporadas-home) > summary').click();
    for (let i=0; i<4; i++) {
      await page.locator('.season-tab').nth(i).click();
      const panel=page.locator('.season-panel.is-active');
      const copy=await panel.textContent();
      assert(copy.includes('Kayak'),`season ${i} has kayak`);
      assert(copy.toLowerCase().includes('buceo'));
      assert.equal(await panel.locator('.season-activity-grid h3').count(),3);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth+1),`${width}: season overflow`);
      if (i===2) {await page.locator('#temporadas-home').scrollIntoViewIfNeeded(); await page.screenshot({path:`tools/reports/home-summer-polish-${width}.png`});}
    }
    for (const [selector,name] of [['.home-guarantee .sellos','guarantee'],['.home-naturist-activity','naturist'],['.bono-card.popular','bonus']]) {
      await page.locator(selector).first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(250);
      await page.screenshot({path:`tools/reports/home-${name}-polish-${width}.png`});
    }
    assert.equal(await page.locator('.home-guarantee .home-line-icon').count(),6);
    assert.equal(await page.locator('.home-naturist-activity .home-line-icon').count(),8);
    const iconsCopy=await page.locator('.home-guarantee, .home-naturist-activity').allTextContents();
    assert(!iconsCopy.join('').match(/\p{Extended_Pictographic}/u));
    assert.equal(await page.locator('.bono-badge').evaluate(el=>getComputedStyle(el).textTransform),'uppercase');
    const wa=page.locator('a.btn:has(.home-whatsapp-logo)');
    await wa.scrollIntoViewIfNeeded();
    await wa.locator('img').evaluate(img=>img.decode());
    assert.equal((await wa.textContent()).trim(),'WhatsApp');
    await page.screenshot({path:`tools/reports/home-contact-polish-${width}.png`});
    await page.locator('.footer-directory summary').click();
    const footerCopy=await page.locator('#footer').textContent();
    assert(footerCopy.includes('Horario: lunes a domingo · 8:00–21:00'));
    assert(!footerCopy.includes('Horario simulado'));
    assert(!footerCopy.includes('09:00'));
    await page.goto(base+'contacto.html');
    assert.deepEqual((await page.locator('.horario-hora').allTextContents()).filter(value=>/\d/.test(value)),Array(7).fill('8:00–21:00'));
    console.log(`${width}x${height}: white titles, icons, four seasons, WhatsApp and consistent hours passed`);
  }
  await page.setViewportSize({width:1366,height:768});
  for (const language of ['en','fr','de','it','pt','es']) {
    await page.goto(base+'index.html');
    await page.locator(`[data-language-switcher] [data-lang="${language}"]`).first().click();
    await page.waitForFunction(lang=>document.documentElement.lang===lang,language);
    await page.waitForTimeout(150);
    const dictionary=JSON.parse(fs.readFileSync(path.join(root,'i18n',language+'.json'),'utf8'));
    const source='Kayak al amanecer o al atardecer, SUP, snorkel, buceo, coasteering, surf, e-foil y jetsurf. Wingfoil, windsurf y kitesurf con viento adecuado.';
    assert.equal(await page.locator('#season-panel-2 .card-desc').first().textContent(),dictionary.strings[source]);
    assert((await page.locator('#footer').textContent()).includes(dictionary.strings['Horario: lunes a domingo · 8:00–21:00']));
    assert.deepEqual(await page.evaluate(()=>window.auditI18n()),[]);
  }
  assert.deepEqual(errors,[]);
  console.log('Six languages passed; no JavaScript errors.');
})().catch(error=>{console.error(error);process.exitCode=1;}).finally(async()=>{await browser?.close();server.close();});
