# Nómada Extremo v2 — Web Completa

**Empresa ficticia de aventura, deportes extremos y formación técnica**  
Águilas, Murcia, España · Fundada por Diego David Extremo  
Proyecto de: **Diego David Gómez García** · 1.º GMN · IES Europa de Águilas

---

## Descripción

Web completa multipágina con paleta **natural mediterránea** (cielo, mar, bosque, arena, roca). Estética natural, aireada y premium. Combina impacto visual de marca con claridad corporativa.

---

## Páginas del sitio

| Archivo | Sección |
|---|---|
| `index.html` | Portada principal |
| `quienes-somos.html` | Quiénes somos |
| `fundador.html` | El fundador |
| `equipo.html` | Equipo profesional |
| `actividades.html` | Catálogo completo |
| `escuela.html` | Escuela Nómada |
| `certificaciones.html` | Certificaciones |
| `naturistas.html` | Línea naturista |
| `alquiler.html` | Alquiler material |
| `seguridad.html` | Seguridad y garantía |
| `reservas.html` | Reservas + bonos |
| `contacto.html` | Contacto |
| `faq.html` | Preguntas frecuentes |
| `blog.html` | Blog |
| `comunidad.html` | Comunidad y app |
| `404.html` | Error 404 |
| `aviso-legal.html` | Legal |
| `politica-privacidad.html` | Privacidad |
| `politica-cookies.html` | Cookies |
| `condiciones.html` | Condiciones |

---

## Estructura de archivos

```
nomada-v2/
├── index.html
├── [... todas las páginas .html ...]
├── assets/
│   ├── css/
│   │   └── styles.css          ← TODOS los estilos
│   ├── js/
│   │   ├── components.js       ← Nav y footer dinámicos
│   │   └── main.js             ← Animaciones, FAQ, formularios
│   ├── images/
│   │   ├── hero/               ← Imágenes de hero (1920x1080)
│   │   ├── actividades/        ← Imágenes de actividades (800x600)
│   │   ├── equipo/             ← Fotos del equipo (400x500)
│   │   ├── blog/               ← Imágenes del blog (800x500)
│   │   └── placeholders/       ← Guía de nomenclatura
│   ├── videos/
│   │   └── hero/               ← Vídeo de fondo opcional (hero-nomada.mp4)
│   └── icons/
│       └── favicon.svg
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── README.md
└── GUIA_PUBLICACION.md
```

---

## Cómo abrir la web en local

**Con VS Code (recomendado):**
1. Abre la carpeta `nomada-v2` en VS Code
2. Instala la extensión **Live Server**
3. Clic derecho en `index.html` → "Open with Live Server"

**Con Python:**
```bash
cd nomada-v2
python -m http.server 8000
# Abre: http://localhost:8000
```

**Doble clic en index.html** también funciona, aunque sin servidor local algunas fuentes de Google pueden no cargar offline.

---

## Cómo editar textos

1. Abre cualquier `.html` con un editor de texto (VS Code, Notepad++, etc.)
2. Los textos están directamente en el HTML
3. Busca el texto que quieres cambiar con `Ctrl+F`
4. Modifica y guarda

---

## Cómo cambiar colores

Abre `assets/css/styles.css` y busca `:root` al principio del archivo:

```css
:root {
  --cielo:     #e8f2f8;   /* Azul cielo claro */
  --mar:       #1e4a6b;   /* Azul mar profundo */
  --bosque:    #2d5a3d;   /* Verde bosque */
  --arena:     #c4966a;   /* Arena dorado premium */
  --blanco:    #fafaf8;   /* Blanco natural cálido */
  /* etc... */
}
```

Cambia solo los valores hexadecimales. Toda la web se actualizará.

---

## Paleta de colores completa

| Variable | Color | Uso principal |
|---|---|---|
| `--cielo` | `#e8f2f8` | Fondos claros, secciones naturistas |
| `--mar` | `#1e4a6b` | Color de acento principal, nav scrolled |
| `--mar-vivo` | `#2a6496` | Hover del azul mar |
| `--bosque` | `#2d5a3d` | Verde para botones bosque |
| `--arena` | `#c4966a` | Color premium, CTAs, precios |
| `--crema` | `#f5f2ec` | Fondos de secciones |
| `--blanco` | `#fafaf8` | Fondo base del sitio |
| `--gris-oscuro` | `#2e2b28` | Footer, títulos |
| `--noche` | `#0f1a13` | Hero pages interiores |

