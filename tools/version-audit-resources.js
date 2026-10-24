const fs=require('node:fs'),path=require('node:path');const root=path.resolve(__dirname,'..');
const changed=['styles','horizonte-nomada','experience-interface','chatbot','filters','main','components','i18n'];
for(const file of fs.readdirSync(root).filter(f=>f.endsWith('.html'))){const p=path.join(root,file);let html=fs.readFileSync(p,'utf8');for(const name of changed)html=html.replace(new RegExp('(assets/(?:css|js)/'+name+'\\.(?:css|js))(?:\\?v=[^" ]*)?','g'),'$1?v=20261025');fs.writeFileSync(p,html);}
console.log('Versioned modified browser resources.');
