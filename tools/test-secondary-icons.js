const {chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{
 const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://local').pathname));
 if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404).end();return;}
 res.setHeader('Content-Type',({'.html':'text/html','.css':'text/css','.js':'text/javascript','.json':'application/json'})[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(res);
});
const files=['audiovisual','comunidad','quienes-somos','fundador','formularios','alquiler','certificaciones','escuela','sostenibilidad'];
let browser;
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const base='http://127.0.0.1:'+server.address().port+'/';
 browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 const page=await browser.newPage({reducedMotion:'reduce'}),errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 for(const width of [1366,1024,390]){
  await page.setViewportSize({width,height:844});
  for(const file of files){
   await page.goto(base+file+'.html');await page.locator('#footer').waitFor();
   const copy=(await page.locator('body').textContent()).replace(/[©®]/g,'');
   assert(!copy.match(/\p{Extended_Pictographic}/u),file+' contains emoji');
   assert(await page.locator('.ui-line-icon').evaluateAll(icons=>icons.every(icon=>!icon.querySelector('div,span,p')&&icon.getBoundingClientRect().width<=52)),file+' SVG markup');
   if(file==='sostenibilidad'){
    const layout=await page.evaluate(()=>{
     const actions=document.querySelector('.sustainability-actions'),grid=document.querySelector('.eco-commitment-grid');
     const bounds=actions.parentElement.getBoundingClientRect();
     return {below:actions.getBoundingClientRect().top>=grid.getBoundingClientRect().bottom,contained:[...actions.children].every(btn=>{const b=btn.getBoundingClientRect();return b.left>=bounds.left-1&&b.right<=bounds.right+1})};
    });
    assert(layout.below&&layout.contained,'Sustainability button placement '+width);
    if(width===1366){await page.locator('.eco-commitment-grid').scrollIntoViewIfNeeded();await page.screenshot({path:'tools/reports/sustainability-actions.png'});}
   }
   if(file==='alquiler'){
    assert.equal(await page.locator('.alq-nombre').filter({hasText:'Leash de seguridad'}).count(),0);
    assert((await page.locator('.rental-safety-note').textContent()).includes('sin suplemento'));
    assert(copy.includes('Tabla SUP + remo + leash incluido'));
    assert.equal(await page.locator('.alq-item:has(.alq-icon)').count(),8);
    if(width===1366){await page.locator('.alq-item').first().scrollIntoViewIfNeeded();await page.screenshot({path:'tools/reports/rental-line-icons.png'});}
   }
   if(width===1366&&['audiovisual','formularios','certificaciones','comunidad'].includes(file)){
    const selector={audiovisual:'.cam-card',formularios:'.form-icono',certificaciones:'.itin-icon',comunidad:'.badge-circle'}[file];
    await page.locator(selector).first().scrollIntoViewIfNeeded();await page.waitForTimeout(200);
    await page.screenshot({path:`tools/reports/${file}-professional-icons.png`});
   }
  }
  console.log('Layout and icons passed at '+width+' px');
 }
 await page.setViewportSize({width:1366,height:844});
 for(const language of ['en','fr','de','it','pt']){
  for(const file of files){
   await page.goto(base+file+'.html');
   await page.locator(`[data-language-switcher] [data-lang="${language}"]`).first().click();
   await page.waitForFunction(lang=>document.documentElement.lang===lang,language);await page.waitForTimeout(100);
   assert.deepEqual(await page.evaluate(()=>window.auditI18n()),[],file+' '+language);
   const copy=(await page.locator('body').textContent()).replace(/[©®]/g,'');
   assert(!copy.match(/\p{Extended_Pictographic}/u),file+' '+language+' restores emoji');
  }
  console.log('Translations passed: '+language);
 }
 assert.deepEqual(errors,[]);
 console.log('Professional icons, sustainability actions and included leash verified.');
})().catch(error=>{console.error(error);process.exitCode=1;}).finally(async()=>{await browser?.close();server.close();});
