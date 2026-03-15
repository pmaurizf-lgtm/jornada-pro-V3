# Plantilla para formulario de pase de salida justificado

La app puede rellenar un formulario tipo con los datos personales y del día, y abrirlo para imprimir o guardar como PDF.

La plantilla por defecto (`plantilla-pase-justificado.html`) replica el **Xustificante de ausencias** (formato oficial en gallego: datos do traballador/a, hora de desprazamento, opcións LS3, e bloque para o facultativo). Si tienes el Word original, puedes usarlo como referencia; la app no rellena archivos .docx directamente (requeriría otro tipo de integración), pero el HTML incluido reproduce el mismo contenido y estructura para que al imprimir/guardar como PDF obtengas un documento equivalente.

## Formato del archivo

- **Formato:** archivo **HTML** (por ejemplo `plantilla-pase-justificado.html`).
- **Ubicación:** en la **raíz del proyecto** (misma carpeta que `index.html`), para que la app pueda cargarlo.
- **Codificación:** UTF-8.

## Marcas (placeholders) que reemplaza la app

Escribe en el HTML exactamente estas cadenas; la app las sustituye por los valores guardados o del día:

| Marca | Descripción | Origen en la app |
|-------|-------------|-------------------|
| `{{NOMBRE_COMPLETO}}` | Nombre y apellidos | Config → Datos personales |
| `{{NUMERO_SAP}}` | Número SAP | Config → Datos personales |
| `{{CENTRO_COSTE}}` | Centro de coste | Config → Datos personales |
| `{{GRUPO_PROFESIONAL}}` | GP1, GP2, GP3 o GP4 | Config → Datos personales |
| `{{FECHA}}` | Fecha del pase (ej. 15 de marzo de 2026) | Día actual / día del registro |
| `{{DIA}}` | Día del mes (número) | Para “Ferrol, a [día] de [mes] de [año]” |
| `{{MES}}` | Nombre del mes (en gallego) | Ej. Marzo |
| `{{ANHO}}` | Año (4 cifras) | Ej. 2026 |
| `{{HORA_ENTRADA}}` | Hora de entrada del día | Registro del día |
| `{{HORA_SALIDA}}` | Hora de salida (pase) | Hora al solicitar el pase |
| `{{FECHA_HORA_ACTUAL}}` | Fecha y hora de la solicitud | Momento de pulsar "Generar PDF" |

Puedes usar cada marca tantas veces como necesites en el HTML.

## Cómo obtener el PDF

1. El usuario elige **Pase de salida justificado** en el modal.
2. Si elige **Registrar y generar formulario PDF**, la app carga la plantilla, reemplaza las marcas y abre una ventana de impresión (Imprimir → Guardar como PDF).
3. Si no existe `plantilla-pase-justificado.html` en la raíz, se usa una plantilla mínima incluida en la app.

## Ejemplo mínimo de plantilla

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Pase de salida justificado</title>
  <style>
    body { font-family: sans-serif; padding: 2rem; max-width: 600px; margin: 0 auto; }
    .campo { margin-bottom: 1rem; }
    .etiqueta { font-weight: bold; display: block; margin-bottom: 0.25rem; }
    .valor { border-bottom: 1px solid #333; padding: 0.25rem 0; }
    @media print { body { padding: 1rem; } }
  </style>
</head>
<body>
  <h1>Pase de salida justificado</h1>
  <div class="campo">
    <span class="etiqueta">Nombre:</span>
    <span class="valor">{{NOMBRE_COMPLETO}}</span>
  </div>
  <div class="campo">
    <span class="etiqueta">Nº SAP:</span>
    <span class="valor">{{NUMERO_SAP}}</span>
  </div>
  <div class="campo">
    <span class="etiqueta">Centro de coste:</span>
    <span class="valor">{{CENTRO_COSTE}}</span>
  </div>
  <div class="campo">
    <span class="etiqueta">Grupo profesional:</span>
    <span class="valor">{{GRUPO_PROFESIONAL}}</span>
  </div>
  <div class="campo">
    <span class="etiqueta">Fecha:</span>
    <span class="valor">{{FECHA}}</span>
  </div>
  <div class="campo">
    <span class="etiqueta">Hora entrada:</span>
    <span class="valor">{{HORA_ENTRADA}}</span>
  </div>
  <div class="campo">
    <span class="etiqueta">Hora salida (pase):</span>
    <span class="valor">{{HORA_SALIDA}}</span>
  </div>
  <p><small>Solicitud generada: {{FECHA_HORA_ACTUAL}}</small></p>
</body>
</html>
```

Guarda este contenido (o tu versión) como **plantilla-pase-justificado.html** en la raíz del proyecto y la app lo usará al generar el formulario.

## Personalización

- Puedes cambiar el diseño, estilos y textos.
- Puedes añadir más líneas (motivo, firma, etc.); para datos que no estén en la app, deja el espacio en blanco o un texto fijo para rellenar a mano después de imprimir.
- No elimines las marcas `{{...}}` que quieras que la app rellene; si una marca no existe en la lista anterior, se dejará tal cual en el HTML.
