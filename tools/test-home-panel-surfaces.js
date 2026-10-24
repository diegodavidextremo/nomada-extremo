const {chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{const f=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://local').pathname));if(!f.startsWith(root+path.sep)||!fs.existsSync(f)||!fs.statSync(f).isFile()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.svg':'image/svg+xml'}[path.extname(f)]||'application/octet-stream'));fs.createReadStream(f).pipe(res);});
let browser;
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 const page=await browser.newPage({reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [390,768,1366,1920]){
  await page.setViewportSize({width,height:1000});await page.goto('http://127.0.0.1:'+server.address().port+'/index.html');
  await page.waitForFunction(()=>[...document.querySelectorAll('.home-explore-panel>summary')].every(e=>getComputedStyle(e).maxWidth==='none'));
  await page.evaluate(()=>document.querySelectorAll('.home-explore-group').forEach(group=>group.open=true));
  const panels=page.locator('.home-explore-panel');
  for(const panel of await panels.all()){
   await panel.evaluate(e=>e.open=false);
   const closed=await panel.evaluate(e=>{const a=e.getBoundingClientRect(),b=e.querySelector(':scope>summary').getBoundingClientRect();return {left:b.left-a.left,right:a.right-b.right,color:getComputedStyle(e.querySelector(':scope>summary')).backgroundColor};});
   assert(closed.left<=1.1&&closed.right<=1.1,'no side gutters at '+width);
   await panel.evaluate(e=>e.open=true);
   const open=await panel.locator(':scope>summary').evaluate(e=>getComputedStyle(e).backgroundColor);
   assert.equal(open,closed.color,'no color change on opening');
   await panel.evaluate(e=>e.open=false);
  }
  const system=page.locator('.home-explore-panel').filter({has:page.locator('summary',{hasText:'Cómo se organiza el sistema Nómada'})}).first();
  const summary=system.locator(':scope>summary');await summary.scrollIntoViewIfNeeded();await summary.focus();await page.keyboard.press('Enter');assert(await system.evaluate(e=>e.open),'keyboard opens panel');
  const body=await system.locator(':scope>section').evaluate(e=>getComputedStyle(e).backgroundColor);
  assert.equal(body,await summary.evaluate(e=>getComputedStyle(e).backgroundColor),'one continuous light surface');
  await page.locator('#site-header,#contactDock,.skip-link').evaluateAll(es=>es.forEach(e=>e.style.visibility='hidden'));
  await summary.evaluate(e=>e.blur());await system.screenshot({path:'tools/reports/home-panel-open-'+width+'.png'});
  await summary.focus();await page.keyboard.press('Enter');assert(!await system.evaluate(e=>e.open),'keyboard closes panel');
  await summary.evaluate(e=>e.blur());await system.screenshot({path:'tools/reports/home-panel-closed-'+width+'.png'});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'no overflow at '+width);
 }
 assert.deepEqual(errors,[]);console.log('Home panels: full-width headers, stable surfaces, keyboard controls and four viewport sizes passed.');
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{await browser?.close();server.close();});
