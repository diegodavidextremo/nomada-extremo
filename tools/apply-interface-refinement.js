/* Repeatable migration of the October interface refinement. */
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const emblem='assets/images/emblema-oficial-web.webp?v=20261005-8';
const shapes={
 BU:'<rect x="2" y="8" width="16" height="9" rx="4"/><path d="m6 12 4-2 4 2M21 3v14a4 4 0 0 1-8 0"/>',
 AI:'<path d="M2 10a10 10 0 0 1 20 0H2Zm0 0 8 10m12-10-8 10M12 1c-4 3-5 6-5 9m5-9c4 3 5 6 5 9"/><rect x="10" y="20" width="4" height="3" rx="1"/>',
 MV:'<path d="m2 21 7-14 4 7 3-11 6 18H2Zm4-8 3 2 3-3m2-2 2 2 2-2"/>',
 MW:'<path d="M2 9c3-4 5-4 8 0s5 4 8 0 3-2 4-2M2 15c3-4 5-4 8 0s5 4 8 0 3-2 4-2M2 21c3-4 5-4 8 0s5 4 8 0 3-2 4-2"/>',
 RB:'<circle cx="5" cy="17" r="4"/><circle cx="19" cy="17" r="4"/><path d="m5 17 5-10 5 10H5l8-10h5m-9-3h4m5 0h2l2 4"/>',
 NA:'<path d="M20 3C8 3 3 8 5 18c10 2 15-3 15-15ZM3 21 16 8M8 16v-5m0 5h5"/>',
 MC:'<path d="M7 17a5 5 0 1 1 1-10 6 6 0 0 1 11 3 4 4 0 0 1 0 8M7 21l1-2m4 2 1-2m4 2 1-2"/>',
 ON:'<circle cx="12" cy="12" r="9"/><path d="m16 8-2 6-6 2 2-6 6-2ZM12 1v2m0 18v2M1 12h2m18 0h2"/>',
 PA:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 5V2h8v3m-4 5v7m-3-3h6"/>',
 GR:'<path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Zm-4 10 3 3 5-6"/>',
 CP:'<rect x="6" y="7" width="12" height="15" rx="3"/><path d="M9 7V2m0 10h6m-6 4h3m9-13 2 3M3 3 1 6"/>',
 MI:'<path d="M20 3C8 3 3 8 5 18c10 2 15-3 15-15ZM3 21 16 8M8 16v-5m0 5h5"/>',
 MM:'<path d="m15 3 3 3-5 5m-7 3-4 4 4 4 4-4m0-6 7 7 4-4-7-7M3 3l4 1 2 3-2 2-3-2-1-4Z"/>',
 VT:'<path d="M19 2v20M17 5h4M17 11h4M17 17h4M3 21l4-7 3 2 3 5"/><circle cx="9" cy="5" r="2"/><path d="m8 9-2 5 5 2m-3-7 5 3 4-3"/>',
 LP:'<rect x="4" y="4" width="16" height="18" rx="2"/><path d="M8 2v5m8-5v5M4 10h16m-12 5 2 2 5-4"/>',
 FP:'<path d="M20 5c-4-3-8 2-8 2S8 2 4 5c-6 5 8 16 8 16S26 10 20 5ZM3 12h5l2-4 3 8 2-4h6"/>',
 LG:'<circle cx="12" cy="7" r="3"/><circle cx="4" cy="10" r="2"/><circle cx="20" cy="10" r="2"/><path d="M7 21v-3a5 5 0 0 1 10 0v3M1 20v-3a3 3 0 0 1 4-3m18 6v-3a3 3 0 0 0-4-3"/>',
 CAMERA:'<rect x="2" y="6" width="20" height="15" rx="3"/><circle cx="13" cy="13" r="4"/><path d="M6 6V3h6v3M5 10h1"/>',
 MOON:'<path d="M20 15A9 9 0 0 1 9 3a9 9 0 1 0 11 12Z"/><path d="m18 2 1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2Z"/>',
 BOOK:'<path d="M12 5C8 2 4 2 2 3v17c4-1 7 0 10 2 3-2 6-3 10-2V3c-4-1-7 0-10 2v17"/>'
};
const glyph=code=>'<svg class="interface-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+shapes[code]+'</svg>';
function edit(file,transform){const full=path.join(root,file),before=fs.readFileSync(full,'utf8'),after=transform(before);if(before!==after)fs.writeFileSync(full,after);}
edit('assets/js/components.js',s=>s.replace('<span class="ln1">NÓMADA EXTREMO</span>','<span class="ln1"><span class="brand-word brand-word--nomada">NÓMADA</span> <span class="brand-word brand-word--extremo">EXTREMO</span></span>'));
edit('assets/js/escuela-rutas.js',s=>{
 if(!s.includes('const interfaceGlyphs ='))s=s.replace('  const overviewContainer =','  const interfaceGlyphs = '+JSON.stringify(Object.fromEntries(Object.keys(shapes).map(k=>[k,glyph(k)])))+';\n  const overviewContainer =');
 return s.replace('${group.icon}','${interfaceGlyphs[group.icon]}').replace('${module.icon}','${interfaceGlyphs[module.icon]}');
});
for(const file of fs.readdirSync(root).filter(f=>f.endsWith('.html')))edit(file,s=>{
 if(!s.includes('assets/css/brand-interface.css'))s=s.replace('</head>','<link rel="stylesheet" href="assets/css/brand-interface.css?v=20261006-1">\n</head>');
 s=s.replace(/assets\/js\/components\.js\?v=20261005-8/g,'assets/js/components.js?v=20261006-1').replace(/assets\/js\/escuela-rutas\.js\?v=20261004-1/g,'assets/js/escuela-rutas.js?v=20261006-1');
 s=s.replace(/<div class="credencial-logo">NÓMADA EXTREMO<\/div>/g,'<div class="credencial-logo"><img class="credential-emblem" src="'+emblem+'" alt="" loading="lazy">NÓMADA EXTREMO</div>');
 if(file==='escuela.html')s=s.replace(/<div class="logbook-avatar"><svg[\s\S]*?<\/svg><\/div>/,'<div class="logbook-avatar"><img src="'+emblem+'" alt="Emblema Nómada Extremo"></div>');
 if(file==='logbook.html'){
  for(const [label,code] of [['Mar','MW'],['Montaña','MV'],['Vertical','VT'],['BTT','RB'],['Buceo','BU'],['Aire','AI']])s=s.replace('<article><div><span>'+label+'</span><b>','<article><div><span class="progress-discipline">'+glyph(code)+label+'</span><b>');
  s=s.replace(glyph('MM')+'Vertical</span>',glyph('VT')+'Vertical</span>');
  s=s.replace(/<div class="qr-fake" aria-hidden="true">[\s\S]*?<\/div>/,'<div class="qr-fake" aria-hidden="true"><img src="'+emblem+'" alt=""></div>');
  if(!s.includes('class="pass-symbol"'))s=s.replace('<aside class="qr-credential-card">','<aside class="qr-credential-card"><span class="pass-symbol" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 3h6v6H3V3Zm12 0h6v6h-6V3ZM3 15h6v6H3v-6Zm10-2h4v4h4v4h-4m-4-4v4m8-8h.01M12 3v5M3 12h5m4 0h.01"/></svg></span>');
 }
 if(file==='index.html')s=s.replace('<div class="grid-3" style="gap:1.2rem;margin-top:1.2rem;">','<div class="grid-3 home-origin-values" style="gap:1.2rem;margin-top:1.2rem;">');
 if(file==='comunidad.html'){
  s=s.replace(/<article>(Pack [^<]+)<small>/g,'<article><strong>$1</strong><small>');
  for(const [title,icon] of [['Family Beach Adventure','LG'],['BTT Costa Sur','RB'],['Waterman Summer','MW'],['Summer Night Adventure','MOON']])s=s.replace('<article><h3>'+title,'<article><span class="summer-campaign-icon">'+glyph(icon)+'</span><h3>'+title);
 }
 return s;
});
console.log('Official brand, school glyphs, credentials, passes and campaign structure refined.');
