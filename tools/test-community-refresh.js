const {chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{
 const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://local').pathname));
 if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404).end();return;}
 res.setHeader('Content-Type',({'.html':'text/html','.css':'text/css','.js':'text/javascript','.json':'application/json','.webp':'image/webp','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(res);
});
let browser;
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 const page=await browser.newPage({reducedMotion:'reduce'}),errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 await page.addInitScript(()=>{window.copiedCodes=[];Object.defineProperty(navigator,'clipboard',{value:{writeText:async text=>window.copiedCodes.push(text)}})});
 const base='http://127.0.0.1:'+server.address().port+'/';
 for(const width of [1366,1024,390]){
  await page.setViewportSize({width,height:900});
  for(const file of ['comunidad','logbook']){
   await page.goto(base+file+'.html');await page.locator('#footer').waitFor();
   await page.evaluate(()=>document.querySelectorAll('img').forEach(img=>img.loading='eager'));
   await page.waitForFunction(()=>[...document.images].every(img=>img.complete));
   assert.deepEqual(await page.locator('img').evaluateAll(images=>images.filter(img=>!img.naturalWidth).map(img=>img.src)),[]);
   assert.equal(await page.locator('img[src*="/noext/"]').count(),0);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),file+' overflow '+width);
   if(file==='comunidad'){
    assert.equal(await page.locator('.coupon-copy').count(),22);
    assert.equal(await page.locator('.social-premium-card .social-icon img').count(),6);
    assert.equal(await page.locator('.reward-grid img').count(),3);
    const filters=page.locator('[data-coupon-filter]');
    for(let i=0;i<await filters.count();i++){
     await filters.nth(i).click();assert(await page.locator('.promo-coupon:visible').count()>0);
     assert.equal(await page.locator('[data-coupon-filter][aria-pressed="true"]').count(),1);
    }
    await page.locator('[data-coupon-filter="all"]').click();
    assert.equal(await page.locator('.promo-coupon:visible').count(),22);
    await page.locator('.coupon-copy').first().click();
    assert.equal(await page.evaluate(()=>window.copiedCodes.at(-1)),'DIEGODAVIDEXTREMO');
    await page.locator('#simular-cupon').click();assert(await page.locator('#resultado-cupon').isVisible());
    for(const [selector,name] of [['.coupon-hero','coupons'],['#tienda-nomada','products'],['.reward-grid','rewards'],['.social-premium-grid','social'],['.campaign-grid','campaigns']]){
     await page.locator(selector).scrollIntoViewIfNeeded();await page.waitForTimeout(200);await page.screenshot({path:`tools/reports/community-${name}-${width}.png`});
    }
   }else{
    await page.locator('#dashboard-logbook').scrollIntoViewIfNeeded();await page.locator('.logbook-profile-logo').evaluate(img=>img.decode());await page.waitForTimeout(200);assert(await page.locator('.logbook-profile-logo').isVisible());await page.screenshot({path:`tools/reports/logbook-refresh-${width}.png`});
   }
  }
  console.log('Community/Logbook layout and controls passed: '+width);
 }
 await page.setViewportSize({width:1366,height:900});
 for(const lang of ['en','fr','de','it','pt']){
  for(const file of ['comunidad','logbook']){
   await page.goto(base+file+'.html');await page.locator(`[data-language-switcher] [data-lang="${lang}"]`).first().click();
   await page.waitForFunction(language=>document.documentElement.lang===language,lang);await page.waitForTimeout(100);
   assert.deepEqual(await page.evaluate(()=>window.auditI18n()),[],file+' '+lang);
   if(file==='comunidad'){
    assert.equal(await page.locator('.promo-coupon h3').first().textContent(),'DIEGODAVIDEXTREMO');
    await page.locator('[data-coupon-filter="family"]').click();assert(await page.locator('.promo-coupon:visible').count()>0);
   }
  }
 }
 assert.deepEqual(errors,[]);console.log('Six languages passed; all generated images load; no JavaScript errors.');
})().catch(error=>{console.error(error);process.exitCode=1}).finally(async()=>{await browser?.close();server.close()});
