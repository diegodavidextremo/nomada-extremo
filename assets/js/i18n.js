(function () {
  'use strict';
  const supported = ['es', 'en', 'fr', 'de'];
  const storageKey = 'noext-language';
  const page = (location.pathname.split('/').pop() || 'index.html').replace('.html', '') || 'index';
  let current = supported.includes(localStorage.getItem(storageKey)) ? localStorage.getItem(storageKey) : 'es';
  let fallback = {};

  const pathKeys = [
    ['.nav-menu > li > a[href="index.html"], .nav-mobile-menu > a[href="index.html"]','nav.home'],
    ['.nav-menu > li > a[href="actividades.html"], .nav-mobile-menu > a[href="actividades.html"]','nav.activities'],
    ['.nav-menu > li > a[href="escuela.html"], .nav-mobile-menu > a[href="escuela.html"]','nav.school'],
    ['.nav-menu > li > a[href="naturistas.html"], .nav-mobile-menu > a[href="naturistas.html"]','nav.naturism'],
    ['.nav-menu > li > a[href="audiovisual.html"], .nav-mobile-menu > a[href="audiovisual.html"]','nav.audiovisual'],
    ['.nav-menu > li > a[href="proyecto-completo.html"], .nav-mobile-menu > a[href="proyecto-completo.html"]','nav.project'],
    ['.nav-menu > li > a[href="contacto.html"], .nav-mobile-menu > a[href="contacto.html"]','nav.contact'],
    ['.nav-mobile-menu > a[href="packs.html"]','nav.packs'],
    ['.nav-mobile-menu > a[href="reservas.html"]','nav.request'],
    ['.nav-mobile-menu > a[href="seguridad.html"]','nav.safety'],
    ['.nav-mobile-menu > a[href="equipo.html"]','nav.team'],
    ['.nav-mobile-menu > a[href="faq.html"]','nav.faq']
  ];

  const exactKeys = new Map([
    ['Solicitar experiencia','actions.request'],['Explorar actividades','actions.explore'],['Ver ruta completa','actions.route'],
    ['Regalar bono','actions.gift'],['Contactar','actions.contact'],['Ver detalle','actions.details'],['Cerrar','actions.close'],
    ['Ver packs','actions.packs'],['Ver escuela','actions.school'],['Cómo funciona','actions.how'],['Seguridad','actions.safety']
  ]);

  const markCommonContent = () => {
    pathKeys.forEach(([selector,key]) => document.querySelectorAll(selector).forEach(element => { if (!element.dataset.i18n) element.dataset.i18n = key; }));
    document.querySelectorAll('a, button, summary').forEach(element => {
      const key = exactKeys.get(element.textContent.trim());
      if (key && !element.dataset.i18n) element.dataset.i18n = key;
    });
  };

  const load = async language => {
    const response = await fetch(`i18n/${language}.json`, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`No se pudo cargar i18n/${language}.json`);
    return response.json();
  };

  const valueFor = (dictionary, key) => key.split('.').reduce((value, part) => value && value[part], dictionary);

  const apply = (dictionary, language) => {
    markCommonContent();
    document.documentElement.lang = language;
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.dataset.i18n;
      const value = valueFor(dictionary, key) ?? valueFor(fallback, key);
      if (typeof value === 'string') element.textContent = value;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const value = valueFor(dictionary, element.dataset.i18nPlaceholder) ?? valueFor(fallback, element.dataset.i18nPlaceholder);
      if (typeof value === 'string') element.placeholder = value;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(element => {
      const value = valueFor(dictionary, element.dataset.i18nAria) ?? valueFor(fallback, element.dataset.i18nAria);
      if (typeof value === 'string') element.setAttribute('aria-label', value);
    });
    document.querySelectorAll('[data-language-switcher] button').forEach(button => {
      const active = button.dataset.lang === language;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    const title = valueFor(dictionary, `meta.${page}.title`) ?? valueFor(fallback, `meta.${page}.title`);
    const description = valueFor(dictionary, `meta.${page}.description`) ?? valueFor(fallback, `meta.${page}.description`);
    if (title) document.title = title;
    if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    window.dispatchEvent(new CustomEvent('noext:languagechange', { detail: { language, dictionary } }));
  };

  const setLanguage = async language => {
    const next = supported.includes(language) ? language : 'es';
    try {
      if (!Object.keys(fallback).length) fallback = await load('es');
      const dictionary = next === 'es' ? fallback : await load(next);
      current = next;
      localStorage.setItem(storageKey, current);
      apply(dictionary, current);
    } catch (error) {
      console.warn('[Nómada Extremo i18n]', error.message);
      if (Object.keys(fallback).length) apply(fallback, 'es');
    }
  };

  document.addEventListener('click', event => {
    const button = event.target.closest('[data-language-switcher] [data-lang]');
    if (button) setLanguage(button.dataset.lang);
  });

  setLanguage(current);
})();
