const fs=require('fs'),path=require('path');const root=path.resolve(__dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8'),write=(f,s)=>fs.writeFileSync(path.join(root,f),s);
let components=read('assets/js/components.js');
components=components.replace(/<h5>/g,'<h2>').replace(/<\/h5>/g,'</h2>');write('assets/js/components.js',components);
for(const file of fs.readdirSync(path.join(root,'assets/css')).filter(f=>f.endsWith('.css')&&f!=='shared.css')){
 const name='assets/css/'+file,s=read(name);const next=s.replace(/(\.footer(?:-col)?\s+)h5/g,'$1h2');if(s!==next)write(name,next);
}
for(const file of [...fs.readdirSync(root).filter(f=>f.endsWith('.html')),'tools/build-gmn.js']){
 let s=read(file);
 s=s.replace(/<aside\b([^>]*class="(?:n3-note|experience-catalog__note)"[^>]*)>([\s\S]*?)<\/aside>/g,'<div$1 role="note">$2</div>');
 if(file==='packs.html'&&!s.includes('<main id="main-content">')){
  s=s.replace(/<main\b([^>]*)>/,'<div$1>').replace('</main>','</div></main>');
  s=s.replace('<section class="page-hero">','<main id="main-content"><section class="page-hero">');
 }
 write(file,s);
}
console.log('Normalized footer headings, note semantics and pack main landmark.');
