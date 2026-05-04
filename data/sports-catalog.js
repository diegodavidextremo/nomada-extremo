/* NOMADX sports catalog: generated from the 687-entry master list. */
(function () {
  'use strict';

  const CATEGORY_SOURCES = [
    ['aereos-vuelo-caida-libre', 'Aéreos, vuelo y caída libre', ['Paracaidismo','Salto tándem','Salto AFF','Freefall','Tracking','Angle flying','Formation skydiving','Canopy piloting','Swooping','Wingsuit','Wingsuit proximity','BASE jump','Salto BASE desde acantilado','Salto BASE desde edificio','Salto BASE desde antena','Salto BASE desde puente','Proximity flying','Parapente','Speed flying','Speed riding','Paramotor','Ala delta','Planeador','Vuelo sin motor','Ultraligero','Avioneta','Vuelo acrobático','Vuelo de montaña','Helicóptero panorámico','Helicóptero acrobático','Globo aerostático','Aerostación','Túnel de viento','Vuelo indoor','Canopy aéreo','Canopy tour','Zipline','Mega zipline','Tirolina extrema','Death slide','Zip jump','Skycoaster','Travesías expuestas con sensación de vacío','Rescate vertical con descenso aéreo']],
    ['saltos-vacio-pendulo-rebote', 'Saltos, vacío, péndulo y rebote', ['Rope jumping','Rope swing','Canyon swing','Giant swing','Puenting','Bungee jumping','Goming','Slingshot humano','Pendulum jump','Salto pendular','Salto al vacío con cuerda dinámica','Salto controlado desde puente','Salto controlado desde viaducto','Salto controlado desde cueva','Salto controlado desde acantilado','Free jump controlado','Salto con frenado progresivo','Salto tándem en vacío','Experiencias de caída libre','Experiencias de oscilación','Experiencias de rebote','Experiencias de péndulo con cuerda','Experiencias de péndulo con cable','Experiencias de péndulo con arnés','Salto desde plataforma','Salto desde roca al agua','Tombstoning','Cliff jumping','Cliff diving']],
    ['acuaticos-generales', 'Acuáticos generales', ['Natación','Natación en piscina','Natación en aguas abiertas','Natación recreativa','Natación técnica','Natación competitiva','Natación máster','Natación de larga distancia','Natación artística','Natación sincronizada','Técnica de crol','Técnica de braza','Técnica de espalda','Técnica de mariposa','Preparación física para nadadores','Travesías a nado','Cruces a nado','Cruces de bahías','Ocean swimming','Natación en agua helada','Baño invernal en mar','Baños de hielo','Inmersión fría','Swimrun','Aquatlón','Waterpolo','Salvamento y socorrismo','Saltos al agua','Diving recreativo','Bodyboard','Surf','Longboard','Shortboard','Softboard','Skimboard','Bodysurf','Handplane','Wakesurf','Wakeskate','Kneeboard','Paddle surf','SUP race','SUP surf','SUP touring','SUP yoga','Canoeing','Piragüismo','Canoa','Kayak recreativo','Kayak de travesía','Kayak de río','Kayak freestyle','Kayak extremo','Packraft','Rafting','Rafting extremo','Hydrospeed','Riverboarding','Tubing','Descenso de ríos','River trekking','Aquarunning','Flyboard','Jetpack acuático','Hoverboard acuático','Esquí acuático','Wakeboard','Slalom acuático','Motos de agua','Banana boat','Donut boat','Juegos de arrastre acuático','Deportes de arrastre acuático']],
    ['maritimos-oceanicos-navegacion', 'Marítimos, oceánicos y navegación', ['Longboard surf','Big wave surfing','Tow-in surf','Skimboard en shorebreak','Windsurf','Windfoil','Kitesurf','Kitefoil','Wingfoil','Foil surf','Downwind foil','E-foil','Vela','Vela ligera','Catamarán','Trimarán','Crucero a vela','Regata','Navegación oceánica','Navegación costera','Navegación astronómica','Travesía entre islas','Expedición en velero','Navegación de aventura','Navegación de varios días','Remo','Remo olímpico','Remo de mar','Dragon boat','Surfski','Kayak de mar','Pesca deportiva','Pesca deportiva desde costa','Pesca deportiva desde embarcación','Pesca al curricán','Pesca de altura','Pesca en apnea','Pesca a pulmón','Motos de agua en mar abierto','Parasailing','Towable sports','Powerboat','Offshore boating','Lanchas rápidas','Exploración de acantilados por mar','Travesías por calas','Surfari','Campamentos de surf','Rutas en zodiac','Observación de cetáceos','Expediciones costeras','Travesías a nado entre puntos de costa']],
    ['subacuaticos-inmersion', 'Subacuáticos e inmersión', ['Snorkel','Snorkeling técnico','Snorkel costero','Apnea','Freediving','Apnea estática','Apnea dinámica','Apnea dinámica con aletas','Apnea sin aletas','Apnea de profundidad','Apnea profunda','Free immersion','Constant weight','Variable weight','No limits','Spearfishing','Fotografía submarina','Vídeo submarino','Buceo recreativo','Buceo técnico','Buceo profundo','Buceo nocturno','Buceo en pecios','Buceo en cuevas','Cavern diving','Cave diving','Espeleobuceo','Sidemount diving','Rebreather diving','Buceo con nitrox','Buceo con trimix','Scooter subacuático','Orientación subacuática','Búsqueda y recuperación subacuática','Buceo desde barco','Buceo desde costa','Buceo bajo hielo','Ice diving','Buceo en corrientes','Drift dive','Navegación subacuática','Hockey subacuático','Rugby subacuático','Sirenismo','Monoaleta','Exploración subacuática','Arqueología subacuática','Rescate subacuático']],
    ['costa-mar-roca-acantilado', 'Costa, mar, roca y acantilado', ['Coasteering','Scrambling costero','Travesías por acantilados','Kayak entre cuevas marinas','Paddle surf en costa rocosa','Exploración de grietas marinas','Exploración de arcos marinos','Cuevas marinas','Cueva marina','Fotografía marina','Combinaciones de mar, roca y exposición','Psicobloc','Deep water solo','Saltos a pozas','Saltos desde roca','Salto desde acantilado']],
    ['terrestres-outdoor-aventura', 'Terrestres, outdoor y aventura', ['Senderismo','Trekking','Fast hiking','Excursionismo','Montañismo','Alpinismo','Trail running','Ultratrail','Running','Cross','Orientación','Navegación con mapa y brújula','Marcha nórdica','Acampada','Vivac','Bushcraft','Survival','Supervivencia','Expediciones','Geocaching','Cicloturismo','Ciclismo de carretera','Gravel','Bikepacking','Fastpacking','Trekking de varios días','Desert trekking','Jungle trekking','Travesías largas autosuficientes','Travesías sin asistencia','Travesías sin tecnología','Marchas de resistencia','Retos de desnivel','Non-stop mountain challenges','Expediciones autosuficientes','Búsqueda de agua','Búsqueda de fuego','Búsqueda de refugio','Autosuficiencia total o parcial','Rutas con mapa y brújula','Noches al raso','Observación de fauna','Rastreo','Fotografía de naturaleza','Fotografía de tormentas','Volcanes','Cuevas','Glaciares','Cascadas','Rutas de acantilados','Expediciones en selva','Expediciones en desierto','Expediciones en alta montaña','Expediciones polares','Expediciones remotas','Travesía de supervivencia','Retiro salvaje','Expedición fotográfica']],
    ['ciclismo-ruedas-deslizamiento', 'Ciclismo, ruedas y deslizamiento terrestre', ['MTB','XC','MTB XC','Enduro MTB','Downhill','DH','Downhill extremo','Freeride MTB','Dirt jump','BMX race','BMX street','BMX park','BMX dirt','BMX freestyle','BMX','Bike trial','Ciclocrós','Ciclismo urbano','Ciclismo en pista','Ciclismo adaptado','Handbike','Skate','Skate street','Skate park','Vert','Bowl','Longboard','Longboard dancing','Downhill longboard','Inline','Patinaje en línea','Roller freestyle','Roller aggressive','Patinaje agresivo','Scooter freestyle']],
    ['montana-roca-verticales-cuerda', 'Montaña, roca, verticales y cuerda', ['Escalada','Escalada deportiva','Escalada tradicional','Escalada clásica','Escalada alpina','Escalada artificial','Escalada en bloque','Búlder','Solo integral','Free solo','Multipitch','Vía larga','Big wall','Fisura','Chimenea','Escalada en hielo','Mixed climbing','Dry tooling','Vía ferrata','Ferrata extrema','Alpinismo técnico','Crestas','Aristas','Corredores','Canaletas','Ascensiones glaciales','Rápel','Rápel guiado','Rápel volado','Descenso por cuerda en volado','Descenso por cañones','Espeleología','Espeleología vertical','Espeleo-barranco','Puentes tibetanos','Puente tibetano de gran exposición','Pasamanos','Maniobras con cuerda','Ascenso por cuerda','Jumar','Rescate vertical','Rescate en pared','Highline','Slackline','Slackline en altura','Waterline aérea','Rodeo line','Travesías aéreas sobre vacío','Dormir en pared','Vivac en pared','Vivac en cresta','Amanecer en cumbre','Atardecer en acantilado','Primera vía larga']],
    ['barrancos-canones-roca-agua', 'Barrancos, cañones y roca-agua', ['Barranquismo','Canyoning','Barrancos secos','Barrancos acuáticos','Barrancos técnicos','Barranquismo seco','Barranquismo acuático','Barranquismo técnico','Descenso de cascadas','Rápel en cascada','Toboganes naturales','Progresión por lecho rocoso','Descenso encadenado con saltos, rápeles y nado','Combinaciones de escalada, agua, cuerda y vacío','Torrentismo','Rope jump en cañón','Canyon swing en cañón','Zipline en cañón','Primer barranco técnico']],
    ['nieve-hielo-frio-extremo', 'Nieve, hielo y frío extremo', ['Esquí alpino','Esquí de fondo','Esquí de travesía','Esquí de montaña','Freeride','Freestyle ski','Snowboard','Splitboard','Snowkite','Trineo','Mushing','Motos de nieve','Raquetas de nieve','Alpinismo invernal','Trekking invernal','Travesía glaciar','Progresión con crampones','Auto-detención con piolet','Descenso de glaciares','Supervivencia invernal','Polar trekking','Expediciones en entornos nevados','Expediciones en entornos congelados']],
    ['motor-velocidad-potencia', 'Motor, velocidad y potencia', ['Motocross','Enduro','Hard enduro','Trial','Supermotard','Velocidad en circuito','Minimotos','Quad','ATV','UTV','Buggy','4x4','Off-road','Rally','Rally raid','Raids en desierto','Drifting','Karting','Automovilismo','Track day','Conducción deportiva','Conducción en hielo','Conducción en arena','Wake con lancha']],
    ['urbanos-calle-accion', 'Urbanos, calle y acción', ['Parkour','Freerunning','Tricking','Parkour nocturno','Urban exploration','Rooftopping','Trampolines','Ninja warrior','OCR urbana','Láser tag','Paintball','Airsoft recreativo','Casas del terror','Escape rooms de terror','Escape rooms de aventura','Circuitos multiaventura']],
    ['fuerza-fitness-rendimiento', 'Fuerza, fitness, rendimiento y cuerpo físico', ['Crossfit','Cross training','Entrenamiento funcional','Fuerza funcional','Calistenia','Calistenia urbana','Street workout','Halterofilia','Powerlifting','Strongman','Culturismo','Fitness competitivo','Dominadas lastradas','Gimnasia','Gimnasia artística','Gimnasia rítmica','Gimnasia acrobática','HYROX','OCR','Carreras de obstáculos','OCR de larga distancia']],
    ['resistencia-desafio-ultradistancia', 'Resistencia, desafío y ultradistancia', ['Atletismo','Maratón','Media maratón','Ultramaratón','Triatlón','Duatlón','Ironman','Half Ironman','Pentatlón','Ultraresistencia','Raids de aventura','Raid de aventura','Brevet ciclista','Travesías alpinas','Everesting','Desafíos de resistencia combinada','Pruebas de gran carga física','Pruebas de gran carga mental','Pruebas de riesgo objetivo']],
    ['deportes-equipo-balon', 'Deportes de equipo y balón', ['Fútbol','Fútbol sala','Fútbol playa','Baloncesto','Baloncesto 3x3','Balonmano','Balonmano playa','Voleibol','Vóley playa','Rugby','Rugby 7','Hockey hierba','Hockey sala','Lacrosse','Béisbol','Sóftbol','Ultimate frisbee','Korfball']],
    ['raqueta-pala-golpeo', 'Raqueta, pala y golpeo', ['Tenis','Pádel','Bádminton','Squash','Frontón','Pelota vasca','Pickleball','Tenis de mesa','Beach tennis']],
    ['combate-artes-marciales', 'Combate y artes marciales', ['Boxeo','Kickboxing','Muay thai','MMA','Lucha libre','Lucha grecorromana','Judo','Karate','Taekwondo','Jiu-jitsu brasileño','Jiu-jitsu tradicional','Sambo','Esgrima','Kendo','Aikido','Hapkido','Krav maga']],
    ['ecuestres-animales', 'Ecuestres y con animales', ['Equitación','Salto ecuestre','Doma','Raid ecuestre','Volteo','Actividades deportivas con animales']],
    ['precision-tecnica-habilidad', 'Precisión, técnica y habilidad', ['Tiro con arco','Tiro deportivo','Dardos','Billar','Golf','Minigolf']],
    ['bienestar-movilidad-cuerpo-mente', 'Bienestar, movilidad y cuerpo-mente', ['Yoga','Pilates','Movilidad','Stretching','Respiración','Animal flow','Acroyoga','Recuperación activa','Wellness deportivo','Senderismo consciente','Natación suave','Rehabilitación física','Entrenamiento respiratorio']],
    ['competicion-disciplinas-organizadas', 'Competición y disciplinas organizadas', ['Escalada de bloque','Escalada de dificultad','Escalada de velocidad','Surf competitivo','Bodyboard competitivo','Windsurf competitivo','Kitesurf competitivo','Wingfoil competitivo','Vela competitiva','Remo competitivo','Piragüismo competitivo','Enduro competitivo','DH competitivo','Rally competitivo','Motocross competitivo','Apnea competitiva','Paracaidismo deportivo','Orientación competitiva']],
    ['mixtas-hibridas-multiactividad', 'Mixtas, híbridas y multiactividad', ['Aventura de cuerda + agua + vacío','Travesía mar-montaña','Kayak + apnea','Trekking + escalada + vivac','Ferrata + rápel + salto','Expediciones multiactividad','Retos que unen aire, roca, mar, frío, velocidad y resistencia','Bikepacking alpino','Speed riding como actividad híbrida de aire y nieve','Barranquismo como actividad híbrida roca-agua-cuerda','Coasteering como actividad híbrida mar-roca-salto','Psicobloc como actividad híbrida escalada-mar-caída','Swimrun como actividad híbrida natación-running','Surfari como viaje deportivo híbrido','Aventura costera multiactividad','Experiencias combinadas de mar, roca y exposición']],
    ['experiencias-aventura-vivencias', 'Experiencias de aventura y vivencias intensas', ['Primer tándem de paracaidismo','Primer vuelo en parapente','Primera gran expedición','Primera travesía oceánica','Primer buceo técnico','Primer ultra','Primer evento organizado','Primer spot documentado','Primer match deportivo','Primera tribu creada','Expedición en isla remota','Snorkel con grandes pelágicos','Buceo en pecio','Travesía nocturna','Tormenta en montaña','Ruta de acantilados','Atardecer en acantilado','Amanecer en cumbre','Baño invernal en mar','Salto desde acantilado','Navegación de varios días','Cueva marina','Retiro salvaje','Expedición fotográfica','Vivencias donde el entorno es protagonista','Vivencias donde el riesgo controlado es protagonista','Vivencias donde la intensidad emocional es protagonista']],
    ['extra-nombres-concretos', 'Lista extra de nombres concretos que no deben perderse', ['Softboard','Handplane','Wakeskate','Surfski','Packraft','Riverboarding','Hydrospeed','Sidemount','Rebreather','Dry tooling','Mixed climbing','Splitboard','Snowkite','Downwind foil','Kitefoil','Windfoil','E-foil','Freerunning','Street workout','OCR','HYROX','Everesting','Fastpacking','Bushcraft','Coasteering','Raid de aventura']]
  ];

  const FEATURED_ORDER = ['Paracaidismo','Salto tándem','Salto AFF','Wingsuit','BASE jump','Parapente','Paramotor','Ala delta','Rope jumping','Puenting','Bungee jumping','Cliff jumping','Cliff diving','Coasteering','Surf','Kitesurf','Wingfoil','E-foil','Kayak de mar','Snorkel costero','Apnea','Freediving','Buceo recreativo','Buceo técnico','Cave diving','Senderismo','Trekking','Trail running','MTB','Enduro MTB','Downhill','Escalada','Vía ferrata','Barranquismo','Espeleología','Highline','Snowboard','Esquí de montaña','Motocross','Parkour','Crossfit','HYROX','OCR','Triatlón','Yoga','Fotografía de naturaleza'];

  const CATEGORY_EMOJI = {
    'aereos-vuelo-caida-libre': '🪂',
    'saltos-vacio-pendulo-rebote': '⚡',
    'acuaticos-generales': '🏊',
    'maritimos-oceanicos-navegacion': '🌊',
    'subacuaticos-inmersion': '🤿',
    'costa-mar-roca-acantilado': '🪨',
    'terrestres-outdoor-aventura': '🥾',
    'ciclismo-ruedas-deslizamiento': '🚵',
    'montana-roca-verticales-cuerda': '🧗',
    'barrancos-canones-roca-agua': '💧',
    'nieve-hielo-frio-extremo': '❄️',
    'motor-velocidad-potencia': '🏁',
    'urbanos-calle-accion': '🏙️',
    'fuerza-fitness-rendimiento': '💪',
    'resistencia-desafio-ultradistancia': '🏃',
    'deportes-equipo-balon': '⚽',
    'raqueta-pala-golpeo': '🎾',
    'combate-artes-marciales': '🥊',
    'ecuestres-animales': '🏇',
    'precision-tecnica-habilidad': '🎯',
    'bienestar-movilidad-cuerpo-mente': '🧘',
    'competicion-disciplinas-organizadas': '🏆',
    'mixtas-hibridas-multiactividad': '🧭',
    'experiencias-aventura-vivencias': '🔥',
    'extra-nombres-concretos': '📌'
  };

  const ALIASES = {
    'Paracaidismo': ['skydiving'],
    'Salto tándem': ['tandem skydiving', 'primer salto acompañado'],
    'Salto AFF': ['accelerated free fall', 'curso AFF'],
    'BASE jump': ['salto base'],
    'Wingsuit proximity': ['proximity flying con wingsuit'],
    'Parapente': ['paragliding'],
    'Paramotor': ['powered paragliding'],
    'Ala delta': ['hang gliding'],
    'Rope jumping': ['salto con cuerda'],
    'Puenting': ['salto desde puente con cuerda'],
    'Bungee jumping': ['salto con goma elástica'],
    'Goming': ['salto con goma'],
    'Cliff jumping': ['salto desde roca al agua', 'salto desde acantilado'],
    'Cliff diving': ['saltos ornamentales desde acantilado'],
    'Surf': ['surfing'],
    'Longboard surf': ['longboard', 'tablón de surf'],
    'Longboard skate': ['longboard', 'longboarding terrestre'],
    'Kitesurf': ['kiteboarding'],
    'E-foil': ['efoil', 'electric foil'],
    'Snorkel': ['snorkeling'],
    'Freediving': ['apnea deportiva'],
    'Buceo recreativo': ['scuba diving recreativo'],
    'Buceo técnico': ['technical diving'],
    'Cave diving': ['buceo en cuevas técnico'],
    'Cavern diving': ['buceo en cavernas'],
    'Sidemount diving': ['sidemount'],
    'Rebreather diving': ['rebreather', 'CCR'],
    'MTB': ['BTT', 'mountain bike'],
    'Enduro MTB': ['enduro mountain bike'],
    'Downhill': ['DH'],
    'Escalada': ['climbing'],
    'Vía ferrata': ['ferrata'],
    'Barranquismo': ['canyoning', 'torrentismo'],
    'Canyoning': ['barranquismo'],
    'Espeleología': ['caving'],
    'Highline': ['slackline en altura'],
    'Crossfit': ['CrossFit'],
    'HYROX': ['hyrox race'],
    'OCR': ['carreras de obstáculos'],
    'Yoga': ['yoga deportivo'],
    'Fotografía de naturaleza': ['wildlife photography', 'fotografía outdoor']
  };

  const HOMONYM_RENAMES = {
    'acuaticos-generales::Longboard': 'Longboard surf',
    'ciclismo-ruedas-deslizamiento::Longboard': 'Longboard skate',
    'motor-velocidad-potencia::Enduro': 'Enduro moto',
    'motor-velocidad-potencia::Trial': 'Trial moto'
  };

  function slugify(value) {
    return value.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function unique(values) {
    return [...new Set(values.filter(Boolean))];
  }

  function inferEnvironment(name, categoryId) {
    const n = name.toLowerCase();
    const env = [];
    if (/paraca|wingsuit|base|parapente|paramotor|ala delta|vuelo|globo|aero|helicóptero|zip|tirolina|canopy|speed flying|speed riding|freefall|tracking/.test(n) || categoryId.includes('aereos')) env.push('aire', 'vuelo');
    if (/caída|freefall|base|salto|vacío|pendul|bungee|puenting|rope|swing|slingshot|cliff/.test(n)) env.push('caída libre', 'vacío', 'cuerda');
    if (/cliff|tombstoning|salto desde roca|salto desde acantilado|salto controlado desde acantilado/.test(n)) env.push('agua', 'mar', 'costa', 'roca');
    if (/agua|natación|nado|mar|surf|sup|kayak|canoa|raft|hydro|river|snorkel|apnea|buceo|foil|vela|remo|pesca|motos de agua|wake|flyboard|cost|oce|bahía|lago|piscina|subacu|pecio|ice diving/.test(n) || categoryId.includes('acuaticos') || categoryId.includes('maritimos') || categoryId.includes('subacuaticos')) env.push('agua');
    if (/mar|oce|costa|playa|calas|acantilado|shorebreak|zodiac|cetáceos|cueva marina/.test(n) || categoryId.includes('costa') || categoryId.includes('maritimos')) env.push('mar', 'costa', 'océano');
    if (/río|rios|river|rafting|torrent|barranco|cañon|canyon/.test(n) || categoryId.includes('barrancos')) env.push('río', 'barranco');
    if (/lago|pantano/.test(n)) env.push('lago');
    if (/piscina|waterpolo/.test(n)) env.push('piscina');
    if (/buceo|apnea|submar|subacu|freediving|sidemount|rebreather|nitrox|trimix|cave diving|cavern/.test(n) || categoryId.includes('subacuaticos')) env.push('subacuático');
    if (/monta|trek|sender|trail|alpin|cumbre|glaciar|cresta|arista|expedición|vivac|fastpacking|everesting|raquetas|esquí|snow|splitboard|polar|desierto|selva|volcan/.test(n) || categoryId.includes('terrestres') || categoryId.includes('montana')) env.push('montaña', 'naturaleza');
    if (/roca|escalad|boulder|búlder|ferrata|pared|fisura|chimenea|psicobloc|dry tooling|mixed|rapel|rápel/.test(n) || categoryId.includes('verticales')) env.push('roca', 'vertical');
    if (/cueva|espeleo|cavern|cave|subterr/.test(n)) env.push('cueva', 'exploración');
    if (/nieve|hielo|frío|invernal|esquí|snow|splitboard|mushing|polar|glaciar|crampones|piolet/.test(n) || categoryId.includes('nieve')) env.push('nieve', 'hielo', 'frío');
    if (/motor|moto|quad|atv|utv|buggy|4x4|rally|kart|drift|automovil|lancha|powerboat/.test(n) || categoryId.includes('motor')) env.push('motor', 'velocidad');
    if (/urb|street|parkour|freerunning|skate|bmx|roller|inline|scooter|rooftop|tricking|escape|láser|paintball|airsoft/.test(n) || categoryId.includes('urbanos')) env.push('urbano', 'calle');
    if (/crossfit|training|funcional|fuerza|halter|power|strong|calistenia|gimnasia|hyrox|ocr|fitness|dominadas/.test(n) || categoryId.includes('fuerza')) env.push('fitness', 'fuerza');
    if (/trail|ultra|maratón|triatlón|duatlón|ironman|resistencia|everesting|brevet|raid|running|atletismo/.test(n) || categoryId.includes('resistencia')) env.push('resistencia');
    if (/fútbol|baloncesto|balonmano|vole|rugby|hockey|lacrosse|béisbol|softbol|frisbee|korfball/.test(n)) env.push('balón');
    if (/tenis|pádel|badminton|squash|frontón|pickle|raqueta|pala/.test(n)) env.push('raqueta');
    if (/box|kick|muay|mma|lucha|judo|karate|taekwondo|jiu|sambo|esgrima|kendo|aikido|krav/.test(n)) env.push('combate');
    if (/equit|ecuestre|doma|volteo|animales|mushing/.test(n)) env.push('animales');
    if (/tiro|arco|dardos|billar|golf|orientación|navegación|técnica/.test(n)) env.push('precisión');
    if (/yoga|pilates|movilidad|stretching|respiración|wellness|rehabilitación|recuperación|consciente/.test(n)) env.push('bienestar', 'movilidad');
    if (/híbrida|\+|combinad|multiactividad|multiaventura|swimrun|aquatlón|triatlón|duatlón|pentatlón/.test(n) || categoryId.includes('mixtas')) env.push('híbrido');
    if (/experiencia|vivencia|primer|primera|atardecer|amanecer|tormenta|retiro|baño|campamento/.test(n) || categoryId.includes('experiencias')) env.push('experiencia');
    if (/compet|regata|carrera|race|olímpico|hyrox|ocr|ironman|rally/.test(n) || categoryId.includes('competicion')) env.push('competición');
    if (/superviv|bushcraft|autosuf|refugio|fuego/.test(n)) env.push('supervivencia');
    if (/familia|infantil|recreativo|suave|baño|campamento|banana|donut|juegos/.test(n)) env.push('familia', 'recreativo');
    return unique(env.length ? env : ['naturaleza', 'recreativo']);
  }

  function inferRisk(name, categoryId) {
    const n = name.toLowerCase();
    if (/wingsuit proximity|base|salto base|proximity flying|free solo|solo integral|rope jumping|rope jump|puenting|bungee|goming|pendulum|salto pendular|slingshot|cliff jumping|cliff diving|tombstoning|no limits|cave diving|espeleobuceo|buceo bajo hielo|ice diving|rooftopping|helicóptero acrobático|speed riding|speed flying|big wave|tow-in|free jump|salto al vacío|salto controlado|canyon swing/.test(n)) return 'negro';
    if (/parapente|paramotor|ala delta|paracaidismo|aff|vuelo acrobático|ultraligero|barranquismo|canyoning|torrentismo|espeleología|buceo|apnea|freediving|rebreather|sidemount|trimix|nitrox|pecio|cavern|escalada|ferrata|alpinismo|highline|rapel|rápel|rescate|motos de agua|motocross|hard enduro|trial moto|rally|quad|atv|utv|off-road|downhill|freeride|kayak extremo|rafting extremo|hydrospeed|riverboarding|snowkite|splitboard|travesía glaciar|supervivencia invernal|polar|tormenta|técnic|gran exposición|autodetención|crampones|piolet/.test(n)) return 'rojo';
    if (/yoga|pilates|movilidad|stretching|respiración|wellness|rehabilitación|recuperación|senderismo consciente|natación suave|dardos|billar|minigolf|golf|geocaching|observación|fotografía de naturaleza|fotografía marina|baño invernal|baños de hielo|inmersión fría|banana|donut|juegos|escape rooms|casas del terror/.test(n)) return 'verde';
    if (categoryId.includes('combate')) return 'amarillo';
    return 'amarillo';
  }

  function inferTypes(name, categoryId, riskLevel) {
    const n = name.toLowerCase();
    const types = [];
    if (/compet|regata|carrera|race|olímpico|ironman|hyrox|ocr|rally|atletismo|maratón|triatlón|duatlón|pentatlón/.test(n) || categoryId.includes('competicion')) types.push('competición');
    if (/primer|primera|experiencia|vivencia|atardecer|amanecer|tormenta|baño|retiro|campamento|observación|travesía|expedición|viaje/.test(n) || categoryId.includes('experiencias')) types.push('experiencia', 'vivencia');
    if (/curso|formación|técnica|maniobras|rescate|orientación|navegación|rapel|rápel|crampones|piolet|jumar/.test(n)) types.push('técnica', 'formación');
    if (/híbrida|\+|combinad|multiaventura|multiactividad|swimrun|aquatlón|triatlón|duatlón|pentatlón|raid/.test(n) || categoryId.includes('mixtas')) types.push('híbrida', 'aventura');
    if (/yoga|pilates|movilidad|stretching|respiración|wellness|rehabilitación|recuperación|consciente/.test(n)) types.push('bienestar');
    if (/crossfit|fuerza|halter|power|strong|calistenia|fitness|gimnasia|hyrox/.test(n) || categoryId.includes('fuerza')) types.push('fuerza');
    if (/trail|ultra|maratón|ironman|everesting|brevet|resistencia|running/.test(n) || categoryId.includes('resistencia')) types.push('resistencia');
    if (/motor|moto|quad|atv|utv|buggy|rally|kart|drift|4x4|powerboat/.test(n)) types.push('motor');
    if (/urb|street|parkour|freerunning|skate|bmx|roller|scooter|rooftop|tricking/.test(n)) types.push('urbano');
    if (/equipo|fútbol|baloncesto|balonmano|vole|rugby|hockey|lacrosse|béisbol|frisbee|korfball|waterpolo/.test(n)) types.push('equipo');
    if (/tiro|arco|dardos|billar|golf|orientación|navegación/.test(n)) types.push('precisión');
    if (/agua|mar|surf|sup|kayak|canoa|buceo|apnea|snorkel|vela|remo|foil|rafting/.test(n)) types.push('agua');
    if (/paraca|wingsuit|base|parapente|paramotor|vuelo|globo|ala delta/.test(n)) types.push('aire');
    if (/monta|roca|escalada|barranco|sender|trail|alpin|nieve|hielo|ferrata|cueva|espeleo/.test(n)) types.push('montaña');
    if (/naturaleza|fauna|rastro|volc|cueva|glaciar|cascada|selva|desierto|ambiental|fotografía/.test(n)) types.push('naturaleza');
    if (riskLevel === 'negro') types.push('extremo');
    if (!types.includes('deporte') && !types.includes('experiencia')) types.unshift('deporte');
    if (!types.includes('actividad') && !types.includes('competición')) types.push('actividad');
    if (/recreativ|suave|banana|donut|juegos|familia/.test(n)) types.push('recreativo');
    return unique(types);
  }

  function materialFor(entry) {
    const env = entry.environment.join(' ');
    if (entry.riskLevel === 'negro') return 'formación específica, autorización cuando proceda, planificación, supervisión, material certificado y entorno controlado';
    if (env.includes('subacuático')) return 'equipo de inmersión adecuado, compañero, señalización, certificación o supervisión y control de condiciones';
    if (env.includes('aire')) return 'equipo aeronáutico certificado, formación, revisión meteorológica, zona autorizada y supervisión cualificada';
    if (env.includes('cuerda') || env.includes('vertical')) return 'casco, arnés, cuerda o protecciones homologadas, revisión cruzada, formación y gestión del entorno';
    if (env.includes('agua')) return 'equipo acuático adecuado, flotación cuando proceda, conocimiento del spot, meteorología y salida segura';
    if (env.includes('nieve') || env.includes('hielo')) return 'ropa técnica, equipo invernal, evaluación de nieve/hielo, comunicación y plan de emergencia';
    if (env.includes('motor')) return 'casco, protecciones, vehículo revisado, permisos o circuito y respeto de normativa';
    if (env.includes('fitness') || env.includes('fuerza')) return 'ropa deportiva, hidratación, técnica ajustada al nivel y progresión controlada';
    return 'material adecuado al entorno, hidratación, comunicación, revisión de condiciones y respeto ambiental';
  }

  function descriptionFor(name, category, riskLevel) {
    const base = `${name} dentro del catálogo NOMADX: disciplina, modalidad, actividad o vivencia asociada a ${category.toLowerCase()}, pensada para ADN deportivo, matching, planes, spots, Logbook y cultura de seguridad.`;
    if (riskLevel === 'negro') return `${base} Requiere enfoque experto, verificación del entorno y gestión seria del riesgo.`;
    if (riskLevel === 'rojo') return `${base} Tiene componente técnico o exposición relevante y exige formación, material adecuado y condiciones favorables.`;
    return base;
  }

  function buildCatalog() {
    const categoryLookup = new Map(CATEGORY_SOURCES.map(([id, name]) => [id, name]));
    const bySlug = new Map();
    CATEGORY_SOURCES.forEach(([categoryId, categoryName, names]) => {
      names.forEach((originalName) => {
        const displayName = HOMONYM_RENAMES[`${categoryId}::${originalName}`] || originalName;
        const id = slugify(displayName);
        const environment = inferEnvironment(displayName, categoryId);
        const riskLevel = inferRisk(displayName, categoryId);
        const type = inferTypes(displayName, categoryId, riskLevel);
        const existing = bySlug.get(id);
        if (existing) {
          existing.aliases = unique([...(existing.aliases || []), originalName]);
          existing.secondaryCategories = unique([...(existing.secondaryCategories || []), categoryName]);
          existing.environment = unique([...existing.environment, ...environment]);
          existing.type = unique([...existing.type, ...type]);
          return;
        }
        const entry = {
          id,
          name: displayName,
          aliases: unique([...(ALIASES[displayName] || []), ...(displayName !== originalName ? [originalName] : [])]),
          category: categoryName,
          cat: categoryId,
          secondaryCategories: [],
          environment,
          type,
          riskLevel,
          risk: riskLevel === 'verde' ? 'low' : riskLevel === 'amarillo' ? 'medium' : riskLevel === 'rojo' ? 'high' : 'extreme',
          intensity: riskLevel === 'verde' ? 'baja' : riskLevel === 'amarillo' ? 'media' : riskLevel === 'rojo' ? 'alta' : 'extrema',
          technicalLevel: riskLevel === 'verde' ? 'iniciación' : riskLevel === 'amarillo' ? 'intermedio' : riskLevel === 'rojo' ? 'avanzado' : 'experto',
          material: '',
          matchable: true,
          logbook: true,
          plans: true,
          emoji: CATEGORY_EMOJI[categoryId] || '🧭',
          description: descriptionFor(displayName, categoryName, riskLevel),
          desc: '',
          related: [],
          tribes: []
        };
        entry.material = materialFor(entry);
        entry.desc = entry.description;
        bySlug.set(id, entry);
      });
    });

    const catalog = [...bySlug.values()];
    catalog.forEach((entry) => {
      const related = catalog
        .filter((other) => other.id !== entry.id && (other.cat === entry.cat || other.environment.some((env) => entry.environment.includes(env))))
        .slice(0, 5)
        .map((other) => other.name);
      entry.related = related;
      entry.tribes = recommendTribes(entry);
    });

    const featuredRank = new Map(FEATURED_ORDER.map((name, index) => [slugify(name), index]));
    return catalog.sort((a, b) => {
      const ar = featuredRank.has(a.id) ? featuredRank.get(a.id) : 9999;
      const br = featuredRank.has(b.id) ? featuredRank.get(b.id) : 9999;
      if (ar !== br) return ar - br;
      const ac = CATEGORY_SOURCES.findIndex(([id]) => id === a.cat);
      const bc = CATEGORY_SOURCES.findIndex(([id]) => id === b.cat);
      return ac - bc || a.name.localeCompare(b.name, 'es');
    });
  }

  function recommendTribes(entry) {
    const env = entry.environment.join(' ');
    const name = entry.name.toLowerCase();
    const tribes = [];
    if (env.includes('aire')) tribes.push('Air Sports');
    if (env.includes('mar') || env.includes('agua')) tribes.push('Sea Tribe');
    if (env.includes('montaña')) tribes.push('Trail & Mountain');
    if (env.includes('vertical') || env.includes('roca')) tribes.push('Vertical Zone');
    if (env.includes('cueva')) tribes.push('Cave Explorers');
    if (/mtb|bike|bmx|cicl|gravel/.test(name)) tribes.push('MTB Riders');
    if (env.includes('nieve') || env.includes('hielo')) tribes.push('Snow & Ice');
    if (env.includes('motor')) tribes.push('Motor Off-Road');
    if (env.includes('urbano')) tribes.push('Urban Action');
    if (env.includes('fitness') || env.includes('fuerza')) tribes.push('Functional Athletes');
    if (env.includes('naturaleza') || /fotografía|creador|observación/.test(name)) tribes.push('Outdoor Creators');
    if (env.includes('familia')) tribes.push('Adventure Families');
    if (entry.riskLevel === 'negro') tribes.push('Extreme Jumpers');
    if (/apnea|freediving|snorkel/.test(name)) tribes.push('Freediving Circle');
    return unique(tribes).slice(0, 4);
  }

  window.SPORTS_CATALOG_CATEGORIES = [
    { id: 'all', name: 'Todas', emoji: '🌐' },
    ...CATEGORY_SOURCES.map(([id, name]) => ({ id, name, emoji: CATEGORY_EMOJI[id] || '🧭' }))
  ];
  window.SPORTS_CATALOG = buildCatalog();
  window.SPORTS_CATALOG_SOURCE_TOTAL = CATEGORY_SOURCES.reduce((total, [, , names]) => total + names.length, 0);
})();
