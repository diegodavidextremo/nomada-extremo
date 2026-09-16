#!/usr/bin/env node
/* npm package is needed only for testing: playwright. Website has no dependency. */
const {chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const output=path.resolve(process.env.NOEXT_REPORT_DIR||path.join(root,'tools/reports'));
fs.mkdirSync(output,{recursive:true});
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.ico':'image/x-icon','.avif':'image/avif','.webmanifest':'application/manifest+json'};
const server=http.createServer((req,res)=>{
 let name;try{name=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\/nomada-extremo\//,'');}catch(_){res.writeHead(400).end();return;}
 const file=path.resolve(root,name||'index.html');
 if(!file.startsWith(root+path.sep)||name.split('/').some(x=>x.startsWith('.'))){res.writeHead(403).end();return;}
 if(!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404).end();return;}
 res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});fs.createReadStream(file).pipe(res);
});
const widths=[320,360,390,412,430,480,600,640,768,820,900,1024,1200,1366,1440,1920];
const core=['index.html','proyecto-intermodular.html','segundo-gmn.html','formacion-gmn.html','escuela.html','seguridad.html','material.html','logbook.html','naturistas.html','base-campamento.html','horizonte-nomada.html','viajes.html'];
const report={generatedAt:new Date().toISOString(),viewportChecks:[],languageChecks:[],interactions:[],errors:[],externalFailures:[]};
let browser;
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const base=`http://127.0.0.1:${server.address().port}/nomada-extremo/`;
 const edge='C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
 browser=await chromium.launch({headless:true,...(process.env.NOEXT_BROWSER?{executablePath:process.env.NOEXT_BROWSER}:fs.existsSync(edge)?{executablePath:edge}:{})});
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 const page=await context.newPage();
 page.on('pageerror',e=>report.errors.push({url:page.url(),error:e.message}));
 page.on('console',msg=>{if(msg.type()==='error')report.errors.push({url:page.url(),error:msg.text()});});
 page.on('response',r=>{if(r.status()>=400&&r.url().startsWith(base))report.errors.push({url:page.url(),error:`HTTP ${r.status()}: ${r.url().replace(base,'')}`});});
 page.on('requestfailed',r=>{if(!r.url().startsWith(base))report.externalFailures.push({url:r.url(),error:r.failure()?.errorText});});
 async function visit(file){await page.goto(base+file,{waitUntil:'domcontentloaded',timeout:30000});await page.waitForFunction(()=>document.querySelector('.nav-menu--architecture')&&window.noextTranslate,{timeout:15000});await page.waitForTimeout(180);}
 const all=fs.readdirSync(root).filter(p=>p.endsWith('.html')&&!['condiciones.html','politica-cookies.html','politica-privacidad.html','politica-devoluciones.html'].includes(p));
 for(const file of (process.argv.includes('--quick')?core:all)){
  await visit(file);
  const sizes=core.includes(file)?widths:[390,768,1440];
  for(const width of sizes){
   await page.setViewportSize({width,height:width<600?844:1000});await page.waitForTimeout(35);
   const result=await page.evaluate(()=>({h1:document.querySelectorAll('h1').length,overflow:document.documentElement.scrollWidth>innerWidth+1,scrollWidth:document.documentElement.scrollWidth,width:innerWidth,clippedAcademic:[...document.querySelectorAll('.n3 h1,.n3 h2,.n3 h3,.n3 p,.n3-button')].filter(el=>{const r=el.getBoundingClientRect();return r.width>0&&!el.closest('[hidden],.n3-table-wrap')&&(r.left< -1||r.right>innerWidth+1);}).map(el=>el.textContent.slice(0,80))}));
   report.viewportChecks.push({file,...result});
   if(result.h1!==1||result.overflow||result.clippedAcademic.length)report.errors.push({file,width,...result});
  }
  if(['index.html','proyecto-intermodular.html','segundo-gmn.html','formacion-gmn.html'].includes(file)){
   for(const width of [390,1440]){await page.setViewportSize({width,height:width===390?844:1000});await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:path.join(output,`${file.replace('.html','')}-${width}.png`)});}
  }
  console.log('Checked',file);
 }
 await page.setViewportSize({width:390,height:844});await visit('proyecto-intermodular.html');
 // Search uses accents and teacher names; empty states recover without reloading.
 await page.locator('#module-search').fill('marina');assert.equal(await page.locator('.im-matrix-item:visible').count(),2);
 await page.locator('#module-search').fill('xxxxxxxx');assert.equal(await page.locator('.im-matrix-item:visible').count(),0);assert(await page.locator('#module-empty').isVisible());
 await page.locator('#module-reset').click();assert.equal(await page.locator('.im-matrix-item:visible').count(),10);
 await page.locator('#module-area').selectOption('Bienestar animal');assert.equal(await page.locator('.im-matrix-item:visible').count(),2);await page.locator('#module-reset').click();report.interactions.push('Matrix: search, empty state, reset and area filter');
 await page.locator('#matriz').screenshot({path:path.join(output,'matriz-390.png')});
 await page.setViewportSize({width:1440,height:1000});await page.locator('#matriz').screenshot({path:path.join(output,'matriz-1440.png')});await page.setViewportSize({width:390,height:844});
 await page.locator('#fixed-cost').fill('1000');await page.locator('#unit-price').fill('60');await page.locator('#variable-cost').fill('20');await page.locator('[data-economy-button]').click();assert.match(await page.locator('#economy-result').innerText(),/25 unidades/);
 await page.locator('#unit-price').fill('20');await page.locator('[data-economy-button]').click();assert.match(await page.locator('#economy-result').innerText(),/no hay un margen/);report.interactions.push('Economy: valid calculation and zero-margin handling');
 await page.locator('[data-defense-start]').first().click();assert.equal(await page.locator('[data-chapter]:visible').count(),1);
 await page.keyboard.press('ArrowRight');assert.equal(await page.locator('[data-chapter]:visible').getAttribute('id'),'tres-capas');
 await page.locator('#defense-index').selectOption('bienestar-animal');assert.equal(await page.locator('[data-chapter]:visible').getAttribute('id'),'bienestar-animal');
 await page.screenshot({path:path.join(output,'defensa-390.png')});
 await page.locator('#defense-index').selectOption('conclusiones');await page.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight));
 assert(await page.evaluate(()=>document.querySelector('#conclusiones .n3-actions').getBoundingClientRect().bottom <= document.querySelector('#defense-controls').getBoundingClientRect().top),'Defense controls obscure final content');
 await page.keyboard.press('Escape');assert.equal(await page.locator('[data-chapter]:visible').count(),19);assert(!await page.locator('#defense-controls').isVisible());
 await page.locator('[data-defense-start]').first().click();await page.locator('#defense-exit').click();assert(await page.locator('#nav').isVisible());report.interactions.push('Defense: activation, arrows, index, Escape, explicit exit and focus restoration');
 const overlap=await page.evaluate(()=>{const n=document.querySelector('#navHamb').getBoundingClientRect();const el=document.elementFromPoint(n.x+n.width/2,n.y+n.height/2);return !!el?.closest('#navHamb');});assert(overlap,'Mobile hamburger is covered');
 await page.setViewportSize({width:844,height:390});assert(await page.locator('#navHamb').isVisible());assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);await page.setViewportSize({width:390,height:844});report.interactions.push('Mobile landscape and unobscured hamburger');
 await page.locator('#navHamb').click();assert.equal(await page.locator('#navHamb').getAttribute('aria-expanded'),'true');
 await page.locator('.nav-academic-shortcuts a[href="segundo-gmn.html"]').click();await page.waitForURL('**/segundo-gmn.html');await page.waitForFunction(()=>window.noextTranslate);assert.equal(await page.locator('#navHamb').getAttribute('aria-expanded'),'false');report.interactions.push('Mobile menu: accordion structure and academic shortcut');
 await page.keyboard.press('Control+k');await page.locator('.global-search__input').fill('intermodular');await page.waitForTimeout(100);assert(await page.locator('.global-search__result').count()>0);await page.keyboard.press('Escape');report.interactions.push('Global search: Ctrl+K, results and Escape');
 await page.setViewportSize({width:1440,height:1000});
 const menu=page.locator('.nav-mega-parent').first(),menuAnchor=menu.locator(':scope > a');
 await menuAnchor.focus();await page.keyboard.press('ArrowDown');assert.equal(await menuAnchor.getAttribute('aria-expanded'),'true');assert(await menu.locator('.nav-mega').isVisible());
 await page.keyboard.press('Escape');assert.equal(await menuAnchor.getAttribute('aria-expanded'),'false');assert(!await menu.locator('.nav-mega').isVisible());report.interactions.push('Desktop navigation: ArrowDown opens, Escape closes and restores focus');
 await visit('index.html');
 const heroOverlap=await page.evaluate(()=>{const a=document.querySelector('.hero-btns').getBoundingClientRect(),b=document.querySelector('.aviso-ficticio').getBoundingClientRect();return a.bottom>b.top;});assert(!heroOverlap,'Hero notice overlaps action buttons');
 await page.setViewportSize({width:390,height:844});
 const mobileHeroOverlap=await page.evaluate(()=>{const a=document.querySelector('.hero-btns').getBoundingClientRect(),b=document.querySelector('.aviso-ficticio').getBoundingClientRect();return a.bottom>b.top;});assert(!mobileHeroOverlap);await page.evaluate(()=>window.scrollTo(0,0));assert(await page.evaluate(()=>document.querySelector('.hero-eyebrow').getBoundingClientRect().top>=document.querySelector('#nav').getBoundingClientRect().bottom));report.interactions.push('Home: header, eyebrow, notice and hero buttons do not overlap');
 let externalSubmits=0;
 const noSubmit=r=>{if(r.method()==='POST')externalSubmits++;};page.on('request',noSubmit);
 await page.locator('#review-demo input[name="nombre"]').fill('Demostración');await page.locator('#review-demo input[name="actividad"]').fill('Prueba local');await page.locator('#review-demo textarea').fill('Reseña de prueba no enviada.');await page.locator('#review-demo select').selectOption({index:1});await page.locator('#review-consent').check();await page.locator('[data-demo-review]').click();assert.match(await page.locator('#review-demo [role="status"]').innerText(),/No se ha enviado/);assert.equal(externalSubmits,0);page.off('request',noSubmit);report.interactions.push('Review demo: local feedback, zero POST requests');
 for(const language of ['es','en','fr','de','it','pt']){
  const c=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await c.addInitScript(lang=>localStorage.setItem('noext-language',lang),language);
  const p=await c.newPage();
  p.on('pageerror',e=>report.errors.push({language,url:p.url(),error:e.message}));
  p.on('console',msg=>{if(msg.type()==='error')report.errors.push({language,url:p.url(),error:msg.text()});});
  for(const file of core){
   await p.goto(base+file,{waitUntil:'domcontentloaded'});await p.waitForFunction(l=>document.documentElement.lang===l&&document.querySelector('.nav-menu--architecture'),language,{timeout:15000});await p.waitForTimeout(160);
   const result=await p.evaluate(()=>({language:document.documentElement.lang,overflow:document.documentElement.scrollWidth>innerWidth+1,title:document.title,notice:document.querySelector('.project-top-notice')?.innerText,stageLabel:document.querySelector('[data-n3-copy]')?.lang||null,oldCurrentStatus:/alumno\s+de\s+1\s*[.º°o]*\s*GMN/i.test(document.body.innerText)}));
   report.languageChecks.push({file,requested:language,...result});
   if(result.overflow||!result.notice.includes('2026-2027')||result.oldCurrentStatus||(result.stageLabel&&result.stageLabel!==language))report.errors.push({file,language,error:'Language overflow, wrong status language or stale academic notice',...result});
  }
  await c.close();console.log('Languages checked:',language);
 }
 for(const legacy of ['condiciones.html','politica-cookies.html','politica-privacidad.html','politica-devoluciones.html']){await page.goto(base+legacy);await page.waitForURL(url=>url.pathname.endsWith('/aviso-legal.html'));}
 report.interactions.push('Four legacy policy redirects resolve to the legal page');
 const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const plain=await nojs.newPage();
 await plain.goto(base+'proyecto-intermodular.html');assert.equal(await plain.locator('.im-matrix-item').count(),10);assert.equal(await plain.locator('.im-module').count(),10);assert.equal(await plain.locator('[data-chapter]').count(),19);
 report.interactions.push('Without JavaScript: full memory, ten modules and ten matrix rows');await nojs.close();
 await context.close();
})().catch(error=>{report.errors.push({error:error.stack});process.exitCode=1;}).finally(async()=>{
 if(browser)await browser.close();server.close();
 report.externalFailures=[...new Map(report.externalFailures.map(e=>[e.url,e])).values()];
 fs.writeFileSync(path.join(output,'browser-stage3.json'),JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({viewports:report.viewportChecks.length,languages:report.languageChecks.length,interactions:report.interactions.length,errors:report.errors,externalFailures:report.externalFailures.length},null,2));
 if(report.errors.length)process.exitCode=1;
});
