const {chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://local').pathname));if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404).end();return;}const types={'.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css','.webp':'image/webp'};res.setHeader('Content-Type',(types[path.extname(file)]||'application/octet-stream')+'; charset=utf-8');fs.createReadStream(file).pipe(res);});
let browser;
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const base=`http://127.0.0.1:${server.address().port}/`;
 const edge='C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';browser=await chromium.launch({headless:true,...(fs.existsSync(edge)?{executablePath:edge}:{})});
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});const report={pages:[],errors:[]};
 page.on('pageerror',e=>report.errors.push({page:page.url(),message:e.message}));
 for(const file of fs.readdirSync(root).filter(p=>p.endsWith('.html')&&!/^(condiciones|politica-)/.test(p))){
  await page.goto(base+file,{waitUntil:'load'});await page.waitForTimeout(120);
  const result=await page.evaluate(()=>{
   const rgb=s=>{const n=s.match(/[\d.]+/g);return n?[+n[0],+n[1],+n[2],n[3]===undefined?1:+n[3]]:[0,0,0,0];};
   const over=(a,b)=>[...a.slice(0,3).map((c,i)=>c*a[3]+b[i]*(1-a[3])),1];
   const lum=a=>a.slice(0,3).map(c=>{c/=255;return c<=.04045?c/12.92:((c+.055)/1.055)**2.4;}).reduce((v,c,i)=>v+c*[.2126,.7152,.0722][i],0);
   const issues=[],uncertain=[];
   for(const e of document.querySelectorAll('body *')){
    if(['SCRIPT','STYLE','NOSCRIPT','OPTION'].includes(e.tagName)||e.closest('[hidden],template')||!e.getClientRects().length)continue;
    const text=[...e.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent).join('').trim();if(!text)continue;
    const s=getComputedStyle(e);if(s.visibility!=='visible'||+s.opacity===0)continue;
    let chain=[],p=e,complex=!!e.closest('.hero,.page-hero,.base-hero,.viajes-hero,.act-card-content');while(p){const c=getComputedStyle(p);if(c.backgroundImage!=='none')complex=true;const gradient=c.backgroundImage.match(/rgba?\([^)]+\)/);chain.unshift(gradient?rgb(gradient[0]):rgb(c.backgroundColor));p=p.parentElement;}
    let bg=[255,255,255,1];chain.forEach(c=>bg=over(c,bg));const fg=over(rgb(s.color),bg),l=[lum(fg),lum(bg)].sort((a,b)=>b-a),ratio=(l[0]+.05)/(l[1]+.05),large=parseFloat(s.fontSize)>=24||(parseFloat(s.fontSize)>=18.66&&+s.fontWeight>=700),target=large?3:4.5;
    if(ratio+.05<target){const item={tag:e.tagName,cls:e.className,text:text.slice(0,90),color:s.color,bg:bg.slice(0,3).map(Math.round).join(','),ratio:+ratio.toFixed(2),target,parent:e.parentElement?.className,inline:e.getAttribute('style')};(complex?uncertain:issues).push(item);}
   }
   return {overflow:document.documentElement.scrollWidth>innerWidth+1,issues,uncertain,ids:[...document.querySelectorAll('[id]')].map(e=>e.id),links:[...document.querySelectorAll('a[href]')].map(e=>e.getAttribute('href')),brokenImages:[...document.images].filter(e=>e.complete&&!e.naturalWidth).map(e=>e.getAttribute('src'))};
  });report.pages.push({file,...result});
 }
 report.brokenLinks=[];
 const seen=new Set();for(const p of report.pages)for(const href of p.links){if(/^(https?:|mailto:|tel:|javascript:|\/\/)/.test(href))continue;const [f,id]=href.split('#'),file=f.split('?')[0]||p.file,target=report.pages.find(x=>x.file===file);if(target&&id&&!target.ids.includes(decodeURIComponent(id))&&!seen.has(href)){seen.add(href);report.brokenLinks.push({from:p.file,href});}}
 fs.writeFileSync(path.join(root,'tools/reports/ux-contrast.json'),JSON.stringify(report,null,2));
 console.log(JSON.stringify({pages:report.pages.length,errors:report.errors,contrast:report.pages.reduce((n,p)=>n+p.issues.length,0),uncertain:report.pages.reduce((n,p)=>n+p.uncertain.length,0)}));
 await page.goto(base+'contacto.html');await page.waitForTimeout(200);await page.screenshot({path:path.join(root,'tools/reports/contacto-ux.png'),fullPage:true});
 await page.locator('#chatBtn').click();await page.screenshot({path:path.join(root,'tools/reports/chat-ux.png')});
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>{await browser?.close();server.close();});
