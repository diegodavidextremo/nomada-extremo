# Auditoría editorial de Nómada Extremo · 26 septiembre 2026

He recorrido el contenido y la estructura de las 57 páginas HTML que no son redirecciones (323 etiquetas `section`), sus llamadas a la acción y los estados de demostración. La revisión visual de esta entrega se concentró en Contacto; el resto se revisó en los archivos, por lo que las recomendaciones visuales fuera de Contacto requieren una comprobación final en pantalla. La auditoría automática de recursos y enlaces internos no detectó fallos.

La mejor voz de la web aparece donde Diego cuenta experiencias concretas, con fecha y lugar. La pierde cuando el proyecto académico habla como una empresa ya abierta, inventa precisión sobre operaciones futuras o acumula demasiadas funciones de app. No propongo borrar su historia ni la visión de futuro: propongo distinguirlas mejor.

## Cambios que haría primero

1. **Aclarar qué existe hoy.** `proyecto-academico.html` dice que no hay empresa ni reservas reales. En `contacto.html` aparecen «Base operativa», disponibilidad diaria y respuestas de menos de 2 horas; `equipo.html` afirma que ya «cuenta con» especialistas, seguros y actividad acumulada. Un lector puede interpretarlo como oferta actual. Cambiaría esas frases a «origen del proyecto», «canal de Diego» y «perfiles previstos», con un aviso breve y único cerca de la acción.
2. **Quitar el acceso que simula cuentas.** `login.html` pide contraseña, anuncia recuperación y registro mediante alertas que prometen un correo inexistente. Lo retiraría de la navegación pública o lo convertiría en una maqueta no interactiva, sin campos de contraseña. `gracias.html` tampoco debería afirmar «solicitud recibida» si nada se ha enviado.
3. **Revisar nombres y cifras del equipo técnico.** `equipo.html` publica nombres completos, edades, titulaciones y cientos de actuaciones concretas sin una fuente o consentimiento visible en el repositorio. No concluyo que sean falsos; sí que parecen perfiles contratados y comprobados. Conservaría solo personas y datos que Diego quiera atribuir públicamente; los demás pasarían a roles hipotéticos claramente marcados. La trayectoria deportiva de Nuria continúa oculta como se pidió.
4. **Reducir la simulación comercial.** Los muchos precios de `alquiler.html`, los packs con seguros y guía «incluidos» en `packs.html`, los cupones, stock, sorteos y premios de `comunidad.html` restan credibilidad a la aclaración académica. Mantendría unos pocos casos de ejemplo y trasladaría los cálculos detallados a la memoria del proyecto.
5. **Devolver el protagonismo a Diego y Águilas.** Portada y marca ganan más con fotografías autorizadas, decisiones explicadas en primera persona y lugares concretos que con más badges, XP o expresiones como «brutales», «arsenal» y «élite» repetidas. Añadiría un relato breve de por qué creó cada línea principal, una imagen real cuando exista y el aprendizaje que le dejó.
6. **Ordenar la arquitectura.** `index.html` tiene 31 secciones y `comunidad.html` mezcla club, cupones, tienda, premios, app y campañas. Haría una portada más corta: quién es Diego, qué es el proyecto hoy, tres rutas para explorarlo y contacto. Comunidad quedaría como club y campañas; Logbook como demostración digital; Formación y Proyecto Intermodular conservarían su finalidad académica propia.

## Revisión página por página

