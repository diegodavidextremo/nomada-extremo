#!/usr/bin/env node
const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const {Script}=require('node:vm');
const pages=fs.readdirSync(root).filter(p=>p.endsWith('.html'));
const errors=[],warnings=[];
const fail=(file,message)=>errors.push({file,message});
const ids=new Map();
const decode=s=>s.replace(/&amp;/g,'&').replace(/&#39;/g,"'").replace(/&quot;/g,'"');
for(const page of pages){
 const html=read(page).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'');
 const names=[...html.matchAll(/\bid\s*=\s*["']([^"']+)["']/g)].map(m=>m[1]);
 ids.set(page,new Set([...names,'main-content','footer','site-header']));
 const duplicates=names.filter((n,i)=>names.indexOf(n)!==i);
 if(duplicates.length)fail(page,'IDs duplicados: '+[...new Set(duplicates)].join(', '));
}
function localRef(file,ref,anchors=true){
 ref=decode(ref.trim());
 if(!ref||/^(https?:|mailto:|tel:|data:|javascript:|blob:|\/\/)/i.test(ref)||ref.includes('${'))return;
 const parts=ref.split('#'),raw=parts[0].split('?')[0];
 let rel;
 try{rel=decodeURIComponent(raw); }catch(_){fail(file,'URL mal codificada: '+ref);return;}
 if(rel.startsWith('/nomada-extremo/'))rel=rel.slice('/nomada-extremo/'.length);
 else if(rel.startsWith('/'))return;
 const resolved=path.resolve(root,path.dirname(file),rel||path.basename(file));
 const target=path.relative(root,resolved).replaceAll('\\','/');
 if(!fs.existsSync(resolved)){fail(file,'Archivo inexistente: '+ref);return;}
 if(anchors&&parts[1]&&ids.has(target)){
  let anchor;try{anchor=decodeURIComponent(parts[1]);}catch(_){fail(file,'Ancla mal codificada: '+ref);return;}
  if(!ids.get(target).has(anchor))fail(file,'Ancla inexistente: '+ref);
 }
}
for(const page of pages){
 const original=read(page),html=original.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'');
 for(const m of original.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)){
  if(/\bsrc=/.test(m[1])||!m[2].trim())continue;
  try {if(/application\/(?:ld\+)?json/.test(m[1]))JSON.parse(m[2]);else if(!/type=["']module/.test(m[1]))new Script(m[2],{filename:page});}
  catch(e){fail(page,'Script inline inválido: '+e.message);}
 }
 if(/http-equiv=["']refresh/i.test(html))continue;
 for(const m of html.matchAll(/\b(?:href|src|poster)\s*=\s*["']([^"']+)["']/g))localRef(page,m[1]);
 if((html.match(/<h1\b/gi)||[]).length!==1)fail(page,'Se requiere un H1');
 if(!/name=["']viewport/.test(html))fail(page,'Falta viewport');
 for(const m of html.matchAll(/<img\b[^>]*>/gi))if(!/\balt\s*=/.test(m[0]))fail(page,'Imagen sin alt');
 for(const m of html.matchAll(/<(input|select|textarea)\b[^>]*>/gi)){
  if(/type=["'](?:hidden|submit|button)/.test(m[0]))continue;
  const id=m[0].match(/\bid=["']([^"']+)/)?.[1];
  const before=html.slice(0,m.index),insideLabel=before.lastIndexOf('<label')>before.lastIndexOf('</label>');
  if(!/aria-label(?:ledby)?=|\btitle=/.test(m[0])&&!insideLabel&&!(id&&html.includes(`for="${id}"`)))warnings.push({file:page,message:'Campo heredado sin etiqueta estática: '+(id||m[1])});
 }
 // Remove explicitly contextualized historical regions using a small HTML stack.
 const stack=[];let visible='';
 for(const token of html.match(/<[^>]+>|[^<]+/g)||[]){
  if(token.startsWith('</')){const name=token.match(/^<\/(\w+)/)?.[1];const i=stack.map(x=>x.name).lastIndexOf(name);if(i>=0)stack.splice(i);}
  else if(token.startsWith('<')){const name=token.match(/^<(\w+)/)?.[1];if(name&&!/^(meta|link|img|input|br|hr|source|area|wbr)$/i.test(name))stack.push({name,history:/\bdata-history\b/.test(token)||stack.some(x=>x.history)});}
  else if(!stack.some(x=>x.history))visible+=token+' ';
 }
 if(/alumno\s+de\s+1\s*[.º°o]*\s*GMN/i.test(visible))fail(page,'Estado académico obsoleto fuera del archivo histórico');
 if(/LO QUE ME ESPERA|Próxima etapa/.test(visible))fail(page,'Expectativa antigua presentada como actual');
}
function walk(dir){return fs.readdirSync(path.join(root,dir),{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const assets=walk('assets'),tools=walk('tools');
for(const file of [...assets,...walk('i18n')].filter(p=>p.endsWith('.json'))){try{JSON.parse(read(file));}catch(e){fail(file,'JSON inválido: '+e.message);}}
for(const file of [...assets,...tools].filter(p=>p.endsWith('.js'))){const p=spawnSync(process.execPath,['--check',path.join(root,file)],{encoding:'utf8'});if(p.status!==0)fail(file,p.stderr);}
for(const file of assets.filter(p=>p.endsWith('.css')))for(const m of read(file).matchAll(/url\(\s*["']?([^)'"\s]+)["']?\s*\)/g))localRef(file,m[1],false);
const d=JSON.parse(read('assets/data/gmn-2026-2027.json'));
const expected={'OAF03':'ROMERO PEREZ, MARIANO','01325':'MARTINEZ PULIDO, FRANCISCO JOSE','01327':'MARTINEZ PULIDO, FRANCISCO JOSE','01335':'GALLARDO GARCIA, ANTONIO','01337':'ALBARRACIN PEREZ, APOLONIA','01339':'CARRASCO WAIT, MARINA','01710':'MARIN GARCIA, ALFREDO','01708':'SANCHEZ SANCHEZ, JUANA MARIA','01713':'CARRASCO WAIT, MARINA','1342B':null};
if(d.modules.length!==10||new Set(d.modules.map(m=>m.code)).size!==10)fail('gmn','Se requieren las diez áreas sin duplicados');
for(const m of d.modules){if(!(m.code in expected))fail('gmn','Código desconocido '+m.code);if(m.teacher!==expected[m.code])warnings.push({file:'gmn',message:'Docente modificado respecto a la matrícula inicial: '+m.code+'; comprobar fuente y fecha.'});for(const l of m.links)localRef('index.html',l[1]);}
if(d.course!=='2026-2027'||d.year!=='2.º GMN'||d.startDate!=='2026-09-14')fail('gmn','Contexto de curso incorrecto');
const evidenceIds=new Set();
for(const e of d.evidence){
 if(!e.id||evidenceIds.has(e.id))fail('evidence','ID ausente o duplicado');evidenceIds.add(e.id);
 if(!e.title||!e.date||!e.demonstrates||!e.author||!e.publicationAuthorized)fail('evidence','Falta fuente, descripción o autorización editorial de publicación: '+e.id);
 if(!Array.isArray(e.moduleCodes)||e.moduleCodes.some(c=>!(c in expected)))fail('evidence','Módulos inválidos: '+e.id);
 if(!e.url||/^(javascript|data):/.test(e.url))fail('evidence','Enlace de evidencia inválido');else localRef('index.html',e.url);
}
const journalIds=new Set();
for(const j of d.journal){if(journalIds.has(j.id))fail('journal','ID duplicado '+j.id);journalIds.add(j.id);if(j.moduleCodes.some(c=>!(c in expected))||j.evidenceIds.some(id=>!evidenceIds.has(id)))fail('journal','Referencia inexistente '+j.id);for(const photo of j.photos){if(!photo.alt)fail('journal','Imagen sin alt');localRef('index.html',photo.src);}}
for(const lang of ['es','en','fr','de','it','pt']){const dict=JSON.parse(read(`i18n/${lang}.json`));for(const p of ['segundo-gmn','proyecto-intermodular','formacion-gmn'])if(!dict.meta[p]?.title.includes('2026-2027'))fail('i18n/'+lang+'.json','Metadatos académicos obsoletos: '+p);}
const sitemap=read('sitemap.xml');for(const m of sitemap.matchAll(/<loc>[^<]*\/([^/<]+\.html)<\/loc>/g))if(!pages.includes(m[1]))fail('sitemap.xml','Página inexistente '+m[1]);
for(const p of ['segundo-gmn.html','proyecto-intermodular.html','formacion-gmn.html'])if(!sitemap.includes('/'+p+'</loc>'))fail('sitemap.xml','Falta '+p);
const built=spawnSync(process.execPath,[path.join(__dirname,'build-gmn.js'),'--check'],{encoding:'utf8'});if(built.status)fail('build-gmn',built.stderr||built.stdout);
console.log(JSON.stringify({pages:pages.length,errors,warnings},null,2));
if(errors.length)process.exitCode=1;
