const fs=require('fs'),path=require('path'),sharp=require('sharp');
const root=path.resolve(__dirname,'..');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'assets/images/aventura-con-alma-generation.json'),'utf8'));
(async()=>{const target=path.join(root,manifest.path);await sharp(manifest.source).resize({width:1536,withoutEnlargement:true}).webp({quality:88}).toFile(target);console.log('Saved',manifest.path,(await sharp(target).metadata()).width);})().catch(e=>{console.error(e);process.exitCode=1;});
