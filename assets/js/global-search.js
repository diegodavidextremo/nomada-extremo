/* Nómada Extremo: arquitectura de navegación y búsqueda local accesible. */
(function () {
  'use strict';
  if (window.__noextGlobalSearchReady) return;
  window.__noextGlobalSearchReady = true;

  const navGroups = [
    {
      label: 'Experiencias', href: 'actividades.html',
      columns: [
        ['Descubrir', ['Catálogo de actividades', 'actividades.html', 'Mar, montaña, aire, vertical y mucho más.'], ['Guía y comparativas', 'guia-actividades.html'], ['Zonas de aventura', 'zonas.html']],
        ['Combinar', ['Packs y bonos', 'packs.html', 'Experiencias conectadas por nivel y territorio.'], ['Viajes', 'viajes.html'], ['Grupos, centros y empresas', 'grupos.html']],
        ['Preparar', ['Material y marcas', 'material.html', 'Equipamiento y criterios de elección.'], ['Alquiler orientativo', 'alquiler.html'], ['Solicitar experiencia', 'reservas.html']]
      ]
    },
    {
      label: 'Escuela', href: 'escuela.html',
      columns: [
        ['Aprender', ['Escuela Nómada', 'escuela.html', 'Itinerarios y progresión por disciplinas.'], ['Formación GMN', 'formacion-gmn.html'], ['Credenciales', 'certificaciones.html']],
        ['Criterio', ['Seguridad y gestión del riesgo', 'seguridad.html', 'Protocolos, seguros y documentación.'], ['Método Nómada', 'como-funciona.html'], ['Formularios', 'formularios.html']]
      ]
    },
    {
      label: 'Comunidad', href: 'comunidad.html',
      columns: [
        ['Registrar', ['Comunidad Nómada', 'comunidad.html', 'Historias, participación y vínculos outdoor.'], ['Logbook', 'logbook.html'], ['Blog y lecturas', 'blog.html']],
        ['Cuidar', ['Naturaleza Nómada', 'naturaleza.html', 'Mínimo impacto y educación ambiental.'], ['Sostenibilidad', 'sostenibilidad.html'], ['Nómada Naturista', 'naturistas.html']]
      ]
    },
    {
      label: 'Universo', href: 'quienes-somos.html',
      columns: [
        ['Marca', ['Quiénes somos', 'quienes-somos.html', 'Identidad, visión y territorio mediterráneo.'], ['Fundador', 'fundador.html'], ['Equipo', 'equipo.html']],
        ['Crear', ['Audiovisual outdoor', 'audiovisual.html', 'Foto, vídeo, POV, 360 y narrativa.'], ['Base y campamento', 'base-campamento.html'], ['Horizonte Nómada', 'horizonte-nomada.html']]
      ]
    },
    {
      label: 'Proyecto', href: 'proyecto-completo.html',
      columns: [
        ['Documentar', ['Proyecto completo', 'proyecto-completo.html', 'La arquitectura integral de Nómada Extremo.'], ['Proyecto intermodular', 'proyecto-intermodular.html'], ['Marco académico', 'proyecto-academico.html']],
        ['Validar', ['Transparencia y financiación', 'transparencia-financiacion.html', 'Escenarios, fases y viabilidad futura.'], ['Tecnología', 'tecnologia.html'], ['Preguntas frecuentes', 'faq.html']]
      ]
    }
  ];

  const searchItems = [
    ['Inicio','Marca','Portada y visión general del proyecto.','index.html','IN','portada home aventura'],
    ['Actividades','Experiencias','Catálogo por medio, nivel, territorio y formato.','actividades.html','EX','deportes catálogo mar montaña aire vertical'],
    ['Guía de actividades','Experiencias','Comparativas y criterios para elegir cada experiencia.','guia-actividades.html','GU','comparar puenting snorkel trekking'],
    ['Packs y bonos','Experiencias','Combinaciones, formatos especiales y bonos regalo.','packs.html','PK','packs regalo premium'],
    ['Zonas de aventura','Territorio','Águilas, Murcia y salidas especiales de referencia.','zonas.html','ZO','lugares zonas águilas murcia'],
    ['Viajes','Experiencias','Rutas y escapadas futuras conectadas con la aventura.','viajes.html','VI','viajar escapadas rutas'],
    ['Grupos y empresas','Experiencias','Propuestas para familias, centros, grupos y empresas.','grupos.html','GR','colegios familias empresas'],
    ['Material y marcas','Preparación','Equipamiento técnico, proveedores y criterios de compra.','material.html','MA','equipo cascos cuerdas marcas'],
    ['Alquiler orientativo','Preparación','Qué material podría alquilarse y bajo qué control.','alquiler.html','AL','alquilar material'],
    ['Escuela Nómada','Escuela','Itinerarios formativos y progresión por disciplinas.','escuela.html','ES','cursos formación rutas'],
    ['Formación GMN','Escuela','Aprendizaje, profesorado y evolución académica GMN.','formacion-gmn.html','GM','gmn profesores agradecimientos módulos'],
    ['Seguridad y seguros','Seguridad','Gestión del riesgo, documentación y protocolos.','seguridad.html','SE','riesgo seguro emergencia permisos'],
    ['Certificaciones','Escuela','Credenciales internas y referencias formativas.','certificaciones.html','CE','credenciales insignias'],
    ['Formularios','Documentación','Documentación previa y modelos de información.','formularios.html','FO','documentos salud consentimiento'],
    ['Comunidad','Comunidad','Participación, historias y ecosistema de marca.','comunidad.html','CO','personas historias'],
    ['Logbook','Comunidad','Cuaderno digital de aventuras, progreso e insignias.','logbook.html','LO','registro diario badges'],
    ['Blog y lecturas','Contenido','Artículos técnicos, territorio y cultura outdoor.','blog.html','BL','artículos historias criterio'],
    ['Naturaleza Nómada','Naturaleza','Interpretación y mínimo impacto.','naturaleza.html','NA','medio ambiente educación'],
    ['Sostenibilidad','Naturaleza','Criterios ambientales y relación responsable con el entorno.','sostenibilidad.html','SO','impacto residuos conservación'],
    ['Nómada Naturista','Naturismo','Línea respetuosa basada en privacidad y consentimiento.','naturistas.html','NN','naturismo privacidad kayak yoga'],
    ['Audiovisual','Contenido','Foto, vídeo, POV, 360 y narrativa outdoor.','audiovisual.html','AV','cámara drone fpv reels'],
    ['Quiénes somos','Universo','Identidad, valores y estructura de la marca.','quienes-somos.html','QS','marca identidad'],
    ['Fundador','Universo','Historia y visión de Diego David Extremo.','fundador.html','DD','diego creador'],
    ['Equipo','Universo','Dirección y especialistas por disciplina.','equipo.html','EQ','nuria guías instructores'],
    ['Base y campamento','Universo','Visión conceptual de espacios operativos futuros.','base-campamento.html','BA','hangar instalaciones'],
    ['Horizonte Nómada','Horizonte','Conceptos futuros, tecnología y colaboraciones soñadas.','horizonte-nomada.html','HN','futuro ideas vehículos tecnología'],
    ['Proyecto completo','Proyecto','Arquitectura, servicios y visión integral.','proyecto-completo.html','PR','proyecto total'],
    ['Proyecto intermodular','Proyecto','Defensa académica, objetivos, DAFO y planificación.','proyecto-intermodular.html','PI','intermodular dafo memoria'],
    ['Proyecto académico','Proyecto','Marco no operativo y planteamiento educativo.','proyecto-academico.html','PA','académico conceptual'],
    ['Transparencia y financiación','Proyecto','Escenarios económicos, fases e inversión.','transparencia-financiacion.html','TF','dinero costes inversión'],
    ['Tecnología','Proyecto','Herramientas digitales y arquitectura tecnológica.','tecnologia.html','TE','digital app software'],
    ['Cómo funciona','Proyecto','Recorrido desde la solicitud hasta el cierre.','como-funciona.html','CF','método proceso'],
    ['Preguntas frecuentes','Ayuda','Respuestas sobre actividades y funcionamiento.','faq.html','FAQ','dudas ayuda'],
    ['Contacto','Ayuda','Canales de contacto y solicitud orientativa.','contacto.html','CT','email whatsapp telegram']
  ].map(([title,category,description,href,icon,aliases]) => ({title,category,description,href,icon,aliases}));

  const copy = {
    es:{placeholder:'Buscar actividades, zonas, escuela, seguridad…',quick:'Accesos rápidos',emptyTitle:'No encontramos coincidencias',emptyText:'Prueba con otra actividad, zona o tema.',close:'Cerrar buscador',search:'Buscar en Nómada Extremo',open:'Abrir buscador',keys:'Flechas para navegar · Intro para abrir',escape:'Esc para cerrar',generic:'Abre la página para explorar esta sección.',universe:'Universo'},
    en:{placeholder:'Search activities, areas, school, safety…',quick:'Quick access',emptyTitle:'No matches found',emptyText:'Try another activity, area or topic.',close:'Close search',search:'Search Nómada Extremo',open:'Open search',keys:'Arrows to navigate · Enter to open',escape:'Esc to close',generic:'Open the page to explore this section.',universe:'Universe'},
    fr:{placeholder:'Rechercher activités, zones, école, sécurité…',quick:'Accès rapides',emptyTitle:'Aucun résultat',emptyText:'Essayez une autre activité, zone ou sujet.',close:'Fermer la recherche',search:'Rechercher dans Nómada Extremo',open:'Ouvrir la recherche',keys:'Flèches pour naviguer · Entrée pour ouvrir',escape:'Échap pour fermer',generic:'Ouvrez la page pour explorer cette section.',universe:'Univers'},
    de:{placeholder:'Aktivitäten, Gebiete, Schule, Sicherheit suchen…',quick:'Schnellzugriff',emptyTitle:'Keine Treffer gefunden',emptyText:'Versuche eine andere Aktivität oder Region.',close:'Suche schließen',search:'Nómada Extremo durchsuchen',open:'Suche öffnen',keys:'Pfeiltasten zum Navigieren · Enter zum Öffnen',escape:'Esc zum Schließen',generic:'Öffne die Seite, um diesen Bereich zu erkunden.',universe:'Universum'},
    it:{placeholder:'Cerca attività, zone, scuola, sicurezza…',quick:'Accessi rapidi',emptyTitle:'Nessun risultato',emptyText:'Prova un’altra attività, zona o argomento.',close:'Chiudi ricerca',search:'Cerca in Nómada Extremo',open:'Apri ricerca',keys:'Frecce per navigare · Invio per aprire',escape:'Esc per chiudere',generic:'Apri la pagina per esplorare questa sezione.',universe:'Universo'},
    pt:{placeholder:'Pesquisar atividades, zonas, escola, segurança…',quick:'Acessos rápidos',emptyTitle:'Nenhum resultado',emptyText:'Tente outra atividade, zona ou tema.',close:'Fechar pesquisa',search:'Pesquisar no Nómada Extremo',open:'Abrir pesquisa',keys:'Setas para navegar · Enter para abrir',escape:'Esc para fechar',generic:'Abra a página para explorar esta secção.',universe:'Universo'}
  };
  const navigationCopy = {
    'Descubrir':['Discover','Découvrir','Entdecken','Scoprire','Descobrir'],
    'Combinar':['Combine','Combiner','Kombinieren','Combinare','Combinar'],
    'Preparar':['Prepare','Préparer','Vorbereiten','Preparare','Preparar'],
    'Aprender':['Learn','Apprendre','Lernen','Imparare','Aprender'],
    'Criterio':['Criteria','Critère','Kriterien','Criterio','Critério'],
    'Registrar':['Record','Enregistrer','Dokumentieren','Registrare','Registar'],
    'Cuidar':['Care','Prendre soin','Schützen','Proteggere','Cuidar'],
    'Marca':['Brand','Marque','Marke','Brand','Marca'],
    'Crear':['Create','Créer','Gestalten','Creare','Criar'],
    'Documentar':['Document','Documenter','Dokumentieren','Documentare','Documentar'],
    'Validar':['Validate','Valider','Validieren','Validare','Validar'],
    'Catálogo de actividades':['Activity catalogue','Catalogue des activités','Aktivitätenkatalog','Catalogo delle attività','Catálogo de atividades'],
    'Guía y comparativas':['Guide and comparisons','Guide et comparatifs','Guide und Vergleiche','Guida e confronti','Guia e comparações'],
    'Alquiler orientativo':['Rental guide','Guide de location','Mietübersicht','Guida al noleggio','Guia de aluguer'],
    'Credenciales':['Credentials','Certifications','Nachweise','Credenziali','Credenciais'],
    'Comunidad Nómada':['Nomad Community','Communauté Nomade','Nomaden-Community','Comunità Nomade','Comunidade Nómada']
  };

  const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const norm = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase();
  const lang = () => { const value=(document.documentElement.lang||'es').slice(0,2); return copy[value]?value:'es'; };
  const ui = key => copy[lang()][key] || copy.es[key];
  const tr = value => typeof window.noextTranslate === 'function' ? window.noextTranslate(value) : value;
  const navText = source => {
    if (lang()==='es') return source;
    const index={en:0,fr:1,de:2,it:3,pt:4}[lang()];
    return navigationCopy[source]?.[index] || tr(source);
  };

  function linkMarkup(link) {
    const [title,href] = link;
    return `<a href="${href}"${title==='Horizonte Nómada'?' translate="no"':''}><strong data-nav-source="${title}">${title}</strong></a>`;
  }

  function buildNavigation() {
    const menu = document.querySelector('#nav .nav-menu');
    if (menu) {
      menu.classList.add('nav-menu--architecture');
      menu.innerHTML = `<li><a href="index.html">Inicio</a></li>${navGroups.map(group => `
        <li class="nav-mega-parent">
          <a href="${group.href}" class="has-drop" aria-haspopup="true" aria-expanded="false" data-nav-source="${group.label}"${group.label==='Universo'?' data-nav-group="universe"':''}>${group.label}</a>
          <div class="nav-mega${group.columns.length===2?' nav-mega--compact':''}" aria-label="${group.label}">
            ${group.columns.map((column,index)=>`<section${index===2?' class="nav-mega__featured"':''}><span class="nav-mega__eyebrow" data-nav-source="${column[0]}">${column[0]}</span>${column.slice(1).map(linkMarkup).join('')}</section>`).join('')}
          </div>
        </li>`).join('')}<li><a href="contacto.html">Contacto</a></li>`;
      const trigger = document.createElement('button');
      trigger.className = 'nav-search-trigger';
      trigger.type = 'button';
      trigger.dataset.globalSearchOpen = '';
      trigger.innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"></circle><path d="m16 16 4 4"></path></svg><span class="nav-search-trigger__key">K</span>';
      menu.after(trigger);
    }

    const mobile = document.getElementById('mobileNav');
    const switcher = mobile?.querySelector('.language-switcher');
    if (mobile && switcher) {
      [...mobile.children].forEach(child => {
        if (child !== switcher && !child.classList.contains('nav-mobile-close')) child.remove();
      });
      const search = document.createElement('button');
      search.className = 'nav-mobile-search';
      search.type = 'button';
      search.dataset.globalSearchOpen = '';
      search.innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"></circle><path d="m16 16 4 4"></path></svg><span>Buscar en Nómada Extremo</span><kbd>Ctrl K</kbd>';
      switcher.after(search);
      navGroups.forEach(group => {
        const details = document.createElement('details');
        details.className = 'nav-mobile-group';
        const links = group.columns.flatMap(column => column.slice(1));
        details.innerHTML = `<summary data-nav-source="${group.label}">${group.label}</summary><div>${links.map(link => `<a href="${link[1]}" data-nav-source="${link[0]}"${link[0]==='Horizonte Nómada'?' translate="no"':''}>${link[0]}</a>`).join('')}</div>`;
        mobile.appendChild(details);
      });
      mobile.insertAdjacentHTML('beforeend','<a href="index.html">Inicio</a><a href="contacto.html">Contacto</a>');
    }

    const parents = [...document.querySelectorAll('.nav-mega-parent')];
    const closeMegas = except => parents.forEach(parent => {
      if (parent===except) return;
      parent.classList.remove('is-open');
      parent.querySelector(':scope > a')?.setAttribute('aria-expanded','false');
    });
    parents.forEach(parent => parent.querySelector(':scope > a')?.addEventListener('click', event => {
      if (window.matchMedia('(hover:hover)').matches) return;
      event.preventDefault();
      const open=!parent.classList.contains('is-open');
      closeMegas(parent);
      parent.classList.toggle('is-open',open);
      event.currentTarget.setAttribute('aria-expanded',String(open));
    }));
    document.addEventListener('click', event => { if(!event.target.closest('.nav-mega-parent')) closeMegas(); });
    document.addEventListener('keydown', event => { if(event.key==='Escape') closeMegas(); });
  }

  buildNavigation();

  const overlay=document.createElement('div');
  overlay.className='global-search';
  overlay.setAttribute('aria-hidden','true');
  overlay.dataset.noTranslate='';
  overlay.innerHTML=`<section class="global-search__dialog" role="dialog" aria-modal="true" aria-labelledby="global-search-title">
    <h2 id="global-search-title" class="sr-only">Buscar en Nómada Extremo</h2>
    <div class="global-search__head"><svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"></circle><path d="m16 16 4 4"></path></svg><input class="global-search__input" type="search" autocomplete="off" spellcheck="false" aria-autocomplete="list" aria-controls="global-search-results"><button class="global-search__close" type="button">&times;</button></div>
    <div class="global-search__body"><div class="global-search__section global-search__start"><div class="global-search__label"><span data-search-label="quick"></span></div><div class="global-search__quick"></div></div><div class="global-search__results" id="global-search-results" role="listbox"></div></div>
    <footer class="global-search__foot"><span data-search-label="keys"></span><span><kbd>Esc</kbd> <span data-search-label="escape"></span></span></footer>
  </section>`;
  document.body.appendChild(overlay);

  const dialog=overlay.querySelector('.global-search__dialog');
  const input=overlay.querySelector('.global-search__input');
  const results=overlay.querySelector('.global-search__results');
  const start=overlay.querySelector('.global-search__start');
  const quick=overlay.querySelector('.global-search__quick');
  const closeButton=overlay.querySelector('.global-search__close');
  let activeIndex=-1;
  let current=[];
  let previousFocus=null;

  const updateCopy=()=>{
    input.placeholder=ui('placeholder');
    input.setAttribute('aria-label',ui('search'));
    closeButton.setAttribute('aria-label',ui('close'));
    overlay.querySelector('#global-search-title').textContent=ui('search');
    overlay.querySelectorAll('[data-search-label]').forEach(node=>node.textContent=ui(node.dataset.searchLabel));
    document.querySelectorAll('[data-global-search-open]').forEach(button=>{button.setAttribute('aria-label',ui('open'));button.title=`${ui('open')} (Ctrl + K)`;});
    document.querySelectorAll('[data-nav-source]').forEach(node=>node.textContent=navText(node.dataset.navSource));
  };
  const renderQuick=()=>{
    quick.innerHTML='';
    ['Actividades','Seguridad','Escuela','Material','Logbook','Horizonte Nómada'].forEach(term=>{
      const button=document.createElement('button');
      button.type='button';
      button.textContent=tr(term);
      button.addEventListener('click',()=>{input.value=term;render();input.focus();});
      quick.appendChild(button);
    });
  };
  const setActive=index=>{
    const links=[...results.querySelectorAll('.global-search__result')];
    if(!links.length){activeIndex=-1;return;}
    activeIndex=Math.max(0,Math.min(index,links.length-1));
    links.forEach((link,position)=>{const active=position===activeIndex;link.classList.toggle('is-active',active);link.setAttribute('aria-selected',String(active));});
    links[activeIndex].scrollIntoView({block:'nearest'});
  };
  const render=()=>{
    const term=norm(input.value.trim());
    activeIndex=-1;
    if(!term){start.hidden=false;results.innerHTML='';renderQuick();return;}
    start.hidden=true;
    current=searchItems.filter(item=>norm([item.title,item.category,item.description,item.aliases,tr(item.title),tr(item.description)].join(' ')).includes(term)).slice(0,18);
    if(!current.length){results.innerHTML=`<div class="global-search__empty"><strong>${esc(ui('emptyTitle'))}</strong><span>${esc(ui('emptyText'))}</span></div>`;return;}
    results.innerHTML=current.map((item,index)=>{
      const translatedDescription=tr(item.description);
      const description=lang()!=='es'&&translatedDescription===item.description?ui('generic'):translatedDescription;
      return `<a class="global-search__result" href="${item.href}" role="option" aria-selected="false" data-search-index="${index}"><span class="global-search__icon" aria-hidden="true">${item.icon}</span><span class="global-search__copy"><strong>${esc(tr(item.title))}</strong><small>${esc(description)}</small></span><span class="global-search__category">${esc(tr(item.category))}</span></a>`;
    }).join('');
    setActive(0);
  };
  const open=()=>{
    if(overlay.classList.contains('is-open'))return;
    previousFocus=document.activeElement;updateCopy();renderQuick();overlay.classList.add('is-open');overlay.setAttribute('aria-hidden','false');document.body.classList.add('global-search-open');requestAnimationFrame(()=>input.focus());
  };
  const close=()=>{
    if(!overlay.classList.contains('is-open'))return;
    overlay.classList.remove('is-open');overlay.setAttribute('aria-hidden','true');document.body.classList.remove('global-search-open');input.value='';render();previousFocus?.focus?.({preventScroll:true});
  };

  document.addEventListener('click',event=>{if(event.target.closest('[data-global-search-open]')){event.preventDefault();open();}});
  closeButton.addEventListener('click',close);
  overlay.addEventListener('click',event=>{if(event.target===overlay)close();});
  input.addEventListener('input',render);
  input.addEventListener('keydown',event=>{
    if(event.key==='ArrowDown'){event.preventDefault();setActive(activeIndex+1);}
    if(event.key==='ArrowUp'){event.preventDefault();setActive(activeIndex-1);}
    if(event.key==='Enter'&&activeIndex>=0){event.preventDefault();results.querySelectorAll('.global-search__result')[activeIndex]?.click();}
  });
  document.addEventListener('keydown',event=>{
    if((event.ctrlKey||event.metaKey)&&event.key.toLocaleLowerCase()==='k'){event.preventDefault();overlay.classList.contains('is-open')?close():open();return;}
    if(event.key==='Escape'&&overlay.classList.contains('is-open'))close();
    if(event.key==='Tab'&&overlay.classList.contains('is-open')){
      const focusable=[...dialog.querySelectorAll('button,input,a[href]')].filter(node=>node.offsetParent!==null);
      const first=focusable[0],last=focusable[focusable.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    }
  });
  window.addEventListener('noext:languagechange',()=>{updateCopy();render();});
  new MutationObserver(()=>{updateCopy();render();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  window.setTimeout(()=>{updateCopy();render();},500);
  updateCopy();
  render();
})();
