const {chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://local').pathname));if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404).end();return;}const types={'.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css','.webp':'image/webp'};res.setHeader('Content-Type',(types[path.extname(file)]||'application/octet-stream')+'; charset=utf-8');fs.createReadStream(file).pipe(res);});

const assert=require('node:assert/strict');
let browser;const report={checks:[],errors:[]};
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const base=`http://127.0.0.1:${server.address().port}/`;
 const edge='C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';browser=await chromium.launch({headless:true,...(fs.existsSync(edge)?{executablePath:edge}:{})});
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 page.on('pageerror',e=>report.errors.push(e.message));
 const check=(name,result)=>{assert.ok(result,name);report.checks.push(name);};
 await page.goto(base+'contacto.html');await page.waitForTimeout(300);
 for(const [width,height] of [[320,700],[390,844],[768,1024],[1440,1000],[667,375]]){
  await page.setViewportSize({width,height});await page.evaluate(()=>scrollTo(0,document.body.scrollHeight));await page.waitForTimeout(100);
  const boxes=await page.locator('#contactDock > *').evaluateAll(es=>es.filter(e=>getComputedStyle(e).display!=='none').map(e=>{const r=e.getBoundingClientRect();return {id:e.id,x:r.x,y:r.y,right:r.right,bottom:r.bottom};}));
  check(`Botones sin solapamiento ${width}`,boxes.every((a,i)=>a.x>=0&&a.right<=width&&a.y>=0&&a.bottom<=height&&boxes.every((b,j)=>i===j||a.bottom<=b.y||b.bottom<=a.y)));
  await page.locator('#chatBtn').click();
  const bounds=await page.locator('#chatPanel').boundingBox();check(`Panel dentro de pantalla ${width}`,bounds.x>=0&&bounds.y>=0&&bounds.x+bounds.width<=width+1&&bounds.y+bounds.height<=height+1);
  check(`Entrada visible ${width}`,await page.locator('#chatInput').isVisible());
  const field=await page.locator('#chatInput').boundingBox();check(`Entrada dentro del panel ${width}`,field.y>=bounds.y&&field.y+field.height<=bounds.y+bounds.height);
  await page.keyboard.press('Escape');check(`Escape devuelve foco ${width}`,await page.locator('#chatBtn').evaluate(e=>e===document.activeElement));
 }
 await page.setViewportSize({width:390,height:844});await page.locator('#chatBtn').click();
 async function ask(q,expected){await page.locator('#chatInput').fill(q);await page.locator('#chatForm button').click();await page.waitForTimeout(60);const text=await page.locator('#chatBody .bot').last().innerText();check(q,text.includes(expected));}
 await ask('Hola','Puedo ayudarte');await ask('material para kayak','kayak');
 check('Enlace contextual kayak',await page.locator('#chatBody .bot').last().locator('a[href="kayak-mar.html"]').count()===1);
 await ask('y seguridad','profesional');await ask('otra actividad','entorno');await ask('Mar y buceo','propuestas');
 await ask('¿Puedo reservar?','No hay reservas');await ask('¿Puedo volar después de buceo?','centro');await ask('quiero ver a Nuria','Nuria P. F.');
 await ask('Diego fundador','cronología');await ask('proyecto intermodular','diez módulos');await ask('sostenibilidad','páginas relacionadas');
 await ask('xyz inexistente','No he encontrado');await ask('<img src=x onerror=alert(1)>','No he encontrado');check('Texto del usuario no ejecuta HTML',await page.locator('#chatBody img').count()===0);
 const links=await page.locator('#chatBody a').evaluateAll(es=>es.map(e=>e.getAttribute('href')));
 for(const href of new Set(links)){const [name,id]=href.split('#');const html=fs.readFileSync(path.join(root,name),'utf8');check(`Destino existente ${href}`,!id||html.includes(`id="${id}"`));}
 await page.locator('#chatClear').click();check('Reinicio limpia conversación',await page.locator('#chatBody .user').count()===0);
 await page.screenshot({path:path.join(root,'tools/reports/chat-mobile.png')});await page.keyboard.press('Escape');
 await page.locator('#footer').scrollIntoViewIfNeeded();check('Directorio cerrado inicialmente',!(await page.locator('.footer-directory').getAttribute('open')));await page.locator('.footer-directory summary').click();check('Directorio accesible',await page.locator('.footer-directory').evaluate(e=>e.open));
 await page.locator('.footer-directory summary').click();await page.screenshot({path:path.join(root,'tools/reports/footer-mobile.png')});
 await page.setViewportSize({width:1440,height:1000});await page.locator('#footer').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(root,'tools/reports/footer-desktop.png')});
 let posts=0;page.on('request',r=>{if(r.method()==='POST')posts++;});
 await page.locator('#contactName').fill('Prueba local');await page.locator('#contactEmail').fill('test@example.com');await page.locator('#contactMessage').fill('Prueba de simulación');await page.locator('#rgpdC').check();await page.locator('[data-contact-demo]').click();await page.waitForTimeout(1300);check('Formulario confirma simulación', /simulaci[oó]n/i.test(await page.locator('[data-contact-demo]').innerText()));check('Formulario no envía datos',posts===0);
 await page.route('**/assistant-index.json',route=>route.abort());await page.reload();await page.locator('#chatBtn').click();await ask('material para senderismo','senderismo');await ask('xyz123','No he encontrado');report.checks.push('Respuestas básicas disponibles con fallo del índice');
 await page.goto(base+'fundador.html');check('Siete experiencias ordenadas',await page.locator('.founder-timeline time').evaluateAll(es=>es.length===7&&es.every((e,i)=>!i||e.dateTime>=es[i-1].dateTime)));
 await page.locator('#cronologia-aventuras').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(root,'tools/reports/fundador-chronology.png')});
 await page.goto(base+'equipo.html');check('Trayectoria de Nuria oculta temporalmente',await page.locator('.nuria-sport-profile').count()===1&&await page.locator('.nuria-sport-profile').getAttribute('hidden')!==null);
 await page.screenshot({path:path.join(root,'tools/reports/nuria-profile.png')});
 check('Sin errores de JavaScript',report.errors.length===0);
})().catch(e=>{report.errors.push(e.message);process.exitCode=1;}).finally(async()=>{fs.writeFileSync(path.join(root,'tools/reports/assistant-ux-tests.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));await browser?.close();server.close();});
