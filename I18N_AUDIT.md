# Auditoría multidioma de Nómada Extremo

Fecha: 15 de junio de 2026

## Cobertura

- Idiomas: español, inglés, francés, alemán, italiano y portugués europeo.
- Páginas HTML revisadas: 52.
- Fragmentos públicos catalogados: 6.581.
- Cobertura de catálogo: 6.581 entradas base con traducción disponible en los cinco idiomas de destino.
- Se incluyen textos estáticos, contenido generado por JavaScript, fichas técnicas dinámicas, metadatos y atributos visibles como `placeholder`, `title`, `aria-label` y `alt`.

## Funcionamiento

- El idioma seleccionado se conserva en `localStorage` con la clave `noext-language`.
- El motor aplica traducciones al contenido inicial y observa contenido dinámico mediante `MutationObserver`.
- Las fichas técnicas traducen tanto sus etiquetas como sus valores específicos antes de abrir el modal.
- El español actúa como idioma de respaldo cuando falta una traducción.
- Los catálogos usan versión de caché para permitir actualizaciones controladas.
- Los nombres de marca, personas, organismos, códigos de idioma, correos y lugares propios se mantienen sin traducir.

## Validación automática

- Comprobaciones ejecutadas: 550.
- Cobertura: 52 páginas y 58 fichas técnicas dinámicas por cada uno de los cinco idiomas de destino.
- Textos ausentes o etiquetas españolas residuales en fichas dinámicas: 0.
- Modales vacíos o incompletos: 0.
- Desbordamientos horizontales a 390 px: 0.
- Errores de consola: 0.
- Persistencia de idioma entre páginas comprobada manualmente.

## Mantenimiento

- `tools/extract-i18n-catalog.js`: reconstruye el catálogo, incluyendo contenido oculto y fichas técnicas dinámicas.
- `tools/translate-i18n-catalog.py`: genera traducciones iniciales por lotes para los cinco idiomas de destino.
- `tools/finalize-i18n-catalog.py`: restaura marca y aplica terminología editorial controlada.
- `tools/validate-i18n.js`: valida en paralelo cobertura, idioma activo, modales, consola y desbordamiento móvil.

Después de añadir o modificar contenido visible, se debe regenerar el catálogo, revisar editorialmente las traducciones y volver a ejecutar la validación.
