const fs=require('fs'),path=require('path'),sharp=require('sharp');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8'),write=(f,s)=>fs.writeFileSync(path.join(root,f),s);
(async()=>{
 await sharp(path.join(root,'assets/images/emblema-oficial-web.webp')).resize({width:256}).webp({quality:92}).toFile(path.join(root,'assets/images/optimized/emblema-oficial-256.webp'));
 let s=read('assets/js/components.js');
 if(!s.includes('assets/images/optimized/emblema-oficial-256.webp'))s=s.replaceAll('src="assets/images/emblema-oficial-web.webp?v=20261005-8"','src="assets/images/emblema-oficial-web.webp?v=20261005-8" srcset="assets/images/optimized/emblema-oficial-256.webp 256w, assets/images/emblema-oficial-web.webp 768w" sizes="88px"');
 s=s.replaceAll('emblema-oficial-web.webp 1024w','emblema-oficial-web.webp 768w');
 write('assets/js/components.js',s);
 s=read('assets/js/chatbot.js');
 if(!s.includes('srcset='))s=s.replaceAll('src="${logo}"','src="${logo}" srcset="assets/images/optimized/emblema-oficial-256.webp 256w" sizes="48px"');
 write('assets/js/chatbot.js',s);
 const specs=JSON.parse(read('assets/data/activity-specs.json'));
 for(const [file,keys] of [['btt-costera',['BTT COSTERO']],['paramotor',['PARAMOTOR','PARATRIKE','PARAMOTOR & PARATRIKE']]]){
  const section=read(file+'.html').match(/class="activity-meta-list"[\s\S]*?<div class="activity-detail-grid"/)?.[0];
  for(const key of keys){
   for(const m of section.matchAll(/<div><span>(.*?)<\/span><strong>(.*?)<\/strong><\/div>/g)){
    const field={'Duración':'duracion','Edad recomendada':'edad','Nivel físico':'fisico','Nivel técnico':'tecnico','Mejor época':'temporada','Zona habitual':'zona'}[m[1]];
    if(field)specs[key][field]=m[2];
   }
   specs[key].ficha=file+'.html';
  }
 }
 write('assets/data/activity-specs.json',JSON.stringify(specs,null,2)+'\n');
 // Add context at the point of reading rather than more generic promotional copy.
 const sections={
  'guia-actividades.html':['Elegir experiencia','actividades.html'],
  'multiaventura.html':['Diseñar mi experiencia','packs.html#configurador'],
  'como-funciona.html':['Preparar mi actividad','material.html'],
  'certificaciones.html':['Formación y proyecto académico','formacion-gmn.html'],
  'tecnologia.html':['Entender los tres estados','proyecto-intermodular.html#tres-capas'],
  'seguridad.html':['Material y marcas','material.html']
 };
 // Use existing authored local links. Do not invent destinations or replace verified route profiles.
 for(const [file,[label,href]] of Object.entries(sections)){
  let html=read(file);
  if(html.includes('class="audit-context-link"')){
   html=html.replace(/(<p class="audit-context-link"><a href="[^"]+">)([^<]+) →<\/a><\/p>/,(_,a,label)=>a+'<span>'+label+'</span> <span aria-hidden="true">→</span></a></p>');write(file,html);continue;
  }
  const h1=html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/)?.[0];if(!h1)continue;
  html=html.replace(h1,h1+`<p class="audit-context-link"><a href="${href}"><span>${label}</span> <span aria-hidden="true">→</span></a></p>`);write(file,html);
 }
 console.log('Canonical specification coverage and emblem derivative completed.');
})().catch(e=>{console.error(e);process.exitCode=1;});
