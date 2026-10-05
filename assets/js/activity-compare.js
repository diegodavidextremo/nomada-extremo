/* Compare existing technical specifications without duplicating catalog data. */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const cards = [...document.querySelectorAll('.actividades-page .ficha[data-activity-source]')];
  if (!cards.length || !window.noextGetActivitySpec) return;
  const selected = new Set();
  const tr = text => window.noextTranslate?.(text) || text;
  const escape = text => String(text || '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const dock = document.createElement('aside');
  dock.className = 'activity-compare-dock';
  dock.setAttribute('data-no-translate', '');
  dock.hidden = true;
  dock.innerHTML = '<p role="status" aria-live="polite"></p><button type="button" data-compare-open></button><button type="button" data-compare-clear></button>';
  dock.setAttribute('aria-label', tr('Comparar actividades'));
  document.body.append(dock);
  const buttons = new Map();
  const title = card => card.querySelector('.ficha-titulo')?.textContent.trim() || card.dataset.activitySource;
  function update() {
    dock.setAttribute('aria-label', tr('Comparar actividades'));
    dock.hidden = selected.size === 0;
    dock.querySelector('p').textContent = `${selected.size}/3 · ${tr('actividades seleccionadas')}`;
    dock.querySelector('[data-compare-open]').textContent = tr('Ver comparación');
    dock.querySelector('[data-compare-open]').disabled = selected.size < 2;
    dock.querySelector('[data-compare-clear]').textContent = tr('Limpiar');
    buttons.forEach((button, card) => {
      button.textContent = tr(selected.has(card) ? 'Quitar de comparación' : 'Comparar');
      button.setAttribute('aria-pressed', String(selected.has(card)));
      button.setAttribute('aria-label', `${button.textContent}: ${title(card)}`);
    });
  }
  cards.forEach(card => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'activity-compare-toggle';
    button.setAttribute('data-no-translate', '');
    buttons.set(card, button);
    card.querySelector('.ficha-cuerpo').append(button);
    button.addEventListener('click', () => {
      if (selected.has(card)) selected.delete(card);
      else if (selected.size < 3) selected.add(card);
      else { window.noextToast?.(tr('Puedes comparar hasta tres actividades. Quita una para añadir otra.')); return; }
      update();
    });
  });
  dock.querySelector('[data-compare-clear]').addEventListener('click', () => {
    const first = [...selected].find(card => !card.hidden);
    selected.clear(); update(); buttons.get(first)?.focus({preventScroll: true});
  });
  dock.querySelector('[data-compare-open]').addEventListener('click', () => {
    if (selected.size < 2) return;
    const chosen = [...selected];
    const specs = chosen.map(card => window.noextGetActivitySpec(card.dataset.activitySource));
    const rows = [['Duración', 'duracion'], ['Nivel físico', 'fisico'], ['Experiencia previa', 'experiencia'], ['Material incluido', 'material']];
    const headers = chosen.map(card => `<th scope="col">${escape(title(card))}</th>`).join('');
    const body = rows.map(([label, key]) => `<tr><th scope="row">${escape(tr(label))}</th>${specs.map(spec => `<td>${escape(tr(spec[key]))}</td>`).join('')}</tr>`).join('');
    const links = chosen.map(card => `<td><a href="#${encodeURIComponent(card.id)}" data-compare-view>${escape(tr('Ver actividad'))}</a></td>`).join('');
    window.noextOpenModal(escape(tr('Comparar actividades')), `<div class="activity-comparison-scroll" tabindex="0" role="region" aria-label="${escape(tr('Comparar actividades'))}"><table class="activity-comparison"><caption>${escape(tr('Compara duración, esfuerzo y preparación antes de elegir.'))}</caption><thead><tr><th scope="col">${escape(tr('Características'))}</th>${headers}</tr></thead><tbody>${body}<tr><th scope="row">${escape(tr('Actividad'))}</th>${links}</tr></tbody></table></div>`);
    document.querySelectorAll('[data-compare-view]').forEach(link => link.addEventListener('click', () => {
      document.querySelector('.noext-modal-close').click();
      const card = chosen.find(item => `#${encodeURIComponent(item.id)}` === link.getAttribute('href'));
      if (card?.hidden) document.querySelector('.activity-filter-clear').click();
      if (card) requestAnimationFrame(() => { card.scrollIntoView({block:'start'}); buttons.get(card).focus({preventScroll:true}); });
    }));
  });
  window.addEventListener('noext:languagechange', update);
  update();
});
