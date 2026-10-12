# Fotografías de actividades

Las imágenes ilustrativas están en `assets/images/activities-2026/`, con un archivo por modalidad. `generation-manifest.json` registra el nombre de la actividad, el prompt, la ruta y la procedencia generada. No documentan salidas realizadas ni proveedores concretos.

Para sustituir una fotografía por una propia, conserva el nombre del archivo correspondiente y usa WebP en formato horizontal, preferentemente 3:2 y al menos 1440 píxeles de ancho. La web muestra el encuadre completo en las fichas. Si la imagen tiene otra proporción, aparecerán márgenes en lugar de recortar personas o material.

Actualiza también el texto alternativo para describir la imagen real y su procedencia. En el manifiesto puedes anotar autor, fecha, lugar y autorización. Evita publicar personas sin permiso o localizaciones sensibles. Cambia la versión del recurso cuando publiques una sustitución para que el navegador actualice su copia.

Después de cambiar una foto principal, ejecuta `node tools/responsive-activity-images.js` para regenerar su variante ligera de 640 píxeles. Así el móvil mostrará también tu fotografía nueva. Las variantes terminadas en `-640.webp` se crean automáticamente desde los archivos principales.

Los packs tienen sus propias fotografías en `assets/images/packs-2026/`. El emblema oficial y las fotografías personales existentes se mantienen separados.
