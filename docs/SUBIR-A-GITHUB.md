# Cómo subir este proyecto a GitHub

GitHub limita **la subida de archivos por la web** (arrastrar o "Upload files") a unos 100 archivos. Este proyecto tiene más, así que **no uses esa opción**.

## Solución: usar Git desde la terminal

Sube el proyecto con **Git desde tu equipo**. No hay límite de archivos al hacer `git push`.

### Pasos

1. **Crea un repositorio vacío en GitHub**
   - Ve a [github.com/new](https://github.com/new)
   - Nombre (ej.: `jornada-pro`)
   - No marques "Add a README" ni ".gitignore"
   - Crear repositorio

2. **En tu equipo, abre la terminal** en la carpeta del proyecto:
   ```bash
   cd "/Users/pablomourizfontao/Documents/Apps creadas/jornada-pro-main"
   ```

3. **Si aún no tienes Git inicializado:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Jornada Pro"
   ```

4. **Conecta con GitHub y sube** (sustituye `TU_USUARIO` y `jornada-pro` por tu usuario y nombre del repo):
   ```bash
   git remote add origin https://github.com/TU_USUARIO/jornada-pro.git
   git branch -M main
   git push -u origin main
   ```

5. **Si el repo ya existía y solo quieres subir cambios:**
   ```bash
   git add .
   git commit -m "Descripción de los cambios"
   git push
   ```

A partir de ahí puedes seguir trabajando y haciendo `git add`, `git commit` y `git push` con normalidad.

---

## Qué incluye el .gitignore

Para no subir cosas innecesarias ni superar límites de tamaño, el `.gitignore` excluye:

- `node_modules/` (se reinstala con `npm install`)
- `dist/` (se genera con `npm run prepare-android`)
- Carpetas de build de Android e iOS (`build/`, `.gradle/`, `Pods/`, etc.)
- La copia de la web dentro de Android (`android/app/.../assets/public/`), porque ya está en la raíz del proyecto

Así el repositorio solo contiene código fuente y configuración, y queda en un tamaño razonable para GitHub.
