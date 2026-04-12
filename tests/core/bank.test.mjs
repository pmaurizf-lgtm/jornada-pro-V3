/**
 * Tests unitarios para core/bank.js
 * Ejecutar con: node tests/core/bank.test.mjs
 */
import {
  calcularSaldoDia,
  MINUTOS_POR_DIA_JORNADA,
  calcularResumenPeriodo,
  calcularResumenAnual,
  calcularResumenTotal,
  calcularResumenDesdeFecha,
  calcularBancoMinutosAcumuladoGP12,
  computeBancoSnapshotForBackup,
  computeSaldosDisponiblesGP34
} from "../../core/bank.js";

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

const stateGp12 = {
  config: { horasExtraInicialMin: 120 },
  registros: {
    "2025-01-15": { extraGeneradaMin: 30, negativaMin: 15 },
    "2025-01-16": { extraGeneradaMin: 30, negativaMin: 0 }
  }
};
assert(
  calcularBancoMinutosAcumuladoGP12(stateGp12) === 120 + 30 - 15 + 30,
  "GP12 acumulado = inicial + sum(extra-neg)"
);

const stateReg = {
  config: {
    horasExtraInicialMin: 60,
    excesoJornadaInicialMin: 0,
    regularizacionTxTMin: 90,
    regularizacionExcesoMin: 30
  },
  registros: {
    "2025-01-10": { extraGeneradaMin: 120, negativaMin: 0, excesoJornadaMin: 0, disfrutadasManualMin: 0 }
  },
  deduccionesPorAusencia: {}
};
assert(
  calcularBancoMinutosAcumuladoGP12(stateReg) === 60 + 120 + 90,
  "GP12 acumulado incluye regularización TxT"
);
const snap = computeBancoSnapshotForBackup(stateReg);
assert(snap.saldoTxTMin === 60 + 120 + 90, "snapshot TxT = inicial + calendario + regularización");
assert(snap.saldoExcesoJornadaMin === 30, "snapshot exceso = inicial + regularización exc.");

const resDesde = calcularResumenDesdeFecha(registros, "2025-01-16");
assert(resDesde.generadas === 30, "resumen desde fecha: solo día >= corte");

const stateCorte = {
  config: {
    horasExtraInicialMin: 6000,
    excesoJornadaInicialMin: 3000,
    regularizacionTxTMin: 90,
    regularizacionExcesoMin: 30,
    regularizacionTxTCorteFecha: "2025-06-01",
    regularizacionExcesoCorteFecha: "2025-06-01"
  },
  registros: {
    "2025-01-10": { extraGeneradaMin: 120, negativaMin: 0, excesoJornadaMin: 50, disfrutadasManualMin: 0 },
    "2025-06-15": { extraGeneradaMin: 60, negativaMin: 0, excesoJornadaMin: 30, disfrutadasManualMin: 0 }
  },
  deduccionesPorAusencia: {}
};
const snapCorte = computeBancoSnapshotForBackup(stateCorte);
assert(snapCorte.saldoTxTMin === 90 + 60, "con corte TxT: regularización + neto solo desde corte (ignora enero y saldo previo)");
assert(snapCorte.saldoExcesoJornadaMin === 30 + 30, "con corte exceso: reg + neto exc. desde corte");
const s34 = computeSaldosDisponiblesGP34(stateCorte);
assert(s34.usarCorteTxT && s34.usarCorteExc, "modo corte activo cuando hay reg y fecha");

const gp12Corte = {
  config: {
    horasExtraInicialMin: 999,
    regularizacionTxTMin: 60,
    regularizacionTxTCorteFecha: "2025-03-01"
  },
  registros: {
    "2025-01-01": { extraGeneradaMin: 120, negativaMin: 0 },
    "2025-04-01": { extraGeneradaMin: 30, negativaMin: 10 }
  }
};
assert(
  calcularBancoMinutosAcumuladoGP12(gp12Corte) === 60 + 20,
  "GP12 con corte: reg + sum(extra-neg) desde corte, sin inicial"
);

console.log("✓ bank.test.mjs: todos los tests pasaron");
