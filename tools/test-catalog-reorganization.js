/* Check grouping against the preserved pre-reorganization source, then exercise real UI. */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
const base=process.env.NOEXT_BASE_URL||'http://127.0.0.1:8765/';
const git=process.env.NOEXT_GIT||'C:/Users/Diego/.cache/codex-runtimes/codex-primary-runtime/dependencies/native/git/cmd/git.exe';
const original=execFileSync(git,['-c',`safe.directory=${root.replaceAll('\\','/')}`,'show','antes-reorganizacion-2026-10-04:actividades.html'],{cwd:root,encoding:'utf8'});
const expected={montana:5,vertical:7,mar:6,buceo:3,aire:3,barrancos:2,btt:2,foil:5};
const aliases={scrambling:'trekking-tecnico-crestas','btt técnico':'rutas-btt',paratrike:'paramotor-paratrike','buceo nocturno':'formacion-ssi','barranquismo seco':'barranquismo'};
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.NOEXT_BROWSER||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 const errors=[];
 try{
  const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'actividades.html');await page.waitForFunction(()=>window.auditI18n);
  for(const [family,count]of Object.entries(expected))assert.equal(await page.locator(`#${family} .ficha`).count(),count,family);
  assert.equal(await page.locator('.ficha').count(),33);
  assert.equal(await page.locator('#multiaventura .card').count(),5);
  assert.equal(await page.locator('.catalog-custom-cta').count(),1);
  const catalog=await page.evaluate(()=>document.body.innerHTML);
  await page.goto(base+'escuela.html');await page.waitForFunction(()=>window.auditI18n);
  const preservation=await page.evaluate(({original,catalog})=>{
   const parse=s=>new DOMParser().parseFromString(s,'text/html');
   const before=parse(original),after=parse(catalog+document.body.innerHTML);
   const normalize=s=>s.replace(/\s+/g,' ').trim();
   const missing=[];
   for(const card of before.querySelectorAll('.ficha')){
    const title=card.querySelector('.ficha-titulo').textContent.trim();
    const candidates=[...after.querySelectorAll('[data-activity-source]')].filter(c=>c.dataset.activitySource===title);
    const current=candidates.find(c=>c.classList.contains('catalog-mode'))||candidates[0];
    if(!current){missing.push(title);continue;}
    for(const field of card.querySelectorAll('.ficha-sub,.ficha-tag,.ficha-precio,.ficha-badges')){
     if(!normalize(current.textContent).includes(normalize(field.textContent)))missing.push(title+': '+field.textContent);
    }
   }
   return {covered:before.querySelectorAll('.ficha').length,missing};
  },{original,catalog});
  assert.equal(preservation.covered,46);assert.deepEqual(preservation.missing,[]);
  for(const anchor of ['formacion-ssi','curso-aff','waterman-training','route-buceo','route-aff','route-waterman'])assert.equal(await page.locator('#'+anchor).count(),1);
  for(const lang of ['es','en','fr','de','it','pt']){
   const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
   await context.addInitScript(value=>localStorage.setItem('noext-language',value),lang);
   const p=await context.newPage();p.on('pageerror',e=>errors.push(e.message));
   for(const file of ['actividades','escuela','fundador']){
    await p.goto(base+file+'.html');await p.waitForFunction(l=>document.documentElement.lang===l,lang);await p.waitForTimeout(100);
    assert.deepEqual(await p.evaluate(()=>window.auditI18n()),[],lang+file);
    assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),lang+file);
   }
   assert.equal(await p.locator('.youtube-logo').count(),2);assert.ok(await p.locator('.youtube-logo').first().evaluate(img=>img.complete&&img.naturalWidth>0));
   const text=await p.locator('body').textContent();assert.ok(text.includes('C-6'));
   await p.goto(base+'actividades.html');await p.waitForFunction(l=>document.documentElement.lang===l,lang);
   for(const [query,id]of Object.entries(aliases)){
    await p.locator('.catalog-search input').fill(query);await p.waitForTimeout(250);
    assert.equal(await p.locator('.ficha:visible').count(),1,lang+query);assert.ok(await p.locator('#'+id).isVisible());
   }
   await p.locator('.activity-filter-clear').click();await p.waitForTimeout(250);assert.equal(await p.locator('.ficha:visible').count(),33);
   await p.locator('#trekking-tecnico-crestas > .ficha-cuerpo > .ficha-tech-btn').click();
   assert.equal(await p.locator('#noext-modal-content .technical-item').count(),32);await p.keyboard.press('Escape');
   await p.goto(base+'actividades.html#scrambling');assert.equal(await p.locator('#scrambling').count(),1);
   await context.close();
  }
  for(const width of [320,768,1366]){
   await page.setViewportSize({width,height:900});
   for(const file of ['actividades','escuela','fundador','index','quienes-somos']){await page.goto(base+file+'.html');assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),width+file);}
  }
  assert.deepEqual(errors,[]);
  console.log('Catalogue checks passed: 33 proposals, 46 source cards preserved, 6 languages, aliases, modes, school routes and responsive layout.');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1});
