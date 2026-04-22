/* ═══════════════════════════════════════
   NÓMADA EXTREMO v2 — JAVASCRIPT GLOBAL
   ═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── REVEAL ON SCROLL ─── */
  const revObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 70);
        revObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.07 });
  document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

  /* ─── AUTO REVEAL PARA CARDS ─── */
  const cardSel = '.card,.ficha,.equipo-card,.testi-card,.blog-card,.pack-card,.bono-card,.curso-card,.seg-item,.alquiler-cat,.act-card,.sello,.pilar,.nat-valor,.multi-card';
  const cardObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
        }, i * 55);
        cardObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.05 });
  document.querySelectorAll(cardSel).forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease ${i * 40}ms, transform 0.6s ease ${i * 40}ms`;
    cardObs.observe(el);
  });

  /* ─── CONTADOR ANIMADO ─── */
  const cntObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const dur = 1800;
        const step = target / (dur / 16);
        let cur = 0;
        const t = setInterval(() => {
          cur += step;
          if (cur >= target) { cur = target; clearInterval(t); }
          el.textContent = Math.floor(cur) + suffix;
        }, 16);
        cntObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => cntObs.observe(el));

  /* ─── FAQ ACORDEÓN ─── */
  document.querySelectorAll('.faq-pregunta').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });

  /* ─── FORMULARIO CONTACTO ─── */
  const fContact = document.getElementById('formContacto');
  if (fContact) fContact.addEventListener('submit', e => {
    e.preventDefault();
    const btn = fContact.querySelector('[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Enviando...'; btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '✓ Enviado';
      btn.style.background = 'var(--bosque)';
      setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.disabled = false; fContact.reset(); }, 4000);
    }, 1100);
  });

  /* ─── FORMULARIO RESERVA ─── */
  const fReserva = document.getElementById('formReserva');
  if (fReserva) fReserva.addEventListener('submit', e => {
    e.preventDefault();
    const msg = document.getElementById('reservaMsg');
    if (msg) { msg.style.display = 'block'; setTimeout(() => { msg.style.display = 'none'; fReserva.reset(); }, 5000); }
  });

  /* ─── SMOOTH SCROLL ─── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior:'smooth', block:'start' }); }
    });
  });

  /* ─── LAZY BG ─── */
  const bgObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { const s = e.target.dataset.bg; if (s) e.target.style.backgroundImage = `url('${s}')`; bgObs.unobserve(e.target); }
    });
  }, { rootMargin: '200px' });
  document.querySelectorAll('[data-bg]').forEach(el => bgObs.observe(el));

  /* ─── VIDEO HERO FALLBACK ─── */
  document.querySelectorAll('.hero-video').forEach(v => {
    v.addEventListener('error', () => {
      const poster = v.getAttribute('poster');
      if (poster && v.parentElement) v.parentElement.style.backgroundImage = `url('${poster}')`;
      v.style.display = 'none';
    });
  });

});
