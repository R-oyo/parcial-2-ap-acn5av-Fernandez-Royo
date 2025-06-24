// Componente simulado para HU3 – Gestión de horarios del dueño

import { useState, useEffect } from 'react'
import {
  obtenerHorarios,
  actualizarHorario,
  agregarHorario,
  eliminarHorario,
  obtenerTurnosReservados
} from './GestorTurnos.js'

function GestionHorarios() {
  const [horarios, setHorarios] = useState([])
  const [turnosReservados, setTurnosReservados] = useState([])
  const [editando, setEditando] = useState(null)
  const [nuevoHorario, setNuevoHorario] = useState({
    dia: '',
    horaInicio: '',
    horaFin: '',
    disponible: true
  })
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = () => {
    setHorarios(obtenerHorarios())
    setTurnosReservados(obtenerTurnosReservados())
  }

  const handleEditar = (horario) => {
    setEditando(horario)
  }

  const handleGuardar = () => {
    if (!editando.dia || !editando.horaInicio || !editando.horaFin) {
      setMensaje('Por favor, completa todos los campos')
      return
    }

    actualizarHorario(editando.id, editando)
    setEditando(null)
    setMensaje('Horario actualizado exitosamente')
    cargarDatos()
  }

  const handleCancelar = () => {
    setEditando(null)
  }

  const handleEliminar = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este horario?')) {
      eliminarHorario(id)
      setMensaje('Horario eliminado exitosamente')
      cargarDatos()
    }
  }

  const handleAgregar = () => {
    if (!nuevoHorario.dia || !nuevoHorario.horaInicio || !nuevoHorario.horaFin) {
      setMensaje('Por favor, completa todos los campos')
      return
    }

    agregarHorario(nuevoHorario)
    setNuevoHorario({ dia: '', horaInicio: '', horaFin: '', disponible: true })
    setMensaje('Horario agregado exitosamente')
    cargarDatos()
  }

  return (
    <div className='gestion-horarios'>
      <h2>Gestión de Horarios - Panel del Dueño</h2>

      {mensaje && <div className='mensaje'>{mensaje}</div>}

      {/* Sección de horarios actuales */}
      <div className='horarios-actuales'>
        <h3>Horarios Actuales</h3>
        <table className='tabla-horarios'>
          <thead>
            <tr>
              <th>Día</th>
              <th>Hora Inicio</th>
              <th>Hora Fin</th>
              <th>Disponible</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {horarios.map((horario) => (
              <tr key={horario.id}>
                <td>
                  {editando?.id === horario.id ? (
                    <input
                      type='text'
                      value={editando.dia}
                      onChange={(e) => setEditando({ ...editando, dia: e.target.value })}
                    />
                  ) : (
                    horario.dia
                  )}
                </td>
                <td>
                  {editando?.id === horario.id ? (
                    <input
                      type='time'
                      value={editando.horaInicio}
                      onChange={(e) => setEditando({ ...editando, horaInicio: e.target.value })}
                    />
                  ) : (
                    horario.horaInicio
                  )}
                </td>
                <td>
                  {editando?.id === horario.id ? (
                    <input
                      type='time'
                      value={editando.horaFin}
                      onChange={(e) => setEditando({ ...editando, horaFin: e.target.value })}
                    />
                  ) : (
                    horario.horaFin
                  )}
                </td>
                <td>
                  {editando?.id === horario.id ? (
                    <input
                      type='checkbox'
                      checked={editando.disponible}
                      onChange={(e) => setEditando({ ...editando, disponible: e.target.checked })}
                    />
                  ) : (
                    <span className={horario.disponible ? 'disponible' : 'no-disponible'}>
                      {horario.disponible ? 'Sí' : 'No'}
                    </span>
                  )}
                </td>
                <td>
                  {editando?.id === horario.id ? (
                    <>
                      <button onClick={handleGuardar}>Guardar</button>
                      <button onClick={handleCancelar}>Cancelar</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditar(horario)}>Editar</button>
                      <button onClick={() => handleEliminar(horario.id)}>Eliminar</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sección para agregar nuevo horario */}
      <div className='agregar-horario'>
        <h3>Agregar Nuevo Horario</h3>
        <div className='formulario-nuevo'>
          <input
            type='text'
            placeholder='Día (ej: Lunes)'
            value={nuevoHorario.dia}
            onChange={(e) => setNuevoHorario({ ...nuevoHorario, dia: e.target.value })}
          />
          <input
            type='time'
            value={nuevoHorario.horaInicio}
            onChange={(e) => setNuevoHorario({ ...nuevoHorario, horaInicio: e.target.value })}
          />
          <input
            type='time'
            value={nuevoHorario.horaFin}
            onChange={(e) => setNuevoHorario({ ...nuevoHorario, horaFin: e.target.value })}
          />
          <label>
            <input
              type='checkbox'
              checked={nuevoHorario.disponible}
              onChange={(e) => setNuevoHorario({ ...nuevoHorario, disponible: e.target.checked })}
            />
            Disponible
          </label>
          <button onClick={handleAgregar}>Agregar Horario</button>
        </div>
      </div>

      {/* Sección de turnos reservados */}
      <div className='turnos-reservados'>
        <h3>Turnos Reservados ({turnosReservados.length})</h3>
        {turnosReservados.length > 0 ? (
          <ul>
            {turnosReservados.map((turno, index) => (
              <li key={index}>
                <strong>{turno.usuario}</strong> - {new Date(turno.fecha).toLocaleString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay turnos reservados</p>
        )}
      </div>
    </div>
  )
}

export default GestionHorarios
