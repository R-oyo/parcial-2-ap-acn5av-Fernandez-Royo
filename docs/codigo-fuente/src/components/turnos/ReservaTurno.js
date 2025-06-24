// Componente simulado para HU1 – Ver horarios disponibles

import { useState } from 'react'
import { reservarTurno } from '../../services/turnosService.js'

function ReservaTurno() {
  const [fecha, setFecha] = useState('')
  const [usuario, setUsuario] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleReservar = () => {
    if (!fecha || !usuario) {
      setMensaje('Por favor, completa todos los campos')
      return
    }

    reservarTurno(usuario, fecha)
    setMensaje('Turno reservado exitosamente')
    setFecha('')
    setUsuario('')
  }

  return (
    <div className='reserva-turno'>
      <h2>Reservá tu turno</h2>

      <div className='formulario-reserva'>
        <div className='form-group'>
          <label htmlFor='usuario'>Nombre:</label>
          <input
            type='text'
            id='usuario'
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder='Ingresa tu nombre'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='fecha'>Fecha y hora:</label>
          <input type='datetime-local' id='fecha' value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </div>

        <button onClick={handleReservar} className='btn-reservar'>
          Reservar
        </button>
      </div>

      {mensaje && <div className='mensaje'>{mensaje}</div>}
    </div>
  )
}

export default ReservaTurno
