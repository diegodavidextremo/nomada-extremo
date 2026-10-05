const fs=require('node:fs'),path=require('node:path'),sharp=require('sharp');
const root=path.resolve(__dirname,'..'),folder=path.join(root,'assets/images/community-2026');
const imports=JSON.parse(fs.readFileSync(path.join(__dirname,'reports/community-image-imports.json'),'utf8'));
(async()=>{
 fs.mkdirSync(folder,{recursive:true});
 const prompts=[];
 for(const item of imports){
  const target=path.join(folder,item.name+'.webp');
  await sharp(item.source).resize({width:1400,height:1400,fit:'inside',withoutEnlargement:true}).webp({quality:88,effort:5}).toFile(target);
  const info=await sharp(target).metadata();
  prompts.push({file:item.name+'.webp',width:info.width,height:info.height,prompt:item.prompt});
 }
 fs.writeFileSync(path.join(folder,'generation-prompts.json'),JSON.stringify({tool:'Built-in image_gen',reference:'assets/images/logo-oficial.png',assets:prompts},null,2)+'\n');
 console.log('Prepared '+prompts.length+' generated assets.');
})().catch(error=>{console.error(error);process.exitCode=1});
