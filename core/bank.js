// core/bank.js

/** Parsea "YYYY-MM-DD" como fecha local (evita desfase por UTC). */
function parseFechaLocal(isoStr) {
  const [y, m, d] = isoStr.split("-").map(Number);
  if (!y || m == null || !d) return new Date(NaN);
  return new Date(y, m - 1, d);
}

export function calcularSaldoDia(registro) {
  if (!registro || registro.vacaciones || registro.libreDisposicion || registro.licenciaRetribuida) {
    return 0;
  }
  if (registro.disfruteHorasExtra) {
    return -(registro.disfruteHorasExtraMin || 0);
  }
  if (registro.disfruteExcesoJornada) {
    return -(registro.disfruteExcesoJornadaMin || 0);
  }

  const generadas = registro.extraGeneradaMin || 0;
  const exceso = registro.excesoJornadaMin || 0;
  const negativas = registro.negativaMin || 0;
  const disfrutadas = registro.disfrutadasManualMin || 0;

  return generadas + exceso - negativas - disfrutadas;
}

/** Minutos por día de jornada para expresar saldo en días (459 = 7h 39min). */
export const MINUTOS_POR_DIA_JORNADA = 459;

/**
 * Registros que cuentan para el banco: si hay `config.bancoCalendarioDesde` (YYYY-MM-DD),
 * solo fechas >= ese día; si no, todo el histórico.
 */
export function registrosEfectivosParaBanco(state) {
  const desde = state.config?.bancoCalendarioDesde;
  if (!desde || typeof desde !== "string") return state.registros || {};
  const regs = state.registros || {};
  const out = {};
  for (const k of Object.keys(regs)) {
    if (k >= desde) out[k] = regs[k];
  }
  return out;
}

export function calcularResumenPeriodo(registros, filtroFn) {
  let generadas = 0;
  let exceso = 0;
  let negativas = 0;
  let disfrutadas = 0;
  let disfruteHorasExtraMin = 0;
  let disfruteExcesoJornadaMin = 0;
  let negativasTxT = 0;
  let negativasExceso = 0;
  let saldo = 0;

  Object.entries(registros)
    .filter(([fecha]) => filtroFn(parseFechaLocal(fecha)))
    .forEach(([_, r]) => {
      if (r.vacaciones || r.libreDisposicion || r.licenciaRetribuida) return;

      if (r.disfruteHorasExtra) {
        const min = r.disfruteHorasExtraMin || 0;
        disfruteHorasExtraMin += min;
        saldo -= min;
        return;
      }

      if (r.disfruteExcesoJornada) {
        const min = r.disfruteExcesoJornadaMin || 0;
        disfruteExcesoJornadaMin += min;
        saldo -= min;
        return;
      }

      const g = r.extraGeneradaMin || 0;
      const e = r.excesoJornadaMin || 0;
      const n = r.negativaMin || 0;
      const d = r.disfrutadasManualMin || 0;
      const descuentoDe = r.descuentoDe === "excesoJornada" ? "excesoJornada" : "TxT";

      generadas += g;
      exceso += e;
      negativas += n;
      disfrutadas += d;
      if (descuentoDe === "excesoJornada") {
        negativasExceso += n;
      } else {
        negativasTxT += n;
      }
      saldo += g + e - n - d;
    });

  return {
    generadas,
    exceso,
    negativas,
    disfrutadas,
    disfruteHorasExtraMin,
    disfruteExcesoJornadaMin,
    negativasTxT,
    negativasExceso,
    saldo
  };
}

export function calcularResumenAnual(registros, año) {
  return calcularResumenPeriodo(
    registros,
    d => d.getFullYear() === año
  );
}

export function calcularResumenMensual(registros, mes, año) {
  return calcularResumenPeriodo(
    registros,
    d => d.getFullYear() === año && d.getMonth() === mes
  );
}

/** Resumen de todo el histórico (extra + exceso - negativas - disfrutadas). */
export function calcularResumenTotal(registros) {
  return calcularResumenPeriodo(registros, () => true);
}

