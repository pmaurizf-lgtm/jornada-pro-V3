/**
 * Tests unitarios para core/bank.js
 * Ejecutar con: node tests/core/bank.test.mjs
 */
import { calcularSaldoDia, MINUTOS_POR_DIA_JORNADA, calcularResumenPeriodo, calcularResumenAnual, calcularResumenTotal } from "../../core/bank.js";

function assert(cond, msg) {
  if (!cond) throw new Error(msg || "Assertion failed");
}

assert(MINUTOS_POR_DIA_JORNADA === 459, "MINUTOS_POR_DIA_JORNADA = 459");

assert(calcularSaldoDia(null) === 0, "null -> 0");
assert(calcularSaldoDia({ vacaciones: true }) === 0, "vacaciones -> 0");
assert(calcularSaldoDia({ extraGeneradaMin: 60, negativaMin: 0, excesoJornadaMin: 0, disfrutadasManualMin: 0 }) === 60, "solo extra 60 -> 60");
assert(calcularSaldoDia({ extraGeneradaMin: 60, negativaMin: 30, excesoJornadaMin: 0, disfrutadasManualMin: 0 }) === 30, "60-30 -> 30");
assert(calcularSaldoDia({ disfruteHorasExtra: true, disfruteHorasExtraMin: 120 }) === -120, "disfrute 120 -> -120");

const registros = {
  "2025-01-15": { extraGeneradaMin: 60, negativaMin: 0, excesoJornadaMin: 0, disfrutadasManualMin: 0 },
  "2025-01-16": { extraGeneradaMin: 30, negativaMin: 15, excesoJornadaMin: 0, disfrutadasManualMin: 0 },
  "2025-02-01": { vacaciones: true }
};
const resumen = calcularResumenPeriodo(registros, d => d.getMonth() === 0);
assert(resumen.generadas === 90, "generadas 60+30");
assert(resumen.negativas === 15, "negativas 15");
assert(resumen.saldo === 75, "saldo 90-15");

const anual = calcularResumenAnual(registros, 2025);
assert(anual.saldo === 75, "resumen anual saldo 75");

const total = calcularResumenTotal(registros);
assert(total.saldo === 75, "resumen total saldo 75");

console.log("✓ bank.test.mjs: todos los tests pasaron");
