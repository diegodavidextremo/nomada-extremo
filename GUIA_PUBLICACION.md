# Nómada Extremo v2 — Guía de Publicación

**Cómo publicar tu web gratis, paso a paso**

---

## MÉTODO 1 — GitHub Pages (recomendado, gratuito)

### Requisitos
- Cuenta gratuita en [github.com](https://github.com)
- Git instalado en tu ordenador

### Instalar Git
- **Windows:** descarga en [git-scm.com](https://git-scm.com)
- **Mac:** `xcode-select --install` en terminal
- **Linux:** `sudo apt install git`
- Verificar: `git --version`

### Paso a paso

**1. Crea cuenta en GitHub** (si no tienes)
- Entra en github.com/join
- Guarda tu nombre de usuario

**2. Crea el repositorio**
- Clic en "New" en GitHub
- Nombre: `nomada-extremo`
- Visibilidad: **Public** (obligatorio para Pages gratuitas)
- Sin README ni .gitignore previos
- Clic en "Create repository"

**3. Configura Git en tu ordenador**
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

**4. Sube el proyecto**
```bash
# Navega a la carpeta del proyecto
cd ruta/a/nomada-v2

# Inicializa repositorio
git init

# Añade todos los archivos
git add .

# Crea el primer commit
git commit -m "Nómada Extremo v2 — Web completa"

# Conecta con GitHub (cambia TUUSUARIO por tu usuario real)
git remote add origin https://github.com/TUUSUARIO/nomada-extremo.git

# Sube el código
git branch -M main
git push -u origin main
```

⚠️ Si Git pide contraseña, GitHub ya no acepta la normal. Necesitas un **token de acceso personal**:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token → selecciona `repo` → copia el token
3. Úsalo como contraseña cuando Git te la pida

**5. Activa GitHub Pages**
1. En tu repositorio en GitHub → Settings → Pages
2. Source: **Deploy from a branch**
3. Branch: **main** / Folder: **/ (root)**
4. Clic en Save
5. Espera 1–2 minutos

**Tu URL quedará así:**
`https://TUUSUARIO.github.io/nomada-extremo/`

**6. Actualiza el sitemap**
Abre `sitemap.xml` y reemplaza `TUUSUARIO` por tu usuario real de GitHub en todas las líneas.

---

## MÉTODO 2 — Netlify Drop (sin instalar nada, 0 comandos)

1. Entra en [netlify.com](https://netlify.com) y crea cuenta gratuita
2. En el dashboard, busca "Deploy manually" o "Sites"
3. **Arrastra la carpeta completa `nomada-v2`** sobre la zona de dropzone
4. En ~30 segundos tienes URL pública
5. URL tipo: `https://random-name-12345.netlify.app`
6. Personaliza el nombre en: Site settings → Change site name

---

## MÉTODO 3 — Vercel (alternativa rápida)

1. [vercel.com](https://vercel.com) → conecta tu cuenta de GitHub
2. "Add New Project" → importa `nomada-extremo`
3. Deploy
4. URL tipo: `https://nomada-extremo.vercel.app`

---

## Cómo actualizar la web después de publicarla

### Si usas GitHub Pages o Vercel:
```bash
# Desde la carpeta nomada-v2
git add .
git commit -m "Actualizo imágenes y textos"
git push
```
Los cambios se reflejan en ~1–2 minutos.

### Si usas Netlify Drop:
Vuelve a arrastrar la carpeta entera al dashboard de Netlify. Actualiza automáticamente.

---

## Dominio propio (opcional, ~10–15€/año)

Si quieres usar `nomadaextremo.com` en lugar de la URL de GitHub:
1. Compra un dominio en Namecheap, IONOS, GoDaddy, etc.
2. En GitHub Pages: Settings → Pages → Custom domain → escribe tu dominio
3. En tu registrador de dominio: añade un registro CNAME apuntando a `TUUSUARIO.github.io`
4. Espera hasta 24h para propagación DNS

---

## Solución de problemas habituales

| Problema | Solución |
|---|---|
| La web sale en blanco | F12 → Console del navegador → revisa errores de ruta |
| Imágenes no cargan en local | Necesitas conexión a internet (son de Unsplash) |
| Fuentes no aparecen | Necesitas conexión a internet (Google Fonts) |
| Git pide contraseña | Usa token personal (ver paso 4) |
| GitHub Pages no activa | Verifica que la rama es `main` y carpeta `/ (root)` |
| Algunos links no funcionan | Comprueba que el archivo .html existe en la raíz |
| Las imágenes propias no cargan | Verifica la ruta: `assets/images/hero/mi-foto.jpg` |

---

---

# GUÍA DE IMÁGENES Y VÍDEOS

## Estructura de carpetas de medios

```
nomada-v2/
└── assets/
    ├── images/
    │   ├── hero/           ← Imágenes de fondo grandes (1920×1080)
    │   ├── actividades/    ← Fichas y familias (800×600)
    │   ├── equipo/         ← Fotos del equipo (400×500)
    │   ├── blog/           ← Artículos del blog (800×500)
    │   └── placeholders/   ← Guía de nomenclatura
    ├── videos/
    │   ├── hero/           ← Vídeo de fondo hero (MP4, máx 15MB)
    │   └── actividades/    ← Vídeos secundarios opcionales
    └── posters/            ← Imágenes de portada para vídeos
```

---

## Cómo cambiar imágenes manualmente

### Paso 1 — Prepara la imagen
- Formato: **JPG** para fotos, **PNG** para gráficos, **WebP** para máximo rendimiento
- Comprime con [TinyJPG.com](https://tinyjpg.com) antes de subir
- Tamaños recomendados:

| Tipo | Tamaño ideal | Carpeta |
|---|---|---|
| Hero portada | 1920×1080 px | `images/hero/` |
| Hero páginas interiores | 1920×900 px | `images/hero/` |
| Portada de vídeo | 1920×1080 px | `posters/` |
| Tarjeta familia actividad | 800×600 px | `images/actividades/` |
| Ficha individual | 800×500 px | `images/actividades/` |
| Foto equipo (retrato) | 400×500 px | `images/equipo/` |
| Foto fundador | 600×800 px | `images/equipo/` |
| Artículo blog | 800×500 px | `images/blog/` |

### Paso 2 — Nómbrala correctamente
Usa exactamente estos nombres para sustituir sin editar código:

| Archivo | Dónde se usa |
|---|---|
| `hero/hero-inicio-nomada-extremo.jpg` | Hero de la portada |
| `hero/hero-actividades.jpg` | Hero página actividades |
| `hero/hero-escuela.jpg` | Hero escuela Nómada |
| `hero/hero-fundador.jpg` | Hero página fundador |
| `hero/hero-quienes-somos.jpg` | Hero quiénes somos |
| `posters/poster-video-hero.jpg` | Portada del vídeo de fondo |
| `actividades/familia-montana.jpg` | Tarjeta montaña |
| `actividades/familia-vertical.jpg` | Tarjeta vertical |
| `actividades/familia-mar-costa.jpg` | Tarjeta mar y costa |
| `actividades/familia-buceo.jpg` | Tarjeta buceo |
| `actividades/familia-aire.jpg` | Tarjeta aire |
| `actividades/familia-barrancos.jpg` | Tarjeta barrancos |
| `actividades/familia-btt.jpg` | Tarjeta BTT |
| `actividades/familia-multiaventura.jpg` | Tarjeta multiaventura |
| `actividades/ficha-senderismo.jpg` | Ficha senderismo |
| `actividades/ficha-kayak.jpg` | Ficha kayak de mar |
| `actividades/ficha-buceo-bautismo.jpg` | Ficha bautismo de buceo |
| `actividades/ficha-paracaidismo.jpg` | Ficha paracaidismo tándem |
| `actividades/ficha-parapente.jpg` | Ficha parapente biplaza |
| `actividades/ficha-paramotor.jpg` | Ficha paramotor/paratrike |
| `actividades/ficha-ferrata.jpg` | Ficha vía ferrata |
| `actividades/ficha-coasteering.jpg` | Ficha coasteering |
| `actividades/ficha-mar-montana.jpg` | Ficha pack mar + montaña |
| `equipo/fundador-diego-david-extremo.jpg` | Foto fundador Diego |
| `equipo/equipo-carlos.jpg` | Tarjeta Carlos (montaña) |
| `equipo/equipo-laura.jpg` | Tarjeta Laura (buceo) |
| `equipo/equipo-pedro.jpg` | Tarjeta Pedro (aire) |
| `equipo/equipo-sara.jpg` | Tarjeta Sara (mar) |
| `blog/blog-montana-aguilas.jpg` | Artículo montaña |
| `blog/blog-buceo-mediterraneo.jpg` | Artículo buceo |
| `blog/blog-paramotor-aguilas.jpg` | Artículo paramotor |
| `blog/blog-kayak-calas.jpg` | Artículo kayak |

### Paso 3 — Actualiza el HTML

**La forma más rápida:** si nombras el archivo exactamente como la tabla indica, solo cambias la URL en el HTML de forma muy localizada. Abre el HTML correspondiente, busca la URL de Unsplash con `Ctrl+F` y reemplázala:

```html
<!-- ANTES (imagen Unsplash): -->
style="background-image:url('https://images.unsplash.com/photo-XXXX...')"

<!-- DESPUÉS (tu imagen local): -->
style="background-image:url('assets/images/hero/hero-inicio-nomada-extremo.jpg')"
```

**Para imágenes en tarjetas de equipo sin foto:**
Busca `equipo-card-foto-placeholder` en el HTML del equipo y reemplaza ese div por:
```html
<div class="equipo-card-foto" style="background-image:url('assets/images/equipo/equipo-carlos.jpg');background-size:cover;background-position:top center;"></div>
```

---

## Cómo añadir un vídeo de fondo al hero

### Paso 1 — Prepara el vídeo
- Formato: **MP4** (H.264) — máxima compatibilidad
- Tamaño: 1920×1080 preferiblemente
- Peso máximo: **12–15 MB** (más pesado ralentiza mucho la web)
- Sin pista de audio (quítala para reducir el peso)
- Para comprimir con ffmpeg:
  ```bash
  ffmpeg -i video-original.mp4 -vf scale=1920:1080 -c:v libx264 -crf 28 -an hero-nomada.mp4
  ```
- HandBrake (gratuito): usa preset "Web → Fast 1080p30", desactiva audio

### Paso 2 — Coloca el vídeo
```
assets/videos/hero/hero-nomada.mp4
```
Y añade la imagen de portada:
```
assets/posters/poster-video-hero.jpg
```

### Paso 3 — Actívalo en index.html

Abre `index.html` y busca `<!-- VIDEO FONDO -->`.

**Descomenta el bloque del vídeo** (quita los `<!--` y `-->`):
```html
<div class="video-container">
  <video class="hero-video" autoplay muted loop playsinline
         poster="assets/posters/poster-video-hero.jpg">
    <source src="assets/videos/hero/hero-nomada.mp4" type="video/mp4">
  </video>
</div>
```

**Comenta el div de imagen estática** (añade `<!--` y `-->`):
```html
<!-- <div class="hero-bg" style="background-image:url('...')"></div> -->
```

### Resultado
Si el vídeo carga, lo verás de fondo animado. Si no carga (sin internet, móvil sin soporte), mostrará automáticamente la imagen póster. Sistema con fallback garantizado.

---

## Cómo añadir vídeo con controles en cualquier sección

```html
<video controls style="width:100%;border-radius:3px;margin-top:1.5rem;">
  <source src="assets/videos/actividades/kayak-demo.mp4" type="video/mp4">
  Tu navegador no soporta la reproducción de vídeo.
</video>
```

---

## Proporcionar archivos a Claude para integración automática

### ¿Puede Claude integrar tus imágenes automáticamente?

**Sí, en la conversación activa de Claude.ai:**
Si adjuntas imágenes o archivos directamente en la conversación, Claude puede:
- Copiar los archivos a las carpetas correctas
- Renombrarlos con la nomenclatura del proyecto
- Actualizar las rutas en los HTML
- Integrarlos en las secciones adecuadas

**Cómo pedírselo:**
Adjunta el archivo en el chat y escribe algo como:
- "Usa esta imagen para el hero de la portada"
- "Esta es la foto para la tarjeta del equipo de Carlos"
- "Usa este vídeo como fondo del hero"
- "Esta imagen es para la ficha del kayak de mar"

**Mapeo inteligente si subes varias imágenes:**
Si subes varias fotos sin especificar, Claude las distribuirá por similitud de contenido:
- Foto de paisaje marino → Mar y Costa o Hero
- Retrato → Fundador o Equipo
- Foto de montaña → Familia montaña o Hero interior
- Foto submarina → Buceo
- Foto aérea → Aire o Hero

### Cuando Claude NO puede acceder al archivo
Si el entorno de trabajo no tiene acceso directo a tu archivo local, Claude te indicará exactamente:
- En qué carpeta colocar el archivo
- Qué nombre darle
- Qué línea del HTML cambiar
- Resultado en menos de 1 minuto por imagen

---

## Qué hacer si una imagen se ve mal recortada

Las imágenes de fondo usan `background-position: center` por defecto. Modifica el posicionamiento en la línea del HTML:

```html
<!-- Mostrar parte superior: -->
background-position:top center;

<!-- Mostrar parte inferior: -->
background-position:bottom center;

<!-- Posición precisa: -->
background-position:40% 30%;
```

---

## Qué hacer si un vídeo pesa demasiado

1. Usa HandBrake (gratuito): preset "Web → Fast 720p30" en lugar de 1080p
2. Reduce la duración a 15–30 segundos (se hace loop, no hace falta más)
3. Usa [Clideo.com](https://clideo.com) para comprimir online sin instalar nada
4. Objetivo: **menos de 10 MB** para vídeo de fondo

---

## Cómo actualizar imágenes después de publicar

**En GitHub Pages:** reemplaza el archivo en local, luego:
```bash
git add assets/images/hero/hero-inicio-nomada-extremo.jpg
git commit -m "Actualizo imagen hero"
git push
```

**En Netlify:** arrastra de nuevo la carpeta completa al dashboard.

---

*Proyecto formativo de Diego David Gómez García · 1.º GMN · IES Europa de Águilas, Murcia*
