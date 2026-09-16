# Auditoría y plan · NÓMADA EXTREMO 3.0

Referencia: 14 septiembre 2026. Alcance: exclusivamente esta carpeta y el repositorio `diegodavidextremo/nomada-extremo`.

## A. Estado inicial

225 archivos, 61 páginas HTML. Web estática HTML/CSS/JavaScript sin proceso de compilación obligatorio. Las cuatro páginas de políticas heredadas redirigen al aviso legal. Se conservan todos los nombres de archivo y anclas existentes. El inventario y copia íntegra previos están en `%TEMP%/nomada-3-before-20260914`.

- `styles.css`: sistema heredado y numerosas ampliaciones; no se seguirá acumulando ahí la renovación.
- Hojas específicas: Formación GMN, segundo, Escuela, equipo, packs, naturismo, viajes, Base, Horizonte, selector, búsqueda y recorridos del ecosistema.
- `components.js`: cabecera, pie, aviso, accesibilidad y carga dinámica de búsqueda, idiomas, recorridos y animaciones.
- `global-search.js`: reemplaza el menú inicial; es el origen efectivo de los grupos de navegación. Mantiene buscador local y traducciones propias.
- `main.js`: fichas, catálogo, formularios y modales. Tiene cambios del usuario previos, que se conservan.
- `i18n.js`: seis catálogos locales, observador de DOM, metadatos y persistencia. Los metadatos antiguos pueden restaurar títulos obsoletos después de cargar la página. Respeta `translate="no"` para texto, pero necesita aplicar esa exclusión también a atributos.
- `horizonte-nomada.json` y su JS generado: catálogo futuro independiente que se conserva.
- `formacion-gmn.html`: contiene el agradecimiento de primero y una copia completa del antiguo segundo; riesgo de desincronización.
- `proyecto-intermodular.html`: resumen útil (problema, público, servicios, seguridad, documentos, recursos, sostenibilidad, tecnología, DAFO y roadmap), sin datos de matrícula ni evidencias.
- `segundo-gmn.html`: expectativas anteriores al inicio; falta Fase de Empresa II, códigos y profesorado.

## B. Hallazgos y riesgos

Aviso global, portada, fundador, reservas, cómo funciona y marco académico presentan primero como estado actual. Los recuerdos de primero y expectativas del agradecimiento son históricos válidos y se contextualizan, no se reescriben. Los prototipos comerciales necesitan identificación visible cerca de precios, reseñas y acciones. No se acreditan seguros, compras, acuerdos ni resultados.

La auditoría estática inicial de la web aislada pasa 61 páginas. No verifica ejecución, anclas entre documentos, datos académicos ni responsive real. La prueba antigua de idiomas depende de Playwright instalado externamente. Hay cambios previos en `main.js` e `i18n/validation-report.json`; no se revierten. Recursos propios, naturismo, Base, Horizonte, Viajes, Escuela y Logbook permanecen.

## C. Plan técnico

1. Fuente única `assets/data/gmn-2026-2027.json`: matrícula literal aportada por el propietario, relaciones propuestas, estados explícitos, evidencias inicialmente vacías y una entrada de apertura de curso.
2. Generador pequeño con Node estándar: produce bloques HTML estáticos identificados por marcadores en intermodular, segundo, Formación y portada. Los datos se mantienen en JSON; CI detecta bloques desactualizados. Sin dependencia de red o JavaScript para leer los módulos.
3. Memoria central editorial con índice, matriz filtrable, diez capítulos académicos, bienestar animal, operaciones, plantillas vacías, indicadores sin cifras ficticias y modo defensa sobre los mismos capítulos.
4. Design system compatible, hoja intermodular y modernización compartida progresiva; conservar Bebas Neue, DM Sans, mar, arena y fotografías.
5. Actualización dirigida del estado académico, contexto histórico, etiquetas Presente/Prototipo/Futuro y navegación accesible.
6. Validación estática ampliada, pruebas de navegador en los 16 anchos solicitados, seis idiomas y funcionamiento del modo defensa, filtros, menú, búsqueda y páginas principales. Documentar resultados y límites reales.

No se publica ni se realiza ninguna operación comercial con esta actualización local.
