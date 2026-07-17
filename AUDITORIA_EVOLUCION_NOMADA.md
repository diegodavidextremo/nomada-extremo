# Auditoría de evolución de NÓMADA EXTREMO

Fecha de referencia: 17 de julio de 2026.

## Alcance protegido

- Repositorio: `diegodavidextremo/nomada-extremo`.
- Rama de publicación: `main`.
- Páginas HTML inventariadas: 60.
- Catálogos de idioma preservados: español, inglés, francés, alemán, italiano y portugués.
- Componentes compartidos preservados: cabecera, navegación, selector de idioma, menú móvil, pie, chatbot, modales y capa de animación.
- Áreas preservadas: actividades, Escuela Nómada, seguridad, material, zonas, packs, comunidad, Logbook, fundador, equipo, audiovisual, naturismo, sostenibilidad, Formación GMN y documentación académica.

## Arquitectura actual

- HTML estático compatible con GitHub Pages.
- Sistema visual principal en `assets/css/styles.css` y hojas específicas por página.
- Componentes comunes en `assets/js/components.js`.
- Interacciones y fichas técnicas en `assets/js/main.js`, con módulos específicos para Escuela, packs, viajes, equipo y FAQ.
- Internacionalización local en `assets/js/i18n.js` y `i18n/*.json`.
- Recursos visuales e iconos bajo `assets/images/` y `assets/icons/`.
- Herramientas de auditoría y validación bajo `tools/`.

## Estado inicial verificado

- El remoto corresponde a NÓMADA EXTREMO y la rama activa es `main`.
- No se ha tocado el directorio independiente `NOMADX/`.
- Se han conservado cambios previos no relacionados en `assets/js/main.js` y `i18n/validation-report.json`.
- La auditoría detectó un falso positivo al interpretar URLs versionadas de `components.js`; la herramienta ya admite parámetros de caché.
- Los cuatro HTML legales heredados son redirecciones intencionadas hacia `aviso-legal.html` y no se evalúan como páginas completas.
- `formacion-gmn.html` contenía tres H1 por integrar dos etapas completas; se mantiene todo el contenido y se corrige la jerarquía a un único H1.

## Principio de preservación

No se elimina contenido funcional ni editorial. Las mejoras se implementan mediante capas progresivas, nuevos componentes compartidos, reorganización visual y enlaces contextuales. Cualquier bloque nuevo debe seguir siendo legible aunque falle JavaScript.

## Contenido eliminado

Ninguno.

## Resumen ejecutivo

La evolución se ha desarrollado como una ampliación progresiva de NÓMADA EXTREMO, sin sustituir la web existente ni alterar su identidad. El resultado conecta mejor las experiencias, la formación, la preparación, la seguridad, el material, las zonas, los packs, el Logbook y la comunidad.

Se han incorporado tres capas nuevas:

1. **Horizonte Nómada**, para explicar con claridad la evolución futura del proyecto.
2. **Descubrimiento y navegación**, mediante un buscador global y un selector inteligente de aventuras.
3. **Recorridos de ecosistema**, que enlazan las áreas principales según el flujo descubrir, preparar, validar, vivir y registrar.

## Contenido, funciones y componentes preservados

- Se mantienen las páginas, secciones, textos, imágenes, fichas, precios orientativos, formularios, filtros, modales y URLs existentes.
- Se conservan la Escuela Nómada, las actividades, la seguridad, el material, las zonas, los packs, la comunidad, el Logbook, la formación GMN, el naturismo, el audiovisual, el equipo y la documentación académica.
- Se conservan las traducciones en español, inglés, francés, alemán, italiano y portugués.
- Se preservan las cabeceras, pies, menús móviles, selector de idioma, chatbot y componentes compartidos.
- Las URLs anteriores continúan funcionando. La reorganización de navegación se realiza en la capa compartida, sin romper enlaces profundos.
- No se ha modificado el proyecto independiente NOMADX.

## Mejoras realizadas

### Horizonte Nómada

