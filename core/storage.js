// core/storage.js

import { createInitialState } from "./state.js";
import { validateState } from "./validation.js";
import { computeBackupBancoResumen } from "./bank.js";
import { getTotalDiasDisponibles } from "./vacaciones.js";
import { getLDDisponiblesAnio } from "./ld.js";

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

/** Versión del bloque backupMeta dentro del JSON exportado. */
export const BACKUP_META_FORMAT_VERSION = 2;

/**
 * Copia de seguridad completa: todos los registros, config, datos personales, vacaciones/LD, agenda, etc.
 * Incluye backupMeta (fecha, resumen del banco a día de la copia) solo en el archivo; no se guarda en localStorage al restaurar.
 * @param {object} state Estado ya sincronizado (p. ej. formulario volcado en config).
 * @param {{ fechaReferenciaISO?: string }} [ctx] fecha "hoy" del usuario para el resumen del banco (YYYY-MM-DD).
 */
export function exportBackup(state, ctx) {
  const clone = JSON.parse(JSON.stringify(state));
  const fechaRef =
    (ctx && ctx.fechaReferenciaISO) ||
    (() => {
      const n = new Date();
      return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`;
    })();
  const fechaRefDate = new Date(
    parseInt(fechaRef.slice(0, 4), 10),
    parseInt(fechaRef.slice(5, 7), 10) - 1,
    parseInt(fechaRef.slice(8, 10), 10)
  );

  clone.backupMeta = {
    formatVersion: BACKUP_META_FORMAT_VERSION,
    exportedAt: new Date().toISOString(),
    fechaReferenciaLocal: fechaRef,
    banco: computeBackupBancoResumen(clone, fechaRef),
    datosPersonales: {
      nombreCompleto: clone.config?.nombreCompleto || "",
      numeroSAP: clone.config?.numeroSAP || "",
      centroCoste: clone.config?.centroCoste || "",
      grupoProfesional: clone.config?.grupoProfesional || ""
    },
    conteos: {
      diasConRegistro: Object.keys(clone.registros || {}).length,
      vacacionesDisponiblesTotal: getTotalDiasDisponibles(clone, fechaRefDate),
      libreDisponibilidadDias:
        getLDDisponiblesAnio(clone, fechaRefDate.getFullYear(), fechaRefDate) || 0
    }
  };

  return JSON.stringify(clone, null, 2);
}

export function importBackup(json) {
  const parsed = JSON.parse(json);
  delete parsed.backupMeta;
  validateState(parsed);
  return parsed;
}