| Página | Qué cambiaría y por qué |
|---|---|
| `404.html` | Añadir acceso claro a actividades y contacto; ahora es una salida fría. |
| `actividad-detalle.html` | Es una segunda ficha de kayak; unirla con `kayak-mar.html` para evitar contenido paralelo. |
| `actividades.html` | Conservar el catálogo, pero simplificar categorías y dejar visibles primero las experiencias con vínculo real de Diego o Águilas. |
| `agradecimiento-1-gmn.html` | Mantener la parte personal; enlazarla desde Formación sin repetir párrafos completos allí. |
| `alquiler.html` | Reducir el inventario con tarifas concretas mientras el alquiler no exista; usar familias de material como ejemplo. |
| `articulo-bautismo-buceo.html` | Añadir una vivencia o pregunta real de principiante; el formato actual es correcto pero genérico. |
| `articulo-kayak-aguilas.html` | Anclar el consejo en un tramo o situación reconocible de Águilas, con condiciones variables. |
| `articulo-primer-vuelo.html` | Explicar con una escena personal las diferencias entre modalidades; evitar que parezca una ficha de venta. |
| `audiovisual.html` | Mostrar qué historia quiere contar Diego antes de listar cámaras, marcas y packs. |
| `aviso-legal.html` | Mantener el marco académico y revisar que los términos comerciales se correspondan con las funciones reales de la web. |
| `base-campamento.html` | Separar visión a largo plazo de necesidades para el primer año; las cifras de inversión parecen demasiado cerradas sin supuestos visibles. |
| `bautismo-buceo.html` | Presentarlo como ejemplo de actividad futura y enlazar la guía editorial de bautismo. |
| `blog.html` | Publicar menos temas y más completos: una voz propia, fotos o experiencia, contexto local y fecha de revisión. |
| `btt-costera.html` | Añadir recorrido orientativo y esfuerzo explicado con lenguaje común, sin prometer ruta operativa. |
| `certificaciones.html` | Diferenciar visualmente titulaciones oficiales, itinerarios posibles e insignias internas; hoy se mezclan. |
| `coasteering.html` | Explicar mejor qué se haría y qué dependería del estado del mar, sin presentar saltos como garantizados. |
| `como-funciona.html` | Siete u ocho pasos son más de los necesarios; agrupar elección, preparación, experiencia y recuerdo. |
| `comunidad.html` | Quitar cupones, rankings y premios simulados en exceso; dejar un club pequeño y campañas editoriales creíbles. |
| `contacto.html` | Cambiar «Base operativa» y horarios no confirmados; convertir «Ver ubicación» en un enlace real a la sección informativa. Los iconos ya están actualizados. |
| `equipo.html` | Verificar o marcar como hipotéticos los especialistas, números y titulaciones; reducir perfiles a contribuciones claras. |
| `escuela.html` | Elegir dos o tres itinerarios de muestra y explicar qué formación real podría requerirse para impartirlos. |
| `faq.html` | Quitar respuestas que repiten avisos; priorizar dudas reales: estado actual, contacto, seguridad y alcance académico. |
| `formacion-gmn.html` | Evitar repetir Agradecimientos y Segundo GMN; usarla como entrada a ambas etapas. |
| `formularios.html` | Mostrar primero para qué sirve cada formulario; ocultar anexos técnicos hasta que el lector los necesite. |
| `fundador.html` | Preservar la cronología, que es material distintivo; añadir fotos autorizadas y una reflexión breve por hito. |
| `gracias.html` | Sustituir «Solicitud recibida» por «Simulación completada» si no existe envío real. |
| `grupos.html` | Reunir los tipos de grupo y el proceso en una propuesta sencilla con un ejemplo situado. |
| `guia-actividades.html` | Usarla como glosario que apoye al catálogo, evitando otra lista completa de experiencias. |
| `horizonte-nomada.html` | Reducir ideas futuras a hitos con criterio de viabilidad; demasiadas posibilidades simultáneas diluyen la dirección. |
| `index.html` | Acortar la portada de 31 secciones y abrir con la historia, el estado real y tres caminos claros. |
| `kayak-mar.html` | Convertirla en la única ficha de kayak; enlazar el artículo práctico y señalar la disponibilidad hipotética. |
| `logbook.html` | Mantener una única demostración y reducir XP, QR, retos e insignias que aparentan un producto funcionando. |
| `login.html` | Retirar formulario y mensajes de correo simulados mientras no haya autenticación real. |
| `material.html` | Distinguir material que Diego ya conoce o posee del catálogo aspiracional de marcas y equipos. |
| `multiaventura.html` | Dar un ejemplo de jornada coherente por tiempos y logística, en lugar de sumar disciplinas sin límite. |
| `naturaleza.html` | Aterrizar «mínimo impacto» en decisiones locales verificables; evitar promesas ambientales abstractas. |
| `naturistas.html` | Mantener el tono respetuoso; explicar el estado conceptual antes de mencionar frecuencia o espacios privados. |
| `open-water.html` | El título «DEMO» parece una titulación ofrecida; separar la formación personal de Diego de cursos futuros. |
| `packs.html` | Reducir combinaciones y lenguaje de venta; evitar «incluido» para servicios aún no contratados. |
| `paramotor.html` | Presentar el vuelo como posibilidad dependiente de operador y condiciones, no como servicio propio. |
| `parapente.html` | Conectar la ficha con el vuelo real del fundador y distinguirlo de una oferta presente. |
| `proyecto-academico.html` | Es la fuente clara del estado del proyecto; resumirla en la web pública y conservar el detalle aquí. |
| `proyecto-completo.html` | Funciona como segundo mapa del sitio; valorar fusionarlo con la navegación y Proyecto Académico. |
| `proyecto-intermodular.html` | Mantener la memoria extensa para evaluación; dar un resumen público de una pantalla con acceso al detalle. |
| `quienes-somos.html` | Cambiar «empresa con alma» por «proyecto nacido de…» y mostrar decisiones y personas reales. |
| `rapel.html` | Aclarar que la ficha es conceptual y evitar que el material técnico parezca una instrucción autónoma. |
| `reservas.html` | Llamarla simulador de solicitud en todo el recorrido; no pedir datos personales que no se van a tratar. |
| `segundo-gmn.html` | Mantener matrícula y profesorado confirmados; presentar expectativas y planes como tales. |
| `seguridad.html` | Priorizar cómo se decide cancelar, adaptar o derivar a un especialista, más que acumular protocolos teóricos. |
| `senderismo-guiado.html` | Incluir un ejemplo cercano de terreno, calor y distancia con ubicación comprensible. |
| `snorkel-aventura.html` | Describir un escenario mediterráneo concreto y qué condiciones cambian el plan. |
| `sostenibilidad.html` | Reemplazar declaraciones generales por dos o tres acciones observables y sus límites actuales. |
| `tecnologia.html` | Recortar marcas y funciones futuras; explicar qué herramienta mejora de verdad la experiencia. |
| `transparencia-financiacion.html` | Mostrar supuestos de cada cifra y enlazar con Base; evitar el efecto de presupuesto exacto sin operación. |
| `via-ferrata.html` | Aclarar dependencia de instalación, guía y condiciones, sin presentar disponibilidad actual. |
| `viajes.html` | Priorizar destinos con relación personal o razón estacional clara; el calendario global parece demasiado amplio. |
| `zonas.html` | Situar cada lugar con municipio/provincia, acceso orientativo y motivo para incluirlo. |

