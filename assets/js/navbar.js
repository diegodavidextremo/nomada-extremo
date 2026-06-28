(() => {
  'use strict';

  // A?ade estado scrolled al nav y mantiene activa la secci?n visible.
  function initNavbar() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    let ticking = false;
    const update = () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
      ticking = false;
    };
    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });

    const links = [...nav.querySelectorAll('a[href*="#"]')];
    const sections = links.map(link => {
      const id = link.getAttribute('href').split('#')[1];
      return id ? document.getElementById(id) : null;
    }).filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => link.classList.toggle('section-active', link.getAttribute('href').endsWith('#' + entry.target.id)));
      });
    }, { threshold: 0.35, rootMargin: '-20% 0px -55% 0px' });
    sections.forEach(section => observer.observe(section));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initNavbar, { once: true });
  else initNavbar();
})();
