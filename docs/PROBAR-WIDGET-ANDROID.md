# Cómo probar la app y el widget de Jornada Pro en Android

## Requisitos

- **Node.js** (v18 o superior)
- **Android Studio** (incluye el SDK y el emulador)
- En el proyecto: `npm install` ya ejecutado

---

## 1. Preparar la web y sincronizar Android

En la terminal, en la carpeta del proyecto:

```bash
cd "/Users/pablomourizfontao/Documents/Apps creadas/jornada-pro-main"
npm run cap:sync
```

(Eso ejecuta `prepare-android` —genera `dist/` con la web— y copia todo a `android/`.)

---

## 2. Abrir el proyecto en Android Studio

```bash
npm run cap:open
```

Se abrirá Android Studio con el proyecto `android/`. Espera a que termine de indexar y de sincronizar Gradle (barra de progreso abajo).

---

## 3. Ejecutar la app en un emulador o en un móvil

### Opción A: Emulador (simulador)

1. En Android Studio: **Tools → Device Manager** (o el icono del móvil con un triángulo).
2. Crea un dispositivo si no tienes: **Create Device** → elige un modelo (p. ej. Pixel 6) → elige una imagen del sistema (API 30 o superior) → Finish.
3. Pulsa el **▶** del emulador para arrancarlo.
4. Cuando el emulador esté encendido, en la barra superior de Android Studio elige ese dispositivo.
5. Pulsa el botón **Run** (▶ verde) o `Shift + F10`.

La app se instalará y se abrirá en el emulador.

### Opción B: Móvil físico

1. En el **móvil Android**: **Ajustes → Acerca del teléfono** → toca 7 veces en "Número de compilación" para activar las opciones de desarrollador.
2. **Ajustes → Opciones de desarrollador** → activa **Depuración USB**.
3. Conecta el móvil al Mac con el cable USB.
4. Acepta "¿Permitir depuración USB?" en el móvil.
5. En Android Studio, en el selector de dispositivos debería aparecer tu móvil. Selecciónalo y pulsa **Run** (▶).

La app se instalará y se abrirá en el dispositivo.

---

## 4. Añadir el widget en la pantalla de inicio

1. En el **emulador** o en el **móvil**, ve a la **pantalla de inicio** (botón Home).
2. **Mantén pulsado** en un espacio vacío.
3. Toca **Widgets** (o "Widgets" en el menú que salga).
4. Busca **"Jornada Pro"** (o el nombre que tenga el widget en `strings.xml`: "Jornada Pro").
5. Mantén pulsado el widget y arrástralo a la pantalla de inicio; suelta cuando esté donde quieras.

Verás el widget con la barra de avance y los botones **Iniciar jornada** y **Terminar jornada**. Los datos se actualizan cuando abres la app y usas la jornada (la web escribe vía el plugin WidgetData).

---

## 5. Probar que el widget abre la app

- Toca **Iniciar jornada** o **Terminar jornada** en el widget.
- Debería abrirse la app y ejecutarse la acción (iniciar o terminar la jornada).

---

## Resumen de comandos

| Acción | Comando |
|--------|--------|
| Preparar web + sync | `npm run cap:sync` |
| Abrir en Android Studio | `npm run cap:open` |
| APK debug (solo construir, sin abrir Studio) | `npm run cap:sync` y luego `cd android && ./gradlew assembleDebug` |

El APK de debug queda en:  
`android/app/build/outputs/apk/debug/app-debug.apk`  
(puedes copiarlo al móvil e instalarlo a mano si no usas USB/emulador).

---

## Si algo falla

- **"SDK not found"** → Abre Android Studio, **Settings → Appearance & Behavior → System Settings → Android SDK** y asegúrate de tener instalado al menos un SDK (API 24 o superior).
- **El widget no aparece en la lista** → Asegúrate de haber instalado la app al menos una vez (Run desde Android Studio). El widget viene en la misma app.
- **El widget está vacío o no se actualiza** → Abre la app, deja que cargue la web y usa "Iniciar jornada" o navega un poco. La app es la que envía los datos al widget.
