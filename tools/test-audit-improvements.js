const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict'),zlib=require('node:zlib');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),out=path.resolve(process.env.NOEXT_REPORT_DIR||path.join(root,'tools/reports/audit-improvements'));
fs.mkdirSync(out,{recursive:true});
const mime={'.html':'text/html; charset=utf-8','.json':'application/json; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.jpg':'image/jpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{
 let f;try{f=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://local').pathname));}catch{res.writeHead(400).end();return;}
 if(!f.startsWith(root+path.sep)||!fs.existsSync(f)||!fs.statSync(f).isFile()){res.writeHead(404).end();return;}
 let data=fs.readFileSync(f);const ext=path.extname(f),headers={'Content-Type':mime[ext]||'application/octet-stream'};
 if(/gzip/.test(req.headers['accept-encoding']||'')&&['.html','.css','.js','.json'].includes(ext)){data=zlib.gzipSync(data);headers['Content-Encoding']='gzip';}
 res.writeHead(200,headers).end(data);
});
const report={date:'2026-10-25',checks:[],pages:[],errors:[],missing:[],snapshots:[]};let browser;
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port+'/';
 browser=await chromium.launch({headless:true,...(fs.existsSync('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe')?{executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'}:{})});
 const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await context.addInitScript(()=>{window.translationRecoveries=[];window.addEventListener('noext:i18n-recovery',e=>window.translationRecoveries.push(e.detail));});
 const page=await context.newPage();
 page.on('pageerror',e=>report.errors.push({page:page.url(),message:e.message}));
 page.on('console',m=>{if(m.text().startsWith('Missing i18n key:'))report.missing.push({page:page.url(),message:m.text()});});
 page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)report.errors.push({page:page.url(),message:'HTTP '+r.status()+' '+r.url()});});
 const visit=async file=>{await page.goto(base+file);await page.waitForTimeout(550);};
 await visit('index.html');await page.waitForTimeout(800);
 report.home=await page.evaluate(()=>({reader:!!document.querySelector('#home-reader-root'),groups:document.querySelectorAll('.home-explore-group').length,resources:performance.getEntriesByType('resource').filter(r=>r.name.startsWith(location.origin)).map(r=>({url:r.name,encoded:r.encodedBodySize,decoded:r.decodedBodySize})),sheets:[...document.styleSheets].map(s=>s.href)}));
 assert.equal(report.home.reader,false);assert.equal(report.home.groups,3);
 assert(!report.home.resources.some(r=>/hero-principal.png|fondo-index-noext.png/.test(r.url)));
 report.home.encodedBytes=report.home.resources.reduce((s,r)=>s+r.encoded,0);
 report.home.translationRecoveries=await page.evaluate(()=>window.translationRecoveries);
 if(process.argv.includes('--home-only')){console.log(JSON.stringify(report.home));return;}
 report.checks.push('Home: reader absent, three groups, large PNG backgrounds absent');
 await page.screenshot({path:path.join(out,'home-mobile.png'),fullPage:true});
 await page.goto(base+'index.html#material-preparacion-home');await page.waitForTimeout(350);
 assert(await page.locator('#material-preparacion-home').isVisible());
 report.checks.push('Home: deep link opens all ancestor groups');
 await visit('packs.html');
 const formats=page.locator('#configurador .config-opt.arena');assert.equal(await formats.count(),5);
 assert.equal(await page.locator('#configurador span.config-opt').count(),0);
 for(const b of await formats.all()){await b.click();assert.equal(await b.getAttribute('aria-pressed'),'true');assert.equal(await page.locator('#configurador .config-opt.arena.sel').count(),1);}
 const pair=formats.nth(1);await pair.focus();await page.keyboard.press('Space');assert.equal(await pair.getAttribute('aria-pressed'),'true');
 const extras=page.locator('#configurador .config-opt.verde');await extras.nth(0).click();await extras.nth(1).click();assert.equal(await page.locator('#configurador .config-opt.verde.sel').count(),2);
 assert.match(await page.locator('.experience-selection').innerText(),/Pareja/);
 assert.match(await page.locator('#configurador a.btn-bosque').getAttribute('href'),/experiencia=/);
 await page.locator('#configurador').screenshot({path:path.join(out,'packs-mobile.png')});
 report.checks.push('Packs: every format selects; exclusive formats; multiple extras; Space key; consultation link');
 await visit('kayak-mar.html');const duration=await page.locator('.activity-meta-list strong').first().innerText();
 assert.equal(await page.evaluate(()=>window.noextGetActivitySpec('KAYAK DE MAR').duracion),duration);
 assert.equal(await page.evaluate(()=>window.noextGetActivitySpec('KAYAK DE MAR').edad),'Desde 12 años');
 assert.equal(await page.locator('.activity-panel h3').count(),0);assert(await page.locator('.preparation-print').isVisible());
 await page.emulateMedia({media:'print'});await page.screenshot({path:path.join(out,'kayak-print.png'),fullPage:true});await page.emulateMedia({media:'screen'});
 await page.screenshot({path:path.join(out,'kayak-mobile.png'),fullPage:true});
 report.checks.push('Kayak: canonical data equals sheet; preparation print layout; H2 panels');
 await visit('actividad-detalle.html');assert(page.url().endsWith('kayak-mar.html'));report.checks.push('Old sample redirects to canonical kayak');
 await visit('actividades.html');await page.locator('.filter-groups summary').click();await page.locator('.filter-chip').filter({hasText:/^Mar$/}).click();await page.waitForTimeout(350);
 const count=await page.locator('.ficha:visible').count();assert(count>0&&count<33);assert(page.url().includes('f-'));
 await page.reload();await page.waitForTimeout(550);assert.equal(await page.locator('.ficha:visible').count(),count);
 await page.locator('.activity-filter-clear').click();await page.waitForTimeout(350);assert.equal(await page.locator('.ficha:visible').count(),33);
 report.checks.push('Catalog: filters survive reload and reset to all 33 activities');
 for(const file of ['audiovisual.html','grupos.html','transparencia-financiacion.html']){await visit(file);for(const region of await page.locator('.responsive-table,.finance-table-wrap').all()){assert.equal(await region.getAttribute('tabindex'),'0');assert.equal(await region.getAttribute('role'),'region');await region.focus();assert(await region.evaluate(e=>document.activeElement===e));}}
 report.checks.push('Scrollable tables accept keyboard focus');
 const pages=fs.readdirSync(root).filter(f=>f.endsWith('.html')&&!/http-equiv="refresh"/.test(fs.readFileSync(path.join(root,f),'utf8')));
 await page.evaluate(()=>localStorage.setItem('noext-language','nl'));
 for(const file of pages){await visit(file);const result=await page.evaluate(()=>({lang:document.documentElement.lang,overflow:document.documentElement.scrollWidth>innerWidth+1,missing:window.auditI18n?.().length||0,main:document.querySelectorAll('main,[role="main"]').length,og:!!document.querySelector('meta[property="og:image"]'),dock:document.querySelector('#contactDock')?.tagName}));report.pages.push({file,...result});assert.equal(result.lang,'nl',file);assert.equal(result.overflow,false,file);assert.equal(result.missing,0,file);assert(result.og,file);assert.equal(result.dock,'NAV',file);}
 for(const language of ['es','en','fr','de','it','pt','nl']){await page.evaluate(lang=>localStorage.setItem('noext-language',lang),language);await visit('packs.html');assert.equal(await page.locator('html').getAttribute('lang'),language);await page.locator('#configurador .config-opt.arena').nth(1).click();assert.equal(await page.locator('#configurador .config-opt.arena').nth(1).getAttribute('aria-pressed'),'true');}
 await page.evaluate(()=>localStorage.setItem('noext-language','es'));
 for(const file of ['index.html','contacto.html','material.html','naturistas.html','comunidad.html','logbook.html']){await visit(file);await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:path.join(out,file.replace('.html','')+'-desktop.png')});report.snapshots.push(file);}
 assert.deepEqual(report.errors,[]);assert.deepEqual(report.missing,[]);
 console.log(JSON.stringify({checks:report.checks,pages:report.pages.length,homeBytes:report.home.encodedBytes,fullCatalogs:report.home.resources.filter(r=>/i18n\/[a-z]+\.json/.test(r.url)).map(r=>r.url),errors:report.errors.length}));
})().catch(e=>{report.errors.push({message:e.stack});console.error(e);process.exitCode=1;}).finally(async()=>{fs.writeFileSync(path.join(out,'audit-improvements.json'),JSON.stringify(report,null,2));await browser?.close();server.close();});
