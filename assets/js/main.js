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

  const renderLocationGrid = (data) => {
    const cells = [
      ['Ubicación principal', data.base],
      [data.zonaPrincipal ? 'Zona principal' : 'Zonas recomendadas', data.zonaPrincipal ? [data.zonaPrincipal] : data.zonas],
      [data.disponibilidad ? 'Disponibilidad' : 'Salidas especiales', data.disponibilidad ? [data.disponibilidad] : data.salidas]
    ].filter(([, value]) => value && value.length);

    return `
      <div class="activity-card-location-grid">
        ${cells.map(([label, value]) => renderList(label, value)).join('')}
      </div>
      ${data.noValidas ? `<div class="detail-row detail-row-wide"><span>Zonas no válidas</span><p>${data.noValidas}</p></div>` : ''}
      ${data.salidas && (data.zonaPrincipal || data.disponibilidad) ? `<div class="detail-row detail-row-wide"><span>Salidas especiales</span><p>${data.salidas.join(', ')}</p></div>` : ''}
    `;
  };

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
    'VÍA FERRATA': {
      base: ['Salida especial desde Águilas'],
      zonas: ['No se vende como actividad principal de Águilas'],
      salidas: ['Cañón de Almadenes', 'Vía Ferrata del Ciervo en Sierra Espuña', 'Sierra de Lugar / Fortuna', 'La Garapacha', 'Redován y Callosa como salidas avanzadas'],
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
      zonaPrincipal: 'Montanejos',
      zonas: ['Montanejos como zona principal para Rope Jumping'],
      disponibilidad: '2 días al mes, según calendario, grupo mínimo, empresa colaboradora, permisos y condiciones',
      salidas: ['Montanejos', 'otras zonas autorizadas previa validación técnica'],
      noValidas: 'No se ofrece en puntos no autorizados, improvisados ni sin instalación revisada.',
      ideal: 'Salto con cuerda en formato péndulo desde puente autorizado, con briefing técnico y grabación opcional.',
      seguridad: 'Instalación revisada, sistemas redundantes, material homologado, control de peso y salud, briefing técnico y potestad de cancelación.'
    },
    'PUENTING': {
      base: ['Salida especial desde Águilas'],
      zonaPrincipal: 'Mascarat, Calpe',
      zonas: ['Mascarat como experiencia premium de puenting alto'],
      disponibilidad: '2 días al mes, según calendario, permisos y disponibilidad',
      salidas: ['Mascarat', 'Puente de Lebor', 'Totana', 'Mula', 'Lorquí', 'según tipo de salto y empresa autorizada'],
      ideal: 'Puenting de gran altura en entorno autorizado, con briefing, control técnico y grabación opcional.',
      seguridad: 'Material homologado, sistemas redundantes, instalación revisada, control técnico, briefing y potestad de cancelación.'
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
      ideal: 'Formación progresiva con teoría, aguas confinadas, inmersiónes y logbook.',
      seguridad: 'Curso de referencia en la web. No sustituye certificación oficial sin entidad certificadora real.'
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
      ideal: 'Buceo local premium, inmersiónes adaptadas al nivel, fauna, roca y fotografía submarina.',
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
      seguridad: 'Marco formativo de referencia. Solo válido oficialmente con centro y certificadora reales.'
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

  const imageFocusData = {
    'SENDERISMO GUIADO': { pos: '50% 42%' },
    'TREKKING DE CRESTAS': { pos: '52% 42%' },
    'VIVAC Y TRAVESIA': { pos: '50% 48%', fit: 'contain' },
    'MARCHA DE MONTAÑA': { pos: '50% 45%' },
    'MONTAÑISMO': { pos: '50% 38%' },
    'SCRAMBLING': { pos: '50% 50%', fit: 'contain' },
    'BUSHCRAFT Y SUPERVIVENCIA': { pos: '50% 43%' },
    'ESCALADA DEPORTIVA': { pos: '43% 50%' },
    'VÍA FERRATA': { pos: '63% 42%' },
    'RAPEL TECNICO': { pos: '50% 46%', fit: 'contain' },
    'ROPE JUMPING': { pos: '50% 45%', fit: 'contain' },
    'PUENTING': { pos: '50% 48%', fit: 'contain' },
    'ESCALADA VARIOS LARGOS': { pos: '28% 45%' },
    'ESPELEOAVENTURA': { pos: '52% 58%', fit: 'contain' },
    'KAYAK DE MAR': { pos: '48% 45%' },
    'PADDLE SURF (SUP)': { pos: '50% 42%' },
    'COASTEERING': { pos: '50% 50%', fit: 'contain' },
    'CLIFF DIVING / JUMPING': { pos: '50% 32%' },
    'SNORKEL DE AVENTURA': { pos: '50% 48%' },
    'PARASAILING': { pos: '50% 42%' },
    'TRAVESIAS EN KAYAK': { pos: '50% 45%' },
    'KITESURF': { pos: '50% 48%', fit: 'contain' },
    'WINDSURF': { pos: '50% 48%', fit: 'contain' },
    'BAUTISMO DE BUCEO': { pos: '50% 45%' },
    'OPEN WATER PADI / SSI': { pos: '50% 48%' },
    'BUCEO NOCTURNO': { pos: '50% 50%' },
    'BUCEO GUIADO': { pos: '50% 45%' },
    'FOTOGRAFIA SUBMARINA': { pos: '50% 50%' },
    'ADVANCED · RESCUE · NITROX': { pos: '50% 48%' },
    'PARACAIDISMO TANDEM': { pos: '50% 42%', fit: 'contain' },
    'PARAPENTE BIPLAZA': { pos: '50% 42%', fit: 'contain' },
    'PARAMOTOR': { pos: '50% 46%', fit: 'contain' },
    'PARATRIKE': { pos: '50% 46%', fit: 'contain' },
    'AFF PARACAIDISMO': { pos: '50% 42%', fit: 'contain' },
    'ESCALADA CLASICA, TRADICIONAL Y DE AVENTURA': { pos: '43% 50%' },
    'BARRANQUISMO ACUATICO': { pos: '48% 45%' },
    'RAFTING': { pos: '50% 48%', fit: 'contain' },
    'BARRANQUISMO SECO': { pos: '50% 45%', fit: 'contain' },
    'DESCENSO DE CAÑONES': { pos: '50% 45%', fit: 'contain' },
    'BTT COSTERO': { pos: '50% 45%' },
    'BTT TECNICO': { pos: '52% 45%' },
    'CICLOTURISMO DE AVENTURA': { pos: '50% 48%', fit: 'contain' },
    'E-FOIL': { pos: '50% 45%', fit: 'contain' },
    'WINGFOIL': { pos: '50% 48%', fit: 'contain' },
    'JETSURF': { pos: '50% 45%', fit: 'contain' },
    'WATERMAN TRAINING': { pos: '50% 48%', fit: 'contain' },
    'MAR + MONTAÑA': { pos: '50% 45%' },
    'PARAMOTOR & PARATRIKE': { pos: '50% 46%', fit: 'contain' }
  };

  const imageFocusLookup = Object.fromEntries(
    Object.entries(imageFocusData).map(([key, value]) => [normalizeTitle(key), value])
  );

  document.querySelectorAll('.fichas-grid .ficha').forEach(card => {
    const titleEl = card.querySelector('.ficha-titulo');
    const body = card.querySelector('.ficha-cuerpo');
    if (!titleEl || !body || body.querySelector('.activity-detail-panel')) return;
    const data = activityLookup[normalizeTitle(titleEl.textContent)];
    if (!data) return;
    card.classList.add('activity-card');
    body.classList.add('activity-card-body');
    const image = card.querySelector('.ficha-img');
    const imageFocus = imageFocusLookup[normalizeTitle(titleEl.textContent)];
    if (image && imageFocus) {
      image.classList.add('activity-image');
      image.style.setProperty('--activity-img-position', imageFocus.pos);
      image.style.backgroundPosition = imageFocus.pos;
      if (imageFocus.fit === 'contain') image.classList.add('fit-contain');
    }
    card.querySelector('.ficha-familia')?.classList.add('activity-card-header');
    card.querySelector('.ficha-badges')?.classList.add('activity-card-badges');
    card.querySelector('.ficha-meta')?.classList.add('activity-card-quick-info');
    card.querySelector('.ficha-btn')?.classList.add('activity-card-cta');
    if (data.zonaPrincipal || data.disponibilidad) card.classList.add('activity-card-special');
    body.insertAdjacentHTML('beforeend', `
      <div class="activity-detail-panel">
        ${renderLocationGrid(data)}
        <div class="activity-card-note detail-note">${data.ideal}</div>
        <div class="activity-card-safety detail-safety"><strong>Seguridad:</strong> ${data.seguridad}</div>
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
      nivel: 'No requiere experiencia técnica previa como pasajero; siempre con piloto autorizado.'
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
      enfoque: 'Formación de buceo planteada más multiaventura suave de cierre.',
      nivel: 'Ruta formativa de referencia; la certificación real dependería de centro autorizado.'
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

  /* --- Interacciones premium Nómada Extremo --- */
  function ensureNoextUI(){
    if(!document.getElementById('noext-toast'))document.body.insertAdjacentHTML('beforeend','<div id="noext-toast" class="noext-toast" role="status" aria-live="polite"></div>');
    if(!document.getElementById('noext-modal'))document.body.insertAdjacentHTML('beforeend','<div id="noext-modal" class="noext-modal" role="dialog" aria-modal="true"><div class="noext-modal-card"><button class="noext-modal-close" aria-label="Cerrar">×</button><div id="noext-modal-content"></div></div></div>');
    const modal=document.getElementById('noext-modal');
    const closeNoextModal=()=>{modal.classList.remove('open');document.body.classList.remove('modal-open')};
    modal.querySelector('.noext-modal-close').addEventListener('click',closeNoextModal);
    modal.addEventListener('click',e=>{if(e.target===modal)closeNoextModal()});
  }
  ensureNoextUI();
  window.noextToast=function(msg){const toast=document.getElementById('noext-toast');toast.textContent=msg;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2600)};
  window.noextOpenModal=function(title,html){const modal=document.getElementById('noext-modal');document.getElementById('noext-modal-content').innerHTML=`<h3>${title}</h3>${html}`;modal.classList.add('open');document.body.classList.add('modal-open');modal.querySelector('.noext-modal-close').focus()};
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.getElementById('noext-modal')?.classList.remove('open');document.body.classList.remove('modal-open')}});
  const academicNote = 'Ficha orientativa del proyecto académico/intermodular. En versión operativa exigiría validación legal, técnica, seguros, permisos y profesionales cualificados.';
  const spec = (d) => ({
    familia:d.f||'Actividad de aventura', duracion:d.d, edad:d.e, fisico:d.fi, tecnico:d.t, experiencia:d.x, ratio:d.r,
    material:d.m, trae:d.q, temporada:d.se, meteo:d.me, cancelacion:d.c, riesgos:d.ri, operativo:d.o, nota:d.n||academicNote, versiones:d.v
  });
  const ACTIVITY_SPECS = {
    'SENDERISMO GUIADO': spec({f:'Montaña y costa',d:'3-6 h según ruta, distancia y desnivel.',e:'8-10+ con adulto responsable, según trazado y calor.',fi:'Bajo-medio.',t:'Iniciación.',x:'No necesaria; sí calzado adecuado y actitud activa.',r:'1 guía / 12-15 participantes en rutas sencillas.',m:'Plan de ruta, botiquín, comunicación, orientación y briefing.',q:'Calzado de montaña, agua, gorra, protección solar y comida ligera.',se:'Todo el año; mejor otoño, invierno y primavera.',me:'Sin calor extremo, tormenta, viento fuerte o riesgo de incendio.',c:'Calor, tormenta, lesión, falta de agua, accesos cerrados o riesgo ambiental.',ri:'Caídas, deshidratación, insolación, despistes y terreno irregular.',o:'Guía cualificado, seguro, permisos si proceden y evaluación previa del itinerario.',v:'Familiar, iniciación, educativa, atardecer, privada y audiovisual.'}),
    'TREKKING DE CRESTAS': spec({f:'Montaña expuesta',d:'5-8 h.',e:'14-16+ según exposición y trazado.',fi:'Medio-alto.',t:'Intermedio.',x:'Experiencia previa en montaña recomendable.',r:'1 guía / 6-8 participantes.',m:'Plan de ruta, casco si procede, botiquín y comunicación.',q:'Botas, agua suficiente, cortavientos, comida, protección solar y frontal si procede.',se:'Octubre a mayo.',me:'Sin viento fuerte, lluvia, tormenta, niebla densa o calor extremo.',c:'Viento, tormenta, calor, fatiga del grupo o terreno inestable.',ri:'Caída, exposición, roca suelta, fatiga, vértigo y deshidratación.',o:'Guía cualificado, evaluación del terreno y plan de evacuación.',v:'Intermedia, privada, entrenamiento de montaña y audiovisual.'}),
    'VIVAC Y TRAVESIA': spec({f:'Travesía y pernocta',d:'2 días / 1 noche o fin de semana.',e:'16+ recomendable; menores solo con adulto y autorización.',fi:'Medio-alto.',t:'Intermedio.',x:'Recomendable haber hecho rutas largas con mochila.',r:'1 guía / 6-8 participantes.',m:'Plan de vivac, botiquín, comunicación, revisión de pernocta y orientación.',q:'Mochila, saco, aislante, frontal, ropa térmica, comida, agua y material personal.',se:'Otoño y primavera; invierno solo con equipo adecuado.',me:'Sin tormenta, viento fuerte, frío extremo, lluvia intensa o riesgo de incendio.',c:'Permisos, normativa, meteo nocturna, falta de material o estado físico insuficiente.',ri:'Frío, fatiga, orientación nocturna, aislamiento, meteorología y descanso.',o:'Permisos de pernocta si proceden, guía cualificado y protocolo de emergencia.',v:'Travesía formativa, fin de semana, privada y audiovisual discreto.'}),
    'MARCHA DE MONTAÑA': spec({f:'Montaña',d:'4-7 h.',e:'12+ según distancia y desnivel.',fi:'Medio.',t:'Iniciación-intermedio.',x:'Conviene haber caminado varias horas.',r:'1 guía / 10-12 participantes.',m:'Itinerario, botiquín, comunicación y control de ritmo.',q:'Botas o zapatilla de montaña, agua, alimento, cortavientos y protección solar.',se:'Otoño, invierno y primavera.',me:'Sin calor extremo, tormenta, viento fuerte o aviso meteorológico.',c:'Calor, tormenta, fatiga del grupo, falta de agua o riesgo de incendio.',ri:'Fatiga, caídas, ampollas, deshidratación y orientación.',o:'Planificación de ruta, seguro y guía cualificado.',v:'Grupo, centro educativo, entrenamiento, familiar adaptada y privada.'}),
    'MONTAÑISMO': spec({f:'Montaña técnica',d:'Jornada completa o varios días según objetivo.',e:'16+ según terreno, normativa y dificultad.',fi:'Alto.',t:'Medio-avanzado.',x:'Experiencia recomendable; validación técnica obligatoria.',r:'Muy reducido: 1 guía / 2-4 participantes según terreno.',m:'Material específico del itinerario, casco si procede, planificación y comunicación.',q:'Botas, ropa técnica, agua, alimento, frontal, guantes y material indicado.',se:'Según objetivo y condiciones.',me:'Ventanas estables; sin tormenta, hielo imprevisto, viento fuerte o baja visibilidad.',c:'Meteo, permisos, nivel insuficiente, material inadecuado o riesgo de evacuación.',ri:'Caída, exposición, fatiga, frío, orientación y terreno técnico.',o:'Guía cualificado/titulado según terreno y normativa aplicable.',v:'Ascensión guiada, preparación física, privada y formación técnica.'}),
    'SCRAMBLING': spec({f:'Trepada fácil y media',d:'3-5 h.',e:'14-16+ según exposición.',fi:'Medio.',t:'Intermedio.',x:'Experiencia en montaña y ausencia de vértigo intenso.',r:'1 guía / 4-6 participantes.',m:'Casco si procede, evaluación de pasos, botiquín y comunicación.',q:'Calzado adherente, guantes recomendados, agua y ropa flexible.',se:'Otoño, invierno y primavera.',me:'Sin lluvia, viento fuerte, roca mojada o calor extremo.',c:'Roca mojada, viento, inseguridad del grupo o terreno inestable.',ri:'Caída, resbalón, roca suelta, exposición y bloqueo por miedo.',o:'Validación previa del recorrido y guía cualificado.',v:'Iniciación técnica, avanzada, privada y entrenamiento de crestas.'}),
    'BUSHCRAFT Y SUPERVIVENCIA': spec({f:'Escuela y autonomía',d:'1 día o 2 días según módulo.',e:'14+; formato familiar adaptado sin pernocta técnica.',fi:'Medio.',t:'Iniciación-intermedio.',x:'No necesaria en módulo básico.',r:'1 instructor / 8-10 participantes.',m:'Material didáctico, botiquín, orientación y demostración segura.',q:'Ropa resistente, agua, comida, frontal, libreta y material indicado.',se:'Otoño, invierno y primavera.',me:'Sin riesgo de incendio, viento fuerte, tormenta o calor extremo.',c:'Normativa de fuego, riesgo forestal, permisos, meteo o material insuficiente.',ri:'Cortes, frío, desorientación, fatiga y uso inadecuado de herramientas.',o:'Fuego y refugios sujetos a normativa, época, autorización y supervisión.',v:'Familiar adaptada, escuela, vivac, orientación y supervivencia básica.'}),
    'ESCALADA DEPORTIVA': spec({f:'Roca y cuerda',d:'3-5 h.',e:'10-12+ en iniciación con consentimiento y vía adecuada.',fi:'Medio.',t:'Iniciación-intermedio.',x:'No necesaria en bautismo; movilidad básica y escucha activa.',r:'1 técnico / 4-6 participantes.',m:'Casco, arnés, cuerda, asegurador, cintas, pies de gato y revisión cruzada.',q:'Ropa cómoda, agua, protección solar, calzado cerrado y pelo recogido.',se:'Otoño a primavera; verano solo en sombra y horario adecuado.',me:'Sin lluvia, tormenta, viento peligroso o roca mojada.',c:'Roca mojada, tormenta, calor, caída de piedras o falta de material.',ri:'Caídas controladas, golpes, aseguramiento, fatiga, roca suelta y vértigo.',o:'Técnico cualificado, material homologado, seguro y permisos si proceden.',v:'Bautismo, progresión, privada, centros educativos y audiovisual.'}),
    'VIA FERRATA': spec({f:'Vertical',d:'3-5 h.',e:'12-14+ según ferrata, altura y normativa.',fi:'Medio.',t:'Iniciación-intermedio.',x:'No necesaria en ferratas fáciles; vértigo controlable.',r:'1 técnico / 4-6 participantes según dificultad.',m:'Casco, arnés, disipador homologado, guantes y briefing de progresión.',q:'Calzado adherente, ropa cómoda, agua y guantes finos si tiene.',se:'Otoño, invierno y primavera.',me:'Sin tormenta eléctrica, lluvia, viento fuerte o calor extremo.',c:'Tormenta, línea saturada, vértigo incompatible, material inadecuado o permisos.',ri:'Factor de caída, golpe contra roca, vértigo, caída de piedras y fatiga.',o:'Material específico, briefing, comprobación cruzada y técnico cualificado.',v:'Iniciación, intermedia, privada, grupo reducido y audiovisual.'}),
    'RAPEL TECNICO': spec({f:'Cuerda y descenso',d:'3-4 h.',e:'14+.',fi:'Medio.',t:'Intermedio.',x:'Recomendable base en cuerda o escalada.',r:'1 técnico / 4-6 participantes.',m:'Cuerda, descensor, casco, arnés, backup, guantes y anclajes verificados.',q:'Calzado adherente, ropa resistente, agua y guantes si dispone.',se:'Otoño a primavera.',me:'Sin lluvia, tormenta, viento fuerte o roca inestable.',c:'Anclajes no aptos, viento, lluvia, miedo bloqueante o caída de piedras.',ri:'Péndulo, bloqueo, caída de piedras, mal uso del descensor y vértigo.',o:'Técnico cualificado, instalaciones verificadas y protocolo de rescate.',v:'Iniciación controlada, técnica, privada y formación de cuerda.'}),
    'ROPE JUMPING': spec({f:'Salto con cuerda',d:'2-4 h o salida especial.',e:'Edad mínima, peso y aptitud según operador autorizado.',fi:'Medio; salud adecuada y validación previa.',t:'Extremo.',x:'Entrevista, briefing reforzado y autocontrol.',r:'Según operador, instalación y protocolo.',m:'Arneses, cuerdas, anclajes y sistemas según operador autorizado.',q:'Documentación, ropa cómoda, calzado cerrado y consentimiento si procede.',se:'Convocatorias limitadas y meteo estable.',me:'Sin viento fuerte, lluvia, tormenta o acceso inseguro.',c:'Permisos, operador, meteo, peso/edad fuera de rango o estado emocional no adecuado.',ri:'Impacto psicológico, péndulo, arnés, acceso, evacuación y meteorología.',o:'Solo con proveedor autorizado, permisos, seguros y validación técnica.',v:'Convocatoria limitada, validación previa y audiovisual sujeto a viabilidad.'}),
    'PUENTING': spec({f:'Salto pendular',d:'2-4 h o convocatoria especial.',e:'Edad mínima y peso según operador autorizado; no orientado a menores.',fi:'Medio; aptitud y salud adecuadas.',t:'Extremo.',x:'Validación previa y briefing obligatorio.',r:'Según operador, instalación y protocolo.',m:'Arneses, cuerdas, anclajes y redundancias según operador.',q:'Documentación, ropa cómoda, calzado cerrado y autorización si procede.',se:'Convocatorias concretas con meteo estable.',me:'Sin lluvia, viento fuerte, tormenta o acceso inseguro.',c:'Permisos, operador, meteo, peso/edad fuera de rango o estado emocional no adecuado.',ri:'Péndulo, impacto psicológico, arnés, evacuación, acceso y meteorología.',o:'Proveedor autorizado, normativa, permisos y seguro específico.',v:'Validación previa, salida especial y audiovisual si no afecta a seguridad.'}),
    'ESCALADA VARIOS LARGOS': spec({f:'Escalada avanzada',d:'Jornada completa.',e:'16+ según vía y normativa.',fi:'Alto.',t:'Avanzado.',x:'Experiencia previa obligatoria en escalada y aseguramiento.',r:'Muy reducido: 1 guía / 1-2 participantes.',m:'Casco, arnés, cuerdas, reuniones, material de progresión y rescate.',q:'Pies de gato, agua, comida, cortavientos, frontal y material personal indicado.',se:'Según orientación y temperatura.',me:'Sin viento fuerte, lluvia, tormenta, calor extremo o roca mojada.',c:'Meteo, cordada no preparada, material incompleto, masificación o caída de piedras.',ri:'Caída, exposición, reuniones, fatiga, roca suelta y rescate complejo.',o:'Guía cualificado, permisos si proceden y planificación detallada.',v:'Avanzada, privada, mentoring técnico y jornada formativa.'}),
    'ESCALADA CLASICA, TRADICIONAL Y DE AVENTURA': spec({f:'Escalada de aventura',d:'Jornada completa.',e:'16+.',fi:'Alto.',t:'Avanzado.',x:'Obligatoria en escalada; no apta para principiantes.',r:'Muy reducido: 1 guía / 1-2 participantes.',m:'Material móvil, casco, arnés, cuerdas, reuniones y sistemas de protección.',q:'Pies de gato, ropa técnica, agua, comida y material personal indicado.',se:'Según vía, orientación y condiciones.',me:'Sin lluvia, viento fuerte, tormenta ni roca dudosa.',c:'Meteo, nivel insuficiente, material incompleto, riesgo de roca o permisos.',ri:'Protecciones móviles, caída, exposición, roca suelta, retirada y rescate.',o:'Progresión avanzada con planificación, criterio técnico y guía cualificado.',v:'Mentoring avanzado, jornada privada y formación de seguridad.'}),
    'ESPELEOAVENTURA': spec({f:'Cueva',d:'3-5 h.',e:'12-14+ según cavidad.',fi:'Medio.',t:'Iniciación-intermedio.',x:'No necesaria en cueva sencilla; claustrofobia a valorar.',r:'1 técnico / 6-8 participantes.',m:'Casco, frontal, mono, guantes, botiquín y comunicación según cavidad.',q:'Ropa que pueda ensuciarse, calzado con agarre, agua y muda.',se:'Todo el año según acceso y conservación.',me:'Sin lluvias que afecten acceso, crecidas o cavidades activas.',c:'Crecida, permisos, conservación, fatiga, miedo o material inadecuado.',ri:'Oscuridad, golpes, humedad, orientación, pasos estrechos y resbalones.',o:'Permisos, técnico cualificado y respeto estricto de conservación.',v:'Iniciación, familiar adaptada, escuela, privada y fotografía controlada.'}),
    'KAYAK DE MAR': spec({f:'Mar y costa',d:'2-4 h.',e:'8-10+ con adulto y condiciones tranquilas.',fi:'Bajo-medio.',t:'Iniciación.',x:'No necesaria; saber nadar recomendable.',r:'1 guía / 8-10 participantes según mar y ruta.',m:'Kayak, pala, chaleco, bidón estanco y briefing de navegación.',q:'Ropa de baño/deporte, agua, protección solar, gorra y calzado acuático.',se:'Primavera a otoño; invierno con equipo térmico.',me:'Viento y oleaje dentro de límites, buena visibilidad y salida segura.',c:'Oleaje, viento, tormenta, corriente, medusas, acceso o fatiga del grupo.',ri:'Vuelco, deriva, insolación, mareo, golpes contra roca y cansancio.',o:'Guía cualificado, seguro, permisos si proceden y plan de navegación.',v:'Familiar, atardecer, travesía, privada, centro educativo y audiovisual.'}),
    'PADDLE SURF (SUP)': spec({f:'Mar suave',d:'1,5-2 h.',e:'8-10+ con adulto y mar tranquilo.',fi:'Bajo-medio.',t:'Iniciación.',x:'No necesaria; saber nadar recomendable.',r:'1 guía / 8-10 participantes.',m:'Tabla SUP, pala, leash si procede, chaleco según formato y briefing.',q:'Ropa de baño, protección solar, agua y calzado acuático.',se:'Primavera a otoño.',me:'Mar tranquilo y viento flojo.',c:'Viento, oleaje, tormenta, corriente o baja visibilidad.',ri:'Caída, deriva, insolación, golpe con tabla y cansancio.',o:'Zona segura, guía cualificado y material revisado.',v:'Familiar, iniciación, amanecer, yoga suave y privada.'}),
    'COASTEERING': spec({f:'Costa técnica',d:'2-3 h.',e:'14+ recomendable si incluye saltos o trepadas.',fi:'Medio.',t:'Intermedio.',x:'Saber nadar y moverse en roca; saltos opcionales y validados.',r:'1 guía / 6-8 participantes.',m:'Casco, chaleco, neopreno según temperatura y apoyo de seguridad.',q:'Calzado acuático cerrado, bañador, agua y toalla.',se:'Primavera a otoño.',me:'Oleaje bajo-moderado, buena visibilidad y salidas del agua seguras.',c:'Oleaje, corriente, tormenta, agua fría, accesos inseguros o nivel insuficiente.',ri:'Golpes, resbalones, cortes, hipotermia, oleaje y salida del agua.',o:'Evaluación de tramo, permisos si proceden, guía cualificado y plan de evacuación.',v:'Iniciación sin saltos obligatorios, intermedia, privada y audiovisual.'}),
    'CLIFF DIVING / JUMPING': spec({f:'Saltos al agua',d:'Validación especial; no se plantea como actividad masiva.',e:'18+ recomendable o según normativa/proveedor; menores no recomendados.',fi:'Alto; dominio acuático y autocontrol.',t:'Avanzado-extremo.',x:'Experiencia previa y validación especial obligatoria.',r:'Muy reducido, según entorno, altura y salida.',m:'Casco/chaleco si procede, apoyo de seguridad y evaluación del punto.',q:'Calzado acuático, ropa de baño, agua y documentación.',se:'Solo con mar y visibilidad favorables.',me:'Profundidad, oleaje, viento, acceso, salida, visibilidad y fatiga controlados.',c:'Oleaje, fondo dudoso, altura no validada, público, fatiga o conducta imprudente.',ri:'Impacto, lesión cervical/lumbar, rocas, oleaje, pánico y salida del agua.',o:'No se fomenta el salto improvisado; validación técnica, permisos y protocolo específico.',v:'Solo validación especial y registro técnico, nunca actividad familiar genérica.'}),
    'SNORKEL DE AVENTURA': spec({f:'Mar y observación',d:'2-3 h.',e:'8-10+ según dominio acuático; menores con adulto.',fi:'Bajo-medio.',t:'Iniciación.',x:'Saber nadar o formato adaptado con flotación.',r:'1 guía / 8-10 participantes según zona.',m:'Máscara, tubo, aletas, boya, neopreno según temperatura y briefing ambiental.',q:'Bañador, toalla, agua, protección solar marina responsable y calzado acuático.',se:'Primavera a otoño.',me:'Mar tranquilo, buena visibilidad y corriente baja.',c:'Oleaje, corriente, mala visibilidad, agua fría o riesgos ambientales.',ri:'Cansancio, rocas, oleaje, fauna, insolación y ansiedad acuática.',o:'Guía cualificado, seguro, zona permitida y criterios ambientales.',v:'Familiar, educativa, fotografía de paisaje submarino y privada.'}),
    'PARASAILING': spec({f:'Mar y aire',d:'1-2 h total; vuelo real menor.',e:'Edad, peso y condiciones según operador náutico autorizado.',fi:'Bajo-medio.',t:'Iniciación con proveedor.',x:'No necesaria; briefing y operador autorizado.',r:'Según embarcación, arnés y proveedor.',m:'Embarcación, arnés, chaleco y sistema de vuelo según operador.',q:'Ropa de baño, protección solar, documentación y medicación contra mareo si procede.',se:'Temporada náutica y meteo estable.',me:'Viento y mar dentro de límites del operador.',c:'Viento, oleaje, tormenta, operativa náutica o peso/edad fuera de rango.',ri:'Embarque, desembarque, viento, mareo, arnés y aterrizaje.',o:'Operador náutico autorizado, permisos, seguro y normativa marítima.',v:'Vuelo individual/doble según operador y registro audiovisual permitido.'}),
    'TRAVESIAS EN KAYAK': spec({f:'Kayak de jornada',d:'4-8 h o jornada completa.',e:'14+ recomendable.',fi:'Medio.',t:'Intermedio.',x:'Experiencia previa en kayak o buena condición física recomendable.',r:'1 guía / 6-8 participantes según mar y distancia.',m:'Kayak, pala, chaleco, bidón estanco, plan de ruta y comunicación.',q:'Agua suficiente, comida, protección solar, ropa de recambio y calzado acuático.',se:'Primavera a otoño.',me:'Viento, oleaje, corriente y térmicas dentro de límites.',c:'Viento térmico, oleaje, tormenta, fatiga, acceso o distancia no viable.',ri:'Fatiga, deriva, insolación, vuelco, hidratación y navegación costera.',o:'Planificación náutica, guía cualificado, seguro y ruta alternativa.',v:'Jornada, privada, atardecer largo y fin de semana.'}),
    'KITESURF': spec({f:'Viento',d:'Sesiones de 2-3 h o curso por módulos.',e:'12-14+ según escuela/proveedor y autorización.',fi:'Medio.',t:'Progresivo.',x:'No como actividad suelta de iniciación; requiere curso por fases.',r:'Muy reducido en escuela, según fase y spot.',m:'Cometa, barra, arnés, tabla, casco/chaleco y sistema de seguridad.',q:'Neopreno si procede, agua, protección solar y documentación.',se:'Según viento y spot.',me:'Viento adecuado, zona despejada y sin tormenta.',c:'Rachas, viento insuficiente/excesivo, tormenta, playa saturada o nivel no adecuado.',ri:'Arrastre, líneas, colisión, deriva, rachas y fatiga.',o:'Escuela/proveedor autorizado, zona permitida y seguro.',v:'Curso básico, progresión, refresco técnico y privado.'}),
    'WINDSURF': spec({f:'Viento y vela',d:'2-3 h.',e:'10-12+ según escuela y condiciones.',fi:'Medio.',t:'Iniciación-intermedio.',x:'No necesaria en viento flojo.',r:'1 instructor / 6-8 participantes.',m:'Tabla, vela, chaleco y material de escuela.',q:'Ropa de baño, protección solar, agua y neopreno si procede.',se:'Primavera a otoño.',me:'Viento flojo-moderado para iniciación.',c:'Viento excesivo, tormenta, mala visibilidad o zona no segura.',ri:'Caídas, deriva, golpes con tabla, fatiga y exposición solar.',o:'Escuela/proveedor autorizado y zona apta.',v:'Iniciación, progresión, familiar adaptada y privada.'}),
    'BAUTISMO DE BUCEO': spec({f:'Buceo',d:'2,5-3,5 h total.',e:'10+ orientativo para bautismo estándar; menores con consentimiento y centro autorizado.',fi:'Bajo-medio; salud compatible.',t:'Iniciación supervisada.',x:'No necesaria; requiere cuestionario médico.',r:'Muy reducido, según centro y estándar de agencia.',m:'Equipo completo de buceo, neopreno, lastre y briefing.',q:'Bañador, toalla, agua, documentación y cuestionario médico.',se:'Primavera a otoño; invierno según centro y temperatura.',me:'Mar apto, visibilidad suficiente y ausencia de oleaje peligroso.',c:'Cuestionario médico, ansiedad, mar, visibilidad, oído, frío o criterio del instructor.',ri:'Compensación, ansiedad, frío, mareo, oído, respiración y flotabilidad.',o:'No promete certificación; centro/instructor autorizado PADI/SSI u organismo equivalente.',v:'Bautismo, familiar adaptado, privado y audiovisual si no afecta a seguridad.'}),
    'OPEN WATER PADI / SSI': spec({f:'Formación de buceo',d:'3-4 días o formato equivalente según centro.',e:'10+ junior / 15+ adulto según agencia y centro autorizado.',fi:'Medio; salud compatible y saber nadar.',t:'Curso inicial certificado en versión real.',x:'No requiere buceo previo; sí habilidades acuáticas y cuestionario médico.',r:'Según estándar de agencia y centro.',m:'Equipo completo, material didáctico, sesiones confinadas y mar abierto según centro.',q:'Bañador, toalla, documentación, cuestionario médico y tiempo de estudio.',se:'Todo el año según centro y mar.',me:'Mar apto para prácticas, visibilidad y logística del centro.',c:'Cuestionario médico, no superar habilidades, mar, oído o criterio del instructor.',ri:'Flotabilidad, compensación, estrés, frío, mareo y gestión del aire.',o:'Ruta formativa de referencia; en versión operativa requeriría centro autorizado PADI/SSI.',v:'Curso completo por centro autorizado, refresco, junior y continuidad Advanced.'}),
    'BUCEO NOCTURNO': spec({f:'Buceo avanzado',d:'2-3 h.',e:'Según certificación y centro.',fi:'Medio; salud compatible.',t:'Intermedio.',x:'Open Water y experiencia reciente; Advanced o especialidad según centro.',r:'Reducido, según centro y visibilidad.',m:'Equipo completo, linterna principal, backup según protocolo y señalización.',q:'Certificación, seguro si procede, ordenador, toalla y abrigo postinmersión.',se:'Verano y otoño con mar estable.',me:'Mar tranquilo, visibilidad suficiente y logística nocturna segura.',c:'Mala visibilidad, mar, ansiedad, certificación no adecuada o linternas insuficientes.',ri:'Oscuridad, orientación, flotabilidad, estrés, frío y separación del grupo.',o:'Centro autorizado, instructor/guía cualificado y protocolos nocturnos.',v:'Guiada, formación de especialidad, privada y audiovisual limitado.'}),
    'BUCEO GUIADO': spec({f:'Buceo',d:'2-3 h.',e:'Según certificación y centro.',fi:'Medio; salud compatible.',t:'Según punto de inmersión.',x:'Certificación vigente y experiencia acorde al punto.',r:'Según centro, profundidad y condiciones.',m:'Equipo completo de buceo, botella, lastre y apoyo de superficie según centro.',q:'Certificación, seguro si procede, ordenador, documentación y equipo personal si tiene.',se:'Todo el año según mar.',me:'Mar apto, visibilidad y corriente dentro de límites.',c:'Mar, visibilidad, corriente, certificación insuficiente, salud o criterio del guía.',ri:'Consumo de aire, flotabilidad, corrientes, frío, orientación y barcos.',o:'Centro autorizado y respeto de intervalos antes de vuelo o altitud.',v:'Inmersión guiada, privada, fotografía y ruta naturalista.'}),
    'FOTOGRAFIA SUBMARINA': spec({f:'Buceo y audiovisual',d:'2-3 h.',e:'Según certificación y centro.',fi:'Medio.',t:'Intermedio.',x:'Open Water mínimo y flotabilidad suficiente.',r:'Reducido para no dañar el entorno.',m:'Equipo de buceo, cámara/soporte según formato e iluminación si procede.',q:'Certificación, equipo personal si tiene y respeto estricto al fondo.',se:'Primavera a otoño.',me:'Buena visibilidad, mar tranquilo y zona apta.',c:'Mala visibilidad, corriente, falta de flotabilidad o protección ambiental.',ri:'Contacto con fondo, pérdida de flotabilidad, distracción, frío y consumo de aire.',o:'Centro autorizado y protocolo ambiental.',v:'Básica, privada, creador outdoor y archivo de recuerdo.'}),
    'ADVANCED · RESCUE · NITROX': spec({f:'Formación avanzada de buceo',d:'Varios días según curso y agencia.',e:'Según agencia, curso y centro autorizado.',fi:'Medio; salud compatible.',t:'Intermedio-avanzado.',x:'Open Water previo y requisitos de la agencia.',r:'Según estándar del centro autorizado.',m:'Equipo completo, material didáctico y recursos específicos de cada curso.',q:'Certificación previa, documentación, cuestionario médico y equipo personal si procede.',se:'Todo el año según centro y mar.',me:'Condiciones aptas para prácticas específicas.',c:'Meteo, no cumplir requisitos previos, salud o criterio del instructor.',ri:'Profundidad, navegación, estrés, flotabilidad, gases y rescate.',o:'No se promete certificación real desde el proyecto; requeriría centro autorizado.',v:'Advanced, Rescue, Nitrox, refresco y continuidad formativa.'}),
    'PARACAIDISMO TANDEM': spec({f:'Aire extremo',d:'Medio día de operativa; salto y vuelo según centro.',e:'Según centro/proveedor; menores solo con autorización si el operador lo permite.',fi:'Salud compatible y movilidad suficiente para aterrizaje.',t:'Extremo con instructor tándem.',x:'No necesaria; briefing obligatorio y documentación.',r:'1 instructor tándem / 1 participante.',m:'Sistema tándem, paracaídas principal/reserva y equipo del centro autorizado.',q:'Documentación, ropa cómoda, calzado cerrado y requisitos del operador.',se:'Según operativa aérea y meteo.',me:'Viento, nubosidad, lluvia, visibilidad y espacio aéreo aptos.',c:'Meteo, peso/edad fuera de rango, documentación, operativa aérea o salud.',ri:'Actividad extrema, ansiedad, salida, apertura, aterrizaje y meteorología.',o:'Solo mediante centro autorizado, normativa aérea, seguros y profesionales habilitados.',v:'Tándem, vídeo externo/handcam según centro y convocatoria.'}),
    'PARAPENTE BIPLAZA': spec({f:'Aire',d:'1-2 h total; vuelo real 15-40 min según condiciones.',e:'Edad y peso según piloto/empresa autorizada.',fi:'Bajo-medio; carrera corta en despegue si procede.',t:'Iniciación con piloto biplaza.',x:'No necesaria; briefing y consentimiento.',r:'1 piloto biplaza / 1 pasajero.',m:'Vela biplaza, silla, casco, paracaídas de emergencia y equipo del piloto.',q:'Calzado cerrado, cortavientos, documentación y gafas si procede.',se:'Según zona y meteo.',me:'Viento, térmicas y visibilidad dentro de límites del piloto.',c:'Viento, térmicas fuertes, lluvia, nubosidad, acceso o criterio del piloto.',ri:'Despegue, aterrizaje, mareo, viento, térmicas y ansiedad.',o:'Piloto/empresa autorizada, zona permitida y seguro.',v:'Biplaza panorámico, atardecer y audiovisual según viabilidad.'}),
    'PARAMOTOR': spec({f:'Aire motorizado',d:'1-2 h total; vuelo real variable.',e:'Edad y peso según operador autorizado.',fi:'Bajo-medio; salud compatible.',t:'Iniciación con piloto cualificado.',x:'No necesaria para pasajero; briefing obligatorio.',r:'1 piloto / 1 pasajero según equipo.',m:'Paramotor/paratrike según formato, casco, silla y equipo del operador.',q:'Documentación, ropa cómoda, abrigo ligero y calzado cerrado.',se:'Según viento y zona autorizada.',me:'Viento laminar, buena visibilidad y espacio autorizado.',c:'Viento, térmicas, lluvia, espacio aéreo, peso/edad o criterio del piloto.',ri:'Despegue, aterrizaje, motor, ruido, viento y mareo.',o:'Piloto cualificado, espacio permitido, normativa aérea y seguro.',v:'Vuelo panorámico, costa, atardecer y audiovisual si el operador lo permite.'}),
    'PARATRIKE': spec({f:'Aire motorizado',d:'1-2 h total; vuelo real variable.',e:'Edad y peso según operador autorizado.',fi:'Bajo-medio; embarque cómodo.',t:'Iniciación con piloto cualificado.',x:'No necesaria; briefing obligatorio.',r:'Habitualmente 1 pasajero por vuelo, según aeronave/proveedor.',m:'Paratrike, casco/intercom si procede y equipo del operador.',q:'Documentación, ropa cómoda, abrigo ligero y calzado cerrado.',se:'Según viento y zona autorizada.',me:'Viento laminar, buena visibilidad y espacio permitido.',c:'Viento, lluvia, térmicas, peso/edad, operativa aérea o criterio del piloto.',ri:'Despegue, aterrizaje, motor, vibración, viento y mareo.',o:'Proveedor autorizado, normativa aérea, seguros y permisos.',v:'Panorámico, costa, atardecer y audiovisual autorizado.'}),
    'AFF PARACAIDISMO': spec({f:'Formación aérea',d:'Curso por niveles; varios días/saltos.',e:'Según normativa, federación y centro autorizado.',fi:'Alto; salud compatible y documentación requerida.',t:'Avanzado progresivo.',x:'Formación teórica, pruebas y validación médica/documental según centro.',r:'Según estándar AFF y centro autorizado.',m:'Paracaídas escuela, altímetro, casco, mono, radio y equipo del centro.',q:'Documentación, certificado médico si procede y disponibilidad de jornadas.',se:'Según operativa aérea.',me:'Condiciones de salto aptas según centro.',c:'Meteo, no superar teoría, documentación, salud u operativa aérea.',ri:'Salto autónomo progresivo, salida, estabilidad, apertura, aterrizaje y meteorología.',o:'Progresión hacia licencia según federación/centro autorizado; no promesa automática.',v:'Curso AFF, progresión tutelada y salto escuela autorizado.'}),
    'BARRANQUISMO ACUATICO': spec({f:'Barrancos y río',d:'4-6 h o jornada según barranco.',e:'12-14+ según dificultad, caudal y proveedor.',fi:'Medio.',t:'Intermedio.',x:'Saber nadar y tolerar agua fría; rápeles según barranco.',r:'1 técnico / 6-8 participantes según caudal y dificultad.',m:'Neopreno, casco, arnés, descensor, calzado específico y cuerda.',q:'Bañador, calzado adecuado si no incluido, agua, comida y muda.',se:'Primavera a otoño según caudal.',me:'Caudal estable y sin tormentas aguas arriba.',c:'Caudal, lluvia, tormenta, agua fría, permisos o nivel insuficiente.',ri:'Rápeles, resbalones, saltos opcionales, hipotermia, caudal y golpes.',o:'Técnico cualificado, permisos, seguro y plan de escape.',v:'Iniciación, intermedio, privado y audiovisual acuático.'}),
    'RAFTING': spec({f:'Río',d:'3-4 h.',e:'8-12+ según río, caudal y proveedor.',fi:'Medio.',t:'Iniciación con proveedor.',x:'No necesaria; saber nadar recomendable.',r:'Según balsa, guía y caudal.',m:'Casco, chaleco, pala, neopreno según época y balsa.',q:'Bañador, calzado cerrado, muda, toalla y agua.',se:'Según caudal y río.',me:'Caudal apto y sin crecidas o tormentas aguas arriba.',c:'Caudal, tormenta, crecida, frío, proveedor o nivel del grupo.',ri:'Caída al agua, golpes, hipotermia, caudal, vuelco y fatiga.',o:'Empresa/proveedor autorizado, seguros y permisos de río.',v:'Familiar según caudal, grupo, privada y audiovisual.'}),
    'BARRANQUISMO SECO': spec({f:'Barranco seco',d:'4-6 h o jornada.',e:'12-14+ según recorrido.',fi:'Medio.',t:'Intermedio.',x:'Rápel básico recomendable según barranco.',r:'1 técnico / 6-8 participantes.',m:'Casco, arnés, cuerda, descensor, guantes y botiquín.',q:'Calzado adherente, agua, comida ligera y ropa resistente.',se:'Otoño a primavera.',me:'Sin tormenta, calor extremo o caída de piedras.',c:'Tormenta, calor, roca inestable, acceso cerrado o nivel insuficiente.',ri:'Rápeles, calor, roca suelta, fatiga, golpes y evacuación.',o:'Técnico cualificado, permisos si proceden y plan de emergencia.',v:'Intermedio, privado, escuela de cuerda y audiovisual.'}),
    'DESCENSO DE CAÑONES': spec({f:'Cañones técnicos',d:'Jornada completa.',e:'14-16+ según cañón.',fi:'Medio-alto.',t:'Intermedio-avanzado.',x:'Experiencia previa en barrancos o cuerda recomendable.',r:'Muy reducido según dificultad y caudal.',m:'Equipo completo de barrancos, cuerdas, comunicación y botiquín.',q:'Comida, agua, ropa de recambio y calzado adecuado.',se:'Según caudal, temperatura y permisos.',me:'Sin lluvias ni tormentas aguas arriba.',c:'Caudal, meteo, permisos, nivel insuficiente o escape no viable.',ri:'Rápeles, caudal, hipotermia, encajonamiento, resbalones y evacuación.',o:'Guía cualificado, permisos, seguro y planificación técnica.',v:'Avanzado, privado y formación técnica.'}),
    'BTT COSTERO': spec({f:'BTT y costa',d:'3-5 h.',e:'12+ o formato familiar adaptado según ruta y talla de bici.',fi:'Medio.',t:'Iniciación-intermedio.',x:'Saber montar con seguridad; técnica básica de caminos.',r:'1 guía / 8-10 participantes.',m:'Bici si se contrata, casco, kit básico y ruta guiada.',q:'Ropa deportiva, agua, guantes, protección solar y documentación.',se:'Todo el año, evitando calor extremo.',me:'Sin lluvia fuerte, viento peligroso o calor extremo.',c:'Calor, tormenta, pinchazos múltiples, tráfico, lesión o terreno impracticable.',ri:'Caídas, tráfico, calor, terreno suelto, pinchazos y fatiga.',o:'Bicis revisadas, casco, seguro y ruta evaluada.',v:'Familiar, iniciación, atardecer, privada y audiovisual.'}),
    'BTT TECNICO': spec({f:'BTT de sendero',d:'4-6 h.',e:'14-16+ según sendero.',fi:'Medio-alto.',t:'Intermedio.',x:'Manejo previo en sendero y frenada controlada.',r:'1 guía / 6-8 participantes.',m:'Bici adecuada, casco, kit reparación, ruta y comunicación.',q:'Guantes, agua, comida, protección, cámara/repuesto si tiene y casco propio si procede.',se:'Otoño a primavera.',me:'Sin lluvia intensa, barro peligroso o calor extremo.',c:'Terreno impracticable, calor, caída, mecánica, tormenta o nivel insuficiente.',ri:'Caídas, rocas, pendiente, tráfico puntual, calor y averías.',o:'Guía cualificado, bici revisada, seguro y evaluación de nivel.',v:'Intermedio, entrenamiento, privado y audiovisual FPV si procede.'}),
    'CICLOTURISMO DE AVENTURA': spec({f:'Cicloturismo',d:'Jornada completa o varios días.',e:'14+ según ruta y autonomía.',fi:'Medio-alto.',t:'Iniciación-intermedio.',x:'Autonomía básica en bici y resistencia suficiente.',r:'1 guía / 8-10 participantes.',m:'Ruta, apoyo de orientación, kit reparación y logística básica.',q:'Bici revisada, casco, agua, comida, luces, documentación y ropa adecuada.',se:'Otoño, invierno y primavera.',me:'Sin calor extremo, tormenta o viento peligroso.',c:'Meteo, tráfico, fatiga, mecánica, falta de agua o ruta no viable.',ri:'Fatiga, tráfico, caídas, deshidratación, averías y orientación.',o:'Ruta segura, seguros, logística y plan de asistencia.',v:'Jornada, fin de semana, alforjas, privada y audiovisual.'}),
    'E-FOIL': spec({f:'Foil eléctrico',d:'1-2 h.',e:'14-16+ según escuela/proveedor.',fi:'Medio.',t:'Iniciación-intermedio.',x:'Equilibrio y dominio acuático básico.',r:'Muy reducido: 1 instructor / 1-3 participantes.',m:'Tabla e-foil, casco, chaleco, batería revisada y zona balizada.',q:'Bañador, neopreno si procede, protección solar y agua.',se:'Primavera a otoño.',me:'Mar tranquilo, poco viento y zona despejada.',c:'Oleaje, viento, batería, tráfico marítimo, permisos o proveedor.',ri:'Caída, foil, batería, colisión, cortes y deriva.',o:'Proveedor autorizado, zona permitida, seguro y briefing específico.',v:'Iniciación, sesión privada, premium y audiovisual.'}),
    'WINGFOIL': spec({f:'Foil y viento',d:'2-3 h.',e:'14+ según escuela/proveedor.',fi:'Medio.',t:'Intermedio progresivo.',x:'Recomendable SUP, windsurf o kite; iniciación por fases posible.',r:'Muy reducido según viento y nivel.',m:'Wing, tabla, foil, casco, chaleco y leash según escuela.',q:'Neopreno si procede, agua, protección solar y calzado si lo indica la escuela.',se:'Según viento.',me:'Viento adecuado, zona despejada y sin tormenta.',c:'Viento excesivo/insuficiente, oleaje, tráfico, tormenta o nivel no adecuado.',ri:'Foil, deriva, viento, colisión, fatiga y cortes.',o:'Escuela/proveedor autorizado, zona permitida y seguro.',v:'Curso por módulos, refresco, privada y audiovisual.'}),
    'JETSURF': spec({f:'Tabla motorizada',d:'1-2 h.',e:'Según proveedor; 16+ orientativo en formato técnico.',fi:'Medio-alto.',t:'Intermedio-avanzado.',x:'Experiencia acuática y equilibrio recomendables.',r:'Muy reducido, según proveedor y zona.',m:'Jetsurf, chaleco, casco, sistema de seguridad y apoyo en agua.',q:'Bañador, neopreno si procede, protección solar y documentación.',se:'Primavera a otoño.',me:'Mar manejable, zona permitida y baja congestión.',c:'Oleaje, viento, permisos, tráfico marítimo, avería o proveedor.',ri:'Velocidad, caída, colisión, motor, corte, deriva y fatiga.',o:'Proveedor autorizado, zona permitida, seguro y supervisión técnica.',v:'Sesión técnica, privada y audiovisual sujeto a seguridad.'}),
    'WATERMAN TRAINING': spec({f:'Formación acuática',d:'2-3 días o módulos separados.',e:'14-16+ según disciplinas y escuela.',fi:'Medio-alto.',t:'Progresivo.',x:'Dominio acuático y validación previa; no concentra progresiones imposibles.',r:'Reducido por módulo y disciplina.',m:'Material de e-foil, wing, kite/SUP según módulo y proveedor.',q:'Neopreno, protección solar, agua, documentación y ropa de recambio.',se:'Primavera a otoño según viento y mar.',me:'Cada módulo exige condiciones distintas de viento, mar y zona.',c:'Viento, mar, proveedor, permisos, nivel o fatiga acumulada.',ri:'Deriva, foil, viento, fatiga, caídas y colisiones.',o:'Credencial interna del proyecto; certificaciones reales dependerían de escuela autorizada.',v:'Módulos separados, intensivo validado, privado y audiovisual.'}),
    'MAR + MONTAÑA': spec({f:'Multiaventura',d:'Jornada completa.',e:'12+ según combinación y nivel.',fi:'Medio.',t:'Iniciación-intermedio.',x:'Se adapta por disciplinas; algunas pueden requerir experiencia.',r:'Según actividad de mayor riesgo del pack.',m:'Material específico de cada disciplina, briefing y ficha final personalizada.',q:'Ropa para tierra y agua, calzado, agua, comida, toalla y protección solar.',se:'Primavera a otoño.',me:'Deben encajar condiciones de montaña y mar.',c:'Meteo, mar, fatiga, incompatibilidad de nivel o logística.',ri:'Fatiga, calor, cambios de medio, resbalones, vuelcos y orientación.',o:'Duración, edad, ratio y material se cerrarían en ficha personalizada.',v:'Familiar, privada, premium, centros y audiovisual.'}),
    'PARAMOTOR & PARATRIKE': spec({f:'Aire combinado',d:'Medio día según turnos de vuelo.',e:'Edad y peso según operador autorizado.',fi:'Bajo-medio.',t:'Iniciación con piloto.',x:'No necesaria para pasajero; briefing obligatorio.',r:'1 pasajero por vuelo según aeronave/proveedor.',m:'Equipo de vuelo del operador y casco/intercom si procede.',q:'Documentación, ropa cómoda, abrigo ligero y calzado cerrado.',se:'Según viento y operativa aérea.',me:'Viento, visibilidad y espacio autorizado dentro de límites.',c:'Meteo, peso/edad, operativa, espacio aéreo o criterio del piloto.',ri:'Despegue, aterrizaje, viento, motor, mareo y logística.',o:'Proveedor autorizado, normativa aérea y seguro.',v:'Vuelo panorámico, atardecer, privado y audiovisual permitido.'}),
    'MULTIAVENTURA': spec({f:'Pack combinado',d:'Variable: media jornada, jornada completa o fin de semana según disciplinas.',e:'Según la disciplina más exigente del pack y validación previa.',fi:'Adaptado, pero nunca por debajo de la actividad más exigente.',t:'Variable; se define en ficha final personalizada.',x:'Según combinación; algunas opciones requieren experiencia o proveedor autorizado.',r:'Lo marca la actividad de mayor riesgo y el tamaño del grupo.',m:'Material específico de cada actividad y briefing integrado.',q:'Lista personalizada según medio, estación y duración.',se:'Según disciplinas elegidas.',me:'Cada medio se valida por separado: mar, viento, río, montaña o aire.',c:'Nivel, meteo de una disciplina, proveedor, permisos o fatiga acumulada.',ri:'Riesgos combinados de cada medio, fatiga, logística y cambios de entorno.',o:'Ficha final obligatoria con horarios, ratios, material, seguros y permisos.',v:'Familiar, iniciación, extrema, premium, centro educativo y audiovisual.'})
  };
  const SPEC_ALIASES = {'VÍA FERRATA':'VIA FERRATA','VIA FERRATA':'VIA FERRATA','RÁPEL TÉCNICO':'RAPEL TECNICO','RAPEL TÉCNICO':'RAPEL TECNICO','BTT COSTERA':'BTT COSTERO','BTT TÉCNICO':'BTT TECNICO','PARAPENTE':'PARAPENTE BIPLAZA','OPEN WATER':'OPEN WATER PADI / SSI','VIVAC Y TRAVESÍA':'VIVAC Y TRAVESIA','TRAVESÍAS EN KAYAK':'TRAVESIAS EN KAYAK','BARRANQUISMO ACUÁTICO':'BARRANQUISMO ACUATICO','FOTOGRAFÍA SUBMARINA':'FOTOGRAFIA SUBMARINA','PARACAIDISMO TÁNDEM':'PARACAIDISMO TANDEM','PADDLE SURF':'PADDLE SURF (SUP)'};
  const specLookup = Object.fromEntries(Object.entries(ACTIVITY_SPECS).map(([key,value]) => [normalizeTitle(key), value]));
  Object.entries(SPEC_ALIASES).forEach(([alias,key]) => { specLookup[normalizeTitle(alias)] = ACTIVITY_SPECS[key]; });
  const fallbackTechnicalSpec = spec({f:'Actividad combinada o ficha pendiente',d:'A definir en ficha personalizada antes de la actividad.',e:'Según disciplinas elegidas, proveedor autorizado y validación previa.',fi:'Ajustado tras entrevista inicial.',t:'Variable según actividad; se confirma por escrito.',x:'Puede requerir experiencia previa si incluye cuerda, buceo, aire o agua técnica.',r:'Lo determina la actividad de mayor riesgo y el proveedor/técnico responsable.',m:'Material específico definido en la ficha final del plan.',q:'Lista personalizada según medio, duración, temporada y condiciones.',se:'Según combinación de actividades.',me:'Cada medio se valida por separado: mar, viento, río, montaña o aire.',c:'Meteo, permisos, proveedor, nivel insuficiente o seguridad del grupo.',ri:'Riesgos propios de la combinación elegida, fatiga y logística.',o:'Solo pasaría a versión real con ficha final, seguros, permisos y profesionales cualificados.',v:'A medida, privada, educativa, familiar adaptada o premium.'});
  function getActivitySpec(title){const n=normalizeTitle(title);return specLookup[n]||Object.entries(specLookup).find(([k])=>n.includes(k)||k.includes(n))?.[1]||fallbackTechnicalSpec;}
  function renderTechnicalSheet(s){const rows=[['Familia',s.familia],['Duración',s.duracion],['Edad recomendada',s.edad],['Nivel físico',s.fisico],['Nivel técnico',s.tecnico],['Experiencia previa',s.experiencia],['Ratio orientativo',s.ratio],['Material incluido',s.material],['Qué traer',s.trae],['Temporada recomendada',s.temporada],['Meteorología límite',s.meteo],['Motivos de cambio o cancelación',s.cancelacion],['Riesgos principales',s.riesgos],['Requisitos en versión operativa',s.operativo],['Nota académica',s.nota],['Versiones posibles',s.versiones]];return `<div class="modal-technical-sheet"><div class="technical-grid">${rows.map(([l,v])=>`<span class="technical-item"><strong>${l}</strong>${v}</span>`).join('')}</div></div>`;}
  function placeTechnicalButton(card,btn){const body=card.querySelector('.ficha-cuerpo')||card;if(card.classList.contains('process-card')){let row=card.querySelector('.action-row');const primary=card.querySelector('a.btn, button.btn');if(!row){row=document.createElement('div');row.className='action-row action-row--stack-mobile';if(primary){primary.parentNode.insertBefore(row,primary);row.appendChild(primary)}else{card.appendChild(row)}}row.appendChild(btn);return}body.appendChild(btn)}
  document.querySelectorAll('.ficha, .process-card').forEach(card=>{const title=card.querySelector('.ficha-titulo, h3')?.textContent?.trim();if(!title||card.querySelector('.ficha-tech-btn'))return;const btn=document.createElement('button');btn.type='button';btn.className='ficha-tech-btn';btn.textContent='Ver ficha técnica';btn.addEventListener('click',()=>window.noextOpenModal(`Ficha técnica · ${title}`,renderTechnicalSheet(getActivitySpec(title))));placeTechnicalButton(card,btn)});
  document.querySelectorAll('a.btn, button.btn, .ficha-btn').forEach(el=>{if(el.dataset.noextBound)return;el.dataset.noextBound='1';el.addEventListener('click',()=>{const text=el.textContent.trim();if(/Solicitar|Regalar|Consultar|Reservar|Contactar|Unirme/i.test(text))window.noextToast(`${text.replace('→','').trim()} · solicitud preparada`)})});
});
