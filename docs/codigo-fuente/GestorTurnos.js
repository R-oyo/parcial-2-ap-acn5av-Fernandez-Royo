// Lógica simulada para gestión de turnos

export const turnos = [];

export function reservarTurno(usuario, fecha) {
  turnos.push({ usuario, fecha });
}

export function cancelarTurno(usuario) {
  const index = turnos.findIndex(t => t.usuario === usuario);
  if (index !== -1) turnos.splice(index, 1);
}
