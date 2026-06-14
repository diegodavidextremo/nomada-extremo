(function () {
  'use strict';

  const packs = [
    { name:'Tridente Extremo', subtitle:'Paratrike por la costa + paracaidismo tándem + buceo guiado', chips:['Paratrike','Paracaidismo','Buceo','Audiovisual'], level:'Iniciación-avanzado · 2 días', price:'449 €', image:'assets/images/actividades/familia-aire.jpg', description:'Tres dimensiones de aventura: vuelo costero, caída libre y una jornada subacuática coordinada con centros autorizados.', zone:'Águilas, costa mediterránea y centros colaboradores autorizados.', requirements:'Saber nadar, condición física adecuada, documentación y validación de los límites operativos de cada proveedor.', safety:'El vuelo se programa antes del buceo. Si el orden cambia, se respetan los intervalos indicados por el centro, el ordenador de buceo y los profesionales responsables.', av:'AV premium · aire y agua' },
    { name:'Leyenda de Aire y Mar', subtitle:'Parapente biplaza + kayak al atardecer + snorkel en cala', chips:['Parapente','Kayak','Snorkel','Atardecer'], level:'Iniciación · Jornada completa', price:'189 €', image:'assets/images/actividades/familia-mar-costa.jpg', description:'Una propuesta accesible que combina vuelo libre, costa y agua tranquila sin exigir experiencia técnica previa.', zone:'Águilas, Calabardina, Cabo Cope o alternativa según condiciones.', requirements:'Saber nadar para la parte acuática y disponibilidad para adaptar horarios al viento y al mar.', safety:'Piloto y guía cualificados, meteorología validada, material de flotación y plan alternativo.', av:'Dron o GoPro sujeto a viabilidad' },
    { name:'Abismo y Cielo', subtitle:'Rope jumping o puenting + paratrike + reportaje audiovisual', chips:['Puenting','Rope jumping','Paratrike','FPV'], level:'Alto impacto · 1-2 días', price:'329 €', image:'assets/images/actividades/ficha-puenting.jpg', description:'Salto pendular con equipo especializado y vuelo en paratrike para una experiencia de adrenalina con planificación técnica.', zone:'Instalación autorizada y zona de vuelo permitida según convocatoria.', requirements:'Validación técnica, rango de peso del operador y ausencia de lesiones incompatibles.', safety:'Doble comprobación, anclajes y equipo revisados, proveedor autorizado, permisos y meteorología favorable.', av:'FPV / GoPro recomendado' },
    { name:'Costa Salvaje Pro', subtitle:'Coasteering + kayak de travesía + snorkel + pausa en cala', chips:['Coasteering','Kayak','Snorkel','Cala'], level:'Iniciación-medio · Jornada', price:'129 €', image:'assets/images/actividades/familia-mar-costa.jpg', description:'Progresión costera, roca, entradas al agua y navegación en una jornada mediterránea activa.', zone:'Costa de Águilas, Calabardina, Cuatro Calas o Cabo Cope.', requirements:'Saber nadar, condición física básica y calzado acuático adecuado.', safety:'Oleaje, salidas del agua, ratio de guía, botiquín y recorrido alternativo revisados.', av:'GoPro acuática disponible' },
    { name:'Roca, Mar y Dron', subtitle:'Escalada de iniciación + rápel + kayak + reportaje aéreo', chips:['Escalada','Rápel','Kayak','Dron'], level:'Medio · Jornada completa', price:'169 €', image:'assets/images/actividades/familia-vertical.jpg', description:'Roca, cuerda y agua con una narrativa audiovisual diseñada sin interferir en la seguridad.', zone:'Águilas, Cabo Cope o zona vertical autorizada según logística.', requirements:'Movilidad básica, tolerancia a la altura y saber nadar.', safety:'Guías por disciplina, revisión cruzada de material y operación UAS solo con permisos y zona viable.', av:'Dron + 360 opcional' },
    { name:'Depredador Azul', subtitle:'Buceo guiado + snorkel naturalista + fotografía subacuática', chips:['Buceo','Snorkel','Fotografía','Vida marina'], level:'Medio · Requiere OWD', price:'159 €', image:'assets/images/actividades/familia-buceo.jpg', description:'Observación respetuosa de paisaje submarino, peces, formaciones y luz natural.', zone:'Isla del Fraile, Cabo Cope, Calabardina o centro colaborador.', requirements:'OWD o equivalente para la inmersión y dominio acuático para snorkel.', safety:'Centro autorizado, pareja de buceo, oxígeno, control de consumo, profundidad y visibilidad.', av:'Fotografía subacuática' },
    { name:'Titán Mediterráneo', subtitle:'Barranquismo + vía ferrata + rápel + BTT aventura', chips:['Barranco','Ferrata','Rápel','BTT'], level:'Medio-alto · 2 días', price:'249 €', image:'assets/images/actividades/familia-barrancos.jpg', description:'Una propuesta terrestre intensa de agua interior, roca, cuerda, altura y ruedas.', zone:'Alicante, Granada, Valencia o localización autorizada.', requirements:'Buena condición física, tolerancia a la altura y validación previa.', safety:'Caudal, meteorología, escapes, ratios, material y comunicación revisados por responsables técnicos.', av:'GoPro y dron donde sea viable' },
    { name:'Nómada 72H', subtitle:'Mar + aire + vertical + audiovisual premium', chips:['Kayak','Paracaidismo','Paratrike','Escalada','FPV'], level:'Élite · 3 días', price:'749 €', image:'assets/images/actividades/ficha-paracaidismo-tandem.webp', description:'Una historia completa de costa, vuelo, caída libre, roca y cuerda repartida en tres jornadas.', zone:'Águilas y centros autorizados según disciplina.', requirements:'Planificación personalizada, estado físico adecuado y disponibilidad flexible.', safety:'Calendario por disciplinas, proveedores autorizados, permisos, seguros y material revisado.', av:'FPV, dron, GoPro y 360' },
    { name:'Halcón del Mediterráneo', subtitle:'Parapente biplaza + paratrike + reportaje aéreo', chips:['Parapente','Paratrike','Vuelo','Vídeo'], level:'Iniciación · 1 día', price:'249 €', image:'assets/images/actividades/familia-aire.jpg', description:'Dos formas de descubrir el aire: el silencio del parapente y la autonomía motorizada del paratrike.', zone:'Costa sureste o zona de vuelo autorizada.', requirements:'Edad y peso según operador, ropa cómoda y documentación.', safety:'Pilotos autorizados, revisión de equipo, viento, rachas, despegue y aterrizaje validados.', av:'Vídeo de vuelo ampliable' },
    { name:'Cueva, Roca y Mar', subtitle:'Espeleoaventura + rápel + snorkel o kayak suave', chips:['Cueva','Rápel','Snorkel','Kayak'], level:'Medio · Jornada completa', price:'149 €', image:'assets/images/actividades/ficha-espeleoaventura.jpg', description:'Entrar en la tierra, progresar con cuerda y terminar junto al mar en una combinación de fuerte contraste natural.', zone:'Cavidad autorizada y litoral según condiciones.', requirements:'Movilidad básica, ausencia de claustrofobia severa y saber nadar si se incluye agua.', safety:'Accesos, iluminación redundante, cuerda, meteorología, salida alternativa y control del grupo.', av:'Foto y vídeo corto opcional' }
  ];

  const gifts = [
    ['Primera Aventura','Desde 59 €','Senderismo costero, kayak tranquilo, snorkel, SUP básico o iniciación.','Primeras experiencias','12 meses'],
    ['Mar Salvaje','Desde 95 €','Kayak, snorkel, coasteering suave o ruta litoral según nivel.','Amantes del mar','12 meses'],
    ['Aire Nómada','Desde 119 €','Parapente, paratrike, paramotor o experiencia aérea disponible.','Quienes sueñan con volar','12 meses'],
    ['Adrenalina Extrema','Desde 149 €','Puenting, barranquismo, ferrata, rápel o actividad intensa validada.','Emociones fuertes','12 meses'],
    ['Azul Profundo','Desde 89 €','Bautismo, snorkel premium o inmersión para personas certificadas.','Vida submarina','12 meses'],
    ['Pareja Aventurera','Desde 169 € / pareja','Kayak al atardecer, snorkel, ruta suave o propuesta combinada.','Experiencia para dos','12 meses'],
    ['Familia Nómada','Desde 149 € / familia','Senderismo, kayak tranquilo, orientación o ruta natural adaptada.','Familias activas','12 meses'],
    ['Creador Extremo','Desde 199 €','Actividad con GoPro, dron viable, cámara 360 o edición vertical.','Creadores outdoor','12 meses'],
    ['Élite Nómada','Desde 349 €','Experiencia privada, planificación, audiovisual y detalle final.','Regalos especiales','12 meses'],
    ['Libre a Medida','Importe abierto desde 50 €','Saldo flexible para experiencia, formación, audiovisual o pack.','Cuando prefieres que elija','12 meses']
  ];

  const packGrid = document.getElementById('brutalPacksGrid');
  if (packGrid) {
    packGrid.innerHTML = packs.map((pack, index) => `
      <article class="brutal-pack-card">
        <div class="brutal-pack-card__image" style="background-image:url('${pack.image}')">
          <span class="brutal-pack-card__index">Pack ${String(index + 1).padStart(2, '0')}</span>
          <div><span class="brutal-pack-card__validation">Validación previa</span><h3>${pack.name}</h3></div>
        </div>
        <div class="brutal-pack-card__body">
          <p class="brutal-pack-card__subtitle">${pack.subtitle}</p>
          <div class="brutal-pack-card__chips">${pack.chips.map(chip => `<span>${chip}</span>`).join('')}</div>
          <p class="brutal-pack-card__description">${pack.description}</p>
          <div class="brutal-pack-card__price-area">
            <span class="brutal-pack-card__price-label">Desde</span>
            <strong class="brutal-pack-card__price">${pack.price}</strong>
            <span class="brutal-pack-card__price-note">por persona · precio orientativo</span>
            <span class="brutal-pack-card__availability">${pack.av}</span>
            <a class="btn btn-arena brutal-pack-card__cta" href="reservas.html">Solicitar ${pack.name}</a>
          </div>
          <details><summary>Ver planificación y requisitos</summary><div class="brutal-pack-card__technical"><p><strong>Nivel:</strong> ${pack.level}</p><p><strong>Zona:</strong> ${pack.zone}</p><p><strong>Requisitos:</strong> ${pack.requirements}</p><p class="brutal-pack-card__safety"><strong>Seguridad:</strong> ${pack.safety}</p></div></details>
        </div>
      </article>`).join('');
  }

  const giftGrid = document.getElementById('premiumGiftGrid');
  if (giftGrid) {
    giftGrid.innerHTML = gifts.map((gift, index) => `
      <article class="gift-premium-card">
        <span class="gift-premium-card__seal">Bono regalo ${String(index + 1).padStart(2, '0')}</span>
        <h3>${gift[0]}</h3>
        <p>${gift[2]}</p>
        <div class="gift-premium-card__facts"><span><strong>Para quién:</strong> ${gift[3]}</span><span><strong>Validez:</strong> ${gift[4]}</span><span><strong>Formato:</strong> vale digital personalizable</span></div>
        <div class="gift-premium-card__price">${gift[1]}</div>
        <a class="btn btn-mar" href="contacto.html">Regalar bono</a>
      </article>`).join('');
  }
})();