- Nueva página `horizonte-nomada.html`.
- Ocho ámbitos de evolución: movilidad, tecnología, audiovisual, formación, viajes, material, expansión y comunidad.
- Vista en cuadrícula y cronología.
- Filtros por categoría, estado y horizonte temporal.
- Contenido traducido a los seis idiomas de la web.
- Datos locales y editables, sin servicios externos ni dependencias de compilación.
- Referencias de marca tratadas como opciones de estudio, nunca como compras, patrocinios o colaboraciones confirmadas.

### Navegación y búsqueda

- Navegación del proyecto agrupada para facilitar el acceso a las áreas profundas.
- Menú móvil con acordeones accesibles.
- Buscador global con 34 destinos reales, navegación por teclado, cierre con `Esc`, bloqueo de foco y acceso rápido con `Ctrl/Cmd + K`.
- Resultados traducidos y agrupados por contexto.

### Portada y descubrimiento

- Selector inteligente de aventuras con cinco criterios: medio, intensidad, duración, compañía y objetivo.
- Doce experiencias existentes como base de recomendación.
- Resultados explicados, con enlaces reales y sin inventar disponibilidad.
- Estado conservado en la sesión y funcionamiento completo en los seis idiomas.

### Ecosistema conectado

- Recorridos contextuales añadidos a Actividades, Escuela, Seguridad, Material, Zonas, Packs y Logbook.
- Flujo visual: **Descubrir → Preparar → Validar → Vivir → Registrar**.
- Cada página destaca su fase y propone accesos útiles a otras áreas.
- Los bloques se insertan dentro del contenido principal y mantienen una lectura correcta sin JavaScript.

## Contenido reorganizado

- El menú de Proyecto se agrupa por finalidad para reducir una lista plana demasiado extensa.
- La jerarquía de `formacion-gmn.html` se ajusta a un único H1 sin eliminar ninguna etapa ni agradecimiento.
- Las nuevas conexiones se añaden al final de las áreas principales; no desplazan ni sustituyen contenido existente.

No se ha movido contenido editorial fuera de su página original. La reorganización afecta principalmente a navegación, jerarquía semántica y conexiones entre áreas.

## Archivos principales creados

- `horizonte-nomada.html`
- `assets/css/horizonte-nomada.css`
- `assets/data/horizonte-nomada.json`
- `assets/data/horizonte-nomada-data.js`
- `assets/js/horizonte-nomada.js`
- `assets/js/horizonte-nomada-copy.js`
- `assets/css/global-search.css`
- `assets/js/global-search.js`
- `assets/css/adventure-selector.css`
- `assets/js/adventure-selector.js`
- `assets/css/ecosystem-pathways.css`
- `assets/js/ecosystem-pathways.js`
- `tools/build-horizon-data.js`
- `tools/bump-components-version.js`

## Archivos principales modificados

- `index.html`
- `actividades.html`
- `escuela.html`
- `seguridad.html`
- `material.html`
- `zonas.html`
- `packs.html`
- `logbook.html`
- `assets/js/components.js`
- `sitemap.xml`
- `tools/responsive-accessibility-audit.js`
- Páginas HTML existentes, únicamente para cargar la versión actualizada de los componentes compartidos.

## Archivos eliminados

Ninguno.

## Validación realizada

- Auditoría automática sobre 61 páginas.
- Anchuras verificadas: 320, 360, 390, 412, 430, 480, 600, 640, 768, 820, 900, 1024, 1200, 1366, 1440 y 1920 px.
- Sin incidencias de desbordamiento horizontal en la auditoría final.
- Navegación por teclado, foco visible, diálogos accesibles y reducción de movimiento revisados.
- Selector, buscador, filtros, cronología y recorridos contextuales comprobados en local.
- Traducciones comprobadas en los seis idiomas.
- Despliegue público comprobado en GitHub Pages.
- Consola pública comprobada sin errores ni advertencias en las páginas de referencia analizadas.
- Archivos nuevos comprobados como UTF-8 sin BOM.

## SEO, rendimiento y accesibilidad

