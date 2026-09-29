# ADR-001 · El inventario de bicicletas no conoce a la interfaz
Fecha: 28 de septiembre de 2026 · Estado: aceptada

## Contexto
`bikeService` guarda las bicicletas (modelo, precio por hora, disponibilidad) y
sabe alquilarlas y devolverlas. Hoy los datos viven en memoria, pero el negocio
ya habló de guardarlos en una base de datos y de sumar más sedes con su propio
inventario.

## Drivers que mandan
- **Modificabilidad:** cambiar de dónde salen las bicicletas (memoria, base de datos,
  API) no debe obligar a tocar la pantalla ni el alquiler.
- **Testabilidad:** las reglas de disponibilidad se deben poder probar sin abrir un
  navegador ni dibujar HTML.

## Decisión
El módulo `bikeService` **no importa** a `ui`, `cart` ni `app`.
Solo expone funciones (`getBikes`, `rentBike`, `returnBike`) y quien lo necesite
lo llama. Las dependencias apuntan hacia el inventario, nunca desde él.

## Alternativas consideradas
Que `bikeService` avise a la pantalla o al alquiler cuando una bicicleta cambia
de estado: descartada. Parece cómodo, pero convierte al inventario en dependiente
de quienes lo consumen y cualquier cambio de pantalla lo puede romper.

## Consecuencias
**Ganamos:** el inventario se puede reemplazar por una base de datos o una API sin
tocar `ui`, `cart` ni `app`.
**Pagamos:** `bikeService` no puede "empujar" cambios a la pantalla; quien
orquesta (`ui`) tiene que volver a pedir los datos y repintar.

## Cómo se verifica
Regla **R1** en `arquitectura/reglas.json`, revisada por el pipeline en cada cambio.
