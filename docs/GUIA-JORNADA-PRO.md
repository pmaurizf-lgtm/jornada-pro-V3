# Guía de uso – Jornada Pro

**Jornada Pro** – Control de jornada laboral  
**Autor:** Pablo Mouriz Fontao

---

## 1. Introducción

Jornada Pro es una aplicación para el control de la jornada laboral: registrar entradas y salidas, calcular horas trabajadas, horas extra, excesos y negativas, y mantener un banco de horas o un banco de minutos semanal según tu grupo profesional. Está pensada para uso en NAVANTIA (Ferrol), con soporte para turnos y festivos locales.

La aplicación ofrece **dos modos** en función del **grupo profesional** (GP1, GP2, GP3 o GP4):

- **GP1 / GP2:** modo **Bolsa de autorregulación** (minutos semanales, lunes a domingo; en fase de implantación experimental).
- **GP3 / GP4:** modo **Horas TxT** (banco de horas anual, con generadas, exceso, negativas, disfrutadas y reglas especiales para fines de semana y festivos).

Los datos se guardan en el propio dispositivo (navegador). Puedes hacer backup y restaurar desde el menú de configuración. En móvil, la aplicación optimiza el consumo (por ejemplo, espaciando las actualizaciones cuando la pestaña está en segundo plano).

---

## 2. Grupo profesional (GP1–GP4)

Al usar la aplicación por primera vez (o si no tienes grupo asignado), se muestra un **modal para elegir tu grupo profesional**: GP1, GP2, GP3 o GP4. Esta elección determina qué pantallas y funciones verás. Tras elegir el grupo, se abre automáticamente el **modal de días de Libre Disposición** del año en curso para que puedas indicar los días LD que tenías antes de usar la app (también puedes hacerlo más tarde en Configuración de jornada o al usar LD por primera vez en un año).

| Grupo   | Modo                  | Banco principal              | Extender jornada | Gráfico | Disfr. TxT / Disfr. exceso |
|--------|------------------------|------------------------------|------------------|---------|----------------------------|
| GP1/GP2| Minutos semanal        | Bolsa de autorregulación     | No               | No      | No                         |
| GP3/GP4| Horas TxT              | Horas TxT (anual)            | Sí               | Sí      | Sí                         |

Puedes **cambiar el grupo profesional** en cualquier momento en **Configuración → Datos personales → Grupo Profesional**. Al cambiar, la interfaz se adapta de inmediato (panel de minutos semanal u Horas TxT, botones visibles, etc.).

---

## 3. Pantalla principal

- **Cabecera:** título de la app, logo y botón de menú (☰) para abrir **Configuración**.
- **Registro diario:** formulario con fecha, entrada, salida y acciones: **Iniciar jornada**, **Finalizar**, **Guardar**, **Vacaciones**, **LD** (Libre Disposición), **Disfr. TxT**, **Disfr. exceso** (solo GP3/GP4), **Licencias Retribuidas**, **Eliminar**.
- **Salidas teórica y ajustada:** se calculan en función de la jornada configurada.
- **Barra de progreso:** indica el avance del día respecto a la jornada nominal (o horas extra en modo extensión para GP3/GP4). Muestra las horas trabajadas, el porcentaje y el **tiempo que queda** hasta el fin de la jornada («Quedan Xh XXm»). El texto está adaptado para leerse bien tanto cuando la barra está poco llena como cuando está casi completa.
- **Feedback al guardar:** al guardar un día con el botón «Guardar» se muestra «Día guardado»; al finalizar la jornada con el deslizador se muestra «Datos actualizados».
- **Resumen del día:**
  - **GP3/GP4:** horas trabajadas, extra, exceso jornada, negativa (en horas y minutos y en decimal).
  - **GP1/GP2:** trabajado, Bolsa de autorregulación (esta semana), hoy (delta). La bolsa se indica en fase de «implantación experimental».
