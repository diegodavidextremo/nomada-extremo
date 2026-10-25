/* Shared progressive enhancements: no account, tracking or commercial submission. */
(() => {
  'use strict';
  const run = () => {
    const tr = source => window.noextTranslate?.(source) || source;
    document.querySelectorAll('[data-contact-hub]').forEach(link=>{
      const peers=[...link.parentElement.querySelectorAll(':scope > [data-contact-hub]')];
      const existing=link.parentElement.querySelector(':scope > a[href^="contacto.html"]:not([data-contact-hub])');
      if(existing || peers[0]!==link)link.remove();
    });
    const backgrounds = [...document.querySelectorAll('[data-background-src]')];
    const reveal = node => {node.style.backgroundImage = 'url(' + JSON.stringify(node.dataset.backgroundSrc) + ')';};
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){reveal(entry.target);observer.unobserve(entry.target);}}),{rootMargin:'300px'});
      backgrounds.forEach(node=>observer.observe(node));
    } else backgrounds.forEach(reveal);
    const tableRegions = [...document.querySelectorAll('.responsive-table,.finance-table-wrap')];
    tableRegions.forEach(region => {
      region.tabIndex = 0;
      region.setAttribute('role', 'region');
      const caption = region.querySelector('caption');
      if (caption) {
        caption.id ||= 'table-caption-' + tableRegions.indexOf(region);
        region.setAttribute('aria-labelledby', caption.id);
      } else region.setAttribute('aria-label', tr('Tabla desplazable'));
    });
    const meta = document.querySelector('.site-activity .activity-meta-list');
    if (meta) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'btn btn-outline preparation-print';
      button.addEventListener('click', () => window.print());
      meta.before(button);
    }
    // Short in-page navigation for documents. Existing authored indexes always take precedence.
    const main = document.querySelector('main') || document.querySelector('#main-content');
    if (document.body.dataset.pagePurpose === 'reference' && main && !document.querySelector('.site-reading-index,.document-index,.im-index,.contact-directory')) {
      const headings = [...main.querySelectorAll('h2')].filter(h => h.textContent.trim() && !h.closest('dialog,[role="dialog"],.noext-modal'));
      if (headings.length >= 4) {
        const nav = document.createElement('nav');
        nav.className = 'document-index';
        headings.slice(0,12).forEach((h,i) => {
          h.id ||= 'document-section-' + i;
          const a = document.createElement('a');
          a.href = '#' + h.id;
          const copy = h.cloneNode(true);
          copy.querySelectorAll('br').forEach(br=>br.replaceWith(document.createTextNode(' ')));
          a.textContent = (h.dataset.indexLabel || h.closest('[data-chapter]')?.dataset.chapter || copy.textContent)
            .replace(/\s+/g,' ').replace(/([.!?])(?=\p{L})/gu,'$1 ').trim();
          nav.append(a);
        });
        const intro = main.querySelector('.page-hero') || main.querySelector('h1');
        if (intro) intro.after(nav);
      }
    }
    const label = () => {
      document.querySelectorAll('.preparation-print').forEach(b => { b.textContent = tr('Imprimir preparación'); });
      document.querySelectorAll('.document-index').forEach(n => n.setAttribute('aria-label', tr('Índice de esta página')));
      tableRegions.filter(r=>!r.hasAttribute('aria-labelledby')).forEach(r=>r.setAttribute('aria-label',tr('Tabla desplazable')));
    };
    window.addEventListener('noext:languagechange',label);
    label();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',run,{once:true});
  else run();
})();