---

# CÓMO AÑADIR Y CAMBIAR IMÁGENES

## Cambio manual de imágenes (paso a paso)

Las imágenes actuales se cargan desde Unsplash (requieren internet). Para usar **tus propias fotos**:

### Paso 1 — Prepara la imagen
- Formato recomendado: **JPG** (mejor calidad/peso) o WebP
- Para heroes: 1920x1080 píxeles mínimo
- Para tarjetas de actividades: 800x600 píxeles
- Para fotos de equipo: 400x500 píxeles (retrato)
- Para imágenes de blog: 800x500 píxeles
- Compresión: usa TinyJPG (tinyjpg.com) para reducir el peso

### Paso 2 — Coloca el archivo
Guarda la imagen en la carpeta correcta:
```
assets/images/hero/         → Imágenes de fondo grandes
assets/images/actividades/  → Fichas y familias de actividades
assets/images/equipo/       → Fotos del equipo
assets/images/blog/         → Imágenes de artículos
```

### Paso 3 — Actualiza el HTML

**Para imágenes de fondo (hero, tarjetas):**
Abre el HTML correspondiente y busca la URL de Unsplash:
```html
<!-- ANTES: -->
<div class="hero-bg" style="background-image:url('https://images.unsplash.com/photo-XXXX...')">

<!-- DESPUÉS: -->
<div class="hero-bg" style="background-image:url('assets/images/hero/hero-inicio-nomada-extremo.jpg')">
```

**Para imágenes de equipo o contenido:**
```html
<!-- ANTES: -->
<div class="equipo-card-foto" style="background-image:url('https://images.unsplash.com/...')">

<!-- DESPUÉS: -->
<div class="equipo-card-foto" style="background-image:url('assets/images/equipo/equipo-carlos.jpg')">
```

---

## Tabla de imágenes del proyecto

| Archivo sugerido | Sección de uso | Tamaño ideal | Orientación |
|---|---|---|---|
| `hero/hero-inicio-nomada-extremo.jpg` | Hero portada | 1920×1080 | Panorámica |
| `hero/hero-actividades.jpg` | Hero actividades | 1920×900 | Panorámica |
| `hero/hero-escuela.jpg` | Hero escuela | 1920×900 | Panorámica |
| `hero/hero-fundador.jpg` | Hero fundador | 1920×900 | Panorámica |
| `hero/poster-video-hero.jpg` | Portada del vídeo de fondo | 1920×1080 | Panorámica |
| `actividades/familia-montana.jpg` | Tarjeta montaña | 800×600 | Horizontal |
| `actividades/familia-mar-costa.jpg` | Tarjeta mar | 800×600 | Horizontal |
| `actividades/familia-buceo.jpg` | Tarjeta buceo | 800×600 | Horizontal |
| `actividades/familia-aire.jpg` | Tarjeta aire | 800×600 | Horizontal |
| `actividades/ficha-senderismo.jpg` | Ficha senderismo | 800×500 | Horizontal |
| `actividades/ficha-kayak.jpg` | Ficha kayak | 800×500 | Horizontal |
| `actividades/ficha-paracaidismo.jpg` | Ficha paracaidismo | 800×500 | Horizontal |
| `actividades/ficha-paramotor.jpg` | Ficha paramotor | 800×500 | Horizontal |
| `equipo/fundador-diego-david-extremo.jpg` | Sección fundador | 600×800 | Retrato |
| `equipo/equipo-carlos.jpg` | Tarjeta Carlos | 400×500 | Retrato |
| `equipo/equipo-laura.jpg` | Tarjeta Laura | 400×500 | Retrato |
| `equipo/equipo-pedro.jpg` | Tarjeta Pedro | 400×500 | Retrato |
| `equipo/equipo-sara.jpg` | Tarjeta Sara | 400×500 | Retrato |
| `blog/blog-montana.jpg` | Artículo montaña | 800×500 | Horizontal |
| `blog/blog-buceo.jpg` | Artículo buceo | 800×500 | Horizontal |
| `blog/blog-paramotor.jpg` | Artículo paramotor | 800×500 | Horizontal |

