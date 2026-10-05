/* Preserve Diego's geography photograph byte-for-byte as a native print panel. */
const fs=require('node:fs'),path=require('node:path'),sharp=require('sharp'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
(async()=>{
 const folder=path.join(root,'assets/images/community-oficial-2026');
 const plate=await sharp(path.join(folder,'camiseta-carnaval-noext.webp')).jpeg({quality:94,chromaSubsampling:'4:4:4'}).toBuffer();
 const originalPhoto=fs.readFileSync(path.join(root,'assets/images/castillo-aguilas-roncaor-referencia.jpg'));
 const photo=await sharp(originalPhoto).resize({width:1600,withoutEnlargement:true}).jpeg({quality:95,chromaSubsampling:'4:4:4'}).toBuffer();fs.writeFileSync(path.join(root,'assets/images/castillo-aguilas-roncaor-web.jpg'),photo);
 const svg='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1254" height="1254" viewBox="0 0 1254 1254"><image width="1254" height="1254" xlink:href="data:image/jpeg;base64,'+plate.toString('base64')+'"/><defs><linearGradient id="print-edge" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="black"/><stop offset=".035" stop-color="white"/><stop offset=".965" stop-color="white"/><stop offset="1" stop-color="black"/></linearGradient><mask id="original-photo-panel"><rect x="706" y="263" width="432" height="243.216" fill="url(#print-edge)"/></mask></defs><image x="706" y="263" width="432" height="243.216" preserveAspectRatio="xMidYMid meet" mask="url(#original-photo-panel)" xlink:href="data:image/jpeg;base64,'+photo.toString('base64')+'"/></svg>';
 fs.writeFileSync(path.join(folder,'camiseta-carnaval-noext.svg'),svg);
 const file=path.join(folder,'generation-prompts.json'),manifest=JSON.parse(fs.readFileSync(file,'utf8'));
 const entry=manifest.assets.find(item=>['camiseta-carnaval-noext.webp','camiseta-carnaval-noext.svg'].includes(item.file));entry.file='camiseta-carnaval-noext.svg';entry.originalPhotograph='assets/images/castillo-aguilas-roncaor-referencia.jpg';entry.originalPhotographSha256=crypto.createHash('sha256').update(originalPhoto).digest('hex');entry.embeddedPhotograph='assets/images/castillo-aguilas-roncaor-web.jpg';entry.embeddedPhotographSha256=crypto.createHash('sha256').update(photo).digest('hex');entry.composition='Native SVG embeds the original photograph, uniformly resized and JPEG compressed for web; no AI redraw, warping, crop or recoloring.';
 fs.writeFileSync(file,JSON.stringify(manifest,null,2)+'\n');
 const page=path.join(root,'comunidad.html');fs.writeFileSync(page,fs.readFileSync(page,'utf8').replace(/camiseta-carnaval-noext\.webp/g,'camiseta-carnaval-noext.svg'));
 console.log('Original Águilas photograph embedded without redrawing; native SVG saved.');
})().catch(error=>{console.error(error);process.exitCode=1});
