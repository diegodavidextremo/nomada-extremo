# Auditoría responsive y accesibilidad - Nómada Extremo

Fecha: 10 de junio de 2026

## Web revisada

Repositorio/local: `diegodavidextremo/nomada-extremo`

Trabajo aplicado exclusivamente sobre NÓMADA EXTREMO. No se ha modificado NOMADX ni otros proyectos.

## Páginas revisadas

Se ha ejecutado una auditoría sobre 52 páginas HTML del proyecto raíz, excluyendo carpetas ajenas, builds Android y NOMADX.

Páginas incluidas en la revisión: home, actividades, fichas individuales, escuela, audiovisual, material, seguridad, zonas, comunidad, logbook, formularios, reservas, contacto, packs, equipo, fundador, quiénes somos, naturistas, blog/artículos, legales, login, 404 y páginas académicas/intermodulares.

## Breakpoints de referencia

Se han tomado como referencia estos anchos para la capa responsive y la auditoría:

320, 360, 390, 412, 430, 480, 600, 640, 768, 820, 900, 1024, 1200, 1366, 1440 y 1920 px.

También se han contemplado pantalla dividida, móvil horizontal, safe areas de iPhone, zoom del navegador, navegación táctil y teclado.

## Problemas encontrados

- `login.html` estaba fuera del sistema compartido de navegación/footer.
- `login.html` no tenía un `h1` real.
- `login.html` tenía labels visibles, pero no todos estaban asociados con `for`/`id`.
- La navegación móvil podía mejorar en semántica, bloqueo de scroll, foco y atributos ARIA.
- Los modales globales necesitaban `aria-labelledby`, `aria-hidden`, foco devuelto al disparador y focus trap básico.
- El CSS ya tenía varias mejoras responsive, pero convenía añadir una capa final global para safe areas, grids fluidos, botones táctiles, chips, modales y anti-overflow.
- `main.js` dependía de `IntersectionObserver` sin fallback.

## Cambios aplicados

### Componentes compartidos

- Añadido enlace accesible `Saltar al contenido principal`.
- Añadido `header.site-header` y `nav` con `aria-label`.
- Convertido el botón hamburguesa en `button` real con `aria-controls` y `aria-expanded`.
- Añadido menú móvil con `aria-hidden`, cierre por botón, cierre por fondo y cierre por ESC.
- Añadido bloqueo de scroll del body cuando el menú está abierto.
- Añadido focus trap básico en menú móvil.
- Añadida recuperación del foco al cerrar menú.
- Añadido `main#main-content` automáticamente para páginas sin `main`.
- Añadida mejora automática de imágenes: `alt` vacío si falta, `loading="lazy"` en imágenes no críticas y `decoding="async"`.
- Añadidas mejoras automáticas de inputs: `id`, `autocomplete` e `inputmode` cuando se puede inferir de forma segura.

### CSS global

- Añadida capa final `AUDITORIA RESPONSIVE Y ACCESIBILIDAD 2026`.
- Refuerzo anti-overflow horizontal en `html`, `body`, grids, cards, textos, imágenes, vídeos, iframes y tablas.
- Uso de `clamp()` para títulos, secciones, contenedores y espaciados.
- Refuerzo de `min-width: 0` en cards, layouts y componentes flex/grid.
- Refuerzo de botones y áreas táctiles mínimas de 44 px.
- Foco visible reforzado para teclado.
- Menú móvil con `100svh/100dvh`, safe area, scroll interno y enlaces táctiles.
- Grids fluidos con `auto-fit` y `minmax(min(100%, 280px), 1fr)`.
- Modales con safe area, scroll interno y altura basada en `100dvh`.
- WhatsApp flotante recolocado con safe area inferior/lateral.
- Chips, badges y etiquetas con wrap robusto.
- Media queries específicas para móvil, pantalla dividida, móvil horizontal, pantallas grandes y `prefers-reduced-motion`.
- Soporte básico de impresión.

### JavaScript global

- Añadido fallback para `IntersectionObserver`.
- Smooth scroll respeta `prefers-reduced-motion`.
- Toast con `aria-live="polite"` y `aria-atomic="true"`.
- Modal global con `role="dialog"`, `aria-modal`, `aria-labelledby`, `aria-hidden`, cierre con ESC, focus trap básico y devolución de foco.
- Código defensivo para que no falle en páginas secundarias si falta algún componente.

### Login

- Integrado `login.html` en el sistema compartido de nav/footer.
- Añadido `h1` real.
- Asociados labels a campos mediante `for`/`id`.
- Añadidos `autocomplete` adecuados.

## Validaciones realizadas

Comandos ejecutados:

```bash
node --check assets/js/components.js
node --check assets/js/main.js
node tools/responsive-accessibility-audit.js
```

Resultado de la auditoría local:

- Páginas revisadas: 52
- Páginas con incidencias estáticas: 0
- H1 único comprobado en todas las páginas auditadas
- `meta viewport` comprobado
- favicon comprobado
- carga de `components.js` comprobada
- imágenes sin `alt` visibles en HTML comprobadas
- formularios con labels comprobados

## Herramienta creada

Se ha creado:

`tools/responsive-accessibility-audit.js`

La auditoría no instala dependencias. Si en el futuro se añade Playwright al entorno del proyecto, se puede ampliar para medir `scrollWidth <= innerWidth` en navegador real en todos los breakpoints.

## Resultado final

La web queda más robusta para móvil, tablet, escritorio, pantalla dividida, navegación táctil, navegación con teclado, lectores de pantalla básicos y dispositivos con safe areas.

No se ha eliminado contenido importante. No se ha cambiado la identidad visual de Nómada Extremo. No se ha tocado NOMADX.

## Pendientes recomendados

- Validación visual manual en dispositivos reales Android/iOS.
- Validación en GitHub Pages cuando el despliegue haya refrescado caché.
- Si se instala Playwright en el futuro, ampliar `tools/responsive-accessibility-audit.js` para hacer capturas y medir overflow real por breakpoint.