- **Calendario:** vista mensual con registros, saldos y días festivos. En modo minutos semanal se muestra el saldo de la semana; en modo TxT, el saldo del día (+X.Xh / −X.Xh).
- **Banco (pestañas):**
  - **Horas TxT** (o **Bolsa de autorregulación** en GP1/GP2): en GP3/GP4 muestra **Total disponible TxT (acumulado)** y **Total disponible exceso de jornada (acumulado)**. Cada contador de horas se muestra en **tres filas** para evitar confusiones: **horas en decimal** (ej. 12,50h), **horas y minutos** (ej. 12h 30m) y **días** (1 día = 459 min). Lo mismo aplica a los desplegables **Desglose anual** (selector de año; TxT generado, exceso, horas TxT gastadas, horas exceso gastadas) y **Desglose mes** (selector de mes del año en curso; mismas métricas por mes). En GP1/GP2 solo la Bolsa de autorregulación de la semana actual (implantación experimental).
  - **Vacaciones/LD:** días de vacaciones disponibles (año en curso y anterior) y días de Libre Disposición del año en curso.
- **Gráfico:** evolución del banco de horas en el año seleccionado (**solo GP3/GP4**).

---

## 4. Registro diario

### 4.1 Iniciar la jornada

1. Selecciona la **fecha** del día (por defecto es hoy).
2. Pulsa **«Iniciar jornada»**. Se rellenará automáticamente la **hora de entrada** con la hora actual (o la de inicio del turno si tienes turnos configurados).
3. Puedes ajustar manualmente la entrada si lo necesitas.

Solo puede haber una jornada «iniciada» al día. En **GP3/GP4**, si ya has finalizado la jornada y pasas del fin teórico, el botón cambiará a **«Extender jornada»** (ver más adelante). En GP1/GP2 no se ofrece la opción de extender jornada.

### 4.2 Finalizar la jornada

- Cuando tengas entrada puesta y quieras dar por terminado el día:
  1. Usa el **control deslizante** «Desliza para finalizar jornada»: arrastra hasta el final y suelta.
  2. La app pondrá la **hora de salida real** (o la salida teórica si no quieres horas extra).
  3. Se guarda el registro del día, se actualizan calendario, banco y gráfico, y se muestra el mensaje **«Datos actualizados»**.

El botón de finalizar solo está activo si hay una jornada en curso (día con entrada y sin salida guardada, o en «Continuar jornada» / «Extender jornada»).

- **En GP1/GP2** no aparece el modal «¿Vas a extender la jornada?» (estos grupos no generan horas extra). Si deslizas para finalizar **después** del tiempo de jornada estipulado (por defecto 459 minutos), los minutos trabajados de más se añaden a la **Bolsa de autorregulación**. Si deslizas **antes** de completar la jornada, se abre el modal de pase de salida (ver siguiente apartado).

### 4.3 Pase de salida (salir antes de completar la jornada)

Si intentas finalizar o guardar con una hora de salida **anterior al fin teórico** de la jornada, se abre un **modal de pase de salida** con las siguientes opciones:

- **Pase de salida justificado**  
  La jornada se considera completada hasta el fin teórico. Puedes elegir **«Solo registrar pase»** (solo guarda el registro) o **«Registrar y generar formulario PDF»**. Si generas el formulario:
  1. Se abre primero el **modal «Hora de desprazamento»**: indica la hora de salida que figurará en el formulario PDF y en el registro del día (por defecto la hora actual; puedes cambiarla antes de continuar).
  2. A continuación eliges el **motivo** del justificante (una de las tres opciones: consulta médica especialista, pruebas complementarias, consulta pediatría).
  3. Luego puedes **dibujar tu firma** (táctil o con el ratón) en un canvas; la firma se inserta en el formulario encima de «Sinatura do/da traballador/a». Puedes confirmar la firma o continuar sin firmar.
  4. La app genera el **PDF del xustificante de ausencias** (formulario rellenado con tus datos y, si lo elegiste, la firma) y lo descarga directamente con un nombre que incluye la fecha (p. ej. `xustificante-ausencias-2025-02-22.pdf`), sin abrir el diálogo de impresión. En iPhone esto evita tener que usar «Guardar como PDF» desde la impresora.
  El botón principal pasará a «Continuar jornada» si quisieras volver a abrir el día.

- **Pase de salida sin justificar**  
  Se registra la salida y se descuenta del banco el tiempo no trabajado. En **GP3/GP4** se abre un segundo modal: **«¿De qué saldo se descuenta?»**, con dos botones (**TxT** o **Exceso de jornada**); el tiempo no trabajado se descuenta del saldo que elijas. Puedes pulsar **«Continuar jornada»** más tarde para reanudar.