- `horizonte-nomada.html` incorpora título, descripción, Open Graph, Twitter Card, canonical y datos estructurados propios.
- La página se añadió al sitemap.
- Los componentes nuevos usan datos locales, carga progresiva y JavaScript vanilla.
- Los controles mantienen áreas táctiles, foco visible, textos accesibles y comportamiento responsive.
- Las animaciones respetan `prefers-reduced-motion`.
- El catálogo completo no se renderiza de forma masiva desde los componentes nuevos.

## Cómo editar Horizonte Nómada

1. Editar `assets/data/horizonte-nomada.json`.
2. Mantener para cada concepto un `id` único y los campos:
   `category`, `brand`, `model`, `state`, `horizon`, `featured`, `title`, `description`, `motive`, `applications`, `link` e `image`.
3. Completar `title`, `description` y `motive` para `es`, `en`, `fr`, `de`, `it` y `pt`.
4. Usar únicamente enlaces internos existentes.
5. Regenerar el archivo consumido por la web:

```powershell
node tools/build-horizon-data.js
```

6. Abrir `horizonte-nomada.html` y comprobar filtros, cronología, traducciones y responsive.

## Cómo añadir Tesla, Samsung, Garmin u otras referencias

- Añadir la marca en `brand` y, solo si procede, el modelo en `model`.
- Mantener `state` como `idea` o `estudio` mientras no exista una decisión verificable.
- Explicar en `motive` por qué se compara: autonomía, resistencia, cartografía, comunicación, seguridad, coste total o compatibilidad.
- No usar expresiones que impliquen patrocinio, compra, colaboración o disponibilidad confirmada.
- Enlazar el concepto con una página existente, por ejemplo `tecnologia.html`, `material.html` o `base-campamento.html`.
- Regenerar `assets/data/horizonte-nomada-data.js` con el comando anterior.

Samsung y Garmin ya aparecen como referencias comparables dentro del concepto de tecnología personal resistente. Las futuras referencias de movilidad, incluida Tesla, deben seguir el mismo criterio editorial prudente.

## Otros puntos de mantenimiento

- Destinos del buscador global: `assets/js/global-search.js`.
- Experiencias del selector de portada: `assets/js/adventure-selector.js`.
- Enlaces contextuales por página: `assets/js/ecosystem-pathways.js`.
- Navegación compartida: `assets/js/components.js`.

## Datos e imágenes pendientes de validación futura

- Modelos concretos, precios, proveedores, homologaciones, seguros, permisos y acuerdos profesionales.
- Fotografías propias definitivas para conceptos de Horizonte Nómada que todavía usan presentación editorial sin imagen.
- Disponibilidad real de vehículos, tecnología, material o destinos.
- Viabilidad legal, económica y operativa de cada fase futura.

Estos elementos permanecen expresamente como estudio o idea hasta disponer de fuentes y decisiones verificables.

## Riesgos pendientes

- El crecimiento futuro del catálogo requerirá mantener sincronizados los seis idiomas.
- Las referencias comerciales deberán revisarse cuando cambien modelos, normativa o disponibilidad.
- Conviene ejecutar la auditoría responsive y revisar el sitemap después de añadir nuevas páginas.
- Las funciones futuras de favoritos, comparación avanzada o configuración de kits deben plantearse como una fase separada para no sobrecargar la experiencia actual.

## Comprobación antes de publicar

```powershell
node tools/build-horizon-data.js
node tools/responsive-accessibility-audit.js --summary
git status --short
git diff --check
```

Después del despliegue:

1. Abrir la portada y Horizonte Nómada con una recarga completa.
2. Comprobar los seis idiomas.
3. Probar buscador, selector, filtros y navegación móvil.
4. Revisar la consola del navegador.
5. Confirmar que no existe desplazamiento horizontal.

## Confirmación final

- NÓMADA EXTREMO mantiene su identidad, contenido y URLs.
- Todo el contenido importante continúa accesible.
- No se ha mezclado funcionalmente con NOMADX.
- No se ha eliminado contenido útil.
- La evolución se ha construido como una capa ampliable y mantenible sobre la web existente.
