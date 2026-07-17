(function () {
  'use strict';

  const root = document.getElementById('selector-aventura');
  if (!root) return;

  const supported = ['es', 'en', 'fr', 'de', 'it', 'pt'];
  const groupWeights = { medium: 4, intensity: 3, duration: 2, company: 1, objective: 4 };
  const state = { medium: '', intensity: '', duration: '', company: '', objective: '' };
  const optionKeys = {
    medium: ['sea', 'coast', 'mountain', 'air', 'inland', 'mixed'],
    intensity: ['calm', 'active', 'intense', 'extreme'],
    duration: ['short', 'half', 'full', 'weekend', 'multi'],
    company: ['solo', 'couple', 'friends', 'family', 'group', 'school'],
    objective: ['learn', 'explore', 'challenge', 'relax', 'create', 'nature', 'adrenaline']
  };

  const copy = {
    es: {
      eyebrow: 'Orientación personalizada', titleA: 'ENCUENTRA TU', titleB: 'PRÓXIMA AVENTURA',
      intro: 'Elige lo que buscas y te mostraremos experiencias reales del catálogo que encajan contigo.',
      medium: 'Medio', intensity: 'Intensidad', duration: 'Duración', company: 'Compañía', objective: 'Objetivo',
      reset: 'Limpiar selección', resultsEyebrow: 'Selección Nómada', resultsTitle: 'Experiencias recomendadas',
      note: 'La recomendación es orientativa. La viabilidad final depende del nivel, la meteorología y la validación técnica de cada actividad.',
      count: n => `${n} ${n === 1 ? 'opción' : 'opciones'}`, view: 'Ver experiencia',
      defaultReason: 'Una propuesta real del catálogo para empezar a explorar el universo Nómada.',
      matchReason: values => `Encaja por ${values.join(', ')}.`
    },
    en: {
      eyebrow: 'Personal guidance', titleA: 'FIND YOUR', titleB: 'NEXT ADVENTURE',
      intro: 'Choose what you are looking for and we will show you real catalogue experiences that suit you.',
      medium: 'Environment', intensity: 'Intensity', duration: 'Duration', company: 'Company', objective: 'Goal',
      reset: 'Clear selection', resultsEyebrow: 'Nómada selection', resultsTitle: 'Recommended experiences',
      note: 'This recommendation is indicative. Final feasibility depends on level, weather and the technical validation of each activity.',
      count: n => `${n} ${n === 1 ? 'option' : 'options'}`, view: 'View experience',
      defaultReason: 'A real catalogue proposal to start exploring the Nómada universe.',
      matchReason: values => `A good fit for ${values.join(', ')}.`
    },
    fr: {
      eyebrow: 'Orientation personnalisée', titleA: 'TROUVEZ VOTRE', titleB: 'PROCHAINE AVENTURE',
      intro: 'Choisissez ce que vous recherchez et découvrez des expériences réelles du catalogue qui vous correspondent.',
      medium: 'Milieu', intensity: 'Intensité', duration: 'Durée', company: 'Compagnie', objective: 'Objectif',
      reset: 'Effacer la sélection', resultsEyebrow: 'Sélection Nómada', resultsTitle: 'Expériences recommandées',
      note: 'Cette recommandation est indicative. La faisabilité finale dépend du niveau, de la météo et de la validation technique de chaque activité.',
      count: n => `${n} ${n === 1 ? 'option' : 'options'}`, view: "Voir l'expérience",
      defaultReason: "Une proposition réelle du catalogue pour commencer à explorer l'univers Nómada.",
      matchReason: values => `Adaptée à vos critères : ${values.join(', ')}.`
    },
    de: {
      eyebrow: 'Persönliche Orientierung', titleA: 'FINDE DEIN', titleB: 'NÄCHSTES ABENTEUER',
      intro: 'Wähle, was du suchst, und entdecke passende echte Erlebnisse aus dem Katalog.',
      medium: 'Umgebung', intensity: 'Intensität', duration: 'Dauer', company: 'Begleitung', objective: 'Ziel',
      reset: 'Auswahl löschen', resultsEyebrow: 'Nómada-Auswahl', resultsTitle: 'Empfohlene Erlebnisse',
      note: 'Die Empfehlung dient zur Orientierung. Die endgültige Durchführbarkeit hängt von Niveau, Wetter und technischer Prüfung ab.',
      count: n => `${n} ${n === 1 ? 'Option' : 'Optionen'}`, view: 'Erlebnis ansehen',
      defaultReason: 'Ein echtes Katalogangebot für den Einstieg in die Nómada-Welt.',
      matchReason: values => `Passt zu ${values.join(', ')}.`
    },
    it: {
      eyebrow: 'Orientamento personalizzato', titleA: 'TROVA LA TUA', titleB: 'PROSSIMA AVVENTURA',
      intro: 'Scegli ciò che cerchi e scopri esperienze reali del catalogo adatte a te.',
      medium: 'Ambiente', intensity: 'Intensità', duration: 'Durata', company: 'Compagnia', objective: 'Obiettivo',
      reset: 'Cancella selezione', resultsEyebrow: 'Selezione Nómada', resultsTitle: 'Esperienze consigliate',
      note: 'Il consiglio è orientativo. La fattibilità finale dipende dal livello, dal meteo e dalla verifica tecnica di ogni attività.',
      count: n => `${n} ${n === 1 ? 'opzione' : 'opzioni'}`, view: "Vedi l'esperienza",
      defaultReason: "Una proposta reale del catalogo per iniziare a esplorare l'universo Nómada.",
      matchReason: values => `Adatta per ${values.join(', ')}.`
    },
    pt: {
      eyebrow: 'Orientação personalizada', titleA: 'ENCONTRE A SUA', titleB: 'PRÓXIMA AVENTURA',
      intro: 'Escolha o que procura e descubra experiências reais do catálogo adequadas a si.',
      medium: 'Ambiente', intensity: 'Intensidade', duration: 'Duração', company: 'Companhia', objective: 'Objetivo',
      reset: 'Limpar seleção', resultsEyebrow: 'Seleção Nómada', resultsTitle: 'Experiências recomendadas',
      note: 'A recomendação é orientativa. A viabilidade final depende do nível, da meteorologia e da validação técnica de cada atividade.',
      count: n => `${n} ${n === 1 ? 'opção' : 'opções'}`, view: 'Ver experiência',
      defaultReason: 'Uma proposta real do catálogo para começar a explorar o universo Nómada.',
      matchReason: values => `Adequada para ${values.join(', ')}.`
    }
  };

  const labels = {
    es: {
      sea: 'mar', coast: 'costa', mountain: 'montaña', air: 'aire', inland: 'interior', mixed: 'mixto',
      calm: 'tranquila', active: 'activa', intense: 'intensa', extreme: 'extrema',
      short: 'hasta 2 h', half: 'medio día', full: 'día completo', weekend: 'fin de semana', multi: 'varios días',
      solo: 'solo', couple: 'pareja', friends: 'amigos', family: 'familia', group: 'grupo', school: 'centro educativo',
      learn: 'aprender', explore: 'explorar', challenge: 'superarte', relax: 'relajarte', create: 'crear contenido', nature: 'naturaleza', adrenaline: 'adrenalina'
    },
    en: {
      sea: 'sea', coast: 'coast', mountain: 'mountain', air: 'air', inland: 'inland', mixed: 'mixed',
      calm: 'calm', active: 'active', intense: 'intense', extreme: 'extreme',
      short: 'up to 2 h', half: 'half day', full: 'full day', weekend: 'weekend', multi: 'several days',
      solo: 'solo', couple: 'couple', friends: 'friends', family: 'family', group: 'group', school: 'education group',
      learn: 'learning', explore: 'exploring', challenge: 'a challenge', relax: 'relaxing', create: 'creating content', nature: 'nature', adrenaline: 'adrenaline'
    },
    fr: {
      sea: 'mer', coast: 'côte', mountain: 'montagne', air: 'air', inland: 'intérieur', mixed: 'mixte',
      calm: 'calme', active: 'active', intense: 'intense', extreme: 'extrême',
      short: "jusqu'à 2 h", half: 'demi-journée', full: 'journée', weekend: 'week-end', multi: 'plusieurs jours',
      solo: 'solo', couple: 'couple', friends: 'amis', family: 'famille', group: 'groupe', school: 'centre éducatif',
      learn: 'apprendre', explore: 'explorer', challenge: 'se dépasser', relax: 'se détendre', create: 'créer du contenu', nature: 'la nature', adrenaline: "l'adrénaline"
    },
    de: {
      sea: 'Meer', coast: 'Küste', mountain: 'Berge', air: 'Luft', inland: 'Binnenland', mixed: 'gemischt',
      calm: 'ruhig', active: 'aktiv', intense: 'intensiv', extreme: 'extrem',
      short: 'bis 2 Std.', half: 'halber Tag', full: 'ganzer Tag', weekend: 'Wochenende', multi: 'mehrere Tage',
      solo: 'allein', couple: 'Paar', friends: 'Freunde', family: 'Familie', group: 'Gruppe', school: 'Bildungsgruppe',
      learn: 'Lernen', explore: 'Entdecken', challenge: 'Herausforderung', relax: 'Entspannung', create: 'Content', nature: 'Natur', adrenaline: 'Adrenalin'
    },
    it: {
      sea: 'mare', coast: 'costa', mountain: 'montagna', air: 'aria', inland: 'entroterra', mixed: 'misto',
      calm: 'tranquilla', active: 'attiva', intense: 'intensa', extreme: 'estrema',
      short: 'fino a 2 h', half: 'mezza giornata', full: 'giornata', weekend: 'fine settimana', multi: 'più giorni',
      solo: 'solo', couple: 'coppia', friends: 'amici', family: 'famiglia', group: 'gruppo', school: 'centro educativo',
      learn: 'imparare', explore: 'esplorare', challenge: 'superarsi', relax: 'rilassarsi', create: 'creare contenuti', nature: 'natura', adrenaline: 'adrenalina'
    },
    pt: {
      sea: 'mar', coast: 'costa', mountain: 'montanha', air: 'ar', inland: 'interior', mixed: 'misto',
      calm: 'tranquila', active: 'ativa', intense: 'intensa', extreme: 'extrema',
      short: 'até 2 h', half: 'meio dia', full: 'dia completo', weekend: 'fim de semana', multi: 'vários dias',
      solo: 'sozinho', couple: 'casal', friends: 'amigos', family: 'família', group: 'grupo', school: 'centro educativo',
      learn: 'aprender', explore: 'explorar', challenge: 'superar-se', relax: 'relaxar', create: 'criar conteúdo', nature: 'natureza', adrenaline: 'adrenalina'
    }
  };

  const names = {
    senderismo: { es: 'Senderismo guiado', en: 'Guided hiking', fr: 'Randonnée guidée', de: 'Geführte Wanderung', it: 'Escursionismo guidato', pt: 'Caminhada guiada' },
    kayak: { es: 'Kayak de mar', en: 'Sea kayaking', fr: 'Kayak de mer', de: 'Seekajak', it: 'Kayak da mare', pt: 'Caiaque de mar' },
    snorkel: { es: 'Snorkel de aventura', en: 'Adventure snorkelling', fr: "Snorkel d'aventure", de: 'Abenteuer-Schnorcheln', it: "Snorkeling d'avventura", pt: 'Snorkel de aventura' },
    coasteering: { es: 'Coasteering', en: 'Coasteering', fr: 'Coasteering', de: 'Coasteering', it: 'Coasteering', pt: 'Coasteering' },
    bautismo: { es: 'Bautismo de buceo', en: 'Try scuba diving', fr: 'Baptême de plongée', de: 'Schnuppertauchen', it: 'Battesimo subacqueo', pt: 'Batismo de mergulho' },
    openwater: { es: 'Ruta Open Water', en: 'Open Water pathway', fr: 'Parcours Open Water', de: 'Open-Water-Weg', it: 'Percorso Open Water', pt: 'Percurso Open Water' },
    ferrata: { es: 'Vía ferrata', en: 'Via ferrata', fr: 'Via ferrata', de: 'Klettersteig', it: 'Via ferrata', pt: 'Via ferrata' },
    rapel: { es: 'Rápel técnico', en: 'Technical abseiling', fr: 'Rappel technique', de: 'Technisches Abseilen', it: 'Discesa tecnica in corda', pt: 'Rappel técnico' },
    btt: { es: 'BTT costera', en: 'Coastal MTB', fr: 'VTT côtier', de: 'Küsten-MTB', it: 'MTB costiera', pt: 'BTT costeiro' },
    parapente: { es: 'Parapente biplaza', en: 'Tandem paragliding', fr: 'Parapente biplace', de: 'Tandem-Gleitschirm', it: 'Parapendio biposto', pt: 'Parapente duplo' },
    paramotor: { es: 'Vuelo en paramotor', en: 'Paramotor flight', fr: 'Vol en paramoteur', de: 'Motorschirmflug', it: 'Volo in paramotore', pt: 'Voo de paramotor' },
    multiaventura: { es: 'Multiaventura a medida', en: 'Tailored multi-adventure', fr: 'Multi-aventure sur mesure', de: 'Individuelles Multi-Abenteuer', it: 'Multiavventura su misura', pt: 'Multiaventura à medida' }
  };

  const activities = [
    { id: 'senderismo', href: 'senderismo-guiado.html', medium: ['mountain', 'inland'], intensity: ['calm', 'active'], duration: ['half', 'full'], company: ['solo', 'couple', 'friends', 'family', 'group', 'school'], objective: ['learn', 'explore', 'relax', 'nature'] },
    { id: 'kayak', href: 'kayak-mar.html', medium: ['sea', 'coast'], intensity: ['calm', 'active'], duration: ['short', 'half'], company: ['solo', 'couple', 'friends', 'family', 'group', 'school'], objective: ['learn', 'explore', 'relax', 'create', 'nature'] },
    { id: 'snorkel', href: 'snorkel-aventura.html', medium: ['sea', 'coast'], intensity: ['calm', 'active'], duration: ['short', 'half'], company: ['couple', 'friends', 'family', 'group', 'school'], objective: ['learn', 'explore', 'relax', 'create', 'nature'] },
    { id: 'coasteering', href: 'coasteering.html', medium: ['coast', 'mixed'], intensity: ['intense', 'extreme'], duration: ['half'], company: ['friends', 'group'], objective: ['explore', 'challenge', 'create', 'adrenaline'] },
    { id: 'bautismo', href: 'bautismo-buceo.html', medium: ['sea', 'coast'], intensity: ['calm', 'active'], duration: ['half'], company: ['solo', 'couple', 'friends', 'group'], objective: ['learn', 'explore', 'challenge', 'create', 'nature'] },
    { id: 'openwater', href: 'open-water.html', medium: ['sea'], intensity: ['active', 'intense'], duration: ['multi'], company: ['solo', 'couple', 'friends'], objective: ['learn', 'challenge', 'nature'] },
    { id: 'ferrata', href: 'via-ferrata.html', medium: ['mountain', 'mixed'], intensity: ['intense', 'extreme'], duration: ['half', 'full'], company: ['solo', 'couple', 'friends', 'group'], objective: ['learn', 'explore', 'challenge', 'create', 'adrenaline'] },
    { id: 'rapel', href: 'rapel.html', medium: ['mountain', 'inland'], intensity: ['intense', 'extreme'], duration: ['half'], company: ['solo', 'friends', 'group'], objective: ['learn', 'challenge', 'create', 'adrenaline'] },
    { id: 'btt', href: 'btt-costera.html', medium: ['coast', 'mountain', 'mixed'], intensity: ['active', 'intense'], duration: ['half', 'full'], company: ['solo', 'couple', 'friends', 'family', 'group'], objective: ['explore', 'challenge', 'create', 'nature'] },
    { id: 'parapente', href: 'parapente.html', medium: ['air'], intensity: ['intense', 'extreme'], duration: ['short', 'half'], company: ['solo', 'couple'], objective: ['explore', 'challenge', 'create', 'adrenaline'] },
    { id: 'paramotor', href: 'paramotor.html', medium: ['air'], intensity: ['intense'], duration: ['short', 'half'], company: ['solo', 'couple'], objective: ['explore', 'create', 'adrenaline'] },
    { id: 'multiaventura', href: 'multiaventura.html', medium: ['mixed', 'sea', 'coast', 'mountain', 'inland'], intensity: ['active', 'intense', 'extreme'], duration: ['full', 'weekend', 'multi'], company: ['couple', 'friends', 'family', 'group', 'school'], objective: ['learn', 'explore', 'challenge', 'create', 'nature', 'adrenaline'] }
  ];

  const resultsNode = root.querySelector('[data-selector-results]');
  const countNode = root.querySelector('[data-selector-count]');
  const progressNode = root.querySelector('[data-selector-progress]');

  function language() {
    let stored = '';
    try { stored = localStorage.getItem('noext-language') || ''; } catch (_) { /* no-op */ }
    return supported.includes(stored) ? stored : 'es';
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    })[character]);
  }

  function score(activity) {
    return Object.keys(state).reduce((total, group) => {
      if (!state[group]) return total;
      return total + (activity[group].includes(state[group]) ? groupWeights[group] : 0);
    }, 0);
  }

  function selectedMatches(activity, lang) {
    return Object.keys(state)
      .filter(group => state[group] && activity[group].includes(state[group]))
      .map(group => labels[lang][state[group]]);
  }

  function ranked() {
    const selectionCount = Object.values(state).filter(Boolean).length;
    const sorted = activities
      .map((activity, index) => ({ activity, index, score: score(activity) }))
      .sort((a, b) => b.score - a.score || a.index - b.index);
    if (!selectionCount) return sorted.slice(0, 4);
    const positive = sorted.filter(item => item.score > 0);
    return positive.slice(0, Math.min(6, Math.max(3, positive.length)));
  }

  function render() {
    const lang = language();
    const dictionary = copy[lang];
    const rankedActivities = ranked();

    root.querySelectorAll('[data-selector-copy]').forEach(element => {
      const value = dictionary[element.dataset.selectorCopy];
      if (typeof value === 'string') element.textContent = value;
    });

    Object.entries(optionKeys).forEach(([group, values]) => {
      const buttons = root.querySelectorAll(`[data-selector-group="${group}"] [data-value]`);
      buttons.forEach((button, index) => {
        button.textContent = labels[lang][values[index]];
        button.setAttribute('aria-pressed', String(state[group] === button.dataset.value));
      });
    });

    const completed = Object.values(state).filter(Boolean).length;
    progressNode.style.width = `${(completed / Object.keys(state).length) * 100}%`;
    countNode.textContent = dictionary.count(rankedActivities.length);

    resultsNode.innerHTML = rankedActivities.map(({ activity }, index) => {
      const matches = selectedMatches(activity, lang);
      const reason = matches.length ? dictionary.matchReason(matches) : dictionary.defaultReason;
      const primaryMedium = labels[lang][activity.medium[0]];
      const primaryIntensity = labels[lang][activity.intensity[0]];
      return `
        <article class="selector-result" style="animation-delay:${index * 45}ms">
          <div class="selector-result__meta">
            <span>${escapeHtml(primaryMedium)}</span>
            <span>${escapeHtml(primaryIntensity)}</span>
          </div>
          <h4>${escapeHtml(names[activity.id][lang])}</h4>
          <p>${escapeHtml(reason)}</p>
          <a href="${activity.href}">${escapeHtml(dictionary.view)}</a>
        </article>`;
    }).join('');

    root.querySelector('.adventure-selector__form').setAttribute('aria-label', dictionary.titleA + ' ' + dictionary.titleB);
  }

  root.querySelectorAll('[data-selector-group] [data-value]').forEach(button => {
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      const group = button.closest('[data-selector-group]').dataset.selectorGroup;
      state[group] = state[group] === button.dataset.value ? '' : button.dataset.value;
      try { sessionStorage.setItem('noext-adventure-selector', JSON.stringify(state)); } catch (_) { /* no-op */ }
      render();
    });
  });

  root.querySelector('form').addEventListener('reset', event => {
    event.preventDefault();
    Object.keys(state).forEach(key => { state[key] = ''; });
    try { sessionStorage.removeItem('noext-adventure-selector'); } catch (_) { /* no-op */ }
    render();
  });

  window.addEventListener('noext:languagechange', render);

  try {
    const saved = JSON.parse(sessionStorage.getItem('noext-adventure-selector') || '{}');
    Object.keys(state).forEach(key => {
      if (optionKeys[key].includes(saved[key])) state[key] = saved[key];
    });
  } catch (_) { /* no-op */ }

  render();
}());
