(function () {
  'use strict';
  const categories = [
    { id:'general', label:'Funcionamiento general', questions:[
      ['¿Qué es Nómada Extremo?','Una marca conceptual de aventura, naturaleza, experiencias outdoor, escuela y contenido audiovisual creada como proyecto académico y modelo de futura implantación.'],
      ['¿La web permite reservar actividades reales?','Actualmente no procesa pagos ni confirma plazas operativas. Una activación real exigiría proveedores, permisos, seguros, contratos y sistema de reservas validado.'],
      ['¿Todas las actividades las realizaría directamente Nómada Extremo?','No necesariamente. Buceo, vuelo, paracaidismo, náutica o formaciones certificadas requieren centros y profesionales autorizados.']
    ]},
    { id:'reservas', label:'Reservas, precios y bonos', questions:[
      ['¿Los precios son finales?','Son orientativos cuando dependen de fecha, proveedor, personas, transporte, permisos, temporada o audiovisual. El importe definitivo se confirmaría antes de una reserva real.'],
      ['¿Puedo regalar una experiencia?','Sí. Hay bonos cerrados y flexibles para ajustar actividad, nivel, fecha y extras según disponibilidad y seguridad.'],
      ['¿Qué pasa si la persona no puede realizar la actividad regalada?','Se plantearía un cambio por otra experiencia compatible, adaptación de nivel o bono flexible equivalente según las condiciones aplicables.']
    ]},
    { id:'seguros', label:'Seguridad, seguros y documentación', featured:true, questions:[
      ['¿Hay seguro incluido?','En el proyecto no existe una póliza activada desde la web. Una versión operativa requeriría responsabilidad civil, accidentes y coberturas específicas según actividad y proveedor.'],
      ['¿Qué documentación se revisaría?','Ficha de participante, salud, experiencia, consentimiento informado, permisos, proveedor, material, seguros y protocolo de emergencia.'],
      ['¿Qué significa validación especial?','Que salud, edad, nivel, peso operativo, experiencia, meteorología y requisitos técnicos deben revisarse antes de aceptar la actividad.']
    ]},
    { id:'requisitos', label:'Requisitos físicos y experiencia', questions:[
      ['¿Puedo participar sin experiencia?','Depende de la disciplina. Senderismo, kayak suave o snorkel pueden adaptarse; vertical, buceo, vuelo o aguas bravas exigen progresión y requisitos concretos.'],
      ['¿Qué pasa si tengo vértigo o ansiedad?','Debe comunicarse antes. Puede reducirse la exposición, adaptar la actividad o elegir una alternativa más adecuada.'],
      ['¿Qué ropa y material personal necesito?','Calzado adecuado, agua, protección solar y ropa por capas como base. Cada ficha concreta añade material específico.']
    ]},
    { id:'actividades', label:'Actividades, packs y meteorología', questions:[
      ['¿Qué ocurre si hace mal tiempo?','Viento, oleaje, calor, tormentas, caudal o visibilidad pueden aplazar, acortar o sustituir la actividad.'],
      ['¿Puedo combinar buceo con vuelo?','Sí, con planificación específica. Se prioriza volar antes de bucear; si se invierte el orden, se respetan los intervalos indicados por el centro y el ordenador de buceo.'],
      ['¿Puedo pedir un pack personalizado?','Sí. Puede combinarse medio, nivel, duración y audiovisual siempre que las disciplinas sean compatibles y técnicamente viables.']
    ]},
    { id:'escuela', label:'Escuela y certificaciones', questions:[
      ['¿Qué diferencia hay entre experiencia, formación y certificación?','La experiencia es puntual; la formación desarrolla habilidades; la certificación solo puede emitirla una organización o centro autorizado.'],
      ['¿Nómada Extremo certifica cursos?','No actualmente. Los itinerarios muestran rutas de referencia y, en una versión operativa, se coordinarían con centros autorizados.'],
      ['¿Puedo continuar progresando después de una iniciación?','Sí. Escuela Nómada plantea progresiones por niveles y deriva hacia proveedores o entidades reconocidas cuando corresponde.']
    ]},
    { id:'audiovisual', label:'Audiovisual, cámaras y privacidad', questions:[
      ['¿Puedo llevar cámara propia?','Solo si puede sujetarse correctamente y no compromete seguridad, privacidad ni ritmo del grupo.'],
      ['¿El dron está siempre disponible?','No. Depende de zona, normativa, permisos, meteorología y compatibilidad con la actividad.'],
      ['¿Cómo se gestiona el derecho de imagen?','Mediante autorización específica. La participación en la actividad no implica aceptar grabaciones o publicaciones.']
    ]},
    { id:'naturismo', label:'Naturismo y convivencia', questions:[
      ['¿La línea naturista es obligatoria?','No. Es independiente, voluntaria y dirigida a personas adultas que aceptan previamente sus normas.'],
      ['¿Qué actividades encajan?','Kayak tranquilo, SUP, snorkel respetuoso, senderismo consciente, yoga, movilidad, baño en cala o meditación.'],
      ['¿Se pueden hacer fotografías?','No sin autorización expresa. Tampoco se publican ubicaciones sensibles ni imágenes de terceros sin consentimiento.']
    ]},
    { id:'grupos', label:'Grupos, familias y empresas', questions:[
      ['¿Hay actividades para familias?','Sí: senderismo, kayak tranquilo, snorkel de iniciación, orientación y propuestas adaptadas a edad y nivel.'],
      ['¿Pueden participar menores?','Depende de disciplina, edad, autorización, proveedor, seguro y criterio técnico. Algunas actividades no son adecuadas para menores.'],
      ['¿Se pueden preparar jornadas para empresas o centros?','Sí, con objetivos de equipo, educación ambiental, aventura adaptada, formación outdoor o contenido audiovisual.']
    ]},
    { id:'contacto', label:'Contacto y soporte', questions:[
      ['¿Cuál es el mejor canal?','WhatsApp para consultas rápidas; email o formulario para propuestas detalladas; Instagram para contenido visual y X para avisos breves.'],
      ['¿Dónde puedo seguir el proyecto?','Instagram: @nomadaextremoes. X: @nomadaextremoES. Ambos enlaces están disponibles en Contacto y en el pie de página.'],
      ['¿Qué información debo enviar?','Actividad, fecha, personas, nivel, experiencia, audiovisual y cualquier dato relevante sobre salud, agua, altura, vértigo o movilidad.']
    ]}
  ];

  const results = document.getElementById('faqResults');
  const chips = document.getElementById('faqCategoryChips');
  const search = document.getElementById('faqSearch');
  const empty = document.getElementById('faqEmpty');
  if (!results || !chips || !search || !empty) return;
  let active = 'all';
  const t = value => typeof window.noextTranslate === 'function' ? window.noextTranslate(value) : value;

  const render = () => {
    const term = search.value.trim().toLocaleLowerCase(document.documentElement.lang || 'es');
    const visible = categories.map(category => ({...category, questions:category.questions.filter(([q,a]) => `${t(q)} ${t(a)}`.toLocaleLowerCase(document.documentElement.lang || 'es').includes(term))})).filter(category => (active === 'all' || category.id === active) && category.questions.length);
    results.innerHTML = visible.map((category, index) => `<section class="faq-category${category.featured ? ' faq-category--featured' : ''}"><header class="faq-category__head"><span>${String(index + 1).padStart(2,'0')} · Categoría</span><h2>${category.label}</h2></header>${category.questions.map(([question,answer]) => `<details class="faq-item"><summary>${question}</summary><p>${answer}</p></details>`).join('')}</section>`).join('');
    empty.hidden = visible.length > 0;
    results.querySelectorAll('.faq-item').forEach(item => item.addEventListener('toggle', () => { if (!item.open) return; results.querySelectorAll('.faq-item[open]').forEach(other => { if (other !== item) other.open = false; }); }));
  };

  const renderChips = () => {
    const chipData = [['all','Todas'], ...categories.map(category => [category.id, category.label])];
    chips.innerHTML = chipData.map(([id,label]) => `<button type="button" data-faq-category="${id}" class="${id === active ? 'is-active' : ''}">${label}</button>`).join('');
  };
  renderChips();
  chips.addEventListener('click', event => { const button = event.target.closest('[data-faq-category]'); if (!button) return; active = button.dataset.faqCategory; chips.querySelectorAll('button').forEach(item => item.classList.toggle('is-active', item === button)); render(); });
  search.addEventListener('input', render);
  window.addEventListener('noext:languagechange', () => { renderChips(); render(); });
  render();
})();
