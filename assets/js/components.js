/* NÓMADA EXTREMO v2.6 — componentes compartidos accesibles */

(function () {
  const TELEGRAM_URL = 'https://t.me/DiegoDavidExtremo';
  const WHATSAPP_URL = 'https://wa.me/34623179618';
  const PROJECT_NOTICE = 'Nómada Extremo es actualmente un proyecto académico no operativo creado por Diego David Gómez García, alumno de 1.º GMN del IES Europa de Águilas (Murcia). Nació el 8 de abril de 2025 y evoluciona semanalmente con nuevas funciones, mejoras e información. No realiza reservas, cobros, ventas, sorteos ni actividades reales en este momento.';

  const NAV = `
<a class="skip-link" href="#main-content">Saltar al contenido principal</a>
<header class="site-header" id="site-header">
  <div class="project-top-notice" role="note">${PROJECT_NOTICE}</div>
  <nav id="nav" aria-label="Navegación principal">
    <a href="index.html" class="nav-logo-wrap" aria-label="Nómada Extremo — Inicio">
      <img src="assets/images/logo-photoroom.png" alt="Logo Nómada Extremo" class="nav-logo-img" decoding="async">
      <div class="nav-logo-text" aria-hidden="true">
        <span class="ln1">NÓMADA EXTREMO</span>
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
    <a href="proyecto-completo.html">Proyecto completo</a>
    <a href="transparencia-financiacion.html">Transparencia y financiaci&oacute;n</a>
    <a href="blog.html">Blog y lecturas</a>
    <a href="guia-actividades.html">Gu&iacute;a de actividades</a>
    <a href="formacion-gmn.html">Formación GMN</a>
    <a href="faq.html">FAQ</a>
    <a href="contacto.html">Contacto</a>
  </nav>
</header>`;

  const FOOTER = `
<footer id="footer">
  <div class="container">
    <div class="footer-grid footer-grid--expanded">
      <div class="footer-brand-col">
        <div class="footer-brand-head"><img src="assets/images/logo-photoroom.png" alt="Logo Nómada Extremo" width="68" height="68" loading="lazy" decoding="async"><div><div class="footer-marca-nombre">NÓMADA EXTREMO</div><div class="footer-marca-lema">Proyecto académico premium de aventura</div></div></div>
        <p class="footer-marca-desc">Marca conceptual de aventura mediterránea nacida en Águilas, Murcia. Creada por Diego David Gómez García / Diego David Extremo para 1.º GMN del IES Europa, curso 2025-2026.</p><p class="footer-demo-note">${PROJECT_NOTICE}</p>
        <div class="footer-social"><a href="https://www.youtube.com/@diegodavidextremo" target="_blank" rel="noopener noreferrer" aria-label="YouTube Diego David Extremo">YT</a><a href="https://www.instagram.com/nomadaextremoes/" target="_blank" rel="noopener noreferrer" aria-label="Instagram oficial de Nómada Extremo">IG</a><a href="https://www.tiktok.com/@diegodavidextremo" target="_blank" rel="noopener noreferrer" aria-label="TikTok Diego David Extremo">TT</a><a href="https://x.com/nomadaextremoES" target="_blank" rel="noopener noreferrer" aria-label="X oficial de Nómada Extremo">X</a></div>
      </div>
      <div class="footer-col"><h5>Experiencias</h5><ul><li><a href="actividades.html">Actividades</a></li><li><a href="packs.html">Packs</a></li><li><a href="packs.html#bonos">Bonos regalo</a></li><li><a href="grupos.html">Grupos, centros y empresas</a></li><li><a href="zonas.html">Zonas de aventura</a></li><li><a href="naturistas.html">Nómada Naturista</a></li></ul></div>
      <div class="footer-col"><h5>Sistema Nómada</h5><ul><li><a href="como-funciona.html">Cómo funciona</a></li><li><a href="index.html#metodo-nomada">Método Nómada</a></li><li><a href="seguridad.html">Seguridad</a></li><li><a href="seguridad.html#seguros-documentacion">Seguros y documentación</a></li><li><a href="material.html">Material y marcas</a></li><li><a href="alquiler.html">Alquiler orientativo</a></li><li><a href="logbook.html">Logbook y app</a></li><li><a href="certificaciones.html">Credenciales digitales</a></li><li><a href="formularios.html">Formularios</a></li><li><a href="escuela.html">Escuela Nómada</a></li><li><a href="audiovisual.html">Audiovisual</a></li></ul></div>
      <div class="footer-col"><h5>Marca</h5><ul><li><a href="quienes-somos.html">Quiénes somos</a></li><li><a href="fundador.html">Fundador</a></li><li><a href="equipo.html">Equipo</a></li><li><a href="equipo.html#nucleo-directivo">Nuria Pons</a></li><li><a href="sostenibilidad.html">Sostenibilidad</a></li><li><a href="naturaleza.html">Naturaleza Nómada</a></li><li><a href="blog.html">Blog</a></li><li><a href="contacto.html">Contacto</a></li><li><a href="mailto:nomadaextremoaguilas@gmail.com">Email</a></li><li><a href="https://wa.me/34623179618" target="_blank" rel="noopener noreferrer">WhatsApp: +34 623 17 96 18</a></li><li><span>Horario orientativo: 09:00–20:00</span></li><li><span>Base: Águilas, Murcia</span></li><li><a href="https://t.me/DiegoDavidExtremo" target="_blank" rel="noopener noreferrer">Telegram</a></li></ul></div>
      <div class="footer-col"><h5>Proyecto académico</h5><ul><li><a href="proyecto-completo.html">Proyecto completo</a></li><li><a href="proyecto-academico.html">Marco académico</a></li><li><a href="proyecto-intermodular.html">Intermodular GMN</a></li><li><a href="formacion-gmn.html">Formación GMN</a></li><li><a href="blog.html#articulos-destacados">Art&iacute;culos destacados</a></li><li><a href="guia-actividades.html">Guía de actividades</a></li><li><a href="transparencia-financiacion.html">Transparencia y financiación</a></li><li><a href="faq.html">FAQ</a></li></ul></div>
      <div class="footer-col"><h5>Legal</h5><ul><li><a href="aviso-legal.html">Aviso legal</a></li><li><a href="aviso-legal.html#condiciones-generales">Condiciones</a></li><li><a href="aviso-legal.html#devoluciones">Política de devoluciones</a></li><li><a href="aviso-legal.html#privacidad">Privacidad</a></li><li><a href="aviso-legal.html#cookies">Cookies</a></li></ul></div>
    </div>
    <div class="footer-bottom">
      <div>
        <p class="footer-copy">© 2026 Nómada Extremo · Águilas, Murcia, España · No se realizan reservas, cobros, ventas ni actividades reales.</p>
        <p class="footer-copy footer-copy--muted">Diego David Gómez García · 1.º GMN · IES Europa de Águilas · Curso 2025-2026.</p>
      </div>
      <div class="footer-legal">
        <a href="aviso-legal.html">Aviso Legal, Condiciones y Pol&iacute;ticas</a>
        <a href="aviso-legal.html#privacidad">Privacidad</a>
        <a href="aviso-legal.html#cookies">Cookies</a>
        <a href="aviso-legal.html#condiciones-generales">Condiciones</a>
        <a href="aviso-legal.html#devoluciones">Devoluciones y cambios</a>
      </div>
    </div>
  </div>
</footer>

<a href="${WHATSAPP_URL}" id="waFloat" target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp">WA</a><a href="#main-content" id="backToTop" aria-label="Volver arriba" title="Volver arriba">↑</a>`;

  const np = document.getElementById('nav-placeholder');
  if (np) np.outerHTML = NAV;
  const fp = document.getElementById('footer-placeholder');
  if (fp) fp.outerHTML = FOOTER;

  if (!document.querySelector('link[data-noext-i18n]')) {
    const languageStyles = document.createElement('link');
    languageStyles.rel = 'stylesheet';
    languageStyles.href = 'assets/css/i18n.css?v=20260621-6';
    languageStyles.dataset.noextI18n = 'styles';
    document.head.appendChild(languageStyles);
  }

  if (!document.querySelector('script[data-noext-i18n]')) {
    const languageScript = document.createElement('script');
    languageScript.src = 'assets/js/i18n.js?v=20260621-6';
    languageScript.dataset.noextI18n = 'runtime';
    document.head.appendChild(languageScript);
  }

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
      const check = () => nav.classList.toggle('scrolled', window.scrollY > 70);
      window.addEventListener('scroll', check, { passive: true });
      check();
    }

    const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
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
      mobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
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
      const toggleWa = () => { wa.style.opacity = window.scrollY > 300 ? '1' : '0'; };
      window.addEventListener('scroll', toggleWa, { passive: true });
      toggleWa();
    }
    if (backToTop) { const toggleTop = () => backToTop.classList.toggle('visible', window.scrollY > 600); window.addEventListener('scroll', toggleTop, { passive: true }); toggleTop(); }
  }, 0);
})();
