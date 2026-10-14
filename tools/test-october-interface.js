const {chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://local').pathname));if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.svg':'image/svg+xml'}[path.extname(file)]||'application/octet-stream'));fs.createReadStream(file).pipe(res);});
let browser;
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 const page=await browser.newPage({reducedMotion:'reduce'}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 const screenshots=[['actividades.html',['#top-fichas','#territorio','#rutas-aguilas','#kitesurf','#naturista']],['senderismo-guiado.html',['.page-hero','.activity-detail-grid']],['naturistas.html',['.page-hero','#leer-no-es-una-moda','#leer-un-dia-al-mes-en-la-naturaleza']],['index.html',['.adventure-reviews','.home-guarantee','.editorial-contact','#footer']]];
 for(const width of [390,1366]){
  await page.setViewportSize({width,height:1000});
  for(const [file,selectors]of screenshots){
   await page.goto('http://127.0.0.1:'+server.address().port+'/'+file);await page.waitForTimeout(500);
   if(file==='index.html')await page.locator('details:has(.adventure-reviews),details:has(.home-guarantee)').evaluateAll(es=>es.forEach(e=>e.open=true));
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),file+' overflow at '+width);
   for(const selector of selectors){const el=page.locator(selector).first();await el.scrollIntoViewIfNeeded();await el.locator('img').evaluateAll(async es=>Promise.all(es.map(e=>{e.loading="eager";return e.decode().catch(()=>{});})));await page.waitForTimeout(100);await page.locator('#site-header,#contactDock,.skip-link').evaluateAll(es=>es.forEach(e=>e.style.visibility='hidden'));await el.screenshot({path:'tools/reports/oct14-'+file.replace('.html','')+'-'+selector.replace(/[^a-z]/g,'')+'-'+width+'.png'});await page.locator('#site-header,#contactDock,.skip-link').evaluateAll(es=>es.forEach(e=>e.style.visibility=''));}
   if(file==='actividades.html'){
    assert.equal(await page.locator('#top-fichas .editorial-top-card').count(),12);assert.equal(await page.locator('.territorio-card').first().evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(22, 63, 71)');
    assert.equal(await page.locator('#top-fichas img').evaluateAll(es=>es.every(e=>e.naturalWidth>0)),true);
    const kite=await page.locator('#kitesurf .ficha-img img').evaluate(e=>({fit:getComputedStyle(e).objectFit,ratio:e.getBoundingClientRect().width/e.getBoundingClientRect().height}));
    assert.equal(kite.fit,'contain');assert(Math.abs(kite.ratio-1.5)<.02,'whole kite frame');
   }
   if(file==='senderismo-guiado.html'){
    assert.equal(await page.locator('.page-hero-gradient').evaluate(e=>getComputedStyle(e).display),'none');
    assert.equal(await page.locator('.page-hero h1').evaluate(e=>getComputedStyle(e).color),'rgb(25, 77, 97)');
    assert.equal(await page.locator('.activity-panel').count(),6);
   }
   if(file==='naturistas.html'){assert(!/dos días al mes|mensual o bimestral/.test(await page.locator('body').innerText()));assert.equal(await page.locator('.nat-valor').count(),5);assert(await page.locator('.nat-valor').evaluateAll(es=>es.every(e=>getComputedStyle(e).opacity==='1')));}
  }
 }
 for(const lang of ['en','fr','de','it','pt','nl']){const ctx=await browser.newContext({viewport:{width:390,height:900}});await ctx.addInitScript(l=>localStorage.setItem('noext-language',l),lang);const p=await ctx.newPage();await p.goto('http://127.0.0.1:'+server.address().port+'/naturistas.html');await p.waitForFunction(l=>document.documentElement.lang===l,lang);assert.deepEqual(await p.evaluate(()=>window.auditI18n()),[],lang+' missing translations');assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),lang+' overflow');await ctx.close();}
 assert.deepEqual(errors,[]);console.log('October interface: desktop/mobile layout, complete equipment, metadata and schedule checks passed.');
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{await browser?.close();server.close();});
