/* NÓMADA EXTREMO — asistente contextual accesible */
(function () {
  'use strict';

  const time = () => new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  const topics = {
    empezar: ['¿Qué actividad me recomiendas para empezar?', 'Para empezar elegiría algo de iniciación y con margen: senderismo costero, kayak suave, SUP, snorkel con dominio acuático, bautismo de buceo con centro autorizado o vuelo biplaza. La clave es cruzar edad, condición física, vértigo, agua, calor y ganas reales de adrenalina.'],
    regalo: ['¿Qué pack regalo puedo elegir?', 'Para regalar sin complicarte: Primera Aventura, Mar Esencial, Pareja Aventurera o Familia Nómada. Si la persona quiere algo fuerte, mejor bono flexible y validación previa antes de elegir puenting, rope jumping, paracaidismo o actividades técnicas.'],
    material: ['¿Qué necesito llevar?', 'Depende de la actividad, pero casi siempre: agua, calzado adecuado, protección solar, ropa cómoda, medicación personal si procede y documentación. El material técnico lo marca cada ficha y algunos equipos solo pueden ser usados por profesionales o proveedores autorizados.'],
    familia: ['¿Hay actividades familiares?', 'Sí. Senderismo suave, orientación, kayak tranquilo, SUP, snorkel adaptado, Naturaleza Nómada, retos sin huella y packs familiares. Se ajustan por edad, calor, oleaje, distancia, miedos y ritmo del grupo.'],
    meteorologia: ['¿Qué pasa si hace mal tiempo?', 'La meteorología manda. Viento, oleaje, tormenta, caudal, visibilidad, calor o riesgo de incendio pueden cambiar zona, horario, formato o fecha. El criterio técnico siempre va por delante de la agenda.'],
    vertigo: ['¿Puedo hacer algo si tengo vértigo?', 'Sí, pero no empezaría por altura. Puedes probar mar, naturaleza, snorkel, kayak, SUP o senderismo. Si quieres trabajar la altura, mejor progresión: miradores, ferrata muy sencilla, rápel controlado y nunca presión de grupo.'],
    extremas: ['¿Qué actividades son más extremas?', 'Rope jumping, puenting, paracaidismo, AFF, cliff jumping validado, barrancos técnicos, escalada clásica, vías largas, jetsurf y algunas rutas de cresta. Todas requieren validación, proveedor o profesional cualificado y condiciones claras.'],
    buceovuelo: ['¿Puedo combinar buceo con vuelo?', 'Solo con planificación. Tras inmersión hay que respetar intervalos antes de volar o ganar altitud, según ordenador de buceo, centro, perfil de inmersión y recomendaciones de seguridad. Nunca lo plantearía improvisado en la misma jornada.'],
    seguro: ['¿Qué incluye el seguro?', 'En una versión operativa habría que concretar responsabilidad civil, accidentes, proveedor, permisos y condiciones. En esta web se muestra como estructura profesional futura; no equivale a cobertura activa real mientras el proyecto no opere.'],
    audiovisual: ['¿Puedo contratar vídeo?', 'Sí como línea conceptual: GoPro, 360, foto, dron o FPV según actividad, permisos, consentimiento y seguridad. La toma nunca debe interferir con el guía, el material ni el ritmo del grupo.'],
    rope: ['¿Qué nivel necesito para rope jumping?', 'Rope jumping no es una primera experiencia cualquiera. Requiere buena condición general, autocontrol, validación del operador, peso dentro de rango, briefing reforzado y ausencia de factores incompatibles. Puenting es la entrada más accesible.'],
    pareja: ['¿Qué actividad es mejor para pareja?', 'Kayak atardecer, snorkel, senderismo con audiovisual, pack Pareja Aventura, e-foil si hay presupuesto o un bono flexible. Si buscáis adrenalina, puenting puede ser más razonable que rope jumping para empezar.'],
    centros: ['¿Qué actividades hay para centros educativos?', 'Orientación, senderismo interpretativo, medio natural, seguridad, material, kayak suave, Naturaleza Nómada, logbook, retos ambientales y dinámicas de grupo. Todo debe adaptarse por edad, ratio y objetivos didácticos.'],
    empresas: ['¿Qué opciones hay para empresas?', 'Team building sin postureo: cohesión, comunicación, toma de decisiones, reto suave, naturaleza, orientación, aventura premium y audiovisual corporativo. Siempre sin alcohol ni presión absurda por hacer actividades de riesgo.'],
    logbook: ['¿Cómo funciona el Logbook?', 'El Logbook registra experiencias, zonas, aprendizajes, XP, niveles, insignias, recuerdos audiovisuales y credenciales internas. Es un prototipo de app: no guarda cuentas reales en esta web.'],
    bono: ['¿Cómo regalo un bono?', 'Elige un importe o temática, deja margen para adaptar actividad, nivel y fecha, y usa solicitud no vinculante. En proyecto no operativo no hay pago real; en versión futura sería preventa o bono sujeto a condiciones.'],
    puenting: ['¿Qué diferencia hay entre puenting y rope jumping?', 'Puenting es salto pendular desde puente, más accesible y de entrada. Rope jumping usa instalaciones dinámicas de cuerda en pared o gran altura, con sensación más cercana a caída libre y validación técnica más exigente.'],
    nadar: ['¿Qué actividad es mejor si no sé nadar?', 'Evitaría snorkel, kayak abierto, SUP y buceo hasta trabajar seguridad acuática. Puedes empezar por senderismo, naturaleza, orientación, audiovisual, BTT suave o actividades de montaña adaptadas.'],
    naturaleza: ['¿Qué opciones hay para naturaleza y bajo impacto?', 'Ruta Sin Huella, plogging mediterráneo, snorkel naturalista, ciencia ciudadana, fotografía sin invadir, posidonia, educación ambiental y retos verdes del Logbook.'],
    precios: ['¿Cómo funcionan los precios de inauguración?', 'Se muestran como precios orientativos de lanzamiento o referencia. No se tachan precios falsos ni se promete descuento real si no ha existido venta previa. Todo depende de proveedor, grupo, fecha, seguros y permisos.'],
    contacto: ['¿Cómo contacto?', 'Puedes escribir a <a href="mailto:nomadaextremoaguilas@gmail.com">nomadaextremoaguilas@gmail.com</a>, usar Telegram <a href="https://t.me/DiegoDavidExtremo" target="_blank" rel="noopener noreferrer">@DiegoDavidExtremo</a>, abrir FAQ o enviar el formulario de contacto.']
  };

  const quickOrder = ['empezar','regalo','material','familia','meteorologia','vertigo','extremas','buceovuelo','seguro','audiovisual','rope','pareja','centros','empresas','logbook','bono','puenting','nadar','naturaleza','precios'];
  const quickButtons = quickOrder.map(function (key) {
    return '<button class="chat-quick" type="button" data-topic="' + key + '">' + topics[key][0] + '</button>';
  }).join('');
  const markup =
    '<button id="chatBtn" type="button" title="Asistente Nómada" aria-label="Abrir asistente Nómada" aria-expanded="false" aria-controls="chatPanel">NE</button>' +
    '<section id="chatPanel" role="dialog" aria-modal="false" aria-labelledby="chatTitle" aria-hidden="true">' +
      '<header class="chat-header"><div class="chat-avatar" aria-hidden="true">N</div><div><div class="chat-nombre" id="chatTitle">ASISTENTE NÓMADA</div><div class="chat-estado"><span class="chat-dot"></span> Asistente orientativo</div></div><button class="chat-close" id="chatClose" type="button" aria-label="Cerrar asistente">×</button></header>' +
      '<div class="chat-body" id="chatBody" aria-live="polite"></div>' +
      '<footer class="chat-footer"><div class="chat-quick-btns" aria-label="Preguntas rápidas">' + quickButtons + '</div><form class="chat-input-row" id="chatForm"><label class="sr-only" for="chatInput">Escribe una pregunta</label><input id="chatInput" type="text" autocomplete="off" placeholder="Pregunta por actividad, seguridad, packs..." maxlength="180"><button type="submit" aria-label="Enviar pregunta">Enviar</button></form><div class="chat-ctas"><a href="contacto.html" class="chat-cta-custom">Formulario</a><a href="faq.html" class="chat-cta-custom">FAQ</a><a href="packs.html" class="chat-cta-custom">Packs</a><a href="https://t.me/DiegoDavidExtremo" target="_blank" rel="noopener noreferrer" class="chat-cta-custom">Telegram</a></div></footer>' +
    '</section>';

  document.body.insertAdjacentHTML('beforeend', markup);
  const button = document.getElementById('chatBtn');
  const panel = document.getElementById('chatPanel');
  const close = document.getElementById('chatClose');
  const body = document.getElementById('chatBody');
  let started = false;

  function addMessage(content, sender = 'bot', trusted = false) {
    const wrapper = document.createElement('div');
    wrapper.className = 'chat-msg ' + sender;
    const bubble = document.createElement('div');
    bubble.className = 'chat-burbuja';
    if (trusted) bubble.innerHTML = content;
    else bubble.textContent = content;
    const stamp = document.createElement('div');
    stamp.className = 'chat-timestamp';
    stamp.textContent = time();
    wrapper.append(bubble, stamp);
    body.appendChild(wrapper);
    body.scrollTop = body.scrollHeight;
  }

  function answer(key) {
    const item = topics[key];
    if (!item) return;
    addMessage(item[0], 'user');
    window.setTimeout(function () { addMessage(item[1], 'bot', true); }, 160);
  }

  function start() {
    if (started) return;
    started = true;
    addMessage('Hola. Soy el asistente orientativo de Nómada Extremo. Puedo ayudarte con actividades, seguridad, packs, precios, grupos, Logbook, Naturaleza, Escuela y contacto. Esta web es un proyecto académico no operativo.');
  }

  function setOpen(open) {
    panel.classList.toggle('open', open);
    panel.setAttribute('aria-hidden', String(!open));
    button.setAttribute('aria-expanded', String(open));
    if (open) {
      start();
      window.setTimeout(function () { document.getElementById('chatInput')?.focus(); }, 50);
    } else {
      button.focus();
    }
  }

  function findTopic(query) {
    const normalized = query.toLocaleLowerCase('es-ES').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const aliases = {
      empezar: ['empezar','primera','inicio','recomienda','principiante'], regalo: ['regalo','bono','regalar'], material: ['material','equipo','llevar','traer'], familia: ['familia','niños','ninos','cumple'], meteorologia: ['meteo','tiempo','lluvia','viento','oleaje','mal tiempo'], vertigo: ['vertigo','altura','miedo'], extremas: ['extrema','adrenalina','fuerte'], buceovuelo: ['buceo vuelo','volar buceo','inmersion vuelo','altitud'], seguro: ['seguro','cobertura','accidente'], audiovisual: ['video','vídeo','grabar','dron','fpv','360','foto'], rope: ['rope','jumping','montanejos'], pareja: ['pareja','romantico','romántico'], centros: ['centro','colegio','gmn','tseas','educativo'], empresas: ['empresa','team','building'], logbook: ['logbook','app','xp','insignia'], bono: ['como regalo','bono','vale'], puenting: ['puenting','pendular','mascarat'], nadar: ['no se nadar','nadar','agua'], naturaleza: ['naturaleza','sostenibilidad','posidonia','plogging'], precios: ['precio','cuesta','coste','inauguracion','lanzamiento'], contacto: ['contacto','email','correo','telegram','telegram']
    };
    return Object.keys(aliases).find(function (key) {
      return aliases[key].some(function (term) { return normalized.includes(term); });
    });
  }

  button.addEventListener('click', function () { setOpen(!panel.classList.contains('open')); });
  close.addEventListener('click', function () { setOpen(false); });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && panel.classList.contains('open')) setOpen(false);
  });
  document.addEventListener('click', function (event) {
    const quick = event.target.closest('.chat-quick[data-topic]');
    if (quick && panel.contains(quick)) answer(quick.dataset.topic);
  });
  document.addEventListener('submit', function (event) {
    if (event.target.id !== 'chatForm') return;
    event.preventDefault();
    const input = event.target.querySelector('#chatInput');
    const query = input?.value.trim() || '';
    if (!query) return;
    const key = findTopic(query);
    addMessage(query, 'user');
    input.value = '';
    window.setTimeout(function () {
      if (key) addMessage(topics[key][1], 'bot', true);
      else addMessage('No tengo una respuesta precisa para eso. Prueba con actividad, edad, seguridad, material, precios, packs, Escuela, Logbook, Naturaleza o contacto. También puedes abrir la FAQ o escribir al equipo.');
    }, 160);
  });
  window.addEventListener('scroll', function () {
    button.classList.toggle('visible', window.scrollY > 240);
  }, { passive: true });
  button.classList.toggle('visible', window.scrollY > 240);
})();
