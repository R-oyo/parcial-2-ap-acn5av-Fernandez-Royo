// Componente simulado para HU2 – Cancelar turno

import { useState } from 'react'
import { turnos, cancelarTurno } from './GestorTurnos.js'

function CancelarTurno() {
  const [usuario, setUsuario] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleCancelarTurno = () => {
    if (!usuario) {
      setMensaje('Por favor, ingresa tu nombre de usuario')
      return
    }

    const turnoExistente = turnos.find((t) => t.usuario === usuario)
    if (!turnoExistente) {
      setMensaje('No tienes turnos reservados')
      return
    }

    cancelarTurno(usuario)
    setMensaje(`Turno cancelado exitosamente para ${usuario}`)
    setUsuario('')
  }

  const misTurnos = turnos.filter((t) => t.usuario === usuario)

  return (
    <div className='cancelar-turno'>
      <h2>Cancelar mi turno</h2>

      <div className='formulario'>
        <label htmlFor='usuario'>Usuario:</label>
        <input
          type='text'
          id='usuario'
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          placeholder='Ingresa tu nombre de usuario'
        />

        <button onClick={handleCancelarTurno}>Cancelar turno</button>
      </div>

      {mensaje && <div className='mensaje'>{mensaje}</div>}

      {usuario && misTurnos.length > 0 && (
        <div className='mis-turnos'>
          <h3>Mis turnos reservados:</h3>
          <ul>
            {misTurnos.map((turno, index) => (
              <li key={index}>Fecha: {new Date(turno.fecha).toLocaleString()}</li>
            ))}
          </ul>
        </div>
      )}

      {usuario && misTurnos.length === 0 && (
        <div className='sin-turnos'>
          <p>No tienes turnos reservados</p>
        </div>
      )}
    </div>
  )
}

export default CancelarTurno
