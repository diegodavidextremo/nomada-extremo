const fs=require('fs'),path=require('path');const root=path.resolve(__dirname,'..');const read=f=>fs.readFileSync(path.join(root,f),'utf8');
if(read('tools/build-gmn.js').includes("templates/segundo-actual.html")){console.log('Current academic template already configured.');process.exit(0);}
let second=read('segundo-gmn.html').match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1];
second=second.replace(/<div class="n3-table-wrap"[^>]*>\s*<table[\s\S]*?<\/table>\s*<\/div>/,'{{moduleList}}');
second=second.replace(/<dl class="n3-stats">[\s\S]*?<\/dl>\s*<div class="im-meta">[\s\S]*?<\/div>/,'{{dashboard}}');
if(!second.includes('{{moduleList}}'))throw new Error('Current module table not found');
fs.writeFileSync(path.join(root,'tools/templates/segundo-actual.html'),second);
let build=read('tools/build-gmn.js');
build=build.replace("if (previous === content) return;","if (previous.replace(/\\r\\n/g,'\\n') === content.replace(/\\r\\n/g,'\\n')) return;");
const a=build.indexOf('function page('),b=build.indexOf("write('proyecto-intermodular.html'",a);
build=build.slice(0,a)+`function page(title, description, body, filename) {
 const current=fs.readFileSync(path.join(root,filename),'utf8');
 const match=current.match(/<main\\b[^>]*>[\\s\\S]*?<\\/main>/);
 if(!match)throw new Error('Missing academic page shell: '+filename);
 const opening=match[0].match(/^<main\\b[^>]*>/)[0];
 return current.slice(0,match.index)+opening+'\\n'+body+'\\n</main>'+current.slice(match.index+match[0].length);
}
`+build.slice(b);
const start=build.indexOf("const history ="),end=build.indexOf("write('segundo-gmn.html'",start);
build=build.slice(0,start)+"const second=fs.readFileSync(path.join(__dirname,'templates/segundo-actual.html'),'utf8').replace(/\\{\\{(\\w+)\\}\\}/g,(_,key)=>({dashboard,moduleList}[key]||''));\n"+build.slice(end);
build=build.replace('<dd>${data.modules.length} / ${data.modules.length}<small>9 módulos + Fase de Empresa II</small>','<dd>${data.modules.length - 1} + 1<small>9 módulos + Fase de Empresa II</small>');
fs.writeFileSync(path.join(root,'tools/build-gmn.js'),build);
console.log('Generator now preserves current shells and current second-year template.');
