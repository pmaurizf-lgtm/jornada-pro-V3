#!/usr/bin/env node
/**
 * Incrementa la versión en version.json, package.json, app.js e index.html.
 * Uso: node scripts/bump-version.mjs patch|minor
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const kind = (process.argv[2] || "patch").toLowerCase();
if (kind !== "patch" && kind !== "minor") {
  console.error("Uso: node scripts/bump-version.mjs patch|minor");
  process.exit(1);
}

const versionPath = path.join(root, "version.json");
const vj = JSON.parse(fs.readFileSync(versionPath, "utf8"));
let [maj, min, pat] = String(vj.version || "0.0.0")
  .split(".")
  .map((x) => parseInt(x, 10) || 0);

if (kind === "minor") {
  min += 1;
  pat = 0;
} else {
  pat += 1;
}

const newV = `${maj}.${min}.${pat}`;
vj.version = newV;
fs.writeFileSync(versionPath, JSON.stringify(vj, null, 2) + "\n");

const pkgPath = path.join(root, "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
pkg.version = newV;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

const appPath = path.join(root, "app.js");
let app = fs.readFileSync(appPath, "utf8");
if (!/const APP_VERSION = "[^"]+"/.test(app)) {
  console.error("app.js: no se encontró const APP_VERSION");
  process.exit(1);
}
app = app.replace(/const APP_VERSION = "[^"]+"/, `const APP_VERSION = "${newV}"`);
fs.writeFileSync(appPath, app);

const htmlPath = path.join(root, "index.html");
let html = fs.readFileSync(htmlPath, "utf8");
html = html.replace(
  /(<span[^>]*id="configAppVersion"[^>]*>)v[\d.]+/g,
  `$1v${newV}`
);
html = html.replace(
  /(<span[^>]*id="configAppVersionFooter"[^>]*>)v[\d.]+/g,
  `$1v${newV}`
);
fs.writeFileSync(htmlPath, html);

console.log(newV);
