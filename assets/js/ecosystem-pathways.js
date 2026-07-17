(function () {
  'use strict';

  const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const pageConfig = {
    'actividades.html': { stage: 0, links: ['zones', 'safety', 'material', 'packs'] },
    'escuela.html': { stage: 1, links: ['activities', 'safety', 'material', 'logbook'] },
    'seguridad.html': { stage: 2, links: ['activities', 'material', 'zones', 'school'] },
    'material.html': { stage: 1, links: ['activities', 'rental', 'safety', 'school'] },
    'zonas.html': { stage: 0, links: ['activities', 'safety', 'packs', 'material'] },
    'packs.html': { stage: 0, links: ['activities', 'safety', 'material', 'logbook'] },
    'logbook.html': { stage: 4, links: ['activities', 'school', 'community', 'safety'] }
  };
  const config = pageConfig[page];
  if (!config) return;

  const supported = ['es', 'en', 'fr', 'de', 'it', 'pt'];
  const destinations = {
    activities: { href: 'actividades.html', title: { es: 'Explorar experiencias', en: 'Explore experiences', fr: 'Explorer les expériences', de: 'Erlebnisse entdecken', it: 'Esplora le esperienze', pt: 'Explorar experiências' } },
    zones: { href: 'zonas.html', title: { es: 'Leer el territorio', en: 'Read the territory', fr: 'Lire le territoire', de: 'Das Gebiet verstehen', it: 'Leggi il territorio', pt: 'Ler o território' } },
    safety: { href: 'seguridad.html', title: { es: 'Validar la seguridad', en: 'Validate safety', fr: 'Valider la sécurité', de: 'Sicherheit prüfen', it: 'Valuta la sicurezza', pt: 'Validar a segurança' } },
    material: { href: 'material.html', title: { es: 'Preparar el material', en: 'Prepare equipment', fr: 'Préparer le matériel', de: 'Ausrüstung vorbereiten', it: "Prepara l'attrezzatura", pt: 'Preparar o material' } },
    packs: { href: 'packs.html', title: { es: 'Combinar un pack', en: 'Combine a pack', fr: 'Composer un pack', de: 'Ein Paket kombinieren', it: 'Combina un pack', pt: 'Combinar um pack' } },
    school: { href: 'escuela.html', title: { es: 'Progresar en la Escuela', en: 'Progress through the School', fr: "Progresser dans l'École", de: 'In der Schule vorankommen', it: 'Progredisci nella Scuola', pt: 'Progredir na Escola' } },
    logbook: { href: 'logbook.html', title: { es: 'Registrar el aprendizaje', en: 'Record your learning', fr: "Enregistrer l'apprentissage", de: 'Lernen dokumentieren', it: "Registra l'apprendimento", pt: 'Registar a aprendizagem' } },
    community: { href: 'comunidad.html', title: { es: 'Conectar con la comunidad', en: 'Connect with the community', fr: 'Rejoindre la communauté', de: 'Mit der Community verbinden', it: 'Connettiti con la comunità', pt: 'Ligar-se à comunidade' } },
    rental: { href: 'alquiler.html', title: { es: 'Consultar alquiler', en: 'Check equipment rental', fr: 'Consulter la location', de: 'Verleih ansehen', it: 'Consulta il noleggio', pt: 'Consultar aluguer' } }
  };

  const ui = {
    es: {
      eyebrow: 'Conexiones del ecosistema', title: 'SIGUE TU RUTA NÓMADA',
      intro: 'Cada página forma parte de un mismo recorrido: descubrir, prepararse, validar, vivir y registrar. Continúa por el paso que tenga más sentido para ti.',
      stages: ['Descubrir', 'Preparar', 'Validar', 'Vivir', 'Registrar'], action: 'Abrir sección',
      descriptions: {
        activities: 'Compara disciplinas, intensidad, duración y requisitos reales del catálogo.',
        zones: 'Relaciona cada experiencia con el entorno, los accesos y las condiciones.',
        safety: 'Revisa preparación, riesgos, criterios de cancelación y documentación.',
        material: 'Distingue equipo personal, colectivo, obligatorio y recomendado.',
        packs: 'Combina actividades compatibles con tiempos y validaciones coherentes.',
        school: 'Entiende niveles, habilidades, progresión y formación relacionada.',
        logbook: 'Convierte la experiencia en historial, evidencias y próximos objetivos.',
        community: 'Descubre retos, historias y participación dentro del proyecto.',
        rental: 'Consulta qué material podría alquilarse y qué requiere supervisión.'
      }
    },
    en: {
      eyebrow: 'Ecosystem connections', title: 'CONTINUE YOUR NÓMADA JOURNEY',
      intro: 'Every page belongs to one journey: discover, prepare, validate, experience and record. Continue with the step that makes sense for you.',
      stages: ['Discover', 'Prepare', 'Validate', 'Experience', 'Record'], action: 'Open section',
      descriptions: {
        activities: 'Compare disciplines, intensity, duration and real catalogue requirements.',
        zones: 'Connect each experience with its environment, access and conditions.',
        safety: 'Review preparation, risks, cancellation criteria and documentation.',
        material: 'Distinguish personal, shared, mandatory and recommended equipment.',
        packs: 'Combine compatible activities with coherent timing and validation.',
        school: 'Understand levels, skills, progression and related training.',
        logbook: 'Turn the experience into history, evidence and next goals.',
        community: 'Discover challenges, stories and participation in the project.',
        rental: 'Check what could be rented and what requires supervision.'
      }
    },
    fr: {
      eyebrow: "Connexions de l'écosystème", title: 'POURSUIVEZ VOTRE PARCOURS NÓMADA',
      intro: 'Chaque page appartient au même parcours : découvrir, préparer, valider, vivre et enregistrer. Continuez avec l’étape qui vous convient.',
      stages: ['Découvrir', 'Préparer', 'Valider', 'Vivre', 'Enregistrer'], action: 'Ouvrir la section',
      descriptions: {
        activities: 'Comparez les disciplines, l’intensité, la durée et les exigences du catalogue.',
        zones: 'Reliez chaque expérience au milieu, aux accès et aux conditions.',
        safety: 'Consultez la préparation, les risques, les critères d’annulation et les documents.',
        material: 'Distinguez le matériel personnel, collectif, obligatoire et recommandé.',
        packs: 'Combinez des activités compatibles avec une planification cohérente.',
        school: 'Comprenez les niveaux, les compétences et la progression associée.',
        logbook: 'Transformez l’expérience en historique, preuves et prochains objectifs.',
        community: 'Découvrez les défis, les récits et la participation au projet.',
        rental: 'Consultez le matériel louable et celui qui exige une supervision.'
      }
    },
    de: {
      eyebrow: 'Verbindungen im Ökosystem', title: 'SETZE DEINEN NÓMADA-WEG FORT',
      intro: 'Jede Seite gehört zu einem Weg: entdecken, vorbereiten, prüfen, erleben und dokumentieren. Wähle den nächsten sinnvollen Schritt.',
      stages: ['Entdecken', 'Vorbereiten', 'Prüfen', 'Erleben', 'Dokumentieren'], action: 'Bereich öffnen',
      descriptions: {
        activities: 'Vergleiche Disziplinen, Intensität, Dauer und echte Anforderungen.',
        zones: 'Verbinde jedes Erlebnis mit Umgebung, Zugang und Bedingungen.',
        safety: 'Prüfe Vorbereitung, Risiken, Absagekriterien und Unterlagen.',
        material: 'Unterscheide persönliche, gemeinsame, Pflicht- und Empfehlungsausrüstung.',
        packs: 'Kombiniere passende Aktivitäten mit realistischer Planung.',
        school: 'Verstehe Niveaus, Fähigkeiten und die passende Entwicklung.',
        logbook: 'Mache aus Erlebnissen Verlauf, Nachweise und nächste Ziele.',
        community: 'Entdecke Aufgaben, Geschichten und Beteiligung am Projekt.',
        rental: 'Prüfe, was verliehen werden könnte und was Aufsicht braucht.'
      }
    },
    it: {
      eyebrow: "Connessioni dell'ecosistema", title: 'CONTINUA IL TUO PERCORSO NÓMADA',
      intro: 'Ogni pagina appartiene allo stesso percorso: scoprire, preparare, valutare, vivere e registrare. Continua con il passo più adatto a te.',
      stages: ['Scoprire', 'Preparare', 'Valutare', 'Vivere', 'Registrare'], action: 'Apri sezione',
      descriptions: {
        activities: 'Confronta discipline, intensità, durata e requisiti reali del catalogo.',
        zones: 'Collega ogni esperienza ad ambiente, accessi e condizioni.',
        safety: 'Controlla preparazione, rischi, criteri di annullamento e documenti.',
        material: 'Distingui attrezzatura personale, collettiva, obbligatoria e consigliata.',
        packs: 'Combina attività compatibili con tempi e verifiche coerenti.',
        school: 'Comprendi livelli, abilità, progressione e formazione collegata.',
        logbook: 'Trasforma l’esperienza in storico, prove e prossimi obiettivi.',
        community: 'Scopri sfide, storie e partecipazione nel progetto.',
        rental: 'Consulta cosa può essere noleggiato e cosa richiede supervisione.'
      }
    },
    pt: {
      eyebrow: 'Ligações do ecossistema', title: 'CONTINUE O SEU PERCURSO NÓMADA',
      intro: 'Cada página pertence ao mesmo percurso: descobrir, preparar, validar, viver e registar. Continue pelo passo que fizer mais sentido.',
      stages: ['Descobrir', 'Preparar', 'Validar', 'Viver', 'Registar'], action: 'Abrir secção',
      descriptions: {
        activities: 'Compare disciplinas, intensidade, duração e requisitos reais do catálogo.',
        zones: 'Relacione cada experiência com o ambiente, acessos e condições.',
        safety: 'Reveja preparação, riscos, critérios de cancelamento e documentação.',
        material: 'Distinga equipamento pessoal, coletivo, obrigatório e recomendado.',
        packs: 'Combine atividades compatíveis com tempos e validações coerentes.',
        school: 'Compreenda níveis, competências, progressão e formação relacionada.',
        logbook: 'Converta a experiência em histórico, evidências e próximos objetivos.',
        community: 'Descubra desafios, histórias e participação no projeto.',
        rental: 'Consulte o que pode ser alugado e o que requer supervisão.'
      }
    }
  };

  function currentLanguage() {
    let stored = '';
    try { stored = localStorage.getItem('noext-language') || ''; } catch (_) { /* no-op */ }
    return supported.includes(stored) ? stored : 'es';
  }

  function render(section) {
    const lang = currentLanguage();
    const dictionary = ui[lang];
    section.querySelector('[data-pathway-eyebrow]').textContent = dictionary.eyebrow;
    section.querySelector('[data-pathway-title]').textContent = dictionary.title;
    section.querySelector('[data-pathway-intro]').textContent = dictionary.intro;
    section.querySelector('[data-pathway-flow]').setAttribute('aria-label', dictionary.title);
    section.querySelector('[data-pathway-flow]').innerHTML = dictionary.stages.map((stage, index) =>
      `<span${index === config.stage ? ' class="is-current" aria-current="step"' : ''}>${stage}</span>`
    ).join('');
    section.querySelector('[data-pathway-grid]').innerHTML = config.links.map((key, index) => {
      const destination = destinations[key];
      return `<a class="ecosystem-pathway__card" href="${destination.href}">
        <span class="ecosystem-pathway__number">0${index + 1}</span>
        <h3>${destination.title[lang]}</h3>
        <p>${dictionary.descriptions[key]}</p>
        <span class="ecosystem-pathway__action">${dictionary.action}</span>
      </a>`;
    }).join('');
  }

  function mount() {
    if (document.querySelector('.ecosystem-pathway')) return;
    const main = document.querySelector('main') || document.body;
    const section = document.createElement('section');
    section.className = 'ecosystem-pathway';
    section.dataset.noTranslate = '';
    section.innerHTML = `<div class="container">
      <div class="ecosystem-pathway__head">
        <div>
          <span class="ecosystem-pathway__eyebrow" data-pathway-eyebrow></span>
          <h2 data-pathway-title></h2>
        </div>
        <p class="ecosystem-pathway__intro" data-pathway-intro></p>
      </div>
      <div class="ecosystem-pathway__flow" data-pathway-flow aria-label="Recorrido Nómada"></div>
      <div class="ecosystem-pathway__grid" data-pathway-grid></div>
    </div>`;
    main.appendChild(section);
    render(section);
    window.addEventListener('noext:languagechange', () => render(section));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.setTimeout(mount, 0), { once: true });
  } else {
    window.setTimeout(mount, 0);
  }
}());
