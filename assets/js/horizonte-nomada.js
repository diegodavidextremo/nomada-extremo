(function () {
  'use strict';

  const data = Array.isArray(window.NOMADA_HORIZON_DATA) ? window.NOMADA_HORIZON_DATA : [];
  const filterForm = document.querySelector('[data-horizon-filter]');
  const grid = document.querySelector('[data-horizon-grid]');
  const count = document.querySelector('[data-horizon-count]');
  const empty = document.querySelector('[data-horizon-empty]');
  if (!filterForm || !grid || !count || !empty) return;

  const supportedLanguages = ['es', 'en', 'fr', 'de', 'it', 'pt'];
  const storageKey = 'noext-horizon-state';
  const favoritesKey = 'noext-favorites';
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const selects = {
    category: filterForm.elements.category,
    horizon: filterForm.elements.horizon,
    state: filterForm.elements.state
  };

  const labels = {
    category: {
      movilidad: 'Movilidad y vehículos', tecnologia: 'Tecnología personal', audiovisual: 'Cámaras y contenido',
      alianzas: 'Colaboraciones soñadas', bases: 'Bases y campamentos', expediciones: 'Expediciones y destinos', impacto: 'Proyectos de impacto'
    },
    horizon: { proximo: 'Próximos pasos', medio: 'Medio plazo', largo: 'Largo plazo', decadas: 'Visión de décadas' },
    state: { idea: 'Idea', estudio: 'En estudio', disenado: 'Diseñado', prioridad: 'Prioridad futura', sueno: 'Sueño a largo plazo' },
    application: {
      logistica: 'Logística', viajes: 'Viajes', material: 'Material', seguridad: 'Seguridad', navegacion: 'Navegación',
      logbook: 'Logbook', audiovisual: 'Audiovisual', formacion: 'Formación', comunidad: 'Comunidad', sostenibilidad: 'Sostenibilidad',
      escuela: 'Escuela', inclusion: 'Inclusión'
    }
  };

  const icons = {
    movilidad: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M12 39h40l-4-14H22l-10 14Z"/><path d="M18 39v8m28-8v8M8 47h48M26 25l4-8h12l6 8"/><circle cx="19" cy="47" r="4"/><circle cx="45" cy="47" r="4"/></svg>',
    tecnologia: '<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="19" y="8" width="26" height="48" rx="5"/><path d="M27 14h10M29 49h6"/><circle cx="32" cy="31" r="8"/><path d="m32 26 3 5-3 5-3-5 3-5Z"/></svg>',
    audiovisual: '<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="9" y="19" width="36" height="28" rx="4"/><path d="m45 28 10-6v22l-10-6M19 19l4-7h12l4 7"/><circle cx="27" cy="33" r="8"/></svg>',
    alianzas: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M13 23h12l7 7 7-7h12M9 29l12 18 11-8 11 8 12-18"/><path d="m22 47 10 8 10-8M27 25l-8 10m18-10 8 10"/></svg>',
    bases: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M8 53h48M13 53V27l19-15 19 15v26M24 53V38h16v15"/><path d="M20 30h6m12 0h6"/></svg>',
    expediciones: '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="23"/><path d="M32 9c8 8 12 15 12 23S40 47 32 55c-8-8-12-15-12-23S24 17 32 9ZM9 32h46"/><path d="m35 25-6 14 14-6-8-8Z"/></svg>',
    impacto: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 55V30M32 39c-12 0-19-8-20-21 12 0 20 7 20 18M32 33c1-12 9-19 20-19 0 13-7 21-20 21"/><path d="M21 55h22"/></svg>'
  };

  let currentLanguage = readLanguage();
  let view = 'grid';
  let favoriteIds = readFavorites();

  function readLanguage() {
    try {
      const stored = localStorage.getItem('noext-language');
      return supportedLanguages.includes(stored) ? stored : 'es';
    } catch (_) {
      return 'es';
    }
  }

  function translate(source) {
    if (typeof window.noextHorizonPhrase === 'function') return window.noextHorizonPhrase(source);
    return typeof window.noextTranslate === 'function' ? window.noextTranslate(source) : source;
  }

  function localized(value) {
    if (!value || typeof value !== 'object') return value || '';
    return value[currentLanguage] || value.es || Object.values(value).find(Boolean) || '';
  }

  function readFavorites() {
    try {
      const stored = JSON.parse(localStorage.getItem(favoritesKey) || '[]');
      return new Set(Array.isArray(stored) ? stored.filter(item => item?.type === 'horizon').map(item => item.id) : []);
    } catch (_) {
      return new Set();
    }
  }

  function saveFavorite(concept, isFavorite) {
    try {
      const stored = JSON.parse(localStorage.getItem(favoritesKey) || '[]');
      const favorites = Array.isArray(stored) ? stored.filter(item => !(item?.type === 'horizon' && item.id === concept.id)) : [];
      if (isFavorite) favorites.push({ type: 'horizon', id: concept.id, title: localized(concept.title), href: `horizonte-nomada.html#${concept.id}` });
      localStorage.setItem(favoritesKey, JSON.stringify(favorites));
    } catch (_) {
      // La experiencia principal sigue funcionando si el almacenamiento está bloqueado.
    }
  }

  function loadState() {
    try {
      const saved = JSON.parse(sessionStorage.getItem(storageKey) || '{}');
      Object.entries(selects).forEach(([key, select]) => {
        if (saved[key] && [...select.options].some(option => option.value === saved[key])) select.value = saved[key];
      });
      if (saved.view === 'timeline') view = 'timeline';
    } catch (_) {
      view = 'grid';
    }
  }

  function saveState() {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify({
        category: selects.category.value,
        horizon: selects.horizon.value,
        state: selects.state.value,
        view
      }));
    } catch (_) {
      // Persistencia opcional.
    }
  }

  function populateSelect(select, values, group) {
    const previous = select.value || 'all';
    select.replaceChildren();
    const all = document.createElement('option');
    all.value = 'all';
    all.textContent = translate(group === 'category' ? 'Todas' : 'Todos');
    select.appendChild(all);
    values.forEach(value => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = translate(labels[group][value] || value);
      select.appendChild(option);
    });
    select.value = [...select.options].some(option => option.value === previous) ? previous : 'all';
  }

  function buildOptions() {
    populateSelect(selects.category, [...new Set(data.map(item => item.category))], 'category');
    populateSelect(selects.horizon, [...new Set(data.map(item => item.horizon))], 'horizon');
    populateSelect(selects.state, [...new Set(data.map(item => item.state))], 'state');
  }

  function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  }

  function createCard(concept) {
    const card = createElement('article', 'horizon-card');
    card.id = concept.id;
    card.dataset.category = concept.category;
    card.dataset.noTranslate = '';

    const visual = createElement('div', 'horizon-card__visual');
    visual.innerHTML = icons[concept.category] || icons.tecnologia;
    const body = createElement('div', 'horizon-card__body');
    const meta = createElement('div', 'horizon-card__meta');
    [labels.category[concept.category], labels.horizon[concept.horizon], labels.state[concept.state]].filter(Boolean).forEach(value => {
      meta.appendChild(createElement('span', '', translate(value)));
    });

    const title = createElement('h3', '', localized(concept.title));
    const description = createElement('p', 'horizon-card__description', localized(concept.description));
    const motive = createElement('p', 'horizon-card__motive', localized(concept.motive));
    const apps = createElement('div', 'horizon-card__apps');
    (concept.applications || []).forEach(value => apps.appendChild(createElement('span', '', translate(labels.application[value] || value))));

    const actions = createElement('div', 'horizon-card__actions');
    const link = createElement('a', 'horizon-card__link', translate('Explorar área relacionada'));
    link.href = concept.link || `#${concept.id}`;
    const favorite = createElement('button', 'horizon-card__favorite');
    favorite.type = 'button';
    const isFavorite = favoriteIds.has(concept.id);
    favorite.classList.toggle('is-favorite', isFavorite);
    favorite.setAttribute('aria-pressed', String(isFavorite));
    favorite.setAttribute('aria-label', translate(isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'));
    favorite.textContent = isFavorite ? '★' : '☆';
    favorite.addEventListener('click', () => {
      const next = !favorite.classList.contains('is-favorite');
      favorite.classList.toggle('is-favorite', next);
      favorite.setAttribute('aria-pressed', String(next));
      favorite.setAttribute('aria-label', translate(next ? 'Quitar de favoritos' : 'Guardar en favoritos'));
      favorite.textContent = next ? '★' : '☆';
      next ? favoriteIds.add(concept.id) : favoriteIds.delete(concept.id);
      saveFavorite(concept, next);
    });
    actions.append(link, favorite);
    body.append(meta, title, description, motive, apps, actions);
    card.append(visual, body);
    if (!reduceMotion) card.classList.add('is-entering');
    return card;
  }

  function visibleConcepts() {
    return data.filter(concept => Object.entries(selects).every(([key, select]) => select.value === 'all' || concept[key] === select.value));
  }

  function updateViewButtons() {
    document.querySelectorAll('[data-horizon-view]').forEach(button => {
      const active = button.dataset.horizonView === view;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    grid.dataset.view = view;
  }

  function render() {
    const concepts = visibleConcepts();
    grid.replaceChildren(...concepts.map(createCard));
    count.textContent = typeof window.noextHorizonCount === 'function'
      ? window.noextHorizonCount(concepts.length)
      : (concepts.length === 1 ? '1 concepto visible' : `${concepts.length} conceptos visibles`);
    empty.hidden = concepts.length !== 0;
    updateViewButtons();
    saveState();
  }

  Object.values(selects).forEach(select => select.addEventListener('change', render));
  filterForm.addEventListener('reset', () => {
    window.setTimeout(() => {
      Object.values(selects).forEach(select => { select.value = 'all'; });
      render();
    }, 0);
  });

  document.querySelectorAll('[data-horizon-view]').forEach(button => button.addEventListener('click', () => {
    view = button.dataset.horizonView === 'timeline' ? 'timeline' : 'grid';
    render();
  }));

  document.querySelectorAll('[data-hz-category-jump]').forEach(button => button.addEventListener('click', () => {
    selects.category.value = button.dataset.hzCategoryJump;
    render();
    document.getElementById('explorador-horizonte')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  }));

  window.addEventListener('noext:languagechange', event => {
    currentLanguage = supportedLanguages.includes(event.detail?.language) ? event.detail.language : readLanguage();
    buildOptions();
    loadState();
    render();
  });

  buildOptions();
  loadState();
  render();
})();
