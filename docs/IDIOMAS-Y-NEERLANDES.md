# Selector de idiomas y neerlandés

La cabecera compartida ofrece ES, EN, FR, DE, IT, PT y NL. Cada botón selecciona una traducción y abre la representación geográfica de su idioma. La bandera no crea una variante regional del contenido.

Los nombres de países se generan en el idioma de la lista con `Intl.DisplayNames`. Las regiones sin código ISO propio llevan nombres revisados explícitamente. El inglés incluye England, Scotland, Wales y Northern Ireland en un grupo separado del United Kingdom. España sigue primero en español. Las listas son una representación ampliada de uso oficial o predominante, con los territorios y casos regionales diferenciados; no constituyen un censo de todos los hablantes.

- Datos editables: `tools/language-region-source.json`.
- Generación: `node tools/build-language-regions.js`.
- Datos del navegador: `assets/data/language-regions.json`.
- Banderas locales: `assets/images/flags/`, procedentes de flag-icons 7.2.3 bajo licencia MIT, conservada en esa carpeta.
- Referencia para neerlandés: [Taalunie](https://taalunie.org/over-de-taalunie-/wie-wij-zijn).

La traducción neerlandesa parte del catálogo inglés existente, con el modelo local Argos/OpenNMT `translate-en_nl-1_8`. No se enviaron textos del proyecto a una API de traducción. Se añadieron las copias de los componentes interactivos, un glosario y correcciones editoriales para navegación, precios, fechas, datos técnicos, avisos y mensajes del asistente. Los números se contrastan con el texto fuente. Es una traducción automática con revisión de los elementos señalados; no se presenta como una revisión lingüística profesional de cada frase.

Los originales de imágenes, documentos personales y evidencias académicas conservan su contenido. La marca NÓMADA EXTREMO, los nombres propios y los identificadores técnicos se preservan.

Preparación reproducible del catálogo:

1. `node tools/prepare-dutch-translation.js` prepara el inventario local de textos.
2. `tools/translate-dutch-offline.py` usa el modelo y las dependencias locales suministrados en su argumento de carpeta.
3. `node tools/apply-dutch-translation.js` aplica la migración del catálogo y las copias de la revisión original 3c98a84; no debe usarse para sobrescribir futuros cambios de esos componentes.
4. `node tools/refine-dutch-editorial.js` aplica las correcciones de `tools/dutch-editorial-overrides.json` y conserva las cifras originales.

La traducción incluye el asistente local en neerlandés, con algunas correspondencias de búsqueda para términos habituales. No añade IA generativa ni envía conversaciones. Las otras versiones del asistente mantienen su comportamiento anterior en español.

Validación: siete idiomas en siete tamaños del selector, carga de todas las banderas, nombres nativos, cierre con Escape y foco; cobertura neerlandesa de las 61 rutas; funciones del selector de actividades y respuesta prudente del asistente a una consulta sobre duiken en vliegen. La auditoría general mantiene sus comprobaciones de navegación, marca y documentación.
