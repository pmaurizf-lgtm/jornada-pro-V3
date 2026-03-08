#!/usr/bin/env node
/**
 * Copia los archivos de la app web a dist/ para empaquetar en Android.
 * No modifica el proyecto original; solo genera dist/ para Capacitor.
 * Uso: node scripts/copy-web-for-android.js
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

const COPIAR = [
  "index.html",
  "app.js",
  "styles.css",
  "manifest.json",
  "service-worker.js",
  "sw.js",
  "core",
  "ui",
  "icons",
  "sounds",
  "docs",
];

function mkdirp(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copiarRecursivo(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    mkdirp(dest);
    for (const name of fs.readdirSync(src)) {
      copiarRecursivo(path.join(src, name), path.join(dest, name));
    }
  } else {
    mkdirp(path.dirname(dest));
    fs.copyFileSync(src, dest);
  }
}

function descargar(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    }).on("error", reject);
  });
}

async function descargarLibs() {
  const libDir = path.join(DIST, "lib");
  mkdirp(libDir);
  const libs = [
    {
      url: "https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js",
      file: "chart.umd.min.js",
    },
    {
      url: "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js",
      file: "xlsx.full.min.js",
    },
  ];
  for (const { url, file } of libs) {
    const dest = path.join(libDir, file);
    if (fs.existsSync(dest)) {
      console.log("Ya existe:", file);
      continue;
    }
    console.log("Descargando", file, "...");
    const buf = await descargar(url);
    fs.writeFileSync(dest, buf);
    console.log("OK:", file);
  }
}

// Index.html para Android: scripts locales en lugar de CDN
function escribirIndexAndroid() {
  const indexSrc = path.join(ROOT, "index.html");
  let html = fs.readFileSync(indexSrc, "utf8");
  html = html.replace(
    '<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>',
    '<script src="lib/chart.umd.min.js"></script>'
  );
  html = html.replace(
    '<script src="https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js"></script>',
    '<script src="lib/xlsx.full.min.js"></script>'
  );
  fs.writeFileSync(path.join(DIST, "index.html"), html);
  console.log("index.html generado con libs locales.");
}

async function main() {
  if (fs.existsSync(DIST)) {
    fs.rmSync(DIST, { recursive: true });
  }
  mkdirp(DIST);

  for (const item of COPIAR) {
    const src = path.join(ROOT, item);
    if (!fs.existsSync(src)) {
      if (item === "docs" || item === "service-worker.js" || item === "sw.js") {
        console.warn("Opcional no encontrado:", item);
      } else {
        console.warn("No existe:", item);
      }
      continue;
    }
    const dest = path.join(DIST, item);
    if (item === "index.html") continue; // lo escribimos después con libs locales
    console.log("Copiando", item, "...");
    copiarRecursivo(src, dest);
  }

  escribirIndexAndroid();
  await descargarLibs();
  console.log("Listo. Ejecuta: npx cap sync android");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
