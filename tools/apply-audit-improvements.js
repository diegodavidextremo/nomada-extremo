/* One-time migration for the reviewed October 22 report. Originals are backed up locally. */
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = f => fs.readFileSync(path.join(root,f),'utf8');
const write = (f,s) => fs.writeFileSync(path.join(root,f),s);
if (read('assets/js/components.js').includes('20261025')) throw Error('Migration already applied; edit the resulting sources.');
let s = read('packs.html');
const start=s.indexOf('<span class="config-opt arena"'), end=s.indexOf('</span></div>',start);
s=s.slice(0,start)+['Solo','Pareja','Grupo amigos','Familia','Empresa/equipo'].map(t=>`<button type="button" class="config-opt arena" aria-pressed="false">${t}</button>`).join('\n')+s.slice(end+7);
s=s.replace(/<span class="config-opt verde" onclick="this.classList.toggle\('sel'\)">([\s\S]*?)<\/span>/g,'<button type="button" class="config-opt verde" aria-pressed="false">$1</button>');
write('packs.html',s);
s=read('assets/js/experience-interface.js');
s=s.replace("b.classList.toggle('sel');update();", "if(b.classList.contains('arena')) config.querySelectorAll('.config-opt.arena').forEach(other=>{if(other!==b)other.classList.remove('sel');});b.classList.toggle('sel');update();");
write('assets/js/experience-interface.js',s);
// The actual, published sheet supplies short data; the modal and comparison use these too.
s=read('assets/js/main.js');
const begin=s.indexOf('  const ACTIVITY_SPECS = {'), finish=s.indexOf('\n  };',begin)+5;
if(begin<0||finish<begin)throw Error('Activity specification block missing');
const expression=s.slice(begin,finish).replace('const ACTIVITY_SPECS =','globalThis.result =');
const ctx={};vm.runInNewContext(s.slice(s.indexOf('  const academicNote ='),begin)+expression,ctx);
const specs=JSON.parse(JSON.stringify(ctx.result));
const mapping={'senderismo-guiado':'SENDERISMO GUIADO','kayak-mar':'KAYAK DE MAR','snorkel-aventura':'SNORKEL DE AVENTURA','coasteering':'COASTEERING','bautismo-buceo':'BAUTISMO DE BUCEO','open-water':'OPEN WATER SSI','via-ferrata':'VIA FERRATA','rapel':'RAPEL TECNICO','btt-costera':'BTT COSTERA','parapente':'PARAPENTE BIPLAZA','paramotor':'PARAMOTOR / PARATRIKE'};
const text = html => html.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
for(const [file,title] of Object.entries(mapping)){
 const html=read(file+'.html'), section=html.match(/class="activity-meta-list"[\s\S]*?<div class="activity-detail-grid"/)?.[0];
 if(!section)continue;
 const fields=[...section.matchAll(/<div><span>(.*?)<\/span><strong>(.*?)<\/strong><\/div>/g)].map(m=>[text(m[1]),text(m[2])]);
 const entry=Object.entries(specs).find(([key])=>key.normalize('NFD').replace(/[\u0300-\u036f]/g,'')===title);
 if(!entry)continue;
 for(const [label,value] of fields){const key={'Duración':'duracion','Edad recomendada':'edad','Nivel físico':'fisico','Nivel técnico':'tecnico','Mejor época':'temporada','Zona habitual':'zona'}[label];if(key)entry[1][key]=value;}
 entry[1].ficha=file+'.html';
}
write('assets/data/activity-specs.json',JSON.stringify(specs,null,2)+'\n');
write('assets/js/activity-specs.js','/* Generated from assets/data/activity-specs.json by tools/build-audit-assets.js. */\nwindow.noextActivitySpecs = '+JSON.stringify(specs)+';\n');
s=s.slice(0,begin)+'  const ACTIVITY_SPECS = window.noextActivitySpecs;'+s.slice(finish);
write('assets/js/main.js',s);
// Preserve old deep links while removing the competing sample from visitor journeys.
write('tools/templates/activity-detail-reference.html.txt',read('actividad-detalle.html'));
write('actividad-detalle.html','<!doctype html>\n<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,follow"><meta http-equiv="refresh" content="0;url=kayak-mar.html"><link rel="canonical" href="https://diegodavidextremo.github.io/nomada-extremo/kayak-mar.html"><title>Kayak de mar | Nómada Extremo</title></head><body><main><h1>Kayak de mar</h1><p><a href="kayak-mar.html">Consultar la ficha de referencia</a></p></main></body></html>\n');
// Consolidate shared sheets into one deterministic generated file, retaining their cascade order.
s=read('assets/js/components.js');
for(const flag of ['editorialInterface','noextI18n','noextLanguageRegions','noextGlobalSearch','noextEcosystemPathways']){
 // Remove only stylesheet branches, keeping runtimes and language data.
 if(flag==='editorialInterface')s=s.replace(/  if \(!document.querySelector\('link\[data-editorial-interface\]'\)\) \{[\s\S]*?\n  \}/,'');
}
s=s.replace(/  if \(!document.querySelector\('link\[data-noext-(?:i18n|global-search|ecosystem-pathways)\]'\)\) \{[\s\S]*?\n  \}/g,'');
s=s.replace(/    const styles = document.createElement\('link'\);[\s\S]*?document.head.appendChild\(styles\);\n/,'');
s=s.replace(/  var cssHref = 'assets\/css\/skeleton.css\?v=' \+ version;[\s\S]*?\n  \}/,'');
s=s.replace('<div id="contactDock" aria-label="Ayuda y navegación rápida">','<nav id="contactDock" aria-label="Ayuda y navegación rápida">').replace('title="Volver arriba">↑</a></div>`','title="Volver arriba">↑</a></nav>`');
s=s.replace('i18n.js?v=20261014-1','i18n.js?v=20261025');
s=s.replace("  const np = document.getElementById('nav-placeholder');", "  const improvements = document.createElement('script');\n  improvements.src = 'assets/js/site-improvements.js?v=20261025';\n  improvements.defer = true;\n  document.body.appendChild(improvements);\n\n  const np = document.getElementById('nav-placeholder');");
write('assets/js/components.js',s);
// Real distinct titles in every language, with stable keys and unchanged user data.
const titles={es:['Comunidad y club | Nómada Extremo','Logbook · Mi progreso | Nómada Extremo'],en:['Community and club | Nómada Extremo','Logbook · My progress | Nómada Extremo'],fr:['Communauté et club | Nómada Extremo','Logbook · Ma progression | Nómada Extremo'],de:['Gemeinschaft und Club | Nómada Extremo','Logbook · Mein Fortschritt | Nómada Extremo'],it:['Comunità e club | Nómada Extremo','Logbook · I miei progressi | Nómada Extremo'],pt:['Comunidade e clube | Nómada Extremo','Logbook · O meu progresso | Nómada Extremo'],nl:['Community en club | Nómada Extremo','Logbook · Mijn voortgang | Nómada Extremo']};
const newCopy={
'Imprimir preparación':['Print preparation','Imprimer la préparation','Vorbereitung drucken','Stampa la preparazione','Imprimir preparação','Voorbereiding afdrukken'],
'Índice de esta página':['On this page','Sur cette page','Auf dieser Seite','In questa pagina','Nesta página','Op deze pagina'],
'Tabla desplazable':['Scrollable table','Tableau défilant','Scrollbare Tabelle','Tabella scorrevole','Tabela deslocável','Schuifbare tabel'],
'Selección de formato':['Choose a format','Choisir un format','Format auswählen','Scegli un formato','Escolher formato','Kies een formaat'],
'Según programación':['Subject to scheduling','Selon la programmation','Nach Terminplanung','Secondo il programma','Conforme a programação','Volgens planning']};
for(const lang of Object.keys(titles)){
 const dict=JSON.parse(read('i18n/'+lang+'.json'));
 for(const [i,page] of ['comunidad','logbook'].entries()){dict.meta[page]??={};dict.meta[page].title=titles[lang][i];}
 for(const [source,values] of Object.entries(newCopy))dict.strings[source]=lang==='es'?source:values[['en','fr','de','it','pt','nl'].indexOf(lang)];
 write('i18n/'+lang+'.json',JSON.stringify(dict,null,2)+'\n');
}
const utility=new Set(['faq.html','material.html','contacto.html','formularios.html','seguridad.html','certificaciones.html','tecnologia.html','alquiler.html','proyecto-academico.html','proyecto-completo.html','proyecto-intermodular.html','transparencia-financiacion.html']);
for(const file of fs.readdirSync(root).filter(f=>f.endsWith('.html'))){
 let html=read(file);if(/http-equiv="refresh"/.test(html))continue;
 html=html.replace(/(<article\b[^>]*class="(?:activity-panel|material-card)"[^>]*>)([\s\S]*?)(<\/article>)/g,(_,a,b,c)=>a+b.replace(/<h3\b/g,'<h2').replace(/<\/h3>/g,'</h2>')+c);
 html=html.replace(/<aside\b([^>]*class="(?:adventure-custom|contact-before|naturist[^" ]*(?: [^"]*)?)"[^>]*)>([\s\S]*?)<\/aside>/g,'<div$1>$2</div>');
 if(file==='formacion-gmn.html'){let seen=false;html=html.replace(/aria-label="Ruta de navegación"/g,m=>{if(!seen){seen=true;return m;}return 'aria-label="Ruta de formación"';});}
 if(['comunidad.html','logbook.html'].includes(file))html=html.replace(/<title>.*?<\/title>/,'<title>'+titles.es[file==='comunidad.html'?0:1]+'</title>');
 if(file==='naturistas.html')html=html.replace('UN DÍA AL MES','SEGÚN PROGRAMACIÓN');
 if(['login.html','gracias.html'].includes(file))html=html.replace('</head>','<meta name="robots" content="noindex,follow">\n</head>');
 if(utility.has(file))html=html.replace(/<body([^>]*)>/,'<body$1 data-page-purpose="reference">');
 html=html.replace(/<script src="assets\/js\/main.js[^\"]*"><\/script>/,m=>'<script src="assets/js/activity-specs.js?v=20261025"></script>\n'+m.replace(/\?v=[^"]*/,'?v=20261025'));
 html=html.replace(/assets\/js\/(components|experience-interface)\.js\?v=[^" ]*/g,'assets/js/$1.js?v=20261025');
 html=html.replace('</head>','<link rel="stylesheet" href="assets/css/shared.css?v=20261025">\n</head>');
 write(file,html);
}
console.log('Migrated packs, shared semantics, canonical specifications, reference pages and dictionary copy.');
