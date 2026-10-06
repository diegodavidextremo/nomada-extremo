(() => {
  const container = document.querySelector('#learningRoutes');
  if (!container) return;

  const routes = [
    {
      id: 'parapente',
      tone: '#d2a064',
      title: 'Parapente',
      category: 'Ruta aire libre',
      count: '7 módulos',
      start: 'Biplaza de iniciación',
      goal: 'Autonomía supervisada',
      reference: 'Federación autonómica, escuela autorizada y progresión técnica en vuelo libre.',
      responsible: 'Instructor/a de vuelo y paracaidismo',
      modules: [
        ['Biplaza de iniciación', 'Primer contacto con despegue, vuelo, aterrizaje, posición corporal y sensaciones reales acompañado por un piloto biplaza.'],
        ['Control de campa', 'Inflado, estabilización y control de la vela en tierra para comprender viento, frenos, bandas y respuesta del ala.'],
        ['Técnicas básicas', 'Nociones de despegue, carrera, dirección, velocidad, aproximación y aterrizaje.'],
        ['Meteorología', 'Lectura de viento, brisas, térmicas, rachas, nubes, turbulencia y condiciones no aptas para volar.'],
        ['Seguridad activa', 'Revisión de equipo, casco, arnés, radio, emergencia, separación y criterio conservador.'],
        ['Autonomía progresiva', 'Vuelos supervisados, control de altura, circuito de aproximación, aterrizaje y toma de decisiones.'],
        ['Cross country', 'Introducción al vuelo de distancia, planificación, gestión de altura y aterrizajes alternativos.']
      ],
      training: 'Curso de iniciación al parapente, control de campa, progresión supervisada, meteorología básica, seguridad en vuelo libre y prácticas de autonomía con instructor.',
      requirements: 'Condición física básica, capacidad para correr en despegue y aterrizaje, ausencia de lesiones incompatibles, comprensión de instrucciones y respeto al criterio técnico.',
      safety: 'Actividad condicionada por meteorología. Se revisan vela, líneas, arnés, casco, mosquetones, radio, emergencia, despegue, aterrizaje y margen de viento. Si las condiciones no son claras, se aplaza.',
      achievement: 'Comprender el parapente desde la base: sensaciones, control de vela, meteorología, seguridad, despegue, aterrizaje y progresión hacia vuelos supervisados.',
      after: 'Continuar hacia una formación completa de piloto, mejorar el control de campa, realizar vuelos supervisados y avanzar, con experiencia suficiente, hacia el vuelo de distancia.',
      tags: ['Biplaza', 'Campa', 'Meteorología', 'Seguridad', 'Vuelo libre', 'Autonomía', 'Cross country']
    },
    {
      id: 'paramotor',
      tone: '#b47855',
      title: 'Paramotor / Paratrike',
      category: 'Ruta vuelo motor',
      count: '7 módulos',
      start: 'Biplaza paratrike',
      goal: 'Seguridad avanzada',
      reference: 'Federación autonómica, escuela autorizada, normativa aérea y progresión en vuelo motorizado.',
      responsible: 'Instructor/a de vuelo y paracaidismo',
      modules: [
        ['Biplaza paratrike', 'Primera experiencia para conocer despegue, navegación, motor, vibraciones, aterrizaje y sensaciones del vuelo motorizado.'],
        ['Teoría del motor', 'Motor, chasis, hélice, combustible, empuje, mantenimiento básico, revisiones y funcionamiento general.'],
        ['Control de vela', 'Inflado, orientación al viento, campa, asistencia al despegue y control del ala antes de añadir potencia.'],
        ['Técnica de vuelo', 'Despegue, altura, virajes, potencia, aproximación, aterrizaje y coordinación entre vela y motor.'],
        ['Navegación', 'Viento, ruta, referencias, consumo, autonomía, regreso, zonas seguras y toma de decisiones.'],
        ['Revisión de equipo', 'Checklist de motor, vela, arnés, emergencia, hélice, tornillería, combustible, líneas y radio.'],
        ['Emergencias', 'Parada de motor, aterrizaje preventivo, pérdida de altura, incidencias y decisiones conservadoras.']
      ],
      training: 'Iniciación al paramotor o paratrike, teoría de motor, control de vela, navegación básica, seguridad aérea, mantenimiento preventivo y gestión de emergencias.',
      requirements: 'Condición física básica, peso dentro del margen operativo, capacidad para seguir instrucciones, comprensión del briefing y respeto al criterio del instructor.',
      safety: 'Revisión de motor, vela, arnés, casco, radio, combustible, hélice, líneas, zonas de despegue y aterrizaje, viento, rachas, turbulencia y margen operativo. No se vuela con condiciones dudosas.',
      achievement: 'Entender la diferencia entre vuelo libre y motorizado, conocer el equipo, interpretar el viento, comprender la navegación y adquirir una base real de seguridad.',
      after: 'Continuar hacia formación completa de piloto, acumular horas supervisadas, mejorar el control de vela y progresar en navegación segura.',
      tags: ['Paratrike', 'Paramotor', 'Motor', 'Navegación', 'Seguridad', 'Emergencias', 'Vuelo motorizado']
    },
    {
      id: 'aff',
      tone: '#b95555',
      title: 'AFF PARACAIDISMO',
      category: 'Ruta caída libre',
      count: '8 niveles + licencias',
      price: 'Curso AFF base: desde 1.500–2.300 € aprox. · Programa completo AFF + consolidación + licencia: desde 2.900–3.600 € aprox. · consultar centro autorizado (por ejemplo, Skydive Totana)',
      start: 'AFF Nivel 1',
      goal: 'Licencias A / B / C / D',
      reference: 'RFAE, centro autorizado y progresión oficial del centro; referencia internacional tipo USPA.',
      responsible: 'Instructor/a de vuelo y paracaidismo + centro autorizado colaborador',
      modules: [
        ['AFF Nivel 1', 'Primer salto acompañado: posición corporal, altura, apertura, comunicación y aterrizaje asistido.'],
        ['AFF Niveles 2 a 4', 'Estabilidad, señales, orientación, relajación y primeros movimientos controlados.'],
        ['AFF Niveles 5 a 8', 'Giros, recuperación, salida autónoma, control avanzado y mayor independencia.'],
        ['Campana y aterrizaje', 'Patrón de vuelo, tráfico, viento, flare, zona de aterrizaje y toma de decisiones.'],
        ['Equipo y emergencia', 'Arnés, contenedor, principal, reserva, AAD, altímetro y procedimientos de emergencia.'],
        ['Saltos de consolidación', 'Estabilidad, precisión, confianza, lectura de altura, control corporal y aterrizajes consistentes.'],
        ['Licencia A', 'Primer objetivo de autonomía básica dentro del sistema y centro correspondientes.'],
        ['Licencias B / C / D', 'Progresión avanzada por experiencia, saltos, caída libre, precisión y habilidades adicionales.']
      ],
      training: 'Curso AFF, teoría de primer salto, emergencias, control corporal, manejo de campana, aterrizaje, saltos supervisados, evaluaciones y progresión hacia licencias según centro o federación.',
      requirements: 'Edad mínima y documentación según centro, condición física adecuada, briefing, posible cuestionario o certificado médico, seguro y cumplimiento de las normas del aeródromo.',
      safety: 'Progresión en instalaciones autorizadas con profesionales habilitados. Se revisan equipo, meteorología, viento, avión, altura, altímetro, AAD, principal, reserva, zona de salto, aterrizaje y emergencias.',
      achievement: 'Una ruta clara desde el primer salto AFF hasta la progresión hacia autonomía, licencias, seguridad, control corporal y manejo de campana.',
      after: 'Acumular saltos, obtener licencias, participar en saltos con otros paracaidistas y progresar en formación, freefly, campana, precisión o funciones técnicas con requisitos adicionales.',
      licenseIntro: 'Tras completar el curso AFF y los saltos de consolidación, el paracaidista puede avanzar hacia las licencias deportivas. Cada licencia representa más experiencia, autonomía, control en caída libre, manejo de campana y acceso a formaciones avanzadas. Los requisitos exactos dependen del centro, federación y sistema de referencia.',
      licenses: [
        {
          name: 'Licencia A',
          jumps: '25 saltos orientativos',
          evaluation: 'AFF completado, consolidación, tarjeta de progresión, examen práctico, escrito y evaluación oral.',
          permits: 'Primera autonomía deportiva: permite comenzar a saltar sin supervisión directa como alumno, acumular experiencia, participar en formaciones básicas con paracaidistas con licencia y avanzar hacia la licencia B.',
          focus: 'Seguridad básica, estabilidad, conciencia de altura, apertura, manejo de campana, patrón de aterrizaje y criterio responsable.'
        },
        {
          name: 'Licencia B',
          jumps: '50 saltos · 30 minutos de caída libre orientativos',
          evaluation: 'Licencia A o equivalente, experiencia adicional, formación de campana, entrenamiento de agua, aterrizajes, formación y examen escrito.',
          permits: 'Abre más eventos y saltos organizados, progresiones técnicas y saltos nocturnos cuando se cumplan briefing, requisitos y condiciones del centro.',
          focus: 'Precisión, control bajo campana, experiencia con otros paracaidistas, planificación, meteorología y seguridad.'
        },
        {
          name: 'Licencia C',
          jumps: '200 saltos · 60 minutos de caída libre orientativos',
          evaluation: 'Licencia B o equivalente, precisión de aterrizaje, saltos de formación, control avanzado y examen escrito.',
          permits: 'Acceso a formaciones exigentes, eventos de mayor nivel y progresiones de freefly, tracking, ángulo, campana avanzada, cámara aérea y wingsuit con su formación específica.',
          focus: 'Conciencia espacial, separación, control corporal, aterrizajes y apertura hacia especialidades avanzadas.'
        },
        {
          name: 'Licencia D',
          jumps: '500 saltos · 180 minutos de caída libre orientativos',
          evaluation: 'Licencia C o equivalente, experiencia elevada, examen escrito, precisión, formaciones avanzadas y requisitos adicionales del sistema.',
          permits: 'Acceso a progresiones profesionales, ratings, demostraciones con requisitos específicos, grandes formaciones, programas avanzados y proyectos técnicos de alto nivel.',
          focus: 'Experiencia sólida, criterio avanzado, dominio general y acceso a rutas profesionales y especialidades complejas.'
        }
      ],
      advancedIntro: 'Después de completar AFF, obtener licencia y acumular experiencia, Nómada Extremo puede coordinar formaciones especiales junto a instructores, centros autorizados y colaboradores técnicos. La Ruta Pro permite seguir creciendo más allá de la licencia básica con una progresión segura y estructurada.',
      advancedModules: [
        ['Campana avanzada', 'Licencia B o progresión equivalente', '50+ saltos orientativos', 'Patrón, tráfico, flare, precisión, viento, velocidad, giros y decisiones bajo campana.', 'Coach de campana / centro autorizado'],
        ['Formación en caída libre', 'Licencia A', '25+ saltos orientativos', 'Posiciones, aproximaciones, separación, docks, salidas, coordinación y seguridad en grupo.', 'Coach de formación'],
        ['Freefly', 'Licencia B recomendada', 'Experiencia estable en formación', 'Sit-fly, head-up, head-down, transiciones, control corporal, altitud y separación.', 'Coach de freefly'],
        ['Tracking y angle flying', 'Licencia B/C según programa', 'Experiencia previa en grupo', 'Dirección, velocidad, navegación, líder, break-off, apertura y control del espacio aéreo.', 'Coach especializado'],
        ['Wingsuit First Flight Course', 'Licencia vigente y control consolidado', '200 saltos como referencia habitual', 'Ruta, salida, separación, navegación, apertura, campana y aterrizaje con wingsuit.', 'Instructor wingsuit autorizado'],
        ['Cámara aérea', 'Licencia C recomendada', '200 saltos como referencia habitual', 'Montaje, enganches, prioridades, separación, seguimiento, consentimiento y aterrizaje.', 'Cámara flyer / coach especializado'],
        ['Saltos nocturnos', 'Licencia B o superior', 'Experiencia y briefing específico', 'Referencias, iluminación, altímetro visible, comunicación, patrón y equipo nocturno.', 'Centro e instructor autorizado'],
        ['Saltos desde globo', 'Licencia y autonomía consolidada', 'Según centro y operador', 'Salida sin viento relativo inicial, altura, posición, apertura, separación y aterrizaje.', 'Operador de globo + centro de salto'],
        ['Saltos desde helicóptero', 'Licencia y autonomía consolidada', 'Según centro y aeronave', 'Briefing con piloto, embarque, salida, altura, viento, separación y coordinación.', 'Centro de salto + operador aéreo'],
        ['Demostración y precisión', 'Licencia avanzada', 'Experiencia y precisión verificadas', 'Zona, obstáculos, público, viento, permisos, coordinación y aterrizajes precisos.', 'Coach de precisión / organizador autorizado'],
        ['High Altitude / HALO introductorio', 'Licencia avanzada', 'Experiencia definida por el programa', 'Oxígeno, hipoxia, temperatura, aeronave, planificación, altura, apertura y equipo.', 'Centro especializado en gran altitud'],
        ['Introducción formativa al BASE', 'Trayectoria avanzada en paracaidismo', 'Alta experiencia y valoración del mentor', 'Diferencias con avión, material, riesgos, requisitos, preparación y derivación a especialistas.', 'Mentor o instructor BASE especializado']
      ],
      specialRequirements: 'Las especializaciones avanzadas se organizan según experiencia, licencia, requisitos del centro, meteorología, permisos, disponibilidad de instructores y criterio técnico. Cada disciplina tiene una progresión propia, por eso se plantean como rutas avanzadas coordinadas con profesionales y centros autorizados.',
      tags: ['AFF', 'Caída libre', 'Campana', 'Licencia A', 'Licencia B', 'Licencia C', 'Licencia D', 'Autonomía']
    },
    {
      id: 'escalada',
      tone: '#8b674d',
      title: 'Escalada',
      category: 'Ruta roca',
      count: '7 módulos',
      start: 'Iniciación en roca',
      goal: 'Autonomía técnica progresiva',
      reference: 'Técnico Deportivo en Escalada, escuela de escalada y protocolos de seguridad en cuerda.',
      responsible: 'Guía de montaña y vertical',
      modules: [
        ['Iniciación', 'Material, comunicación, colocación corporal, técnica de pies, agarres y confianza inicial.'],
        ['Nudos y equipo', 'Arnés, casco, cuerda, asegurador, mosquetones, cintas, ocho, anclaje, reuniones y chequeo cruzado.'],
        ['Aseguramiento', 'Dar y recoger cuerda, bloquear, descender, comunicar y actuar con calma.'],
        ['Técnica de escalada', 'Equilibrio, pies, adherencia, oposición, lectura, economía de fuerza y gestión del miedo.'],
        ['Escalada deportiva', 'Vías equipadas, chapaje, primero, caídas controladas, descuelgue y limpieza.'],
        ['Clásica y varios largos', 'Reuniones, largos, material flotante, comunicación, cuerda y lectura de vía.'],
        ['Autorrescate', 'Bloqueo, descenso asistido, incidencias, comunicación, evacuación y criterio de retirada.']
      ],
      training: 'Iniciación a la escalada, seguridad en roca, nudos, aseguramiento, técnica gestual, deportiva, introducción a clásica o varios largos y autorrescate básico.',
      requirements: 'Condición física básica, tolerancia a la altura, ausencia de lesiones incompatibles, capacidad para seguir instrucciones, casco obligatorio y respeto al guía.',
      safety: 'Chequeo cruzado y revisión de arnés, casco, cuerda, nudos, asegurador, mosquetones, reunión, estado de la vía, meteorología, roca y caída potencial.',
      achievement: 'Progresar desde la primera experiencia en roca hasta una base de seguridad, movimiento, aseguramiento y autonomía supervisada.',
      after: 'Practicar deportiva con más criterio, mejorar técnica y avanzar hacia varios largos, ferratas, rápel o autorrescate más completo.',
      tags: ['Iniciación', 'Deportiva', 'Cuerdas', 'Clásica', 'Varios largos', 'Autorrescate', 'Técnica']
    },
    {
      id: 'waterman',
      tone: '#287b86',
      title: 'Foil / Waterman',
      category: 'Ruta waterman',
      count: '7 módulos',
      start: 'SUP base y control corporal',
      goal: 'Autonomía en foil y lectura del mar',
      reference: 'Escuela náutica, instructor especializado y protocolos de seguridad por modalidad.',
      responsible: 'Instructor/a de foil y waterman',
      modules: [
        ['SUP base', 'Equilibrio, remada, posición, caídas, giros, control de tabla y lectura del agua.'],
        ['Seguridad en el agua', 'Leash, chaleco, casco, zonas, tráfico, viento, corriente, rescate y comunicación.'],
        ['E-foil', 'Batería, mando, velocidad, despegue del foil, caídas seguras y distancia.'],
        ['Wingfoil', 'Wing, viento, equilibrio, potencia, primeros vuelos y virajes básicos.'],
        ['Kitesurf / Windsurf base', 'Ventana de viento, tracción, potencia, dirección, equilibrio y control progresivo.'],
        ['Virajes y control avanzado', 'Dirección, estabilidad, postura, velocidad, ola, choppy y recuperación.'],
        ['Waterman 3 días', 'Programa combinado de SUP, foil, viento, rescate, lectura del mar y autonomía.']
      ],
      training: 'Iniciación a SUP, seguridad acuática, e-foil, wingfoil, kitesurf o windsurf base, lectura del viento, rescate básico y progresión waterman.',
      requirements: 'Saber nadar, buena movilidad, condición física adecuada, respeto al mar, capacidad para seguir instrucciones y comodidad con caídas repetidas.',
      safety: 'Casco, chaleco, leash, zona controlada, profundidad, distancia, batería, viento, oleaje, tráfico, comunicación y apoyo desde costa o embarcación cuando proceda.',
      achievement: 'Una base de waterman: equilibrio, control de tabla, lectura del mar, seguridad acuática, viento y progresión hacia foil.',
      after: 'Practicar SUP con más autonomía y avanzar hacia e-foil, wingfoil, kitesurf, windsurf, SUP foil o programas intensivos.',
      tags: ['E-foil', 'Wingfoil', 'SUP', 'Kitesurf', 'Windsurf', 'Waterman', 'Seguridad acuática']
    },
    {
      id: 'litoral',
      tone: '#3a83a3',
      title: 'Mar, Kitesurf y Windsurf',
      category: 'Ruta litoral',
      count: '7 módulos',
      start: 'Kayak / SUP litoral',
      goal: 'Autonomía básica costera',
      reference: 'Escuela náutica, guía de mar, instructor de viento y protocolos de rescate acuático.',
      responsible: 'Guía de mar y costa + Instructor/a de foil y waterman según actividad',
      modules: [
        ['Kayak / SUP litoral', 'Remada, postura, equilibrio, embarque, desembarque, ruta costera y seguridad.'],
        ['Lectura de costa', 'Viento, oleaje, corrientes, rocas, accesos, escapes y cambios de condiciones.'],
        ['Snorkel seguro', 'Equipo, respiración, flotabilidad, entrada, salida, observación y respeto marino.'],
        ['Coasteering', 'Progresión costera, trepadas, entradas al agua, saltos controlados y retirada segura.'],
        ['Kitesurf iniciación', 'Ventana de viento, seguridad de cometa, tracción, bodydrag y progresión inicial.'],
        ['Windsurf iniciación', 'Vela, tabla, dirección, equilibrio, virajes básicos y control.'],
        ['Clinic privado', 'Sesión personalizada de técnica, seguridad, autonomía y corrección según nivel.']
      ],
      training: 'Iniciación a kayak o SUP, seguridad litoral, snorkel, coasteering, kitesurf, windsurf, lectura de costa y rescate básico acuático.',
      requirements: 'Saber nadar, condición física básica, comodidad en el agua, respeto al mar, adaptación al grupo y aceptación del briefing.',
      safety: 'Análisis de viento, mar, corrientes, oleaje, accesos, temperatura, visibilidad, tráfico, flotación, comunicación, ruta alternativa y salida.',
      achievement: 'Una progresión litoral completa para moverse en el mar, interpretar la costa y ganar seguridad en entornos cambiantes.',
      after: 'Realizar rutas con más confianza y avanzar hacia kayak de mar, SUP, snorkel, coasteering, kitesurf, windsurf o perfeccionamiento privado.',
      tags: ['Kayak', 'SUP', 'Kitesurf', 'Windsurf', 'Snorkel', 'Coasteering', 'Clinic privado']
    },
    {
      id: 'buceo',
      tone: '#24628a',
      title: 'Buceo',
      category: 'Ruta subacuática',
      count: '7 niveles principales',
      start: 'Bautismo',
      goal: 'Progresión recreativa, profesional o técnica',
      reference: 'SSI / centro de buceo autorizado.',
      responsible: 'Instructor/a de buceo',
      modules: [
        ['Bautismo', 'Primera experiencia: equipo, respiración, señales, flotabilidad inicial y seguridad.'],
        ['Open Water', 'Base de autonomía recreativa con teoría, habilidades confinadas e inmersiones en mar.'],
        ['SSI Advanced Adventurer', 'Mejora mediante inmersiones de aventura, profunda, navegación y especialidades.'],
        ['SSI Diver Stress & Rescue', 'Prevención, detección de estrés, asistencia y respuesta ante problemas.'],
        ['Divemaster', 'Primer nivel profesional para asistir, organizar, controlar grupos y guiar certificados.'],
        ['Instructor', 'Nivel profesional para enseñar, evaluar y certificar según estándares.'],
        ['Técnico', 'Especialización avanzada con planificación, gases, redundancia y centros especializados.']
      ],
      training: 'Bautismo, Open Water, Advanced, especialidades recreativas, Rescue, Divemaster, Instructor y formación técnica según certificadora y centro.',
      requirements: 'Saber nadar, salud compatible, cuestionario médico, comodidad en el agua, edad mínima según curso y cumplimiento de estándares.',
      safety: 'Briefing y revisión de botella, regulador, jacket, lastre, máscara, aletas, ordenador, presión, consumo, pareja, profundidad, corrientes, temperatura, oxígeno y emergencia.',
      achievement: 'Una ruta desde la primera experiencia hasta niveles recreativos avanzados, prevención de emergencias, liderazgo profesional o especialización técnica.',
      after: 'Pasar de Bautismo a Open Water, avanzar a Advanced y especialidades, mejorar seguridad con Rescue y acceder a vía profesional o técnica con requisitos específicos.',
      extrasTitle: 'Advanced y especialidades asociadas',
      extras: [
        ['Deep / Profunda', 'Planificación y control de inmersiones a mayor profundidad recreativa.'],
        ['Navegación', 'Brújula, referencias naturales y control de rumbo bajo el agua.'],
        ['Nocturna · Night & Limited Visibility', 'Poca luz, linterna, comunicación y control del grupo.'],
        ['Foto y vídeo', 'Fotografía y vídeo subacuático, control de flotabilidad y respeto del fondo.'],
        ['Nitrox', 'Mezclas enriquecidas, planificación y límites de exposición.'],
        ['Flotabilidad', 'Control, consumo, posición y respeto del fondo.'],
        ['Búsqueda y recuperación', 'Patrones, cabos, boyas y recuperación de objetos.'],
        ['Pecios', 'Introducción recreativa y segura a estructuras hundidas.']
      ],
      tags: ['Bautismo', 'Open Water', 'Advanced', 'Deep', 'Navegación', 'Nitrox', 'Rescue', 'Divemaster', 'Instructor', 'Técnico']
    },
    {
      id: 'tierra',
      tone: '#57754d',
      title: 'Montaña, Barrancos y BTT',
      category: 'Ruta tierra',
      count: '7 módulos',
      start: 'Senderismo técnico',
      goal: 'Autonomía outdoor y progresión multiaventura',
      reference: 'Técnicos deportivos, guías especializados y protocolos de montaña, barrancos, BTT y orientación.',
      responsible: 'Puestos de montaña, barrancos, BTT y orientación según actividad',
      modules: [
        ['Senderismo técnico', 'Ruta, ritmo, desnivel, material, hidratación, orientación y seguridad.'],
        ['Crestas y terreno expuesto', 'Aristas, pasos aéreos, equilibrio, cuerda de apoyo, vértigo y comunicación.'],
        ['Bushcraft y orientación', 'Mapa, brújula, GPS, refugio, agua, meteorología, vivac y autonomía.'],
        ['Barrancos', 'Caudal, rápeles, saltos, toboganes, escapes, neopreno, cuerda y progresión.'],
        ['Rafting / aguas bravas', 'Hidrología, corriente, embarcación, remada, equipo y rescate.'],
        ['BTT técnico', 'Posición, frenada, curvas, pendientes, trazada, mecánica y conducción.'],
        ['Supervivencia y emergencia', 'Botiquín, comunicación, hipotermia, calor, escapes y protocolo de rescate.']
      ],
      training: 'Senderismo técnico, orientación, bushcraft, supervivencia, barrancos, rafting, aguas bravas, BTT técnico, primeros auxilios y emergencias outdoor.',
      requirements: 'Condición física acorde, ropa y calzado adecuados, capacidad para seguir instrucciones, tolerancia a terreno irregular y respeto ambiental.',
      safety: 'Plan de ruta, meteorología, escapes, material obligatorio, revisión de cuerda o bicicleta, botiquín, comunicación, ratios, caudal y cancelación si las condiciones no son seguras.',
      achievement: 'Una base completa para moverse con más seguridad en montaña, barrancos, rutas BTT, ríos y actividades de autonomía.',
      after: 'Realizar rutas más técnicas, progresar en barrancos o BTT, aprender orientación, participar en vivacs controlados y ganar autonomía en el medio natural.',
      tags: ['Senderismo técnico', 'Crestas', 'Bushcraft', 'Barrancos', 'Rafting', 'BTT técnico', 'Supervivencia']
    }
  ];

  const overviewRoutes = [
    {
      number: '01', title: 'Buceo', subtitle: 'SSI', icon: 'BU', target: 'buceo', responsible: 'Instructor/a de buceo',
      items: [
        ['Bautismo de buceo', 'Primera experiencia subacuática, equipo básico, respiración y señales.', 'Experiencia'],
        ['Open Water / OWD', 'Curso base para iniciarse como buceador certificado.', 'Certificación inicial'],
        ['SSI Advanced Adventurer', 'Progresión con inmersiones de aventura y especialidades elegidas con el centro.', 'Progresión recreativa'],
        ['SSI Diver Stress & Rescue', 'Prevención, asistencia, estrés, emergencias y seguridad de grupo.', 'Seguridad avanzada'],
        ['Divemaster / Dive Guide', 'Primer nivel profesional, guía de buceadores y apoyo a instructores.', 'Profesional'],
        ['Instructor', 'Formación para enseñar y certificar según la organización autorizada.', 'Profesional avanzado'],
        ['Buceo técnico', 'Planificación avanzada, gases, redundancia, procedimientos y equipo específico.', 'Especialización']
      ],
      note: 'Especialidades posibles: Nitrox, Nocturno, Profunda, Navegación, Flotabilidad, Pecios, Search & Recovery y Fotografía subacuática.'
    },
    {
      number: '02', title: 'Aire', subtitle: 'Paracaidismo · Parapente · Paramotor', icon: 'AI', target: 'aff', responsible: 'Instructor/a de vuelo y paracaidismo y centros autorizados',
      items: [
        ['Paracaidismo tándem', 'Salto desde avión con instructor y experiencia directa de caída libre.', 'Experiencia'],
        ['AFF PARACAIDISMO', 'Ocho niveles con teoría, emergencias, caída libre, campana y consolidación.', 'Formación'],
        ['Licencia A', 'Primera autonomía deportiva con 25 saltos orientativos y evaluación completa.', 'Licencia inicial'],
        ['Licencias B / C / D', 'Más experiencia, precisión, control de campana y acceso a formación avanzada.', 'Progresión deportiva'],
        ['Programa avanzado', 'Campana, freefly, tracking, wingsuit, cámara, nocturnos y otras especialidades.', 'Especialización'],
        ['Parapente biplaza', 'Primer contacto con el viento, la térmica y el vuelo libre.', 'Experiencia'],
        ['Parapente iniciación', 'Control de campa, meteorología, seguridad, despegue y aterrizaje.', 'Formación'],
        ['Paramotor / Paratrike', 'Vuelo motorizado, navegación, revisión de equipo y emergencias.', 'Formación / experiencia']
      ],
      note: 'Progresión vinculada a centros autorizados, instructores habilitados, meteorología, normativa aérea y requisitos propios de cada modalidad.'
    },
    {
      number: '03', title: 'Montaña y vertical', subtitle: 'Escalada · Ferratas · Rápel · Cuerda', icon: 'MV', target: 'escalada', responsible: 'Guía de montaña y vertical y Técnico/a de saltos pendulares, rope jumping y puenting según actividad',
      items: [
        ['Escalada iniciación', 'Técnica básica, pies, agarres, nudos, aseguramiento y comunicación.', 'Formación inicial'],
        ['Escalada deportiva', 'Chapaje, caída controlada, descuelgue, limpieza de vía y progresión.', 'Formación técnica'],
        ['Varios largos', 'Reuniones, gestión de cuerda, comunicación y progresión en pared.', 'Formación avanzada'],
        ['Ferratas y rápel', 'Disipador, línea de vida, descenso por cuerda y seguridad vertical.', 'Experiencia / formación'],
        ['Autorrescate', 'Bloqueos, descensos asistidos, incidencias en pared y criterio de retirada.', 'Seguridad avanzada'],
        ['Rope jumping / puenting', 'Saltos pendulares, doble chequeo y sistemas coordinados por especialistas.', 'Experiencia técnica']
      ],
      note: 'La dificultad, el ratio y el material se adaptan al terreno, la exposición y la experiencia real del grupo.'
    },
    {
      number: '04', title: 'Mar y waterman', subtitle: 'Kayak · SUP · Snorkel · Coasteering · Foil', icon: 'MW', target: 'litoral', responsible: 'Guía de mar y costa y Instructor/a de foil y waterman según modalidad',
      items: [
        ['Kayak / SUP litoral', 'Remada, equilibrio, ruta costera, embarque y seguridad.', 'Experiencia / formación'],
        ['Snorkel seguro', 'Equipo, respiración, flotabilidad, observación marina y respeto ambiental.', 'Experiencia'],
        ['Coasteering', 'Progresión costera, trepadas, entradas al agua y retirada segura.', 'Experiencia técnica'],
        ['Kitesurf iniciación', 'Ventana de viento, cometa, tracción, bodydrag y control básico.', 'Formación'],
        ['Windsurf iniciación', 'Vela, tabla, equilibrio, dirección y navegación básica.', 'Formación'],
        ['E-foil', 'Tabla eléctrica, batería, mando, velocidad y progresión segura.', 'Experiencia premium'],
        ['Wingfoil / SUP foil', 'Wing, viento, equilibrio, foil, virajes y lectura de mar.', 'Formación avanzada'],
        ['Waterman 3 días', 'Programa intensivo de SUP, foil, viento, rescate y autonomía progresiva.', 'Programa intensivo']
      ],
      note: 'La selección de modalidad depende del viento, el estado del mar, la zona de práctica y la disponibilidad del equipo técnico.'
    },
    {
      number: '05', title: 'Barrancos, río y BTT', subtitle: 'Barranquismo · Rafting · Aguas bravas · Bicicleta', icon: 'RB', target: 'tierra', responsible: 'Guía de barrancos, rafting y BTT',
      items: [
        ['Barranco seco', 'Rápeles, destrepes, cuerda, escapes y progresión sin caudal.', 'Experiencia / formación'],
        ['Barranco acuático', 'Neopreno, caudal, saltos, toboganes, rápeles y comunicación.', 'Experiencia técnica'],
        ['Rafting / aguas bravas', 'Remada, lectura de corriente, embarcación, equipo y rescate básico.', 'Experiencia / formación'],
        ['Hidrología aplicada', 'Corrientes, rebufos, caudal, obstáculos, escapes y decisiones.', 'Seguridad técnica'],
        ['BTT técnico', 'Frenada, curvas, pendientes, trazada, mecánica y conducción natural.', 'Formación'],
        ['Ruta BTT aventura', 'Planificación, orientación, desnivel, autonomía y seguridad en ruta.', 'Experiencia']
      ],
      note: 'Caudal, meteorología, terreno, escapes y nivel técnico determinan la viabilidad y el formato final de cada sesión.'
    },
    {
      number: '06', title: 'Bushcraft, naturaleza y audiovisual', subtitle: 'Orientación · Vivac · Dron · FPV · 360', icon: 'NA', target: 'tierra', responsible: 'Instructor/a de bushcraft, orientación y supervivencia y Coordinador/a audiovisual y piloto de dron según área',
      items: [
        ['Técnicas de montaña', 'Orientación, meteorología, material, primeros auxilios y ruta.', 'Formación base'],
        ['Bushcraft y supervivencia', 'Refugio, agua, fuego permitido, nudos, vivac y autonomía.', 'Formación outdoor'],
        ['Orientación mapa / brújula / GPS', 'Rumbo, referencias, track, navegación y rutas seguras.', 'Formación técnica'],
        ['Vivac y pernocta', 'Material, abrigo, normativa, impacto mínimo y gestión nocturna.', 'Experiencia formativa'],
        ['Dron outdoor', 'Planificación, normativa, zonas restringidas y grabación segura.', 'Formación audiovisual'],
        ['FPV / cámara 360', 'Grabación inmersiva, seguimiento, seguridad, edición y contenido vertical.', 'Producción audiovisual']
      ],
      note: 'Las prácticas audiovisuales se subordinan siempre a la seguridad, los permisos, la privacidad y la protección del medio natural.'
    }
  ];

  const commonModules = [
    {
      icon: 'MC', title: 'Meteorología y condiciones', type: 'Seguridad',
      description: 'Lectura de partes, viento, nubes, oleaje, térmicas, temperatura, tormentas y fenómenos locales de costa, montaña y aire.',
      application: 'Ayuda a decidir si una actividad puede hacerse, debe adaptarse o debe aplazarse. Es clave en vuelo, costa, barrancos, montaña, buceo y operaciones con dron.',
      detail: 'Se trabaja la interpretación de previsiones, dirección e intensidad del viento, rachas, cambios de presión, brisas térmicas, oleaje, visibilidad, tormentas, temperatura del agua, sensación térmica y señales naturales del entorno.'
    },
    {
      icon: 'ON', title: 'Orientación y navegación', type: 'Técnica',
      description: 'Mapa, brújula, GPS, altímetro, referencias del terreno, tracks, puntos de escape y lectura de ruta.',
      application: 'Permite moverse con más criterio en montaña, costa, BTT, barrancos, bushcraft, vivac, rutas largas y zonas con poca cobertura.',
      detail: 'Se trabaja lectura de mapa, curvas de nivel, rumbo, coordenadas, referencias visuales, navegación con GPS, planificación de track, regreso seguro, puntos de agua, accesos, salidas alternativas y gestión de pérdida de orientación.'
    },
    {
      icon: 'PA', title: 'Primeros auxilios y respuesta inicial', type: 'Emergencia',
      description: 'RCP básica, valoración inicial, hemorragias, golpes, hipotermia, calor, esguinces, heridas, mareos y activación de emergencias.',
      application: 'Base imprescindible para cualquier actividad outdoor, especialmente cuando la ayuda puede tardar en llegar.',
      detail: 'Se trabaja prevención, evaluación de escena, protección del grupo, aviso a emergencias, botiquín, control de sangrados, inmovilización básica y gestión inicial de caídas, cortes, agotamiento, hipotermia, calor, mareo o ansiedad.'
    },
    {
      icon: 'GR', title: 'Gestión del riesgo', type: 'Seguridad',
      description: 'Identificar peligros, valorar consecuencias y decidir cuándo avanzar, adaptar la actividad o retirarse.',
      application: 'Es la base del criterio profesional: no todo lo que se puede hacer debe hacerse. La seguridad depende de leer el margen real de cada situación.',
      detail: 'Se trabaja evaluación de riesgo, margen de seguridad, factores humanos, presión del grupo, exceso de confianza, fatiga, meteorología cambiante, material, terreno, agua, altura, visibilidad y toma de decisiones conservadora.'
    },
    {
      icon: 'CP', title: 'Comunicación y protocolos', type: 'Base',
      description: 'Briefing, señales visuales, radios, intercomunicadores, comunicación en emergencia y coordinación del grupo.',
      application: 'La comunicación clara reduce errores antes, durante y después de la experiencia y confirma que el grupo comprende las instrucciones.',
      detail: 'Se trabajan señales de buceo y pared, órdenes en rafting, comunicación en vuelo, radios, códigos simples, briefing previo, confirmación de instrucciones, comunicación guía-participante y protocolo ante separación o incidente.'
    },
    {
      icon: 'MI', title: 'Medio natural y mínimo impacto', type: 'Medio natural',
      description: 'Respeto a fauna, flora, fondos marinos, cuevas, acantilados, ríos, senderos y espacios protegidos.',
      application: 'Nómada Extremo busca aventura sin destruir el entorno. La actividad debe adaptarse al medio, no al revés.',
      detail: 'Se trabaja no dejar residuos, no molestar fauna, no dañar flora, no tocar formaciones en cuevas, no pisar fondos sensibles, respetar nidificación, reducir ruidos, cumplir normativa local y utilizar accesos adecuados.'
    },
    {
      icon: 'MM', title: 'Material, checklists y mantenimiento', type: 'Técnica',
      description: 'Revisión de equipo, vida útil, homologaciones, limpieza, almacenamiento y checklist antes de actividad.',
      application: 'El material técnico no solo se compra: se revisa, se mantiene, se registra y se retira cuando corresponde.',
      detail: 'Se trabaja revisión de arneses, cascos, cuerdas, mosquetones, neoprenos, chalecos, botellas, reguladores, velas, radios, baterías, drones, tablas, bicicletas, botiquines y material de emergencia, junto con checklists e inventario.'
    },
    {
      icon: 'LP', title: 'Planificación, logística y permisos', type: 'Logística',
      description: 'Reservas, horarios, accesos, transporte, permisos, seguros, documentación, ratios y coordinación técnica.',
      application: 'Una actividad profesional empieza mucho antes de llegar al lugar. La logística evita improvisaciones y mejora la experiencia del grupo.',
      detail: 'Se trabaja punto de encuentro, material, transporte, permisos de acceso, seguros en una versión operativa, centros autorizados, documentación del participante, ratios, condiciones de cancelación y planes alternativos.'
    },
    {
      icon: 'FP', title: 'Condición física, hidratación y prevención', type: 'Base',
      description: 'Preparación básica, fatiga, hidratación, alimentación, sueño, movilidad, calor, frío y prevención de lesiones.',
      application: 'El nivel físico condiciona la seguridad. Cada ruta exige honestidad sobre el estado real de la persona y adaptación del ritmo.',
      detail: 'Se trabaja esfuerzo percibido, calentamiento, movilidad, gestión de fatiga, hidratación, alimentación previa, ropa adecuada, protección solar, frío, calor, calambres, mareos, lesiones previas y progresión responsable.'
    },
    {
      icon: 'LG', title: 'Briefing, liderazgo y gestión de grupo', type: 'Base',
      description: 'Normas claras, roles, ritmo, control del grupo, toma de decisiones y comportamiento responsable.',
      application: 'En aventura también importa cómo se comporta el grupo. El orden, el apoyo mutuo y el respeto protegen a todas las personas.',
      detail: 'Se trabaja briefing inicial, expectativas, normas, roles, puntualidad, ritmo, señales de cansancio, gestión del miedo, convivencia, conducta en espacios naturales, apoyo entre participantes y respuesta ante comportamientos inseguros.'
    }
  ];

  const escapeHTML = (value) => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const renderTags = (tags, className) => `<div class="${className}">${tags.map((tag) => `<span>${escapeHTML(tag)}</span>`).join('')}</div>`;

  const interfaceGlyphs = {"BU":"<svg class=\"interface-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><rect x=\"2\" y=\"8\" width=\"16\" height=\"9\" rx=\"4\"/><path d=\"m6 12 4-2 4 2M21 3v14a4 4 0 0 1-8 0\"/></svg>","AI":"<svg class=\"interface-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M2 10a10 10 0 0 1 20 0H2Zm0 0 8 10m12-10-8 10M12 1c-4 3-5 6-5 9m5-9c4 3 5 6 5 9\"/><rect x=\"10\" y=\"20\" width=\"4\" height=\"3\" rx=\"1\"/></svg>","MV":"<svg class=\"interface-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"m2 21 7-14 4 7 3-11 6 18H2Zm4-8 3 2 3-3m2-2 2 2 2-2\"/></svg>","MW":"<svg class=\"interface-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M2 9c3-4 5-4 8 0s5 4 8 0 3-2 4-2M2 15c3-4 5-4 8 0s5 4 8 0 3-2 4-2M2 21c3-4 5-4 8 0s5 4 8 0 3-2 4-2\"/></svg>","RB":"<svg class=\"interface-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><circle cx=\"5\" cy=\"17\" r=\"4\"/><circle cx=\"19\" cy=\"17\" r=\"4\"/><path d=\"m5 17 5-10 5 10H5l8-10h5m-9-3h4m5 0h2l2 4\"/></svg>","NA":"<svg class=\"interface-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M20 3C8 3 3 8 5 18c10 2 15-3 15-15ZM3 21 16 8M8 16v-5m0 5h5\"/></svg>","MC":"<svg class=\"interface-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M7 17a5 5 0 1 1 1-10 6 6 0 0 1 11 3 4 4 0 0 1 0 8M7 21l1-2m4 2 1-2m4 2 1-2\"/></svg>","ON":"<svg class=\"interface-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"m16 8-2 6-6 2 2-6 6-2ZM12 1v2m0 18v2M1 12h2m18 0h2\"/></svg>","PA":"<svg class=\"interface-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><rect x=\"3\" y=\"5\" width=\"18\" height=\"16\" rx=\"3\"/><path d=\"M8 5V2h8v3m-4 5v7m-3-3h6\"/></svg>","GR":"<svg class=\"interface-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Zm-4 10 3 3 5-6\"/></svg>","CP":"<svg class=\"interface-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><rect x=\"6\" y=\"7\" width=\"12\" height=\"15\" rx=\"3\"/><path d=\"M9 7V2m0 10h6m-6 4h3m9-13 2 3M3 3 1 6\"/></svg>","MI":"<svg class=\"interface-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M20 3C8 3 3 8 5 18c10 2 15-3 15-15ZM3 21 16 8M8 16v-5m0 5h5\"/></svg>","MM":"<svg class=\"interface-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"m15 3 3 3-5 5m-7 3-4 4 4 4 4-4m0-6 7 7 4-4-7-7M3 3l4 1 2 3-2 2-3-2-1-4Z\"/></svg>","LP":"<svg class=\"interface-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><rect x=\"4\" y=\"4\" width=\"16\" height=\"18\" rx=\"2\"/><path d=\"M8 2v5m8-5v5M4 10h16m-12 5 2 2 5-4\"/></svg>","FP":"<svg class=\"interface-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M20 5c-4-3-8 2-8 2S8 2 4 5c-6 5 8 16 8 16S26 10 20 5ZM3 12h5l2-4 3 8 2-4h6\"/></svg>","LG":"<svg class=\"interface-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><circle cx=\"12\" cy=\"7\" r=\"3\"/><circle cx=\"4\" cy=\"10\" r=\"2\"/><circle cx=\"20\" cy=\"10\" r=\"2\"/><path d=\"M7 21v-3a5 5 0 0 1 10 0v3M1 20v-3a3 3 0 0 1 4-3m18 6v-3a3 3 0 0 0-4-3\"/></svg>","CAMERA":"<svg class=\"interface-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><rect x=\"2\" y=\"6\" width=\"20\" height=\"15\" rx=\"3\"/><circle cx=\"13\" cy=\"13\" r=\"4\"/><path d=\"M6 6V3h6v3M5 10h1\"/></svg>","MOON":"<svg class=\"interface-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M20 15A9 9 0 0 1 9 3a9 9 0 1 0 11 12Z\"/><path d=\"m18 2 1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2Z\"/></svg>","BOOK":"<svg class=\"interface-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M12 5C8 2 4 2 2 3v17c4-1 7 0 10 2 3-2 6-3 10-2V3c-4-1-7 0-10 2v17\"/></svg>"};
  const overviewContainer = document.querySelector('#schoolOverviewGrid');
  if (overviewContainer) {
    overviewContainer.innerHTML = overviewRoutes.map((group) => `
      <article class="school-overview-card reveal">
        <header class="school-overview-card__head">
          <span class="school-overview-card__number">${group.number}</span>
          <span class="school-overview-card__icon" aria-hidden="true">${interfaceGlyphs[group.icon]}</span>
          <div>
            <h3>${escapeHTML(group.title)}</h3>
            <p>${escapeHTML(group.subtitle)}</p>
          </div>
        </header>
        <div class="school-overview-card__routes">${group.items.map((item) => `
          <div class="school-overview-route">
            <div><h4>${escapeHTML(item[0])}</h4><span>${escapeHTML(item[2])}</span></div>
            <p>${escapeHTML(item[1])}</p>
          </div>`).join('')}</div>
        <footer class="school-overview-card__footer">
          <p>${escapeHTML(group.note)}</p>
          <span><strong>Responsable técnico:</strong> ${escapeHTML(group.responsible)}</span>
          <a href="#route-${group.target}" class="school-overview-card__link">Ver ruta completa</a>
        </footer>
      </article>`).join('');
  }

  const commonTrainingContainer = document.querySelector('#commonTrainingGrid');
  if (commonTrainingContainer) {
    commonTrainingContainer.innerHTML = commonModules.map((module, index) => `
      <article class="common-training-card reveal">
        <header class="common-training-card__head">
          <span class="common-training-card__icon" aria-hidden="true">${interfaceGlyphs[module.icon]}</span>
          <span class="common-training-card__number">${String(index + 1).padStart(2, '0')}</span>
          <div>
            <span class="common-training-card__badge" data-type="${escapeHTML(module.type.toLowerCase())}">${escapeHTML(module.type)}</span>
            <h3>${escapeHTML(module.title)}</h3>
          </div>
        </header>
        <div class="common-training-card__body">
          <p>${escapeHTML(module.description)}</p>
          <div class="common-training-card__application"><strong>Aplicación real</strong><span>${escapeHTML(module.application)}</span></div>
          <details class="common-training-card__detail">
            <summary>Ver detalle</summary>
            <p>${escapeHTML(module.detail)}</p>
          </details>
        </div>
      </article>`).join('');
  }

  container.innerHTML = routes.map((route) => `
    <article class="route-card" id="route-${route.id}" style="--route-accent:${route.tone};--route-soft:#efd5b2;">
      <header class="route-card__head">
        <span class="route-card__category">${escapeHTML(route.category)}</span>
        <h3>${escapeHTML(route.title)}</h3>
        <span class="route-card__count">${escapeHTML(route.count)}</span>
      </header>
      <div class="route-card__body">
        <div class="route-card__meta">
          <div><strong>Inicio</strong><span>${escapeHTML(route.start)}</span></div>
          <div><strong>Meta</strong><span>${escapeHTML(route.goal)}</span></div>
        </div>
        <div class="route-card__reference"><strong>Referencia técnica</strong><span>${escapeHTML(route.reference)}</span></div>
        <div class="route-card__responsible"><strong>Responsable técnico</strong><span>${escapeHTML(route.responsible)}</span></div>
        ${route.price ? `<div class="route-card__price"><strong>Inversión orientativa</strong><span>${escapeHTML(route.price)}</span></div>` : ''}
        <div>
          <span class="route-card__modules-title">Módulos principales</span>
          <ol class="route-card__modules">${route.modules.map((module, index) => `<li><b>${String(index + 1).padStart(2, '0')}</b>${escapeHTML(module[0])}</li>`).join('')}</ol>
        </div>
        ${renderTags(route.tags.slice(0, 5), 'route-card__tags')}
        <button class="route-card__button" type="button" data-route-id="${route.id}" aria-haspopup="dialog">Ver ruta completa</button>
      </div>
    </article>`).join('');

  if (typeof HTMLDialogElement === 'undefined') return;

  const dialog = document.createElement('dialog');
  dialog.className = 'route-dialog';
  dialog.setAttribute('aria-labelledby', 'route-dialog-title');
  dialog.innerHTML = `
    <div class="route-dialog__panel">
      <button class="route-dialog__close" type="button" aria-label="Cerrar ruta formativa">×</button>
      <header class="route-dialog__header">
        <span class="route-dialog__kicker"></span>
        <h2 id="route-dialog-title"></h2>
        <p class="route-dialog__summary"></p>
      </header>
      <div class="route-dialog__body"></div>
    </div>`;
  document.body.append(dialog);

  const dialogKicker = dialog.querySelector('.route-dialog__kicker');
  const dialogTitle = dialog.querySelector('#route-dialog-title');
  const dialogSummary = dialog.querySelector('.route-dialog__summary');
  const dialogBody = dialog.querySelector('.route-dialog__body');
  const closeButton = dialog.querySelector('.route-dialog__close');
  let lastTrigger = null;

  function renderLicenseProgram(route) {
    if (!Array.isArray(route.licenses) || !route.licenses.length) return '';

    return `
      <section class="route-dialog__licenses">
        <div class="route-dialog__section-heading">
          <span>Progresión deportiva</span>
          <h3>Licencias de paracaidismo y progresión deportiva</h3>
          <p>${escapeHTML(route.licenseIntro)}</p>
        </div>
        <div class="route-license-grid">${route.licenses.map((license) => `
          <details class="route-accordion route-license">
            <summary><strong>${escapeHTML(license.name)}</strong><span>${escapeHTML(license.jumps)}</span></summary>
            <div class="route-accordion__content">
              <div><h4>Evaluación habitual</h4><p>${escapeHTML(license.evaluation)}</p></div>
              <div><h4>Qué permite</h4><p>${escapeHTML(license.permits)}</p></div>
              <div><h4>Enfoque de la etapa</h4><p>${escapeHTML(license.focus)}</p></div>
            </div>
          </details>`).join('')}</div>
      </section>`;
  }

  function renderAdvancedProgram(route) {
    if (!Array.isArray(route.advancedModules) || !route.advancedModules.length) return '';

    return `
      <section class="route-pro-program">
        <div class="route-pro-program__head">
          <span>Ruta Pro</span>
          <h3>Programa Avanzado de Especializaciones en Paracaidismo</h3>
          <p>${escapeHTML(route.advancedIntro)}</p>
        </div>
        <div class="route-pro-grid">${route.advancedModules.map((module) => `
          <details class="route-accordion route-pro-module">
            <summary><strong>${escapeHTML(module[0])}</strong><span>${escapeHTML(module[1])}</span></summary>
            <div class="route-accordion__content">
              <div><h4>Experiencia orientativa</h4><p>${escapeHTML(module[2])}</p></div>
              <div><h4>Qué se trabaja</h4><p>${escapeHTML(module[3])}</p></div>
              <div><h4>Responsable</h4><p>${escapeHTML(module[4])}</p></div>
            </div>
          </details>`).join('')}</div>
        ${renderTags(['Campana avanzada', 'Formación', 'Freefly', 'Tracking', 'Angle', 'Wingsuit', 'Cámara', 'Nocturno', 'Globo', 'Helicóptero', 'Precisión', 'HALO', 'BASE intro'], 'route-dialog__tags route-dialog__tags--pro')}
        <div class="route-special-requirements"><h4>Formaciones especiales con requisitos propios</h4><p>${escapeHTML(route.specialRequirements)}</p></div>
      </section>`;
  }

  function renderAccordion(title, content, className = '') {
    return `<details class="route-accordion route-info-accordion ${className}"><summary><strong>${escapeHTML(title)}</strong></summary><div class="route-accordion__content"><p>${escapeHTML(content)}</p></div></details>`;
  }

  function renderRouteDetail(route) {
    const extras = Array.isArray(route.extras) && route.extras.length ? `
      <section class="route-dialog__extra">
        <h3>${escapeHTML(route.extrasTitle)}</h3>
        <div class="route-dialog__extra-grid">${route.extras.map((item) => `<div class="route-dialog__extra-item"><h4>${escapeHTML(item[0])}</h4><p>${escapeHTML(item[1])}</p></div>`).join('')}</div>
      </section>` : '';

    return `
      <div class="route-dialog__facts">
        <div class="route-dialog__fact"><strong>Inicio</strong><span>${escapeHTML(route.start)}</span></div>
        <div class="route-dialog__fact"><strong>Meta</strong><span>${escapeHTML(route.goal)}</span></div>
        <div class="route-dialog__fact"><strong>Referencia técnica</strong><span>${escapeHTML(route.reference)}</span></div>
        <div class="route-dialog__fact"><strong>Responsable técnico</strong><span>${escapeHTML(route.responsible)}</span></div>
        ${route.price ? `<div class="route-dialog__fact"><strong>Inversión orientativa</strong><span>${escapeHTML(route.price)}</span></div>` : ''}
      </div>
      <section class="route-dialog__modules">
        <h3>Módulos principales</h3>
        <div class="route-dialog__module-grid">${route.modules.map((module, index) => `<div class="route-dialog__module"><h4><span>${String(index + 1).padStart(2, '0')}</span>${escapeHTML(module[0])}</h4><p>${escapeHTML(module[1])}</p></div>`).join('')}</div>
      </section>
      ${extras}
      ${renderLicenseProgram(route)}
      ${renderAdvancedProgram(route)}
      <div class="route-dialog__sections">
        <section class="route-dialog__section"><h3>Formación asociada</h3><p>${escapeHTML(route.training)}</p></section>
        <section class="route-dialog__section route-dialog__section--result"><h3>Qué se consigue</h3><p>${escapeHTML(route.achievement)}</p></section>
      </div>
      <div class="route-dialog__accordion-stack">
        ${renderAccordion('Requisitos', route.requirements)}
        ${renderAccordion('Seguridad', route.safety, 'route-info-accordion--safety')}
        ${renderAccordion('Qué puedes hacer después', route.after, 'route-info-accordion--result')}
      </div>
      ${renderTags(route.tags, 'route-dialog__tags')}`;
  }

  function openRoute(route, trigger) {
    dialog.style.setProperty('--route-dialog-accent', route.tone);
    dialogKicker.textContent = `${route.category} · ${route.count}`;
    dialogTitle.textContent = route.title;
    dialogSummary.textContent = `${route.start} → ${route.goal}`;
    dialogBody.innerHTML = renderRouteDetail(route);
    lastTrigger = trigger;
    document.body.classList.add('route-dialog-open');
    dialog.showModal();
    closeButton.focus();
  }

  container.addEventListener('click', (event) => {
    const button = event.target.closest('[data-route-id]');
    if (!button) return;
    const route = routes.find((item) => item.id === button.dataset.routeId);
    if (route) openRoute(route, button);
  });

  function closeRoute() {
    document.body.classList.remove('route-dialog-open');
    if (dialog.open) dialog.close();
    lastTrigger?.focus();
  }

  closeButton.addEventListener('click', closeRoute);
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeRoute();
  });
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeRoute();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('route-dialog-open');
  });
})();
