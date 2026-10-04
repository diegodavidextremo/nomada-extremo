/* Regression checks for the author's October brief. Run against a local server. */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');
const base = process.env.NOEXT_BASE_URL || 'http://127.0.0.1:8765/';
const langs = ['es', 'en', 'fr', 'de', 'it', 'pt'];
const widths = [390, 768, 1366];
const pages = fs.readdirSync(root).filter(x => x.endsWith('.html'));
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const dictionaries = Object.fromEntries(langs.map(lang => [lang, JSON.parse(read(`i18n/${lang}.json`))]));
const get = (dictionary, key) => key.split('.').reduce((v, k) => v?.[k], dictionary);
const changed = ['index.html', 'equipo.html', 'actividades.html', 'packs.html', 'como-funciona.html', 'quienes-somos.html', 'fundador.html', 'formularios.html', 'escuela.html', 'senderismo-guiado.html', 'kayak-mar.html', 'snorkel-aventura.html', 'btt-costera.html', 'coasteering.html', 'multiaventura.html', 'bautismo-buceo.html', 'open-water.html', 'paramotor.html', 'parapente.html', 'rapel.html', 'via-ferrata.html', 'base-campamento.html', 'horizonte-nomada.html', 'viajes.html'];
const git = process.env.NOEXT_GIT || 'C:/Users/Diego/.cache/codex-runtimes/codex-primary-runtime/dependencies/native/git/cmd/git.exe';
const original = file => execFileSync(git, ['-c', `safe.directory=${root.replaceAll('\\','/')}`, '-C', root, 'show', `antes-cambios-2026-10-03:${file}`], { encoding: 'utf8' }).replaceAll('\r\n','\n');
const oldNames = [...original('equipo.html').matchAll(/<article class="specialist-card[^>]*>[\s\S]*?<h3>([^<]+)<\/h3>/g)].map(m => m[1]);
const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const banned = new RegExp(['\\b'+['PA','DI'].join('')+'\\b', ...oldNames.map((name,i) => '\\b'+normalize([0,1,4,5,7].includes(i) ? name.split(' ')[0] : name)+'\\b'), '320 (?:dias de sol|Sonnentage|sunny days|days of sunshine)'].join('|'),'i');
const report = { generatedAt: new Date().toISOString(), staticChecks: [], browserChecks: [], interactions: [], errors: [] };
function check(name, fn) {
  try { fn(); report.staticChecks.push(name); } catch (error) { report.errors.push({ check: name, message: error.message }); }
}
check('No obsolete provider or specialist names in active HTML, JS or catalogues', () => {
  const files = [...pages, ...langs.map(lang => `i18n/${lang}.json`)];
  for (const dir of ['assets/js', 'assets/data']) {
    for (const file of fs.readdirSync(path.join(root, dir))) if (/\.(js|json)$/.test(file)) files.push(`${dir}/${file}`);
  }
  for (const file of files) assert.equal(banned.test(normalize(read(file))), false, file);
});
check('Every new explicit key exists and is non-empty in all six languages', () => {
  for (const file of pages) {
    for (const match of read(file).matchAll(/data-i18n(?:-(?:title|aria|alt|placeholder))?="(october\.[^"]+)"/g)) {
      for (const lang of langs) assert.ok(get(dictionaries[lang], match[1])?.trim(), `${file}: ${lang}: ${match[1]}`);
    }
  }
});
check('Twelve roles, four home profiles and correct delivery modes', () => {
  assert.equal((read('equipo.html').match(/data-role="/g) || []).length, 12);
  assert.equal((read('index.html').match(/data-role="/g) || []).length, 4);
  for (const file of ['coasteering', 'bautismo-buceo', 'open-water', 'parapente', 'paramotor', 'rapel', 'via-ferrata']) assert.ok(read(file+'.html').includes('model-badge--partner'), file);
  for (const file of ['senderismo-guiado', 'kayak-mar', 'snorkel-aventura', 'btt-costera', 'multiaventura']) assert.ok(read(file+'.html').includes('model-badge--own'), file);
  for (const file of ['base-campamento', 'horizonte-nomada', 'viajes']) assert.ok(read(file+'.html').includes('model-badge--future'), file);
});
check('Protected naturist page and unchanged founder chapters preserved', () => {
  assert.equal(read('naturistas.html').replaceAll('\r\n','\n'), original('naturistas.html').replace(new RegExp(oldNames[10],'i'),'El/la coordinador/a de experiencias naturistas y bienestar outdoor'));
  const clean = s => s.replaceAll('\r\n','\n').replace(/\?v=[^"\s<>]+/g,'').replace(/\n\s*<div class="bio-cita" data-i18n="october.quote">[\s\S]*?<\/div>/,'');
  const chapters = source => [...clean(source).matchAll(/<div class="bio-chapter">[\s\S]*?(?=<!-- CAP|<\/div>\s*<\/div>\s*<!-- COLUMNA)/g)].map(m=>m[0].trim());
  const current=chapters(read('fundador.html')), before=chapters(original('fundador.html'));
  assert.equal(current.length,6);assert.equal(before.length,6);
  for(const index of [0,1,2,3,5])assert.equal(current[index],before[index]);
  assert.ok(current[4].includes('Cueva C-6'));assert.ok(current[4].includes('parasailing'));
});
check('Prices preserved across grouped catalog and school; real contact endpoints preserved', () => {
  const extract = (source, pattern) => [...source.matchAll(pattern)].map(m=>m[0]).sort();
  assert.deepEqual(extract(read('actividades.html')+read('escuela.html'),/\d+(?:[.,]\d+)?€/g),extract(original('actividades.html')+original('escuela.html'),/\d+(?:[.,]\d+)?€/g));
  for (const file of pages) {
    if(!['actividades.html','escuela.html'].includes(file))assert.deepEqual(extract(read(file),/\d+(?:[.,]\d+)?€/g),extract(original(file),/\d+(?:[.,]\d+)?€/g),file);
    assert.deepEqual(extract(read(file),/(?:https?:\/\/(?:wa\.me|t\.me|www\.instagram\.com|instagram\.com|www\.youtube\.com|youtube\.com)\/[^"\s<>]+|mailto:[^"\s<>]+|tel:[^"\s<>]+)/g),extract(original(file),/(?:https?:\/\/(?:wa\.me|t\.me|www\.instagram\.com|instagram\.com|www\.youtube\.com|youtube\.com)\/[^"\s<>]+|mailto:[^"\s<>]+|tel:[^"\s<>]+)/g),file);
  }
});

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.NOEXT_BROWSER || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  try {
    for (const width of widths) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      for (const name of changed) {
        const errors = [];
        const listener = error => errors.push(error.message);
        page.on('pageerror', listener);
        await page.goto(new URL(name, base).href, { waitUntil: 'domcontentloaded' });
        await page.waitForFunction(() => !!window.auditI18n);
        await page.waitForTimeout(100);
        const audit = await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth > innerWidth + 1, height: document.documentElement.scrollHeight }));
        page.off('pageerror', listener);
        report.browserChecks.push({ name, width, ...audit, errors });
        if (audit.overflow || errors.length) report.errors.push({ check: `${name} at ${width}px`, ...audit, errors });
      }
      await page.goto(new URL('index.html', base).href);
      await page.waitForTimeout(250);
      const shown = () => page.locator('#featured-home-grid .ficha:visible').count();
      assert.equal(await shown(), 3);
      await page.locator('.home-featured-toggle').click();
      assert.equal(await shown(), 6);
      await page.locator('.home-featured-toggle').click();
      assert.equal(await shown(), 3);
      report.interactions.push({ width, moreLess: true });
      if (width === 390) {
        await page.screenshot({ path: path.join(root,'tools/reports/october-mobile.png') });
        const hero = await page.evaluate(() => {
          const title = document.querySelector('.hero-titulo');
          const notice = document.querySelector('.aviso-ficticio p').getBoundingClientRect();
          const chat = document.getElementById('chatBtn').getBoundingClientRect();
          const wa = document.getElementById('waFloat').getBoundingClientRect();
          const overlap = (a,b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
          return { titleOpacity: getComputedStyle(title).opacity, titleAnimation: getComputedStyle(title).animationName, overlapNotice: overlap(chat,notice)||overlap(wa,notice), overlapButtons: overlap(chat,wa), height: document.documentElement.scrollHeight };
        });
        assert.equal(hero.titleOpacity,'1'); assert.equal(hero.titleAnimation,'none');
        assert.equal(hero.overlapNotice,false); assert.equal(hero.overlapButtons,false);
        assert.ok(hero.height < 36500, JSON.stringify(hero));
        report.interactions.push({ mobileHero: hero });
        await page.goto(new URL('index.html#resenas', base).href);
        assert.ok(await page.locator('#resenas').evaluate(node => node.closest('details').open));
      }
      await context.close();
    }
    for (const lang of langs) {
      const context = await browser.newContext({ viewport: { width: 390, height: 900 }, reducedMotion: 'reduce' });
      await context.addInitScript(value => localStorage.setItem('noext-language',value),lang);
      const page = await context.newPage();
      for (const name of changed) {
        await page.goto(new URL(name,base).href, { waitUntil: 'domcontentloaded' });
        await page.waitForFunction(value => document.documentElement.lang === value,lang);
        await page.waitForTimeout(80);
        const keyErrors = await page.evaluate(dictionary => [...document.querySelectorAll('[data-i18n^="october."]')].filter(el => el.textContent !== dictionary.october[el.dataset.i18n.split('.')[1]]).map(el => el.dataset.i18n), dictionaries[lang]);
        if (keyErrors.length) report.errors.push({ check: `${name}: ${lang}`, keyErrors });
        if (name === 'equipo.html' || name === 'index.html') {
          const summaries = page.locator('.specialist-details summary');
          for (let i=0;i<await summaries.count();i++) {
            await summaries.nth(i).click();
            await page.waitForTimeout(50);
            assert.ok(await page.locator('.team-profile-dialog').evaluate(dialog => dialog.open));
            const title = await page.locator('#team-profile-title').textContent();
            const roleNumber = await summaries.nth(i).evaluate(el => Number(el.closest('[data-role]').dataset.role));
            assert.equal(title,dictionaries[lang].october['title'+roleNumber]);
            await page.locator('.team-profile-dialog__close').click();
          }
        }
      }
      report.interactions.push({ language:lang, pages:changed.length, dialogs:true });
      await context.close();
    }
  } catch (error) { report.errors.push({ check:'Browser interactions', message:error.stack }); }
  finally { await browser.close(); }
  fs.writeFileSync(path.join(root,'tools/reports/october-validation.json'),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify({ staticChecks:report.staticChecks.length, browserChecks:report.browserChecks.length, interactions:report.interactions.length, errors:report.errors },null,2));
  if(report.errors.length) process.exitCode=1;
})();
