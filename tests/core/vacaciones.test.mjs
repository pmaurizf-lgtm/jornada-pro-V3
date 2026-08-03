import assert from "node:assert/strict";
import {
  descontarDiaVacacion,
  ensureAnioActual,
  getTotalDiasDisponibles,
  reconciliarSaldoVacaciones
} from "../../core/vacaciones.js";

function makeState(overrides = {}) {
  return {
    config: { vacacionesDiasPrevio: 0, ...(overrides.config || {}) },
    vacacionesDiasPorAnio: { ...(overrides.vacacionesDiasPorAnio || {}) },
    registros: { ...(overrides.registros || {}) }
  };
}

{
  const state = makeState({ vacacionesDiasPorAnio: { "2026": 25 } });
  ensureAnioActual(state, 2026);
  // 11 marcas + 1 doble descuento fantasma = saldo 13
  for (let i = 1; i <= 11; i++) {
    const f = `2026-08-${String(i).padStart(2, "0")}`;
    const anio = descontarDiaVacacion(state, f);
    state.registros[f] = { vacaciones: true, vacacionesDiaAnioDescontado: anio };
  }
  descontarDiaVacacion(state, "2026-08-01"); // doble descuento sin nuevo día
  assert.equal(getTotalDiasDisponibles(state, new Date(2026, 7, 3)), 13, "tras doble descuento queda 13");
  assert.equal(Object.values(state.registros).filter((r) => r.vacaciones).length, 11);

  const changed = reconciliarSaldoVacaciones(state, new Date(2026, 7, 3));
  assert.equal(changed, true, "debe ajustar");
  assert.equal(getTotalDiasDisponibles(state, new Date(2026, 7, 3)), 14, "25-11 = 14 tras reconciliar");
}

{
  const state = makeState({ vacacionesDiasPorAnio: { "2026": 14 } });
  for (let i = 1; i <= 11; i++) {
    state.registros[`2026-08-${String(i).padStart(2, "0")}`] = {
      vacaciones: true,
      vacacionesDiaAnioDescontado: 2026
    };
  }
  const changed = reconciliarSaldoVacaciones(state, new Date(2026, 7, 3));
  assert.equal(changed, false, "ya coherente: no ajusta");
  assert.equal(getTotalDiasDisponibles(state, new Date(2026, 7, 3)), 14);
}

console.log("✓ vacaciones.test.mjs: todos los tests pasaron");
