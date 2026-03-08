# Cómo probar el widget de Jornada Pro en iOS

## Requisitos

- **Mac** con **Xcode** instalado (desde la App Store).
- **CocoaPods** (si no lo tienes: `sudo gem install cocoapods`).
- **Simulador iOS** (viene con Xcode) o un **iPhone** con cable.

---

## 1. Preparar la web y sincronizar iOS

En la terminal, en la carpeta del proyecto:

```bash
cd "/Users/pablomourizfontao/Documents/Apps creadas/jornada-pro-main"
npm run prepare-android
npx cap sync ios
```

(Eso genera `dist/` y copia la web a `ios/App/App/public/`.)

---

## 2. Instalar dependencias de iOS (CocoaPods)

```bash
cd ios/App
pod install
cd ../..
```

Si da error tipo "xcode-select" o "command line tools", abre Xcode una vez, acepta la licencia y en **Xcode → Settings → Locations** asegúrate de que "Command Line Tools" apunta a tu Xcode.

---

## 3. Abrir el proyecto en Xcode

```bash
open ios/App/App.xcworkspace
```

**Importante:** abre el **.xcworkspace**, no el `.xcodeproj`, para que CocoaPods esté bien cargado.

---

## 4. Ejecutar la app (y con ella el widget)

1. Arriba a la izquierda en Xcode, en el **scheme** elige **App** (no JornadaWidget).
2. En el selector de dispositivo elige:
   - **Un simulador**, por ejemplo "iPhone 15" o "iPhone 16" (iOS 14 o superior), o
   - **Tu iPhone** si lo tienes conectado (necesitarás equipo de desarrollo y confianza en el dispositivo).
3. Pulsa el botón **Run** (▶) o `Cmd + R`.

Se compilará la app y la extensión del widget; se instalará en el simulador o en el iPhone y la app se abrirá.

---

## 5. Añadir el widget en la pantalla de inicio

1. En el **simulador** o en el **iPhone**, ve a la **pantalla de inicio** (pulsa el botón Home o desliza desde abajo).
2. **Mantén pulsado** en un espacio vacío hasta que los iconos se muevan.
3. Pulsa el **+** (arriba a la izquierda, en el simulador puede estar en otro sitio según la versión).
4. Busca **"Jornada Pro"** en la lista de widgets.
5. Elige el tamaño (pequeño o mediano) y pulsa **Add Widget** y luego **Done**.

Verás el widget con la barra de avance y los enlaces "Iniciar jornada" / "Terminar jornada". Los datos se rellenan cuando abres la app y usas la jornada (la web escribe en el App Group).

---

## 6. Probar que el widget abre la app

- Toca **Iniciar jornada** o **Terminar jornada** en el widget.
- Debería abrirse la app y ejecutarse la acción correspondiente (iniciar o terminar jornada).

---

## Si algo falla

- **"No such module Capacitor"** → no has abierto el `.xcworkspace` o no has ejecutado `pod install`.
- **El widget no aparece en la lista** → asegúrate de haber ejecutado el scheme **App** (no solo JornadaWidget) para instalar la extensión.
- **App Group / signing** → en el target **App** y en **JornadaWidget**, en **Signing & Capabilities** debe estar el App Group `group.com.jornadapro.navantia` y tu equipo de desarrollo seleccionado.
- **El widget está vacío** → abre la app al menos una vez y deja que cargue la web; la app es la que escribe los datos (progress, label, etc.) que el widget lee.