- **Fin de jornada** *(solo GP3/GP4 en el modal; en GP1/GP2 la opción aparece en el mismo modal de pase)*  
  Se da por finalizada la jornada con la hora de salida actual. En **GP3/GP4** se abre el modal **«¿De qué saldo se descuenta?»** (TxT o Exceso de jornada) y la diferencia entre jornada y minutos trabajados se descuenta del saldo elegido. En **GP1/GP2** se descuenta de la **Bolsa de autorregulación**. El día queda cerrado sin opción de «Continuar jornada».

### 4.4 Continuar jornada

Tras un pase (justificado o sin justificar), el botón **«Continuar jornada»** permite reabrir el día para seguir registrando. Al volver a finalizar, se tendrá en cuenta el tiempo total trabajado y las deducciones correspondientes.

### 4.5 Extender jornada (horas extra) – solo GP3/GP4

- Cuando la **jornada nominal** ha terminado (has llegado al fin teórico), la app puede preguntarte **«¿Vas a extender la jornada?»**.  
  - **Sí:** el tiempo que sigas se contará como **horas extra** (en bloques de 15 minutos) hasta que vuelvas a finalizar.
  - **No:** se cierra el día con la salida teórica.

- Si ya cerraste el día y es el mismo día, el botón puede mostrarse como **«Extender jornada»**. Al pulsarlo, se reabre el día en modo extensión y el tiempo adicional se suma como extra hasta que finalices de nuevo.

La extensión solo es posible hasta las 23:59. A partir de medianoche el botón vuelve a «Iniciar jornada» para el nuevo día.

### 4.6 Guardar (registro manual)

- Rellena **fecha**, **entrada** y, si procede, **salida real** y **salir antes (minutos)** (este último solo visible en GP3/GP4).
- Pulsa **«Guardar»** para guardar o modificar el registro de ese día sin usar el flujo de Iniciar/Finalizar.

Si la salida es anterior al fin teórico, se mostrará también el modal de pase de salida.

En **GP3/GP4**, si el día es **sábado, domingo o festivo**, al guardar se aplican automáticamente las **reglas de Horas TxT para fines de semana y festivos** (ver sección 10).

### 4.7 Vacaciones

- Con el día seleccionado en el calendario/formulario, pulsa **«Vacaciones»**.  
- Ese día queda marcado como vacaciones (en el calendario se muestra el icono de playa 🏖️).  
- En un día marcado como vacaciones **no** se pueden usar los controles de entrada/salida ni Iniciar/Finalizar; solo puedes cambiar de fecha, marcar otro día como vacaciones o usar **«Eliminar»** en ese día para quitar la marca.

### 4.8 Libre Disposición (LD)

- Con el día seleccionado, pulsa **«LD»** para marcar ese día como **día de Libre Disposición**.  
- Se descuenta un día del **banco de días LD** del año correspondiente. Si es la primera vez que usas LD en ese año, la app te pedirá que indiques **cuántos días de LD tienes** para ese año (modal «Días de Libre Disposición»).  
- Los días LD se configuran por año en la pestaña **Vacaciones/LD** del panel de métricas (o al pulsar LD el primer día del año). Los días LD caducan el 31 de diciembre del año en curso.

### 4.9 Disfrute de horas TxT (Disfr. TxT) – solo GP3/GP4

- Con el día seleccionado, pulsa **«Disfr. TxT»** para marcar ese día como **día de disfrute de horas del banco TxT**.  
- Se descuenta del banco TxT una **jornada completa** (la duración configurada de tu jornada o 8 h si trabajas a turnos).  
- No se puede usar en un día ya marcado como vacaciones, LD, disfrute TxT o disfrute exceso.

### 4.10 Disfrute de exceso de jornada (Disfr. exceso) – solo GP3/GP4

- Con el día seleccionado, pulsa **«Disfr. exceso»** para marcar ese día como **día de disfrute descontando del saldo de exceso de jornada**.  
- Se descuenta del banco de exceso de jornada una **jornada completa**. En el calendario ese día muestra el icono de **pila gastada** (🪫), centrado y destacado.  
- No se puede usar en un día ya marcado como vacaciones, LD, disfrute TxT o disfrute exceso. El botón tiene un color distinto al de «Disfr. TxT» para diferenciarlo.

### 4.11 Licencias Retribuidas

