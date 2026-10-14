/* Targeted, repeatable structural updates for the October interface review. */
const fs=require('node:fs');
const read=f=>fs.readFileSync(f,'utf8');
const write=(f,s)=>fs.writeFileSync(f,s.replace(/\r?\n/g,'\r\n'));
const icon=(kind)=>`<svg class="editorial-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${({coast:'<path d="M4 31c5-6 9 6 14 0s9 6 14 0 8 5 12 0M4 39c5-6 9 6 14 0s9 6 14 0 8 5 12 0M8 24 20 8l8 13 6-8 10 11"/>',mountain:'<path d="m3 38 15-27 10 16 6-10 11 21H3Zm10-18 5 4 5-4M28 27l-5 11"/>',river:'<path d="M10 6c30 7-18 14 10 22s-10 12 10 15M3 22l7-12 8 10m15-2 6-10 6 13"/>',wind:'<path d="M4 15h26c12 0 12-13 2-11M4 24h34c9 0 9 12 0 12M4 33h15c8 0 8 12 0 12"/>',vertical:'<path d="M11 3v42m-5-34h10M6 21h10M6 31h10M6 41h10M30 5c10 7-8 12 0 22s0 12 9 17"/>'})[kind]||'<circle cx="24" cy="24" r="19"/><path d="m29 14-3 12-12 8 5-13 10-7Z"/>'}</svg>`;
let s=read('actividades.html');
if(!s.includes('editorial-top-card')){
 const start=s.indexOf('<section id="top-fichas"'),end=s.indexOf('</section>',start);
 const ids=['senderismo-guiado','kayak-mar','snorkel','coasteering','bautismo-buceo','open-water','via-ferrata','rapel','btt-costero','parapente-biplaza','paramotor','coasteering'];
 let n=0,block=s.slice(start,end).replace(/<article class="process-card">([\s\S]*?)<\/article>/g,(_,content)=>{
  const id=ids[n++];
  return `<article class="process-card editorial-top-card"><div class="editorial-top-photo"><img src="assets/images/activities-2026/${id}.webp" srcset="assets/images/activities-2026/${id}-640.webp 640w, assets/images/activities-2026/${id}.webp 1440w" sizes="(max-width:700px) 100vw, (max-width:1100px) 50vw, 33vw" width="1440" height="960" alt="" loading="lazy" decoding="async"></div><div class="editorial-top-content">${content}</div></article>`;
 });
 if(n!==12)throw Error('Expected twelve featured cards');
 s=s.slice(0,start)+block+s.slice(end);
 n=0;s=s.replace(/<article class="territorio-card">/g,(m)=>m+icon(['coast','mountain','river','vertical','coast','wind','vertical','mountain','river'][n++%9]));
 // Numbering is decorative; place names remain the meaningful headings.
 let route=0;s=s.replace(/<div class="route-reference-grid">([\s\S]*?)<\/div>/,(_,b)=>'<div class="route-reference-grid">'+b.replace(/<article>/g,()=>`<article>${icon(['coast','mountain','coast','mountain','compass'][route++])}`)+'</div>');
}
s=s.replace('<section id="naturista" class="bg-cielo">','<section id="naturista" class="bg-cielo editorial-naturist-preview">');
// A drawn landscape motif avoids implying a reference photo documents this project.
s=s.replace('<div class="notice-card"><strong>Normas clave:</strong>','<div class="notice-card naturist-preview-values"><svg class="naturist-landscape" viewBox="0 0 600 240" fill="none" aria-hidden="true"><circle cx="440" cy="70" r="35" fill="#d2ab7e"/><path d="M0 170 150 70l140 100 100-60 210 80v50H0Z" fill="#466b60"/><path d="M0 190c140-50 230 50 340 0s170-30 260 10v40H0Z" fill="#234d46"/><path d="M0 220c180-35 290 35 600 0" stroke="#a2c2b2" stroke-width="2"/></svg><strong>Normas clave:</strong>');
const multi=s.indexOf('<h3>Multiaventura</h3>'),multiStart=s.lastIndexOf('<article',multi),multiEnd=s.indexOf('</article>',multi);
if(multiStart>=0){const card=s.slice(multiStart,multiEnd).replace(/<img[^>]*>/,'<img src="assets/images/packs-2026/horizonte-salvaje.webp" width="1440" height="960" alt="" loading="lazy" decoding="async">');s=s.slice(0,multiStart)+card+s.slice(multiEnd);}
write('actividades.html',s);
s=read('naturistas.html').replace('<body>','<body class="naturist-page">');
s=s.replace('programada con frecuencia mensual o bimestral','planteada como una jornada al mes dentro del proyecto académico');
s=s.replace('La propuesta naturista se programa con una frecuencia de <strong style="color:var(--blanco);">uno o dos días al mes</strong>','El proyecto académico plantea <strong style="color:var(--blanco);">una jornada al mes, sin calendario operativo ni salidas confirmadas</strong>');
s=s.replace('<div style="background:var(--crema);border:1px solid var(--crema-media);padding:2.5rem;">','<div class="naturist-values-panel">');
s=s.replace('<div style="max-width:780px;margin:0 auto;text-align:center;">','<div class="naturist-frequency-panel">');
if(!s.includes('naturist-hero-copy')){
 const a=s.indexOf('<div class="container page-hero-inner">'),b=s.indexOf('</section>',a);
 let hero=s.slice(a,b).replace('<div class="container page-hero-inner">','<div class="container page-hero-inner"><div class="naturist-hero-copy">');
 const end=hero.lastIndexOf('</div>');
 hero=hero.slice(0,end)+'</div><figure class="naturist-hero-photo"><img src="assets/images/packs-2026/naturista-amanecer.webp" width="1440" height="960" alt="" fetchpriority="high" decoding="async"><figcaption><a href="#naturist-photo-credits">Créditos de las fotografías naturistas</a><p>Fotografías de referencia tomadas en otros lugares; ilustran el naturismo y no documentan actividades de Nómada Extremo en Águilas.</p></figcaption></figure>'+hero.slice(end);
 s=s.slice(0,a)+hero+s.slice(b);
 s=s.replace('<details class="experience-photo-credits">','<details class="experience-photo-credits" id="naturist-photo-credits">');
}
write('naturistas.html',s);
s=read('index.html');
let h=s.indexOf('HABLEMOS'),start=s.lastIndexOf('<section',h);
if(!s.includes('class="editorial-contact'))s=s.slice(0,start)+s.slice(start).replace('<section','<section class="editorial-contact"').replace(/class="editorial-contact"([^>]*?)class="([^"]*)"/,'class="editorial-contact $2"$1');
write('index.html',s);
// Ship the shared stylesheet before rendering injected components, on every content route.
s=read('assets/js/components.js');
if(!s.includes('data-editorial-interface'))s=s.replace('  const FOOTER = `',`  if (!document.querySelector('[data-editorial-interface]')) {
    const sheet = document.createElement('link');
    sheet.rel = 'stylesheet'; sheet.href = 'assets/css/editorial-interface.css?v=20261014-1';
    sheet.dataset.editorialInterface = ''; document.head.appendChild(sheet);
  }
  const FOOTER = \``);
s=s.replace('class="footer-marca-nombre">NÓMADA EXTREMO<small>','class="footer-marca-nombre"><span translate="no">NÓMADA EXTREMO</span><small>');
write('assets/js/components.js',s);
for(const f of fs.readdirSync('.').filter(f=>f.endsWith('.html'))){s=read(f);const next=s.replaceAll('components.js?v=20261013-1','components.js?v=20261014-1');if(next!==s)write(f,next);}
console.log('Targeted interface structures and shared stylesheet loader updated.');
