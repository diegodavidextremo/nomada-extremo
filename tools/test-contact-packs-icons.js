const {chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{
 const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://local').pathname));
 if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404).end();return;}
 res.setHeader('Content-Type',({'.html':'text/html','.css':'text/css','.js':'text/javascript','.json':'application/json'})[path.extname(file)]||'application/octet-stream');
 fs.createReadStream(file).pipe(res);
});
let browser;
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const base='http://127.0.0.1:'+server.address().port+'/';
 browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 const page=await browser.newPage({reducedMotion:'reduce'}),errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 for(const width of [1366,1024,390]){
  await page.setViewportSize({width,height:844});
  for(const filename of ['contacto.html','packs.html']){
   await page.goto(base+filename);
   await page.locator('.ui-whatsapp-logo').waitFor();
   assert.equal(await page.locator('.ui-whatsapp-logo').count(),1);
   assert(await page.locator('.ui-whatsapp-logo').evaluate(img=>img.complete&&img.naturalWidth>0));
   assert(!/\bWA\s/.test(await page.locator('body').textContent()));
   assert(!(await page.locator('body').textContent()).replace(/[©®]/g,'').match(/\p{Extended_Pictographic}/u));
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   if(filename==='packs.html'){
    assert.equal(await page.locator('.bono-icono .ui-line-icon').count(),9);
    assert.equal(await page.locator('.config-opt').count(),35);
    assert(await page.locator('.ui-line-icon').evaluateAll(icons=>icons.every(icon=>!icon.querySelector('div,span,p')&&icon.getBoundingClientRect().width<=52)));
    const option=page.locator('.config-opt').filter({hasText:/^\s*Kayak\s*$/});
    await option.click();assert(await option.evaluate(el=>el.classList.contains('sel')));
    assert.equal(await option.locator('svg').count(),1);
    await option.click();assert(!(await option.evaluate(el=>el.classList.contains('sel'))));
    if(width===1366){
     await page.locator('#bonos').scrollIntoViewIfNeeded();await page.waitForTimeout(400);
     await page.screenshot({path:'tools/reports/packs-bonos-line-icons.png'});
     await page.locator('.config-block').first().scrollIntoViewIfNeeded();
     await page.screenshot({path:'tools/reports/packs-config-line-icons.png'});
    }
   }else{
    assert.equal(await page.locator('.mapa-pin .ui-line-icon').count(),1);
    if(width===1366){await page.locator('h2').filter({hasText:'CONTACTO'}).last().scrollIntoViewIfNeeded();await page.screenshot({path:'tools/reports/contact-line-icons.png'});}
   }
  }
 }
 await page.setViewportSize({width:1366,height:844});
 for(const language of ['es','en','fr','de','it','pt']){
  for(const filename of ['contacto.html','packs.html']){
   await page.goto(base+filename);
   await page.locator(`[data-language-switcher] [data-lang="${language}"]`).first().click();
   await page.waitForFunction(lang=>document.documentElement.lang===lang,language);
   await page.waitForTimeout(100);
   const missing=await page.evaluate(()=>window.auditI18n());
   assert.deepEqual(missing,[],filename+' '+language);
   assert(!(await page.locator('body').textContent()).replace(/[©®]/g,'').match(/\p{Extended_Pictographic}/u));
   assert.equal(await page.locator('.ui-whatsapp-logo').count(),1);
   if(filename==='packs.html') {
    assert.equal(await page.locator('.bono-icono .ui-line-icon').count(),9);
    assert.equal(await page.locator('.config-opt').count(),35);
    assert(await page.locator('.ui-line-icon').evaluateAll(icons=>icons.every(icon=>!icon.querySelector('div,span,p')&&icon.getBoundingClientRect().width<=52)));
   }
  }
 }
 assert.deepEqual(errors,[]);
 console.log('Contacto/Packs: desktop, laptop, mobile, chip selection, WhatsApp logos and six languages passed.');
})().catch(error=>{console.error(error);process.exitCode=1;}).finally(async()=>{await browser?.close();server.close();});
