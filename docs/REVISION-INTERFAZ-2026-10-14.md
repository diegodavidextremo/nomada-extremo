# Revisión de interfaz del 14 de octubre

Cambios aplicados a las zonas de las catorce capturas:

- **Inicio:** reseñas con una presentación consistente, desplegables y garantía con mejor jerarquía, cierre «Hablemos» dividido entre explicación y acciones.
- **Catálogo:** doce fichas destacadas con fotografías existentes, botones alineados, territorio organizado en nueve tarjetas y rutas locales con grupos visuales diferenciados. Vista previa naturista con una ilustración decorativa que no se presenta como un lugar real.
- **Fichas individuales:** retirada de la capa oscura que hacía ilegible el diseño claro, información técnica compacta y seis paneles equilibrados. La regla compartida beneficia a las páginas con `site-activity`.
- **Fotografías del catálogo:** proporción 3:2 y encuadre completo, evitando recortar cometas, alas y otros elementos del equipo. No se han regenerado las fotografías.
- **Naturistas:** nueva cabecera con una fotografía de referencia ya existente y sus créditos; cinco valores legibles sin depender de animaciones; frecuencia mensual coherente, expresamente planteada dentro del proyecto académico y sin calendario operativo.
- **Pie compartido:** mayor presencia del emblema, navegación y aviso académico diferenciados, directorio y enlaces sociales más claros.

La hoja `assets/css/editorial-interface.css` se carga mediante el componente compartido. Las páginas actualizan la versión de ese componente para invalidar la caché anterior. Las correcciones de texto se mantienen en los siete idiomas mediante `tools/localize-october-interface.js`.

## Validación

- `test-october-interface.js`: capturas de móvil y escritorio, encuadre completo de kitesurf, contraste del título, seis paneles técnicos, cinco valores visibles, frecuencia y traducciones sin desbordamiento.
- `browser-stage3.js`: 327 comprobaciones de tamaño, 72 comprobaciones de idioma y 11 interacciones, sin errores.
- `test-adventure-story.js`: reseñas, consentimiento, previsualización local segura y enlaces de packs.
- `test-brand-interface.js`: dimensiones del emblema y controles en seis tamaños.
- `test-interface-review.js`: filtros del catálogo y ventanas técnicas.
- Auditorías estáticas: 61 páginas sin errores de estructura o enlaces; datos académicos y HTML sincronizados.

Las fotografías de referencia y las reseñas editoriales conservan sus avisos. Se mantienen los datos técnicos, las normas de consentimiento y privacidad, y el carácter no operativo del proyecto.
