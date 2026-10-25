/* October 25 editorial correction. Original sources are backed up outside the repository. */
const fs=require('fs'),path=require('path');const root=path.resolve(__dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8'),write=(f,s)=>fs.writeFileSync(path.join(root,f),s);
let s=read('tools/build-gmn.js');
if(!s.includes('gmn-readable-copy.json'))s=s.replace("const check = process.argv.includes('--check');","const readable = JSON.parse(fs.readFileSync(path.join(root, 'assets/data/gmn-readable-copy.json'), 'utf8'));\nconst check = process.argv.includes('--check');");
s=s.replace('${esc(m.area)} · ${esc(m.knowledge)}','${esc(m.area)} · ${esc(readable[m.code]?.understand || m.knowledge)}');
s=s.replace("[['Conocimiento',m.knowledge],['Decisión',m.decision],['Aplicación',m.application],['Resultado',m.result]]","[['Qué aporta',readable[m.code]?.understand || m.knowledge],['Trabajo previsto',readable[m.code]?.task || m.application]]");write('tools/build-gmn.js',s);
// One contact directory; keep the demonstration form, privacy consent and contextual safety link.
s=read('contacto.html');
const channelStart=s.indexOf('<!-- CANALES -->'),channelEnd=s.indexOf('<!-- TIPO DE CONSULTA -->');
if(channelStart<0||channelEnd<0)throw Error('Contact section markers missing');
const links=[
 ['WhatsApp','+34 623 17 96 18','https://wa.me/34623179618','whatsapp.webp'],
 ['Email','nomadaextremoaguilas@gmail.com','mailto:nomadaextremoaguilas@gmail.com','contact/gmail.png'],
 ['Telegram','@DiegoDavidExtremo','https://t.me/DiegoDavidExtremo','contact/telegram.png'],
 ['Instagram','@nomadaextremoes','https://www.instagram.com/nomadaextremoes/','contact/instagram.png'],
 ['X / Twitter','@nomadaextremoES','https://x.com/nomadaextremoES','contact/x.svg'],
 ['YouTube','Diego David Extremo','https://www.youtube.com/@diegodavidextremo',''],
 ['TikTok','Diego David Extremo','https://www.tiktok.com/@diegodavidextremo','']
];
const link=([name,detail,url,icon])=>`<a class="contact-hub-link" href="${url}"${url.startsWith('https:')?' target="_blank" rel="noopener noreferrer"':''}>${icon?`<img src="assets/images/${icon}" width="32" height="32" alt="">`:'<span class="contact-hub-initial" aria-hidden="true">'+name[0]+'</span>'}<span><strong>${name}</strong><small translate="no">${detail}</small></span><span aria-hidden="true">↗</span></a>`;
const hub=`<!-- CANALES -->
<section class="contact-directory" id="canales"><div class="container">
 <span class="label">Todo en un lugar</span><h2 class="titulo" data-index-label="Contacto y redes">CONTACTO Y REDES</h2>
 <p class="contact-hub-lead">Elige un canal para escribir o sigue las novedades del proyecto.</p>
 <div class="contact-hub-grid"><div><h3>Para hablar</h3><div class="contact-channel-grid">${links.slice(0,3).map(link).join('')}</div></div><div><h3>Para seguir el proyecto</h3><div class="contact-channel-grid">${links.slice(3).map(link).join('')}</div></div></div>
 <p class="contact-hub-location" id="ubicacion-y-horarios"><strong>Águilas, Murcia</strong><span>Origen del proyecto. El horario previsto en el plan es de lunes a domingo, de 8:00 a 21:00; todavía no hay atención comercial operativa.</span></p>
 </div></section>
`;
s=s.slice(0,channelStart)+hub+s.slice(channelEnd);
const closeStart=s.indexOf('<section class="contact-social-close">');
if(closeStart>=0)s=s.slice(0,closeStart)+s.slice(s.indexOf('</section>',closeStart)+10);
const mapStart=s.indexOf('<!-- MAPA Y HORARIOS -->');
if(mapStart>=0)s=s.slice(0,mapStart)+s.slice(s.indexOf('<div id="footer-placeholder">',mapStart));
s=s.replace('CONTACTO DEMOSTRATIVO','Contacto').replace('Contacto demostrativo','Contacto');
s=s.replace(/<h1\b[^>]*>[\s\S]*?<\/h1>/,'<h1 class="titulo">HABLEMOS</h1>');
s=s.replace('Contacto demostrativo para una marca académica. Sin reservas reales, sin cobros y sin actividades operativas actualmente.','Una consulta, una idea o una colaboración. Aquí tienes todas las formas de contactar.');
write('contacto.html',s);
// The global footer becomes an entry to the directory, rather than a second directory.
s=read('assets/js/components.js');
s=s.replace(/<li><a href="(?:mailto:nomadaextremoaguilas@gmail.com|https:\/\/wa.me\/34623179618|https:\/\/t.me\/DiegoDavidExtremo)"[\s\S]*?<\/a><\/li>/g,'');
s=s.replace(/<li><span>Horario:.*?<\/span><\/li>/g,'');
s=s.replace(/<div class="footer-social">[\s\S]*?<\/div>/,'<div class="footer-social"><a href="contacto.html#canales">Contacto y redes</a></div>');
s=s.replace(/<a href="\$\{WHATSAPP_URL\}" id="waFloat"[\s\S]*?<\/a>/,'');
write('assets/js/components.js',s);
// Outside Contact, brand channel buttons point to the single directory.
// Personal portfolios and individual videos are left intact.
const brand=/^(?:https:\/\/wa\.me\/34623179618(?:\?.*)?|mailto:nomadaextremoaguilas@gmail\.com(?:\?.*)?|https:\/\/t\.me\/DiegoDavidExtremo\/?|https:\/\/(?:www\.)?instagram\.com\/nomadaextremoes\/?|https:\/\/x\.com\/nomadaextremoES\/?)$/i;
for(const file of fs.readdirSync(root).filter(f=>f.endsWith('.html')&&f!=='contacto.html')){
 const html=read(file).replace(/<a\b([^>]*?)href="([^"]+)"([^>]*)>[\s\S]*?<\/a>/g,(full,before,url,after)=>{
  if(!brand.test(url.replace(/&amp;/g,'&')))return full;
  const attrs=(before+after).replace(/\s(?:target|rel|aria-label|title)="[^"]*"/g,'');
  return '<a '+attrs+' href="contacto.html#canales" data-contact-hub>Contacto y redes</a>';
 });write(file,html);
}
console.log('Simplified project generation and centralized brand channels.');
