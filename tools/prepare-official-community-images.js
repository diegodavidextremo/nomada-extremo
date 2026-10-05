const fs=require('node:fs'),path=require('node:path'),sharp=require('sharp'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),folder=path.join(root,'assets/images/community-oficial-2026');
const jobs=path.join(__dirname,'reports/official-generation');
(async()=>{
 fs.mkdirSync(folder,{recursive:true});
 const imports=fs.readdirSync(jobs).filter(f=>f.endsWith('.json')).map(f=>JSON.parse(fs.readFileSync(path.join(jobs,f),'utf8'))).filter(item=>item.reference==='VERSIÓN OFICIAL DE LA NOCHE' && ['pastel-beige','editorial'].includes(item.background));
 const prompts=[];
 for(const item of imports){
  const file=item.name+'.webp',target=path.join(folder,file);
  await sharp(item.source).resize({width:1400,height:1400,fit:'inside',withoutEnlargement:true}).webp({quality:91,effort:5}).toFile(target);
  const info=await sharp(target).metadata();prompts.push({file,width:info.width,height:info.height,prompt:item.prompt,background:item.background});
 }
 fs.writeFileSync(path.join(folder,'generation-prompts.json'),JSON.stringify({tool:'Built-in image_gen',reference:'assets/images/emblema-referencia-catalogo-noche.png',referenceApproved:'OFICIAL 5 OCTUBRE 2026 VERSIÓN OFICIAL DE LA NOCHE',referenceSha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'assets/images/emblema-referencia-catalogo-noche.png'))).digest('hex'),assets:prompts},null,2)+'\n');
 console.log('Prepared '+prompts.length+' assets with the approved NIGHT emblem.');
})().catch(error=>{console.error(error);process.exitCode=1});
