# Prueba de lectura en voz alta — solo Inicio

El lector se carga únicamente en `index.html`. No modifica los componentes compartidos ni activa lectura en otras páginas.

## Uso

- Botón «Escuchar esta página» debajo de la introducción del hero.
- Botón «Escuchar esta sección» dentro de los desplegables de Inicio.
- Pausa, continuación, detención y velocidades de 0,75× a 1,5×.
- Controles traducidos a ES, EN, FR, DE, IT, PT y NL, con una voz del mismo idioma cuando el dispositivo la proporciona.
- Se detiene al cambiar de idioma, abandonar la página o cerrar el apartado que está leyendo.
- Nunca inicia audio automáticamente. El foco de teclado pasa a los controles al abrirlos y vuelve al botón al terminar.

Lee los textos principales visibles y los apartados abiertos al iniciar la lectura. Omite navegación, pie, controles, formularios, campos introducidos por el usuario, previsualizaciones de reseñas y contenido cerrado u oculto. Abrir otro apartado después de empezar requiere iniciar su lectura o reiniciar la página completa.

## Motor y limitaciones

Utiliza `SpeechSynthesis`, sin micrófono, servidor de audio propio ni almacenamiento del contenido leído. Las voces disponibles dependen del navegador y del sistema operativo; algunas son servicios en línea. Si falta una voz del idioma elegido, se muestra un aviso y no se emplea una voz de otro idioma.

La lectura se divide en fragmentos cortos. La pausa guarda la posición comunicada por los eventos de palabras del motor de voz y cancela la locución. Al continuar se retoma ese punto; si el motor no emite dichos eventos, se repite el fragmento actual. Este comportamiento evita depender de `pause/resume` nativo en dispositivos que lo implementan de forma irregular.

Fuente de la API: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis

## Comprobaciones

`tools/test-home-reader.js` prueba extracción, exclusión de datos de formularios y contenido cerrado, siete idiomas, cambios de voz, pausa con posición, velocidad, errores, foco, navegación y cinco tamaños de pantalla. Usa un motor simulado para las comprobaciones reproducibles y hace una comprobación adicional de los eventos del motor real del equipo. El informe diferencia ambos tipos de validación en `tools/reports/home-reader.json`.

Para retirar la prueba basta con quitar de `index.html` el enlace a `home-reader.css`, el contenedor `#home-reader` y el script `home-reader.js`. La web no depende de estos archivos para ninguna otra función.
