/* ═══════════════════════════════════════
   NÓMADA EXTREMO v2 — JAVASCRIPT GLOBAL
   ═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── REVEAL ON SCROLL ─── */
  const revObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 70);
        revObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.07 });
  document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

  /* ─── AUTO REVEAL PARA CARDS ─── */
  const cardSel = '.card,.ficha,.equipo-card,.testi-card,.blog-card,.pack-card,.bono-card,.curso-card,.seg-item,.alquiler-cat,.act-card,.sello,.pilar,.nat-valor,.multi-card';
  const cardObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
        }, i * 55);
        cardObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.05 });
  document.querySelectorAll(cardSel).forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease ${i * 40}ms, transform 0.6s ease ${i * 40}ms`;
    cardObs.observe(el);
  });

  /* --- ENRIQUECIMIENTO DE TARJETAS EXISTENTES --- */
  const normalizeTitle = (txt = '') => txt
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase();

  const renderList = (label, items) => items && items.length
    ? `<div class="detail-row"><span>${label}</span><p>${items.join(', ')}</p></div>`
    : '';

  const activityData = {
    'SENDERISMO GUIADO': {
      base: ['Águilas, Sierra de la Almenara y Cabo Cope'],
      zonas: ['Cuatro Calas', 'Monte del Castillo', 'Peñón del Roncaor', 'Isla del Fraile', 'Rambla del Cañarete'],
      salidas: ['Sierra Espuña', 'Calblanque', 'Ricote', 'Cieza', 'Moratalla'],
      ideal: 'Senderismo familiar, rutas fotográficas, orientación básica, atardeceres y lectura del paisaje mediterráneo.',
      seguridad: 'Revisión de meteorología, insolación, distancia, desnivel, agua disponible y nivel real del grupo.'
    },
    'TREKKING DE CRESTAS': {
      base: ['Águilas, Sierra de la Almenara y Cabo Cope'],
      zonas: ['Cabeza del Caballo', 'entorno Águilas-Calnegre', 'Cabo Cope', 'ramblas interiores'],
      salidas: ['Sierra Espuña', 'Ricote', 'Cresta del Gallo'],
      ideal: 'Trekking mediterráneo, progresión por terreno irregular, crestas suaves y fotografía de paisaje.',
      seguridad: 'Actividad sujeta a viento, calor, exposición, terreno suelto, accesos y experiencia del grupo.'
    },
    'VIVAC Y TRAVESIA': {
      base: ['Salida especial desde Águilas'],
      zonas: ['Sierra de la Almenara solo como vivac interpretativo autorizado si procede'],
      salidas: ['Sierra Espuña', 'Ricote', 'Moratalla', 'Calblanque según normativa'],
      ideal: 'Travesía, pernocta, autosuficiencia básica, orientación y amanecer en montaña.',
      seguridad: 'Permisos, normativa ambiental, meteorología, material de pernocta, agua, temperatura y plan de emergencia.'
    },
    'MARCHA DE MONTAÑA': {
      base: ['Águilas y Sierra de la Almenara'],
      zonas: ['Cabo Cope', 'Cuatro Calas', 'Rambla del Cañarete', 'Calabardina', 'Águilas-Calnegre'],
      salidas: ['Sierra Espuña', 'Ricote', 'Cieza'],
      ideal: 'Grupos escolares, clubes, preparación física, rutas largas y orientación básica.',
      seguridad: 'Se ajusta ritmo, distancia, desnivel, paradas, agua y horario a la estación del año.'
    },
    'MONTAÑISMO': {
      base: ['Salida especial desde Águilas'],
      zonas: ['Sierra de la Almenara como entrenamiento local'],
      salidas: ['Sierra Espuña', 'Moratalla', 'Ricote', 'Cresta del Gallo'],
      ideal: 'Ascensiones, montaña técnica moderada, travesías y formación progresiva.',
      seguridad: 'Requiere validación de nivel, material, meteorología, orientación y plan de emergencia.'
    },
    'SCRAMBLING': {
      base: ['Águilas solo en trepadas costeras controladas y validadas'],
      zonas: ['Cabo Cope', 'Sierra de la Almenara', 'terreno rocoso autorizado'],
      salidas: ['Sierra Espuña', 'La Panocha', 'Cresta del Gallo'],
      ideal: 'Progresión por roca fácil, técnica de pies y manos, equilibrio y lectura de terreno.',
      seguridad: 'Sin exposición innecesaria. El guía puede convertir la ruta en senderismo si el terreno no encaja.'
    },
    'BUSHCRAFT Y SUPERVIVENCIA': {
      base: ['Águilas y Sierra de la Almenara como entorno formativo suave'],
      zonas: ['ramblas interiores', 'Cabo Cope', 'entorno Águilas-Calnegre'],
      salidas: ['Sierra Espuña', 'Ricote', 'Moratalla'],
      ideal: 'Orientación, refugio, gestión del agua, lectura del entorno y formación de bajo impacto.',
      seguridad: 'Sin fuego real salvo autorización expresa. Respeto ambiental, permisos, calor, agua y normativa.'
    },
    'ESCALADA DEPORTIVA': {
      base: ['Salida especial desde Águilas'],
      zonas: ['Águilas solo como iniciación muy básica si existe entorno autorizado y validado'],
      salidas: ['Sierra Espuña', 'Paredes de Leiva', 'La Azohía', 'Cresta del Gallo', 'La Panocha', 'Ricote', 'El Valle'],
      ideal: 'Escalada de iniciación, técnica de cuerda, nudos, aseguramiento, gestualidad y progresión deportiva.',
      seguridad: 'Revisión de vías, anclajes, casco, arnés, asegurador, pie de vía, temperatura y nivel técnico.'
    },
    'VIA FERRATA': {
      base: ['Salida especial desde Águilas'],
      zonas: ['No se vende como actividad principal de Águilas'],
      salidas: ['Cañón de Almadenes', 'Vía Ferrata del Ciervo en Sierra Espuña', 'Sierra de Lugar / Fortuna', 'La Garapacha', 'Redován o Callosa como avanzadas'],
      ideal: 'Progresión por pared equipada, grapas, cable de vida, puentes, travesías y niveles K2 a K5.',
      seguridad: 'Validación de material, disipador, casco, arnés, meteorología, anclajes, vértigo y nivel del grupo.'
    },
    'RAPEL TECNICO': {
      base: ['Salida especial desde Águilas'],
      zonas: ['Águilas solo en entorno autorizado o dentro de coasteering/cuerda si procede'],
      salidas: ['Barranco del Cigarrón', 'Salto del Ciervo', 'Cañón de Almadenes', 'Sierra Espuña', 'Carrascoy', 'Totana', 'Mula'],
      ideal: 'Rápel de iniciación, barranquismo, ferrata, escalada, espeleología y técnica de cuerda.',
      seguridad: 'Revisión de instalación, anclajes, cuerda, redundancia, casco, arnés, comunicación y zona de recepción.'
    },
    'ROPE JUMPING': {
      base: ['Salida especial desde Águilas'],
      zonas: ['No se ofrece en puntos no autorizados ni improvisados'],
      salidas: ['Puente de Lebor', 'Totana', 'Mula', 'Lorquí', 'otras zonas autorizadas previa validación'],
      ideal: 'Salto con cuerda, péndulo controlado, adrenalina y vídeo multi-cámara.',
      seguridad: 'Sistemas redundantes, material homologado, revisión de instalación, briefing, peso, salud y potestad de cancelación.'
    },
    'PUENTING': {
      base: ['Salida especial desde Águilas'],
      zonas: ['No es actividad principal de Águilas'],
      salidas: ['Puente de Lebor', 'Totana', 'Mula', 'Lorquí', 'Mascarat o Montanejos como salidas externas autorizadas'],
      ideal: 'Alta adrenalina, salto pendular, grupo reducido y reportaje de acción.',
      seguridad: 'Instalación revisada, doble sistema, material homologado, briefing técnico y validación física previa.'
    },
    'ESCALADA VARIOS LARGOS': {
      base: ['Salida especial desde Águilas'],
      zonas: ['Águilas no se presenta como zona principal de vías largas'],
      salidas: ['Paredes de Leiva', 'La Panocha', 'La Azohía', 'Ricote', 'Almorchón', 'El Valle'],
      ideal: 'Escalada clásica, reuniones, largos, gestión de cuerda, rápel y planificación de pared.',
      seguridad: 'Solo con experiencia validada. Revisión de reseña, material, compañero, meteorología y horario.'
    },
    'ESCALADA CLASICA, TRADICIONAL Y DE AVENTURA': {
      base: ['Salida especial desde Águilas'],
      zonas: ['Águilas solo para trepadas costeras controladas si procede'],
      salidas: ['Sierra Espuña', 'Paredes de Leiva', 'La Azohía', 'Cresta del Gallo', 'La Panocha', 'Ricote', 'Almorchón'],
      ideal: 'Escalada de aventura, autoprotección, lectura de roca, técnica de cuerda y progresión avanzada.',
      seguridad: 'Requiere experiencia, material específico, reunión fiable, plan de retirada y revisión meteorológica.'
    },
    'ESPELEOAVENTURA': {
      base: ['Salida especial desde Águilas'],
      zonas: ['Águilas solo como interpretación geológica y cuevas costeras si hay permisos'],
      salidas: ['Cueva del Puerto en Calasparra', 'Cueva de la Serreta', 'Abrigos del Pozo', 'Cueva de las Nutrias', 'Sima de la Higuera', 'Sima de la Plata / Cueva de la Plata si procede'],
      ideal: 'Espeleoturismo, progresión subterránea, formaciones geológicas, gateras, pasos estrechos y aventura técnica.',
      seguridad: 'Permisos, casco, iluminación doble, humedad, pasos estrechos, nivel físico y plan de emergencia.'
    },
    'KAYAK DE MAR': {
      base: ['Águilas y entorno costero'],
      zonas: ['Cabo Cope', 'Calabardina', 'Isla del Fraile', 'Cuatro Calas', 'Hornillo', 'Playa de Poniente', 'Playa de la Colonia'],
      salidas: ['La Azohía', 'Cabo Tiñoso', 'Mazarrón', 'Isla Plana', 'Bolnuevo'],
      ideal: 'Kayak de iniciación, kayak + snorkel, atardecer, fotografía, costa salvaje y grupos.',
      seguridad: 'Revisión de oleaje, viento, corrientes, embarque, desembarque, visibilidad y retorno seguro.'
    },
    'PADDLE SURF (SUP)': {
      base: ['Águilas'],
      zonas: ['Playa de la Colonia', 'Playa de Poniente', 'Hornillo', 'Calarreona', 'Calabardina', 'La Carolina'],
      salidas: ['Mar Menor', 'La Manga', 'Los Alcázares', 'Los Narejos'],
      ideal: 'SUP iniciación, SUP familiar, SUP gigante, SUP + snorkel y grupos tranquilos.',
      seguridad: 'Actividad sujeta a viento, oleaje, corrientes, temperatura del agua y capacidad de regreso.'
    },
    'COASTEERING': {
      base: ['Águilas y Cabo Cope'],
      zonas: ['Cabo Cope', 'Calabardina', 'Cuatro Calas', 'Monte del Castillo', 'litoral rocoso validado'],
      salidas: ['Mazarrón', 'Isla Plana', 'La Azohía', 'Cabo Tiñoso'],
      ideal: 'Progresión por litoral rocoso, pasos por roca, baño, snorkel, saltos opcionales y lectura del entorno.',
      seguridad: 'Se comprueban oleaje, profundidad, accesos, salida del agua, nivel del grupo y meteorología.'
    },
    'CLIFF DIVING / JUMPING': {
      base: ['Águilas, siempre dentro de coasteering o aventura costera validada'],
      zonas: ['Zonas litorales previamente validadas según altura, profundidad, oleaje, acceso y salida del agua'],
      salidas: ['Cabo Cope, Calabardina y entorno Águilas-Terreros solo si cumplen protocolo técnico'],
      ideal: 'Nivel 1 sin saltos obligatorios, nivel 2 saltos bajos, nivel 3 intermedios, nivel 4 avanzado con validación.',
      seguridad: 'Experiencia previa obligatoria, sin presión de grupo, profundidad comprobada y guía con potestad para cancelar.'
    },
    'SNORKEL DE AVENTURA': {
      base: ['Águilas y costa cercana'],
      zonas: ['Isla del Fraile', 'Cuatro Calas', 'Playa Amarilla', 'La Carolina', 'La Higuerica', 'Calabardina', 'Cabo Cope'],
      salidas: ['Mazarrón', 'La Azohía', 'Cabo de Palos'],
      ideal: 'Snorkel familiar, aventura suave, snorkel fotográfico, parejas, grupos y primeras experiencias marinas.',
      seguridad: 'Revisión de oleaje, viento, corrientes, visibilidad, temperatura del agua y salida segura.'
    },
    'PARASAILING': {
      base: ['Águilas si existe operador náutico autorizado'],
      zonas: ['Playa de Poniente', 'Playa de la Colonia', 'entorno portuario autorizado'],
      salidas: ['Mazarrón', 'La Manga', 'Mar Menor según operador'],
      ideal: 'Vuelo recreativo desde embarcación, experiencia panorámica suave y fotografía.',
      seguridad: 'Sujeto a patrón autorizado, viento, estado del mar, zona permitida, peso y normativa náutica.'
    },
    'TRAVESIAS EN KAYAK': {
      base: ['Águilas'],
      zonas: ['Cabo Cope', 'Calabardina', 'Isla del Fraile', 'Cuatro Calas', 'Hornillo'],
      salidas: ['La Azohía', 'Cabo Tiñoso', 'Mazarrón', 'Isla Plana', 'Bolnuevo'],
      ideal: 'Jornadas más largas, costa salvaje, kayak fotográfico, rutas al amanecer o atardecer.',
      seguridad: 'Plan de ruta, meteo marina, puntos de escape, hidratación, comunicación y nivel de paleo.'
    },
    'KITESURF': {
      base: ['Águilas como base secundaria en condiciones favorables'],
      zonas: ['Playa de Poniente', 'Playa de la Colonia', 'Hornillo', 'Calabardina', 'Cabo Cope según viento y normativa'],
      salidas: ['Mar Menor', 'La Manga', 'Los Alcázares', 'Los Narejos', 'San Javier'],
      ideal: 'Disciplina de viento y cometa, cursos, waterman avanzado y progresión técnica.',
      seguridad: 'Requiere viento adecuado, zona segura, cometa, espacio libre, instructor y normativa local.'
    },
    'WINDSURF': {
      base: ['Águilas como base secundaria en condiciones favorables'],
      zonas: ['Playa de Poniente', 'Playa de la Colonia', 'Hornillo', 'Calabardina'],
      salidas: ['Mar Menor', 'La Manga', 'Los Alcázares', 'Los Narejos', 'San Javier'],
      ideal: 'Viento y vela, cursos, navegación recreativa y técnica waterman.',
      seguridad: 'Sujeto a viento, estado del mar, zona náutica, material, nivel y capacidad de regreso.'
    },
    'BAUTISMO DE BUCEO': {
      base: ['Águilas, Isla del Fraile, Cabo Cope y Calabardina'],
      zonas: ['Isla del Fraile', 'Cabo Cope', 'Calabardina', 'Cueva de la Virgen', 'fondos rocosos del litoral de Águilas'],
      salidas: ['Cabo de Palos', 'Islas Hormigas', 'Mazarrón', 'La Azohía'],
      ideal: 'Primer contacto con el buceo, experiencia local premium, fotografía submarina y grupos reducidos.',
      seguridad: 'Inmersión adaptada al nivel con revisión de mar, viento, visibilidad, salud y supervisión directa.'
    },
    'OPEN WATER PADI / SSI': {
      base: ['Águilas y litoral cercano'],
      zonas: ['Calabardina', 'Isla del Fraile', 'Cabo Cope', 'fondos rocosos del litoral'],
      salidas: ['Cabo de Palos', 'La Azohía', 'Mazarrón'],
      ideal: 'Formación progresiva con teoría, aguas confinadas, inmersiones y logbook.',
      seguridad: 'Curso demostrativo en la web. No sustituye certificación oficial sin entidad certificadora real.'
    },
    'BUCEO NOCTURNO': {
      base: ['Águilas y costa cercana'],
      zonas: ['Calabardina', 'Isla del Fraile', 'Cabo Cope'],
      salidas: ['Cabo de Palos', 'Mazarrón', 'La Azohía'],
      ideal: 'Buceadores certificados, baja luz, vida nocturna marina y contenido audiovisual controlado.',
      seguridad: 'Requiere titulación, briefing nocturno, linterna principal y backup, compañero y mar estable.'
    },
    'BUCEO GUIADO': {
      base: ['Águilas, Isla del Fraile, Cabo Cope y Calabardina'],
      zonas: ['Isla del Fraile', 'Cabo Cope', 'Calabardina', 'Cueva de la Virgen'],
      salidas: ['Cabo de Palos', 'Islas Hormigas', 'Mazarrón', 'La Azohía'],
      ideal: 'Buceo local premium, inmersiones adaptadas al nivel, fauna, roca y fotografía submarina.',
      seguridad: 'Plan de inmersión, titulación, consumo, profundidad, visibilidad, viento y estado del mar.'
    },
    'FOTOGRAFIA SUBMARINA': {
      base: ['Águilas y fondos rocosos del litoral'],
      zonas: ['Isla del Fraile', 'Calabardina', 'Cabo Cope', 'Cueva de la Virgen'],
      salidas: ['Cabo de Palos', 'Mazarrón', 'La Azohía'],
      ideal: 'Fotografía, vídeo submarino, fauna mediterránea, color, flotabilidad y composición.',
      seguridad: 'Requiere control de flotabilidad, respeto del fondo, titulación y condiciones de visibilidad.'
    },
    'ADVANCED · RESCUE · NITROX': {
      base: ['Águilas y litoral cercano'],
      zonas: ['Calabardina', 'Isla del Fraile', 'Cabo Cope'],
      salidas: ['Cabo de Palos', 'Mazarrón', 'La Azohía'],
      ideal: 'Progresión de buceo, especialidades, rescate, nitrox, navegación y profundidad controlada.',
      seguridad: 'Marco formativo demostrativo. Solo válido oficialmente con centro y certificadora reales.'
    },
    'PARACAIDISMO TANDEM': {
      base: ['Salida especial desde Águilas'],
      zonas: ['Skydive Totana'],
      salidas: ['Totana, según disponibilidad del centro, meteorología y normativa'],
      ideal: 'Primer salto, caída libre, vídeo y fotografía, adrenalina alta y experiencia tándem.',
      seguridad: 'Instructor autorizado, revisión de meteorología, peso, salud, edad mínima y disponibilidad del centro.'
    },
    'PARAPENTE BIPLAZA': {
      base: ['Salida especial desde Águilas'],
      zonas: ['La Muela', 'Alhama de Murcia', 'Sierra Espuña', 'Aledo', 'La Azohía', 'Fortuna'],
      salidas: ['Águilas solo si existe zona legal de despegue/aterrizaje, empresa autorizada y aerología favorable'],
      ideal: 'Vuelo panorámico, planeo, iniciación al aire y contenido audiovisual ligero.',
      seguridad: 'Sujeto a viento, térmicas, orientación, piloto autorizado, zona legal y meteorología.'
    },
    'PARAMOTOR': {
      base: ['Águilas y costa sur'],
      zonas: ['Águilas', 'Cabo Cope', 'Isla del Fraile', 'Cuatro Calas', 'Calabardina', 'entorno Águilas-Terreros'],
      salidas: ['Zonas autorizadas según piloto, viento, espacio aéreo y normativa'],
      ideal: 'Vuelo panorámico sobre costa, calas, acantilados y paisaje mediterráneo.',
      seguridad: 'Piloto autorizado, despegue seguro, revisión meteorológica, espacio aéreo permitido y normativa aeronáutica.'
    },
    'PARATRIKE': {
      base: ['Águilas y entorno costero'],
      zonas: ['Águilas', 'Cabo Cope', 'Cuatro Calas', 'Calabardina', 'costa sur', 'entorno Águilas-Terreros'],
      salidas: ['Zonas autorizadas según piloto y normativa'],
      ideal: 'Carro biplaza motorizado, más estable y cómodo, experiencia panorámica y audiovisual.',
      seguridad: 'Piloto autorizado, pista o zona validada, viento, espacio aéreo, peso, aterrizaje y normativa.'
    },
    'AFF PARACAIDISMO': {
      base: ['Salida especial desde Águilas'],
      zonas: ['Skydive Totana'],
      salidas: ['Totana según disponibilidad, meteorología, instructor y programa formativo'],
      ideal: 'Curso AFF, 8 niveles, caída libre, autonomía progresiva y licencias de referencia.',
      seguridad: 'No implica convenio real. Requiere centro autorizado, instructores, salud, edad y meteorología.'
    },
    'BARRANQUISMO ACUATICO': {
      base: ['Salida especial desde Águilas'],
      zonas: ['Cañón de Almadenes', 'Barranco de la Higuera', 'entorno del Río Segura'],
      salidas: ['Calasparra', 'Cieza', 'Blanca', 'Sierra Espuña según modalidad'],
      ideal: 'Agua dulce, progresión, saltos opcionales, rápeles y ruta interpretativa.',
      seguridad: 'Revisión de caudal, meteorología, accesos, permisos, nivel del grupo y normativa.'
    },
    'RAFTING': {
      base: ['Salida especial desde Águilas'],
      zonas: ['Río Segura', 'Cañón de Almadenes', 'Calasparra', 'Cieza', 'Blanca', 'Abarán'],
      salidas: ['Packs río + cueva, rafting familiar, grupos y reportaje audiovisual'],
      ideal: 'Familias, grupos, turismo activo, descenso recreativo y agua interior.',
      seguridad: 'No se realiza en Águilas. Depende de caudal, permisos, meteorología, accesos y operador autorizado.'
    },
    'BARRANQUISMO SECO': {
      base: ['Salida especial desde Águilas'],
      zonas: ['Barranco del Cigarrón', 'Salto del Ciervo', 'Sierra Espuña', 'Carrascoy', 'Gebas', 'Alhama', 'Librilla'],
      salidas: ['Águilas solo como ramblas, aventura seca y orientación, no como barranco técnico principal'],
      ideal: 'Destrepes, rápeles, progresión por cauces secos, roca y técnica de cuerda.',
      seguridad: 'Revisión de permisos, anclajes, temperatura, tormentas, nivel técnico y plan de evacuación.'
    },
    'DESCENSO DE CAÑONES': {
      base: ['Salida especial desde Águilas'],
      zonas: ['Cañón de Almadenes', 'Barranco de la Higuera', 'Cigarrón', 'Sierra Espuña', 'Carrascoy'],
      salidas: ['Calasparra', 'Cieza', 'Blanca', 'Gebas', 'Alhama'],
      ideal: 'Cañones acuáticos o secos, progresión técnica, rápeles, destrepes y lectura de cauces.',
      seguridad: 'Validación previa de caudal, meteorología, acceso, permisos, anclajes y nivel real del grupo.'
    },
    'BTT COSTERO': {
      base: ['Águilas, Sierra de la Almenara y Cabo Cope'],
      zonas: ['Águilas-Cabo Cope', 'Águilas-Cuatro Calas', 'Águilas-Calnegre', 'Rambla del Cañarete', 'Calabardina', 'Terreros'],
      salidas: ['Sierra Espuña', 'Espubike', 'Ricote', 'Cieza', 'Carrascoy'],
      ideal: 'BTT iniciación, MTB costera, e-bike, ruta BTT + snorkel y fotografía.',
      seguridad: 'Casco obligatorio, revisión de bici, calor, agua, terreno suelto, tráfico puntual y nivel físico.'
    },
    'BTT TECNICO': {
      base: ['Águilas, Sierra de la Almenara y Cabo Cope'],
      zonas: ['ramblas interiores', 'Rambla del Cañarete', 'Águilas-Calnegre', 'Cabo Cope', 'Terreros'],
      salidas: ['Sierra Espuña', 'Espubike', 'Ricote', 'Carrascoy'],
      ideal: 'MTB de montaña, sendero técnico, desnivel, curvas, frenada y conducción progresiva.',
      seguridad: 'Validación de nivel, casco, protecciones, bici revisada, meteorología y trazado adaptado.'
    },
    'CICLOTURISMO DE AVENTURA': {
      base: ['Águilas, Sierra de la Almenara y Cabo Cope'],
      zonas: ['Águilas-Cabo Cope', 'Águilas-Calnegre', 'Cuatro Calas', 'Calabardina', 'Terreros'],
      salidas: ['Ricote', 'Cieza', 'Sierra Espuña', 'Carrascoy'],
      ideal: 'Gravel, e-bike, rutas largas, cicloturismo costero, fotografía y aventura suave.',
      seguridad: 'Plan de ruta, hidratación, kit mecánico, tráfico, calor, viento y puntos de regreso.'
    },
    'E-FOIL': {
      base: ['Águilas como base secundaria en condiciones favorables'],
      zonas: ['Playa de Poniente', 'Playa de la Colonia', 'Hornillo', 'Calabardina', 'Cabo Cope según normativa'],
      salidas: ['Mar Menor', 'La Manga', 'Los Alcázares', 'Los Narejos'],
      ideal: 'Foil con motor eléctrico, sin necesidad de olas ni viento, iniciación tecnológica y contenido visual.',
      seguridad: 'Zona despejada, batería, chaleco, casco, profundidad, normativa náutica y estado del mar.'
    },
    'WINGFOIL': {
      base: ['Águilas como base secundaria si hay viento y zona segura'],
      zonas: ['Playa de Poniente', 'Hornillo', 'Calabardina', 'Cabo Cope según condiciones'],
      salidas: ['Mar Menor', 'La Manga', 'Los Alcázares', 'Los Narejos', 'San Javier'],
      ideal: 'Foil con ala de mano, viento, progresión waterman y cursos técnicos.',
      seguridad: 'Requiere viento, zona despejada, profundidad, material adecuado, instructor y normativa.'
    },
    'JETSURF': {
      base: ['Águilas como base secundaria en zona náutica autorizada'],
      zonas: ['Playa de Poniente', 'Playa de la Colonia', 'Hornillo', 'Calabardina'],
      salidas: ['Mar Menor', 'La Manga', 'zonas náuticas especializadas'],
      ideal: 'Tabla con motor propio, velocidad, técnica y sesiones cortas de alta intensidad.',
      seguridad: 'Motor propio, zona permitida, casco, chaleco, distancia a bañistas, normativa y guía.'
    },
    'WATERMAN TRAINING': {
      base: ['Águilas como base y salidas a zonas náuticas especializadas'],
      zonas: ['Águilas', 'Calabardina', 'Playa de Poniente', 'Cabo Cope según condiciones'],
      salidas: ['Mar Menor', 'La Manga', 'Los Alcázares', 'Los Narejos', 'San Javier'],
      ideal: 'E-foil, wingfoil, kitesurf, windsurf, lectura de viento, equilibrio y seguridad acuática.',
      seguridad: 'Cada disciplina depende de condiciones distintas y requiere validación técnica específica.'
    },
    'MAR + MONTAÑA': {
      base: ['Águilas y Sierra de la Almenara'],
      zonas: ['Cabo Cope', 'Cuatro Calas', 'Calabardina', 'Isla del Fraile'],
      salidas: ['Mazarrón', 'La Azohía', 'Sierra Espuña según versión'],
      ideal: 'Senderismo costero, kayak, snorkel, fotografía y experiencia de jornada completa.',
      seguridad: 'Se ajusta ruta, mar, viento, desnivel, horarios y nivel del grupo.'
    },
    'PARAMOTOR & PARATRIKE': {
      base: ['Águilas y costa sur'],
      zonas: ['Águilas', 'Cabo Cope', 'Cuatro Calas', 'Calabardina', 'entorno Águilas-Terreros'],
      salidas: ['Zonas autorizadas según piloto, viento, espacio aéreo y normativa'],
      ideal: 'Vuelo panorámico motorizado, experiencia cómoda y reportaje audiovisual.',
      seguridad: 'Piloto autorizado, meteorología, espacio aéreo, zona de despegue y aterrizaje segura.'
    }
  };

  const activityLookup = Object.fromEntries(
    Object.entries(activityData).map(([key, value]) => [normalizeTitle(key), value])
  );

  document.querySelectorAll('.ficha').forEach(card => {
    const titleEl = card.querySelector('.ficha-titulo');
    const body = card.querySelector('.ficha-cuerpo');
    if (!titleEl || !body || body.querySelector('.activity-detail-panel')) return;
    const data = activityLookup[normalizeTitle(titleEl.textContent)];
    if (!data) return;
    body.insertAdjacentHTML('beforeend', `
      <div class="activity-detail-panel">
        ${renderList('Ubicación principal', data.base)}
        ${renderList('Zonas recomendadas', data.zonas)}
        ${renderList('Salidas especiales', data.salidas)}
        <div class="detail-note">${data.ideal}</div>
        <div class="detail-safety">${data.seguridad}</div>
      </div>
    `);
  });

  const packData = {
    'HORIZONTE SALVAJE': {
      zona: 'Águilas Extrema Costa: Cabo Cope, Calabardina, Isla del Fraile y Cuatro Calas.',
      enfoque: 'Actualizado como Pack Mar y Montaña Águilas: senderismo costero, kayak, snorkel y reportaje opcional.',
      nivel: 'Iniciación a intermedio, ideal para parejas, familias activas y grupos pequeños.'
    },
    'COSTA VERTICAL': {
      zona: 'Salida especial desde Águilas hacia Sierra Espuña, Almadenes o zona vertical autorizada.',
      enfoque: 'Vía ferrata, rápel y regreso acuático solo si la logística y permisos encajan.',
      nivel: 'Medio, con validación de vértigo, material y meteorología.'
    },
    'MAR DE ACERO': {
      zona: 'Águilas, Calabardina, Isla del Fraile y Cabo Cope como base marina.',
      enfoque: 'Buceo guiado, kayak suave y experiencia nocturna con revisión de mar y visibilidad.',
      nivel: 'Medio, requiere titulación cuando haya inmersión autónoma.'
    },
    'CIELO NÓMADA': {
      zona: 'Águilas para paramotor/paratrike y salida especial para parapente biplaza.',
      enfoque: 'Vuelo motorizado costero más parapente en zona autorizada si las condiciones lo permiten.',
      nivel: 'Sin experiencia previa, siempre con piloto autorizado.'
    },
    'ABISMO MEDITERRÁNEO': {
      zona: 'Almadenes o Sierra Espuña para barranco, Águilas para bautismo de buceo.',
      enfoque: 'Contraste entre agua interior y mar, planteado como salida especial desde Águilas.',
      nivel: 'Iniciación a medio, sujeto a caudal, permisos y estado del mar.'
    },
    'RASTRO SALVAJE': {
      zona: 'Águilas, Sierra de la Almenara, Cabo Cope, ramblas interiores y Cuatro Calas.',
      enfoque: 'BTT litoral, orientación y kayak si el mar permite una transición segura.',
      nivel: 'Medio, adaptable a e-bike y grupos.'
    },
    'TRILOGÍA EXTREMA': {
      zona: 'Totana para paracaidismo, Águilas para buceo y paramotor si procede.',
      enfoque: 'Pack extremo de fin de semana con actividades separadas por logística realista.',
      nivel: 'Avanzado/extremo, con validación física, meteorológica y técnica.'
    },
    'CUMBRES Y CALAS': {
      zona: 'Sierra de la Almenara, Cabo Cope, Calabardina, Cuatro Calas e Isla del Fraile.',
      enfoque: 'Trekking costero, kayak y snorkel en formato fin de semana.',
      nivel: 'Medio, perfecto para descubrir Águilas desde tierra y mar.'
    },
    'INMERSIÓN NÓMADA': {
      zona: 'Águilas, Calabardina, Isla del Fraile y Cabo Cope.',
      enfoque: 'Formación de buceo demostrativa más multiaventura suave de cierre.',
      nivel: 'Sin experiencia previa, no sustituye certificación oficial sin entidad real.'
    },
    'PACK ÉLITE NÓMADA': {
      zona: 'Base Águilas, con salidas especiales por Murcia según disciplina elegida.',
      enfoque: 'Experiencia privada, audiovisual premium, logística completa y ruta a medida.',
      nivel: 'Ajustado al participante con briefing técnico previo.'
    },
    'PACK AVENTURA FILMADA': {
      zona: 'Águilas para kayak y BTT, salida especial para ferrata si se elige vertical.',
      enfoque: 'Actividad + Pack Pro o Extremo con edición vertical y horizontal.',
      nivel: 'Iniciación a medio, grabación sujeta a validación.'
    },
    'PACK LEYENDA FPV': {
      zona: 'Zonas permitidas según AESA, privacidad, meteorología y restricciones locales.',
      enfoque: 'Multiaventura con FPV solo donde sea viable y autorizado.',
      nivel: 'Medio a avanzado, sujeto a validación técnica y normativa.'
    }
  };

  const packLookup = Object.fromEntries(
    Object.entries(packData).map(([key, value]) => [normalizeTitle(key), value])
  );

  document.querySelectorAll('.super-pack, .pack-card').forEach(card => {
    const titleEl = card.querySelector('.super-pack-titulo, .pack-titulo');
    const body = card.querySelector('.super-pack-body') || card;
    if (!titleEl || body.querySelector('.pack-detail-panel')) return;
    const data = packLookup[normalizeTitle(titleEl.textContent)];
    if (!data) return;
    body.insertAdjacentHTML('beforeend', `
      <div class="pack-detail-panel">
        <p><strong>Zona:</strong> ${data.zona}</p>
        <p><strong>Enfoque:</strong> ${data.enfoque}</p>
        <p><strong>Nivel:</strong> ${data.nivel}</p>
      </div>
    `);
  });

  /* ─── CONTADOR ANIMADO ─── */
  const cntObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const dur = 1800;
        const step = target / (dur / 16);
        let cur = 0;
        const t = setInterval(() => {
          cur += step;
          if (cur >= target) { cur = target; clearInterval(t); }
          el.textContent = Math.floor(cur) + suffix;
        }, 16);
        cntObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => cntObs.observe(el));

  /* ─── FAQ ACORDEÓN ─── */
  document.querySelectorAll('.faq-pregunta').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });

  /* ─── FORMULARIO CONTACTO ─── */
  const fContact = document.getElementById('formContacto');
  if (fContact) fContact.addEventListener('submit', e => {
    e.preventDefault();
    const btn = fContact.querySelector('[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Enviando...'; btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '✓ Enviado';
      btn.style.background = 'var(--bosque)';
      setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.disabled = false; fContact.reset(); }, 4000);
    }, 1100);
  });

  /* ─── FORMULARIO RESERVA ─── */
  const fReserva = document.getElementById('formReserva');
  if (fReserva) fReserva.addEventListener('submit', e => {
    e.preventDefault();
    const msg = document.getElementById('reservaMsg');
    if (msg) { msg.style.display = 'block'; setTimeout(() => { msg.style.display = 'none'; fReserva.reset(); }, 5000); }
  });

  /* ─── SMOOTH SCROLL ─── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior:'smooth', block:'start' }); }
    });
  });

  /* ─── LAZY BG ─── */
  const bgObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { const s = e.target.dataset.bg; if (s) e.target.style.backgroundImage = `url('${s}')`; bgObs.unobserve(e.target); }
    });
  }, { rootMargin: '200px' });
  document.querySelectorAll('[data-bg]').forEach(el => bgObs.observe(el));

  /* ─── VIDEO HERO FALLBACK ─── */
  document.querySelectorAll('.hero-video').forEach(v => {
    v.addEventListener('error', () => {
      const poster = v.getAttribute('poster');
      if (poster && v.parentElement) v.parentElement.style.backgroundImage = `url('${poster}')`;
      v.style.display = 'none';
    });
  });

});
