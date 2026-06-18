(function () {
  'use strict';

  const supported = ['es', 'en', 'fr', 'de', 'it', 'pt'];
  const storageKey = 'noext-language';
  const catalogVersion = '20260618-1';
  const page = (location.pathname.split('/').pop() || 'index.html').replace('.html', '') || 'index';
  const ignoredTags = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE', 'CODE', 'PRE']);
  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  const missingWarnings = new Set();
  const dictionaries = new Map();
  const originalTitle = document.title;
  const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  let current = readStoredLanguage();
  let applying = false;
  let observer;

  function readStoredLanguage() {
    try {
      const stored = localStorage.getItem(storageKey);
      return supported.includes(stored) ? stored : 'es';
    } catch (_) {
      return 'es';
    }
  }

  function storeLanguage(language) {
    try { localStorage.setItem(storageKey, language); } catch (_) { /* file:// or privacy mode */ }
  }

  function normalize(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function valueFor(dictionary, key) {
    return key.split('.').reduce((value, part) => value && value[part], dictionary);
  }

  function warnMissing(key, language) {
    const warning = `${language}:${key}`;
    if (missingWarnings.has(warning)) return;
    missingWarnings.add(warning);
    console.warn(`Missing i18n key: ${key} (${language})`);
  }

  async function load(language) {
    if (dictionaries.has(language)) return dictionaries.get(language);
    const response = await fetch(`i18n/${language}.json?v=${catalogVersion}`, { cache: 'default' });
    if (!response.ok) throw new Error(`No se pudo cargar i18n/${language}.json`);
    const dictionary = await response.json();
    dictionaries.set(language, dictionary);
    return dictionary;
  }

  function translatedValue(source, language, dictionary, fallback, explicitKey) {
    if (!source) return source;
    const key = explicitKey || `strings.${source}`;
    const target = explicitKey ? valueFor(dictionary, explicitKey) : dictionary.strings?.[source];
    if (typeof target === 'string') return target;
    const fallbackValue = explicitKey ? valueFor(fallback, explicitKey) : fallback.strings?.[source];
    if (language !== 'es') warnMissing(key, language);
    return typeof fallbackValue === 'string' ? fallbackValue : source;
  }

  function preserveSpacing(raw, translated) {
    const leading = raw.match(/^\s*/)?.[0] || '';
    const trailing = raw.match(/\s*$/)?.[0] || '';
    return `${leading}${translated}${trailing}`;
  }

  function rememberAttribute(element, attribute) {
    let values = originalAttributes.get(element);
    if (!values) {
      values = {};
      originalAttributes.set(element, values);
    }
    if (!(attribute in values)) values[attribute] = element.getAttribute(attribute) || '';
    return values[attribute];
  }

  function applyExplicit(root, language, dictionary, fallback) {
    const scope = root.nodeType === Node.ELEMENT_NODE ? root : document;
    const candidates = [];
    if (scope.matches?.('[data-i18n]')) candidates.push(scope);
    scope.querySelectorAll?.('[data-i18n]').forEach(element => candidates.push(element));
    candidates.forEach(element => {
      const key = element.dataset.i18n;
      const source = valueFor(fallback, key) || normalize(element.textContent);
      const translated = translatedValue(source, language, dictionary, fallback, key);
      if (element.textContent !== translated) element.textContent = translated;
    });

    const attributeBindings = [
      ['data-i18n-placeholder', 'placeholder'],
      ['data-i18n-aria', 'aria-label'],
      ['data-i18n-title', 'title'],
      ['data-i18n-alt', 'alt']
    ];
    attributeBindings.forEach(([dataAttribute, attribute]) => {
      const selector = `[${dataAttribute}]`;
      const elements = [];
      if (scope.matches?.(selector)) elements.push(scope);
      scope.querySelectorAll?.(selector).forEach(element => elements.push(element));
      elements.forEach(element => {
        const key = element.getAttribute(dataAttribute);
        const source = valueFor(fallback, key) || rememberAttribute(element, attribute);
        const translated = translatedValue(source, language, dictionary, fallback, key);
        if (element.getAttribute(attribute) !== translated) element.setAttribute(attribute, translated);
      });
    });
  }

  function applyCatalog(root, language, dictionary, fallback) {
    const base = root.nodeType === Node.TEXT_NODE ? root.parentElement : root;
    if (!base || ignoredTags.has(base.tagName) || base.closest('[translate="no"],[data-no-translate]')) return;

    const textNodes = [];
    if (root.nodeType === Node.TEXT_NODE) textNodes.push(root);
    else {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) textNodes.push(node);
    }

    textNodes.forEach(node => {
      if (!node.parentElement || ignoredTags.has(node.parentElement.tagName) || node.parentElement.closest('[data-i18n],[translate="no"],[data-no-translate]')) return;
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      const raw = originalText.get(node);
      const source = normalize(raw);
      if (!source) return;
      const translated = translatedValue(source, language, dictionary, fallback);
      const nextValue = preserveSpacing(raw, translated);
      if (node.nodeValue !== nextValue) node.nodeValue = nextValue;
    });

    const elements = [];
    if (root.nodeType === Node.ELEMENT_NODE) elements.push(root);
    root.querySelectorAll?.('[placeholder],[title],[aria-label],[alt]').forEach(element => elements.push(element));
    elements.forEach(element => {
      ['placeholder', 'title', 'aria-label', 'alt'].forEach(attribute => {
        if (!element.hasAttribute(attribute) || element.hasAttribute(`data-i18n-${attribute === 'aria-label' ? 'aria' : attribute}`)) return;
        const source = normalize(rememberAttribute(element, attribute));
        if (!source) return;
        const translated = translatedValue(source, language, dictionary, fallback);
        if (element.getAttribute(attribute) !== translated) element.setAttribute(attribute, translated);
      });
    });
  }

  function updateMetadata(language, dictionary, fallback) {
    const title = valueFor(dictionary, `meta.${page}.title`) ?? dictionary.strings?.[originalTitle] ?? valueFor(fallback, `meta.${page}.title`) ?? originalTitle;
    const description = valueFor(dictionary, `meta.${page}.description`) ?? dictionary.strings?.[originalDescription] ?? valueFor(fallback, `meta.${page}.description`) ?? originalDescription;
    if (title) document.title = title;
    if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title || document.title);
    if (description) document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.documentElement.lang = language;
  }

  function updateSwitcher(language) {
    document.querySelectorAll('[data-language-switcher] button').forEach(button => {
      const active = button.dataset.lang === language;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  function applyDocument(language, dictionary, fallback, root = document.body) {
    if (!root) return;
    applying = true;
    applyExplicit(root, language, dictionary, fallback);
    applyCatalog(root, language, dictionary, fallback);
    applying = false;
    updateMetadata(language, dictionary, fallback);
    updateSwitcher(language);
  }

  async function setLanguage(language, announce = true) {
    const next = supported.includes(language) ? language : 'es';
    try {
      const fallback = await load('es');
      const dictionary = next === 'es' ? fallback : await load(next);
      current = next;
      storeLanguage(current);
      applyDocument(current, dictionary, fallback);
      if (announce) window.dispatchEvent(new CustomEvent('noext:languagechange', { detail: { language: current, dictionary, fallback } }));
    } catch (error) {
      console.warn('[Nómada Extremo i18n]', error.message);
      const fallback = dictionaries.get('es');
      if (fallback) {
        current = 'es';
        applyDocument('es', fallback, fallback);
      }
    }
  }

  function observeDynamicContent() {
    observer?.disconnect();
    observer = new MutationObserver(mutations => {
      if (applying) return;
      const dictionary = dictionaries.get(current);
      const fallback = dictionaries.get('es');
      if (!dictionary || !fallback) return;
      const roots = new Set();
      mutations.forEach(mutation => {
        if (mutation.type === 'characterData') roots.add(mutation.target);
        mutation.addedNodes?.forEach(node => roots.add(node));
      });
      roots.forEach(root => {
        if (root.nodeType !== Node.TEXT_NODE && root.nodeType !== Node.ELEMENT_NODE) return;
        applying = true;
        applyExplicit(root, current, dictionary, fallback);
        applyCatalog(root, current, dictionary, fallback);
        applying = false;
      });
    });
    observer.observe(document.body, { childList: true, characterData: true, subtree: true });
  }

  window.noextTranslate = source => {
    const fallback = dictionaries.get('es') || {};
    const dictionary = dictionaries.get(current) || fallback;
    return translatedValue(normalize(source), current, dictionary, fallback);
  };

  window.auditI18n = () => {
    const fallback = dictionaries.get('es') || {};
    const dictionary = dictionaries.get(current) || fallback;
    const missing = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (!node.parentElement || ignoredTags.has(node.parentElement.tagName) || node.parentElement.closest('[data-i18n],[translate="no"],[data-no-translate]')) continue;
      const style = getComputedStyle(node.parentElement);
      if (style.display === 'none' || style.visibility === 'hidden') continue;
      const source = normalize(originalText.get(node) ?? node.nodeValue);
      if (!source) continue;
      if (fallback.strings?.[source] === undefined || (current !== 'es' && dictionary.strings?.[source] === undefined)) {
        missing.push({ text: source, element: node.parentElement.tagName.toLowerCase(), page: location.pathname.split('/').pop() || 'index.html' });
      }
    }
    console.table(missing);
    return missing;
  };

  document.addEventListener('click', event => {
    const button = event.target.closest('[data-language-switcher] [data-lang]');
    if (button) setLanguage(button.dataset.lang);
  });

  setLanguage(current, false).then(observeDynamicContent);
})();
