(function () {
  'use strict';

  const supported = ['es', 'en', 'fr', 'de', 'it', 'pt'];
  const state = { language: localStorage.getItem('noext-language') || 'es', filters: {} };

  const ui = {
    es: {
      nav: { home: 'Inicio', travel: 'Viajes' },
      hero: {
        kicker: 'Calendario estratégico de aventura',
        title: 'Viajes Nómada: el calendario de aventura extrema',
        subtitle: 'Fechas óptimas, destinos brutales y experiencias seleccionadas para vivir el mar, la montaña, el aire y la adrenalina dentro y fuera de España.',
        brand: 'Para gente que quiere aventura de verdad.',
        ctaPrimary: 'Explorar calendario',
        ctaSecondary: 'Ver destinos por actividad'
      },
      intro: {
        kicker: 'De Águilas al mundo',
        title: 'UN MAPA DE<br><span class="mar">POSIBILIDADES</span>',
        p1: 'NÓMADA EXTREMO nace en Águilas, Murcia, pero mira hacia España, Europa y el mundo. Esta página funciona como una guía de inspiración y planificación para saber cuándo encaja mejor cada aventura: buceo, kayak, snorkel, escalada, vía ferrata, barranquismo, parapente, paramotor, paratrike, paracaidismo, coasteering, cliff jumping, senderismo, trekking, BTT/MTB, espeleología, kitesurf, surf, paddle surf, puenting, experiencias naturistas, fotografía/vídeo y combinaciones mar + montaña.',
        quote: 'Hay destinos que no se visitan: se sobreviven, se graban en la piel y te cambian la forma de mirar el mundo.'
      },
      notice: {
        title: 'Planificación orientativa',
        text: 'Las fechas, destinos y experiencias mostradas son propuestas orientativas sujetas a disponibilidad, permisos, meteorología, normativa local, colaboradores autorizados y evolución real del proyecto NÓMADA EXTREMO. La contratación de viajes combinados, transporte o alojamiento requerirá cumplir la normativa turística aplicable.'
      },
      filters: {
        kicker: 'Filtros funcionales',
        title: 'ENCUENTRA TU<br><span class="mar">VENTANA IDEAL</span>',
        all: 'Todo',
        clear: 'Limpiar filtros',
        found: '{count} aventuras encontradas',
        empty: 'No hay aventuras con estos filtros. Prueba a limpiar algún criterio.',
        fields: { season: 'Fecha / temporada', scope: 'Ámbito', medium: 'Medio', activity: 'Actividad', level: 'Nivel', duration: 'Duración', type: 'Tipo', recording: 'Grabación' }
      },
      calendar: { kicker: 'Calendario anual', title: 'CUÁNDO<br><span class="arena">MOVERSE</span>' },
      safety: {
        kicker: 'Seguridad y sostenibilidad',
        title: 'VIAJAR CON CABEZA<br><span class="acento">TAMBIÉN ES AVENTURA</span>',
        card1Title: 'Criterio técnico',
        card1Text: 'Nada de improvisar barrancos, buceo, parapente, paramotor, paracaidismo, cliff jumping o espeleología sin profesionales, equipo, permisos y condiciones adecuadas.',
        card2Title: 'Entorno protegido',
        card2Text: 'No masificar zonas sensibles, respetar fauna y flora, revisar normativa local y evitar publicar ubicaciones delicadas si puede dañar el espacio natural.',
        card3Title: 'Documentación',
        card3Text: 'Antes de viajar se revisan meteorología, seguros, titulaciones, guías autorizados, permisos, material, salud, logística y alternativas.'
      },
      naturaleza: {
        kicker: 'Sublínea respetuosa',
        title: 'VIAJES<br><span class="mar">NATURALEZA NÓMADA</span>',
        text: 'Una línea enfocada en naturaleza, libertad corporal responsable, privacidad, playas autorizadas o toleradas, bienestar y conexión con el entorno. Siempre separada de deportes técnicos o de riesgo cuando sea necesario.',
        chip1: 'Rutas costeras', chip2: 'Calas', chip3: 'Fotografía natural', chip4: 'Baño', chip5: 'Snorkel suave', chip6: 'Desconexión'
      },
      labels: {
        region: 'País / región', best: 'Mejor fecha', activities: 'Actividades', level: 'Nivel', duration: 'Duración ideal', why: 'Por qué merece la pena', risk: 'A revisar', status: 'Estado', content: 'Contenido', view: 'Ver experiencia', save: 'Guardar destino', interest: 'Solicitar interés', detail: 'Me interesa esta aventura', material: 'Material necesario', safety: 'Condiciones de seguridad', check: 'Qué revisar antes de ir', youtube: 'Potencial YouTube/Instagram', materialText: 'Material específico según actividad, agua, protección solar, ropa por capas y equipo validado por proveedor.', checkText: 'Permisos, meteorología, seguros, guía titulado, normativa local, estado físico y plan alternativo.'
      }
    }
  };

  ui.en = clone(ui.es, {
    nav: { home: 'Home', travel: 'Travel' },
    hero: { kicker: 'Strategic adventure calendar', title: 'Nomad Trips: the extreme adventure calendar', subtitle: 'Optimal dates, powerful destinations and selected experiences to live sea, mountain, air and adrenaline in and beyond Spain.', brand: 'For people who want real adventure.', ctaPrimary: 'Explore calendar', ctaSecondary: 'See destinations by activity' },
    intro: { kicker: 'From Águilas to the world', title: 'A MAP OF<br><span class="mar">POSSIBILITIES</span>', p1: 'NÓMADA EXTREMO starts in Águilas, Murcia, but looks towards Spain, Europe and the world. This page is an inspiration and planning guide to understand when each adventure fits best: diving, kayak, snorkel, climbing, via ferrata, canyoning, paragliding, paramotor, paratrike, skydiving, coasteering, cliff jumping, hiking, trekking, MTB, caving, kitesurf, surf, paddle surf, bungee jumping, naturist experiences, photo/video and sea + mountain combinations.', quote: 'Some destinations are not visited: they are survived, marked on the skin and change how you look at the world.' },
    notice: { title: 'Guidance planning', text: 'Dates, destinations and experiences are guidance proposals subject to availability, permits, weather, local rules, authorised partners and the real evolution of NÓMADA EXTREMO. Travel packages, transport or accommodation would require compliance with applicable tourism regulations.' },
    filters: { kicker: 'Working filters', title: 'FIND YOUR<br><span class="mar">IDEAL WINDOW</span>', all: 'All', clear: 'Clear filters', found: '{count} adventures found', empty: 'No adventures match these filters. Try clearing one criterion.', fields: { season: 'Date / season', scope: 'Scope', medium: 'Medium', activity: 'Activity', level: 'Level', duration: 'Duration', type: 'Type', recording: 'Recording' } },
    calendar: { kicker: 'Annual calendar', title: 'WHEN TO<br><span class="arena">MOVE</span>' },
    safety: { kicker: 'Safety and sustainability', title: 'TRAVELLING WITH JUDGEMENT<br><span class="acento">IS ALSO ADVENTURE</span>', card1Title: 'Technical judgement', card1Text: 'No improvising canyoning, diving, paragliding, paramotor, skydiving, cliff jumping or caving without professionals, equipment, permits and suitable conditions.', card2Title: 'Protected environments', card2Text: 'Avoid overcrowding sensitive areas, respect wildlife and flora, review local rules and avoid publishing delicate locations when it may damage the place.', card3Title: 'Documentation', card3Text: 'Weather, insurance, qualifications, authorised guides, permits, equipment, health, logistics and alternatives must be checked before travelling.' },
    naturaleza: { kicker: 'Respectful line', title: 'NOMAD NATURE<br><span class="mar">TRIPS</span>', text: 'A line focused on nature, responsible body freedom, privacy, authorised or tolerated beaches, wellbeing and connection with the environment. Always separated from technical or risk sports when needed.', chip1: 'Coastal walks', chip2: 'Coves', chip3: 'Nature photography', chip4: 'Bathing', chip5: 'Soft snorkel', chip6: 'Disconnect' },
    labels: { region: 'Country / region', best: 'Best window', activities: 'Activities', level: 'Level', duration: 'Ideal duration', why: 'Why it matters', risk: 'To check', status: 'Status', content: 'Content', view: 'View experience', save: 'Save destination', interest: 'Request interest', detail: 'I am interested in this adventure', material: 'Required equipment', safety: 'Safety conditions', check: 'What to check before going', youtube: 'YouTube/Instagram potential', materialText: 'Specific equipment according to the activity, water, sun protection, layered clothing and gear validated by the provider.', checkText: 'Permits, weather, insurance, qualified guide, local rules, fitness and alternative plan.' }
  });
  ui.fr = clone(ui.es, {
    nav: { home: 'Accueil', travel: 'Voyages' },
    hero: { kicker: 'Calendrier stratégique d’aventure', title: 'Voyages Nomades : le calendrier de l’aventure extrême', subtitle: 'Dates optimales, destinations fortes et expériences sélectionnées pour vivre la mer, la montagne, l’air et l’adrénaline en Espagne et ailleurs.', brand: 'Pour ceux qui veulent une vraie aventure.', ctaPrimary: 'Explorer le calendrier', ctaSecondary: 'Voir par activité' },
    filters: { kicker: 'Filtres fonctionnels', title: 'TROUVER LA<br><span class="mar">BONNE FENÊTRE</span>', all: 'Tout', clear: 'Effacer les filtres', found: '{count} aventures trouvées', empty: 'Aucune aventure avec ces filtres.', fields: { season: 'Date / saison', scope: 'Zone', medium: 'Milieu', activity: 'Activité', level: 'Niveau', duration: 'Durée', type: 'Type', recording: 'Captation' } }
  });
  ui.de = clone(ui.en, {
    nav: { home: 'Startseite', travel: 'Reisen' },
    hero: { kicker: 'Strategischer Abenteuerkalender', title: 'Nomadenreisen: der Kalender für extreme Abenteuer', subtitle: 'Optimale Zeitfenster, starke Ziele und ausgewählte Erlebnisse für Meer, Berg, Luft und Adrenalin in Spanien und weltweit.', brand: 'Für Menschen, die echtes Abenteuer wollen.', ctaPrimary: 'Kalender ansehen', ctaSecondary: 'Ziele nach Aktivität' },
    filters: { kicker: 'Funktionale Filter', title: 'FINDE DEIN<br><span class="mar">IDEALES ZEITFENSTER</span>', all: 'Alle', clear: 'Filter löschen', found: '{count} Abenteuer gefunden', empty: 'Keine Abenteuer mit diesen Filtern.', fields: { season: 'Datum / Saison', scope: 'Bereich', medium: 'Medium', activity: 'Aktivität', level: 'Niveau', duration: 'Dauer', type: 'Typ', recording: 'Aufnahme' } }
  });
  ui.it = clone(ui.es, {
    nav: { home: 'Home', travel: 'Viaggi' },
    hero: { kicker: 'Calendario strategico di avventura', title: 'Viaggi Nomadi: il calendario dell’avventura estrema', subtitle: 'Date ottimali, destinazioni potenti ed esperienze selezionate per vivere mare, montagna, aria e adrenalina in Spagna e nel mondo.', brand: 'Per chi vuole avventura vera.', ctaPrimary: 'Esplora calendario', ctaSecondary: 'Vedi destinazioni per attività' },
    filters: { kicker: 'Filtri funzionali', title: 'TROVA LA TUA<br><span class="mar">FINESTRA IDEALE</span>', all: 'Tutto', clear: 'Pulisci filtri', found: '{count} avventure trovate', empty: 'Nessuna avventura con questi filtri.', fields: { season: 'Data / stagione', scope: 'Ambito', medium: 'Ambiente', activity: 'Attività', level: 'Livello', duration: 'Durata', type: 'Tipo', recording: 'Ripresa' } }
  });
  ui.pt = clone(ui.es, {
    nav: { home: 'Início', travel: 'Viagens' },
    hero: { kicker: 'Calendário estratégico de aventura', title: 'Viagens Nómadas: o calendário da aventura extrema', subtitle: 'Datas ideais, destinos fortes e experiências selecionadas para viver mar, montanha, ar e adrenalina em Espanha e no mundo.', brand: 'Para quem quer aventura de verdade.', ctaPrimary: 'Explorar calendário', ctaSecondary: 'Ver destinos por atividade' },
    filters: { kicker: 'Filtros funcionais', title: 'ENCONTRA A TUA<br><span class="mar">JANELA IDEAL</span>', all: 'Tudo', clear: 'Limpar filtros', found: '{count} aventuras encontradas', empty: 'Não há aventuras com estes filtros.', fields: { season: 'Data / temporada', scope: 'Âmbito', medium: 'Meio', activity: 'Atividade', level: 'Nível', duration: 'Duração', type: 'Tipo', recording: 'Gravação' } }
  });

  Object.assign(ui.fr.labels, { region:'Pays / région', best:'Meilleure période', activities:'Activités', level:'Niveau', duration:'Durée idéale', risk:'À vérifier', view:'Voir expérience', save:'Enregistrer', detail:'Cette aventure m’intéresse', material:'Matériel nécessaire', safety:'Conditions de sécurité', check:'À vérifier avant de partir', youtube:'Potentiel YouTube/Instagram', materialText:'Matériel spécifique selon l’activité, eau, protection solaire, vêtements en couches et équipement validé par le prestataire.', checkText:'Autorisations, météo, assurances, guide qualifié, réglementation locale, condition physique et plan alternatif.' });
  Object.assign(ui.de.labels, { region:'Land / Region', best:'Bestes Zeitfenster', activities:'Aktivitäten', level:'Niveau', duration:'Ideale Dauer', risk:'Zu prüfen', view:'Erlebnis ansehen', save:'Ziel speichern', detail:'Ich interessiere mich für dieses Abenteuer', material:'Benötigte Ausrüstung', safety:'Sicherheitsbedingungen', check:'Vor der Reise prüfen', youtube:'YouTube/Instagram-Potenzial', materialText:'Spezifische Ausrüstung je nach Aktivität, Wasser, Sonnenschutz, Kleidung in Schichten und vom Anbieter validierte Ausrüstung.', checkText:'Genehmigungen, Wetter, Versicherungen, qualifizierter Guide, lokale Regeln, Fitness und Alternativplan.' });
  Object.assign(ui.it.labels, { region:'Paese / regione', best:'Periodo migliore', activities:'Attività', level:'Livello', duration:'Durata ideale', risk:'Da verificare', view:'Vedi esperienza', save:'Salva destinazione', detail:'Mi interessa questa avventura', material:'Materiale necessario', safety:'Condizioni di sicurezza', check:'Cosa verificare prima di partire', youtube:'Potenziale YouTube/Instagram', materialText:'Materiale specifico secondo l’attività, acqua, protezione solare, abbigliamento a strati e attrezzatura validata dal fornitore.', checkText:'Permessi, meteo, assicurazioni, guida qualificata, normativa locale, stato fisico e piano alternativo.' });
  Object.assign(ui.pt.labels, { region:'País / região', best:'Melhor janela', activities:'Atividades', level:'Nível', duration:'Duração ideal', risk:'A verificar', view:'Ver experiência', save:'Guardar destino', detail:'Tenho interesse nesta aventura', material:'Material necessário', safety:'Condições de segurança', check:'O que verificar antes de ir', youtube:'Potencial YouTube/Instagram', materialText:'Material específico conforme a atividade, água, proteção solar, roupa por camadas e equipamento validado pelo fornecedor.', checkText:'Permissões, meteorologia, seguros, guia qualificado, normativa local, condição física e plano alternativo.' });
  Object.assign(ui.fr, {
    intro: { kicker:'D’Águilas au monde', title:'UNE CARTE DE<br><span class="mar">POSSIBILITÉS</span>', p1:'NÓMADA EXTREMO naît à Águilas, Murcie, mais regarde vers l’Espagne, l’Europe et le monde. Cette page sert de guide d’inspiration et de planification pour choisir le meilleur moment pour chaque aventure : plongée, kayak, snorkeling, escalade, via ferrata, canyoning, parapente, paramoteur, paratrike, parachutisme, coasteering, cliff jumping, randonnée, trekking, VTT, spéléologie, kitesurf, surf, paddle surf, saut pendulaire, expériences naturistes, photo/vidéo et combinaisons mer + montagne.', quote:'Il y a des destinations que l’on ne visite pas : on les traverse, elles restent dans la peau et changent le regard.' },
    notice: { title:'Planification indicative', text:'Les dates, destinations et expériences sont des propositions indicatives soumises à disponibilité, autorisations, météo, réglementation locale, collaborateurs habilités et évolution réelle du projet NÓMADA EXTREMO. Les voyages combinés, transport ou hébergement exigeraient de respecter la réglementation touristique applicable.' },
    calendar: { kicker:'Calendrier annuel', title:'QUAND<br><span class="arena">PARTIR</span>' },
    safety: { kicker:'Sécurité et durabilité', title:'VOYAGER AVEC DISCERNEMENT<br><span class="acento">EST AUSSI UNE AVENTURE</span>', card1Title:'Critère technique', card1Text:'Pas d’improvisation en canyoning, plongée, parapente, paramoteur, parachutisme, cliff jumping ou spéléologie sans professionnels, équipement, autorisations et bonnes conditions.', card2Title:'Milieux protégés', card2Text:'Éviter de surcharger les zones sensibles, respecter la faune et la flore, vérifier la réglementation locale et ne pas publier d’emplacements délicats.', card3Title:'Documentation', card3Text:'Avant le départ : météo, assurances, qualifications, guides autorisés, permis, matériel, santé, logistique et alternatives.' },
    naturaleza: { kicker:'Ligne respectueuse', title:'VOYAGES<br><span class="mar">NATURE NOMADE</span>', text:'Une ligne centrée sur la nature, la liberté corporelle responsable, la confidentialité, les plages autorisées ou tolérées, le bien-être et la connexion au milieu.', chip1:'Sentiers côtiers', chip2:'Criques', chip3:'Photo nature', chip4:'Baignade', chip5:'Snorkeling doux', chip6:'Déconnexion' }
  });
  Object.assign(ui.de, {
    intro: { kicker:'Von Águilas in die Welt', title:'EINE KARTE DER<br><span class="mar">MÖGLICHKEITEN</span>', p1:'NÓMADA EXTREMO entsteht in Águilas, Murcia, blickt aber nach Spanien, Europa und in die Welt. Diese Seite ist ein Inspirations- und Planungsleitfaden für den besten Zeitpunkt jeder Aktivität: Tauchen, Kajak, Schnorcheln, Klettern, Klettersteig, Canyoning, Gleitschirm, Paramotor, Paratrike, Fallschirmspringen, Coasteering, Cliff Jumping, Wandern, Trekking, MTB, Höhlen, Kitesurf, Surf, Paddle Surf, Bungee, Naturismus, Foto/Video und Meer + Berg.', quote:'Manche Ziele besucht man nicht: man übersteht sie, trägt sie auf der Haut und sieht die Welt anders.' },
    notice: { title:'Orientierende Planung', text:'Daten, Ziele und Erlebnisse sind orientierende Vorschläge, abhängig von Verfügbarkeit, Genehmigungen, Wetter, lokalen Regeln, autorisierten Partnern und der realen Entwicklung von NÓMADA EXTREMO. Pauschalreisen, Transport oder Unterkunft erfordern die Einhaltung der geltenden Tourismusregeln.' },
    calendar: { kicker:'Jahreskalender', title:'WANN<br><span class="arena">LOSZIEHEN</span>' },
    safety: { kicker:'Sicherheit und Nachhaltigkeit', title:'MIT KOPF REISEN<br><span class="acento">IST AUCH ABENTEUER</span>', card1Title:'Technisches Urteil', card1Text:'Kein improvisiertes Canyoning, Tauchen, Gleitschirmfliegen, Paramotor, Fallschirmspringen, Cliff Jumping oder Höhlentouren ohne Profis, Ausrüstung, Genehmigungen und passende Bedingungen.', card2Title:'Geschützte Räume', card2Text:'Sensible Orte nicht überlasten, Fauna und Flora respektieren, lokale Regeln prüfen und empfindliche Orte nicht veröffentlichen.', card3Title:'Dokumentation', card3Text:'Vor der Reise: Wetter, Versicherungen, Qualifikationen, autorisierte Guides, Genehmigungen, Material, Gesundheit, Logistik und Alternativen.' },
    naturaleza: { kicker:'Respektvolle Linie', title:'REISEN<br><span class="mar">NOMADISCHE NATUR</span>', text:'Eine Linie für Natur, verantwortliche Körperfreiheit, Privatsphäre, autorisierte oder tolerierte Strände, Wohlbefinden und Verbindung zur Umgebung.', chip1:'Küstenrouten', chip2:'Buchten', chip3:'Naturfoto', chip4:'Baden', chip5:'Sanftes Schnorcheln', chip6:'Abschalten' }
  });
  Object.assign(ui.it, {
    intro: { kicker:'Da Águilas al mondo', title:'UNA MAPPA DI<br><span class="mar">POSSIBILITÀ</span>', p1:'NÓMADA EXTREMO nasce ad Águilas, Murcia, ma guarda alla Spagna, all’Europa e al mondo. Questa pagina è una guida di ispirazione e pianificazione per capire quando vivere al meglio ogni avventura: immersioni, kayak, snorkeling, arrampicata, via ferrata, canyoning, parapendio, paramotore, paratrike, paracadutismo, coasteering, cliff jumping, trekking, MTB, speleologia, kitesurf, surf, paddle surf, bungee, naturismo, foto/video e mare + montagna.', quote:'Ci sono destinazioni che non si visitano: si attraversano, restano sulla pelle e cambiano lo sguardo.' },
    notice: { title:'Pianificazione orientativa', text:'Date, destinazioni ed esperienze sono proposte orientative soggette a disponibilità, permessi, meteo, normativa locale, collaboratori autorizzati ed evoluzione reale del progetto NÓMADA EXTREMO. Viaggi combinati, trasporto o alloggio richiederanno il rispetto della normativa turistica applicabile.' },
    calendar: { kicker:'Calendario annuale', title:'QUANDO<br><span class="arena">PARTIRE</span>' },
    safety: { kicker:'Sicurezza e sostenibilità', title:'VIAGGIARE CON TESTA<br><span class="acento">È ANCHE AVVENTURA</span>', card1Title:'Criterio tecnico', card1Text:'Niente canyoning, immersioni, parapendio, paramotore, paracadutismo, cliff jumping o speleologia improvvisati senza professionisti, attrezzatura, permessi e condizioni adeguate.', card2Title:'Ambienti protetti', card2Text:'Non sovraccaricare zone sensibili, rispettare fauna e flora, verificare la normativa locale e non pubblicare luoghi delicati.', card3Title:'Documentazione', card3Text:'Prima di partire: meteo, assicurazioni, qualifiche, guide autorizzate, permessi, materiale, salute, logistica e alternative.' },
    naturaleza: { kicker:'Linea rispettosa', title:'VIAGGI<br><span class="mar">NATURA NOMADE</span>', text:'Una linea centrata su natura, libertà corporea responsabile, privacy, spiagge autorizzate o tollerate, benessere e connessione con l’ambiente.', chip1:'Percorsi costieri', chip2:'Calette', chip3:'Foto natura', chip4:'Bagno', chip5:'Snorkel soft', chip6:'Disconnessione' }
  });
  Object.assign(ui.pt, {
    intro: { kicker:'De Águilas ao mundo', title:'UM MAPA DE<br><span class="mar">POSSIBILIDADES</span>', p1:'NÓMADA EXTREMO nasce em Águilas, Murcia, mas olha para Espanha, Europa e o mundo. Esta página funciona como guia de inspiração e planeamento para saber quando encaixa melhor cada aventura: mergulho, kayak, snorkel, escalada, via ferrata, canyoning, parapente, paramotor, paratrike, paraquedismo, coasteering, cliff jumping, caminhadas, trekking, BTT/MTB, espeleologia, kitesurf, surf, paddle surf, bungee, naturismo, fotografia/vídeo e mar + montanha.', quote:'Há destinos que não se visitam: atravessam-se, ficam na pele e mudam a forma de olhar o mundo.' },
    notice: { title:'Planeamento orientativo', text:'Datas, destinos e experiências são propostas orientativas sujeitas a disponibilidade, permissões, meteorologia, normativa local, colaboradores autorizados e evolução real do projeto NÓMADA EXTREMO. Viagens combinadas, transporte ou alojamento exigirão cumprir a normativa turística aplicável.' },
    calendar: { kicker:'Calendário anual', title:'QUANDO<br><span class="arena">PARTIR</span>' },
    safety: { kicker:'Segurança e sustentabilidade', title:'VIAJAR COM CABEÇA<br><span class="acento">TAMBÉM É AVENTURA</span>', card1Title:'Critério técnico', card1Text:'Nada de improvisar canyoning, mergulho, parapente, paramotor, paraquedismo, cliff jumping ou espeleologia sem profissionais, equipamento, permissões e condições adequadas.', card2Title:'Ambientes protegidos', card2Text:'Não massificar zonas sensíveis, respeitar fauna e flora, rever a normativa local e evitar publicar locais delicados.', card3Title:'Documentação', card3Text:'Antes de viajar: meteorologia, seguros, qualificações, guias autorizados, permissões, material, saúde, logística e alternativas.' },
    naturaleza: { kicker:'Linha respeitosa', title:'VIAGENS<br><span class="mar">NATUREZA NÓMADA</span>', text:'Uma linha focada na natureza, liberdade corporal responsável, privacidade, praias autorizadas ou toleradas, bem-estar e ligação ao ambiente.', chip1:'Rotas costeiras', chip2:'Calas', chip3:'Fotografia natural', chip4:'Banho', chip5:'Snorkel suave', chip6:'Desconexão' }
  });

  const languageText = {
    en: {
      summary: item => `${item.name} is a selected NÓMADA EXTREMO destination for ${item.activities.slice(0, 3).join(', ')}, with an optimal window around ${item.best}.`,
      risk: 'Check weather, permits, authorised providers, insurance, group level, equipment and local regulations before planning.',
      saved: 'Saved'
    },
    fr: {
      summary: item => `${item.name} est une destination sélectionnée par NÓMADA EXTREMO pour ${item.activities.slice(0, 3).join(', ')}, avec une fenêtre idéale autour de ${item.best}.`,
      risk: 'Vérifier météo, autorisations, prestataires habilités, assurances, niveau du groupe, matériel et réglementation locale.',
      saved: 'Enregistré'
    },
    de: {
      summary: item => `${item.name} ist ein ausgewähltes Ziel von NÓMADA EXTREMO für ${item.activities.slice(0, 3).join(', ')} mit idealem Zeitfenster um ${item.best}.`,
      risk: 'Wetter, Genehmigungen, autorisierte Anbieter, Versicherungen, Gruppenniveau, Ausrüstung und lokale Regeln prüfen.',
      saved: 'Gespeichert'
    },
    it: {
      summary: item => `${item.name} è una destinazione selezionata da NÓMADA EXTREMO per ${item.activities.slice(0, 3).join(', ')}, con finestra ideale intorno a ${item.best}.`,
      risk: 'Verificare meteo, permessi, fornitori autorizzati, assicurazioni, livello del gruppo, materiale e normativa locale.',
      saved: 'Salvato'
    },
    pt: {
      summary: item => `${item.name} é um destino selecionado pela NÓMADA EXTREMO para ${item.activities.slice(0, 3).join(', ')}, com janela ideal em ${item.best}.`,
      risk: 'Verificar meteorologia, permissões, fornecedores autorizados, seguros, nível do grupo, material e normativa local.',
      saved: 'Guardado'
    }
  };

  const tax = {
    season: ['invierno', 'primavera', 'verano', 'otoño', 'todo el año'],
    scope: ['local', 'Región de Murcia', 'nacional', 'Europa', 'internacional'],
    medium: ['mar', 'montaña', 'aire', 'vertical', 'subterráneo', 'mixto', 'naturista'],
    activity: ['buceo', 'snorkel', 'kayak', 'paddle surf', 'coasteering', 'cliff jumping', 'senderismo', 'trekking', 'BTT/MTB', 'escalada', 'vía ferrata', 'barranquismo', 'espeleología', 'parapente', 'paramotor', 'paratrike', 'paracaidismo', 'kitesurf', 'surf', 'puenting', 'fotografía/vídeo'],
    level: ['iniciación', 'intermedio', 'avanzado', 'experto'],
    duration: ['1 día', 'fin de semana', '3-5 días', '1 semana', 'gran viaje'],
    type: ['experiencia propia', 'colaboración', 'inspiración futura', 'formación/escuela'],
    recording: ['GoPro', 'dron', 'foto profesional', 'vídeo aventura', 'contenido YouTube/Instagram']
  };

  const calendar = [
    ['Enero-Febrero', 'Canarias, Costa Blanca, El Chorro, Red Sea, Dubái, senderismo suave, escalada de invierno, buceo de invierno y formación.'],
    ['Marzo-Abril', 'Costa Blanca, El Chorro, Cabo de Gata, Madeira, Red Sea, escalada, senderismo, vía ferrata y barrancos según caudal.'],
    ['Mayo-Junio', 'Águilas, Cabo de Gata, Cabo de Palos, Sierra de Guara, Azores, kayak, snorkel, buceo, barranquismo, coasteering y cliff jumping controlado.'],
    ['Julio-Agosto', 'Águilas, Cabo de Gata, Cabo de Palos, Sierra de Guara, Empuriabrava, acuáticas, paracaidismo, barranquismo acuático y snorkel. Evitar horas fuertes de calor.'],
    ['Septiembre-Octubre', 'Ventana global potente: buceo, Cabo de Palos, Cabo de Gata, escalada, barranquismo, Madeira, Red Sea, rutas costeras y viajes europeos.'],
    ['Noviembre-Diciembre', 'Canarias, Costa Blanca, El Chorro, Dubái, Red Sea, senderismo, escalada, rutas suaves, experiencias internacionales y planificación del año siguiente.']
  ];

  const calendarLocales = {
    en: [
      ['January-February', 'Canary Islands, Costa Blanca, El Chorro, Red Sea, Dubai, easy hiking, winter climbing, winter diving and training.'],
      ['March-April', 'Costa Blanca, El Chorro, Cabo de Gata, Madeira, Red Sea, climbing, hiking, via ferrata and canyoning depending on water flow.'],
      ['May-June', 'Águilas, Cabo de Gata, Cabo de Palos, Sierra de Guara, Azores, kayak, snorkel, diving, canyoning, coasteering and controlled cliff jumping.'],
      ['July-August', 'Águilas, Cabo de Gata, Cabo de Palos, Sierra de Guara, Empuriabrava, water activities, skydiving, aquatic canyoning and snorkel. Avoid peak heat hours.'],
      ['September-October', 'Powerful global window: diving, Cabo de Palos, Cabo de Gata, climbing, canyoning, Madeira, Red Sea, coastal routes and European trips.'],
      ['November-December', 'Canary Islands, Costa Blanca, El Chorro, Dubai, Red Sea, hiking, climbing, easy routes, international experiences and next-year planning.']
    ],
    fr: [
      ['Janvier-février', 'Canaries, Costa Blanca, El Chorro, mer Rouge, Dubaï, randonnée douce, escalade hivernale, plongée d’hiver et formation.'],
      ['Mars-avril', 'Costa Blanca, El Chorro, Cabo de Gata, Madère, mer Rouge, escalade, randonnée, via ferrata et canyoning selon le débit.'],
      ['Mai-juin', 'Águilas, Cabo de Gata, Cabo de Palos, Sierra de Guara, Açores, kayak, snorkeling, plongée, canyoning, coasteering et cliff jumping contrôlé.'],
      ['Juillet-août', 'Águilas, Cabo de Gata, Cabo de Palos, Sierra de Guara, Empuriabrava, activités aquatiques, parachutisme, canyoning aquatique et snorkeling. Éviter les heures de forte chaleur.'],
      ['Septembre-octobre', 'Grande fenêtre globale : plongée, Cabo de Palos, Cabo de Gata, escalade, canyoning, Madère, mer Rouge, routes côtières et voyages européens.'],
      ['Novembre-décembre', 'Canaries, Costa Blanca, El Chorro, Dubaï, mer Rouge, randonnée, escalade, routes douces, expériences internationales et planification de l’année suivante.']
    ],
    de: [
      ['Januar-Februar', 'Kanarische Inseln, Costa Blanca, El Chorro, Rotes Meer, Dubai, leichte Wanderungen, Winterklettern, Wintertauchen und Ausbildung.'],
      ['März-April', 'Costa Blanca, El Chorro, Cabo de Gata, Madeira, Rotes Meer, Klettern, Wandern, Klettersteig und Canyoning je nach Wasserstand.'],
      ['Mai-Juni', 'Águilas, Cabo de Gata, Cabo de Palos, Sierra de Guara, Azoren, Kajak, Schnorcheln, Tauchen, Canyoning, Coasteering und kontrolliertes Cliff Jumping.'],
      ['Juli-August', 'Águilas, Cabo de Gata, Cabo de Palos, Sierra de Guara, Empuriabrava, Wasseraktivitäten, Fallschirmspringen, Wasser-Canyoning und Schnorcheln. Starke Hitze meiden.'],
      ['September-Oktober', 'Starkes globales Zeitfenster: Tauchen, Cabo de Palos, Cabo de Gata, Klettern, Canyoning, Madeira, Rotes Meer, Küstenrouten und Europareisen.'],
      ['November-Dezember', 'Kanarische Inseln, Costa Blanca, El Chorro, Dubai, Rotes Meer, Wandern, Klettern, leichte Routen, internationale Erlebnisse und Planung fürs nächste Jahr.']
    ],
    it: [
      ['Gennaio-febbraio', 'Canarie, Costa Blanca, El Chorro, Mar Rosso, Dubai, trekking leggero, arrampicata invernale, immersioni invernali e formazione.'],
      ['Marzo-aprile', 'Costa Blanca, El Chorro, Cabo de Gata, Madeira, Mar Rosso, arrampicata, trekking, via ferrata e canyoning secondo portata.'],
      ['Maggio-giugno', 'Águilas, Cabo de Gata, Cabo de Palos, Sierra de Guara, Azzorre, kayak, snorkel, immersioni, canyoning, coasteering e cliff jumping controllato.'],
      ['Luglio-agosto', 'Águilas, Cabo de Gata, Cabo de Palos, Sierra de Guara, Empuriabrava, attività acquatiche, paracadutismo, canyoning acquatico e snorkel. Evitare le ore più calde.'],
      ['Settembre-ottobre', 'Grande finestra globale: immersioni, Cabo de Palos, Cabo de Gata, arrampicata, canyoning, Madeira, Mar Rosso, rotte costiere e viaggi europei.'],
      ['Novembre-dicembre', 'Canarie, Costa Blanca, El Chorro, Dubai, Mar Rosso, trekking, arrampicata, percorsi dolci, esperienze internazionali e pianificazione dell’anno successivo.']
    ],
    pt: [
      ['Janeiro-fevereiro', 'Canárias, Costa Blanca, El Chorro, Mar Vermelho, Dubai, caminhadas suaves, escalada de inverno, mergulho de inverno e formação.'],
      ['Março-abril', 'Costa Blanca, El Chorro, Cabo de Gata, Madeira, Mar Vermelho, escalada, caminhadas, via ferrata e canyoning conforme caudal.'],
      ['Maio-junho', 'Águilas, Cabo de Gata, Cabo de Palos, Sierra de Guara, Açores, kayak, snorkel, mergulho, canyoning, coasteering e cliff jumping controlado.'],
      ['Julho-agosto', 'Águilas, Cabo de Gata, Cabo de Palos, Sierra de Guara, Empuriabrava, atividades aquáticas, paraquedismo, canyoning aquático e snorkel. Evitar horas de maior calor.'],
      ['Setembro-outubro', 'Janela global forte: mergulho, Cabo de Palos, Cabo de Gata, escalada, canyoning, Madeira, Mar Vermelho, rotas costeiras e viagens europeias.'],
      ['Novembro-dezembro', 'Canárias, Costa Blanca, El Chorro, Dubai, Mar Vermelho, caminhadas, escalada, rotas suaves, experiências internacionais e planeamento do ano seguinte.']
    ]
  };

  const destinations = [
    d('Águilas, Calabardina e Isla del Fraile','España / Región de Murcia','mayo-junio · septiembre-octubre',['snorkel','kayak','paddle surf','coasteering','cliff jumping','fotografía/vídeo'],['iniciación','intermedio','avanzado'],'fin de semana','Base principal NÓMADA EXTREMO, con costa, calas, roca, mar y montaña muy cerca.','Oleaje, calor, accesos, salidas del agua, permisos y horas de menor exposición solar.','experiencia propia','brutal',['local','Región de Murcia'],['mar','mixto']),
    d('Águilas · paramotor y paratrike','España / Región de Murcia','primavera · otoño · invierno suave',['paramotor','paratrike','fotografía/vídeo'],['iniciación','intermedio'],'1 día','Ubicación principal para vuelos panorámicos, contenido audiovisual y lectura aérea del litoral.','Viento, rachas, espacio permitido, operador autorizado, peso y meteo estable.','colaboración','alto',['local','Región de Murcia'],['aire']),
    d('Cabo de Palos · Islas Hormigas','España / Murcia','mayo-octubre · septiembre-octubre top',['buceo','snorkel','fotografía/vídeo'],['iniciación','intermedio','avanzado'],'fin de semana','Uno de los grandes puntos de referencia mediterráneos para buceo y fotografía submarina.','Centro autorizado, estado del mar, titulación, salud, profundidad y planificación tras inmersión.','colaboración','alto',['Región de Murcia','nacional'],['mar']),
    d('Cabo de Gata · Las Negras / San José / Los Escullos','España / Andalucía','abril-junio · septiembre-octubre',['kayak','snorkel','senderismo','fotografía/vídeo'],['iniciación','intermedio'],'fin de semana','Paisaje volcánico, calas, rutas costeras y naturaleza mediterránea de alto impacto visual.','Viento, oleaje, calor, accesos, protección del parque y permisos cuando proceda.','inspiración futura','alto',['nacional'],['mar','montaña','mixto']),
    d('Sierra Espuña / interior de Murcia','España / Región de Murcia','otoño · invierno · primavera',['senderismo','trekking','BTT/MTB','escalada','fotografía/vídeo'],['iniciación','intermedio','avanzado'],'1 día','Terreno perfecto para formación en medio natural, orientación, rutas y progresión de montaña.','Calor, tormentas, incendios, agua disponible, desnivel y adaptación del grupo.','experiencia propia','medio',['Región de Murcia'],['montaña','vertical']),
    d('Costa Blanca / Alicante','España','noviembre-abril · primavera · otoño',['escalada','vía ferrata','senderismo','parapente'],['iniciación','intermedio','avanzado'],'fin de semana','Roca, clima amable, rutas verticales y cultura mediterránea para viajar fuera del verano.','Meteo, permisos, zonas autorizadas, exposición solar y profesionales cualificados.','colaboración','alto',['nacional'],['montaña','vertical','aire']),
    d('El Chorro / Caminito del Rey / Málaga','España / Andalucía','febrero-abril · octubre-noviembre',['escalada','vía ferrata','senderismo'],['intermedio','avanzado','experto'],'3-5 días','Aventura vertical clásica, paredes, ferratas y rutas icónicas con mucha personalidad.','Calor, viento, reservas, permisos, experiencia previa y ratios reducidos.','inspiración futura','alto',['nacional'],['vertical','montaña']),
    d('Sierra de Guara / Huesca','España / Aragón','mayo-septiembre',['barranquismo','senderismo','fotografía/vídeo'],['iniciación','intermedio','avanzado','experto'],'3-5 días','Referencia nacional para barranquismo, agua, roca, caudales y progresión técnica.','Caudal, tormentas aguas arriba, hipotermia, escapes, permisos y guía cualificado.','colaboración','brutal',['nacional'],['mar','vertical','mixto']),
    d('Empuriabrava / Costa Brava','España / Cataluña','primavera · verano · otoño',['paracaidismo','fotografía/vídeo'],['iniciación','avanzado','experto'],'fin de semana','Zona icónica de paracaidismo, tándem, escuela AFF, túnel de viento y vídeo extremo.','Viento, nubosidad, centro autorizado, documentación, peso, salud y operativa aérea.','colaboración','brutal',['nacional'],['aire']),
    d('Tarifa / Cádiz','España / Andalucía','primavera · verano · otoño',['kitesurf','surf','fotografía/vídeo'],['iniciación','intermedio','avanzado'],'3-5 días','Capital del viento, mar abierto, escuelas especializadas y cultura waterman.','Levante/Poniente, zona despejada, escuela autorizada, nivel y tráfico en el agua.','colaboración','alto',['nacional'],['mar']),
    d('Canarias · Tenerife, El Hierro, Lanzarote y La Palma','España / Canarias','todo el año · otoño-invierno-primavera',['buceo','snorkel','senderismo','parapente','barranquismo','fotografía/vídeo'],['iniciación','intermedio','avanzado'],'1 semana','Volcanes, mar, aire, senderos, aguas claras y escapada ideal cuando la península enfría.','Alisios, espacios protegidos, permisos, guía local, profundidad y logística insular.','inspiración futura','brutal',['nacional'],['mar','montaña','aire','mixto']),
    d('Madeira / Portugal','Portugal','abril-octubre',['senderismo','barranquismo','coasteering','fotografía/vídeo'],['iniciación','intermedio','avanzado'],'3-5 días','Levadas, selva atlántica, barrancos, costa salvaje y fotografía natural intensa.','Estado oficial de senderos, reservas, lluvia, caudal, vértigo y guías locales.','inspiración futura','brutal',['Europa'],['montaña','mar','mixto']),
    d('Interlaken / Suiza','Suiza','todo el año · mayo-octubre multiaventura',['parapente','barranquismo','paracaidismo','kayak','senderismo'],['iniciación','intermedio','avanzado'],'3-5 días','Uno de los grandes hubs europeos de aventura integral, agua, aire y Alpes.','Coste, meteo alpina, proveedores autorizados, permisos, nieve y logística.','inspiración futura','brutal',['Europa'],['aire','montaña','mixto']),
    d('Dolomitas / Cortina d’Ampezzo','Italia','junio-septiembre',['vía ferrata','trekking','escalada','fotografía/vídeo'],['intermedio','avanzado','experto'],'1 semana','Ferratas históricas, refugios, roca alpina y paisaje de montaña muy técnico.','Nieve residual, tormentas, refugios, exposición, experiencia previa y guía cualificado.','inspiración futura','brutal',['Europa'],['montaña','vertical']),
    d('Kalymnos / Grecia','Grecia','abril-mayo · septiembre-noviembre',['escalada','snorkel','fotografía/vídeo'],['iniciación','intermedio','avanzado'],'1 semana','Escalada deportiva mediterránea, viaje de roca, mar y comunidad internacional.','Calor, sectores, grados, seguros, accesos, caídas y respeto al entorno.','inspiración futura','alto',['Europa'],['vertical','mar']),
    d('Azores / Portugal','Portugal','abril-octubre',['buceo','snorkel','senderismo','barranquismo','fotografía/vídeo'],['iniciación','intermedio','avanzado'],'1 semana','Islas verdes, océano, cetáceos, volcanes y aventura natural de alto valor.','Meteo atlántica, mar, proveedores, reservas, permisos y protección de fauna.','inspiración futura','brutal',['Europa'],['mar','montaña','mixto']),
    d('Red Sea · Sharm el-Sheikh, Dahab, Marsa Alam','Egipto','marzo-mayo · septiembre-noviembre',['buceo','snorkel','fotografía/vídeo'],['iniciación','intermedio','avanzado'],'1 semana','Agua clara, arrecifes, freediving, buceo y fotografía submarina de primer nivel.','Calor, centro autorizado, salud, profundidad, seguros, vuelos tras inmersión y normativa local.','inspiración futura','brutal',['internacional'],['mar']),
    d('Dubái / Emiratos Árabes','Emiratos Árabes','noviembre-marzo',['paracaidismo','fotografía/vídeo'],['iniciación','avanzado'],'3-5 días','Aventura premium, salto sobre Palm Jumeirah, desierto y contenido audiovisual extremo.','Calor, proveedor autorizado, documentación, peso, meteo, normativa y coste.','inspiración futura','brutal',['internacional'],['aire','mixto']),
    d('Queenstown / Nueva Zelanda','Nueva Zelanda','noviembre-marzo · invierno para nieve',['puenting','paracaidismo','barranquismo','parapente','fotografía/vídeo'],['iniciación','intermedio','avanzado','experto'],'gran viaje','Capital aspiracional de aventura: bungy, swing, rafting, jet boat, aire y montaña.','Viaje largo, seguros, proveedores, meteo, salud, permisos y planificación por días.','inspiración futura','brutal',['internacional'],['aire','montaña','mixto']),
    d('Marruecos / Atlas y costa atlántica','Marruecos','marzo-mayo · septiembre-noviembre',['trekking','surf','senderismo','fotografía/vídeo'],['iniciación','intermedio','avanzado'],'1 semana','Aventura cercana desde España: Atlas, desierto, costa, cultura y fotografía.','Calor, guías locales, permisos, logística, hidratación, seguros y respeto cultural.','inspiración futura','alto',['internacional'],['montaña','mar','mixto'])
  ];

  function d(name, region, best, activities, level, duration, why, risk, status, content, scope, medium) {
    return { name, region, best, activities, level, duration, why, risk, status, content, scope, medium, type: [status], recording: ['GoPro','foto profesional','vídeo aventura','contenido YouTube/Instagram'] };
  }

  function clone(base, extra) {
    return deepMerge(JSON.parse(JSON.stringify(base)), extra);
  }

  function deepMerge(target, source) {
    Object.keys(source || {}).forEach(key => {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) target[key] = deepMerge(target[key] || {}, source[key]);
      else target[key] = source[key];
    });
    return target;
  }

  function t(path) {
    return path.split('.').reduce((obj, key) => obj && obj[key], ui[state.language] || ui.es) || path.split('.').reduce((obj, key) => obj && obj[key], ui.es) || path;
  }

  function translateStatic() {
    document.querySelectorAll('[data-viajes-i18n]').forEach(el => {
      const value = t(el.dataset.viajesI18n);
      if (value.includes('<')) el.innerHTML = value;
      else el.textContent = value;
    });
    document.documentElement.lang = state.language;
    document.title = state.language === 'es' ? 'Viajes de aventura y calendario extremo | NÓMADA EXTREMO' : `${t('nav.travel')} | NÓMADA EXTREMO`;
  }

  function labelValue(value) {
    const table = {
      invierno: { en:'winter', fr:'hiver', de:'Winter', it:'inverno', pt:'inverno' },
      primavera: { en:'spring', fr:'printemps', de:'Frühling', it:'primavera', pt:'primavera' },
      verano: { en:'summer', fr:'été', de:'Sommer', it:'estate', pt:'verão' },
      otoño: { en:'autumn', fr:'automne', de:'Herbst', it:'autunno', pt:'outono' },
      'todo el año': { en:'all year', fr:'toute l’année', de:'ganzjährig', it:'tutto l’anno', pt:'todo o ano' },
      local: { en:'local', fr:'local', de:'lokal', it:'locale', pt:'local' },
      nacional: { en:'national', fr:'national', de:'national', it:'nazionale', pt:'nacional' },
      internacional: { en:'international', fr:'international', de:'international', it:'internazionale', pt:'internacional' },
      mar: { en:'sea', fr:'mer', de:'Meer', it:'mare', pt:'mar' },
      montaña: { en:'mountain', fr:'montagne', de:'Berg', it:'montagna', pt:'montanha' },
      aire: { en:'air', fr:'air', de:'Luft', it:'aria', pt:'ar' },
      vertical: { en:'vertical', fr:'vertical', de:'vertikal', it:'verticale', pt:'vertical' },
      subterráneo: { en:'underground', fr:'souterrain', de:'unterirdisch', it:'sotterraneo', pt:'subterrâneo' },
      mixto: { en:'mixed', fr:'mixte', de:'gemischt', it:'misto', pt:'misto' },
      naturista: { en:'naturist', fr:'naturiste', de:'Naturismus', it:'naturista', pt:'naturista' },
      iniciación: { en:'beginner', fr:'initiation', de:'Einstieg', it:'iniziazione', pt:'iniciação' },
      intermedio: { en:'intermediate', fr:'intermédiaire', de:'mittel', it:'intermedio', pt:'intermédio' },
      avanzado: { en:'advanced', fr:'avancé', de:'fortgeschritten', it:'avanzato', pt:'avançado' },
      experto: { en:'expert', fr:'expert', de:'Experte', it:'esperto', pt:'especialista' },
      '1 día': { en:'1 day', fr:'1 jour', de:'1 Tag', it:'1 giorno', pt:'1 dia' },
      'fin de semana': { en:'weekend', fr:'week-end', de:'Wochenende', it:'weekend', pt:'fim de semana' },
      '3-5 días': { en:'3-5 days', fr:'3-5 jours', de:'3-5 Tage', it:'3-5 giorni', pt:'3-5 dias' },
      '1 semana': { en:'1 week', fr:'1 semaine', de:'1 Woche', it:'1 settimana', pt:'1 semana' },
      'gran viaje': { en:'big trip', fr:'grand voyage', de:'große Reise', it:'grande viaggio', pt:'grande viagem' },
      'experiencia propia': { en:'own experience', fr:'expérience propre', de:'eigene Erfahrung', it:'esperienza propria', pt:'experiência própria' },
      colaboración: { en:'collaboration', fr:'collaboration', de:'Zusammenarbeit', it:'collaborazione', pt:'colaboração' },
      'inspiración futura': { en:'future inspiration', fr:'inspiration future', de:'Zukunftsidee', it:'ispirazione futura', pt:'inspiração futura' },
      'formación/escuela': { en:'training/school', fr:'formation/école', de:'Ausbildung/Schule', it:'formazione/scuola', pt:'formação/escola' }
    };
    return table[value]?.[state.language] || value;
  }

  function summary(item) {
    return state.language === 'es' ? item.why : languageText[state.language]?.summary(item) || item.why;
  }

  function riskText(item) {
    return state.language === 'es' ? item.risk : languageText[state.language]?.risk || item.risk;
  }

  function renderFilters() {
    const shell = document.querySelector('[data-viajes-filters]');
    if (!shell) return;
    shell.innerHTML = `<div class="viajes-filter-bar">${Object.keys(tax).map(key => `
      <div class="viajes-filter-field">
        <label for="viajes-${key}">${t(`filters.fields.${key}`)}</label>
        <select id="viajes-${key}" data-filter="${key}">
          <option value="">${t('filters.all')}</option>
          ${tax[key].map(value => `<option value="${value}">${labelValue(value)}</option>`).join('')}
        </select>
      </div>`).join('')}</div>
      <div class="viajes-filter-actions"><button type="button" data-clear>${t('filters.clear')}</button></div>`;
    shell.querySelectorAll('select').forEach(select => {
      select.value = state.filters[select.dataset.filter] || '';
      select.addEventListener('change', () => {
        state.filters[select.dataset.filter] = select.value;
        renderDestinations();
      });
    });
    shell.querySelector('[data-clear]').addEventListener('click', () => {
      state.filters = {};
      renderFilters();
      renderDestinations();
    });
  }

  function matches(item) {
    return Object.entries(state.filters).every(([key, value]) => {
      if (!value) return true;
      if (key === 'season') return item.best.toLowerCase().includes(value) || value === 'todo el año' && item.best.toLowerCase().includes('todo');
      const field = item[key];
      return Array.isArray(field) ? field.includes(value) : String(field || '').includes(value);
    });
  }

  function renderDestinations() {
    const grid = document.querySelector('[data-viajes-grid]');
    const count = document.querySelector('[data-viajes-count]');
    const empty = document.querySelector('[data-viajes-empty]');
    if (!grid) return;
    const visible = destinations.filter(matches);
    grid.innerHTML = visible.map((item, index) => `
      <article class="viajes-card" style="--card-bg:linear-gradient(135deg, hsl(${190 + index * 9}, 45%, 28%), hsl(${27 + index * 4}, 48%, 56%));">
        <div class="viajes-card__media"><span>${labelValue(item.status)}</span></div>
        <div class="viajes-card__body">
          <h3>${item.name}</h3>
          <div class="viajes-card__meta"><span>${item.region}</span><span>${item.best}</span><span>${labelValue(item.duration)}</span></div>
          <div class="viajes-card__chips">${item.activities.slice(0, 5).map(a => `<span>${labelValue(a)}</span>`).join('')}</div>
          <p>${summary(item)}</p>
          <p><strong>${t('labels.risk')}:</strong> ${riskText(item)}</p>
          <div class="viajes-card__actions">
            <button class="primary" type="button" data-open="${index}">${t('labels.view')}</button>
            <button type="button" data-save>${t('labels.save')}</button>
          </div>
        </div>
      </article>`).join('');
    count.textContent = t('filters.found').replace('{count}', visible.length);
    empty.hidden = visible.length > 0;
    empty.textContent = t('filters.empty');
    grid.querySelectorAll('[data-open]').forEach(button => button.addEventListener('click', () => openModal(destinations[Number(button.dataset.open)])));
    grid.querySelectorAll('[data-save]').forEach(button => button.addEventListener('click', () => {
      button.textContent = state.language === 'es' ? 'Guardado' : (languageText[state.language]?.saved || 'Saved');
      button.classList.add('is-saved');
    }));
  }

  function renderCalendar() {
    const root = document.querySelector('[data-viajes-calendar]');
    if (!root) return;
    const items = calendarLocales[state.language] || calendar;
    root.innerHTML = items.map(([months, text]) => `<article class="viajes-month"><h3>${months}</h3><p>${text}</p></article>`).join('');
  }

  function openModal(item) {
    const modal = document.querySelector('[data-viajes-modal]');
    const content = document.querySelector('[data-viajes-modal-content]');
    content.innerHTML = `<div class="viajes-modal__content">
      <span class="label">${labelValue(item.status)}</span>
      <h2 id="viajes-modal-title">${item.name}</h2>
      <p class="texto">${summary(item)}</p>
      <div class="viajes-detail-grid">
        <div><strong>${t('labels.region')}</strong>${item.region}</div>
        <div><strong>${t('labels.best')}</strong>${item.best}</div>
        <div><strong>${t('labels.activities')}</strong>${item.activities.join(', ')}</div>
        <div><strong>${t('labels.level')}</strong>${item.level.map(labelValue).join(', ')}</div>
        <div><strong>${t('labels.duration')}</strong>${labelValue(item.duration)}</div>
        <div><strong>${t('labels.youtube')}</strong>${item.content}</div>
        <div><strong>${t('labels.material')}</strong>${t('labels.materialText')}</div>
        <div><strong>${t('labels.safety')}</strong>${riskText(item)}</div>
        <div><strong>${t('labels.check')}</strong>${t('labels.checkText')}</div>
      </div>
      <button class="btn btn-mar" type="button" data-viajes-close>${t('labels.detail')}</button>
    </div>`;
    modal.hidden = false;
    modal.querySelector('[data-viajes-close]')?.focus();
  }

  function closeModal() {
    const modal = document.querySelector('[data-viajes-modal]');
    if (modal) modal.hidden = true;
  }

  function applyLanguage(lang) {
    state.language = supported.includes(lang) ? lang : 'es';
    translateStatic();
    renderFilters();
    renderDestinations();
    renderCalendar();
  }

  document.addEventListener('click', event => {
    if (event.target.closest('[data-viajes-close]')) closeModal();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeModal();
  });
  window.addEventListener('noext:languagechange', event => applyLanguage(event.detail.language));
  applyLanguage(state.language);
})();
