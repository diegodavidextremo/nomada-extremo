/* Progressive academic controls. The entire memory remains readable without JS. */
(() => {
  'use strict';
  const normalize = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const search = document.getElementById('module-search');
  const area = document.getElementById('module-area');
  const modules = [...document.querySelectorAll('.im-matrix-item')];
  function filter() {
    const terms = normalize(search.value).trim().split(/\s+/).filter(Boolean);
    let count = 0;
    modules.forEach(m => {
      const visible = (!area.value || m.dataset.moduleArea === area.value) && terms.every(t=>normalize(m.dataset.moduleSearch).includes(t));
      m.hidden = !visible;
      if (visible) count++;
    });
    document.getElementById('module-count').textContent = `${count} de ${modules.length} áreas contempladas`;
    document.getElementById('module-empty').hidden = count !== 0;
  }
  if (search && area) {
    document.querySelector('[data-matrix-controls]').hidden=false;
    search.addEventListener('input',filter); area.addEventListener('change',filter);
    document.getElementById('module-reset').addEventListener('click',()=>{search.value='';area.value='';filter();search.focus();});
  }
  const mobileIndex = document.getElementById('chapter-mobile');
  mobileIndex?.addEventListener('change',()=>{location.hash=mobileIndex.value;});
  const chapters = [...document.querySelectorAll('[data-chapter]')];
  if ('IntersectionObserver' in window && chapters.length) {
    const observer = new IntersectionObserver(entries=>{
      const current=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];
      if (!current) return;
      document.querySelectorAll('.im-index a').forEach(a=>{
        if(a.hash==='#'+current.target.id) a.setAttribute('aria-current','location'); else a.removeAttribute('aria-current');
      });
      if(mobileIndex && document.activeElement!==mobileIndex) mobileIndex.value=current.target.id;
    },{rootMargin:'-20% 0px -55% 0px'});
    chapters.forEach(c=>observer.observe(c));
  }
  const form=document.getElementById('economy-form');
  if(form) {
    form.querySelector('[data-economy-button]').hidden=false;
    form.addEventListener('submit',event=>{
      event.preventDefault();
      const fields=['fixed-cost','unit-price','variable-cost'].map(id=>document.getElementById(id));
      const values=fields.map(f=>f.valueAsNumber), output=document.getElementById('economy-result');
      if(values.some(v=>!Number.isFinite(v)||v<0)) {output.textContent='Completa los tres valores con números válidos, iguales o superiores a cero.';return;}
      const [fixed,price,variable]=values, margin=price-variable;
      if(margin<=0) {output.textContent='Con estos supuestos no hay un margen unitario positivo: no se puede calcular un punto de equilibrio finito.';return;}
      const units=Math.ceil(fixed/margin);
      if(!Number.isSafeInteger(units)) {output.textContent='Los supuestos exceden el rango de este explorador. Revisa los importes.';return;}
      output.textContent=`Supuesto didáctico: margen unitario ${margin.toLocaleString('es-ES',{style:'currency',currency:'EUR'})}; ${units.toLocaleString('es-ES')} unidades para cubrir los costes fijos del periodo. No son resultados reales del proyecto.`;
    });
    form.addEventListener('input',()=>{document.getElementById('economy-result').textContent='Supuestos modificados. Vuelve a calcular para actualizar el resultado.';});
  }
  const toolbar=document.getElementById('defense-controls');
  if(!toolbar || !chapters.length) return;
  let active=false, index=0, trigger=null, scrollBefore=0;
  let outside=[];
  const select=document.getElementById('defense-index');
  const prev=document.getElementById('defense-prev'), next=document.getElementById('defense-next');
  const progress=document.getElementById('defense-progress');
  function show(n, focus=true) {
    index=Math.max(0,Math.min(chapters.length-1,n));
    chapters.forEach((chapter,i)=>{chapter.hidden=i!==index;});
    select.value=chapters[index].id;
    progress.max=chapters.length;progress.value=index+1;
    document.getElementById('defense-count').textContent=`${index+1} / ${chapters.length}`;
    prev.disabled=index===0;next.disabled=index===chapters.length-1;
    window.scrollTo({top:0,behavior:'instant'});
    if(focus) {const heading=chapters[index].querySelector('h2');heading.tabIndex=-1;heading.focus({preventScroll:true});}
  }
  function start(button) {
    if(active)return;
    active=true;trigger=button;scrollBefore=window.scrollY;
    outside=[...document.body.children].filter(el=>el.tagName!=='MAIN'&&!['SCRIPT','STYLE'].includes(el.tagName)).map(el=>({el,inert:el.inert,hidden:el.hidden}));
    outside.forEach(({el})=>{el.inert=true;el.hidden=true;});
    document.body.classList.add('defense-mode');toolbar.hidden=false;
    const target=document.getElementById(location.hash.slice(1))?.closest('[data-chapter]');
    show(target?chapters.indexOf(target):0);
  }
  async function stop() {
    if(!active)return;
    active=false;chapters.forEach(c=>{c.hidden=false;});toolbar.hidden=true;
    document.body.classList.remove('defense-mode');
    outside.forEach(({el,inert,hidden})=>{el.inert=inert;el.hidden=hidden;});outside=[];
    if(document.fullscreenElement) {try{await document.exitFullscreen();}catch(_){/* Exit remains available. */}}
    trigger?.focus({preventScroll:true});window.scrollTo({top:scrollBefore,behavior:'instant'});
  }
  document.querySelectorAll('[data-defense-start]').forEach(b=>{b.hidden=false;b.addEventListener('click',()=>start(b));});
  document.querySelectorAll('[data-print]').forEach(b=>{b.hidden=false;b.addEventListener('click',()=>window.print());});
  prev.addEventListener('click',()=>show(index-1));next.addEventListener('click',()=>show(index+1));
  select.addEventListener('change',()=>show(chapters.findIndex(c=>c.id===select.value)));
  document.getElementById('defense-exit').addEventListener('click',stop);
  const fullscreen=document.getElementById('defense-fullscreen');
  if(!document.documentElement.requestFullscreen) fullscreen.hidden=true;
  fullscreen.addEventListener('click',async()=>{
    try {if(document.fullscreenElement) await document.exitFullscreen();else await document.documentElement.requestFullscreen();}
    catch(_){fullscreen.textContent='Pantalla completa no disponible';}
  });
  document.addEventListener('fullscreenchange',()=>{fullscreen.textContent=document.fullscreenElement?'Salir de pantalla completa':'Pantalla completa';});
  document.addEventListener('keydown',event=>{
    if(!active)return;
    if(event.key==='Escape'){event.preventDefault();stop();return;}
    if(event.target.closest('input,select,textarea,button,summary,[contenteditable]'))return;
    if(['ArrowRight','PageDown'].includes(event.key)){event.preventDefault();show(index+1);}
    if(['ArrowLeft','PageUp'].includes(event.key)){event.preventDefault();show(index-1);}
    if(event.key==='Home'){event.preventDefault();show(0);}
    if(event.key==='End'){event.preventDefault();show(chapters.length-1);}
  });
  function revealHash() {
    const target=document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if(!target)return;
    const chapter=target.closest('[data-chapter]');
    if(active&&chapter)show(chapters.indexOf(chapter),false);
    for(let p=target.parentElement;p;p=p.parentElement)if(p.tagName==='DETAILS')p.open=true;
    target.scrollIntoView({block:'start',behavior:'instant'});
  }
  window.addEventListener('hashchange',revealHash);
  document.addEventListener('click',event=>{
    const a=event.target.closest('a[href^="#"]');
    if(!active||!a)return;
    const target=document.getElementById(a.hash.slice(1));
    const chapter=target?.closest('[data-chapter]');
    if(chapter){event.preventDefault();show(chapters.indexOf(chapter),false);target.scrollIntoView({block:'start'});}
  });
})();
