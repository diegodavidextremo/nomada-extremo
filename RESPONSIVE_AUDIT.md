# RESPONSIVE_AUDIT

Fecha: 2026-05-12

## Web revisada

- NÓMADA EXTREMO
- Ruta local: `C:\Users\Diego\OneDrive\Dokumente\New project`
- Identidad mantenida: marca/proyecto de aventura extrema, experiencias, servicios, formación, seguridad, packs, audiovisual, línea naturista, bonos, escuela, Águilas/Murcia y visión empresarial.

## Breakpoints validados

- 360px
- 390px
- 412px
- 480px
- 520px
- 650px
- 768px
- 820px
- 1024px
- 1366px
- 1920px

## Problemas encontrados

- Riesgo de layouts demasiado rígidos en grids de fichas, packs, bonos, escuela, equipo, blog y bloques premium.
- Menú móvil sin cierre por ESC/scroll ni `aria-expanded` sincronizado.
- Modal de ficha técnica sin bloqueo de scroll de fondo al abrir.
- Necesidad de reforzar safe areas, `dvh`, botones táctiles y orientación horizontal.

## Problemas corregidos

- Se añadieron reglas responsive globales sin quitar contenido ni cambiar la identidad visual.
- Se reforzaron grids con `auto-fit`, `minmax(min(100%, ...), 1fr)` y `min-width: 0`.
- Se adaptaron hero, Método Nómada, fichas, experiencias, línea naturista, audiovisual, Escuela Nómada, Garantía Nómada, bonos, equipo, blog, contacto y footer.
- Se mejoró el menú móvil con cierre por X, enlaces, ESC y scroll, además de `aria-expanded` y `aria-controls`.
- Se añadió `body.menu-open` y `body.modal-open` para evitar scroll de fondo.
- Se adaptaron modales a `dvh`, safe areas y scroll interno.
- Se añadieron mínimos táctiles de 44px en botones relevantes.
- Se añadió soporte para `prefers-reduced-motion`.

## Validación realizada

- `node --check assets/js/main.js`: correcto.
- `node --check assets/js/components.js`: correcto.
- `git diff --check`: sin errores de whitespace, solo avisos CRLF esperados de Git en Windows.
- Microsoft Edge headless con DevTools Protocol:
  - 0 overflow horizontal en 360, 390, 412, 480, 520, 650, 768, 820, 1024, 1366 y 1920px.
  - 0 botones visibles por debajo del umbral táctil medido.
  - Sin errores de consola relevantes.
  - Menú móvil abre correctamente y sincroniza `aria-expanded`.
  - Modal de ficha técnica abre con contenido real.

## Archivos modificados

- `assets/css/styles.css`
- `assets/js/components.js`
- `assets/js/main.js`

## Commit y push

- Commit previsto: `Optimiza Nómada Extremo para móvil, Android, pantalla dividida y responsive total`
- Push previsto: `origin main`

## Pendientes

- Ningún pendiente bloqueante detectado en la validación local.