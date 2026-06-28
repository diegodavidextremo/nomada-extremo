(() => {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealSelectors = [
    '.card', '.ficha', 'h2', '.stats-strip', '.stats-grid', '.stat-item',
    '.familia-card', '.familias-grid > *', '.equipo-card', '.team-card', '.member-card',
    '.pack-card', '.av-pack-card', '.audiovisual-pack', '.process-card', '.final-card',
    '.brand-pro-card', '.reading-card', '.route-card', '.learning-route-card'
  ];

  // Marca elementos existentes como reveal sin obligar a tocar todo el HTML.
  function prepareRevealElements() {
    const blocks = [...document.querySelectorAll(revealSelectors.join(','))]
      .filter(el => !el.closest('#site-header, #footer, .nav-mobile-menu, .noext-modal, .chat-widget'));

    let groupIndex = 0;
    let lastParent = null;
    blocks.forEach(el => {
      if (!el.classList.contains('reveal')) el.classList.add('reveal');
      if (el.parentElement !== lastParent) {
        groupIndex = 0;
        lastParent = el.parentElement;
      }
      if (!el.dataset.delay) el.dataset.delay = String(Math.min(groupIndex, 6));
      groupIndex += 1;
    });
    return blocks;
  }

  // Revela elementos con IntersectionObserver y stagger por bloque.
  function initScrollReveal() {
    const elements = prepareRevealElements();
    if (!elements.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const delay = Number(entry.target.dataset.delay || 0) * 80;
        entry.target.style.transitionDelay = delay + 'ms';
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    elements.forEach(el => observer.observe(el));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initScrollReveal, { once: true });
  else initScrollReveal();
})();
