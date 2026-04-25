/* NÓMADA EXTREMO v2.3 — componentes compartidos */

(function () {
  const PROJECT_NOTICE = 'Nómada Extremo es actualmente un proyecto académico ficticio creado por Diego David Gómez García, alumno de 1.º GMN del IES Europa de Águilas. No realiza reservas, cobros, ventas, sorteos ni actividades reales en este momento.';

  const NAV = `
<div class="project-top-notice" role="note">${PROJECT_NOTICE}</div>
<nav id="nav">
  <a href="index.html" class="nav-logo-wrap" aria-label="Nómada Extremo — Inicio">
    <img src="assets/images/logo-photoroom.png" alt="Logo Nómada Extremo" class="nav-logo-img">
    <div class="nav-logo-text">
      <span class="ln1">NÓMADA EXTREMO</span>
      <span class="ln2">Aventura, técnica y naturaleza</span>
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
        <a href="proyecto-academico.html">Proyecto académico</a>
      </div>
    </li>
    <li>
      <a href="actividades.html" class="has-drop">Actividades</a>
      <div class="nav-drop">
        <a href="actividades.html#montana">Montaña</a>
        <a href="actividades.html#vertical">Vertical</a>
        <a href="actividades.html#mar">Mar y Costa</a>
        <a href="actividades.html#buceo">Buceo y Subacuático</a>
        <a href="actividades.html#aire">Aire</a>
        <a href="actividades.html#barrancos">Barrancos, Río y Agua Interior</a>
        <a href="actividades.html#btt">BTT y Cicloturismo</a>
        <a href="actividades.html#foil">Foil y Waterman</a>
        <a href="actividades.html#multiaventura">Multiaventura y Packs</a>
        <a href="naturistas.html">Nómada Naturista</a>
      </div>
    </li>
    <li><a href="escuela.html">Escuela</a></li>
    <li>
      <a href="packs.html" class="has-drop">Packs</a>
      <div class="nav-drop">
        <a href="packs.html">Packs especiales</a>
        <a href="audiovisual.html">Audiovisual</a>
        <a href="reservas.html#bonos">Bonos regalo</a>
      </div>
    </li>
    <li>
      <a href="blog.html" class="has-drop">Más</a>
      <div class="nav-drop">
        <a href="naturistas.html">Naturismo</a>
        <a href="blog.html">Blog</a>
        <a href="faq.html">FAQ</a>
        <a href="alquiler.html">Alquiler material</a>
        <a href="seguridad.html">Seguridad</a>
        <a href="comunidad.html">Logbook, Comunidad y App</a>
        <a href="formularios.html">Formularios</a>
      </div>
    </li>
    <li><a href="contacto.html">Contacto</a></li>
    <li><a href="login.html">Mi cuenta</a></li>
    <li><a href="reservas.html" class="nav-cta btn">Demo reserva</a></li>
  </ul>
  <div class="nav-hamburger" id="navHamb" aria-label="Abrir menú" role="button" tabindex="0"><span></span><span></span><span></span></div>
</nav>
<div class="nav-mobile-menu" id="mobileNav">
  <button class="nav-mobile-close" id="mobileClose" aria-label="Cerrar menú">×</button>
  <a href="index.html">Inicio</a>
  <a href="quienes-somos.html">Empresa</a>
  <a href="actividades.html">Actividades</a>
  <a href="escuela.html">Escuela Nómada</a>
  <a href="packs.html">Packs</a>
  <a href="audiovisual.html">Audiovisual</a>
  <a href="naturistas.html">Naturismo</a>
  <a href="reservas.html">Reserva demo</a>
  <a href="formularios.html">Formularios</a>
  <a href="comunidad.html">Logbook, Comunidad y App</a>
  <a href="blog.html">Blog</a>
  <a href="faq.html">FAQ</a>
  <a href="contacto.html">Contacto</a>
  <a href="proyecto-academico.html">Proyecto académico</a>
</div>`;

  const FOOTER = `
<footer id="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div style="display:flex;align-items:center;gap:0.8rem;margin-bottom:0.5rem;">
          <img src="assets/images/logo-photoroom.png" alt="Logo Nómada Extremo" style="width:68px;height:68px;border-radius:18px;object-fit:contain;background:rgba(15,26,19,0.65);border:1px solid rgba(196,150,106,0.3);">
          <div>
            <div class="footer-marca-nombre">NÓMADA EXTREMO</div>
            <div class="footer-marca-lema">Proyecto académico premium de aventura</div>
          </div>
        </div>
        <p class="footer-marca-desc">Marca ficticia de deportes de aventura nacida en Águilas, Murcia. Creada por Diego David Gómez García / Diego David Extremo para 1.º GMN del IES Europa, curso 2025-2026.</p>
        <p class="footer-demo-note">${PROJECT_NOTICE}</p>
        <div class="footer-social" style="margin-top:1.5rem;">
          <a href="https://www.youtube.com/@diegodavidextremo" target="_blank" rel="noopener noreferrer" title="YouTube Diego David Extremo" aria-label="YouTube Diego David Extremo">▶</a>
          <a href="https://www.instagram.com/diegodavidextremo/" target="_blank" rel="noopener noreferrer" title="Instagram Diego David Extremo" aria-label="Instagram Diego David Extremo">IG</a>
          <a href="https://www.tiktok.com/@diegodavidextremo" target="_blank" rel="noopener noreferrer" title="TikTok Diego David Extremo" aria-label="TikTok Diego David Extremo">TT</a>
          <a href="https://x.com/dd_gg98" target="_blank" rel="noopener noreferrer" title="X Diego David Extremo" aria-label="X Diego David Extremo">X</a>
        </div>
      </div>
      <div class="footer-col">
        <h5>Actividades</h5>
        <ul>
          <li><a href="actividades.html#montana">Montaña</a></li>
          <li><a href="actividades.html#vertical">Vertical</a></li>
          <li><a href="actividades.html#mar">Mar y Costa</a></li>
          <li><a href="actividades.html#buceo">Buceo y Subacuático</a></li>
          <li><a href="actividades.html#aire">Aire</a></li>
          <li><a href="actividades.html#barrancos">Barrancos, Río y Agua Interior</a></li>
          <li><a href="actividades.html#btt">BTT y Cicloturismo</a></li>
          <li><a href="actividades.html#foil">Foil y Waterman</a></li>
          <li><a href="actividades.html#multiaventura">Multiaventura y Packs</a></li>
          <li><a href="naturistas.html">Nómada Naturista</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Empresa</h5>
        <ul>
          <li><a href="quienes-somos.html">Quiénes somos</a></li>
          <li><a href="fundador.html">El fundador</a></li>
          <li><a href="equipo.html">Equipo</a></li>
          <li><a href="escuela.html">Escuela Nómada</a></li>
          <li><a href="audiovisual.html">Audiovisual</a></li>
          <li><a href="seguridad.html">Seguridad</a></li>
          <li><a href="blog.html">Blog</a></li>
          <li><a href="proyecto-academico.html">Proyecto académico</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Gestión</h5>
        <ul>
          <li><a href="reservas.html">Reserva demo</a></li>
          <li><a href="formularios.html">Formularios y check-in</a></li>
          <li><a href="contacto.html">Contacto</a></li>
          <li><a href="condiciones.html">Condiciones</a></li>
          <li><a href="politica-privacidad.html">Privacidad</a></li>
          <li><a href="politica-cookies.html">Cookies</a></li>
          <li><a href="aviso-legal.html">Aviso legal</a></li>
          <li><a href="login.html">Mi cuenta demo</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div>
        <p class="footer-copy">© 2026 Nómada Extremo · Águilas, Murcia, España · No se realizan reservas, cobros, ventas ni sorteos reales.</p>
        <p class="footer-copy" style="margin-top:0.2rem;opacity:0.7;">Diego David Gómez García · 1.º GMN · IES Europa de Águilas · Curso 2025-2026.</p>
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

<a href="https://wa.me/34600000000?text=Hola%2C%20quiero%20informacion%20sobre%20la%20demo%20de%20Nomada%20Extremo"
   id="waFloat" target="_blank" rel="noopener" title="WhatsApp demo Nómada Extremo" aria-label="WhatsApp demo Nómada Extremo">💬</a>`;

  const np = document.getElementById('nav-placeholder');
  if (np) np.outerHTML = NAV;
  const fp = document.getElementById('footer-placeholder');
  if (fp) fp.outerHTML = FOOTER;

  setTimeout(() => {
    const nav = document.getElementById('nav');
    const hamb = document.getElementById('navHamb');
    const mobile = document.getElementById('mobileNav');
    const mClose = document.getElementById('mobileClose');
    const wa = document.getElementById('waFloat');

    if (nav) {
      const check = () => nav.classList.toggle('scrolled', window.scrollY > 70);
      window.addEventListener('scroll', check);
      check();
    }

    if (hamb && mobile) {
      const toggle = () => {
        hamb.classList.toggle('open');
        mobile.classList.toggle('open');
        document.body.style.overflow = mobile.classList.contains('open') ? 'hidden' : '';
      };
      hamb.addEventListener('click', toggle);
      hamb.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') toggle(); });
      if (mClose) mClose.addEventListener('click', toggle);
      mobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        hamb.classList.remove('open');
        mobile.classList.remove('open');
        document.body.style.overflow = '';
      }));
    }

    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#nav a, #mobileNav a').forEach(a => {
      const h = a.getAttribute('href');
      if (h && (h === page || (page === '' && h === 'index.html'))) a.classList.add('activo');
    });

    if (wa) window.addEventListener('scroll', () => {
      wa.style.opacity = window.scrollY > 300 ? '1' : '0';
    });
  }, 0);
})();
