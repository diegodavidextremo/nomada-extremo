/* Progressive home layout: preserve all content and deep links. */
(() => {
  'use strict';
  const featured = document.querySelector('.home-featured-experiences');
  const toggle = featured?.querySelector('.home-featured-toggle');
  const translate = text => window.noextTranslate?.(text) || text;
  function label() {
    if (toggle) {
      const expanded = featured.classList.contains('is-expanded');
      toggle.dataset.i18n = expanded ? 'october.less' : 'october.more';
      toggle.textContent = translate(expanded ? 'Ver menos' : 'Ver más');
    }
  }
  if (toggle) {
    featured.classList.add('is-compact');
    toggle.hidden = false;
    toggle.addEventListener('click', () => {
      const expanded = featured.classList.toggle('is-expanded');
      toggle.setAttribute('aria-expanded', String(expanded));
      label();
    });
    window.addEventListener('noext:languagechange', label);
    label();
  }
  const desktop = window.matchMedia('(min-width:768px)');
  document.querySelectorAll('.home-mobile-details').forEach(details => {
    const update = () => {
      details.open = desktop.matches;
      details.classList.toggle('is-desktop-expanded', desktop.matches);
    };
    desktop.addEventListener('change', update);
    update();
  });
  function revealAnchor() {
    if (!location.hash) return;
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) { return; }
    const target = document.getElementById(id);
    if (!target) return;
    for (let node = target; node; node = node.parentElement) {
      if (node.tagName === 'DETAILS') node.open = true;
      if (node.hasAttribute('data-featured-extra')) {
        featured.classList.add('is-expanded');
        toggle.setAttribute('aria-expanded', 'true');
        label();
      }
    }
    requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
  }
  window.addEventListener('hashchange', revealAnchor);
  revealAnchor();
})();
