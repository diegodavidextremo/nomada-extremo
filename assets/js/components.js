/* NÓMADA EXTREMO v2.6 — componentes compartidos accesibles */

(function () {
  const TELEGRAM_URL = 'https://t.me/DiegoDavidExtremo';
  const WHATSAPP_URL = 'https://wa.me/34623179618';
  const PROJECT_NOTICE = "Nómada Extremo es un proyecto académico no operativo creado por Diego David Gómez García / Diego David Extremo. Nació durante 1.º GMN, curso 2025-2026, y continúa en 2.º GMN, curso 2026-2027, en el IES Europa de Águilas (Murcia), con especial integración en el Proyecto Intermodular. No se realizan reservas, cobros, ventas ni actividades comerciales reales.";

  const NAV = `
<a class="skip-link" href="#main-content">Saltar al contenido principal</a>
<header class="site-header" id="site-header">
  <div class="project-top-notice" role="note">Proyecto académico no operativo · 2.º GMN 2026-2027 · Sin reservas, cobros ni ventas</div>
  <nav id="nav" aria-label="Navegación principal">
    <a href="index.html" class="nav-logo-wrap" aria-label="Nómada Extremo — Inicio">
      <img src="assets/images/optimized/emblema-web-192.webp" alt="Logo Nómada Extremo" class="nav-logo-img" decoding="async">
      <div class="nav-logo-text" aria-hidden="true" translate="no">
        <span class="ln1"><span class="brand-word brand-word--nomada">NÓMADA</span> <span class="brand-word brand-word--extremo">EXTREMO</span></span>
        <span class="ln2">Aventura, técnica y naturaleza</span>
      </div>
    </a>
    <ul class="nav-menu nav-menu--clean">
      <li><a href="index.html">Inicio</a></li>
      <li>
        <a href="actividades.html" class="has-drop" aria-haspopup="true">Actividades</a>
        <div class="nav-drop" aria-label="Submenú de actividades">
          <a href="actividades.html#top-fichas">Fichas top</a>
          <a href="actividades.html#montana">Montaña</a>
          <a href="actividades.html#vertical">Vertical</a>
          <a href="actividades.html#mar">Mar y Costa</a>
          <a href="actividades.html#buceo">Buceo y Subacuático</a>
          <a href="actividades.html#aire">Aire</a>
          <a href="actividades.html#barrancos">Barrancos, Río y Agua Interior</a>
          <a href="actividades.html#btt">BTT y Cicloturismo</a>
          <a href="actividades.html#foil">Foil y Waterman</a>
          <a href="packs.html">Packs y bonos</a>
        </div>
      </li>
      <li><a href="escuela.html">Escuela</a></li>
      <li><a href="naturistas.html">Naturismo</a></li>
      <li><a href="audiovisual.html">Audiovisual</a></li>
      <li><a href="viajes.html">Viajes</a></li>
      <li>
        <a href="proyecto-completo.html" class="has-drop" aria-haspopup="true">Proyecto</a>
        <div class="nav-drop" aria-label="Submen&uacute; de proyecto">
          <a href="proyecto-completo.html">Proyecto completo</a>
          <a href="como-funciona.html">C&oacute;mo funciona</a>
          <a href="seguridad.html">Seguridad y seguros</a>
          <a href="material.html">Material y marcas</a>
          <a href="escuela.html">Escuela y logbook</a>
          <a href="grupos.html">Grupos y empresas</a>
          <a href="naturaleza.html">Naturaleza N&oacute;mada</a>
          <a href="transparencia-financiacion.html">Transparencia y financiaci&oacute;n</a>
          <a href="base-campamento.html">Base y campamento</a>
          <a href="horizonte-nomada.html" translate="no">Horizonte Nómada</a>
          <a href="viajes.html">Viajes</a>
          <a href="blog.html">Blog y lecturas</a>
          <a href="guia-actividades.html">Gu&iacute;a de actividades</a>
          <a href="formacion-gmn.html">Formación GMN</a>
          <a href="faq.html">FAQ</a>
        </div>
      </li>
      <li><a href="contacto.html">Contacto</a></li>
    </ul>
    <div class="language-switcher language-switcher--desktop" data-language-switcher aria-label="Selector de idioma">
      <button type="button" data-lang="es" aria-label="Español">ES</button>
      <button type="button" data-lang="en" aria-label="English">EN</button>
      <button type="button" data-lang="fr" aria-label="Français">FR</button>
      <button type="button" data-lang="de" aria-label="Deutsch">DE</button>
      <button type="button" data-lang="it" aria-label="Italiano">IT</button>
      <button type="button" data-lang="pt" aria-label="Português">PT</button>
      <button type="button" data-lang="nl" aria-label="Nederlands">NL</button>
    </div>
    <button class="nav-hamburger" id="navHamb" type="button" aria-label="Abrir menú" aria-controls="mobileNav" aria-expanded="false">
      <span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>
    </button>
  </nav>
  <div class="nav-mobile-backdrop" data-mobile-close aria-hidden="true"></div>
  <nav class="nav-mobile-menu" id="mobileNav" aria-label="Menú móvil" aria-hidden="true">
    <button class="nav-mobile-close" id="mobileClose" type="button" aria-label="Cerrar menú">×</button>
    <div class="language-switcher language-switcher--mobile" data-language-switcher aria-label="Selector de idioma">
      <button type="button" data-lang="es" aria-label="Español">ES</button>
      <button type="button" data-lang="en" aria-label="English">EN</button>
      <button type="button" data-lang="fr" aria-label="Français">FR</button>
      <button type="button" data-lang="de" aria-label="Deutsch">DE</button>
      <button type="button" data-lang="it" aria-label="Italiano">IT</button>
      <button type="button" data-lang="pt" aria-label="Português">PT</button>
      <button type="button" data-lang="nl" aria-label="Nederlands">NL</button>
    </div>
    <a href="index.html">Inicio</a>
    <a href="actividades.html">Actividades</a>
    <a href="packs.html">Packs y bonos</a>
    <a href="escuela.html">Escuela N&oacute;mada</a>
    <a href="material.html">Material y marcas</a>
    <a href="seguridad.html">Seguridad y seguros</a>
    <a href="grupos.html">Grupos y empresas</a>
    <a href="naturistas.html">Naturismo</a>
    <a href="audiovisual.html">Audiovisual</a>
    <a href="viajes.html">Viajes</a>
    <a href="proyecto-completo.html">Proyecto completo</a>
    <a href="transparencia-financiacion.html">Transparencia y financiaci&oacute;n</a>
    <a href="base-campamento.html">Base y campamento</a>
    <a href="horizonte-nomada.html" translate="no">Horizonte Nómada</a>
    <a href="blog.html">Blog y lecturas</a>
    <a href="guia-actividades.html">Gu&iacute;a de actividades</a>
    <a href="formacion-gmn.html">Formación GMN</a>
    <a href="faq.html">FAQ</a>
    <a href="contacto.html">Contacto</a>
  </nav>
</header>`;

  const FOOTER = `
<footer id="footer" class="footer-compact">
  <div class="container">
    <div class="footer-topline">
      <a class="footer-brand-head" href="index.html"><img src="assets/images/optimized/emblema-web-192.webp" alt="" width="52" height="52" loading="lazy"><span class="footer-marca-nombre"><span translate="no">NÓMADA EXTREMO</span><small>Águilas · Aventura, técnica y naturaleza</small></span></a>
      <nav class="footer-primary" aria-label="Enlaces principales del pie"><a href="actividades.html">Actividades</a><a href="proyecto-intermodular.html">Proyecto intermodular</a><a href="fundador.html">Fundador</a><a href="equipo.html">Equipo</a><a href="contacto.html">Contacto</a></nav>
    </div>
    <p class="footer-purpose">Proyecto académico no operativo · 2.º GMN · 2026–2027. Sin reservas, cobros ni ventas reales.</p>
    <details class="footer-directory"><summary>Todas las secciones</summary><div class="footer-directory-grid"><div class="footer-col"><h2>Experiencias</h2><ul><li><a href="actividades.html">Actividades</a></li><li><a href="viajes.html">Viajes</a></li><li><a href="packs.html">Packs</a></li><li><a href="packs.html#bonos">Bonos regalo</a></li><li><a href="grupos.html">Grupos, centros y empresas</a></li><li><a href="zonas.html">Zonas de aventura</a></li><li><a href="naturistas.html">Nómada Naturista</a></li></ul></div><div class="footer-col"><h2>Sistema Nómada</h2><ul><li><a href="como-funciona.html">Cómo funciona</a></li><li><a href="index.html#metodo-nomada">Método Nómada</a></li><li><a href="seguridad.html">Seguridad</a></li><li><a href="seguridad.html#seguros-documentacion">Seguros y documentación</a></li><li><a href="material.html">Material y marcas</a></li><li><a href="alquiler.html">Alquiler orientativo</a></li><li><a href="logbook.html">Logbook y app</a></li><li><a href="certificaciones.html">Credenciales digitales</a></li><li><a href="formularios.html">Formularios</a></li><li><a href="escuela.html">Escuela Nómada</a></li><li><a href="audiovisual.html">Audiovisual</a></li></ul></div><div class="footer-col"><h2>Marca</h2><ul><li><a href="quienes-somos.html">Quiénes somos</a></li><li><a href="fundador.html">Fundador</a></li><li><a href="equipo.html">Equipo</a></li><li><a href="equipo.html#direccion-principal">Nuria P. F.</a></li><li><a href="sostenibilidad.html">Sostenibilidad</a></li><li><a href="naturaleza.html">Naturaleza Nómada</a></li><li><a href="horizonte-nomada.html" translate="no">Horizonte Nómada</a></li><li><a href="blog.html">Blog</a></li><li><a href="contacto.html">Contacto</a></li><li><span>Origen del proyecto: Águilas, Murcia</span></li></ul></div><div class="footer-col"><h2>Proyecto académico</h2><ul><li><a href="proyecto-completo.html">Proyecto completo</a></li><li><a href="proyecto-academico.html">Marco académico</a></li><li><a href="proyecto-intermodular.html">Proyecto Intermodular 2026-2027</a></li><li><a href="segundo-gmn.html">2.º GMN · curso activo</a></li><li><a href="formacion-gmn.html">Formación GMN</a></li><li><a href="base-campamento.html">Base y campamento</a></li><li><a href="viajes.html">Viajes</a></li><li><a href="blog.html#articulos-destacados">Art&iacute;culos destacados</a></li><li><a href="guia-actividades.html">Guía de actividades</a></li><li><a href="transparencia-financiacion.html">Transparencia y financiación</a></li><li><a href="faq.html">FAQ</a></li></ul></div><div class="footer-col"><h2>Legal</h2><ul><li><a href="aviso-legal.html">Aviso legal</a></li><li><a href="aviso-legal.html#condiciones-generales">Condiciones</a></li><li><a href="aviso-legal.html#devoluciones">Política de devoluciones</a></li><li><a href="aviso-legal.html#privacidad">Privacidad</a></li><li><a href="aviso-legal.html#cookies">Cookies</a></li></ul></div></div></details>
    <div class="footer-bottom"><p class="footer-copy">© 2026 Nómada Extremo · Diego David Gómez García</p><nav class="footer-legal" aria-label="Información legal"><a href="aviso-legal.html">Aviso legal</a><a href="aviso-legal.html#privacidad">Privacidad</a><a href="aviso-legal.html#cookies">Cookies</a></nav><div class="footer-social"><a href="contacto.html#canales">Contacto y redes</a></div></div>
  </div>
</footer>
<nav id="contactDock" aria-label="Ayuda y navegación rápida"><a href="#main-content" id="backToTop" aria-label="Volver arriba" title="Volver arriba">↑</a></nav>`;

  const improvements = document.createElement('script');
  improvements.src = 'assets/js/site-improvements.js?v=20261025-3';
  improvements.defer = true;
  document.body.appendChild(improvements);

  const np = document.getElementById('nav-placeholder');
  if (np) np.outerHTML = NAV;
  const fp = document.getElementById('footer-placeholder');
  if (fp) fp.outerHTML = FOOTER;



  if (!document.querySelector('script[data-noext-i18n]')) {
    const languageScript = document.createElement('script');
    languageScript.src = 'assets/js/i18n.js?v=20261112';
    languageScript.dataset.noextI18n = 'runtime';
    document.head.appendChild(languageScript);
  }

  if (!document.querySelector('script[data-noext-language-regions]')) {
    const script = document.createElement('script');
    script.src = 'assets/js/language-regions.js?v=20261013-1';
    script.dataset.noextLanguageRegions = '';
    script.defer = true;
    document.body.appendChild(script);
  }



  if (!document.querySelector('script[data-noext-global-search]')) {
    const searchScript = document.createElement('script');
    searchScript.src = 'assets/js/global-search.js?v=20261013-1';
    searchScript.defer = true;
    searchScript.dataset.noextGlobalSearch = 'runtime';
    document.body.appendChild(searchScript);
  }



  if (!document.querySelector('script[data-noext-ecosystem-pathways]')) {
    const pathwayScript = document.createElement('script');
    pathwayScript.src = 'assets/js/ecosystem-pathways.js?v=20261013-1';
    pathwayScript.defer = true;
    pathwayScript.dataset.noextEcosystemPathways = 'runtime';
    document.body.appendChild(pathwayScript);
  }


  const updateHeaderOffset = () => {
    const notice=document.querySelector('.project-top-notice');
    const nav=document.getElementById('nav');
    const noticeHeight=notice?.getBoundingClientRect().height || 0;
    const navHeight=nav?.getBoundingClientRect().height || 68;
    document.documentElement.style.setProperty('--n3-notice-height', `${noticeHeight}px`);
    document.documentElement.style.setProperty('--header-offset', `${noticeHeight+navHeight+8}px`);
  };
  if ('ResizeObserver' in window) {
    const headerObserver=new ResizeObserver(updateHeaderOffset);
    ['.project-top-notice','#nav'].forEach(selector=>{const el=document.querySelector(selector);if(el)headerObserver.observe(el);});
  }
  window.addEventListener('resize',updateHeaderOffset,{passive:true});
  updateHeaderOffset();

  const ensureMainLandmark = () => {
    const existingMain = document.querySelector('main');
    if (existingMain) {
      if (!existingMain.id) existingMain.id = 'main-content';
      if (!existingMain.hasAttribute('tabindex')) existingMain.setAttribute('tabindex', '-1');
      return;
    }
    const header = document.getElementById('site-header');
    const footer = document.getElementById('footer');
    if (!header || !footer || !footer.parentNode) return;
    const main = document.createElement('main');
    main.id = 'main-content';
    main.className = 'site-main';
    main.tabIndex = -1;
    let node = header.nextSibling;
    while (node && node !== footer) {
      const next = node.nextSibling;
      main.appendChild(node);
      node = next;
    }
    footer.parentNode.insertBefore(main, footer);
  };

  const enhanceMedia = () => {
    document.querySelectorAll('img').forEach((img, index) => {
      if (!img.hasAttribute('alt')) img.setAttribute('alt', '');
      if (index > 1 && !img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
      if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
    });
    document.querySelectorAll('video, iframe').forEach(el => {
      if (!el.hasAttribute('loading') && el.tagName === 'IFRAME') el.setAttribute('loading', 'lazy');
      el.setAttribute('playsinline', '');
    });
  };

  const enhanceForms = () => {
    document.querySelectorAll('input, select, textarea').forEach((field, index) => {
      if (!field.id) field.id = `noext-field-${index + 1}`;
      const type = (field.getAttribute('type') || '').toLowerCase();
      const name = `${field.getAttribute('name') || ''} ${field.id}`.toLowerCase();
      if (!field.getAttribute('autocomplete')) {
        if (type === 'email' || name.includes('email') || name.includes('correo')) field.setAttribute('autocomplete', 'email');
        else if (type === 'tel' || name.includes('telefono') || name.includes('teléfono') || name.includes('phone')) field.setAttribute('autocomplete', 'tel');
        else if (name.includes('nombre')) field.setAttribute('autocomplete', 'name');
      }
      if ((type === 'tel' || name.includes('telefono') || name.includes('teléfono')) && !field.getAttribute('inputmode')) field.setAttribute('inputmode', 'tel');
      if ((type === 'email' || name.includes('email') || name.includes('correo')) && !field.getAttribute('inputmode')) field.setAttribute('inputmode', 'email');
    });
  };

  ensureMainLandmark();
  enhanceMedia();
  enhanceForms();

  setTimeout(() => {
    const nav = document.getElementById('nav');
    const hamb = document.getElementById('navHamb');
    const mobile = document.getElementById('mobileNav');
    const mClose = document.getElementById('mobileClose');
    const backdrop = document.querySelector('[data-mobile-close]');
    const wa = document.getElementById('waFloat');
    const backToTop = document.getElementById('backToTop');
    let lastFocus = null;
    let lastScrollY = 0;

    if (nav) {
      const check = () => nav.classList.toggle('scrolled', window.scrollY > 80);
      window.addEventListener('scroll', check, { passive: true });
      check();
    }

    const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';
    const trapFocus = (event) => {
      if (!mobile || !mobile.classList.contains('open') || event.key !== 'Tab') return;
      const items = [...mobile.querySelectorAll(focusableSelector)].filter(el => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };

    if (hamb && mobile) {
      const setOpen = (open) => {
        hamb.classList.toggle('open', open);
        mobile.classList.toggle('open', open);
        backdrop?.classList.toggle('open', open);
        hamb.setAttribute('aria-expanded', String(open));
        mobile.setAttribute('aria-hidden', String(!open));
        document.body.classList.toggle('menu-open', open);
        if (open) {
          lastFocus = document.activeElement;
          lastScrollY = window.scrollY;
          document.body.style.top = `-${lastScrollY}px`;
          mClose?.focus({ preventScroll: true });
        } else {
          document.body.style.top = '';
          if (lastScrollY) window.scrollTo(0, lastScrollY);
          if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus({ preventScroll: true });
        }
      };
      const toggle = () => setOpen(!mobile.classList.contains('open'));
      hamb.addEventListener('click', toggle);
      if (mClose) mClose.addEventListener('click', () => setOpen(false));
      if (backdrop) backdrop.addEventListener('click', () => setOpen(false));
      mobile.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false); });
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && mobile.classList.contains('open')) setOpen(false);
        trapFocus(e);
      });
    }

    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#nav a, #mobileNav a').forEach(a => {
      const h = a.getAttribute('href');
      if (h && (h === page || (page === '' && h === 'index.html'))) a.classList.add('activo');
    });

    if (wa) {
      const toggleWa = () => { wa.style.opacity = '1'; };
      window.addEventListener('scroll', toggleWa, { passive: true });
      toggleWa();
    }
    if (backToTop) { const toggleTop = () => backToTop.classList.toggle('visible', window.scrollY > 600); window.addEventListener('scroll', toggleTop, { passive: true }); toggleTop(); }


    const initAdvancedThemeInteractions = () => {
      if (window.__noextAdvancedThemeReady) return;
      window.__noextAdvancedThemeReady = true;
      const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const markActiveSection = () => {
        const links = [...document.querySelectorAll('#nav a[href*="#"]')];
        const sections = links.map(link => {
          const id = (link.getAttribute('href') || '').split('#')[1];
          return id ? [link, document.getElementById(id)] : null;
        }).filter((pair) => pair && pair[1]);
        if (!sections.length || !('IntersectionObserver' in window)) return;
        const sectionObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            links.forEach(link => link.classList.remove('section-active'));
            sections.filter(([, section]) => section === entry.target).forEach(([link]) => link.classList.add('section-active'));
          });
        }, { rootMargin: '-30% 0px -55% 0px', threshold: 0.01 });
        sections.forEach(([, section]) => sectionObserver.observe(section));
      };

      const initSeasonTabs = () => {
        const section = document.getElementById('temporadas-home');
        const grid = section?.querySelector('.grid-4');
        const cards = grid ? [...grid.querySelectorAll('.card')] : [];
        if (!section || !grid || cards.length < 2 || section.querySelector('.season-tab-list')) return;
        const normalizeSeasonKey = value => String(value || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z]/g, '');
      const icons = {
        invierno: '<svg viewBox="0 0 24 24"><path d="M12 2v20M4 6l16 12M20 6L4 18"/></svg>',
        primavera: '<svg viewBox="0 0 24 24"><path d="M12 12c4-7 9-3 5 2-4 5-5 6-5 6s-1-1-5-6c-4-5 1-9 5-2z"/></svg>',
        verano: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 1v4M12 19v4M1 12h4M19 12h4M4 4l3 3M17 17l3 3M20 4l-3 3M7 17l-3 3"/></svg>',
        otono: '<svg viewBox="0 0 24 24"><path d="M20 4C11 4 5 9 5 18c7 0 13-5 15-14z"/><path d="M5 18c4-4 8-7 15-14"/></svg>'
      };
        section.classList.add('season-tabs');
        const tabList = document.createElement('div');
        tabList.className = 'season-tab-list';
        tabList.setAttribute('role', 'tablist');
        cards.forEach((card, index) => {
          const title = card.querySelector('.card-titulo')?.textContent.trim() || 'Temporada ' + (index + 1);
          card.classList.add('season-panel');
          card.id = 'season-panel-' + index;
          card.setAttribute('role', 'tabpanel');
          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'season-tab';
          button.setAttribute('role', 'tab');
          button.setAttribute('aria-controls', card.id);
          const seasonKey = normalizeSeasonKey(title);
          button.innerHTML = '<span class="season-icon" aria-hidden="true">' + (icons[seasonKey] || icons.verano) + '</span><span>' + title + '</span>';
          const setActive = () => {
            cards.forEach(panel => panel.classList.remove('is-active'));
            tabList.querySelectorAll('.season-tab').forEach(tab => tab.setAttribute('aria-selected', 'false'));
            card.classList.add('is-active');
            button.setAttribute('aria-selected', 'true');
            section.dataset.season = seasonKey;
          };
          button.addEventListener('click', setActive);
          tabList.appendChild(button);
          if (index === 0) setTimeout(setActive, 0);
        });
        grid.before(tabList);
      };

      const initIntensityBars = () => {
        document.documentElement.classList.add('intensity-ready');
        const bars = [...document.querySelectorAll('.intensidad-barra')];
        const fill = bar => [...bar.querySelectorAll('span.on')].forEach((span, index) => {
          span.style.transitionDelay = (index * 90) + 'ms';
          span.classList.add('is-filled');
        });
        if (reduceMotion || !('IntersectionObserver' in window)) bars.forEach(fill);
        else {
          const observer = new IntersectionObserver(entries => entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            fill(entry.target);
            observer.unobserve(entry.target);
          }), { threshold: .5 });
          bars.forEach(bar => observer.observe(bar));
        }
      };

      const initBadgePop = () => {
        const badges = [...document.querySelectorAll('.badge-item, .badge-circle, .logbook-badge-wall article')];
        badges.forEach((badge, index) => {
          badge.classList.add('badge-pop-target');
          badge.style.setProperty('--badge-delay', (index * 80) + 'ms');
        });
        if (reduceMotion || !('IntersectionObserver' in window)) badges.forEach(badge => badge.classList.add('badge-pop-in'));
        else {
          const observer = new IntersectionObserver(entries => entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('badge-pop-in');
            observer.unobserve(entry.target);
          }), { threshold: .18 });
          badges.forEach(badge => observer.observe(badge));
        }
      };

      markActiveSection();
      initSeasonTabs();
      initIntensityBars();
      document.body.classList.add('logbook-loaded');
      initBadgePop();
    };

    initAdvancedThemeInteractions();
  }, 0);
})();

// Carga la capa modular de animaciones sin obligar a duplicar imports en cada HTML.
(function loadNoextEnhancementLayer(){
  var version = '20261109';

  ['navbar','ui-extras'].forEach(function(name){
    var src = 'assets/js/' + name + '.js?v=' + version;
    if (document.querySelector('script[src^="assets/js/' + name + '.js"]')) return;
    var script = document.createElement('script');
    script.defer = true;
    script.src = src;
    document.body.appendChild(script);
  });
})();
