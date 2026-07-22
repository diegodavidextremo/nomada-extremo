(() => {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Convierte la secci?n de temporadas en tabs con estaci?n activa por mes.
  function initSeasonTabs() {
    const section = document.getElementById('temporadas-home');
    if (!section || section.dataset.tabsReady === 'true' || section.querySelector('.season-tab-list, .season-tabs-nav')) return;
    const grid = section.querySelector('.grid-4');
    const cards = grid ? [...grid.children] : [];
    if (cards.length < 4) return;
    section.dataset.tabsReady = 'true';
    section.classList.add('season-tab-system');
    const tabs = document.createElement('div');
    tabs.className = 'season-tabs-nav';
    tabs.setAttribute('role', 'tablist');
    const seasonKeys = ['winter', 'spring', 'summer', 'autumn'];
    const currentMonth = new Date().getMonth();
    const defaultIndex = currentMonth <= 1 || currentMonth === 11 ? 0 : currentMonth <= 4 ? 1 : currentMonth <= 7 ? 2 : 3;
    cards.forEach((card, index) => {
      card.classList.add('season-panel');
      card.setAttribute('role', 'tabpanel');
      card.dataset.season = seasonKeys[index] || 'summer';
      const title = card.querySelector('.card-titulo')?.textContent.trim() || 'Temporada';
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'season-tab';
      button.setAttribute('role', 'tab');
      button.innerHTML = '<span class="season-tab-icon" aria-hidden="true">' + ['&#10052;', '&#10047;', '&#9788;', '&#10087;'][index] + '</span><span>' + title + '</span>';
      button.addEventListener('click', () => activate(index));
      tabs.appendChild(button);
    });
    grid.before(tabs);
    function activate(index) {
      section.dataset.activeSeason = seasonKeys[index] || 'summer';
      [...tabs.children].forEach((button, i) => {
        button.classList.toggle('is-active', i === index);
        button.setAttribute('aria-selected', String(i === index));
      });
      cards.forEach((card, i) => {
        card.classList.toggle('is-active', i === index);
        card.hidden = i !== index;
      });
    }
    activate(defaultIndex);
  }

  // Rellena barras de intensidad derivadas de la ficha existente.
  function initIntensityBars() {
    const bars = [...document.querySelectorAll('.intensity-bar, .intensidad-barra')];
    if (!bars.length) return;
    bars.forEach(bar => {
      const level = Number(bar.dataset.level || bar.querySelectorAll('.on').length || 1);
      bar.classList.add('intensity-bar');
      bar.dataset.level = String(Math.max(1, Math.min(5, level)));
      if (!bar.querySelector('.intensity-fill')) {
        const fill = document.createElement('i');
        fill.className = 'intensity-fill';
        fill.setAttribute('aria-hidden', 'true');
        bar.appendChild(fill);
      }
    });
    const reveal = bar => bar.classList.add('is-filled');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      bars.forEach(reveal);
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.45 });
    bars.forEach(bar => observer.observe(bar));
  }

  // Muestra skeletons breves en fichas destacadas de portada.
  function initSkeletonCards() {
    const cards = [...document.querySelectorAll('.home-page .ficha')].slice(0, 6);
    if (!cards.length || reduceMotion) return;
    cards.forEach(card => {
      card.classList.add('is-skeleton-loading');
      if (!card.querySelector('.skeleton-card')) {
        const skeleton = document.createElement('div');
        skeleton.className = 'skeleton-card';
        skeleton.innerHTML = '<div class="skeleton skeleton-hero"></div><div class="skeleton skeleton-line"></div><div class="skeleton skeleton-line short"></div><div class="skeleton skeleton-button"></div>';
        card.appendChild(skeleton);
      }
    });
    window.setTimeout(() => cards.forEach(card => card.classList.remove('is-skeleton-loading')), 600);
  }

  // Inserta barra de progreso de lectura en p?ginas largas.
  function initReadingProgress() {
    const longPages = ['actividades.html', 'proyecto-completo.html', 'escuela.html'];
    const path = location.pathname.split('/').pop() || 'index.html';
    if (!longPages.includes(path)) return;
    let bar = document.getElementById('reading-progress');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'reading-progress';
      document.body.prepend(bar);
    }
    let ticking = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
      bar.style.width = progress.toFixed(2) + '%';
      ticking = false;
    };
    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
  }

  // Anima badges con micro-bounce cuando entran en pantalla.
  function initBadgePop() {
    const badges = [...document.querySelectorAll('.badge, .level-badge, .nivel-badge')];
    if (!badges.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      badges.forEach(badge => badge.classList.add('badge-visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const badge = entry.target;
        badge.style.animationDelay = ((Number(badge.dataset.delay || 0) % 8) * 80) + 'ms';
        badge.classList.add('badge-visible');
        observer.unobserve(badge);
      });
    }, { threshold: 0.35 });
    badges.forEach((badge, index) => {
      badge.dataset.delay = String(index);
      observer.observe(badge);
    });
  }

  function initUiExtras() {
    initSeasonTabs();
    initIntensityBars();
    initSkeletonCards();
    initReadingProgress();
    initBadgePop();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initUiExtras, { once: true });
  else initUiExtras();
})();
