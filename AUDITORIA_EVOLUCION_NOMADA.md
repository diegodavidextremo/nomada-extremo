# Auditoría de evolución de NÓMADA EXTREMO

Fecha de referencia: 11 de julio de 2026.

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
