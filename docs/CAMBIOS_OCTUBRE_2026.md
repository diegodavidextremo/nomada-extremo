# Cambios de octubre de 2026

Punto de restauración remoto: `antes-cambios-2026-10-03`.

## Fuentes de traducción localizadas antes de editar

- `i18n/{es,en,fr,de,it,pt}.json`: claves explícitas, metadatos y catálogo de cadenas; aplicación en `assets/js/i18n.js` y `window.noextTranslate`.
- Atributos `data-i18n`, `data-i18n-*` de los HTML y textos de componentes compartidos en `assets/js/components.js`.
- `assets/js/stage3.js`: diccionarios de estados académicos, mediante `data-n3-copy`.
- `assets/js/horizonte-nomada-copy.js`: diccionarios de Horizonte y frases dinámicas.
- `assets/data/horizonte-nomada-data.js`, `assets/data/horizonte-nomada.json`: datos y textos de Horizonte.
- `assets/js/main.js`: fichas y diálogos técnicos que usan el catálogo global.
- `assets/js/equipo.js`: diálogos profesionales y textos generados.
- `assets/js/viajes.js`, `horizonte-nomada.js`, `adventure-selector.js`, `ecosystem-pathways.js`, `faq-premium.js`, `filters.js`, `global-search.js`: contenidos dinámicos y cambios de idioma.
- `assets/js/chatbot.js` y `assets/data/assistant-index.json`: asistente editorial e índice generado. El asistente existente declara que responde en español.
- `i18n/source-catalog.json`, `tools/extract-i18n-catalog.js`, `translate-i18n-catalog.py`, `finalize-i18n-catalog.py`: catálogo fuente y herramientas de mantenimiento.

## Contenido protegido

Se conservan la línea Nómada Naturista, los datos de contacto, precios, reseñas y sus avisos salvo las sustituciones solicitadas, las tarjetas directivas y la historia del fundador salvo la cita aprobada. Las versiones de recursos compartidos se actualizan para evitar caché.

Excepción confirmada por el autor: sustituir únicamente Clara Vidal por el puesto de coordinación de experiencias naturistas y bienestar outdoor en naturistas.html, conservando el resto de la línea.

## Resultado y validación

- Insignias en las tarjetas de actividad, familias, packs y fichas; las combinaciones técnicas se asignan a centro especializado. Las páginas de base, Horizonte y viajes muestran la previsión futura.
- Doce puestos profesionales y cuatro perfiles en portada, con requisitos orientativos, funciones, protocolos resumidos y diálogos que conservan los protocolos completos.
- SSI en todos los contenidos activos, reseñas y responsables actualizados, sol sin cifra no acreditada y cita del fundador en seis idiomas.
- Portada móvil con temporadas, reseñas e historias plegables, familias y puestos en desplazamiento horizontal y tres fichas iniciales con «Ver más». Se conservan las anclas y el contenido.
- Recursos modificados versionados con `20261003-1`; generador académico e índice del asistente sincronizados.
- Auditoría estática: 61 páginas, sin errores ni avisos.
- Validación general de idiomas: 535 controles, sin fallos.
- Navegador general: 327 comprobaciones de tamaño, 72 de idioma y 11 interacciones, sin errores de consola.
- Auditoría responsive y accesibilidad: 61 páginas, 16 anchos entre 320 y 1920 px, sin incidencias.
- Pruebas específicas de octubre: 390, 768 y 1366 px; seis idiomas, perfiles profesionales, expansión de fichas, anclas, contraste inicial y ausencia de solapamiento con el aviso o WhatsApp. Se comprueban precios, contactos y contenido protegido frente a la etiqueta original.
- Altura inicial de la portada a 390 px: aproximadamente 44.441 px antes y 33.831 px después (reducción del 24 %), sin borrar contenido.

Los informes quedan en `i18n/validation-report.json` y `tools/reports/`. `tools/test-october.js` requiere un servidor local en el puerto 8765 (o `NOEXT_BASE_URL`), Playwright y la etiqueta de restauración. En otros equipos se pueden indicar `NOEXT_BROWSER` y `NOEXT_GIT`.
