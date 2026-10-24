const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8'),write=(f,s)=>fs.writeFileSync(path.join(root,f),s);
let home=read('index.html');
if(!home.includes('class="home-explore-group"')){
 const groups=[[],[],[]],ranges=[];
 const tags=[...home.matchAll(/<\/?details\b[^>]*>/g)];
 for(let i=0;i<tags.length;i++){
  const tag=tags[i];if(!/home-explore-panel/.test(tag[0]))continue;
  let depth=1,j=i+1;for(;j<tags.length;j++){depth+=tags[j][0].startsWith('</')?-1:1;if(!depth)break;}
  if(depth)throw Error('Unclosed details');
  const end=tags[j].index+tags[j][0].length,fragment=home.slice(tag.index,end);
  const label=fragment.match(/<summary[^>]*>(.*?)<\/summary>/)?.[1]||'';
  const group=/Formación|sistema|Método|proyecto/i.test(label)?2:/material|Preparación|realismo|seguridad|garantía|temporada/i.test(label)?1:0;
  groups[group].push(fragment);ranges.push([tag.index,end]);i=j;
 }
 const labels=['Elegir experiencia','Preparar mi actividad','Conocer el proyecto'];
 const block='<section class="home-explore-directory" aria-label="Explorar Nómada Extremo">'+groups.map((items,i)=>`<details class="home-explore-group"><summary>${labels[i]}</summary><div class="home-explore-group-content">${items.join('\n')}</div></details>`).join('\n')+'</section>';
 const insertion=ranges[0][0];
 for(const [start,end] of ranges.reverse())home=home.slice(0,start)+home.slice(end);
 home=home.slice(0,insertion)+block+home.slice(insertion);
}
// Offscreen backgrounds do not have native loading=lazy. Keep them deferred until near view.
home=home.replace(/<!-- gmn:home:(?:start|end) -->\s*/g,'');
const academicStart=home.indexOf('<details class="site-depth home-explore-panel"><summary>Formación y proyecto académico');
const academicEnd=home.indexOf('</details>',academicStart)+10;
if(academicStart<0||academicEnd<academicStart)throw Error('Academic home block missing');
home=home.slice(0,academicStart)+'<!-- gmn:home:start -->\n'+home.slice(academicStart,academicEnd)+'\n<!-- gmn:home:end -->'+home.slice(academicEnd);
home=home.replace(/style="background-image:url\('([^']+)'\);?"/g,'data-background-src="$1"');
write('index.html',home);
const copies={
 'Elegir experiencia':['Choose an experience','Choisir une expérience','Erlebnis auswählen','Scegli un’esperienza','Escolher uma experiência','Kies een ervaring'],
 'Preparar mi actividad':['Prepare for my activity','Préparer mon activité','Meine Aktivität vorbereiten','Preparare la mia attività','Preparar a minha atividade','Mijn activiteit voorbereiden'],
 'Conocer el proyecto':['Discover the project','Découvrir le projet','Das Projekt kennenlernen','Scopri il progetto','Conhecer o projeto','Ontdek het project'],
 'Explorar Nómada Extremo':['Explore Nómada Extremo','Explorer Nómada Extremo','Nómada Extremo entdecken','Esplora Nómada Extremo','Explorar Nómada Extremo','Ontdek Nómada Extremo'],
 'COMUNIDAD':['COMMUNITY','COMMUNAUTÉ','GEMEINSCHAFT','COMUNITÀ','COMUNIDADE','COMMUNITY'],
 'Y CLUB':['AND CLUB','ET CLUB','UND CLUB','E CLUB','E CLUBE','EN CLUB'],
 'MI PROGRESO':['MY PROGRESS','MA PROGRESSION','MEIN FORTSCHRITT','I MIEI PROGRESSI','O MEU PROGRESSO','MIJN VOORTGANG'],
 'SEGÚN PROGRAMACIÓN':['SUBJECT TO SCHEDULING','SELON LA PROGRAMMATION','NACH TERMINPLANUNG','SECONDO IL PROGRAMMA','CONFORME A PROGRAMAÇÃO','VOLGENS PLANNING']};
for(const [i,lang] of ['es','en','fr','de','it','pt','nl'].entries()){
 const dict=JSON.parse(read('i18n/'+lang+'.json'));
 for(const [source,values] of Object.entries(copies))dict.strings[source]=i?values[i-1]:source;
 write('i18n/'+lang+'.json',JSON.stringify(dict,null,2)+'\n');
}
for(const [file,title] of [['comunidad.html','COMUNIDAD<br><span style="color:var(--arena-claro);">Y CLUB</span>'],['logbook.html','LOGBOOK<br><span style="color:var(--arena-claro);">MI PROGRESO</span>']]){
 let html=read(file);html=html.replace(/(<h1\b[^>]*>)[\s\S]*?<\/h1>/,'$1'+title+'</h1>');write(file,html);
}
// Canonical URLs for all authored pages, excluding redirect and utility screens from sitemap.
const excluded=new Set(['404.html','login.html','gracias.html']);
const base='https://diegodavidextremo.github.io/nomada-extremo/';
const entries=[];
for(const file of fs.readdirSync(root).filter(f=>f.endsWith('.html'))){
 let html=read(file);if(/http-equiv="refresh"/.test(html))continue;
 const url=base+(file==='index.html'?'':file);
 if(!/rel="canonical"/.test(html))html=html.replace('</head>',`<link rel="canonical" href="${url}">\n</head>`);
 write(file,html);
 if(!excluded.has(file))entries.push('  <url><loc>'+url+'</loc><lastmod>2026-10-25</lastmod></url>');
}
write('sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+entries.join('\n')+'\n</urlset>\n');
console.log('Grouped home exploration, clarified page roles, rebuilt canonical URLs and sitemap.');
