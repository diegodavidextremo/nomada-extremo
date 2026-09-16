# NÓMADA EXTREMO 3.0 · Etapa Intermodular

Inicio académico: **14/09/2026**. Implementación y validación: **16/09/2026**.

## Qué cambia

La web pasa a presentar **2.º GMN · curso 2026-2027** como etapa actual, con una memoria central en `proyecto-intermodular.html`. Conserva el carácter de proyecto académico no operativo: no hay reservas, cobros, ventas ni servicios comerciales reales.

La memoria tiene 19 capítulos: resumen; tres estados; problema y propuesta; públicos y servicios; ecosistema; matriz; diez módulos; bienestar animal; seguridad; recursos y logística; inventario; tecnología y audiovisual; documentación; sostenibilidad medible; viabilidad y DAFO; roadmap; evidencias; bitácora; conclusiones y anexos. Incluye navegación interna, filtros, explorador económico didáctico, impresión y modo defensa.

`segundo-gmn.html` muestra el curso activo, matrícula literal, docentes, inicio, bitácora y evolución. Las expectativas originales se conservan en un desplegable histórico. Formación GMN conserva la memoria y agradecimientos de primero, añade contexto editorial y sustituye la copia antigua de segundo por un resumen generado desde la misma fuente de datos.

La portada da acceso prioritario a la nueva etapa, a la memoria y a Presente / Prototipo / Futuro. Ocho explicaciones secundarias se pueden desplegar; sus contenidos y anclas siguen disponibles. Se conserva el selector de aventuras y la fotografía original.

## Qué se conserva

- Los 225 archivos de partida, todos los nombres de página y todas las anclas originales.
- Fotografías, identidad, Bebas Neue, DM Sans, colores mediterráneos y páginas especializadas.
- Naturismo, Base y Campamento, Horizonte Nómada, Viajes, Escuela, Logbook, catálogos, fichas y traducciones existentes.
- El historial Git y los cambios locales anteriores a esta intervención. `i18n/validation-report.json` se conserva íntegro como informe anterior, no como resultado de esta validación.
- NOMADX, NomadaExtremoAndroid y los demás proyectos independientes no forman parte de la modificación.

Se conserva una copia previa completa e inventario de hashes en `%TEMP%/nomada-3-before-20260914`. La comprobación de preservación está en `tools/reports/preservation-stage3.json`.

## Arquitectura

La web sigue siendo estática, compatible con GitHub Pages y sin framework nuevo. No necesita Node en producción.

| Archivo | Responsabilidad |
|---|---|
| `assets/data/gmn-2026-2027.json` | Fuente única de matrícula, etapa, fechas, módulos, aplicaciones propuestas, evidencias, bitácora e hitos |
| `tools/build-gmn.js` | Genera HTML estático legible sin JavaScript a partir de los datos y plantillas |
| `tools/templates/intermodular.html` | Contenido editorial de los 19 capítulos |
| `tools/templates/segundo-historico.html` | Expectativas originales, expresamente históricas |
| `assets/css/design-system.css` | Tokens y componentes compartidos compatibles con la web existente |
| `assets/css/intermodular.css` | Diseño editorial, matriz, capítulos, responsive, impresión y defensa |
| `assets/js/intermodular.js` | Filtros, índice, cálculo didáctico y modo defensa |
| `assets/js/stage3.js` | Identificación multilingüe de estados, demostraciones y enlaces a contenido desplegado |
| `assets/data/templates/*.json` | Nueve fichas vacías para desarrollar el trabajo académico |
| `tools/audit-stage3.js` | Validación estática, archivos, anclas, datos, idiomas, sintaxis y sincronización |
| `tools/browser-stage3.js` | Navegador, responsive, consola, idiomas, controles y capturas |
| `.github/workflows/validate.yml` | Validación al hacer push, pull request o ejecución manual; no despliega la web |

El generador escribe las páginas intermodular y segundo completas. En portada y Formación solo actualiza los bloques delimitados por `<!-- gmn:...:start -->` y `<!-- gmn:...:end -->`. El resto de esas páginas mantiene su edición independiente. **No editar a mano el interior de los bloques generados.**

Tras cambiar datos o plantillas:

```sh
node tools/build-gmn.js
node tools/audit-stage3.js
node tools/responsive-accessibility-audit.js --summary
```

La opción `node tools/build-gmn.js --check` comprueba la sincronización sin escribir. CI falla si los datos y el HTML publicado no coinciden. Deben guardarse juntos en Git los datos, plantillas y HTML generado.

## Fuente y significado de los datos

Los códigos, nombres y docentes proceden exclusivamente de la matrícula aportada por Diego David Gómez García en el encargo. No se han deducido de otro centro ni de un currículo genérico. Hay nueve módulos y Fase de Empresa II, diez áreas en total. `OAF03` es la optativa. El docente de `1342B` permanece como `null`: «Profesor actualmente no indicado».

