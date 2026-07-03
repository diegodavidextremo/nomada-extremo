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
    <a href="viajes.html">Viajes</a>
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
      <div class="footer-col"><h5>Experiencias</h5><ul><li><a href="actividades.html">Actividades</a></li><li><a href="viajes.html">Viajes</a></li><li><a href="packs.html">Packs</a></li><li><a href="packs.html#bonos">Bonos regalo</a></li><li><a href="grupos.html">Grupos, centros y empresas</a></li><li><a href="zonas.html">Zonas de aventura</a></li><li><a href="naturistas.html">Nómada Naturista</a></li></ul></div>
      <div class="footer-col"><h5>Sistema Nómada</h5><ul><li><a href="como-funciona.html">Cómo funciona</a></li><li><a href="index.html#metodo-nomada">Método Nómada</a></li><li><a href="seguridad.html">Seguridad</a></li><li><a href="seguridad.html#seguros-documentacion">Seguros y documentación</a></li><li><a href="material.html">Material y marcas</a></li><li><a href="alquiler.html">Alquiler orientativo</a></li><li><a href="logbook.html">Logbook y app</a></li><li><a href="certificaciones.html">Credenciales digitales</a></li><li><a href="formularios.html">Formularios</a></li><li><a href="escuela.html">Escuela Nómada</a></li><li><a href="audiovisual.html">Audiovisual</a></li></ul></div>
      <div class="footer-col"><h5>Marca</h5><ul><li><a href="quienes-somos.html">Quiénes somos</a></li><li><a href="fundador.html">Fundador</a></li><li><a href="equipo.html">Equipo</a></li><li><a href="equipo.html#nucleo-directivo">Nuria Pons</a></li><li><a href="sostenibilidad.html">Sostenibilidad</a></li><li><a href="naturaleza.html">Naturaleza Nómada</a></li><li><a href="blog.html">Blog</a></li><li><a href="contacto.html">Contacto</a></li><li><a href="mailto:nomadaextremoaguilas@gmail.com">Email</a></li><li><a href="https://wa.me/34623179618" target="_blank" rel="noopener noreferrer">WhatsApp: +34 623 17 96 18</a></li><li><span>Horario orientativo: 09:00–20:00</span></li><li><span>Base: Águilas, Murcia</span></li><li><a href="https://t.me/DiegoDavidExtremo" target="_blank" rel="noopener noreferrer">Telegram</a></li></ul></div>
      <div class="footer-col"><h5>Proyecto académico</h5><ul><li><a href="proyecto-completo.html">Proyecto completo</a></li><li><a href="proyecto-academico.html">Marco académico</a></li><li><a href="proyecto-intermodular.html">Intermodular GMN</a></li><li><a href="formacion-gmn.html">Formación GMN</a></li><li><a href="viajes.html">Viajes</a></li><li><a href="blog.html#articulos-destacados">Art&iacute;culos destacados</a></li><li><a href="guia-actividades.html">Guía de actividades</a></li><li><a href="transparencia-financiacion.html">Transparencia y financiación</a></li><li><a href="faq.html">FAQ</a></li></ul></div>
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
      const check = () => nav.classList.toggle('scrolled', window.scrollY > 80);
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


    const initNoextMotion = () => {
      if (window.__noextMotionReady) return;
      window.__noextMotionReady = true;
      const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      document.documentElement.classList.add('motion-ready');

      const targets = [
        '.hero', '.page-hero', '.stats-strip', '.section-block', '.final-section',
        '.card', '.ficha', '.process-card', '.pack-card', '.bono-card', '.blog-card',
        '.equipo-card', '.teacher-card', '.learning-card', '.reading-card', '.final-card',
        '.rental-item', '.finance-grid article', '.brand-grid article', '.tech-water-grid article',
        '.material-prep-card', '.route-card', '.activity-route-card', '.faq-premium-card'
      ].join(',');

      const elements = [...document.querySelectorAll(targets)]
        .filter(el => !el.closest('#site-header, #mobileNav, #footer, .noext-modal, .chat-widget'));

      elements.forEach((el, index) => {
        if (!el.classList.contains('motion-reveal')) el.classList.add('motion-reveal');
        if (!el.dataset.motion) {
          if (el.classList.contains('hero') || el.classList.contains('page-hero')) el.dataset.motion = 'rise';
          else el.dataset.motion = index % 3 === 1 ? 'left' : index % 3 === 2 ? 'right' : 'rise';
        }
        el.style.setProperty('--motion-delay', Math.min((index % 8) * 55, 385) + 'ms');
        if (reduceMotion) el.classList.add('is-inview');
      });

      if (!reduceMotion && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-inview');
            observer.unobserve(entry.target);
          });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
        elements.forEach(el => observer.observe(el));
      } else {
        elements.forEach(el => el.classList.add('is-inview'));
      }

      const counters = [...document.querySelectorAll('.stat-num[data-count], .lb-stat-num[data-count], [data-countup]')];
      if (reduceMotion || !counters.length || !('IntersectionObserver' in window)) return;
      const animateCounter = (el) => {
        const target = Number(el.dataset.count || el.dataset.countup || String(el.textContent).replace(/[^0-9.]/g, ''));
        if (!Number.isFinite(target)) return;
        const suffix = el.dataset.suffix || (el.textContent.includes('+') ? '+' : '');
        const duration = 1500;
        const start = performance.now();
        el.classList.add('is-counting');
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased) + (progress >= 1 ? suffix : '');
          if (progress < 1) requestAnimationFrame(tick);
          else el.classList.remove('is-counting');
        };
        requestAnimationFrame(tick);
      };
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting || entry.target.dataset.counted === 'true') return;
          entry.target.dataset.counted = 'true';
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        });
      }, { threshold: 0.45 });
      counters.forEach(el => counterObserver.observe(el));
    };

    initNoextMotion();


    const initAdvancedThemeInteractions = () => {
      if (window.__noextAdvancedThemeReady) return;
      window.__noextAdvancedThemeReady = true;
      const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const finePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;

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

      const initTiltCards = () => {
        if (reduceMotion || !finePointer) return;
        document.querySelectorAll('.ficha').forEach(card => {
          card.addEventListener('mousemove', event => {
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - .5;
            const y = (event.clientY - rect.top) / rect.height - .5;
            card.classList.add('is-tilting');
            card.style.transform = 'perspective(900px) rotateX(' + (-y * 8).toFixed(2) + 'deg) rotateY(' + (x * 8).toFixed(2) + 'deg) translateY(-4px)';
          });
          card.addEventListener('mouseleave', () => {
            card.classList.remove('is-tilting');
            card.style.transform = '';
          });
        });
      };

      const initCursor = () => {
        if (reduceMotion || !finePointer || document.querySelector('.noext-cursor')) return;
        const cursor = document.createElement('div');
        cursor.className = 'noext-cursor';
        cursor.setAttribute('aria-hidden', 'true');
        cursor.innerHTML = '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="15" fill="rgba(10,24,30,.82)" stroke="#c4966a"/><path d="M20 6l4 14-4 14-4-14z" fill="#f4efe8" stroke="#c4966a"/><circle cx="20" cy="20" r="3" fill="#c4966a"/></svg>';
        document.body.appendChild(cursor);
        document.body.classList.add('has-noext-cursor');
        const placeCursor = event => {
          cursor.style.transform = 'translate3d(' + event.clientX + 'px,' + event.clientY + 'px,0) translate(-50%,-50%)';
          cursor.classList.add('is-visible');
          const target = event.target;
          cursor.classList.toggle('is-cta', !!target.closest('a, button, .btn, .ficha-btn, .nav-menu a, .nav-drop a, .language-switcher button'));
          cursor.classList.toggle('is-nav', !!target.closest('#site-header, #nav, .nav-drop, .language-switcher'));
          cursor.classList.toggle('is-image', !!target.closest('img, .ficha-img, .act-card-bg, .blog-img'));
        };
        document.addEventListener('pointermove', placeCursor, { passive: true, capture: true });
        document.addEventListener('pointerleave', () => cursor.classList.remove('is-visible'));
        window.addEventListener('blur', () => cursor.classList.remove('is-visible'));
      };

      const initTypewriter = () => {
        const quote = document.querySelector('.manifiesto-texto');
        if (!quote || quote.dataset.typewriterReady === 'true') return;
        const fullText = quote.textContent.replace(/\s+/g, ' ').trim();
        quote.dataset.typewriterReady = 'true';
        if (reduceMotion) return;
        quote.textContent = '';
        quote.classList.add('typewriter-ready');
        const start = () => {
          let index = 0;
          const write = () => {
            quote.textContent = fullText.slice(0, index++);
            if (index <= fullText.length) setTimeout(write, 24 + Math.random() * 42);
          };
          write();
        };
        if ('IntersectionObserver' in window) {
          const observer = new IntersectionObserver(entries => {
            if (!entries.some(entry => entry.isIntersecting)) return;
            observer.disconnect();
            start();
          }, { threshold: .45 });
          observer.observe(quote);
        } else start();
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
          button.innerHTML = '<span class="season-icon">' + (icons[title] || icons.Verano) + '</span><span>' + title + '</span>';
          const setActive = () => {
            cards.forEach(panel => panel.classList.remove('is-active'));
            tabList.querySelectorAll('.season-tab').forEach(tab => tab.setAttribute('aria-selected', 'false'));
            card.classList.add('is-active');
            button.setAttribute('aria-selected', 'true');
            section.dataset.season = title;
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

      const initLogbookSkeletons = () => {
        if (!document.body.classList.contains('logbook-page') || reduceMotion) {
          document.body.classList.add('logbook-loaded');
          return;
        }
        const targets = [...document.querySelectorAll('.logbook-command, .logbook-pro-shell, .logbook-kpi-grid, .discipline-progress, .logbook-badge-wall')];
        if (!targets.length) return;
        targets.forEach(target => target.classList.add('logbook-loading-target'));
        const wrap = document.createElement('div');
        wrap.className = 'logbook-skeleton-wrap';
        wrap.setAttribute('aria-hidden', 'true');
        wrap.innerHTML = '<div class="logbook-skeleton-card"></div><div class="logbook-skeleton-card"></div><div class="logbook-skeleton-card"></div>';
        targets[0].before(wrap);
        window.setTimeout(() => {
          wrap.remove();
          document.body.classList.add('logbook-loaded');
        }, 1200);
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
      initTiltCards();
      initCursor();
      initTypewriter();
      initSeasonTabs();
      initIntensityBars();
      initLogbookSkeletons();
      initBadgePop();
    };

    initAdvancedThemeInteractions();
  }, 0);
})();

// Carga la capa modular de animaciones sin obligar a duplicar imports en cada HTML.
(function loadNoextEnhancementLayer(){
  var version = '20260703-1';
  var cssHref = 'assets/css/skeleton.css?v=' + version;
  if (!document.querySelector('link[href^="assets/css/skeleton.css"]')) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssHref;
    document.head.appendChild(link);
  }
  ['navbar','scroll-reveal','counters','typewriter','tilt','ui-extras'].forEach(function(name){
    var src = 'assets/js/' + name + '.js?v=' + version;
    if (document.querySelector('script[src^="assets/js/' + name + '.js"]')) return;
    var script = document.createElement('script');
    script.defer = true;
    script.src = src;
    document.body.appendChild(script);
  });
})();