- Con el día seleccionado (o con la fecha por defecto), pulsa **«Licencias Retribuidas»** (botón verde destacado junto a «Disfr. exceso»). Se abre un **modal** con las opciones de licencia retribuida según el convenio.
- Los días se aplican **desde la fecha actualmente seleccionada** en el calendario. Se tienen en cuenta los **días laborables** (excluyendo sábados, domingos y festivos) cuando la licencia sea en días laborables, o **días naturales** consecutivos cuando corresponda.
- En los tipos que indican **desplazamiento fuera de la provincia**, la app pregunta si hay o no desplazamiento y asigna los días que correspondan (p. ej. 3 o 4 días laborables para fallecimiento de familiar hasta 2º grado; 2 o 4 días naturales para nacimiento de nietos).
- En los tipos que indican **«tiempo necesario»**, la app pide el **número de días** necesarios y aplica esa cantidad de días laborables desde la fecha seleccionada.
- Cualquier día marcado como licencia retribuida puede **eliminarse** con el botón **«Eliminar»** (seleccionando ese día y confirmando). En el calendario, los días de licencia retribuida se muestran con el icono **🎫** (ticket/permiso), bien visible.

**Esquema de licencias retribuidas** (referencia según convenio):

**1️⃣ Fallecimiento**

- **Cónyuge, pareja, hijo o familiar de 1º grado de consanguinidad**  
  ➜ 5 días laborables.

- **Familiares hasta 2º grado de consanguinidad o afinidad**  
  ➜ 3 días laborables (4 días laborables si hay desplazamiento fuera de la provincia).

- **Familiares de 3º grado y primos hermanos (consanguinidad o afinidad)**  
  ➜ 1 día laborable.

**2️⃣ Enfermedad grave / hospitalización**

- Accidente o enfermedad grave, hospitalización o intervención quirúrgica sin hospitalización que requiera reposo domiciliario del: cónyuge, pareja de hecho, familiares hasta 2º grado, familiar consanguíneo de la pareja, persona conviviente que requiera cuidado efectivo.  
  ➜ 5 días laborables.

**3️⃣ Matrimonio y celebraciones familiares**

- **Matrimonio o inscripción como pareja de hecho** de hijos, hermanos o padres  
  ➜ 1 día natural (día de la ceremonia).

- **Primera comunión o bautizo** de hijos o nietos (u otra ceremonia religiosa similar)  
  ➜ 1 día (día de la ceremonia).

**4️⃣ Nacimiento**

- **Nacimiento de hijo**  
  ➜ 3 días laborables (prorrogables en caso de complicaciones médicas graves; si ocurre en vacaciones, interrumpe las vacaciones).

- **Nacimiento de nietos**  
  ➜ 2 días naturales (4 días naturales si hay desplazamiento fuera de la provincia).

**5️⃣ Matrimonio propio**

- Permiso por matrimonio propio.  
  ➜ Puede disfrutarse dentro del año siguiente a la celebración; no es obligatorio que coincida con la fecha del evento. En la app se indica el tiempo necesario (número de días).

**6️⃣ Embarazo / adopción**

- **Exámenes prenatales y técnicas de preparación al parto**  
  ➜ Por el tiempo necesario. También aplica para adopción, guarda con fines de adopción y acogimiento (sesiones informativas e informes previos). En la app se indica el número de días necesarios.

**7️⃣ Traslado**

- **Traslado de domicilio habitual**  
  ➜ 2 días (pueden disfrutarse en días alternos).

**8️⃣ Funciones públicas**

- **Funciones municipales o autonómicas no retribuidas**  
  ➜ Tiempo necesario (con convocatoria y justificación). En la app se indica el número de días.

- **Deber inexcusable de carácter público y personal** (ej. citación judicial, Hacienda, renovación DNI/Pasaporte si no puede hacerse fuera del horario laboral)  
  ➜ Tiempo necesario. En la app se indica el número de días.

**9️⃣ Lactancia y guarda legal**

- **Cuidado de hijos menores de 12 meses (lactancia)**  
  ➜ 2 horas de ausencia diaria (divisible en dos fracciones), o reducción de jornada de 1 hora, o acumulación en 21 días laborables.

- **Guarda legal de menor de 12 años o persona con discapacidad**  
  ➜ Reducción de jornada (entre 1/8 y 1/2), con reducción proporcional del salario.

Estas dos últimas (lactancia y guarda legal) no implican días completos en el calendario; la app muestra un aviso informativo al seleccionarlas.

### 4.12 Eliminar registro del día