Los campos `knowledge`, `decision`, `application`, `evidencePlan` y `result` describen **propuestas de trabajo y resultados esperados**, no competencias ya adquiridas. La política ecuestre es una propuesta académica para revisión. No hay acuerdos con centros ecuestres, inventario adquirido ni prácticas inventadas.

`updatedAt` del proyecto indica la actualización de la memoria. El de cada módulo indica la revisión de su ficha. No se usa la fecha del navegador para aparentar actualizaciones que no han sucedido.

## Actualizar un módulo o un profesor

1. Abrir `assets/data/gmn-2026-2027.json` y localizar el código en `modules`.
2. Mantener el código como **cadena de texto** para conservar sus ceros iniciales.
3. Cambiar `teacher` solo con una asignación confirmada; conservar `null` si no está indicada.
4. Revisar `status`, aplicaciones y resultados; actualizar `updatedAt` y dejar constancia de la fuente en la bitácora.
5. Ejecutar el generador y las auditorías.

Los estados deben describir el trabajo real: «En desarrollo», «Por definir», «Pendiente de revisión», etc. Cambiar el estado no acredita una competencia. La auditoría avisa si un docente difiere de la matrícula inicial para que se compruebe su fuente; no obliga a conservar una asignación que haya cambiado realmente.

## Añadir evidencias

Usar `assets/data/templates/evidencia.json` como guía y añadir un objeto a `evidence` en el archivo de datos principal. La plantilla descargada es una ficha vacía, no se importa automáticamente.

Campos: `id` único, `title`, `date` ISO, `moduleCodes` (uno o varios códigos existentes), `author`, `url`, `demonstrates`, `status` y `publicationAuthorized`. Enlazar un archivo local existente o una fuente accesible. Publicar solo documentación con autoría y difusión autorizadas; no incluir datos personales sensibles ni material de terceros sin permiso.

La matriz cuenta las evidencias vinculadas a cada módulo. Los KPIs cuentan módulos con evidencias, entradas de bitácora y evidencias con estado exacto `Revisada`. **Ninguno equivale a una nota, porcentaje de progreso académico o competencia superada.** Una evidencia compartida puede estar vinculada a varios módulos; el total general sigue contando registros únicos.

Actualmente `evidence` está vacío. La web construida no se contabiliza automáticamente como práctica acreditada.

## Añadir una entrada de bitácora

Copiar la estructura de `assets/data/templates/bitacora.json` a `journal`. Usar un `id` único, fecha y descripción real. Registrar módulos, docente, lugar, actividad, objetivo, materiales, conocimientos, aprendizaje, dificultad, incidencias, reflexión, aplicación y elementos modificados. Usar `null` o listas vacías para información no aportada.

`photos` admite objetos con `src`, `alt` y `caption`; los archivos deben existir y tener difusión autorizada. `video` contiene una URL o `null`. `evidenceIds` referencia identificadores existentes en `evidence`. `tags` permite clasificar las entradas. Tras generar, el registro aparece en la memoria y en segundo desde la misma fuente.

La única entrada inicial recoge el inicio de curso del 14/09/2026. No acredita una salida, práctica, evaluación o actividad concreta.

## Plantillas de trabajo

- `epi.json`: identificación, fabricante, modelo, serie, adquisición, puesta en servicio, vida útil, revisiones, incidencias e historial de retirada.
- `perfil-fisico.json`: exigencia, entorno, pausas y adaptación de una actividad; no es una ficha médica.
- `incidente.json`: estructura documental para hechos, comunicaciones, recursos y revisión; no contiene instrucciones de rescate.
- `tiempo-libre.json`: objetivos, edades, inclusión, secuencia, recursos y evaluación.
- `fase-empresa.json`: empresa, periodo, profesor, actividades, competencias, aprendizajes y observaciones por confirmar.
- `indicador.json`: valor ambiental, unidad, fuente, periodo, método y limitaciones.
- `economia.json`: partidas y escenarios sin importes ficticios.
- `evidencia.json` y `bitacora.json`: modelos de registro académico.

Las fichas de trabajo no se suben ni guardan desde la web. Para convertirlas en evidencia, hay que cumplimentarlas, revisarlas y enlazarlas expresamente en los datos principales.

## Presente / Prototipo / Futuro

Presente identifica trayectoria y formación. Prototipo identifica catálogo, tarifas, reseñas, roles, sistemas y procesos de demostración. Futuro identifica ideas, estudios e infraestructura sin implantación confirmada. Las etiquetas utilizan texto y símbolos, además de color.

El aviso completo permanece en el pie. La cabecera usa una versión breve que mantiene visibles el carácter no operativo y el curso actual. La altura del menú se calcula a partir del aviso para evitar que se superpongan en móvil.

Se mantienen los ejemplos comerciales para estudiar su funcionamiento, con identificación visible. Las acciones exactas «Reservar» y «Comprar» se sustituyen por expresiones de simulación donde correspondía. Las reseñas de ejemplo no se presentan como opiniones verificadas. El formulario de reseña de portada funciona localmente: no publica, guarda ni envía. El contacto simulado deja de mostrar «Enviado» como si hubiera una transmisión real.

