# Pedido de cambio formal – Versión 1.3

## Descripción

Nuevo requerimiento solicitado por el cliente:
👉 **Agregar la opción de reprogramar un turno existente** desde el panel del cliente.

## Nueva Historia de Usuario (HU4)

**HU4**: Como cliente, quiero reprogramar un turno existente para cambiar la fecha sin tener que cancelarlo y volver a reservar.

## Impacto

- Requiere cambios en la lógica de turnos (`GestorTurnos.js`)
- Debe validarse disponibilidad antes de actualizar la fecha
- Cambios en UI del componente `ReservaTurno.js`

## Gestión del cambio

- El cambio se registra con la etiqueta `change-request` en el tablero Trello.
- Se documenta en esta versión (`v1.3`)
- Se planifica para implementación en la próxima iteración
