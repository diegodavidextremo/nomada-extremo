#!/usr/bin/env node
/* Compile shared academic JSON to readable static HTML. No runtime dependency. */
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(root, 'assets/data/gmn-2026-2027.json'), 'utf8'));
const check = process.argv.includes('--check');
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const date = value => new Date(`${value}T12:00:00Z`).toLocaleDateString('es-ES', {day:'numeric', month:'long', year:'numeric', timeZone:'UTC'});
const teacher = m => m.teacher || 'Profesor actualmente no indicado';
const countEvidence = m => data.evidence.filter(e => e.moduleCodes.includes(m.code)).length;
const link = ([text,href]) => `<a href="${esc(href)}">${esc(text)}</a>`;
const writes = [];
function write(file, content) {
  const target = path.join(root, file);
  const previous = fs.existsSync(target) ? fs.readFileSync(target,'utf8') : '';
  if (previous.replace(/\r\n/g,'\n') === content.replace(/\r\n/g,'\n')) return;
  if (check) { writes.push(file); return; }
  fs.mkdirSync(path.dirname(target), {recursive:true});
  fs.writeFileSync(target,content);
  writes.push(file);
}
function replaceBlock(file, name, content) {
  const s = fs.readFileSync(path.join(root,file),'utf8');
  const start = `<!-- gmn:${name}:start -->`, end = `<!-- gmn:${name}:end -->`;
  const a = s.indexOf(start), b = s.indexOf(end);
  if (a < 0 || b < a) throw new Error(`Missing ${name} markers in ${file}`);
  write(file, s.slice(0,a+start.length)+'\n'+content+'\n'+s.slice(b));
}
const layers = `<div class="n3-grid">
<article class="n3-layer"><span class="n3-badge">● Presente · real / actual</span><h3>Lo que existe hoy</h3><p>Diego David, la formación GMN, la historia de primero y el inicio confirmado de segundo. Aprendizajes y evidencias se incorporan cuando se documentan.</p><a href="formacion-gmn.html">Conocer la formación →</a></article>
<article class="n3-layer"><span class="n3-badge n3-badge--prototype">◐ Prototipo · académico</span><h3>Lo que estamos diseñando</h3><p>Catálogo, Escuela, reservas simuladas, packs, gestión, material y Logbook. Sistemas de demostración sin servicios comerciales operativos.</p><a href="proyecto-intermodular.html#matriz">Ver cómo se conecta →</a></article>
<article class="n3-layer"><span class="n3-badge n3-badge--future">○ Futuro · visión / estudio</span><h3>Lo que podría llegar</h3><p>Base, Campamento, Hangar, flota, viajes e infraestructura. Ideas sujetas a investigación, recursos y validación, sin aperturas anunciadas.</p><a href="horizonte-nomada.html">Explorar el horizonte →</a></article></div>`;
const summary = `<div class="n3"><span class="n3-badge">Presente · ${esc(data.year)} en curso</span><h2>${esc(data.year)} · ${esc(data.course)}</h2><p>${esc(data.stage)} en el ${esc(data.center)} de ${esc(data.locality)}. Inicio: <time datetime="${data.startDate}">${date(data.startDate)}</time>.</p><p>${data.modules.length - 1} módulos + Fase de Empresa II. Las diez áreas académicas están contempladas; conexiones con el proyecto en desarrollo.</p><div class="n3-actions"><a class="n3-button" href="segundo-gmn.html">Conocer el curso</a><a class="n3-button n3-button--quiet" href="proyecto-intermodular.html">Proyecto Intermodular →</a></div></div>`;
const dashboard = `<dl class="n3-stats"><div><dt>Curso activo</dt><dd>${esc(data.year)}<small>${esc(data.course)}</small></dd></div><div><dt>Áreas contempladas</dt><dd>${data.modules.length - 1} + 1<small>9 módulos + Fase de Empresa II</small></dd></div><div><dt>Estado del proyecto</dt><dd>${esc(data.status)}<small>Proyecto no operativo</small></dd></div></dl><div class="im-meta"><span>${esc(data.center)} · ${esc(data.locality)}</span><span>Inicio: ${date(data.startDate)}</span><span>Actualización: <time datetime="${data.updatedAt}">${date(data.updatedAt)}</time></span></div>`;
const matrix = `<div id="module-matrix">${data.modules.map(m=>`<article class="im-matrix-item" data-module-area="${esc(m.area)}" data-module-search="${esc([m.code,m.name,m.teacher,m.area,m.knowledge,m.application].join(' '))}"><span class="im-code">${m.code}</span><div><h3><a href="#${m.chapter}">${esc(m.name)}</a></h3><p>${esc(teacher(m))}${m.optional?' · Optativa':''}</p><p>${esc(m.area)} · ${esc(m.knowledge)}</p></div><div class="im-matrix-state"><span class="n3-badge n3-badge--prototype">${esc(m.status)}</span><small><time datetime="${m.updatedAt}">${m.updatedAt}</time></small></div></article>`).join('\n')}</div>`;
const modules = data.modules.map(m=>`<article class="im-module" id="${m.chapter}"><div class="im-module-head"><div><span class="n3-kicker">${m.code} · ${esc(m.area)}${m.optional?' · Optativa':''}</span><h3>${esc(m.name)}</h3><p>${esc(teacher(m))}</p></div><span class="n3-badge n3-badge--prototype">${esc(m.status)}</span></div><dl class="im-flow">${[['Conocimiento',m.knowledge],['Decisión',m.decision],['Aplicación',m.application],['Resultado',m.result]].map(([a,b])=>`<div><dt>${a}</dt><dd>${esc(b)}</dd></div>`).join('')}</dl><div class="n3-actions">${m.links.map(link).join(' · ')}</div></article>`).join('\n');
const moduleList = `<div class="n3-table-wrap" tabindex="0" role="region" aria-label="Matrícula de segundo"><table class="n3-table"><caption>Matrícula facilitada por el autor · ${esc(data.course)} · 9 módulos + Fase de Empresa II</caption><thead><tr><th scope="col">Código</th><th scope="col">Asignatura</th><th scope="col">Profesorado</th></tr></thead><tbody>${data.modules.map(m=>`<tr><td>${m.code}</td><th scope="row"><a href="proyecto-intermodular.html#${m.chapter}">${esc(m.name)}</a>${m.optional?' <small>· Optativa</small>':''}</th><td>${esc(teacher(m))}</td></tr>`).join('')}</tbody></table></div>`;
const journal = "";
const roadmap = `<div class="im-timeline">${data.milestones.map(m=>`<article><small>${esc(m.period)} · ${esc(m.status)}</small><h3>${esc(m.title)}</h3><p>${esc(m.description)}</p></article>`).join('')}</div>`;
const evidence = "";
const indicators = `<div class="n3-table-wrap" tabindex="0" role="region" aria-label="Indicadores ambientales propuestos"><table class="n3-table"><caption>Propuesta de indicadores · todos pendientes de línea base</caption><thead><tr><th scope="col">Indicador</th><th scope="col">Medida prevista</th><th scope="col">Fuente que se deberá aportar</th></tr></thead><tbody>${[['Residuos','kg por actividad / separación','Pesaje y registro de destino'],['Movilidad','km y ocupación del transporte','Registro de desplazamientos'],['Energía','kWh por periodo','Medición o documentación de consumo'],['Agua','Litros por actividad o periodo','Medición y alcance declarado'],['Capacidad de carga','Grupo y condiciones del espacio','Criterio técnico y permisos del entorno'],['Material reutilizable','Usos, mantenimiento y reparación','Historial del inventario'],['Emisiones estimadas','kg CO₂e con método explícito','Datos de actividad y factores documentados'],['Proveedores locales','Proporción con criterio geográfico','Registros de compras, cuando existan'],['Conservación e impacto','Observaciones e incidencias','Ficha de entorno'],['Educación ambiental','Objetivos y evaluación','Guion de sesión y reflexión'],['Cumplimiento','Criterios revisados / pendientes','Lista de requisitos y revisión']].map(r=>'<tr>'+r.map(c=>`<td>${esc(c)}</td>`).join('')+'</tr>').join('')}</tbody></table></div>`;
let template = fs.readFileSync(path.join(__dirname,'templates/intermodular.html'),'utf8');
const chapters = [...template.matchAll(/id="([^"]+)" data-chapter="([^"]+)"/g)].map(m=>[m[1],m[2]]);
const chapterOptions = chapters.map(([id,title],i)=>`<option value="${id}">${String(i+1).padStart(2,'0')} · ${title}</option>`).join('');
const chapterLinks = chapters.map(([id,title],i)=>`<a href="#${id}">${String(i+1).padStart(2,'0')} / ${title}</a>`).join('');
const vars={dashboard,layers,matrix,modules,evidence,journal,roadmap,indicators,chapterOptions,chapterLinks,areaOptions:[...new Set(data.modules.map(m=>m.area))].map(a=>`<option>${esc(a)}</option>`).join('')};
template = template.replace(/\{\{(\w+)\}\}/g,(_,key)=>{if(!(key in vars))throw new Error(key);return vars[key];});
function page(title, description, body, filename) {
 const current=fs.readFileSync(path.join(root,filename),'utf8');
 const match=current.match(/<main\b[^>]*>[\s\S]*?<\/main>/);
 if(!match)throw new Error('Missing academic page shell: '+filename);
 const opening=match[0].match(/^<main\b[^>]*>/)[0];
 return current.slice(0,match.index)+opening+'\n'+body+'\n</main>'+current.slice(match.index+match[0].length);
}
write('proyecto-intermodular.html',page('Proyecto Intermodular 2026-2027 · NÓMADA EXTREMO 3.0','Memoria central de 2.º GMN: diez áreas académicas, decisiones, bienestar animal, seguridad, sostenibilidad, viabilidad y planificación. Proyecto no operativo.',template,'proyecto-intermodular.html'));
const second=fs.readFileSync(path.join(__dirname,'templates/segundo-actual.html'),'utf8').replace(/\{\{(\w+)\}\}/g,(_,key)=>({dashboard,moduleList}[key]||''));
write('segundo-gmn.html',page('2.º GMN · Curso 2026-2027 | NÓMADA EXTREMO','Segundo curso activo desde el 14 de septiembre de 2026 en el IES Europa de Águilas: matrícula, docentes y Proyecto Intermodular.',second,'segundo-gmn.html'));
replaceBlock('index.html','home',`<details class="site-depth"><summary>Formación y proyecto académico</summary><section class="n3 n3-home-intro n3-section"><div class="n3-shell"><span class="n3-kicker">NÓMADA EXTREMO 3.0 · Curso ${esc(data.course)}</span>${summary}${layers}</div></section></details>`);
replaceBlock('formacion-gmn.html','summary',`<section class="n3-section n3-shell">${summary}${moduleList}</section>`);
if (check && writes.length) { console.error('Bloques académicos desactualizados:',writes.join(', ')); process.exitCode=1; }
else console.log(check?'Datos y HTML sincronizados.':`Generados ${writes.length} archivos académicos.`);
