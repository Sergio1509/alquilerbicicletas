# ADR-003 · El punto de entrada solo arranca la aplicación
Fecha: 28 de septiembre de 2026 · Estado: aceptada

## Contexto
`app.js` es lo primero que se ejecuta al cargar la página. Es fácil que, con el
tiempo, todo el mundo empiece a "meter una cosita" ahí: cargar datos, validar,
preparar el alquiler.

## Driver que manda
- **Modificabilidad:** si el arranque conoce al inventario y al alquiler, la lógica
  de negocio queda repartida en dos lugares y cada cambio hay que hacerlo dos veces.

## Decisión
`app` **no importa** a `bikeService` ni a `cart`. Solo conoce a `ui` y le pide
pintar (`render`). Toda coordinación entre inventario y alquiler vive en un único
sitio: `ui`.

## Alternativas consideradas
Que `app` precargue las bicicletas o restaure el alquiler antes de pintar:
descartada. Es más rápido de escribir, pero parte la responsabilidad en dos y
`ui` deja de ser el único que orquesta.

## Consecuencias
**Ganamos:** un solo punto de coordinación; `app.js` se mantiene de pocas líneas y
fácil de leer.
**Pagamos:** si algún día se necesita inicializar algo antes de pintar (por
ejemplo, cargar datos de una API), hay que hacerlo desde `ui` o crear un módulo
nuevo de arranque; no se puede "aprovechar" `app.js`.

## Cómo se verifica
Regla **R3** en `arquitectura/reglas.json`, revisada por el pipeline en cada cambio.
