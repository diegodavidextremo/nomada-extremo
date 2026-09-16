/* Clear status labels and small cross-site enhancements; no commercial side effects. */
(() => {
  'use strict';
  const copy = {
    es:{present:'● Presente · formación y trayectoria',presentText:'Historia y formación del autor. El proyecto empresarial continúa siendo académico y no operativo.',prototype:'◐ Prototipo académico',prototypeText:'Catálogo, precios, reseñas, roles y procesos de demostración. No se realizan reservas, cobros ni servicios comerciales reales.',future:'○ Futuro · visión / estudio',futureText:'Ideas y planificación. Sin instalaciones, compras, acuerdos ni servicios operativos confirmados.',understand:'Entender los tres estados',demo:'Prototipo académico · datos de demostración',spanish:'Contenido académico en español',current:'2.º GMN · curso 2026-2027'},
    en:{present:'● Present · education and background',presentText:'The author’s background and education. The business project remains academic and non-operational.',prototype:'◐ Academic prototype',prototypeText:'Demonstration catalogue, prices, reviews, roles and processes. No real bookings, payments or commercial services.',future:'○ Future · vision / research',futureText:'Ideas and planning. No confirmed facilities, purchases, partnerships or operational services.',understand:'Understand the three states',demo:'Academic prototype · demonstration data',spanish:'Academic content in Spanish',current:'GMN Year 2 · 2026-2027'},
    fr:{present:'● Présent · formation et parcours',presentText:'Parcours et formation de l’auteur. Le projet d’entreprise reste académique et non opérationnel.',prototype:'◐ Prototype académique',prototypeText:'Catalogue, prix, avis, rôles et processus de démonstration. Aucune réservation, aucun paiement ni service commercial réel.',future:'○ Futur · vision / étude',futureText:'Idées et planification. Aucune installation, acquisition, collaboration ni activité opérationnelle confirmée.',understand:'Comprendre les trois états',demo:'Prototype académique · données de démonstration',spanish:'Contenu académique en espagnol',current:'GMN · 2e année 2026-2027'},
    de:{present:'● Gegenwart · Ausbildung und Werdegang',presentText:'Werdegang und Ausbildung des Autors. Das Unternehmensprojekt bleibt ein nicht operatives Ausbildungsprojekt.',prototype:'◐ Ausbildungsprototyp',prototypeText:'Katalog, Preise, Bewertungen, Rollen und Abläufe dienen der Demonstration. Keine echten Buchungen, Zahlungen oder kommerziellen Leistungen.',future:'○ Zukunft · Vision / Studie',futureText:'Ideen und Planung. Keine bestätigten Einrichtungen, Käufe, Kooperationen oder operativen Leistungen.',understand:'Die drei Zustände verstehen',demo:'Ausbildungsprototyp · Beispieldaten',spanish:'Fachinhalte auf Spanisch',current:'GMN · 2. Jahr 2026-2027'},
    it:{present:'● Presente · formazione e percorso',presentText:'Storia e formazione dell’autore. Il progetto imprenditoriale resta accademico e non operativo.',prototype:'◐ Prototipo accademico',prototypeText:'Catalogo, prezzi, recensioni, ruoli e processi dimostrativi. Nessuna prenotazione, pagamento o servizio commerciale reale.',future:'○ Futuro · visione / studio',futureText:'Idee e pianificazione. Nessuna struttura, acquisto, collaborazione o attività operativa confermata.',understand:'Comprendere i tre stati',demo:'Prototipo accademico · dati dimostrativi',spanish:'Contenuti accademici in spagnolo',current:'GMN · 2º anno 2026-2027'},
    pt:{present:'● Presente · formação e percurso',presentText:'História e formação do autor. O projeto empresarial continua académico e não operacional.',prototype:'◐ Protótipo académico',prototypeText:'Catálogo, preços, avaliações, funções e processos de demonstração. Sem reservas, cobranças ou serviços comerciais reais.',future:'○ Futuro · visão / estudo',futureText:'Ideias e planeamento. Sem instalações, compras, acordos ou serviços operacionais confirmados.',understand:'Compreender os três estados',demo:'Protótipo académico · dados de demonstração',spanish:'Conteúdo académico em espanhol',current:'GMN · 2.º ano 2026-2027'}
  };
  const lang=()=>copy[document.documentElement.lang]?.present?document.documentElement.lang:'es';
  const apply=()=>{
    const language=lang();
    document.querySelectorAll('[data-n3-copy]').forEach(el=>{el.setAttribute('translate','no');el.lang=language;el.textContent=copy[language][el.dataset.n3Copy]||copy.es[el.dataset.n3Copy];});
  };
  document.querySelectorAll('.ficha-precio,.pack-precio,.super-pack-precio,.resena-card,.review-card,.testimonio-card,.logbook-kpi-grid,.logbook-profile-stats').forEach(el=>{
    if(el.closest('[data-history]')||el.querySelector('[data-n3-copy="demo"]'))return;
    const note=document.createElement('small');note.className='n3-demo-label';note.dataset.n3Copy='demo';note.setAttribute('translate','no');el.appendChild(note);
  });
  // Spanish-only academic sections are explicitly identified to visitors using other languages.
  if(document.querySelector('main[translate="no"]') && document.querySelector('.im-hero')) {
    const note=document.createElement('p');note.className='im-meta';note.dataset.n3Copy='spanish';
    document.querySelector('.im-hero .n3-shell').appendChild(note);
  }
  const reviewButton=document.querySelector('[data-demo-review]');
  reviewButton?.addEventListener('click',()=>{
    const form=reviewButton.closest('form');
    if(!form.reportValidity())return;
    let result=form.querySelector('[role="status"]');
    if(!result){result=document.createElement('p');result.setAttribute('role','status');result.lang='es';result.setAttribute('translate','no');form.appendChild(result);}
    result.textContent='Reseña simulada. No se ha enviado, publicado ni guardado ningún dato.';
  });
  function revealAnchor() {
    let target;
    try{target=document.getElementById(decodeURIComponent(location.hash.slice(1)));}catch(_){return;}
    if(!target)return;
    let opened=false;
    for(let p=target.parentElement;p;p=p.parentElement)if(p.tagName==='DETAILS'&&!p.open){p.open=true;opened=true;}
    if(opened)target.scrollIntoView({block:'start',behavior:'instant'});
  }
  document.addEventListener('click',event=>{
    const anchor=event.target.closest('a[href^="#"]');
    if(!anchor)return;
    let target;try{target=document.getElementById(decodeURIComponent(anchor.hash.slice(1)));}catch(_){return;}
    if(!target)return;
    for(let p=target.parentElement;p;p=p.parentElement)if(p.tagName==='DETAILS')p.open=true;
  },true);
  window.addEventListener('hashchange',revealAnchor);revealAnchor();
  window.addEventListener('noext:languagechange',apply);apply();
})();
