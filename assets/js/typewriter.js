(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const defaultText = 'La aventura no es lo que haces. Es cómo decides estar en el mundo: atento, humilde, presente y completamente vivo.';

  function initTypewriter() {
    const host = document.querySelector('[data-typewriter]');
    if (!host) return;

    const text = host.dataset.typewriterText || defaultText;
    host.textContent = '';

    const output = document.createElement('span');
    output.className = 'typewriter-text';
    output.setAttribute('aria-live', 'polite');

    const cursor = document.createElement('span');
    cursor.className = 'tw-cursor';
    cursor.setAttribute('aria-hidden', 'true');

    host.append(output, cursor);

    if (reduceMotion) {
      output.textContent = text;
      return;
    }

    let index = 0;
    const tick = () => {
      output.textContent = text.slice(0, index);
      if (index < text.length) {
        index += 1;
        window.setTimeout(tick, 35 + Math.random() * 45);
      }
    };

    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        observer.disconnect();
        tick();
      }
    }, { threshold: 0.35 });

    observer.observe(host);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initTypewriter, { once: true });
  else initTypewriter();
})();
