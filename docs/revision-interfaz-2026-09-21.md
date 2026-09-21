# Revisión de interfaz · 21 de septiembre de 2026

## Valoración de las 21 capturas

| Captura | Diagnóstico | Cambio aplicado |
|---|---|---|
| 1 | Filtros con demasiado espacio y títulos repetidos. | Panel compacto, plegado inicialmente, con contador y limpieza. |
| 2 | El índice fijo ocupa la pantalla del móvil. | Índice desplegable en el flujo normal; desaparece al bajar. |
| 3 | El catálogo español sobrescribe la Ó con un interrogante. | Corrección del catálogo y actualización de su versión de caché. |
| 4 | Artículo de saltos con título desproporcionado y lectura plana. | Título contenido, apartados, lista práctica y conclusión. |
| 5 | Artículo de montaña demasiado breve y sin jerarquía. | Ampliación y estructura editorial, también en los otros tres artículos destacados. |
| 6 | Nombres mezclados entre idiomas y lugares sin contexto. | Mar Rojo y referencias geográficas en el calendario español. |
| 7 | Seis botones abren información genérica repetida. | Retirada de fichas técnicas de tarjetas de proceso. |
| 8 | Contadores de evidencias añaden mantenimiento innecesario. | Retirados de módulos, matriz y resumen. |
| 9 | Sección de evidencias y bitácora sin utilidad para el autor. | Retiradas de las páginas y de sus plantillas generadoras. |
| 10 | La abreviatura WA empobrece el botón. | Icono de WhatsApp aportado por el autor. |
| 11 | Perfil oscuro ilegible y nota demasiado pegada. | Nombre blanco, ID destacado, separación y progreso etiquetado. |
| 12 | Dos perfiles presentan prácticamente la misma información. | Un único perfil en el logbook, sin maqueta de teléfono duplicada. |
| 13 | Fichas genéricas también en Cómo funciona. | Pasos legibles sin botones repetitivos. |
| 14 | Hangar sin estructura visual. | Paneles desplegables con espaciado y jerarquía. |
| 15 | Campamento parece una lista de párrafos. | Cuadrícula de tarjetas adaptable al móvil. |
| 16 | Modalidades de alquiler difíciles de comparar. | Tarjetas separadas, títulos y lectura ordenada. |
| 17 | Texto blanco sobre la tabla blanca. | Colores explícitos para cabeceras y celdas. |
| 18 | Seleccionar el texto confirma el fallo de contraste. | Tabla visible sin seleccionar, con bordes y espaciado. |
| 19 | Todos los canales de contacto tienen la misma importancia. | WhatsApp y correo destacados; tarjetas más legibles y logo real. |
| 20 | Buenas imágenes, pero demasiada densidad alrededor. | Más espacio, texto mayor y tres columnas en escritorio. |
| 21 | Tarjetas estiradas, huecos grandes y packs difíciles de leer. | Cuadrícula adaptable, tarjetas sin estiramiento y tipografía normal en packs. |

También se ha quitado el enlace histórico suelto de Formación GMN. Comunidad presenta un acceso al logbook único en lugar de otro perfil con cifras distintas. Los filtros de viajes ahora se pueden plegar.

## Decisiones de funcionamiento

Los filtros de actividades conservan medio y nivel. Se han retirado las dimensiones que el código deducía de palabras sueltas del texto y que no ofrecían datos fiables por actividad. Las familias sin coincidencias se ocultan y vuelven al limpiar los filtros.

Las fichas técnicas se conservan en las actividades. Los pasos de un proceso ya explican su contenido en la propia tarjeta y no necesitan una ficha genérica. Cerrar un diálogo mantiene la posición de lectura y devuelve el foco al botón de apertura.

Las antiguas anclas académicas se conservan ocultas por compatibilidad con enlaces antiguos; los bloques de seguimiento y sus entradas ya no aparecen. El archivo de datos original se mantiene para evitar pérdida de información.

El artículo de buceo y vuelo enlaza la referencia de [DAN](https://dan.org/health-medicine/health-resources/diseases-conditions/flying-after-diving/); no establece un intervalo médico individual ni convierte recomendaciones de aviación comercial en reglas para cualquier deporte aéreo.

## Verificación y alcance

- Auditoría estática de las 61 páginas y de sus enlaces y recursos locales.
- Recorrido de las 57 páginas no redirigidas en navegador y pruebas de tamaños entre 320 y 1920 píxeles.
- Pruebas de filtros, restauración de desplazamiento, cierre con Escape, foco, artículos y perfil único.
- Capturas de escritorio y móvil de catálogo, base, flota, contacto, comunidad y logbook.
- Comprobación de que el chatbot, los formularios de demostración y la trayectoria oculta de Nuria conservan su comportamiento.

La emulación se realiza con Chromium/Edge. No equivale a una prueba en dispositivos físicos Android o iPhone ni a una certificación completa de accesibilidad. El detector de contraste también señala numeración decorativa y fondos con imágenes o degradados que requieren interpretación visual.

## Simplificación que recomendaría después

Mantener Logbook como página única de perfil y progreso, y Comunidad para club y campañas. La siguiente reducción útil sería reunir cupones, campañas y retos en menos bloques dentro de Comunidad: aún es una página larga. Evitaría unir Formación GMN con la memoria intermodular, porque cumplen funciones distintas.
