# ADR-002 · El alquiler activo no llama al inventario
Fecha: 28 de septiembre de 2026 · Estado: aceptada

## Contexto
`cart` guarda el alquiler activo del cliente (hoy una sola bicicleta a la vez).
Es el estado de la sesión del cliente; `bikeService` es el estado del negocio.
Son dos cosas distintas que hoy cambian juntas, pero no por las mismas razones:
el negocio ya pidió permitir varias bicicletas por cliente y cobrar por tiempo real.

## Drivers que mandan
- **Modificabilidad:** cambiar las reglas de alquiler (varias bicicletas, tiempo
  máximo, descuentos) no debe obligar a editar el inventario.
- **Simplicidad:** cada módulo tiene un solo motivo para cambiar.

## Decisión
El módulo `cart` **no importa** a `bikeService`, `ui` ni `app`.
Solo guarda lo que le entregan (`addRental`) y lo devuelve (`getRental`,
`clearRental`). Coordinar inventario y alquiler es trabajo de la capa que
orquesta, `ui`.

## Alternativas consideradas
Que `cart` consulte directamente a `bikeService` para validar disponibilidad:
descartada. Evita repetir una validación, pero une los dos módulos: cambiar uno
obliga a revisar el otro y no se pueden probar por separado.

## Consecuencias
**Ganamos:** el alquiler y el inventario evolucionan por separado; `cart` se prueba
sin necesitar bicicletas reales.
**Pagamos:** `ui` (`handleRent` y `handleReturn`) es quien mantiene ambos módulos
sincronizados. Si alguien olvida llamar a los dos, el alquiler y la disponibilidad
se desajustan.

## Cómo se verifica
Regla **R2** en `arquitectura/reglas.json`, revisada por el pipeline en cada cambio.
