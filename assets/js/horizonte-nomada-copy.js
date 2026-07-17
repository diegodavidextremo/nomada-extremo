(function () {
  'use strict';

  const supported = ['es', 'en', 'fr', 'de', 'it', 'pt'];
  const copy = {
    es: {
      'meta.title': 'Horizonte Nómada | Visión de futuro de NÓMADA EXTREMO',
      'meta.description': 'Horizonte Nómada reúne las ideas, tecnologías, alianzas y proyectos que podrían definir la evolución futura de NÓMADA EXTREMO.',
      'nav.home': 'Inicio',
      'nav.current': 'Horizonte Nómada',
      'hero.kicker': 'Visión a largo plazo',
      'hero.titleA': 'HORIZONTE',
      'hero.titleB': 'NÓMADA',
      'hero.lead': 'Las ideas, tecnologías, alianzas y sueños que podrían definir las próximas décadas de Nómada Extremo.',
      'hero.note': 'Una visión editable y realista: conceptos de futuro, no compras, acuerdos ni compromisos confirmados.',
      'hero.primary': 'Explorar conceptos',
      'hero.secondary': 'Ver línea temporal',
      'intro.kicker': 'Un futuro conectado',
      'intro.titleA': 'IDEAS QUE',
      'intro.titleB': 'SE CONVIERTEN EN RUTA',
      'intro.p1': 'Horizonte Nómada ordena la visión futura de la marca: qué problemas podría resolver cada idea, qué áreas conectaría y qué tendría que validarse antes de hacerla realidad.',
      'intro.p2': 'Cada concepto distingue claramente entre inspiración, diseño, estudio y prioridad. Las fichas no implican patrocinio, compra, instalación ni colaboración existente.',
      'categories.kicker': 'Ocho direcciones',
      'categories.titleA': 'UN MAPA',
      'categories.titleB': 'DE POSIBILIDADES',
      'category.movilidad': 'Movilidad y vehículos',
      'category.tecnologia': 'Tecnología personal',
      'category.audiovisual': 'Cámaras y contenido',
      'category.alianzas': 'Colaboraciones soñadas',
      'category.bases': 'Bases y campamentos',
      'category.expediciones': 'Expediciones y destinos',
      'category.impacto': 'Proyectos de impacto',
      'category.timeline': 'Línea temporal de visión',
      'explorer.kicker': 'Explorador de conceptos',
      'explorer.titleA': 'FILTRA LA',
      'explorer.titleB': 'VISIÓN',
      'explorer.lead': 'Combina categoría, horizonte y estado para entender cómo podría evolucionar cada idea.',
      'explorer.dataNote': 'Datos locales editables · sin servicios externos',
      'filter.category': 'Categoría',
      'filter.horizon': 'Horizonte',
      'filter.state': 'Estado',
      'filter.all': 'Todos',
      'filter.viewLabel': 'Modo de visualización',
      'filter.grid': 'Cuadrícula',
      'filter.timeline': 'Cronología',
      'filter.reset': 'Limpiar filtros',
      'empty.title': 'No hay conceptos con esta combinación.',
      'empty.text': 'Prueba otro horizonte o limpia los filtros.',
      'timeline.kicker': 'Hoja de visión',
      'timeline.titleA': 'CRECER SIN',
      'timeline.titleB': 'PROMETER DE MÁS',
      'timeline.step1Title': 'Próximos pasos',
      'timeline.step1Text': 'Ordenar necesidades, comparar tecnología, validar herramientas locales y conectar mejor el contenido actual.',
      'timeline.step2Title': 'Medio plazo',
      'timeline.step2Text': 'Probar conceptos de movilidad, accesibilidad, educación, alianzas y logística con criterios verificables.',
      'timeline.step3Title': 'Largo plazo',
      'timeline.step3Text': 'Diseñar una base conectada, ampliar expediciones y crear una estructura profesional sostenible.',
      'timeline.step4Title': 'Visión de décadas',
      'timeline.step4Text': 'Convertir aprendizaje, territorio, comunidad y tecnología en proyectos de impacto duradero.',
      'principles.kicker': 'Criterio editorial',
      'principles.titleA': 'SOÑAR',
      'principles.titleB': 'CON LOS PIES EN EL SUELO',
      'principles.p1Title': 'Sin acuerdos inventados.',
      'principles.p1Text': 'Las marcas son referencias de afinidad, nunca patrocinadores confirmados.',
      'principles.p2Title': 'Sin datos de relleno.',
      'principles.p2Text': 'Modelos, fechas, presupuestos e imágenes solo aparecen cuando existe información fiable.',
      'principles.p3Title': 'Con conexiones reales.',
      'principles.p3Text': 'Cada idea enlaza con áreas actuales que podría mejorar: seguridad, escuela, material, viajes, audiovisual o comunidad.',
      'related.kicker': 'Sigue explorando',
      'related.titleA': 'DEL HORIZONTE',
      'related.titleB': 'AL PROYECTO',
      'related.base': 'Base y campamento',
      'related.baseText': 'Espacios, flota y crecimiento por fases.',
      'related.tech': 'Tecnología',
      'related.techText': 'Herramientas aplicadas a seguridad y experiencia.',
      'related.travel': 'Viajes',
      'related.travelText': 'Destinos y ventanas de aventura.',
      'related.project': 'Proyecto completo',
      'related.projectText': 'La arquitectura integral de Nómada Extremo.',
      'preview.kicker': 'Visión de futuro',
      'preview.lead': 'Las ideas, tecnologías, alianzas y sueños que podrían definir las próximas décadas de Nómada Extremo, ordenados con criterio y sin presentar como reales acuerdos o recursos que todavía no existen.',
      'preview.cta': 'Explorar Horizonte Nómada',
      'preview.1Title': 'Movilidad y tecnología',
      'preview.1Text': 'Vehículos, navegación, seguridad y producción.',
      'preview.2Title': 'Bases y expediciones',
      'preview.2Text': 'Espacios, logística, viajes y documentales.',
      'preview.3Title': 'Alianzas con propósito',
      'preview.3Text': 'Ideas de colaboración sin acuerdos inventados.',
      'preview.4Title': 'Impacto a largo plazo',
      'preview.4Text': 'Accesibilidad, educación y sostenibilidad.'
    },
    en: {
      'meta.title': 'Nomad Horizon | The future vision of NÓMADA EXTREMO',
      'meta.description': 'Nomad Horizon brings together the ideas, technologies, partnerships and projects that could shape the future evolution of NÓMADA EXTREMO.',
      'nav.home': 'Home', 'nav.current': 'Nomad Horizon',
      'hero.kicker': 'Long-term vision', 'hero.titleA': 'NOMAD', 'hero.titleB': 'HORIZON',
      'hero.lead': 'The ideas, technologies, partnerships and dreams that could shape the coming decades of Nómada Extremo.',
      'hero.note': 'An editable, realistic vision: future concepts, not confirmed purchases, agreements or commitments.',
      'hero.primary': 'Explore concepts', 'hero.secondary': 'View timeline',
      'intro.kicker': 'A connected future', 'intro.titleA': 'IDEAS THAT', 'intro.titleB': 'BECOME A ROUTE',
      'intro.p1': 'Nomad Horizon organises the brand’s future vision: which problems each idea could solve, which areas it could connect and what must be validated before making it real.',
      'intro.p2': 'Each concept clearly separates inspiration, design, research and priority. The cards do not imply an existing sponsorship, purchase, facility or partnership.',
      'categories.kicker': 'Eight directions', 'categories.titleA': 'A MAP', 'categories.titleB': 'OF POSSIBILITIES',
      'category.movilidad': 'Mobility and vehicles', 'category.tecnologia': 'Personal technology', 'category.audiovisual': 'Cameras and content',
      'category.alianzas': 'Dream partnerships', 'category.bases': 'Bases and camps', 'category.expediciones': 'Expeditions and destinations',
      'category.impacto': 'Impact projects', 'category.timeline': 'Vision timeline',
      'explorer.kicker': 'Concept explorer', 'explorer.titleA': 'FILTER THE', 'explorer.titleB': 'VISION',
      'explorer.lead': 'Combine category, horizon and status to understand how each idea could evolve.',
      'explorer.dataNote': 'Editable local data · no external services',
      'filter.category': 'Category', 'filter.horizon': 'Horizon', 'filter.state': 'Status', 'filter.all': 'All',
      'filter.viewLabel': 'Display mode', 'filter.grid': 'Grid', 'filter.timeline': 'Timeline', 'filter.reset': 'Clear filters',
      'empty.title': 'No concepts match this combination.', 'empty.text': 'Try another horizon or clear the filters.',
      'timeline.kicker': 'Vision roadmap', 'timeline.titleA': 'GROW WITHOUT', 'timeline.titleB': 'OVERPROMISING',
      'timeline.step1Title': 'Next steps', 'timeline.step1Text': 'Organise needs, compare technology, validate local tools and connect current content more effectively.',
      'timeline.step2Title': 'Medium term', 'timeline.step2Text': 'Test mobility, accessibility, education, partnership and logistics concepts against verifiable criteria.',
      'timeline.step3Title': 'Long term', 'timeline.step3Text': 'Design a connected base, expand expeditions and build a sustainable professional structure.',
      'timeline.step4Title': 'Decades-long vision', 'timeline.step4Text': 'Turn learning, territory, community and technology into lasting impact projects.',
      'principles.kicker': 'Editorial criteria', 'principles.titleA': 'DREAMING', 'principles.titleB': 'WITH FEET ON THE GROUND',
      'principles.p1Title': 'No invented agreements.', 'principles.p1Text': 'Brands are affinity references, never confirmed sponsors.',
      'principles.p2Title': 'No filler data.', 'principles.p2Text': 'Models, dates, budgets and images only appear when reliable information exists.',
      'principles.p3Title': 'Real connections.', 'principles.p3Text': 'Each idea links to current areas it could improve: safety, school, equipment, travel, audiovisual or community.',
      'related.kicker': 'Keep exploring', 'related.titleA': 'FROM HORIZON', 'related.titleB': 'TO PROJECT',
      'related.base': 'Base and camp', 'related.baseText': 'Spaces, fleet and phased growth.',
      'related.tech': 'Technology', 'related.techText': 'Tools applied to safety and experience.',
      'related.travel': 'Travel', 'related.travelText': 'Destinations and adventure windows.',
      'related.project': 'Complete project', 'related.projectText': 'The complete architecture of Nómada Extremo.',
      'preview.kicker': 'Future vision', 'preview.lead': 'Ideas, technologies, partnerships and dreams that could shape the coming decades of Nómada Extremo, organised carefully without presenting unconfirmed agreements or resources as real.',
      'preview.cta': 'Explore Nomad Horizon',
      'preview.1Title': 'Mobility and technology', 'preview.1Text': 'Vehicles, navigation, safety and production.',
      'preview.2Title': 'Bases and expeditions', 'preview.2Text': 'Spaces, logistics, travel and documentaries.',
      'preview.3Title': 'Purposeful partnerships', 'preview.3Text': 'Collaboration ideas without invented agreements.',
      'preview.4Title': 'Long-term impact', 'preview.4Text': 'Accessibility, education and sustainability.'
    },
    fr: {
      'meta.title': 'Horizon Nomade | Vision future de NÓMADA EXTREMO',
      'meta.description': 'Horizon Nomade réunit les idées, technologies, alliances et projets susceptibles de définir l’évolution future de NÓMADA EXTREMO.',
      'nav.home': 'Accueil', 'nav.current': 'Horizon Nomade',
      'hero.kicker': 'Vision à long terme', 'hero.titleA': 'HORIZON', 'hero.titleB': 'NOMADE',
      'hero.lead': 'Les idées, technologies, alliances et rêves qui pourraient façonner les prochaines décennies de Nómada Extremo.',
      'hero.note': 'Une vision modifiable et réaliste : des concepts d’avenir, pas des achats, accords ou engagements confirmés.',
      'hero.primary': 'Explorer les concepts', 'hero.secondary': 'Voir la chronologie',
      'intro.kicker': 'Un avenir connecté', 'intro.titleA': 'DES IDÉES QUI', 'intro.titleB': 'DEVIENNENT UNE ROUTE',
      'intro.p1': 'Horizon Nomade organise la vision future de la marque : les problèmes que chaque idée pourrait résoudre, les domaines qu’elle relierait et les validations nécessaires avant sa réalisation.',
      'intro.p2': 'Chaque concept distingue clairement inspiration, conception, étude et priorité. Les fiches n’impliquent aucun parrainage, achat, installation ou partenariat existant.',
      'categories.kicker': 'Huit directions', 'categories.titleA': 'UNE CARTE', 'categories.titleB': 'DES POSSIBILITÉS',
      'category.movilidad': 'Mobilité et véhicules', 'category.tecnologia': 'Technologie personnelle', 'category.audiovisual': 'Caméras et contenu',
      'category.alianzas': 'Collaborations rêvées', 'category.bases': 'Bases et camps', 'category.expediciones': 'Expéditions et destinations',
      'category.impacto': 'Projets à impact', 'category.timeline': 'Chronologie de la vision',
      'explorer.kicker': 'Explorateur de concepts', 'explorer.titleA': 'FILTRER LA', 'explorer.titleB': 'VISION',
      'explorer.lead': 'Combinez catégorie, horizon et état pour comprendre comment chaque idée pourrait évoluer.',
      'explorer.dataNote': 'Données locales modifiables · sans services externes',
      'filter.category': 'Catégorie', 'filter.horizon': 'Horizon', 'filter.state': 'État', 'filter.all': 'Tous',
      'filter.viewLabel': 'Mode d’affichage', 'filter.grid': 'Grille', 'filter.timeline': 'Chronologie', 'filter.reset': 'Effacer les filtres',
      'empty.title': 'Aucun concept ne correspond à cette combinaison.', 'empty.text': 'Essayez un autre horizon ou effacez les filtres.',
      'timeline.kicker': 'Feuille de vision', 'timeline.titleA': 'GRANDIR SANS', 'timeline.titleB': 'TROP PROMETTRE',
      'timeline.step1Title': 'Prochaines étapes', 'timeline.step1Text': 'Ordonner les besoins, comparer les technologies, valider les outils locaux et mieux relier le contenu actuel.',
      'timeline.step2Title': 'Moyen terme', 'timeline.step2Text': 'Tester les concepts de mobilité, accessibilité, éducation, alliances et logistique selon des critères vérifiables.',
      'timeline.step3Title': 'Long terme', 'timeline.step3Text': 'Concevoir une base connectée, développer les expéditions et créer une structure professionnelle durable.',
      'timeline.step4Title': 'Vision sur plusieurs décennies', 'timeline.step4Text': 'Transformer apprentissage, territoire, communauté et technologie en projets à impact durable.',
      'principles.kicker': 'Critère éditorial', 'principles.titleA': 'RÊVER', 'principles.titleB': 'LES PIEDS SUR TERRE',
      'principles.p1Title': 'Aucun accord inventé.', 'principles.p1Text': 'Les marques sont des références d’affinité, jamais des sponsors confirmés.',
      'principles.p2Title': 'Aucune donnée de remplissage.', 'principles.p2Text': 'Modèles, dates, budgets et images n’apparaissent que si des informations fiables existent.',
      'principles.p3Title': 'Des connexions réelles.', 'principles.p3Text': 'Chaque idée est reliée aux domaines actuels qu’elle pourrait améliorer : sécurité, école, matériel, voyages, audiovisuel ou communauté.',
      'related.kicker': 'Poursuivre l’exploration', 'related.titleA': 'DE L’HORIZON', 'related.titleB': 'AU PROJET',
      'related.base': 'Base et camp', 'related.baseText': 'Espaces, flotte et croissance par phases.',
      'related.tech': 'Technologie', 'related.techText': 'Outils appliqués à la sécurité et à l’expérience.',
      'related.travel': 'Voyages', 'related.travelText': 'Destinations et fenêtres d’aventure.',
      'related.project': 'Projet complet', 'related.projectText': 'L’architecture intégrale de Nómada Extremo.',
      'preview.kicker': 'Vision future', 'preview.lead': 'Les idées, technologies, alliances et rêves qui pourraient façonner les prochaines décennies de Nómada Extremo, organisés avec rigueur sans présenter comme réels des accords ou ressources non confirmés.',
      'preview.cta': 'Explorer Horizon Nomade',
      'preview.1Title': 'Mobilité et technologie', 'preview.1Text': 'Véhicules, navigation, sécurité et production.',
      'preview.2Title': 'Bases et expéditions', 'preview.2Text': 'Espaces, logistique, voyages et documentaires.',
      'preview.3Title': 'Alliances utiles', 'preview.3Text': 'Idées de collaboration sans accords inventés.',
      'preview.4Title': 'Impact à long terme', 'preview.4Text': 'Accessibilité, éducation et durabilité.'
    },
    de: {
      'meta.title': 'Nomadenhorizont | Zukunftsvision von NÓMADA EXTREMO',
      'meta.description': 'Nomadenhorizont bündelt Ideen, Technologien, Partnerschaften und Projekte, die die zukünftige Entwicklung von NÓMADA EXTREMO prägen könnten.',
      'nav.home': 'Startseite', 'nav.current': 'Nomadenhorizont',
      'hero.kicker': 'Langfristige Vision', 'hero.titleA': 'NOMADEN', 'hero.titleB': 'HORIZONT',
      'hero.lead': 'Ideen, Technologien, Partnerschaften und Träume, die die kommenden Jahrzehnte von Nómada Extremo prägen könnten.',
      'hero.note': 'Eine bearbeitbare, realistische Vision: Zukunftskonzepte, keine bestätigten Käufe, Vereinbarungen oder Verpflichtungen.',
      'hero.primary': 'Konzepte erkunden', 'hero.secondary': 'Zeitleiste ansehen',
      'intro.kicker': 'Eine vernetzte Zukunft', 'intro.titleA': 'IDEEN WERDEN', 'intro.titleB': 'ZU EINER ROUTE',
      'intro.p1': 'Nomadenhorizont ordnet die Zukunftsvision der Marke: welche Probleme eine Idee lösen, welche Bereiche sie verbinden und was vor ihrer Umsetzung geprüft werden müsste.',
      'intro.p2': 'Jedes Konzept trennt klar zwischen Inspiration, Gestaltung, Untersuchung und Priorität. Die Karten bedeuten kein bestehendes Sponsoring, keinen Kauf, keine Anlage und keine Partnerschaft.',
      'categories.kicker': 'Acht Richtungen', 'categories.titleA': 'EINE KARTE', 'categories.titleB': 'DER MÖGLICHKEITEN',
      'category.movilidad': 'Mobilität und Fahrzeuge', 'category.tecnologia': 'Persönliche Technologie', 'category.audiovisual': 'Kameras und Inhalte',
      'category.alianzas': 'Erträumte Kooperationen', 'category.bases': 'Basen und Camps', 'category.expediciones': 'Expeditionen und Ziele',
      'category.impacto': 'Wirkungsprojekte', 'category.timeline': 'Zeitleiste der Vision',
      'explorer.kicker': 'Konzept-Explorer', 'explorer.titleA': 'DIE VISION', 'explorer.titleB': 'FILTERN',
      'explorer.lead': 'Kombinieren Sie Kategorie, Horizont und Status, um die mögliche Entwicklung jeder Idee zu verstehen.',
      'explorer.dataNote': 'Bearbeitbare lokale Daten · keine externen Dienste',
      'filter.category': 'Kategorie', 'filter.horizon': 'Horizont', 'filter.state': 'Status', 'filter.all': 'Alle',
      'filter.viewLabel': 'Ansichtsmodus', 'filter.grid': 'Raster', 'filter.timeline': 'Zeitleiste', 'filter.reset': 'Filter löschen',
      'empty.title': 'Keine Konzepte entsprechen dieser Kombination.', 'empty.text': 'Wählen Sie einen anderen Horizont oder löschen Sie die Filter.',
      'timeline.kicker': 'Vision-Roadmap', 'timeline.titleA': 'WACHSEN OHNE', 'timeline.titleB': 'ZU VIEL ZU VERSPRECHEN',
      'timeline.step1Title': 'Nächste Schritte', 'timeline.step1Text': 'Bedürfnisse ordnen, Technologien vergleichen, lokale Werkzeuge prüfen und bestehende Inhalte besser verknüpfen.',
      'timeline.step2Title': 'Mittelfristig', 'timeline.step2Text': 'Konzepte zu Mobilität, Barrierefreiheit, Bildung, Partnerschaften und Logistik anhand überprüfbarer Kriterien testen.',
      'timeline.step3Title': 'Langfristig', 'timeline.step3Text': 'Eine vernetzte Basis entwerfen, Expeditionen erweitern und eine nachhaltige professionelle Struktur aufbauen.',
      'timeline.step4Title': 'Vision über Jahrzehnte', 'timeline.step4Text': 'Lernen, Region, Gemeinschaft und Technologie in Projekte mit dauerhafter Wirkung verwandeln.',
      'principles.kicker': 'Redaktionelle Kriterien', 'principles.titleA': 'TRÄUMEN', 'principles.titleB': 'MIT BODENHAFTUNG',
      'principles.p1Title': 'Keine erfundenen Abkommen.', 'principles.p1Text': 'Marken sind Affinitätsreferenzen, niemals bestätigte Sponsoren.',
      'principles.p2Title': 'Keine Fülldaten.', 'principles.p2Text': 'Modelle, Termine, Budgets und Bilder erscheinen nur bei verlässlichen Informationen.',
      'principles.p3Title': 'Echte Verbindungen.', 'principles.p3Text': 'Jede Idee verweist auf bestehende Bereiche, die sie verbessern könnte: Sicherheit, Schule, Ausrüstung, Reisen, Audiovisuelles oder Gemeinschaft.',
      'related.kicker': 'Weiter erkunden', 'related.titleA': 'VOM HORIZONT', 'related.titleB': 'ZUM PROJEKT',
      'related.base': 'Basis und Camp', 'related.baseText': 'Räume, Flotte und Wachstum in Phasen.',
      'related.tech': 'Technologie', 'related.techText': 'Werkzeuge für Sicherheit und Erlebnis.',
      'related.travel': 'Reisen', 'related.travelText': 'Ziele und Zeitfenster für Abenteuer.',
      'related.project': 'Gesamtprojekt', 'related.projectText': 'Die vollständige Architektur von Nómada Extremo.',
      'preview.kicker': 'Zukunftsvision', 'preview.lead': 'Ideen, Technologien, Partnerschaften und Träume für die kommenden Jahrzehnte von Nómada Extremo, sorgfältig geordnet, ohne unbestätigte Abkommen oder Ressourcen als real darzustellen.',
      'preview.cta': 'Nomadenhorizont erkunden',
      'preview.1Title': 'Mobilität und Technologie', 'preview.1Text': 'Fahrzeuge, Navigation, Sicherheit und Produktion.',
      'preview.2Title': 'Basen und Expeditionen', 'preview.2Text': 'Räume, Logistik, Reisen und Dokumentarfilme.',
      'preview.3Title': 'Sinnvolle Partnerschaften', 'preview.3Text': 'Kooperationsideen ohne erfundene Abkommen.',
      'preview.4Title': 'Langfristige Wirkung', 'preview.4Text': 'Barrierefreiheit, Bildung und Nachhaltigkeit.'
    },
    it: {
      'meta.title': 'Orizzonte Nomade | Visione futura di NÓMADA EXTREMO',
      'meta.description': 'Orizzonte Nomade riunisce idee, tecnologie, alleanze e progetti che potrebbero definire l’evoluzione futura di NÓMADA EXTREMO.',
      'nav.home': 'Home', 'nav.current': 'Orizzonte Nomade',
      'hero.kicker': 'Visione a lungo termine', 'hero.titleA': 'ORIZZONTE', 'hero.titleB': 'NOMADE',
      'hero.lead': 'Idee, tecnologie, alleanze e sogni che potrebbero definire i prossimi decenni di Nómada Extremo.',
      'hero.note': 'Una visione modificabile e realistica: concetti futuri, non acquisti, accordi o impegni confermati.',
      'hero.primary': 'Esplora i concetti', 'hero.secondary': 'Vedi la cronologia',
      'intro.kicker': 'Un futuro connesso', 'intro.titleA': 'IDEE CHE', 'intro.titleB': 'DIVENTANO UN PERCORSO',
      'intro.p1': 'Orizzonte Nomade organizza la visione futura del marchio: quali problemi potrebbe risolvere ogni idea, quali aree collegherebbe e cosa dovrebbe essere convalidato prima di realizzarla.',
      'intro.p2': 'Ogni concetto distingue chiaramente ispirazione, progettazione, studio e priorità. Le schede non implicano sponsorizzazioni, acquisti, strutture o collaborazioni esistenti.',
      'categories.kicker': 'Otto direzioni', 'categories.titleA': 'UNA MAPPA', 'categories.titleB': 'DI POSSIBILITÀ',
      'category.movilidad': 'Mobilità e veicoli', 'category.tecnologia': 'Tecnologia personale', 'category.audiovisual': 'Fotocamere e contenuti',
      'category.alianzas': 'Collaborazioni sognate', 'category.bases': 'Basi e campi', 'category.expediciones': 'Spedizioni e destinazioni',
      'category.impacto': 'Progetti d’impatto', 'category.timeline': 'Cronologia della visione',
      'explorer.kicker': 'Esplora concetti', 'explorer.titleA': 'FILTRA LA', 'explorer.titleB': 'VISIONE',
      'explorer.lead': 'Combina categoria, orizzonte e stato per capire come potrebbe evolversi ogni idea.',
      'explorer.dataNote': 'Dati locali modificabili · nessun servizio esterno',
      'filter.category': 'Categoria', 'filter.horizon': 'Orizzonte', 'filter.state': 'Stato', 'filter.all': 'Tutti',
      'filter.viewLabel': 'Modalità di visualizzazione', 'filter.grid': 'Griglia', 'filter.timeline': 'Cronologia', 'filter.reset': 'Cancella filtri',
      'empty.title': 'Nessun concetto corrisponde a questa combinazione.', 'empty.text': 'Prova un altro orizzonte o cancella i filtri.',
      'timeline.kicker': 'Mappa della visione', 'timeline.titleA': 'CRESCERE SENZA', 'timeline.titleB': 'PROMETTERE TROPPO',
      'timeline.step1Title': 'Prossimi passi', 'timeline.step1Text': 'Ordinare le esigenze, confrontare le tecnologie, convalidare gli strumenti locali e collegare meglio i contenuti attuali.',
      'timeline.step2Title': 'Medio termine', 'timeline.step2Text': 'Testare concetti di mobilità, accessibilità, istruzione, alleanze e logistica con criteri verificabili.',
      'timeline.step3Title': 'Lungo termine', 'timeline.step3Text': 'Progettare una base connessa, ampliare le spedizioni e creare una struttura professionale sostenibile.',
      'timeline.step4Title': 'Visione pluridecennale', 'timeline.step4Text': 'Trasformare apprendimento, territorio, comunità e tecnologia in progetti di impatto duraturo.',
      'principles.kicker': 'Criterio editoriale', 'principles.titleA': 'SOGNARE', 'principles.titleB': 'CON I PIEDI PER TERRA',
      'principles.p1Title': 'Nessun accordo inventato.', 'principles.p1Text': 'I marchi sono riferimenti di affinità, mai sponsor confermati.',
      'principles.p2Title': 'Nessun dato riempitivo.', 'principles.p2Text': 'Modelli, date, budget e immagini compaiono solo quando esistono informazioni affidabili.',
      'principles.p3Title': 'Connessioni reali.', 'principles.p3Text': 'Ogni idea si collega ad aree attuali che potrebbe migliorare: sicurezza, scuola, attrezzatura, viaggi, audiovisivo o comunità.',
      'related.kicker': 'Continua a esplorare', 'related.titleA': 'DALL’ORIZZONTE', 'related.titleB': 'AL PROGETTO',
      'related.base': 'Base e campo', 'related.baseText': 'Spazi, flotta e crescita per fasi.',
      'related.tech': 'Tecnologia', 'related.techText': 'Strumenti applicati alla sicurezza e all’esperienza.',
      'related.travel': 'Viaggi', 'related.travelText': 'Destinazioni e finestre di avventura.',
      'related.project': 'Progetto completo', 'related.projectText': 'L’architettura completa di Nómada Extremo.',
      'preview.kicker': 'Visione futura', 'preview.lead': 'Idee, tecnologie, alleanze e sogni per i prossimi decenni di Nómada Extremo, organizzati con criterio senza presentare come reali accordi o risorse non confermati.',
      'preview.cta': 'Esplora Orizzonte Nomade',
      'preview.1Title': 'Mobilità e tecnologia', 'preview.1Text': 'Veicoli, navigazione, sicurezza e produzione.',
      'preview.2Title': 'Basi e spedizioni', 'preview.2Text': 'Spazi, logistica, viaggi e documentari.',
      'preview.3Title': 'Alleanze con uno scopo', 'preview.3Text': 'Idee di collaborazione senza accordi inventati.',
      'preview.4Title': 'Impatto a lungo termine', 'preview.4Text': 'Accessibilità, istruzione e sostenibilità.'
    },
    pt: {
      'meta.title': 'Horizonte Nómada | Visão futura da NÓMADA EXTREMO',
      'meta.description': 'Horizonte Nómada reúne ideias, tecnologias, alianças e projetos que podem definir a evolução futura da NÓMADA EXTREMO.',
      'nav.home': 'Início', 'nav.current': 'Horizonte Nómada',
      'hero.kicker': 'Visão a longo prazo', 'hero.titleA': 'HORIZONTE', 'hero.titleB': 'NÓMADA',
      'hero.lead': 'As ideias, tecnologias, alianças e sonhos que podem definir as próximas décadas da Nómada Extremo.',
      'hero.note': 'Uma visão editável e realista: conceitos de futuro, não compras, acordos ou compromissos confirmados.',
      'hero.primary': 'Explorar conceitos', 'hero.secondary': 'Ver cronologia',
      'intro.kicker': 'Um futuro conectado', 'intro.titleA': 'IDEIAS QUE', 'intro.titleB': 'SE TORNAM ROTA',
      'intro.p1': 'Horizonte Nómada organiza a visão futura da marca: que problemas cada ideia poderia resolver, que áreas ligaria e o que teria de ser validado antes de a concretizar.',
      'intro.p2': 'Cada conceito distingue claramente inspiração, design, estudo e prioridade. As fichas não implicam patrocínio, compra, instalação ou colaboração existente.',
      'categories.kicker': 'Oito direções', 'categories.titleA': 'UM MAPA', 'categories.titleB': 'DE POSSIBILIDADES',
      'category.movilidad': 'Mobilidade e veículos', 'category.tecnologia': 'Tecnologia pessoal', 'category.audiovisual': 'Câmaras e conteúdo',
      'category.alianzas': 'Colaborações sonhadas', 'category.bases': 'Bases e acampamentos', 'category.expediciones': 'Expedições e destinos',
      'category.impacto': 'Projetos de impacto', 'category.timeline': 'Cronologia da visão',
      'explorer.kicker': 'Explorador de conceitos', 'explorer.titleA': 'FILTRAR A', 'explorer.titleB': 'VISÃO',
      'explorer.lead': 'Combine categoria, horizonte e estado para perceber como cada ideia pode evoluir.',
      'explorer.dataNote': 'Dados locais editáveis · sem serviços externos',
      'filter.category': 'Categoria', 'filter.horizon': 'Horizonte', 'filter.state': 'Estado', 'filter.all': 'Todos',
      'filter.viewLabel': 'Modo de visualização', 'filter.grid': 'Grelha', 'filter.timeline': 'Cronologia', 'filter.reset': 'Limpar filtros',
      'empty.title': 'Nenhum conceito corresponde a esta combinação.', 'empty.text': 'Experimente outro horizonte ou limpe os filtros.',
      'timeline.kicker': 'Roteiro da visão', 'timeline.titleA': 'CRESCER SEM', 'timeline.titleB': 'PROMETER DEMAIS',
      'timeline.step1Title': 'Próximos passos', 'timeline.step1Text': 'Organizar necessidades, comparar tecnologias, validar ferramentas locais e ligar melhor o conteúdo atual.',
      'timeline.step2Title': 'Médio prazo', 'timeline.step2Text': 'Testar conceitos de mobilidade, acessibilidade, educação, alianças e logística com critérios verificáveis.',
      'timeline.step3Title': 'Longo prazo', 'timeline.step3Text': 'Conceber uma base conectada, ampliar expedições e criar uma estrutura profissional sustentável.',
      'timeline.step4Title': 'Visão de décadas', 'timeline.step4Text': 'Transformar aprendizagem, território, comunidade e tecnologia em projetos de impacto duradouro.',
      'principles.kicker': 'Critério editorial', 'principles.titleA': 'SONHAR', 'principles.titleB': 'COM OS PÉS NO CHÃO',
      'principles.p1Title': 'Sem acordos inventados.', 'principles.p1Text': 'As marcas são referências de afinidade, nunca patrocinadores confirmados.',
      'principles.p2Title': 'Sem dados de preenchimento.', 'principles.p2Text': 'Modelos, datas, orçamentos e imagens só aparecem quando existe informação fiável.',
      'principles.p3Title': 'Com ligações reais.', 'principles.p3Text': 'Cada ideia liga-se a áreas atuais que poderia melhorar: segurança, escola, material, viagens, audiovisual ou comunidade.',
      'related.kicker': 'Continue a explorar', 'related.titleA': 'DO HORIZONTE', 'related.titleB': 'AO PROJETO',
      'related.base': 'Base e acampamento', 'related.baseText': 'Espaços, frota e crescimento por fases.',
      'related.tech': 'Tecnologia', 'related.techText': 'Ferramentas aplicadas à segurança e à experiência.',
      'related.travel': 'Viagens', 'related.travelText': 'Destinos e janelas de aventura.',
      'related.project': 'Projeto completo', 'related.projectText': 'A arquitetura integral da Nómada Extremo.',
      'preview.kicker': 'Visão de futuro', 'preview.lead': 'Ideias, tecnologias, alianças e sonhos para as próximas décadas da Nómada Extremo, organizados com critério sem apresentar como reais acordos ou recursos ainda não confirmados.',
      'preview.cta': 'Explorar Horizonte Nómada',
      'preview.1Title': 'Mobilidade e tecnologia', 'preview.1Text': 'Veículos, navegação, segurança e produção.',
      'preview.2Title': 'Bases e expedições', 'preview.2Text': 'Espaços, logística, viagens e documentários.',
      'preview.3Title': 'Alianças com propósito', 'preview.3Text': 'Ideias de colaboração sem acordos inventados.',
      'preview.4Title': 'Impacto a longo prazo', 'preview.4Text': 'Acessibilidade, educação e sustentabilidade.'
    }
  };

  const phraseKeys = {
    'Todas': 'filter.all', 'Todos': 'filter.all',
    'Movilidad y vehículos': 'category.movilidad', 'Tecnología personal': 'category.tecnologia',
    'Cámaras y contenido': 'category.audiovisual', 'Colaboraciones soñadas': 'category.alianzas',
    'Bases y campamentos': 'category.bases', 'Expediciones y destinos': 'category.expediciones',
    'Proyectos de impacto': 'category.impacto', 'Próximos pasos': 'timeline.step1Title',
    'Medio plazo': 'timeline.step2Title', 'Largo plazo': 'timeline.step3Title', 'Visión de décadas': 'timeline.step4Title',
    'Explorar área relacionada': 'hero.primary', 'Limpiar filtros': 'filter.reset'
  };
  const dynamicPhrases = {
    en: {
      'Idea': 'Idea', 'En estudio': 'Under study', 'Diseñado': 'Designed', 'Prioridad futura': 'Future priority', 'Sueño a largo plazo': 'Long-term dream',
      'Logística': 'Logistics', 'Viajes': 'Travel', 'Material': 'Equipment', 'Seguridad': 'Safety', 'Navegación': 'Navigation',
      'Logbook': 'Logbook', 'Audiovisual': 'Audiovisual', 'Formación': 'Training', 'Comunidad': 'Community',
      'Sostenibilidad': 'Sustainability', 'Escuela': 'School', 'Inclusión': 'Inclusion',
      'Explorar área relacionada': 'Explore related area', 'Quitar de favoritos': 'Remove from favourites', 'Guardar en favoritos': 'Save to favourites'
    },
    fr: {
      'Idea': 'Idée', 'En estudio': 'À l’étude', 'Diseñado': 'Conçu', 'Prioridad futura': 'Priorité future', 'Sueño a largo plazo': 'Rêve à long terme',
      'Logística': 'Logistique', 'Viajes': 'Voyages', 'Material': 'Matériel', 'Seguridad': 'Sécurité', 'Navegación': 'Navigation',
      'Logbook': 'Journal de bord', 'Audiovisual': 'Audiovisuel', 'Formación': 'Formation', 'Comunidad': 'Communauté',
      'Sostenibilidad': 'Durabilité', 'Escuela': 'École', 'Inclusión': 'Inclusion',
      'Explorar área relacionada': 'Explorer le domaine associé', 'Quitar de favoritos': 'Retirer des favoris', 'Guardar en favoritos': 'Enregistrer dans les favoris'
    },
    de: {
      'Idea': 'Idee', 'En estudio': 'In Prüfung', 'Diseñado': 'Konzipiert', 'Prioridad futura': 'Zukünftige Priorität', 'Sueño a largo plazo': 'Langfristiger Traum',
      'Logística': 'Logistik', 'Viajes': 'Reisen', 'Material': 'Ausrüstung', 'Seguridad': 'Sicherheit', 'Navegación': 'Navigation',
      'Logbook': 'Logbuch', 'Audiovisual': 'Audiovisuelles', 'Formación': 'Ausbildung', 'Comunidad': 'Gemeinschaft',
      'Sostenibilidad': 'Nachhaltigkeit', 'Escuela': 'Schule', 'Inclusión': 'Inklusion',
      'Explorar área relacionada': 'Verwandten Bereich erkunden', 'Quitar de favoritos': 'Aus Favoriten entfernen', 'Guardar en favoritos': 'In Favoriten speichern'
    },
    it: {
      'Idea': 'Idea', 'En estudio': 'In fase di studio', 'Diseñado': 'Progettato', 'Prioridad futura': 'Priorità futura', 'Sueño a largo plazo': 'Sogno a lungo termine',
      'Logística': 'Logistica', 'Viajes': 'Viaggi', 'Material': 'Attrezzatura', 'Seguridad': 'Sicurezza', 'Navegación': 'Navigazione',
      'Logbook': 'Diario', 'Audiovisual': 'Audiovisivo', 'Formación': 'Formazione', 'Comunidad': 'Comunità',
      'Sostenibilidad': 'Sostenibilità', 'Escuela': 'Scuola', 'Inclusión': 'Inclusione',
      'Explorar área relacionada': 'Esplora l’area collegata', 'Quitar de favoritos': 'Rimuovi dai preferiti', 'Guardar en favoritos': 'Salva nei preferiti'
    },
    pt: {
      'Idea': 'Ideia', 'En estudio': 'Em estudo', 'Diseñado': 'Concebido', 'Prioridad futura': 'Prioridade futura', 'Sueño a largo plazo': 'Sonho a longo prazo',
      'Logística': 'Logística', 'Viajes': 'Viagens', 'Material': 'Material', 'Seguridad': 'Segurança', 'Navegación': 'Navegação',
      'Logbook': 'Diário de bordo', 'Audiovisual': 'Audiovisual', 'Formación': 'Formação', 'Comunidad': 'Comunidade',
      'Sostenibilidad': 'Sustentabilidade', 'Escuela': 'Escola', 'Inclusión': 'Inclusão',
      'Explorar área relacionada': 'Explorar área relacionada', 'Quitar de favoritos': 'Remover dos favoritos', 'Guardar en favoritos': 'Guardar nos favoritos'
    }
  };

  function language() {
    try {
      const value = localStorage.getItem('noext-language');
      return supported.includes(value) ? value : 'es';
    } catch (_) {
      return 'es';
    }
  }

  function value(key, lang = language()) {
    return copy[lang]?.[key] || copy.es[key] || '';
  }

  function apply(lang = language()) {
    document.querySelectorAll('[data-hz-i18n]').forEach(element => {
      element.dataset.noTranslate = '';
      const translated = value(element.dataset.hzI18n, lang);
      if (translated) element.textContent = translated;
    });
    document.querySelectorAll('[data-hz-aria]').forEach(element => {
      element.dataset.noTranslate = '';
      const translated = value(element.dataset.hzAria, lang);
      if (translated) element.setAttribute('aria-label', translated);
    });
    if (document.body.classList.contains('horizon-page')) {
      document.title = value('meta.title', lang);
      const description = value('meta.description', lang);
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    }
  }

  window.noextHorizonPhrase = source => {
    const translatedDynamic = dynamicPhrases[language()]?.[source];
    if (translatedDynamic) return translatedDynamic;
    const key = phraseKeys[source];
    return key ? value(key) : (typeof window.noextTranslate === 'function' ? window.noextTranslate(source) : source);
  };
  window.noextHorizonCount = count => {
    const lang = language();
    const forms = {
      es: count === 1 ? '1 concepto visible' : `${count} conceptos visibles`,
      en: count === 1 ? '1 visible concept' : `${count} visible concepts`,
      fr: count === 1 ? '1 concept visible' : `${count} concepts visibles`,
      de: count === 1 ? '1 sichtbares Konzept' : `${count} sichtbare Konzepte`,
      it: count === 1 ? '1 concetto visibile' : `${count} concetti visibili`,
      pt: count === 1 ? '1 conceito visível' : `${count} conceitos visíveis`
    };
    return forms[lang] || forms.es;
  };

  window.addEventListener('noext:languagechange', event => apply(event.detail?.language));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => apply());
  else apply();
  window.setTimeout(() => apply(), 150);
})();
