(() => {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Aplica tilt 3D suave a fichas y tarjetas de actividad en desktop.
  function initTilt() {
    if (reduceMotion || !canHover) return;
    const cards = [...document.querySelectorAll('.activity-card, .ficha')];
    cards.forEach(card => {
      card.classList.add('activity-card');
      card.addEventListener('mousemove', event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        const rotateY = (x - 0.5) * 16;
        const rotateX = (0.5 - y) * 16;
        card.style.setProperty('--tilt-x', (x * 100).toFixed(2) + '%');
        card.style.setProperty('--tilt-y', (y * 100).toFixed(2) + '%');
        card.style.transform = 'perspective(900px) rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initTilt, { once: true });
  else initTilt();
})();
