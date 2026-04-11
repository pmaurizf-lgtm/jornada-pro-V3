# Versionado (semver en la app)

Formato: **`MAJOR.MINOR.PATCH`** (p. ej. `1.3.0`, `1.3.1`, `1.4.0`).

| Cambio | Ejemplo | Cómo se dispara en GitHub Actions |
|--------|---------|-----------------------------------|
| **Patch** (tercer número): correcciones, bugs, ajustes pequeños | `1.3.0` → `1.3.1` | Cualquier push a `main` cuyo mensaje **no** indique versión menor. |
| **Minor** (segundo número; patch pasa a 0): funciones nuevas, cambios grandes | `1.3.2` → `1.4.0` | Mensaje de commit con **`feat:`**, **`feat(`**, **`[minor]`** o **`[feat]`**. |

La versión visible en la app (`Configuración` → Acerca de) sale de **`APP_VERSION`** en `app.js`, mantenida en sync con `version.json` y `package.json`.

## Automatización

El workflow **Versionado automático** (`.github/workflows/version-bump.yml`) corre en cada push a `main`, incrementa la versión y hace commit `chore(release): vX.Y.Z [skip version]`.

- Ese commit **no** vuelve a ejecutar el bump (evita bucles).
- Para **no** bump en un push concreto (p. ej. solo documentación), incluye **`[skip version]`** en el mensaje del commit.

## Manual (local)

```bash
node scripts/bump-version.mjs patch   # 1.3.0 → 1.3.1
node scripts/bump-version.mjs minor   # 1.3.1 → 1.4.0
```

Luego sube los cambios a `main` como siempre.
