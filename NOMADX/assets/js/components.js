/* NOMADX — componentes compartidos */

(function () {
  const PROJECT_NOTICE = 'NOMADX es una plataforma social deportiva independiente en fase beta conceptual. Datos demo, sin actividades organizadas directamente ni reservas reales.';

  const NAV = `
<div class="project-top-notice" role="note">${PROJECT_NOTICE}</div>
<nav id="nav">
  <a href="index.html" class="nav-logo-wrap" aria-label="NOMADX — Inicio">
    <img src="assets/images/logo-photoroom.png" alt="Logo NOMADX" class="nav-logo-img">
    <div class="nav-logo-text">
      <span class="ln1">NOMADX</span>
      <span class="ln2">Social sports network · Beta conceptual 2026</span>
    </div>
  </a>
  <ul class="nav-menu">
    <li><a href="index.html#que-es">Qué es</a></li>
    <li><a href="index.html#como-funciona">Cómo funciona</a></li>
    <li><a href="index.html#adn-deportivo">ADN</a></li>
    <li><a href="index.html#deportes">Deportes</a></li>
    <li><a href="index.html#matching">Matching</a></li>
    <li><a href="index.html#feed-aventuras">Feed</a></li>
    <li><a href="index.html#tribus">Tribus</a></li>
    <li><a href="index.html#mapa-spots">Spots</a></li>
    <li><a href="index.html#logbook-aventuras">Logbook</a></li>
    <li><a href="index.html#safety-radar">Safety</a></li>
    <li><a href="index.html#pro">Pro</a></li>
  </ul>
  <div class="nav-hamburger" id="navHamb" aria-label="Abrir menú" role="button" tabindex="0"><span></span><span></span><span></span></div>
</nav>
<div class="nav-mobile-menu" id="mobileNav">
  <button class="nav-mobile-close" id="mobileClose" aria-label="Cerrar menú">×</button>
  <a href="index.html#que-es">Qué es</a>
  <a href="index.html#como-funciona">Cómo funciona</a>
  <a href="index.html#adn-deportivo">ADN deportivo</a>
  <a href="index.html#deportes">Deportes</a>
  <a href="index.html#matching">Matching</a>
  <a href="index.html#feed-aventuras">Feed</a>
  <a href="index.html#tribus">Tribus</a>
  <a href="index.html#mapa-spots">Mapa de spots</a>
  <a href="index.html#eventos">Planes</a>
  <a href="index.html#logbook-aventuras">Logbook</a>
  <a href="index.html#safety-radar">Safety Radar</a>
  <a href="index.html#insignias">Reputación</a>
  <a href="index.html#pro">NOMADX Pro</a>
  <a href="index.html#precios">Planes</a>
  <a href="index.html#roadmap">Roadmap</a>
  <a href="index.html#faq">FAQ</a>
</div>`;

  const FOOTER = `
<footer id="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div style="display:flex;align-items:center;gap:0.8rem;margin-bottom:0.5rem;">
          <img src="assets/images/logo-photoroom.png" alt="Logo NOMADX" style="width:68px;height:68px;border-radius:18px;object-fit:contain;background:rgba(15,26,19,0.65);border:1px solid rgba(196,150,106,0.3);">
          <div>
            <div class="footer-marca-nombre">NOMADX</div>
            <div class="footer-marca-lema">Plataforma social deportiva independiente</div>
          </div>
        </div>
        <p class="footer-marca-desc">Red social deportiva en fase beta conceptual para conectar personas por ADN deportivo, planes, spots, tribus, logbook, seguridad y reputación.</p>
        <p class="footer-demo-note">${PROJECT_NOTICE}</p>
      </div>
      <div class="footer-col">
        <h5>Producto</h5>
        <ul>
          <li><a href="index.html#que-es">Qué es NOMADX</a></li>
          <li><a href="index.html#como-funciona">Cómo funciona</a></li>
          <li><a href="index.html#adn-deportivo">ADN deportivo</a></li>
          <li><a href="index.html#deportes">Catálogo de deportes</a></li>
          <li><a href="index.html#matching">Matching deportivo</a></li>
          <li><a href="index.html#feed-aventuras">Feed de aventuras</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Comunidad</h5>
        <ul>
          <li><a href="index.html#tribus">Tribus</a></li>
          <li><a href="index.html#mapa-spots">Mapa de spots</a></li>
          <li><a href="index.html#eventos">Planes y eventos</a></li>
          <li><a href="index.html#logbook-aventuras">Logbook</a></li>
          <li><a href="index.html#insignias">Insignias y reputación</a></li>
          <li><a href="index.html#safety-radar">Safety Radar</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Proyecto</h5>
        <ul>
          <li><a href="index.html#pro">NOMADX Pro</a></li>
          <li><a href="index.html#precios">Planes premium</a></li>
          <li><a href="index.html#intelligence">NOMADX Intelligence</a></li>
          <li><a href="index.html#roadmap">Roadmap</a></li>
          <li><a href="index.html#faq">FAQ</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div>
        <p class="footer-copy">© 2026 NOMADX. Plataforma social deportiva independiente en fase beta conceptual. Concepto creado por Diego David Extremo.</p>
        <p class="footer-copy" style="margin-top:0.2rem;opacity:0.7;">NOMADX Labs · Proyecto independiente de red social deportiva.</p>
      </div>
      <div class="footer-legal">
        <a href="index.html#faq">FAQ</a>
        <a href="index.html#roadmap">Roadmap</a>
        <a href="index.html#safety-radar">Safety</a>
      </div>
    </div>
  </div>
</footer>`;

  const np = document.getElementById('nav-placeholder');
  if (np) np.outerHTML = NAV;
  const fp = document.getElementById('footer-placeholder');
  if (fp) fp.outerHTML = FOOTER;

  setTimeout(() => {
    const nav = document.getElementById('nav');
    const hamb = document.getElementById('navHamb');
    const mobile = document.getElementById('mobileNav');
    const mClose = document.getElementById('mobileClose');

    if (nav) {
      const check = () => nav.classList.toggle('scrolled', window.scrollY > 70);
      window.addEventListener('scroll', check);
      check();
    }

    if (hamb && mobile) {
      const close = () => {
        hamb.classList.remove('open');
        mobile.classList.remove('open');
        mobile.style.display = '';
        mobile.style.position = '';
        mobile.style.inset = '';
        mobile.style.zIndex = '';
        mobile.style.background = '';
        mobile.style.opacity = '';
        mobile.style.visibility = '';
        mobile.style.pointerEvents = '';
        document.body.style.overflow = '';
      };
      const open = () => {
        hamb.classList.add('open');
        mobile.classList.add('open');
        mobile.style.display = 'flex';
        mobile.style.position = 'fixed';
        mobile.style.inset = '0';
        mobile.style.zIndex = '2000';
        mobile.style.background = 'rgba(7,17,15,0.98)';
        mobile.style.opacity = '1';
        mobile.style.visibility = 'visible';
        mobile.style.pointerEvents = 'auto';
        mobile.querySelectorAll('a, button').forEach(el => {
          el.style.opacity = '1';
          el.style.visibility = 'visible';
        });
        document.body.style.overflow = 'hidden';
      };
      const toggle = () => mobile.classList.contains('open') ? close() : open();

      hamb.addEventListener('click', toggle);
      hamb.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') toggle(); });
      if (mClose) {
        mClose.addEventListener('pointerdown', e => {
          e.preventDefault();
          e.stopPropagation();
          close();
        });
        mClose.addEventListener('click', e => {
          e.preventDefault();
          e.stopPropagation();
          close();
        });
      }
      mobile.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    }

    const hash = window.location.hash;
    document.querySelectorAll('#nav a, #mobileNav a').forEach(a => {
      const h = a.getAttribute('href') || '';
      if (hash && h.endsWith(hash)) a.classList.add('activo');
    });
  }, 0);
})();
