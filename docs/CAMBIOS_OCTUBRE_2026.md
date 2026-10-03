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
