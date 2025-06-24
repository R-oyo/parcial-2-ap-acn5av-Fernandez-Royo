// Lógica simulada para gestión de turnos

export const turnos = []
export const horariosDisponibles = [
  { id: 1, dia: 'Lunes', horaInicio: '09:00', horaFin: '17:00', disponible: true },
  { id: 2, dia: 'Martes', horaInicio: '09:00', horaFin: '17:00', disponible: true },
  { id: 3, dia: 'Miércoles', horaInicio: '09:00', horaFin: '17:00', disponible: true },
  { id: 4, dia: 'Jueves', horaInicio: '09:00', horaFin: '17:00', disponible: true },
  { id: 5, dia: 'Viernes', horaInicio: '09:00', horaFin: '17:00', disponible: true },
  { id: 6, dia: 'Sábado', horaInicio: '10:00', horaFin: '14:00', disponible: true },
  { id: 7, dia: 'Domingo', horaInicio: '10:00', horaFin: '14:00', disponible: false }
]

export function reservarTurno(usuario, fecha) {
  turnos.push({ usuario, fecha })
}

export function cancelarTurno(usuario) {
  const index = turnos.findIndex((t) => t.usuario === usuario)
  if (index !== -1) turnos.splice(index, 1)
}

// Funciones para gestión de horarios del dueño
export function obtenerHorarios() {
  return horariosDisponibles
}

export function actualizarHorario(id, nuevoHorario) {
  const index = horariosDisponibles.findIndex((h) => h.id === id)
  if (index !== -1) {
    horariosDisponibles[index] = { ...horariosDisponibles[index], ...nuevoHorario }
  }
}

export function agregarHorario(nuevoHorario) {
  const id = Math.max(...horariosDisponibles.map((h) => h.id)) + 1
  horariosDisponibles.push({ id, ...nuevoHorario })
}

export function eliminarHorario(id) {
  const index = horariosDisponibles.findIndex((h) => h.id === id)
  if (index !== -1) {
    horariosDisponibles.splice(index, 1)
  }
}

export function obtenerTurnosReservados() {
  return turnos
}
