/* Generate navigation index from current HTML; no copied external content. */
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const decode=s=>s.replace(/<[^>]*>/g,' ').replace(/&([a-z]+);/gi,(m,k)=>({amp:'&',quot:'"',nbsp:' ',aacute:'á',eacute:'é',iacute:'í',oacute:'ó',uacute:'ú',ntilde:'ñ',uuml:'ü'}[k]||' ')).replace(/\s+/g,' ').trim();
const pages=fs.readdirSync(root).filter(f=>f.endsWith('.html')).sort().flatMap(href=>{
 const html=fs.readFileSync(path.join(root,href),'utf8');if(/http-equiv="refresh"/i.test(html))return [];
 const title=decode(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]||href);
 const meta=html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1]||'';
 const headings=[...html.matchAll(/<h[23]\b[^>]*>([\s\S]*?)<\/h[23]>/gi)].map(m=>decode(m[1]));
 return [{title,href,keywords:decode(meta)+' '+headings.join(' ')}];
});
const file=path.join(root,'assets/data/assistant-index.json'),output=JSON.stringify({pages},null,2)+'\n';
if(process.argv.includes('--check')){if(fs.readFileSync(file,'utf8')!==output){console.error('Índice del asistente desactualizado');process.exit(1);}}else fs.writeFileSync(file,output);
console.log(`Índice del asistente: ${pages.length} páginas.`);
