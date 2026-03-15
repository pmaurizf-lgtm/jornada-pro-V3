/**
 * Tests unitarios para core/calculations.js
 * Ejecutar con: node tests/core/calculations.test.mjs
 */
import { timeToMinutes, minutesToTime, extraEnBloques15, calcularJornada, calcularTxTFinDeSemanaYFestivos } from "../../core/calculations.js";

function assert(cond, msg) {
  if (!cond) throw new Error(msg || "Assertion failed");
}

// timeToMinutes
assert(timeToMinutes("08:00") === 480, "08:00 = 480 min");
assert(timeToMinutes("14:30") === 870, "14:30 = 870 min");
assert(timeToMinutes("00:00") === 0, "00:00 = 0");
assert(timeToMinutes("") === 0, "vacío = 0");
assert(timeToMinutes(null) === 0, "null = 0");

// minutesToTime
assert(minutesToTime(480) === "08:00", "480 min = 08:00");
assert(minutesToTime(90) === "01:30", "90 min = 01:30");
assert(minutesToTime(0) === "00:00", "0 = 00:00");

// extraEnBloques15
assert(extraEnBloques15(0) === 0, "0 -> 0");
assert(extraEnBloques15(14) === 0, "14 -> 0");
assert(extraEnBloques15(15) === 15, "15 -> 15");
assert(extraEnBloques15(29) === 15, "29 -> 15");
assert(extraEnBloques15(30) === 30, "30 -> 30");
assert(extraEnBloques15(60) === 60, "60 -> 60");

// calcularJornada (jornada normal, sin turnos)
const r1 = calcularJornada({ entrada: "08:00", salidaReal: "16:39", jornadaMin: 459, minAntes: 0, trabajoATurnos: false });
assert(r1.trabajadosMin === 519, "trabajados 8h39");
assert(r1.extraGeneradaMin === 60, "extra 1h en bloques 15");
assert(r1.negativaMin === 0, "sin negativa");

const r2 = calcularJornada({ entrada: "08:00", salidaReal: "15:30", jornadaMin: 459, minAntes: 0, trabajoATurnos: false });
assert(r2.negativaMin === 9, "negativa 9 min");
assert(r2.extraGeneradaMin === 0, "sin extra");

// calcularTxTFinDeSemanaYFestivos
const txtSab = calcularTxTFinDeSemanaYFestivos("2025-02-22", "08:00", "14:00", 360, false);
assert(txtSab === 360, "sábado 6h -> 360 min TxT");
const txtLaboral = calcularTxTFinDeSemanaYFestivos("2025-02-24", "08:00", "16:00", 480, false);
assert(txtLaboral === null, "lunes no aplica TxT");

console.log("✓ calculations.test.mjs: todos los tests pasaron");
