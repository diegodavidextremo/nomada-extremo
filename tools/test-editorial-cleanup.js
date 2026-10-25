const fs=require('fs'),path=require('path'),http=require('http'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),out=path.resolve(process.env.NOEXT_REPORT_DIR||path.join(root,'tools/reports/editorial-cleanup'));
fs.mkdirSync(out,{recursive:true});
const server=http.createServer((req,res)=>{
 const pathname=new URL(req.url,'http://local').pathname;
 if(pathname==='/fixture-headings.html'){res.setHeader('Content-Type','text/html; charset=utf-8');res.end('<!doctype html><html lang="es"><body data-page-purpose="reference"><main><h1>Prueba</h1><section><h2>CANALES<br><span>OFICIALES</span></h2></section><section><h2>LA AVENTURA EMPIEZA<br>CON CRITERIO.</h2></section><section><h2>TRES ESTADOS.<br>UNA IDENTIDAD.</h2></section><section><h2>LA TECNOLOGÍA<br>AL SERVICIO DEL MÉTODO.</h2></section></main><script src="assets/js/site-improvements.js"></script></body></html>');return;}
 let f;try{f=path.resolve(root,'.'+decodeURIComponent(pathname));}catch{res.writeHead(400).end();return;}if(!f.startsWith(root+path.sep)||!fs.existsSync(f)||!fs.statSync(f).isFile()){res.writeHead(404).end();return;}
 res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css','.json':'application/json','.webp':'image/webp','.svg':'image/svg+xml'}[path.extname(f)]||'application/octet-stream'));res.end(fs.readFileSync(f));
});
let browser;const report={checks:[],errors:[],pages:[]};
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port+'/';
 browser=await chromium.launch({headless:true,...(fs.existsSync('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe')?{executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'}:{})});
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});page.on('pageerror',e=>report.errors.push(e.message));
 const visit=async file=>{await page.goto(base+file);await page.waitForTimeout(450);};
 await visit('fixture-headings.html');assert.deepEqual(await page.locator('.document-index a').allTextContents(),['CANALES OFICIALES','LA AVENTURA EMPIEZA CON CRITERIO.','TRES ESTADOS. UNA IDENTIDAD.','LA TECNOLOGÍA AL SERVICIO DEL MÉTODO.']);report.checks.push('Index labels preserve line-break spaces and punctuation');
 const contacts=['https://wa.me/34623179618','mailto:nomadaextremoaguilas@gmail.com','https://t.me/DiegoDavidExtremo','https://www.instagram.com/nomadaextremoes/','https://x.com/nomadaextremoES','https://www.youtube.com/@diegodavidextremo','https://www.tiktok.com/@diegodavidextremo'];
 for(const language of ['es','en','fr','de','it','pt','nl']){
  await page.evaluate(l=>localStorage.setItem('noext-language',l),language);await visit('contacto.html');await page.waitForFunction(l=>document.documentElement.lang===l,language);
  assert.equal(await page.locator('.document-index').count(),0);assert.equal(await page.locator('.contact-social-close,.horario-grid,#waFloat').count(),0);
  for(const url of contacts)assert.equal(await page.locator('a[href="'+url+'"]').count(),1,language+' '+url);
  assert.equal(await page.locator('.contact-hub-link').count(),7);report.checks.push('One directory, seven unique channels: '+language);
 }
 await page.evaluate(()=>localStorage.setItem('noext-language','es'));
 for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:width<600?844:1000});for(const file of ['contacto.html','proyecto-intermodular.html','index.html','packs.html']){await visit(file);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,file+' '+width);assert.equal(await page.locator('#waFloat').count(),0);if(file==='proyecto-intermodular.html'){assert.equal(await page.locator('.document-index').count(),0);assert.equal(await page.locator('[data-chapter]').count(),10);assert.equal(await page.locator('.im-matrix-item').count(),10);assert.equal(await page.locator('#trabajo-lunes a[href^="https://docs.google.com/"]').count(),1);}if(width===390||width===1440)await page.screenshot({path:path.join(out,file.replace('.html','')+'-'+width+'.png'),fullPage:file==='contacto.html'});report.pages.push({file,width});}}
 await visit('contacto.html');let posts=0;page.on('request',r=>{if(r.method()==='POST')posts++;});await page.locator('#contactName').fill('Prueba local');await page.locator('#contactEmail').fill('prueba@example.com');await page.locator('#contactMessage').fill('Verificación de demostración.');await page.locator('#rgpdC').check();await page.locator('[data-contact-demo]').click();await page.locator('#contactMsg').waitFor({state:'visible'});assert.equal(posts,0);report.checks.push('Form simulation still validates without posting');
 assert.deepEqual(report.errors,[]);console.log(JSON.stringify(report));
})().catch(e=>{report.errors.push(e.stack);console.error(e);process.exitCode=1;}).finally(async()=>{fs.writeFileSync(path.join(out,'editorial-cleanup.json'),JSON.stringify(report,null,2));await browser?.close();server.close();});
