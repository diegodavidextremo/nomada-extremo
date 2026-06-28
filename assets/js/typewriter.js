(() => {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const words = ['Aventura', 'Formaci?n', 'Naturaleza', 'Audiovisual', 'Comunidad', 'Seguridad'];

  // Prepara el subt?tulo del hero con un span typewriter si no existe.
  function ensureTypewriterTarget() {
    let target = document.getElementById('typewriter');
    if (target) return target;
    const heroText = document.querySelector('.home-page .hero-lema');
    if (!heroText) return null;
    heroText.innerHTML = '<span id="typewriter" aria-live="polite"></span><span class="tw-cursor" aria-hidden="true"></span>, formaci?n, naturaleza, audiovisual y comunidad desde ?guilas, Murcia';
    return document.getElementById('typewriter');
  }

  // Escribe y borra palabras con ritmo natural en el hero de portada.
  function initTypewriter() {
    const target = ensureTypewriterTarget();
    if (!target) return;
    if (reduceMotion) {
      target.textContent = words[0];
      return;
    }
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    const tick = () => {
      const word = words[wordIndex];
      target.textContent = word.slice(0, charIndex);
      if (!deleting && charIndex < word.length) {
        charIndex += 1;
        setTimeout(tick, 80 + Math.random() * 35);
        return;
      }
      if (!deleting && charIndex === word.length) {
        deleting = true;
        setTimeout(tick, 1400);
        return;
      }
      if (deleting && charIndex > 0) {
        charIndex -= 1;
        setTimeout(tick, 40 + Math.random() * 20);
        return;
      }
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(tick, 300);
    };
    tick();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initTypewriter, { once: true });
  else initTypewriter();
})();
