// core/calculations.js

export function timeToMinutes(t) {
  if (t == null || typeof t !== "string" || !t.trim()) return 0;
  const parts = t.trim().split(":");
  const h = parseInt(parts[0], 10) || 0;
  const m = parseInt(parts[1], 10) || 0;
  if (Number.isNaN(h) || Number.isNaN(m)) return 0;
  return h * 60 + m;
}

export function minutesToTime(min) {

  const diasExtra = Math.floor(min / (24 * 60));
  const totalMinutes = min % (24 * 60);

  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;

  let resultado =
    `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;

  if (diasExtra > 0) {
    resultado += ` (+${diasExtra})`;
  }

  return resultado;
}

const JORNADA_TURNOS_MIN = 8 * 60; // 480
const EXCESO_JORNADA_TURNOS_MIN = 21;

/** Horas extra en bloques de 15 minutos (redondeo hacia abajo). */
export function extraEnBloques15(min) {
  if (min <= 0) return 0;
  return Math.floor(min / 15) * 15;
}

export function calcularJornada({
  entrada,
  salidaReal,
  jornadaMin,
  minAntes = 0,
  trabajoATurnos = false
}) {

  const entradaMin = timeToMinutes(entrada);
  const jornadaEfectiva = trabajoATurnos ? JORNADA_TURNOS_MIN : jornadaMin;

  let salidaMin;

  if (salidaReal) {
    salidaMin = timeToMinutes(salidaReal);

    if (salidaMin < entradaMin) {
      salidaMin += 24 * 60;
    }

  } else {
    salidaMin = entradaMin + jornadaEfectiva;
  }

  salidaMin -= minAntes;

  const trabajados = salidaMin - entradaMin;

  if (trabajoATurnos) {
    const negativaMin = trabajados < jornadaEfectiva ? jornadaEfectiva - trabajados : 0;
    const excesoJornadaMin = trabajados >= jornadaEfectiva ? EXCESO_JORNADA_TURNOS_MIN : 0;
    const extraGeneradaMin = extraEnBloques15(trabajados > jornadaEfectiva ? trabajados - jornadaEfectiva : 0);

    return {
      trabajadosMin: trabajados,
      salidaTeoricaMin: entradaMin + jornadaEfectiva,
      salidaAjustadaMin: salidaMin,
      extraGeneradaMin,
      negativaMin,
      excesoJornadaMin
    };
  }

  const diferencia = trabajados - jornadaMin;

  return {
    trabajadosMin: trabajados,
    salidaTeoricaMin: entradaMin + jornadaMin,
    salidaAjustadaMin: salidaMin,
    extraGeneradaMin: extraEnBloques15(diferencia > 0 ? diferencia : 0),
    negativaMin: diferencia < 0 ? Math.abs(diferencia) : 0,
    excesoJornadaMin: 0
  };
}

const BOUNDARY_14_MIN = 14 * 60; // 14:00, límite mañana/tarde
const SIX_HOURS_MIN = 6 * 60;

/**
 * Calcula los minutos de TxT (banco de horas) para un día de fin de semana o festivo.
 * Reglas según convenio: sábado/domingo con bonos por mañana/tarde/día completo; festivo 1:1.
 *
 * @param {string} fechaISO - Fecha en YYYY-MM-DD
 * @param {string} entrada - Hora entrada HH:MM
 * @param {string} salidaReal - Hora salida HH:MM
 * @param {number} trabajadosMin - Minutos trabajados reales en el día
 * @param {boolean} esFestivo - Si el día es festivo
 * @returns {number|null} Minutos TxT a sumar al banco, o null si es día laboral (no aplicar)
 */
export function calcularTxTFinDeSemanaYFestivos(fechaISO, entrada, salidaReal, trabajadosMin, esFestivo) {
  const [y, m, d] = fechaISO.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const dow = date.getDay(); // 0 = domingo, 6 = sábado
  const esFinDeSemana = dow === 0 || dow === 6;

  if (!esFestivo && !esFinDeSemana) return null;

  const baseMin = Math.max(0, Number(trabajadosMin) || 0);
  if (baseMin === 0) return 0;

  // Festivo: 1 hora TxT por hora trabajada (1:1), en bloques de 15 min
  if (esFestivo) return extraEnBloques15(baseMin);

  const entradaMin = timeToMinutes(entrada);
  let salidaMin = timeToMinutes(salidaReal);
  if (entrada && salidaReal && salidaMin < entradaMin) salidaMin += 24 * 60;

  const soloManana = salidaMin <= BOUNDARY_14_MIN;
  const soloTarde = entradaMin >= BOUNDARY_14_MIN;
  const diaCompleto = !soloManana && !soloTarde;

  let txtMin;
  if (dow === 6) {
    // Sábado: mañana <6h→1:1, ≥6h→+2h; tarde <6h→1:1, ≥6h→+6h; día completo →+6h
    if (soloManana) {
      txtMin = baseMin >= SIX_HOURS_MIN ? baseMin + 2 * 60 : baseMin;
    } else if (soloTarde) {
      txtMin = baseMin >= SIX_HOURS_MIN ? baseMin + 6 * 60 : baseMin;
    } else {
      txtMin = baseMin + 6 * 60; // día completo
    }
  } else {
    // Domingo (dow === 0): mañana <6h→1:1, ≥6h→+10h; tarde <6h→1:1, ≥6h→+14h; día completo →+14h
    if (soloManana) {
      txtMin = baseMin >= SIX_HOURS_MIN ? baseMin + 10 * 60 : baseMin;
    } else if (soloTarde) {
      txtMin = baseMin >= SIX_HOURS_MIN ? baseMin + 14 * 60 : baseMin;
    } else {
      txtMin = baseMin + 14 * 60; // día completo
    }
  }

  return extraEnBloques15(txtMin);
}
