#!/usr/bin/env node
/**
 * Copia todos los archivos necesarios del proyecto a una carpeta nueva.
 * Excluye: node_modules, dist, .git, .DS_Store, y archivos de IDE.
 * Uso: node scripts/crear-copia-completa.js
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const DEST_NAME = "jornada-pro-completo";
const DEST = path.join(path.dirname(ROOT), DEST_NAME);

const EXCLUDE = [
  "node_modules",
  "dist",
  ".git",
  ".DS_Store",
  ".cursor",
  ".idea",
  ".vscode",
  "*.log",
  "npm-debug.log*",
  "agent-transcripts",
  "terminals",
];

function main() {
  if (fs.existsSync(DEST)) {
    console.log("Eliminando carpeta anterior:", DEST);
    fs.rmSync(DEST, { recursive: true });
  }

  const excludes = EXCLUDE.map((e) => `--exclude=${e}`).join(" ");
  const cmd = `rsync -a ${excludes} "${ROOT}/" "${DEST}/"`;
  console.log("Copiando proyecto a:", DEST);
  execSync(cmd, { stdio: "inherit", shell: "/bin/bash" });

  // Crear README en la carpeta de destino
  const readme = `# Jornada Pro - Copia completa

Esta carpeta contiene todos los archivos necesarios para que la app funcione.

## Contenido

- **Web**: \`app.js\`, \`index.html\`, \`styles.css\`, \`core/\`, \`ui/\`, \`icons/\`, \`sounds/\`, \`manifest.json\`, \`service-worker.js\`, \`sw.js\`
- **Config**: \`package.json\`, \`package-lock.json\`, \`capacitor.config.json\`
- **Android**: carpeta \`android/\` (proyecto nativo + widget)
- **iOS**: carpeta \`ios/\` (proyecto Xcode + widget JornadaWidget)
- **Scripts**: \`scripts/\` (incluye \`copy-web-for-android.js\` y \`crear-copia-completa.js\`)
- **Firebase** (opcional): \`firebase.json\`, \`firestore.rules\`, \`firebase-messaging-sw.js\`, \`functions/\`
- **Documentación**: \`docs/\`, \`README-APK.md\`

No se han copiado: \`node_modules\`, \`dist\`, \`.git\` (se regeneran o no son necesarios para ejecutar).

## Cómo usar

1. **Instalar dependencias**: \`npm install\`
2. **Web (desarrollo)**: abre \`index.html\` en el navegador o sirve la carpeta con un servidor local.
3. **Preparar Android**: \`npm run prepare-android\` (genera \`dist/\` y descarga libs) y luego \`npx cap sync android\`, \`npx cap open android\`.
4. **Preparar iOS**: \`npm run prepare-android\` (o el script que genere dist), \`npx cap sync ios\`, \`npx cap open ios\` (requiere Xcode y CocoaPods).
`;

  fs.writeFileSync(path.join(DEST, "README-COPIAPROYECTO.md"), readme, "utf8");
  console.log("Creado README-COPIAPROYECTO.md en la carpeta de destino.");
  console.log("\nListo. Carpeta creada en:", DEST);
}

main();
