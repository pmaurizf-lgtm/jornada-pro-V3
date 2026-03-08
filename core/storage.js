// core/storage.js

import { createInitialState } from "./state.js";
import { validateState } from "./validation.js";

const KEY = "jornadaPro_v1";

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return createInitialState();

    const parsed = JSON.parse(raw);
    validateState(parsed);

    return parsed;
  } catch {
    localStorage.removeItem(KEY);
    return createInitialState();
  }
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

/** Exporta el estado completo (o un rango de fechas). options: { fromISO, toISO } para filtrar registros. */
export function exportBackup(state, options) {
  if (!options || (!options.fromISO && !options.toISO)) {
    return JSON.stringify(state, null, 2);
  }
  const from = options.fromISO || "0000-01-01";
  const to = options.toISO || "9999-12-31";
  const registros = {};
  for (const [k, v] of Object.entries(state.registros || {})) {
    if (k >= from && k <= to) registros[k] = v;
  }
  const out = { ...state, registros };
  return JSON.stringify(out, null, 2);
}

export function importBackup(json) {
  const parsed = JSON.parse(json);
  validateState(parsed);
  return parsed;
}