- Con el día seleccionado, pulsa **«Eliminar»**.  
- Aparece un **modal de confirmación** que indica que se borrarán todos los datos de ese día (entrada, salida, tipo de día) y que la acción no se puede deshacer. Se muestra **el día concreto** (p. ej. «Día: lunes, 24 de febrero de 2025») para que confirmes que es el correcto. Pulsa **«Eliminar»** para confirmar o **«Cancelar»** para mantener el registro.  
- El día vuelve a estar «vacío» para poder registrarlo de nuevo si quieres. Si eliminabas un día de vacaciones o LD, el día correspondiente se devuelve al banco de vacaciones o LD.

### 4.13 Otros campos

- **Salir antes (minutos):** (solo GP3/GP4) minutos que sales antes de la salida teórica (reduce tiempo trabajado / puede generar negativa).

---

## 5. Calendario

- Muestra el mes actual (o el que navegues con las flechas).
- Cada celda es un día. **Pulsando** en un día lo seleccionas y se cargan sus datos en el formulario de registro.
- **Indicadores en las celdas:**
  - **Triángulo verde con ✓:** jornada completada (entrada y salida registradas).
  - **+X.Xh / −X.Xh:** (modo TxT, GP3/GP4) saldo del día (positivo o negativo respecto a la jornada).
  - En **modo minutos semanal (GP1/GP2):** se muestra la Bolsa de autorregulación de la semana y el delta del día.
  - **Disfr. X.Xh:** horas disfrutadas ese día (GP3/GP4).
  - **🪫 (pila gastada):** día marcado como disfrute de exceso de jornada (Disfr. exceso); el icono aparece centrado y destacado en la celda.
  - **🎫:** día marcado como licencia retribuida (Licencias Retribuidas); el icono aparece centrado y destacado en la celda.
  - **🏖️:** día marcado como vacaciones.
  - **🕶️:** día de Libre Disposición.
- **Festivos:** se muestran resaltados (nacional, Galicia, Ferrol). Pulsar en un festivo muestra su nombre.
- Sábados y domingos tienen un estilo diferenciado.

---

## 6. Banco de horas / Banco de minutos

La sección de métricas tiene **dos pestañas**:

### 6.1 Pestaña «Horas TxT» (o «Bolsa de autorregulación» en GP1/GP2)

- **Si tu grupo es GP1 o GP2:** se muestra la **Bolsa de autorregulación (esta semana)** (lunes a domingo), indicada en la aplicación como en fase de **implantación experimental**. No hay gráfico ni saldo anual de horas. Los minutos trabajados por encima de la jornada se suman a la bolsa; los trabajados por debajo se descuentan.

  **¿Qué significa Bolsa de autorregulación según el Convenio Intercentros 2022-2029?**

  1. **Es una prueba piloto.** No es un sistema totalmente desarrollado en el texto del convenio, sino una implantación experimental a nivel corporativo.

  2. **Solo para GP1 y GP2.** No aplica a GP3 y GP4 (que funcionan con TxT y otros sistemas).

  3. **Solo para excesos de lunes a viernes.** La bolsa se refiere a *«excesos de jornada que puedan ser realizados de lunes a viernes»* (BOE-A-2026-2706). Por tanto no menciona sábados ni domingos; no regula fines de semana dentro de esta bolsa.

  4. **Genera descanso, no pago automático.** El objetivo es que el colectivo *«pueda disponer de los tiempos de descanso generados»* (BOE-A-2026-2706). Se acumulan horas, se compensan con descanso; las condiciones concretas deben acordarse entre empresa y parte social.

  5. **Falta desarrollo concreto.** El propio texto indica que *«las condiciones se acordarán entre las partes firmantes»* (BOE-A-2026-2706). El convenio no fija límites máximos, caducidad, equivalencias económicas ni porcentaje de compensación; todo ello queda pendiente de acuerdo posterior.

  **Resumen:**

  | Aspecto | Regulación en el convenio |
  |--------|----------------------------|
  | ¿Existe bolsa de horas? | Sí (GP1–GP2) |
  | ¿Es definitiva? | No, prueba piloto |
  | ¿Aplica a sábados? | No se menciona |
  | ¿Es descanso o dinero? | Descanso |
  | ¿Está totalmente regulada? | No, pendiente de acuerdo |