/** Lunes y domingo (ISO) de la semana que contiene fechaISO. */
function getLunesDomingoSemana(fechaISO) {
  const [y, m, d] = fechaISO.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const day = date.getDay();
  const diffLunes = day === 0 ? -6 : 1 - day;
  const lunes = new Date(date);
  lunes.setDate(date.getDate() + diffLunes);
  const domingo = new Date(lunes);
  domingo.setDate(lunes.getDate() + 6);
  const toISO = (dt) =>
    dt.getFullYear() + "-" + String(dt.getMonth() + 1).padStart(2, "0") + "-" + String(dt.getDate()).padStart(2, "0");
  return [toISO(lunes), toISO(domingo)];
}

/** Banco de minutos de la semana (GP1/GP2) para la semana que contiene fechaISO. */
export function calcularBancoMinutosSemanaState(state, fechaISO) {
  const [lunesStr, domingoStr] = getLunesDomingoSemana(fechaISO);
  let total = 0;
  const regs = state.registros || {};
  const [ly, lm, ld] = lunesStr.split("-").map(Number);
  const [dy, dm, dd] = domingoStr.split("-").map(Number);
  const start = new Date(ly, lm - 1, ld);
  const end = new Date(dy, dm - 1, dd);
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const iso =
      d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    const r = regs[iso];
    if (!r || r.vacaciones || r.libreDisposicion || r.disfruteHorasExtra) continue;
    total += (r.extraGeneradaMin || 0) - (r.negativaMin || 0);
  }
  return total;
}

/**
 * GP1/GP2: total acumulado de bolsa = saldo previo (horas extra iniciales en minutos)
 * + suma histórica de (extraGeneradaMin − negativaMin) por día (misma lógica que la bolsa semanal).
 */
export function calcularBancoMinutosAcumuladoGP12(state) {
  const inicial = state.config?.horasExtraInicialMin || 0;
  let sum = 0;
  const regs = registrosEfectivosParaBanco(state);
  for (const iso of Object.keys(regs)) {
    const r = regs[iso];
    if (!r || r.vacaciones || r.libreDisposicion || r.disfruteHorasExtra) continue;
    sum += (r.extraGeneradaMin || 0) - (r.negativaMin || 0);
  }
  return inicial + sum;
}

/** Totales TxT / exceso coherentes con la pantalla del banco (GP3/GP4). */
export function computeBancoSnapshotForBackup(state) {
  const regs = registrosEfectivosParaBanco(state);
  const total = calcularResumenTotal(regs);
  const deducciones = state.deduccionesPorAusencia || {};
  const desde = state.config?.bancoCalendarioDesde;
  const deduccionTotalMin = Object.entries(deducciones)
    .filter(([f]) => !desde || f >= desde)
    .reduce((s, [, m]) => s + m, 0);
  const inicialExtra = state.config?.horasExtraInicialMin || 0;
  const inicialExceso = state.config?.excesoJornadaInicialMin || 0;
  const saldoTxT =
    total.generadas -
    total.disfrutadas -
    (total.disfruteHorasExtraMin || 0) -
    total.negativasTxT +
    inicialExtra;
  const saldoExceso =
    total.exceso - (total.disfruteExcesoJornadaMin || 0) - total.negativasExceso + inicialExceso;
  const saldoCombinado = saldoTxT + saldoExceso - deduccionTotalMin;
  return {
    saldoTxTMin: saldoTxT,
    saldoExcesoJornadaMin: saldoExceso,
    saldoCombinadoMin: saldoCombinado,
    deduccionTotalMin,
    inicialExtraMin: inicialExtra,
    inicialExcesoJornadaMin: inicialExceso,
    resumen: total
  };
}

/**
 * Resumen del banco para incrustar en backup (misma lógica que la UI).
 * @param {string} fechaReferenciaISO Fecha "hoy" del usuario al generar la copia (YYYY-MM-DD).
 */
export function computeBackupBancoResumen(state, fechaReferenciaISO) {
  const gp = state.config?.grupoProfesional || "GP1";
  const base = {
    grupoProfesional: gp,
    fechaReferencia: fechaReferenciaISO,
    bancoCalendarioDesde: state.config?.bancoCalendarioDesde ?? null
  };
  if (gp === "GP1" || gp === "GP2") {
    return {
      ...base,
      modo: "minutosSemanales",
      bancoMinutosSemana: calcularBancoMinutosSemanaState(state, fechaReferenciaISO),
      bancoMinutosAcumuladoGP12: calcularBancoMinutosAcumuladoGP12(state)
    };
  }
  return {
    ...base,
    modo: "horasTxt",
    ...computeBancoSnapshotForBackup(state)
  };
}
