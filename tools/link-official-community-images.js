const fs=require('node:fs'),path=require('node:path');const root=path.resolve(__dirname,'..');
const files=fs.readdirSync(root).filter(f=>f.endsWith('.html'));
const names=new Set(JSON.parse(fs.readFileSync(path.join(root,'assets/images/community-2026/generation-prompts.json'),'utf8')).assets.map(x=>x.file.replace('.webp','')));
for(const file of files){const full=path.join(root,file),before=fs.readFileSync(full,'utf8');const after=before.replace(/assets\/images\/community-2026\//g,'assets/images/community-oficial-2026/').replace(/assets\/images\/noext\/([a-z0-9-]+)\.png/g,(match,name)=>names.has(name)?'assets/images/community-oficial-2026/'+name+'.webp':match);if(after!==before)fs.writeFileSync(full,after);}
console.log('Current branded product references updated across the website.');
