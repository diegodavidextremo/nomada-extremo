document.addEventListener('DOMContentLoaded',()=>{
 document.querySelectorAll('[data-pack-filter]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-pack-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  let count=0;document.querySelectorAll('[data-pack-category]').forEach(card=>{card.hidden=button.dataset.packFilter!=='Todos'&&card.dataset.packCategory!==button.dataset.packFilter;if(!card.hidden)count++;});
  document.getElementById('pack-results').textContent=count+' '+(window.noextTranslate?.('propuestas')||'propuestas');
 }));
 const config=document.getElementById('configurador');
 if(config){
  const summary=document.createElement('p');summary.className='experience-selection';summary.setAttribute('aria-live','polite');
  const estimate=[...config.querySelectorAll('div')].find(d=>d.children.length>0&&[...d.children].some(c=>c.textContent.trim()==='A MEDIDA'));
  (estimate||config.querySelector('.grid-2')?.lastElementChild)?.append(summary);
  const cta=config.querySelector('a.btn-bosque');
  function update(){const tr=window.noextTranslate||((s)=>s);const selected=[...config.querySelectorAll('.config-opt.sel')].map(b=>b.textContent.trim());summary.textContent=selected.length?tr('Tu selección')+': '+selected.join(' · '):tr('Selecciona tus preferencias para preparar la consulta.');config.querySelectorAll('.config-opt').forEach(b=>b.setAttribute('aria-pressed',String(b.classList.contains('sel'))));if(cta)cta.href='contacto.html?experiencia='+encodeURIComponent(selected.join(' · '));}
  config.querySelectorAll('.config-opt').forEach(b=>b.addEventListener('click',()=>{b.classList.toggle('sel');update();}));window.addEventListener('noext:languagechange',update);update();
 }
 document.querySelectorAll('form').forEach(form=>{if(form.closest('nav')||form.matches('.search-form'))return;const note=document.createElement('div');note.className='experience-form-intro';note.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 4h16v16H4zM8 8h8M8 12h8M8 16h4"/></svg><span>Tu propuesta empieza aquí. Completa los datos y añade lo que te gustaría vivir.</span>';form.prepend(note);});
 const materialIcons=['<path d="m2 20 7-13 4 7 3-10 6 16H2Z"/>','<path d="M8 3a4 4 0 0 1 8 0v9a4 4 0 0 1-8 0V3Zm4 9v10M5 17h14"/>','<path d="M3 13c5 2 13 2 18 0-1 6-17 6-18 0ZM5 3l14 18"/>','<rect x="2" y="7" width="16" height="9" rx="4"/><path d="m6 12 4-2 4 2m6-9v14a4 4 0 0 1-8 0"/>','<circle cx="5" cy="17" r="4"/><circle cx="19" cy="17" r="4"/><path d="m5 17 5-9 5 9H5Zm5-9h7l2 9M7 5h5"/>','<path d="M3 10a9 9 0 0 1 18 0H3Zm0 0 7 10m11-10-7 10M10 20h4"/>','<rect x="2" y="6" width="20" height="15" rx="2"/><path d="M2 11h20M5 6l3-4m3 4 3-4m3 4 3-4m-9 13 5-3-5-3v6Z"/>','<path d="M7 3h10v18H7zM10 6h4M10 18h4M3 8v8m18-8v8"/>','<rect x="3" y="6" width="18" height="15" rx="2"/><path d="M9 6V3h6v3m-3 4v7m-3-3h6"/>'];
 if(document.getElementById('material-marcas-pro'))document.querySelectorAll('.material-grid .material-card').forEach((card,index)=>{const glyph=document.createElement('span');glyph.className='experience-material-icon';glyph.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+materialIcons[index%materialIcons.length]+'</svg>';card.prepend(glyph);});
 const selected=new URLSearchParams(location.search).get('experiencia');if(selected){const textarea=document.querySelector('form textarea');if(textarea&&!textarea.value)textarea.value='Me interesa: '+selected+'.';}
});
