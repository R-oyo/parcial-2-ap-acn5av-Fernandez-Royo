// Componente de Login con Firebase simulado

import { useState, useEffect } from 'react'
import { auth, isAuthenticated, getUserRole } from '../../config/firebase.js'

function Login({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    // Verificar si ya hay un usuario autenticado
    const user = auth.getCurrentUser()
    if (user && onLoginSuccess) {
      onLoginSuccess(user)
    }
  }, [onLoginSuccess])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (isLogin) {
        // Inicio de sesión
        await auth.signInWithEmailAndPassword(formData.email, formData.password)
        setSuccess('Inicio de sesión exitoso')

        // Notificar al componente padre
        if (onLoginSuccess) {
          onLoginSuccess(auth.getCurrentUser())
        }
      } else {
        // Registro
        if (!formData.displayName) {
          throw new Error('El nombre es requerido')
        }
        await auth.createUserWithEmailAndPassword(formData.email, formData.password, formData.displayName)
        setSuccess('Registro exitoso')

        // Notificar al componente padre
        if (onLoginSuccess) {
          onLoginSuccess(auth.getCurrentUser())
        }
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await auth.signOut()
      setSuccess('Sesión cerrada exitosamente')
      // Limpiar formulario
      setFormData({ email: '', password: '', displayName: '' })
    } catch (error) {
      setError('Error al cerrar sesión')
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setError('')
    setSuccess('')
    setFormData({ email: '', password: '', displayName: '' })
  }

  // Si ya está autenticado, mostrar información del usuario
  if (isAuthenticated()) {
    const user = auth.getCurrentUser()
    return (
      <div className='login-container'>
        <div className='user-info'>
          <h2>Bienvenido, {user.displayName}</h2>
          <p>Email: {user.email}</p>
          <p>Rol: {user.role === 'admin' ? 'Administrador' : 'Cliente'}</p>
          <button onClick={handleLogout} className='logout-btn'>
            Cerrar Sesión
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='login-container'>
      <div className='login-card'>
        <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>

        {error && <div className='error-message'>{error}</div>}

        {success && <div className='success-message'>{success}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className='form-group'>
              <label htmlFor='displayName'>Nombre completo:</label>
              <input
                type='text'
                id='displayName'
                name='displayName'
                value={formData.displayName}
                onChange={handleInputChange}
                placeholder='Ingresa tu nombre completo'
                required={!isLogin}
              />
            </div>
          )}

          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              placeholder='ejemplo@email.com'
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Contraseña:</label>
            <input
              type='password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              placeholder='Ingresa tu contraseña'
              required
            />
          </div>

          <button type='submit' className='submit-btn' disabled={loading}>
            {loading ? 'Procesando...' : isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>

        <div className='toggle-mode'>
          <p>
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            <button onClick={toggleMode} className='toggle-btn'>
              {isLogin ? 'Registrarse' : 'Iniciar Sesión'}
            </button>
          </p>
        </div>

        {/* Información de credenciales de prueba */}
        <div className='test-credentials'>
          <h4>Credenciales de prueba:</h4>
          <div className='credential-group'>
            <strong>Administrador:</strong>
            <p>Email: admin@turnoya.com</p>
            <p>Contraseña: admin123</p>
          </div>
          <div className='credential-group'>
            <strong>Cliente:</strong>
            <p>Email: cliente@turnoya.com</p>
            <p>Contraseña: cliente123</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