## Mejoras transversales

- La mayoría de páginas no tiene elemento HTML `main`. Añadirlo mejoraría navegación por teclado y lectores de pantalla.
- Hay CTAs decorativos: por ejemplo, «Ver ubicación» en Contacto parece accionable pero está en un `div`; Comunidad conserva al menos un enlace `href="#"`. Cada acción debe abrir algo real o dejar de parecer botón.
- Los avisos de «prototipo académico» son necesarios, pero repetidos como párrafo largo en muchas secciones entorpecen la lectura. Un aviso compacto, consistente y cerca de cada simulación bastaría.
- La imagen de Instagram entregada mide 5000 × 5000 píxeles y pesa unos 3,5 MB para mostrarse a 40 píxeles. Conviene crear una versión ligera conservando exactamente el diseño del logo.
- Revisaría la ortografía de «opciónal» y el uso mezclado de inglés comercial (por ejemplo, «Summer», «Weekend», «Outdoor content») donde una expresión española suene más natural.
- Antes de publicar testimonios, métricas de equipo, fotografías o certificaciones personales, verificaría atribución, permiso y fecha con Diego. Esta recomendación no cuestiona los hitos personales que él confirmó.

## Qué conservaría como identidad

La cronología del fundador, el origen en Águilas, la relación entre aventura y formación, el respeto al entorno y el proyecto intermodular. Ahí está la parte menos intercambiable de Nómada Extremo. Una web más corta y con escenas reales dejaría que esa identidad se notara más.
