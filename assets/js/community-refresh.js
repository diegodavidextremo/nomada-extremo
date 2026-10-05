(() => {
  'use strict';
  const translate = text => window.noextTranslate?.(text) || text;
  const filters = [...document.querySelectorAll('[data-coupon-filter]')];
  const cards = [...document.querySelectorAll('[data-coupon-category]')];
  filters.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.couponFilter;
    filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    cards.forEach(card => { card.hidden = filter !== 'all' && !card.dataset.couponCategory.split(' ').includes(filter); });
  }));
  document.querySelectorAll('[data-coupon-code]').forEach(button => button.addEventListener('click', async () => {
    const card = button.closest('.promo-coupon');
    const output = card.querySelector('.coupon-feedback');
    try {
      await navigator.clipboard.writeText(button.dataset.couponCode);
      output.textContent = translate('Código copiado');
    } catch {
      const range = document.createRange();
      range.selectNodeContents(card.querySelector('h3'));
      const selection = window.getSelection();
      selection.removeAllRanges(); selection.addRange(range);
      output.textContent = translate('Código seleccionado');
    }
  }));
})();
