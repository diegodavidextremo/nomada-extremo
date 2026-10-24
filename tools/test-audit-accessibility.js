const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),out=path.resolve(process.env.NOEXT_REPORT_DIR||path.join(root,'tools/reports'));
const axe=process.env.NOEXT_AXE_PATH||require.resolve('axe-core/axe.min.js');
const server=http.createServer((req,res)=>{let f;try{f=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://local').pathname));}catch{res.writeHead(400).end();return;}if(!f.startsWith(root+path.sep)||!fs.existsSync(f)||!fs.statSync(f).isFile()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.json':'application/json','.html':'text/html','.webp':'image/webp','.svg':'image/svg+xml'}[path.extname(f)]||'application/octet-stream'));res.end(fs.readFileSync(f));});
let browser;const results=[];
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 browser=await chromium.launch({headless:true,...(fs.existsSync('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe')?{executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'}:{})});
 const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
 for(const file of ['index.html','packs.html','kayak-mar.html','senderismo-guiado.html','material.html','contacto.html','naturistas.html','formacion-gmn.html','audiovisual.html','grupos.html','transparencia-financiacion.html']){
  await page.goto('http://127.0.0.1:'+server.address().port+'/'+file);await page.waitForTimeout(450);
  await page.evaluate(()=>document.querySelectorAll('details').forEach(d=>d.open=true));
  await page.addScriptTag({path:axe});
  const violations=await page.evaluate(async()=>{const r=await axe.run(document,{rules:{'color-contrast':{enabled:false}}});return r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,html:n.html.slice(0,250)}))}));});
  results.push({file,violations});
  assert(!violations.some(v=>['aria-allowed-attr','scrollable-region-focusable'].includes(v.id)),file+' functional ARIA/scroll issue');
 }
 console.log(JSON.stringify(results));
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>{fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'accessibility-improvements.json'),JSON.stringify(results,null,2));await browser?.close();server.close();});
