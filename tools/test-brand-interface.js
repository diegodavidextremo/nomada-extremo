const {chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://local').pathname));if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html','.css':'text/css','.js':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp'})[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(res);});
let browser;
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 const page=await browser.newPage({reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 const base='http://127.0.0.1:'+server.address().port+'/';
 for(const width of [360,390,768,1024,1366,1920]){
  await page.setViewportSize({width,height:1000});
  for(const file of ['index','escuela','logbook','comunidad']){
   await page.goto(base+file+'.html');await page.locator('.nav-logo-img').waitFor();await page.locator('.nav-logo-img').evaluate(e=>e.decode());
   await page.waitForTimeout(150);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),file+' horizontal overflow '+width);
   const before=await page.locator('.nav-logo-img').boundingBox();assert(before.width>=(width<=760?64:width<=1200?76:88)-1);
   await page.evaluate(()=>scrollTo(0,700));await page.waitForTimeout(200);assert.equal(Math.round((await page.locator('.nav-logo-img').boundingBox()).width),Math.round(before.width));
   assert.equal(await page.locator('.brand-word').count(),2);
   assert.equal(await page.locator('.noext-cursor:visible').count(),0);
   if(file==='escuela'){
    assert.equal(await page.locator('.school-overview-card__icon svg').count(),6);assert.equal(await page.locator('.common-training-card__icon svg').count(),10);
    await page.locator('.common-training-card__detail summary').first().click();assert(await page.locator('.common-training-card__detail[open] p').first().isVisible());
    await page.locator('[data-route-id]').first().click();assert(await page.locator('dialog[open]').count()>0);await page.keyboard.press('Escape');assert.equal(await page.locator('dialog[open]').count(),0);
   }
   if(file==='comunidad'){assert.equal(await page.locator('.pack-grid article>strong').count(),8);assert.equal(await page.locator('.summer-campaign-icon svg').count(),4);}
   if(file==='logbook'){assert.equal(await page.locator('.qr-fake i').count(),0);assert.equal(await page.locator('.qr-fake img').count(),1);}
  }
  console.log('Brand size, layout and controls passed: '+width);
 }
 await page.setViewportSize({width:1366,height:1000});
 for(const [file,selector,name] of [['index','.home-origin-values','origin'],['escuela','.school-overview__grid','school'],['escuela','.common-training__grid','modules'],['escuela','.credencial','credentials'],['escuela','.aval-grid','references'],['logbook','.qr-credential-card','pass'],['comunidad','.pack-grid','packs'],['comunidad','.summer-grid','summer']]){
  await page.goto(base+file+'.html');await page.locator(selector).first().scrollIntoViewIfNeeded();await page.waitForTimeout(200);await page.screenshot({path:'tools/reports/brand-interface-'+name+'.png'});
 }
 assert.deepEqual(errors,[]);console.log('All brand interface checks passed.');
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{await browser?.close();server.close()});
