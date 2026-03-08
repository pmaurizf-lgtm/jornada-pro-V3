# Publicar la app en GitHub Pages (URL para probar)

Con GitHub Pages tu repositorio se convierte en una web con una URL pública.

## Pasos en GitHub

1. Entra en tu repo: **https://github.com/pmaurizf-lgtm/jornada-pro-V3**
2. Ve a **Settings** (Configuración).
3. En el menú izquierdo, entra en **Pages** (dentro de "Code and automation").
4. En **Source** (Origen):
   - Elige **Deploy from a branch**.
   - En **Branch** selecciona **main** y la carpeta **/ (root)**.
   - Pulsa **Save**.
5. Espera 1–2 minutos. Arriba verás algo como: *"Your site is live at https://pmaurizf-lgtm.github.io/jornada-pro-V3/"*.

## Tu URL

La app quedará en:

**https://pmaurizf-lgtm.github.io/jornada-pro-V3/**

Abre esa URL en el navegador para probar la app.

## Si algo no carga (rutas)

Si la página carga pero los estilos o el JavaScript no, puede ser por la ruta base. En ese caso se puede añadir en `index.html` dentro de `<head>`:

```html
<base href="/jornada-pro-V3/">
```

Solo necesario si ves errores 404 en la consola del navegador (F12).
