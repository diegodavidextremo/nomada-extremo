(() => {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const easeOutQuad = t => t * (2 - t);

  // Normaliza contadores antiguos data-count a la API data-target.
  function collectCounters() {
    return [...document.querySelectorAll('.counter, [data-target], [data-count]')].map(el => {
      if (!el.classList.contains('counter')) el.classList.add('counter');
      if (!el.dataset.target && el.dataset.count) el.dataset.target = el.dataset.count;
      if (!('suffix' in el.dataset)) {
        const text = el.textContent.trim();
        el.dataset.suffix = text.replace(/[0-9.,s]/g, '');
      }
      return el;
    }).filter(el => Number.isFinite(Number(el.dataset.target)));
  }

  // Anima un contador de 0 al valor objetivo manteniendo su sufijo.
  function animateCounter(el) {
    if (el.dataset.counterDone === 'true') return;
    el.dataset.counterDone = 'true';
    const target = Number(el.dataset.target || 0);
    const suffix = el.dataset.suffix || '';
    if (reduceMotion) {
      el.textContent = String(target) + suffix;
      return;
    }
    const start = performance.now();
    const duration = 1800;
    const step = now => {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.round(target * easeOutQuad(progress));
      el.textContent = String(value) + (progress >= 1 ? suffix : '');
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // Observa contadores y los inicia cuando entran en viewport.
  function initCounters() {
    const counters = collectCounters();
    if (!counters.length) return;
    if (!('IntersectionObserver' in window)) {
      counters.forEach(animateCounter);
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.35 });
    counters.forEach(el => observer.observe(el));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initCounters, { once: true });
  else initCounters();
})();
