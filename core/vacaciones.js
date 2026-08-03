// core/vacaciones.js – Banco de días de vacaciones por año de generación.
// Año mínimo considerado: 2025. Caducidad: 30 de septiembre del año siguiente.

const ANIO_MINIMO = 2025;
const DIAS_POR_ANIO = 25;

/** Fecha de vencimiento: 30 de septiembre del año siguiente al de generación. */
export function getFechaVencimiento(anio) {
  return new Date(anio + 1, 8, 30); // mes 8 = septiembre
}

/** true si la fecha de referencia es posterior al 30/09 del año siguiente. */
export function isAnioVencido(anio, fechaRef = new Date()) {
  const fin = getFechaVencimiento(anio);
  return fechaRef > fin;
}

/** Años de generación no vencidos (desde ANIO_MINIMO hasta año de referencia). */
export function getAniosNoVencidos(anioActual, fechaRef = new Date()) {
  const anios = [];
  for (let y = ANIO_MINIMO; y <= anioActual; y++) {
    if (!isAnioVencido(y, fechaRef)) anios.push(y);
  }
  return anios;
}

/** Total de días de vacaciones disponibles (solo años no vencidos). */
export function getTotalDiasDisponibles(state, fechaRef = new Date()) {
  const anioActual = fechaRef.getFullYear();
  const anios = getAniosNoVencidos(anioActual, fechaRef);
  const porAnio = state.vacacionesDiasPorAnio || {};
  return anios.reduce((s, y) => s + (porAnio[y] || 0), 0);
}

/** Días disponibles para un año concreto (0 si vencido o sin dato). */
export function getDiasDisponiblesAnio(state, anio, fechaRef = new Date()) {
  if (anio < ANIO_MINIMO || isAnioVencido(anio, fechaRef)) return 0;
  return Math.max(0, (state.vacacionesDiasPorAnio || {})[anio] || 0);
}

/** Primer año no vencido que tenga saldo > 0 (para descontar). */
export function getAnioParaDescontar(state, fechaRef = new Date()) {
  const anioActual = fechaRef.getFullYear();
  const anios = getAniosNoVencidos(anioActual, fechaRef);
  const porAnio = state.vacacionesDiasPorAnio || {};
  for (const y of anios) {
    if ((porAnio[y] || 0) > 0) return y;
  }
  return null;
}

/** Descuenta 1 día del banco (año más antiguo con saldo). Devuelve el año usado o null si no hay saldo. */
export function descontarDiaVacacion(state, fechaRegistro) {
  const porAnio = state.vacacionesDiasPorAnio || {};
  const anio = getAnioParaDescontar(state);
  if (anio == null) return null;
  state.vacacionesDiasPorAnio = { ...porAnio, [anio]: Math.max(0, (porAnio[anio] || 0) - 1) };
  return anio;
}

/** Devuelve 1 día al año que se había descontado para ese registro. */
export function devolverDiaVacacion(state, fechaISO) {
  const reg = state.registros[fechaISO];
  const anio = reg && reg.vacacionesDiaAnioDescontado != null ? String(reg.vacacionesDiaAnioDescontado) : null;
  if (anio == null) return;
  const porAnio = state.vacacionesDiasPorAnio || {};
  state.vacacionesDiasPorAnio = { ...porAnio, [anio]: (porAnio[anio] || 0) + 1 };
}

/** Asegura que el año actual tenga entrada: 2025 usa config.vacacionesDiasPrevio; desde 2026 se suman 25 el 1 ene. */
export function ensureAnioActual(state, anioActual) {
  if (anioActual < ANIO_MINIMO) return;
  const porAnio = state.vacacionesDiasPorAnio || {};
  if (porAnio[anioActual] !== undefined) return;
  const valor = anioActual === ANIO_MINIMO ? (state.config.vacacionesDiasPrevio ?? 0) : DIAS_POR_ANIO;
  state.vacacionesDiasPorAnio = { ...porAnio, [anioActual]: valor };
}

/**
 * Recalcula el saldo por año a partir de los días marcados en el calendario.
 * Corrige desajustes (p. ej. doble descuento al pulsar Vacaciones dos veces el mismo día).
 * Devuelve true si hubo que ajustar.
 */
export function reconciliarSaldoVacaciones(state, fechaRef = new Date()) {
  const anioActual = fechaRef.getFullYear();
  ensureAnioActual(state, anioActual);
  const anios = getAniosNoVencidos(anioActual, fechaRef);
  const porAnio = { ...(state.vacacionesDiasPorAnio || {}) };
  const regs = Object.values(state.registros || {}).filter((r) => r && r.vacaciones);
  const sinAnio = regs.filter((r) => r.vacacionesDiaAnioDescontado == null).length;
  let changed = false;

  for (const y of anios) {
    const key = String(y);
    const exists = porAnio[key] !== undefined || porAnio[y] !== undefined;
    // Solo reconciliar años ya presentes en el banco (o el año en curso, creado por ensureAnioActual).
    if (!exists && y !== anioActual) continue;
    const inicial = y === ANIO_MINIMO
      ? (state.config?.vacacionesDiasPrevio ?? 0)
      : DIAS_POR_ANIO;
    let descontados = regs.filter((r) => String(r.vacacionesDiaAnioDescontado) === key).length;
    if (y === anioActual) descontados += sinAnio;
    const esperado = Math.max(0, inicial - descontados);
    const actual = porAnio[key] ?? porAnio[y] ?? 0;
    if (actual !== esperado) {
      porAnio[key] = esperado;
      if (porAnio[y] !== undefined && String(y) !== key) delete porAnio[y];
      changed = true;
    }
  }

  if (changed) state.vacacionesDiasPorAnio = porAnio;
  return changed;
}

/** Años que se pueden consultar en el desplegable: anteriores al actual (y >= ANIO_MINIMO). */
export function getAniosConsulta(anioActual) {
  const anios = [];
  for (let y = ANIO_MINIMO; y < anioActual; y++) anios.push(y);
  return anios;
}
