// Simulación de lógica de turnos (con reprogramación)

export const turnos = [];

export function reservarTurno(usuario, fecha) {
  turnos.push({ usuario, fecha });
}

export function cancelarTurno(usuario) {
  const index = turnos.findIndex(t => t.usuario === usuario);
  if (index !== -1) turnos.splice(index, 1);
}

// 🔄 Nueva función simulada para HU4
export function reprogramarTurno(usuario, nuevaFecha) {
  const turno = turnos.find(t => t.usuario === usuario);
  if (turno) turno.fecha = nuevaFecha;
}
