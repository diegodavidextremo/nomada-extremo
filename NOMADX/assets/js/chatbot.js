/* ═══════════════════════════════
   NÓMADA EXTREMO — CHATBOT
   ═══════════════════════════════ */
(function(){

  const HORA = () => new Date().toLocaleTimeString('es-ES',{hour:'2-digit',minute:'2-digit'});

  const FAQS = {
    'experiencia': {
      q:'¿Necesito experiencia previa?',
      r:'La mayoría de nuestras experiencias no requieren experiencia previa: senderismo, kayak, bautismo de buceo, paracaidismo tándem o parapente biplaza son perfectas para comenzar. Las actividades más técnicas como escalada, ferrata o barranquismo tienen opciones de iniciación con guía. Te orientamos según tu nivel.'
    },
    'edad': {
      q:'¿Cuál es la edad mínima?',
      r:'Varía por actividad: senderismo y kayak suave desde 8 años, bautismo de buceo desde 10, paracaidismo desde 16 o 18 años. Cada ficha indica la edad mínima. ¿Tienes en mente una actividad concreta?'
    },
    'lluvia': {
      q:'¿Qué pasa si hace mal tiempo?',
      r:'La seguridad es innegociable. Si las condiciones no son aptas, la salida se pospone o se adapta. Nunca se cancela sin alternativa. Avisamos con antelación y buscamos nueva fecha sin coste extra.'
    },
    'material': {
      q:'¿Incluye material?',
      r:'En la mayoría de experiencias guiadas el material técnico va incluido: arneses, cascos, equipos de buceo, kayaks, chalecos, etc. Te indicamos en la confirmación qué necesitas traer tú (ropa cómoda, calzado, agua).'
    },
    'reservar': {
      q:'¿Cómo puedo reservar?',
      r:'Ahora mismo no se pueden hacer reservas reales. La página de Reservas muestra una solicitud simulada para el proyecto académico, sin cobros ni confirmación operativa.'
    },
    'bono': {
      q:'¿Cómo funciona un bono regalo?',
      r:'Los bonos son una propuesta comercial simulada. No se venden bonos reales ni se cobra ningún importe en esta versión académica.'
    },
    'audiovisual': {
      q:'¿Puedo grabar mi experiencia?',
      r:'El servicio audiovisual es demostrativo: Insta360 X5, DJI Osmo Action 6, GoPro MISSION 1 PRO, Insta360 GO Ultra, dron 4K y FPV sujeto a normativa AESA. No se graban actividades reales desde esta web.'
    },
    'privado': {
      q:'¿Hay experiencias privadas?',
      r:'Sí, todas las actividades pueden contratarse en formato privado para parejas, grupos, familias o empresas. Horario flexible y adaptación del recorrido. Escríbenos para diseñar tu experiencia a medida.'
    },
    'escuela': {
      q:'¿Cómo funcionan los cursos de la Escuela?',
      r:'La Escuela Nómada es una propuesta formativa demostrativa con rutas por disciplina, niveles, logbook y credenciales simuladas. No sustituye titulaciones oficiales salvo colaboración real con entidad certificadora.'
    },
    'cancelar': {
      q:'¿Puedo cancelar mi reserva?',
      r:'Las cancelaciones son simuladas porque no hay reservas ni pagos reales. En una empresa operativa se definirían condiciones, meteorología, reprogramaciones y responsabilidades.'
    }
  };

  const MARKUP = `
<button id="chatBtn" title="Asistente Nómada">🤖</button>
<div id="chatPanel">
  <div class="chat-header">
    <div class="chat-avatar">🧭</div>
    <div>
      <div class="chat-nombre">ASISTENTE NÓMADA</div>
      <div class="chat-estado"><div class="chat-dot"></div> Modo demo académico</div>
    </div>
    <button class="chat-close" id="chatClose">✕</button>
  </div>
  <div class="chat-body" id="chatBody"></div>
  <div class="chat-footer">
    <div class="chat-quick-btns">
      <span class="chat-quick" data-faq="experiencia">Experiencia previa</span>
      <span class="chat-quick" data-faq="material">Material incluido</span>
      <span class="chat-quick" data-faq="audiovisual">Grabación</span>
      <span class="chat-quick" data-faq="reservar">Cómo reservar</span>
      <span class="chat-quick" data-faq="bono">Bonos regalo</span>
    </div>
    <div class="chat-ctas">
      <a href="https://wa.me/34600000000" class="chat-cta-wa" target="_blank">💬 WhatsApp</a>
      <a href="reservas.html" class="chat-cta-custom">Reserva demo</a>
    </div>
  </div>
</div>`;

  document.body.insertAdjacentHTML('beforeend', MARKUP);

  const btn    = document.getElementById('chatBtn');
  const panel  = document.getElementById('chatPanel');
  const close  = document.getElementById('chatClose');
  const body   = document.getElementById('chatBody');

  /* Visibility */
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 300));

  /* Toggle */
  const toggle = () => {
    panel.classList.toggle('open');
    if (panel.classList.contains('open') && body.children.length === 0) initChat();
  };
  btn.addEventListener('click', toggle);
  close.addEventListener('click', () => panel.classList.remove('open'));

  function addMsg(text, from='bot') {
    const div = document.createElement('div');
    div.className = `chat-msg ${from}`;
    div.innerHTML = `<div class="chat-burbuja">${text}</div><div class="chat-timestamp">${HORA()}</div>`;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  function addOptions(opts) {
    const wrap = document.createElement('div');
    wrap.className = 'chat-msg bot';
    const optsDiv = document.createElement('div');
    optsDiv.className = 'chat-options';
    opts.forEach(({label, faq}) => {
      const b = document.createElement('button');
      b.className = 'chat-option-btn';
      b.textContent = label;
      b.addEventListener('click', () => { answerFaq(faq); optsDiv.querySelectorAll('button').forEach(x=>x.disabled=true); });
      optsDiv.appendChild(b);
    });
    wrap.appendChild(optsDiv);
    body.appendChild(wrap);
    body.scrollTop = body.scrollHeight;
  }

  function answerFaq(key) {
    const faq = FAQS[key];
    if (!faq) return;
    addMsg(`<strong>${faq.q}</strong>`, 'user');
    setTimeout(() => {
      addMsg(faq.r);
      setTimeout(() => addMsg('¿Hay algo más en lo que pueda ayudarte? También puedes hablar directamente con el equipo 👇'), 600);
    }, 300);
  }

  function initChat() {
    setTimeout(() => {
      addMsg('¡Hola! Soy el asistente de <strong>Nómada Extremo</strong>. Esta web es un proyecto académico ficticio: no hay reservas, cobros ni actividades reales.');
      setTimeout(() => addOptions([
        {label:'¿Necesito experiencia previa?', faq:'experiencia'},
        {label:'¿Qué material incluye?', faq:'material'},
        {label:'¿Cómo reservo?', faq:'reservar'},
        {label:'¿Puedo grabar mi experiencia?', faq:'audiovisual'},
        {label:'¿Hacéis experiencias privadas?', faq:'privado'},
      ]), 700);
    }, 200);
  }

  /* Quick buttons */
  document.querySelectorAll('.chat-quick').forEach(q => {
    q.addEventListener('click', () => {
      if (body.children.length === 0) initChat();
      setTimeout(() => answerFaq(q.dataset.faq), body.children.length === 0 ? 1000 : 0);
    });
  });

})();