---

# CÓMO AÑADIR VÍDEO DE FONDO

## Opción A — Vídeo propio en el hero principal

### Paso 1 — Prepara el vídeo
- Formato: **MP4** (H.264)
- Resolución: 1080p (1920×1080)
- Peso máximo recomendado: **12–15 MB**
- Sin audio (muted de todas formas, pero quita la pista de audio para reducir peso)
- Para comprimir: usa HandBrake (gratuito) o ffmpeg:
  ```bash
  ffmpeg -i tu-video-original.mp4 -vf scale=1920:1080 -c:v libx264 -crf 28 -an hero-nomada.mp4
  ```

### Paso 2 — Coloca el vídeo
```
assets/videos/hero/hero-nomada.mp4
```

### Paso 3 — Activa el vídeo en index.html
Abre `index.html` y busca el comentario `<!-- VIDEO FONDO -->`:

**Descomenta** este bloque (elimina `<!--` y `-->`):
```html
<div class="video-container">
  <video class="hero-video" autoplay muted loop playsinline poster="assets/images/hero/poster-video-hero.jpg">
    <source src="assets/videos/hero/hero-nomada.mp4" type="video/mp4">
  </video>
</div>
```

**Comenta** el div de imagen que está debajo (añade `<!--` y `-->`):
```html
<!-- <div class="hero-bg" style="background-image:url('...')"></div> -->
```

### Consejo
Añade siempre una imagen póster como fallback (`poster="assets/images/hero/poster-video-hero.jpg"`). Si el vídeo no carga, mostrará la imagen.

## Opción B — Añadir vídeo con controles en cualquier sección
```html
<video controls style="width:100%;border-radius:3px;">
  <source src="assets/videos/hero/mi-video.mp4" type="video/mp4">
  Tu navegador no soporta el vídeo.
</video>
```

---

# PROPORCIONAR IMÁGENES A LA IA

## Si subes imágenes a Claude para que las integre

**¿Puede Claude insertar imágenes automáticamente?**
Si subes los archivos a Claude directamente en esta conversación, Claude puede:
- Copiar los archivos a las carpetas correctas del proyecto
- Actualizar las rutas en los HTML correspondientes
- Renombrar los archivos con la nomenclatura correcta

Para pedírselo, escribe algo como:
- "Usa esta imagen para el hero de la portada"
- "Pon esta foto en la tarjeta de equipo de Carlos"
- "Esta imagen es para la ficha de kayak"

**¿Claude puede generar imágenes?**
No directamente en la web, pero puede buscar imágenes de stock adecuadas de fuentes como Unsplash y actualizar las URLs en el código.

**Si Claude no puede acceder al archivo:**
Claude te dirá exactamente en qué carpeta colocar cada imagen y qué línea del HTML cambiar. El sistema está preparado para hacer ese cambio en menos de 1 minuto.

---

## Herramientas útiles para preparar imágenes y vídeos

| Tarea | Herramienta |
|---|---|
| Comprimir JPG/PNG | TinyJPG.com |
| Convertir a WebP | Squoosh.app |
| Recortar/redimensionar | Photopea.com (gratuito online) |
| Comprimir vídeo | HandBrake (gratuito) |
| Quitar audio del vídeo | Clideo.com o ffmpeg |
| Convertir a MP4 | HandBrake o CloudConvert |

---

## Qué hacer si una imagen se ve mal recortada

Las imágenes de fondo usan `background-position: center`. Si la parte importante de tu foto queda cortada, cambia el posicionamiento en el HTML:

```html
<!-- Para que se vea la parte superior: -->
style="background-image:url('...');background-position:top center;"

<!-- Para que se vea la parte inferior: -->
style="background-image:url('...');background-position:bottom center;"

<!-- Para posición personalizada: -->
style="background-image:url('...');background-position:30% 60%;"
```

---

*Proyecto formativo de Diego David Gómez García · 1.º GMN · IES Europa de Águilas, Murcia*
