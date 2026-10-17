const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{const f=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://local').pathname));if(!f.startsWith(root+path.sep)||!fs.existsSync(f)||!fs.statSync(f).isFile()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.svg':'image/svg+xml'}[path.extname(f)]||'application/octet-stream')+'; charset=utf-8');fs.createReadStream(f).pipe(res);});
function mockSpeech(){
 class Utterance{constructor(text){this.text=text;}}
 class Speech extends EventTarget{
  constructor(){super();this.calls=[];this.cancelled=0;this.voices=['es-ES','en-GB','fr-FR','de-DE','it-IT','pt-PT','nl-NL'].map(lang=>({lang,name:'Test '+lang,localService:true,default:lang==='es-ES'}));}
  getVoices(){return this.voices;}
  speak(utterance){this.current=utterance;this.calls.push({text:utterance.text,lang:utterance.lang,rate:utterance.rate});queueMicrotask(()=>{if(this.current===utterance)utterance.onstart?.();});}
  cancel(){const old=this.current;this.current=null;this.cancelled++;if(old)queueMicrotask(()=>old.onerror?.({error:'canceled'}));}
  finish(){const old=this.current;this.current=null;old?.onend?.();}
 }
 Object.defineProperty(window,'speechSynthesis',{configurable:true,value:new Speech()});
 Object.defineProperty(window,'SpeechSynthesisUtterance',{configurable:true,value:Utterance});
}
let browser;
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port+'/';
 browser=await chromium.launch({headless:true,...(fs.existsSync('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe')?{executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'}:{})});
 const context=await browser.newContext({viewport:{width:1366,height:1000},reducedMotion:'reduce'});await context.addInitScript(mockSpeech);
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'index.html');await page.waitForTimeout(500);
 const main=page.locator('#home-reader');await main.locator('.home-reader-start').waitFor();
 assert.equal(await page.evaluate(()=>speechSynthesis.calls.length),0,'never autoplay');
 await main.locator('.home-reader-start').click();await page.waitForTimeout(30);
 assert(await main.locator('.home-reader-pause').evaluate(e=>e===document.activeElement),'keyboard focus follows the opened controls');
 let initial=await page.evaluate(()=>speechSynthesis.calls.at(-1));assert.equal(initial.lang,'es-ES');assert(initial.text.includes('Águilas'));assert(initial.text.length<=160);
 await page.evaluate(()=>speechSynthesis.current.onboundary({charIndex:8}));
 await main.locator('.home-reader-pause').click();assert((await main.locator('.home-reader-status').innerText()).includes('pausa'));
 await main.locator('.home-reader-pause').click();await page.waitForTimeout(20);
 assert.equal(await page.evaluate(()=>speechSynthesis.calls.at(-1).text),initial.text.slice(8),'resumes at the word bookmark');
 await main.locator('select').selectOption('1.25');await page.waitForTimeout(20);assert.equal(await page.evaluate(()=>speechSynthesis.calls.at(-1).rate),1.25);
 await main.locator('.home-reader-stop').click();await page.waitForTimeout(20);assert(await main.locator('.home-reader-controls').isHidden());assert((await main.locator('.home-reader-status').innerText()).includes('detenida'));
 assert(await main.locator('.home-reader-start').evaluate(e=>e===document.activeElement),'focus returns to the listen button');
 // Exercise the real extraction against closed content and entered form data.
 const panel=page.locator('.home-explore-panel').filter({has:page.locator('#sistema-nomada-home')});await panel.locator(':scope>summary').click();
 await page.evaluate(()=>{
  const target=document.querySelector('#sistema-nomada-home>.container');
  const form=document.createElement('form');form.innerHTML='<p>PRIVATE_FORM_SENTINEL</p><input value="PRIVATE_INPUT_SENTINEL">';target.append(form);
  const hidden=document.createElement('p');hidden.hidden=true;hidden.textContent='HIDDEN_SENTINEL';target.append(hidden);
  const folded=document.createElement('details');folded.innerHTML='<summary>Folded</summary><p>CLOSED_SENTINEL</p>';target.append(folded);
  const nav=document.createElement('nav');nav.innerHTML='<p>MENU_SENTINEL</p>';target.append(nav);
 });
 const section=page.locator('#sistema-nomada-home .home-reader').first();await section.locator('.home-reader-start').click();await page.waitForTimeout(20);
 const startAt=await page.evaluate(()=>speechSynthesis.calls.length-1);
 for(let n=0;n<150;n++){if(await section.locator('.home-reader-controls').isHidden())break;await page.evaluate(()=>speechSynthesis.finish());}
 const texts=await page.evaluate(n=>speechSynthesis.calls.slice(n).map(c=>c.text),startAt);
 assert(texts.join(' ').includes('SISTEMA'));for(const marker of ['PRIVATE_FORM_SENTINEL','PRIVATE_INPUT_SENTINEL','HIDDEN_SENTINEL','CLOSED_SENTINEL','MENU_SENTINEL'])assert(!texts.join(' ').includes(marker),marker+' excluded');
 assert(texts.every(t=>t.length<=160));assert((await section.locator('.home-reader-status').innerText()).includes('finalizada'));
 await section.locator('.home-reader-start').click();await page.waitForTimeout(20);await panel.locator(':scope>summary').click();await page.waitForTimeout(50);assert(await section.locator('.home-reader-controls').isHidden(),'closing section stops speech');
 await page.goto(base+'index.html');await page.waitForTimeout(400);
 const names={es:'Escuchar esta página',en:'Listen to this page',fr:'Écouter cette page',de:'Diese Seite anhören',it:'Ascolta questa pagina',pt:'Ouvir esta página',nl:'Deze pagina beluisteren'};
 for(const [lang,label] of Object.entries(names)){
  await page.locator('#nav [data-language-switcher] button[data-lang='+lang+']').click();await page.waitForFunction(l=>document.documentElement.lang===l,lang);await page.keyboard.press('Escape');
  await page.waitForFunction(l=>document.querySelector('#home-reader').lang===l,lang);
  assert.equal(await main.locator('.home-reader-start').innerText(),label);
  await main.locator('.home-reader-start').click();await page.waitForTimeout(20);
  assert((await page.evaluate(()=>speechSynthesis.calls.at(-1).lang)).startsWith(lang));
  await main.locator('.home-reader-stop').click();
  assert.deepEqual(await page.evaluate(()=>window.auditI18n()),[]);
 }
 // Switching languages cancels ongoing audio and does not restart it.
 await main.locator('.home-reader-start').click();await page.waitForTimeout(20);const previous=await page.evaluate(()=>speechSynthesis.calls.length);
 await page.locator('#nav [data-language-switcher] button[data-lang=es]').click();await page.waitForFunction(()=>document.documentElement.lang==='es');await page.keyboard.press('Escape');await page.waitForTimeout(40);
 assert(await main.locator('.home-reader-controls').isHidden());assert.equal(await page.evaluate(()=>speechSynthesis.calls.length),previous);
 // No voice in the selected language must never silently use a different language.
 await page.evaluate(()=>speechSynthesis.voices=[{lang:'en-GB',name:'English only',localService:true}]);await main.locator('.home-reader-start').click();assert((await main.locator('.home-reader-status').innerText()).includes('No hay una voz en español'));assert.equal(await page.evaluate(()=>speechSynthesis.calls.length),previous);
 await page.evaluate(()=>speechSynthesis.voices=[]);await main.locator('.home-reader-start').click();assert((await main.locator('.home-reader-status').innerText()).includes('cargando'));
 await page.evaluate(()=>{speechSynthesis.voices=[{lang:'es-ES',name:'Spanish',localService:true}];speechSynthesis.dispatchEvent(new Event('voiceschanged'));});
 await main.locator('.home-reader-start').click();await page.waitForTimeout(20);await page.evaluate(()=>speechSynthesis.current.onerror({error:'synthesis-failed'}));assert((await main.locator('.home-reader-status').innerText()).includes('No se ha podido'));
 for(const width of [320,390,768,1366,1920]){
  await page.setViewportSize({width,height:1000});await main.locator('.home-reader-start').click();await page.waitForTimeout(20);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'reader overflow '+width);
  if([390,1366].includes(width)){await main.scrollIntoViewIfNeeded();await page.screenshot({path:'tools/reports/home-reader-'+width+'.png'});}
  await main.locator('.home-reader-stop').click();
 }
 const calls=await page.evaluate(()=>speechSynthesis.calls.length);await page.evaluate(()=>dispatchEvent(new Event('pagehide')));assert.equal(await page.evaluate(()=>speechSynthesis.current),null);assert.equal(await page.evaluate(()=>speechSynthesis.calls.length),calls);
 await page.goto(base+'senderismo-guiado.html');assert.equal(await page.locator('.home-reader').count(),0);assert.equal(await page.locator('script[src*="home-reader"]').count(),0,'trial confined to Home');
 assert.deepEqual(errors,[]);
 const noSpeech=await browser.newContext();await noSpeech.addInitScript(()=>{Object.defineProperty(window,'speechSynthesis',{configurable:true,value:undefined});});const unsupportedPage=await noSpeech.newPage();await unsupportedPage.goto(base+'index.html');assert(await unsupportedPage.locator('#home-reader .home-reader-start').isDisabled());assert((await unsupportedPage.locator('#home-reader .home-reader-status').innerText()).includes('no permite'));await noSpeech.close();
 // Native capability probe: report available voices without pretending mocked tests heard audio.
 const native=await browser.newPage();await native.goto(base+'index.html');await native.waitForTimeout(1000);
 const capability=await native.evaluate(()=>({supported:!!window.speechSynthesis,languages:window.speechSynthesis?[...new Set(speechSynthesis.getVoices().map(v=>v.lang))]:[]}));
 const nativeEvents=[];
 if(capability.languages.includes('es-ES')){
  await native.evaluate(()=>{window.readerNativeEvents=[];const original=speechSynthesis.speak.bind(speechSynthesis);speechSynthesis.speak=function(u){for(const event of ['start','end','error'])u.addEventListener(event,e=>window.readerNativeEvents.push({event,error:e.error||null}));original(u);};});
  await native.locator('#home-reader .home-reader-start').click();
  await native.waitForFunction(()=>window.readerNativeEvents.some(e=>e.event==='end'||e.event==='error'),null,{timeout:12000}).catch(()=>{});
  nativeEvents.push(...await native.evaluate(()=>window.readerNativeEvents));
  await native.evaluate(()=>dispatchEvent(new Event('pagehide')));
 }
 fs.writeFileSync(path.join(root,'tools/reports/home-reader.json'),JSON.stringify({nativeEvents,testedLanguages:Object.keys(names),viewports:[320,390,768,1366,1920],nativeCapability:capability,errors},null,2)+'\n');
 console.log('Home reader passed: seven languages, reading exclusion, bookmarks, speed, errors, page/section stops, five widths and Home-only scope.');console.log('Native voice availability:',JSON.stringify(capability));console.log('Native speech events:',JSON.stringify(nativeEvents));
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{await browser?.close();server.close();});