/* Añadir formularios al chatbot */
(function() {
  const origFAQS_EXT = {
    'formulario': {
      q: '¿Qué formularios necesito rellenar?',
      r: 'Depende de tu actividad:<br>1️⃣ Ficha de Participación (siempre)<br>2️⃣ Anexo de tu disciplina (A=Aire, B=Buceo, C=Vertical, D=Barrancos, E=Montaña, F=BTT)<br>3️⃣ Validación especial si es cliff diving, rope jumping o buceo nocturno.<br>Visita nuestra <a href="formularios.html" style="color:var(--arena-claro)">página de Formularios</a> para acceso directo a todo.'
    },
    'checkin': {
      q: '¿Cómo funciona el check-in digital?',
      r: 'El check-in digital es una simulación: confirmación, firma, punto de encuentro y guía asignado se muestran como ejemplo de cómo funcionaría una empresa real.'
    }
  };
  
  // Extend global FAQS if accessible via window
  if (window._nomadaFAQS) {
    Object.assign(window._nomadaFAQS, origFAQS_EXT);
  }
})();



const NOMADA_EXTRA_FAQS = {
  'efoil': { q: '¿Qué es el e-foil?', r: 'El e-foil es una tabla eléctrica con un foil que permite deslizarse sobre el agua con motor eléctrico. No necesita olas ni viento. En esta web aparece como experiencia simulada, no como servicio real.' },
  'wingfoil': { q: '¿Cómo funciona el wingfoil?', r: 'El wingfoil combina ala de mano, tabla y foil para usar el viento. A diferencia del e-foil, sí requiere viento y condiciones adecuadas.' },
  'jetsurf': { q: '¿Qué es el jetsurf?', r: 'El jetsurf funciona con motor propio. En Nómada Extremo se presenta como disciplina demostrativa sujeta a instructor, permisos, zona y seguridad.' },
  'weekend': { q: '¿Tenéis packs de fin de semana?', r: 'La web muestra packs de fin de semana como propuesta académica de catálogo. No se venden ni se reservan packs reales actualmente.' },
  'foil': { q: '¿Puedo alquilar material de foil?', r: 'El material de foil (e-foil, wingfoil, jetsurf) solo se usa en formato supervisado con instructor por seguridad. No está disponible para uso libre. Consulta las sesiones en nuestra sección de Alquiler o escríbenos.' },
  'naturismo': { q: '¿Qué son los packs naturistas?', r: 'Son experiencias de aventura suave en entornos seleccionados del litoral de Águilas, diseñadas para personas con filosofía naturista. Incluyen kayak, snorkel, SUP, yoga o senderismo. Solo para adultos y con el máximo respeto. Ver sección Naturismo.' },
};

// Merge with existing FAQs if possible
if (typeof window !== 'undefined') {
  window._nomadaExtraFAQS = NOMADA_EXTRA_FAQS;
}
