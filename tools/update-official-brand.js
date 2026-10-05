/* Apply the human-approved emblem, without AI redrawing the website identity. */
const fs=require('node:fs'),path=require('node:path'),sharp=require('sharp');
const root=path.resolve(__dirname,'..');
const source=path.join(root,'assets/images/emblema-oficial-actual.png');
const version='20261005-8';
(async()=>{
 const original=fs.readFileSync(source);
 await sharp(original).resize(768,768,{fit:'contain',background:{r:0,g:0,b:0,alpha:0}}).webp({quality:95,effort:5}).toFile(path.join(root,'assets/images/emblema-oficial-web.webp'));
 for(const [name,size] of [['favicon-16x16.png',16],['favicon-32x32.png',32],['favicon-32.png',32],['apple-touch-icon.png',180],['android-chrome-192x192.png',192],['icon-192.png',192],['android-chrome-512x512.png',512],['icon-512.png',512]]){
  await sharp(original).resize(size,size,{fit:'contain',background:{r:0,g:0,b:0,alpha:0}}).png().toFile(path.join(root,'assets/icons',name));
 }
 const png=await sharp(original).resize(48,48).png().toBuffer();
 const header=Buffer.alloc(22);header.writeUInt16LE(1,2);header.writeUInt16LE(1,4);header[6]=48;header[7]=48;header.writeUInt16LE(1,10);header.writeUInt16LE(32,12);header.writeUInt32LE(png.length,14);header.writeUInt32LE(22,18);
 fs.writeFileSync(path.join(root,'assets/icons/favicon.ico'),Buffer.concat([header,png]));
 fs.writeFileSync(path.join(root,'assets/icons/favicon.svg'),'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1254 1254"><image width="1254" height="1254" href="data:image/png;base64,'+original.toString('base64')+'"/></svg>');
 const files=fs.readdirSync(root).filter(f=>f.endsWith('.html')).concat(['site.webmanifest','assets/js/components.js','assets/js/chatbot.js']);
 for(const file of files){const full=path.join(root,file),before=fs.readFileSync(full,'utf8');const after=before.replace(/assets\/images\/(?:logo-photoroom|logo-oficial)\.png/g,'assets/images/emblema-oficial-web.webp?v='+version).replace(/2026-05-12|20261005-7/g,version).replace(/(assets\/js\/components\.js\?v=)[^"'<>\s]+/g,'$1'+version);if(after!==before)fs.writeFileSync(full,after);}
 console.log('Current official emblem and all website/PWA icons updated.');
})().catch(error=>{console.error(error);process.exitCode=1});
