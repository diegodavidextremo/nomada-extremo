/* Editorial reader: one accessible dialog, with useful sections per article. */
(() => {
  const modal=document.getElementById('articleModal');
  if(!modal)return;
  const data=JSON.parse(document.getElementById('featuredArticlesData').textContent);
  const extras={
    rope:{heading:'Elegir por la experiencia, no por la altura',text:'Antes de comparar dos propuestas, pide una descripción del salto completo: aproximación, espera, preparación, recuperación y regreso. El nombre comercial no permite deducir cómo será la instalación ni cuánto tiempo pasarás en el lugar.',items:['Pregunta qué incluye el precio: traslado, equipo, fotografías y acompañamiento.','Confirma con el operador los requisitos de participación y cómo se gestiona un cambio de condiciones.','Si vas en grupo, acuerda una alternativa para quien decida no saltar.'],takeaway:'Una buena propuesta permite entender la experiencia y decidir sin presión.'},
    'buceo-vuelo':{heading:'Planificar el itinerario completo',text:'No basta con ordenar dos actividades en el calendario. También cuentan los desplazamientos posteriores a zonas altas y el vuelo de regreso. Comunica al centro de buceo el itinerario antes de cerrar fechas y solicita orientación específica para las inmersiones previstas.',items:['Comparte los horarios de las inmersiones y de todos los desplazamientos posteriores.','Reserva margen para cambios de jornada y evita encadenar actividades por aprovechar un pack.','Consulta las recomendaciones de DAN y acuerda el plan con profesionales; esta lectura no determina un intervalo individual.'],takeaway:'Las recomendaciones para vuelos comerciales no deben trasladarse automáticamente a cualquier actividad aérea.',source:'https://dan.org/health-medicine/health-resources/diseases-conditions/flying-after-diving/'},
    montana:{heading:'Leer la ruta más allá de los kilómetros',text:'Dos recorridos de la misma distancia pueden ofrecer jornadas muy distintas. Una senda sencilla, un terreno irregular y una sucesión de pendientes no exigen el mismo esfuerzo. La descripción debe explicar el recorrido y permitir al participante compararlo con experiencias anteriores.',items:['Consulta distancia, desnivel, duración estimada y tipo de terreno en la ficha concreta.','Identifica el punto de inicio, el transporte de regreso y los servicios disponibles.','Explica qué parte de la ruta te genera dudas antes de elegir el grupo o el nivel.'],takeaway:'La mejor ruta es aquella cuyo esfuerzo, paisaje y ritmo encajan con lo que buscas.'},
    waterman:{heading:'Comparar sesiones, no solo nombres',text:'La tecnología es parte del atractivo, pero el formato de aprendizaje marca la experiencia. Una sesión individual, un grupo con turnos y un curso por jornadas ofrecen tiempos de práctica distintos. Pide que se distingan explicación, preparación y tiempo efectivo sobre el agua.',items:['Comprueba qué equipo aporta la escuela y qué material personal debes llevar.','Pregunta cómo se adapta la sesión a tu experiencia previa y al entorno elegido.','Revisa la política de cambios si las condiciones impiden practicar la modalidad prevista.'],takeaway:'Una ficha clara explica qué aprenderás y cómo se organiza tu tiempo, además de mostrar el equipo.'},
    metodo:{heading:'De una idea atractiva a un plan comprensible',text:'El punto de partida es una conversación concreta: quién participa, qué busca y cuánto tiempo tiene. Después se presenta una propuesta que permite comparar alternativas. Cada parte debe tener una razón: el lugar, el horario, el tamaño del grupo y la combinación de actividades.',items:['Definir el objetivo: iniciación, convivencia, aprendizaje o una experiencia concreta.','Presentar un programa con horarios, desplazamientos, inclusiones y alternativa.','Cerrar con una valoración breve y recuerdos autorizados, sin convertir la salida en una obligación administrativa.'],takeaway:'La calidad se nota cuando el participante sabe qué va a vivir, qué necesita y con quién puede resolver sus dudas.'}
  };
  let trigger=null;
  const close=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');trigger?.focus({preventScroll:true});};
  document.addEventListener('click',e=>{
    const button=e.target.closest('[data-article]');
    if(button){
      const article=data[button.dataset.article],extra=extras[button.dataset.article];if(!article)return;
      trigger=button;
      document.getElementById('articleModalBody').innerHTML=`<span class="label">Cuaderno de aventura · Lectura práctica</span><h2 id="articleModalTitle">${article.title}</h2>${article.body.map((p,i)=>`${i===1?'<h3>Qué conviene revisar</h3>':''}<p class="texto">${p}</p>`).join('')}<h3>${extra.heading}</h3><p class="texto">${extra.text}</p><ul>${extra.items.map(t=>`<li>${t}</li>`).join('')}</ul><aside class="article-takeaway"><strong>Para quedarte con lo esencial</strong><p>${extra.takeaway}</p></aside>${extra.source?`<p class="texto">Referencia: <a href="${extra.source}" target="_blank" rel="noopener">DAN · Volar después de bucear</a></p>`:''}<a class="btn btn-mar" href="contacto.html">Consultar enfoque</a>`;
      modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');modal.querySelector('.article-modal__panel').scrollTop=0;modal.querySelector('.article-modal__close').focus({preventScroll:true});
    } else if(e.target.closest('.article-modal__close')||e.target===modal)close();
  });
  modal.addEventListener('keydown',e=>{
    if(e.key==='Escape'){e.preventDefault();close();}
    if(e.key==='Tab'){
      const list=[...modal.querySelectorAll('button,a[href]')],first=list[0],last=list.at(-1);
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
    }
  });
})();
