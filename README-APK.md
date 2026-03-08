# Cómo generar el APK de Jornada Pro (Android)

La app se puede empaquetar como **APK instalable** para Android y funciona **sin servidor externo** (todo offline: datos en el dispositivo). El código fuente actual se mantiene igual para seguir desarrollando en web; el APK se genera a partir de una copia en `dist/`.

## Requisitos

- **Node.js** (v18 o superior recomendado)
- **Android Studio** (para el SDK y construir el APK), o solo **Android SDK** con `sdkmanager` y `gradle` en el PATH
- En el proyecto: `npm install` ya ejecutado

## Primera vez: instalar dependencias y añadir Android

```bash
cd /ruta/al/jornada-pro-main
npm install
npx cap add android
```

Con esto se crea la carpeta `android/` (no se versiona; está en `.gitignore` para mantener el repo solo como desarrollo web).

## Generar y actualizar el APK

1. **Copiar la app web a `dist/` y sincronizar con Android** (Chart.js y xlsx se descargan locales para uso offline):

   ```bash
   npm run cap:sync
   ```

2. **Abrir el proyecto Android en Android Studio** (opcional, para depurar o firmar):

   ```bash
   npm run cap:open
   ```

   En Android Studio: **Build → Build Bundle(s) / APK(s) → Build APK(s)**. El APK quedará en  
   `android/app/build/outputs/apk/debug/app-debug.apk` (o `release` si configuras firma).

3. **O construir por línea de comandos** (APK de release; requiere keystore para distribución):

   ```bash
   npm run cap:build
   ```

   Para un APK de **debug** (instalable sin firmar, solo para pruebas):

   ```bash
   npm run prepare-android
   npx cap sync android
   cd android && ./gradlew assembleDebug && cd ..
   ```

   El APK de debug estará en:  
   `android/app/build/outputs/apk/debug/app-debug.apk`

## Estructura y flujo

- **Desarrollo:** sigues tocando `index.html`, `app.js`, `styles.css`, `core/`, `ui/`, etc. en la raíz del proyecto. No hace falta tocar `dist/` ni `android/` para el día a día.
- **Para generar el APK:**  
  - `npm run prepare-android` → llena `dist/` (copia de la app + index con Chart.js y xlsx locales).  
  - `npx cap sync android` → lleva el contenido de `dist/` al proyecto Android.  
  - Luego construyes el APK desde `android/` (Android Studio o `gradlew assembleDebug` / `assembleRelease`).

La app en el APK usa **almacenamiento local** (localStorage) en el dispositivo; no depende de ningún servidor.

## Firma para publicar (release)

Para publicar en Google Play o instalar como release necesitas un keystore y configurar la firma en `android/app/build.gradle`. Puedes usar:

- **Build → Generate Signed Bundle / APK** en Android Studio, o  
- Las opciones de Capacitor: `npx cap build android --release --keystorepath=... --keystorealias=...` (ver documentación de Capacitor).

## Resumen de comandos

| Acción              | Comando                    |
|---------------------|----------------------------|
| Preparar web + sync | `npm run cap:sync`         |
| Abrir en Android Studio | `npm run cap:open`   |
| Solo copiar web a dist | `npm run prepare-android` |
| APK debug (terminal) | `npm run prepare-android && npx cap sync android && cd android && ./gradlew assembleDebug` |

El **sistema de archivos actual** del proyecto (todo menos `dist/` y `android/`) se mantiene para el desarrollo futuro de la app.
