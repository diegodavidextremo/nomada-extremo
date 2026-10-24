const fs=require('node:fs'),path=require('node:path'),sharp=require('sharp');
const root=path.resolve(__dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8'),write=(f,s)=>fs.writeFileSync(path.join(root,f),s);
(async()=>{
 const imageRoot='assets/images/optimized';fs.mkdirSync(path.join(root,imageRoot),{recursive:true});
 const hero='assets/images/noext/hero-principal.png';
 for(const width of [768,1440,1920])await sharp(path.join(root,hero)).resize({width,withoutEnlargement:true}).webp({quality:82}).toFile(path.join(root,imageRoot,'home-'+width+'.webp'));
 let home=read('index.html').replace(/ style="background-image:url\('assets\/images\/noext\/hero-principal.png'\)"/,'');
 home=home.replace('</head>','<link rel="preload" as="image" href="assets/images/optimized/home-1440.webp" imagesrcset="assets/images/optimized/home-768.webp 768w, assets/images/optimized/home-1440.webp 1440w, assets/images/optimized/home-1920.webp 1920w" imagesizes="100vw" fetchpriority="high">\n</head>');
 write('index.html',home);
 let css=read('assets/css/horizonte-nomada.css');
 css=css.replace(/linear-gradient\(120deg, rgba\(7, 27, 34, \.98\), rgba\(12, 45, 58, \.94\) 62%, rgba\(36, 79, 61, \.9\)\),\s*url\("\.\.\/images\/noext\/fondo-index-noext.png"\) center \/ cover/,'linear-gradient(120deg, #071b22, #0c2d3a 62%, #244f3d)');
 write('assets/css/horizonte-nomada.css',css);
 const manifest=[];
 // Build derivatives for editorial and pack imagery; keep all original files unchanged.
 const candidates=new Set();
 for(const f of fs.readdirSync(root).filter(f=>f.endsWith('.html'))){
  for(const m of read(f).matchAll(/(?:src|data-src)="(assets\/images\/(?:packs-2026\/[^"?]+|actividades\/familia-[^"?]+|aventura-con-alma-2026.webp))"/g))candidates.add(m[1]);
 }
 for(const source of candidates){
  if(!fs.existsSync(path.join(root,source)))continue;
  const name=path.basename(source,path.extname(source));
  const small=imageRoot+'/'+name+'-640.webp', large=imageRoot+'/'+name+'-1280.webp';
  for(const [file,width] of [[small,640],[large,1280]])await sharp(path.join(root,source)).resize({width,withoutEnlargement:true}).webp({quality:80}).toFile(path.join(root,file));
  manifest.push({source,small,large});
 }
 for(const f of fs.readdirSync(root).filter(f=>f.endsWith('.html'))){
  let html=read(f);
  for(const item of manifest)html=html.replace(/<img\b[^>]*>/g,tag=>{
    if(!tag.includes('src="'+item.source+'"'))return tag;
    return tag.replace('src="'+item.source+'"','src="'+item.large+'"').replace(/\s+srcset="[^"]*"/,'').replace(/\s+sizes="[^"]*"/,'').replace(/>$/,` srcset="${item.small} 640w, ${item.large} 1280w" sizes="(max-width:700px) 100vw, 50vw" decoding="async">`);
  });
  // A full-bleed CSS photo behind a split photo is decorative duplication on individual sheets.
  if(html.includes('class="site-hero-photo"'))html=html.replace(/(<div class="page-hero-bg") style="background-image:url\('[^']+'\)"/,'$1');
  write(f,html);
 }
 write('assets/images/optimized/manifest.json',JSON.stringify({date:'2026-10-25',derivatives:manifest},null,2)+'\n');
 // Every original page gets a unique share card based on its existing photo or official emblem.
 const social='assets/images/social';fs.mkdirSync(path.join(root,social),{recursive:true});
 const xml=s=>s.replace(/[<>&"]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]));
 for(const f of fs.readdirSync(root).filter(f=>f.endsWith('.html'))){
  let html=read(f);if(/http-equiv="refresh"/.test(html)||/property="og:image"/.test(html))continue;
  const title=html.match(/<title>(.*?)<\/title>/)?.[1].split('|')[0].trim()||'Nómada Extremo';
  const photos=[...html.matchAll(/(?:src="|url\(')(assets\/images\/[^"')?]+\.(?:webp|jpg|png))/g)].map(m=>m[1]);
  const source=photos.find(p=>!/(?:whatsapp|emblema|logo|icon|bandera)/i.test(p)&&fs.existsSync(path.join(root,p)))||'assets/images/emblema-oficial-web.webp';
  const image=await sharp(path.join(root,source)).resize(1200,630,{fit:'cover'}).modulate({brightness:.55}).toBuffer();
  const words=title.split(' '),lines=[''];for(const word of words){if((lines.at(-1)+' '+word).length>32)lines.push(word);else lines[lines.length-1]+=(lines.at(-1)?' ':'')+word;}
  const svg=`<svg width="1200" height="630"><rect width="1200" height="630" fill="#102f3b" opacity=".2"/><path d="M70 100h80" stroke="#d6ad7d" stroke-width="5"/><text x="70" y="155" fill="#e5c193" font-family="Arial" font-size="25" letter-spacing="5">NÓMADA EXTREMO</text>${lines.slice(0,4).map((l,i)=>`<text x="70" y="${280+i*69}" fill="white" font-family="Arial" font-weight="bold" font-size="58">${xml(l)}</text>`).join('')}<text x="70" y="570" fill="#f0ece5" font-family="Arial" font-size="23">Águilas · Aventura, técnica y naturaleza</text></svg>`;
  const target=social+'/'+f.replace('.html','.jpg');
  await sharp(image).composite([{input:Buffer.from(svg)}]).jpeg({quality:82}).toFile(path.join(root,target));
  html=html.replace('</head>',`<meta property="og:image" content="https://diegodavidextremo.github.io/nomada-extremo/${target}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image">\n</head>`);
  write(f,html);
 }
 console.log('Created responsive derivatives and unique social cards, retaining originals.');
})().catch(e=>{console.error(e);process.exitCode=1;});
