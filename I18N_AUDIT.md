# Auditoría multidioma de Nómada Extremo

Fecha: 15 de junio de 2026

## Cobertura

- Idiomas: español, inglés, francés y alemán.
- Páginas HTML revisadas: 52.
- Fragmentos públicos catalogados: 5.914.
- Cobertura de catálogo: 5.914 entradas en cada idioma.
- Se incluyen textos estáticos, contenido generado por JavaScript, metadatos y atributos visibles como `placeholder`, `title`, `aria-label` y `alt`.

## Funcionamiento

- El idioma seleccionado se conserva en `localStorage` con la clave `noext-language`.
- El motor aplica traducciones al contenido inicial y observa contenido dinámico mediante `MutationObserver`.
- El español actúa como idioma de respaldo cuando falta una traducción.
- Los catálogos usan versión de caché para evitar descargas repetidas y permitir futuras actualizaciones controladas.
- Los nombres de marca, personas, organismos, códigos de idioma, correos y lugares propios se mantienen sin traducir.

## Validación automática

- Comprobaciones ejecutadas: 156 combinaciones, correspondientes a 52 páginas por 3 idiomas de destino.
- Textos ausentes: 0.
- Desbordamientos horizontales a 390 px: 0.
- Errores de consola o recursos 404: 0.
- Se corrigieron dos rutas de imagen antiguas en `login.html` y `rapel.html`.

## Mantenimiento

- `tools/extract-i18n-catalog.js`: reconstruye el catálogo de textos públicos.
- `tools/translate-i18n-catalog.py`: genera traducciones iniciales por lotes.
- `tools/finalize-i18n-catalog.py`: restaura marca y aplica terminología editorial controlada.
- `tools/validate-i18n.js`: valida cobertura, idioma activo, consola y desbordamiento móvil.

Después de añadir o modificar contenido visible, se debe regenerar el catálogo, revisar editorialmente las traducciones y volver a ejecutar la validación.
