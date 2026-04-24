/* ═══════════════════════════════════════════════════
   NÓMADA EXTREMO v2.2 — COMPONENTES COMPARTIDOS
   Logo real · Nav · Footer · WhatsApp flotante
   ═══════════════════════════════════════════════════ */

(function () {

  const NAV = `
<nav id="nav">
  <a href="index.html" class="nav-logo-wrap" aria-label="Nómada Extremo — Inicio">
    <img src="assets/images/logo-oficial.png" alt="Logo Nómada Extremo" class="nav-logo-img">
    <div class="nav-logo-text">
      <span class="ln1">NÓMADA EXTREMO</span>
      <span class="ln2">Fusionando Aventura y Tecnología</span>
    </div>
  </a>
  <ul class="nav-menu">
    <li><a href="index.html">Inicio</a></li>
    <li>
      <a href="quienes-somos.html" class="has-drop">Empresa</a>
      <div class="nav-drop">
        <a href="quienes-somos.html">Quiénes somos</a>
        <a href="fundador.html">El fundador</a>
        <a href="equipo.html">Equipo profesional</a>
        <a href="certificaciones.html">Certificaciones</a>
        <a href="tecnologia.html">Tecnología Nómada</a>
      </div>
    </li>
    <li>
      <a href="actividades.html" class="has-drop">Actividades</a>
      <div class="nav-drop">
        <a href="actividades.html#montana">⛰️ Montaña</a>
        <a href="actividades.html#vertical">🧗 Vertical y roca</a>
        <a href="actividades.html#mar">🌊 Mar y costa</a>
        <a href="actividades.html#buceo">🤿 Buceo</a>
        <a href="actividades.html#aire">🪂 Aire</a>
        <a href="actividades.html#barrancos">💧 Barrancos</a>
        <a href="actividades.html#btt">🚵 BTT</a>
        <a href="actividades.html#multiaventura">⚡ Multiaventura</a>
      </div>
    </li>
    <li><a href="escuela.html">Escuela</a></li>
    <li>
      <a href="packs.html" class="has-drop">Packs</a>
      <div class="nav-drop">
        <a href="packs.html">Packs especiales</a>
        <a href="audiovisual.html">📹 Audiovisual</a>
        <a href="reservas.html#bonos">🎁 Bonos regalo</a>
      </div>
    </li>
    <li>
      <a href="blog.html" class="has-drop">Más</a>
      <div class="nav-drop">
        <a href="naturistas.html">🌿 Naturismo</a>
        <a href="blog.html">Blog</a>
        <a href="faq.html">FAQ</a>
        <a href="alquiler.html">Alquiler material</a>
        <a href="seguridad.html">Seguridad</a>
        <a href="comunidad.html">Comunidad y App</a>
        <a href="formularios.html">📋 Formularios</a>
      </div>
    </li>
    <li><a href="contacto.html">Contacto</a>
  <a href="login.html" style="color:var(--arena-claro);border-top:1px solid rgba(200,189,181,0.2);margin-top:0.5rem;padding-top:0.5rem;">🔐 Mi cuenta</a></li>
    <li><a href="reservas.html" class="nav-cta btn">Reservar</a></li>
  </ul>
  <div class="nav-hamburger" id="navHamb"><span></span><span></span><span></span></div>
</nav>
<div class="nav-mobile-menu" id="mobileNav">
  <button class="nav-mobile-close" id="mobileClose">✕</button>
  <a href="index.html">Inicio</a>
  <a href="quienes-somos.html">Empresa</a>
  <a href="actividades.html">Actividades</a>
  <a href="escuela.html">Escuela Nómada</a>
  <a href="packs.html">Packs Especiales</a>
  <a href="audiovisual.html">📹 Audiovisual</a>
  <a href="naturistas.html">🌿 Naturismo</a>
  <a href="reservas.html">Reservar</a>
  <a href="formularios.html">📋 Formularios</a>
  <a href="blog.html">Blog</a>
  <a href="faq.html">FAQ</a>
  <a href="contacto.html">Contacto</a>
  <a href="login.html" style="color:var(--arena-claro);border-top:1px solid rgba(200,189,181,0.2);margin-top:0.5rem;padding-top:0.5rem;">🔐 Mi cuenta</a>
</div>`;

  const FOOTER = `
<footer id="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div style="display:flex;align-items:center;gap:0.8rem;margin-bottom:0.5rem;">
          <img src="assets/images/logo-oficial.png" alt="Logo Nómada Extremo" style="width:50px;height:50px;border-radius:50%;object-fit:cover;border:1px solid rgba(196,150,106,0.3);">
          <div>
            <div class="footer-marca-nombre">NÓMADA EXTREMO</div>
            <div class="footer-marca-lema">Fusionando Aventura y Tecnología</div>
          </div>
        </div>
        <p class="footer-marca-desc">Empresa de aventura con identidad propia nacida en Águilas, Murcia. Tierra, mar, aire y vertical para gente que quiere aventura de verdad. Fundada por Diego David Extremo.</p>
        <div class="footer-social" style="margin-top:1.5rem;">
          <a href="https://www.youtube.com/@diegodavidextremo" target="_blank" rel="noopener" title="YouTube">▶️</a>
          <a href="#" title="Instagram">📷</a>
          <a href="#" title="TikTok">🎵</a>
          <a href="#" title="Facebook">👥</a>
          <a href="login.html" title="Mi cuenta" style="font-size:0.8rem;">🔐</a>
        </div>
      </div>
      <div class="footer-col">
        <h5>Actividades</h5>
        <ul>
          <li><a href="actividades.html#montana">Montaña a pie</a></li>
          <li><a href="actividades.html#vertical">Vertical y roca</a></li>
          <li><a href="actividades.html#mar">Mar y costa</a></li>
          <li><a href="actividades.html#buceo">Buceo</a></li>
          <li><a href="actividades.html#aire">Aire</a></li>
          <li><a href="actividades.html#barrancos">Barrancos</a></li>
          <li><a href="actividades.html#btt">BTT</a></li>
          <li><a href="actividades.html#multiaventura">Multiaventura</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Empresa</h5>
        <ul>
          <li><a href="quienes-somos.html">Quiénes somos</a></li>
          <li><a href="fundador.html">El fundador</a></li>
          <li><a href="equipo.html">Equipo</a></li>
          <li><a href="escuela.html">Escuela Nómada</a></li>
          <li><a href="packs.html">Packs especiales</a></li>
          <li><a href="audiovisual.html">Audiovisual</a></li>
          <li><a href="naturistas.html">Naturismo</a></li>
          <li><a href="tecnologia.html">Tecnología</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Reservas y gestión</h5>
        <ul>
          <li><a href="reservas.html">Reservar online</a></li>
          <li><a href="reservas.html#bonos">Bonos regalo</a></li>
          <li><a href="formularios.html">📋 Formularios y check-in</a></li>
          <li><a href="alquiler.html">Alquiler material</a></li>
          <li><a href="seguridad.html">Seguridad</a></li>
          <li><a href="comunidad.html">Comunidad y App</a></li>
          <li><a href="blog.html">Blog</a></li>
          <li><a href="faq.html">FAQ</a></li>
          <li><a href="contacto.html">Contacto</a>
  <a href="login.html" style="color:var(--arena-claro);border-top:1px solid rgba(200,189,181,0.2);margin-top:0.5rem;padding-top:0.5rem;">🔐 Mi cuenta</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div>
        <p class="footer-copy">© 2026 Nómada Extremo · Águilas, Murcia, España · Todos los derechos reservados</p>
        <p class="footer-copy" style="margin-top:0.2rem;opacity:0.6;">Proyecto ficticio — Diego David Gómez García · 1.º GMN · IES Europa de Águilas</p>
      </div>
      <div class="footer-legal">
        <a href="aviso-legal.html">Aviso legal</a>
        <a href="politica-privacidad.html">Privacidad</a>
        <a href="politica-cookies.html">Cookies</a>
        <a href="condiciones.html">Condiciones</a>
      </div>
    </div>
  </div>
</footer>

<a href="https://wa.me/34600000000?text=Hola%2C%20me%20interesa%20una%20experiencia%20en%20N%C3%B3mada%20Extremo"
   id="waFloat" target="_blank" rel="noopener" title="WhatsApp Nómada Extremo">💬</a>`;

  /* INJECT */
  const np = document.getElementById('nav-placeholder');
  if (np) np.outerHTML = NAV;
  const fp = document.getElementById('footer-placeholder');
  if (fp) fp.outerHTML = FOOTER;

  /* BIND events */
  setTimeout(() => {
    const nav    = document.getElementById('nav');
    const hamb   = document.getElementById('navHamb');
    const mobile = document.getElementById('mobileNav');
    const mClose = document.getElementById('mobileClose');
    const wa     = document.getElementById('waFloat');

    /* Sticky nav */
    if (nav) {
      const check = () => nav.classList.toggle('scrolled', window.scrollY > 70);
      window.addEventListener('scroll', check);
      check();
    }

    /* Hamburger */
    if (hamb && mobile) {
      const toggle = () => {
        hamb.classList.toggle('open');
        mobile.classList.toggle('open');
        document.body.style.overflow = mobile.classList.contains('open') ? 'hidden' : '';
      };
      hamb.addEventListener('click', toggle);
      if (mClose) mClose.addEventListener('click', toggle);
      mobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        hamb.classList.remove('open');
        mobile.classList.remove('open');
        document.body.style.overflow = '';
      }));
    }

    /* Active link */
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#nav a, #mobileNav a').forEach(a => {
      const h = a.getAttribute('href');
      if (h && (h === page || (page === '' && h === 'index.html'))) a.classList.add('activo');
    });

    /* WhatsApp visibility */
    if (wa) window.addEventListener('scroll', () => {
      wa.style.opacity = window.scrollY > 300 ? '1' : '0';
    });
  }, 0);

})();