- **Si tu grupo es GP3 o GP4:** se muestra el panel **Horas TxT** con:
  - **Siempre visibles:**  
    **Total disponible TxT (Acumulado)** y **Total disponible exceso de jornada (Acumulado)**. Cada uno muestra en **tres filas**: horas con dos decimales, horas y minutos (h+m), y **días disponibles** (1 día = 459 minutos de jornada).
  - **Desplegable «Desglose anual»** (cerrado por defecto): selector de **Año** y, al abrirlo, **TxT generado (Anual)**, **Exceso de jornada (Anual)**, **Horas TxT gastadas (Anual)** y **Horas exceso jornada gastadas (Anual)**. Todas las métricas en tres filas: decimal, h+m y días.
  - **Desplegable «Desglose mes»** (cerrado por defecto): selector de **Mes** (Enero a Diciembre) del **año en curso**. Al abrirlo: **TxT generado**, **Exceso de jornada**, **Horas TxT gastadas** y **Horas exceso jornada gastadas** correspondientes al mes elegido (mismo formato en tres filas).
  - Los saldos TxT y exceso se calculan por separado: las negativas al salir antes o fin de jornada se asignan a TxT o a exceso según lo que elijas en el modal «¿De qué saldo se descuenta?».

El saldo inicial (horas extra previas, exceso previo, días de vacaciones previos y días de Libre disposición previos) se configura en **Configuración → Configuración de jornada**. El botón **«Resetear saldo previo»** pone a cero las horas extra previas, el exceso previo y los días LD previos del año en curso (solo GP3/GP4 para horas/exceso; LD aplica a todos los grupos).

### 6.2 Pestaña «Vacaciones/LD»

- **Vacaciones:** total días disponibles, año en curso, año anterior (si aplica) y leyenda de caducidad.
- **Libre disposición:** días LD del año en curso. Los días LD se indican por año: la primera vez que usas LD en un año se abre el modal para introducir el número de días de ese año; también puedes indicar los **días LD previos** (antes de usar la app) en **Configuración de jornada → Saldo previo** o en el modal que aparece al elegir el grupo profesional la primera vez.

---

## 7. Gráfico

- Muestra la evolución del **banco de horas** a lo largo del año seleccionado.
- **Solo visible en GP3/GP4.** En GP1/GP2 esta tarjeta no se muestra.

---

## 8. Configuración

Se abre desde el **menú (☰)** de la cabecera. Está organizada en bloques desplegables:

### 8.1 Datos personales

- **Nombre completo:** para exportaciones o identificación.
- **Número SAP:** 8 cifras (opcional).
- **Centro de coste:** opcional.
- **Grupo Profesional:** GP1, GP2, GP3 o GP4. Al cambiar, la interfaz pasa a modo minutos semanal (GP1/GP2) o Horas TxT (GP3/GP4).

### 8.2 Configuración de la aplicación

- **Tema:** Claro / Oscuro.
- **Texto más grande:** activar para aumentar el tamaño de fuente en toda la app y mejorar la legibilidad.
- **Notificaciones:** activar o desactivar. Las notificaciones (aviso previo al fin de jornada y aviso de fin de jornada) **solo funcionan con la app abierta** en primer plano.
- **Aviso antes de terminar (min):** minutos antes del fin teórico en que quieres recibir el aviso.
- **Recordatorio fichar (hora):** si no has fichado la entrada ese día, la app puede mostrarte un aviso a esa hora (una vez al día).

### 8.3 Configuración de jornada

- **Jornada (min):** duración nominal de la jornada en minutos (p. ej. 459 para 7h 39min).
- **Trabajo a turnos:** activar si trabajas por turnos.
- **Turno:** elegir horario (06-14, 14-22, 22-06) cuando turnos está activo.
- **Saldo previo (antes de usar la app):**
  - **Horas extra previas / Exceso de jornada previas:** (solo GP3/GP4) saldo que arrastras de antes de usar la app.
  - **Días de vacaciones previos:** corresponden al año anterior; se suman al total disponible de vacaciones.
  - **Días de Libre disposición previos (año en curso):** días LD que tenías antes de usar la app para el año en curso. También puedes indicarlos en el modal que aparece al elegir el grupo profesional la primera vez, o al usar LD por primera vez en un año.
- **Resetear saldo previo:** (solo GP3/GP4 para horas/exceso) pone a cero las horas extra previas, el exceso previo y los días de Libre disposición previos del año en curso.

### 8.4 Copia de datos y seguridad