## Modo defensa

«Activar modo defensa» muestra un capítulo cada vez usando el contenido de la propia memoria. Incluye anterior/siguiente, selector de capítulo, contador, progreso del recorrido y pantalla completa opcional. Flechas izquierda/derecha, PageUp/PageDown, Home/End y Escape funcionan fuera de los controles de entrada. Los selectores e inputs conservan su teclado nativo.

Salir restaura el contenido, el foco y la posición previa. No se duplica la memoria en diapositivas. El progreso indica capítulos recorridos, no avance académico. En móvil, el capítulo puede desplazarse verticalmente y los controles permanecen accesibles. Se respeta `prefers-reduced-motion`. La impresión muestra todos los capítulos.

## Design system y navegación

Los nuevos tokens centralizan colores, espacios, radios, sombras, lectura y altura de cabecera. Componentes: botones, estados, paneles, estadísticas, tablas, notas, formularios, acordeones y listas. La hoja intermodular contiene la matriz, cronología y controles de defensa. `styles.css` no recibe otra ampliación extensa.

La navegación efectiva está en `global-search.js`, porque ese módulo reconstruye el menú inicial de `components.js`. Grupos: Experiencias, Aprender, Preparar, Proyecto y Marca, más Inicio y Contacto. En móvil se usan `details/summary`, con accesos directos a segundo y a la memoria. La búsqueda admite ambos destinos. Se conserva el cierre de menú tras reconstruirlo y la navegación por teclado.

## Idiomas

ES, EN, FR, DE, IT y PT siguen disponibles y mantienen la preferencia entre páginas. Se actualizan metadatos académicos, avisos y nuevas etiquetas compartidas. La memoria, las fichas académicas y los resúmenes nuevos se presentan expresamente **en español**, con `lang="es"` y `translate="no"`, para no mezclar traducciones automáticas con la matrícula y los contenidos nuevos.

Los catálogos originales se conservan, incluidos textos históricos o claves que ya no se usan. Su presencia no significa que la web siga presentando primero como el curso actual. La validación distingue el contenido histórico mediante `data-history`. No se afirma una traducción integral nueva de la memoria a cinco idiomas.

## Verificación

Resultados detallados en `tools/reports/browser-stage3.json` y `tools/reports/preservation-stage3.json`. Se verifican:

**Resultado final del 16/09/2026:** 61 páginas en auditoría estática, sin errores ni avisos; 327 comprobaciones de viewport; 72 comprobaciones de idioma; 11 grupos de pruebas de interacción. Cero errores de JavaScript, errores de consola o recursos locales fallidos detectados en estas pruebas. Las cuatro redirecciones legales heredadas también se comprueban en navegador. El informe estático está en `tools/reports/static-stage3.json`.

- Las 61 páginas con auditoría estática: archivos, anclas, H1, viewport, imágenes, etiquetas, JSON, sintaxis y metadatos académicos.
- Las páginas de contenido en navegador y los 16 anchos solicitados para doce páginas principales; móvil, tablet y escritorio para el resto.
- Seis idiomas, matriz, filtro sin resultados, cálculo económico válido y sin margen, menú móvil, búsqueda, modo defensa y contenido sin JavaScript.
- Conservación de todos los archivos originales, anclas e imágenes; informe de idiomas anterior preservado.

La revisión visual añadió comprobaciones de solapamiento: el aviso no tapa los botones ni el encabezado de portada, el menú móvil queda pulsable y los controles de defensa permiten llegar al final del capítulo. La reseña de demostración se verifica con cero peticiones POST. El menú de escritorio se abre con flecha abajo y se cierra con Escape, restaurando el foco.

Las capturas se generan en `tools/reports/` y no se añaden al repositorio por defecto. El informe describe comprobaciones automatizadas y revisión visual, **no una certificación WCAG ni pruebas en dispositivos físicos**. El navegador local utilizado es Microsoft Edge mediante Playwright; CI prepara Chromium en Linux.

## Fuentes normativas y límites

La memoria enlaza el BOE (Ley de Turismo de Murcia), el portal UAS de AESA y orientación de la AEPD como puntos de estudio consultados el 14/09/2026. No afirma que se hayan validado permisos, coberturas, instalaciones o requisitos para operar. La normativa deberá contrastarse cuando se concrete una actividad.

Pendientes académicos reales: prácticas, evidencias, revisión docente, mediciones ambientales, presupuestos contrastados, empresa y periodo de Fase de Empresa II, fecha de defensa y viabilidad. No son fallos técnicos que deban rellenarse con datos inventados.

Esta entrega realiza cambios locales. No se ha publicado en GitHub Pages. El workflow se ejecutará cuando los cambios lleguen a GitHub; no se presenta como una ejecución remota ya completada.
