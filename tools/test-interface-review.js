const {chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://local').pathname));if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404).end();return;}const types={'.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css','.webp':'image/webp'};res.setHeader('Content-Type',(types[path.extname(file)]||'application/octet-stream')+'; charset=utf-8');fs.createReadStream(file).pipe(res);});


const assert=require('node:assert/strict');
let browser;
(async()=>{
await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port+'/';
browser=await chromium.launch({headless:true,...(fs.existsSync('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe')?{executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'}:{})});
const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
const visit=async f=>{await page.goto(base+f);await page.waitForTimeout(400);};
await visit('actividades.html');
assert.equal(await page.locator('.catalog-navigation').evaluate(e=>getComputedStyle(e).position),'static');
assert.equal(await page.locator('.filter-groups').getAttribute('open'),null);
await page.locator('#montana').scrollIntoViewIfNeeded();await page.waitForTimeout(600);await page.screenshot({path:'tools/reports/review-activities-mobile.png'});
await page.locator('.filter-groups summary').click();await page.locator('.filter-chip').filter({hasText:/^Mar$/}).click();await page.waitForTimeout(300);
assert(await page.locator('.ficha:visible').count()>0);assert(await page.locator('.ficha:visible').count()<46);
await page.locator('.activity-filter-clear').click();await page.waitForTimeout(300);assert.equal(await page.locator('.ficha:visible').count(),46);
await page.locator('.filter-groups summary').click();await page.locator('.ficha-tech-btn').last().scrollIntoViewIfNeeded();await page.waitForTimeout(150);const y=await page.evaluate(()=>scrollY);
await page.locator('.ficha-tech-btn').last().click();await page.keyboard.press('Escape');assert(Math.abs((await page.evaluate(()=>scrollY))-y)<5,'technical modal retains scroll');
for(const f of ['grupos.html','como-funciona.html']){await visit(f);assert.equal(await page.locator('.process-card .ficha-tech-btn').count(),0);}
await visit('blog.html');assert.equal(await page.locator('[data-i18n="blog.criteria.line2"]').innerText(),'N\u00d3MADA');
for(const b of await page.locator('[data-article]').all()){await b.scrollIntoViewIfNeeded();const before=await page.evaluate(()=>scrollY);await b.click();assert(await page.locator('#articleModalBody h3').count()>=2);await page.screenshot({path:'tools/reports/review-article-mobile.png'});await page.keyboard.press('Escape');assert.equal(await page.locator('#articleModal').getAttribute('aria-hidden'),'true');assert(Math.abs((await page.evaluate(()=>scrollY))-before)<5);}
for(const width of [390,1440]){await page.setViewportSize({width,height:1000});for(const [f,selector] of [['logbook.html','#logbook-premium-system'],['base-campamento.html','#base-principal'],['base-campamento.html','#flota'],['contacto.html','.contact-channel-grid'],['comunidad.html','.summer-grid']]){await visit(f);await page.locator(selector).scrollIntoViewIfNeeded();await page.locator(selector+' img').evaluateAll(async images=>{await Promise.all(images.map(img=>img.decode().catch(()=>{})));});await page.waitForTimeout(300);await page.screenshot({path:'tools/reports/review-'+f.replace('.html','')+'-'+selector.replace(/[^a-z]/g,'')+'-'+width+'.png'});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),f+' overflow');if(f==='logbook.html')assert.equal(await page.locator('.nomada-device').count(),0);}}
assert.deepEqual(errors,[]);console.log('Interface regression checks passed. Screenshots saved.');
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{await browser?.close();server.close()});