- **Indicador de backup:** encima de los botones de exportación se muestra el **último backup** («Último backup: hoy» / «hace X días» o «Aún no has hecho ningún backup…»). La app también te recuerda periódicamente (p. ej. cada 7 días) que hagas una copia de seguridad.
- **Rango (opcional):** puedes indicar fechas «Desde» y «Hasta» para limitar los datos exportados. Los botones **«Mes actual»** y **«Año actual»** rellenan ese rango y lanzan la exportación a Excel con un solo clic.
- **Exportar Excel:** descarga una hoja con los registros (fechas, tipo de día, entradas, salidas, generadas, exceso, negativas, disfrutadas, vacaciones, LD, etc.). Si has puesto rango, solo se exportan esos días.
- **Backup:** descarga un archivo JSON con todos los datos (registros, configuración, banco, etc.). Si has puesto rango, el backup puede limitarse a ese intervalo. Tras descargar, se actualiza la fecha del «último backup».
- **Informe PDF (mes):** genera un informe en PDF del mes para imprimir o guardar.
- **Restaurar:** sube un archivo de backup (JSON) para recuperar un estado guardado. Si hay datos locales más recientes, la app te pregunta si quieres sobrescribir.
- **Restaurar valores de fábrica:** borra todos los datos y deja la app como recién instalada. Se pide confirmación antes de ejecutar.
- **Borrar todos los datos:** borra registros, configuración, banco y datos personales de forma permanente. Se pide **doble confirmación**: debes marcar la casilla «Entiendo que se borrará todo de forma permanente» y pulsar «Borrar todo». Tras confirmar, la app se reinicia con estado inicial.

**Guardar configuración:** después de cambiar cualquier opción, pulsa **«Guardar configuración»** para que los cambios se apliquen.

### 8.5 Guía e instalación

- **Ver guía de la app:** abre esta guía en una nueva pestaña.
- **Qué hay de nuevo:** abre un modal con el **changelog** (versiones y novedades de la aplicación).
- **Añadir a pantalla de inicio (iOS):** abre un modal con las instrucciones para instalar la app en iPhone o iPad (Safari → Compartir → «Añadir a la pantalla de inicio»). Así tendrás el icono de Jornada Pro en la pantalla de inicio como una app.

Al final del panel aparecen el nombre de la app, la versión y el autor (Acerca de).

---

## 9. Notificaciones y recordatorios

- Si las notificaciones están activadas en configuración, la app puede mostrarte:
  - Un **aviso unos minutos antes** del fin teórico de la jornada.
  - Un **aviso al llegar** al fin teórico.
- Estas notificaciones **solo se muestran cuando la aplicación está abierta** (en primer plano). No se envían con la app en segundo plano o cerrada.
- **Recordatorio de entrada:** si has configurado una **hora de recordatorio para fichar** (Configuración aplicación), y ese día no has fichado la entrada, la app te mostrará un aviso tipo «¿Has fichado la entrada hoy?» a esa hora (una vez al día).
- **Recordatorio de salida:** si has fichado la entrada pero no la salida, y han pasado **9 o más horas** desde la entrada, la app te mostrará una vez el aviso «¿Has fichado la salida?» (una vez por día).
- **Recordatorio de backup:** la app te recuerda cada cierto tiempo (p. ej. si hace más de 7 días del último backup) que hagas una copia de seguridad en Configuración → Backup.

---

## 10. Horas TxT en fines de semana y festivos (GP3/GP4)

Cuando registras una jornada en **sábado**, **domingo** o **festivo** (y tu grupo es GP3 o GP4), el tiempo se convierte a **Horas TxT** según las siguientes reglas. El límite entre «mañana» y «tarde» es las **14:00**.

### 10.1 Sábado

- **Solo mañana** (antes de 14:00):  
  - Menos de 6 horas trabajadas → 1 hora de TxT por cada hora trabajada.  
  - 6 o más horas → se añaden **2 horas** a las horas trabajadas (ej.: 6 h → 8 h TxT, 7 h → 9 h, 8 h → 10 h).
- **Solo tarde** (desde las 14:00), con un mínimo de 6 horas trabajadas para el bonus:  
  - Menos de 6 h trabajadas → 1:1 (ej.: 5 h → 5 h TxT).  
  - 6 o más horas → horas trabajadas **+ 6** (ej.: 6 h → 12 h TxT, 8 h → 14 h TxT).
