/* NÓMADA EXTREMO — filtros combinables del catálogo */
(function(){
  'use strict';
  const panel=document.querySelector('.activities-filter-section .filter-panel');
  const cards=[...document.querySelectorAll('.ficha')];
  if(!panel||!cards.length)return;
  const norm=v=>String(v||'').toLocaleLowerCase('es-ES').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim();
  const dimNames={zona:'zona',medio:'medio',nivel:'nivel',tipo:'tipo',duracion:'duracion',grabacion:'grabacion',temporada:'temporada',validacion:'validacion'};
  const sectionMap={montana:['montaña','montaña','otoño-invierno'],vertical:['cuerda','vertical','otoño-invierno'],mar:['mar','agua','primavera-verano'],buceo:['mar','agua','todo el año'],aire:['aire','aire','todo el año'],barrancos:['río','agua','primavera-verano'],btt:['rueda','btt','otoño-invierno'],foil:['mar','agua','primavera-verano'],multiaventura:['montaña','multiaventura','todo el año']};
  const zones=['Águilas','Sierra Almenara','Cabo Cope','Almadenes','Sierra Espuña','Mazarrón','Mar Menor','Totana','Ricote'];
  cards.forEach(card=>{
    const section=card.closest('section'); const id=section?.id||''; const text=norm(card.textContent); const sectionText=norm(section?.textContent);
    const mapped=sectionMap[id]||['montaña','multiaventura','todo el año'];
    card.dataset.medio=mapped[0]; card.dataset.tipo=mapped[1]; card.dataset.temporada=mapped[2];
    card.dataset.nivel=norm(card.querySelector('.nivel-badge')?.textContent||'iniciación');
    card.dataset.zona=zones.filter(z=>sectionText.includes(norm(z))).map(norm).join(',')||'aguilas';
    const tags=[...card.querySelectorAll('.ficha-tag')].map(x=>norm(x.textContent));
    card.dataset.duracion=tags.find(x=>/h|dia|jornada|semana/.test(x))||'medio dia';
    card.dataset.grabacion=card.querySelector('.ficha-badges')?'si':'parcial';
    card.dataset.validacion=/extremo|avanzado|tecnic|operador|proveedor/.test(text)?'requiere tecnica':'no requiere tecnica';
  });
  const selected=new Map();
  const groups=[...panel.querySelectorAll('.filter-group')];
  groups.forEach((group,index)=>{
    const key=Object.keys(dimNames)[index]||dimNames[norm(group.querySelector('strong')?.textContent)]; if(!key)return;
    selected.set(key,new Set());
    group.querySelectorAll('.filter-chip').forEach(chip=>{
      chip.setAttribute('role','button'); chip.setAttribute('tabindex','0'); chip.setAttribute('aria-pressed','false'); chip.dataset.filterDimension=key; chip.dataset.filterValue=norm(chip.textContent);
      const toggle=()=>{const set=selected.get(key),v=chip.dataset.filterValue;set.has(v)?set.delete(v):set.add(v);chip.classList.toggle('is-active',set.has(v));chip.setAttribute('aria-pressed',String(set.has(v)));apply();};
      chip.addEventListener('click',toggle);chip.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();}});
    });
  });
  const tools=document.createElement('div'); tools.className='activity-filter-tools'; tools.innerHTML='<p class="activity-filter-count" aria-live="polite"></p><button class="btn btn-outline activity-filter-clear" type="button">Limpiar filtros</button>';
  panel.append(tools);
  const empty=document.createElement('div');empty.className='activity-filter-empty';empty.hidden=true;empty.setAttribute('role','status');empty.textContent='No hay actividades que coincidan con esta combinación. Prueba a limpiar algún filtro.';
  document.querySelector('#top-fichas')?.before(empty);
  const matches=(card,key,values)=>!values.size||[...values].some(v=>norm(card.dataset[key]).split(',').some(item=>item.includes(v)||v.includes(item)));
  const translate=source=>window.noextTranslate?.(source)||source;
  function updateLabels(){tools.querySelector('.activity-filter-clear').textContent=translate('Limpiar filtros');tools.querySelector('.activity-filter-count').textContent=visibleCount+' '+translate('actividades encontradas');empty.textContent=translate('No hay actividades que coincidan con esta combinación. Prueba a limpiar algún filtro.');}
  let visibleCount=cards.length;
  function apply(){visibleCount=0;cards.forEach(card=>{const show=[...selected].every(([k,v])=>matches(card,k,v));card.hidden=!show;if(show)visibleCount++;});empty.hidden=visibleCount!==0;updateLabels();}
  tools.querySelector('button').addEventListener('click',()=>{selected.forEach(s=>s.clear());panel.querySelectorAll('.filter-chip').forEach(c=>{c.classList.remove('is-active');c.setAttribute('aria-pressed','false');});apply();});
  window.addEventListener('noext:languagechange',updateLabels);
  apply();
})();