- **Mañana y tarde** (día completo): **horas trabajadas + 6** (ej.: 06:00 a 18:00 = 12 h → 18 h TxT).

### 10.2 Domingo

- Misma estructura que el sábado, con **bonos distintos**:
  - **Solo mañana:** &lt; 6 h → 1:1; ≥ 6 h → horas **+ 10** (ej.: 6 h → 16 h TxT).
  - **Solo tarde:** &lt; 6 h → 1:1; ≥ 6 h → horas **+ 14** (ej.: 6 h → 20 h TxT).
  - **Mañana y tarde:** horas trabajadas **+ 14** (ej.: 06:00 a 18:00 = 12 h → 26 h TxT).

### 10.3 Festivos

- **1 hora de TxT por cada hora trabajada** (1:1), con independencia del día de la semana.

Estas reglas se aplican **automáticamente** al guardar o finalizar la jornada en un día que sea sábado, domingo o festivo.

---

## 11. Accesibilidad

- Los botones principales (Iniciar jornada, Guardar, Eliminar, Vacaciones, LD, etc.) tienen **etiquetas para lectores de pantalla** (aria-label) para facilitar el uso con tecnología de asistencia.
- La opción **«Texto más grande»** en Configuración permite aumentar el tamaño de fuente en toda la aplicación.

---

## 12. Vista móvil

En pantallas pequeñas (móvil) la aplicación adapta el diseño para un uso cómodo:

- **Bloques y cabecera:** todos los bloques (registro, calendario, gráfico, banco) tienen el mismo ancho y no se cortan por los laterales; la barra superior y las tarjetas mantienen las **esquinas redondeadas** visibles.
- **Botones de acciones:** los botones del registro (Guardar, Edición jornada, Vacaciones, LD, Disfr. TxT, Disfr. exceso, Licencias Retribuidas, Eliminar) se muestran **en filas de dos** para ahorrar espacio.
- **Salidas y resumen del día:** las cajas «Salida teórica» y «Salida ajustada» aparecen una debajo de la otra; en el resumen del día, cada línea (Trabajado, Extra, etc.) muestra la etiqueta y el valor **en filas separadas** para mayor claridad.
- **Calendario:** las celdas de los días tienen **tamaño fijo** (no cambian al rellenar contenido), con tipografía compacta para que el número del día y los saldos (decimal, h+m) se vean completos; los iconos (vacaciones, LD, completado, etc.) están escalados para no desbordar.
- **Banco de horas:** los contadores (Total TxT, Total exceso, desgloses) muestran **decimal, minutos (h+m) y días en filas distintas** para evitar confusiones, tanto en el calendario como en la pestaña Horas TxT.

---

## 13. Resumen rápido

| Acción | Dónde |
|--------|--------|
| Empezar el día | Iniciar jornada |
| Terminar el día | Deslizar para finalizar jornada |
| Salir antes de hora | Modal → Pase justificado / sin justificar |
| Seguir después del fin teórico (GP3/GP4) | Extender jornada (Sí en el modal o botón) |
| Guardar a mano un día | Rellenar fecha, entrada, salida → Guardar |
| Marcar vacaciones | Vacaciones |
| Marcar Libre Disposición | LD (indicar días LD del año si es la primera vez, o en Configuración de jornada → Saldo previo) |
| Disfrutar horas TxT (GP3/GP4) | Disfr. TxT |
| Disfrutar exceso de jornada (GP3/GP4) | Disfr. exceso |
| Marcar días de licencia retribuida | Licencias Retribuidas (modal con opciones) |
| Borrar el día | Eliminar (con confirmación) |
| Cambiar grupo, tema, notificaciones, jornada | Menú ☰ → Configuración |
| Exportar datos | Configuración → Exportar Excel / Backup (puedes usar «Mes actual» o «Año actual» para el rango) |
| Ver novedades | Configuración → Qué hay de nuevo |
| Instalar en iPhone/iPad | Configuración → Añadir a pantalla de inicio (iOS) |
| Borrar todo (doble confirmación) | Configuración → Borrar todos los datos |
| Dejar la app como nueva | Configuración → Restaurar valores de fábrica |

---

*Documento generado para Jornada Pro. Para convertir esta guía a PDF, abre el archivo `GUIA-JORNADA-PRO.html` en un navegador y usa Imprimir → Guardar como PDF.*
