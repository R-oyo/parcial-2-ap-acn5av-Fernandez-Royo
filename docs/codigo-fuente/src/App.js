// Aplicación principal con autenticación Firebase

import { useState, useEffect } from 'react'
import { auth, isAuthenticated, getUserRole } from './config/firebase.js'
import ProtectedRoute, { ClientRoute, AdminRoute, PublicRoute } from './components/auth/ProtectedRoute.js'
import Login from './components/auth/Login.js'
import ReservaTurno from './components/turnos/ReservaTurno.js'
import CancelarTurno from './components/turnos/CancelarTurno.js'
import GestionHorarios from './components/admin/GestionHorarios.js'

function App() {
  const [user, setUser] = useState(null)
  const [currentView, setCurrentView] = useState('home')

  useEffect(() => {
    // Escuchar cambios en el estado de autenticación
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
    })

    return () => {
      // Cleanup function
    }
  }, [])

  const handleLogout = async () => {
    try {
      await auth.signOut()
      setCurrentView('home')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  const renderNavigation = () => {
    if (!isAuthenticated()) return null

    const isAdminUser = getUserRole() === 'admin'

    return (
      <nav className='app-navigation'>
        <div className='nav-brand'>
          <h1>TurnoYa</h1>
        </div>

        <div className='nav-menu'>
          <button onClick={() => setCurrentView('home')} className={currentView === 'home' ? 'active' : ''}>
            Inicio
          </button>

          <ClientRoute>
            <button onClick={() => setCurrentView('reservar')} className={currentView === 'reservar' ? 'active' : ''}>
              Reservar Turno
            </button>

            <button onClick={() => setCurrentView('cancelar')} className={currentView === 'cancelar' ? 'active' : ''}>
              Cancelar Turno
            </button>
          </ClientRoute>

          <AdminRoute>
            <button onClick={() => setCurrentView('gestion')} className={currentView === 'gestion' ? 'active' : ''}>
              Gestión de Horarios
            </button>
          </AdminRoute>
        </div>

        <div className='nav-user'>
          <span>Hola, {user?.displayName}</span>
          <button onClick={handleLogout} className='logout-btn'>
            Cerrar Sesión
          </button>
        </div>
      </nav>
    )
  }

  const renderContent = () => {
    if (!isAuthenticated()) {
      return (
        <div className='welcome-container'>
          <h1>Bienvenido a TurnoYa</h1>
          <p>Sistema de gestión de turnos</p>
          <Login onLoginSuccess={(user) => setUser(user)} />
        </div>
      )
    }

    switch (currentView) {
      case 'home':
        return (
          <div className='home-container'>
            <h2>Panel de Control</h2>
            <div className='user-info'>
              <h3>Información del Usuario</h3>
              <p>
                <strong>Nombre:</strong> {user?.displayName}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              <p>
                <strong>Rol:</strong> {user?.role === 'admin' ? 'Administrador' : 'Cliente'}
              </p>
            </div>

            <div className='quick-actions'>
              <h3>Acciones Rápidas</h3>
              {getUserRole() === 'cliente' && (
                <>
                  <button onClick={() => setCurrentView('reservar')}>Reservar un Turno</button>
                  <button onClick={() => setCurrentView('cancelar')}>Cancelar mi Turno</button>
                </>
              )}

              {getUserRole() === 'admin' && (
                <button onClick={() => setCurrentView('gestion')}>Gestionar Horarios</button>
              )}
            </div>
          </div>
        )

      case 'reservar':
        return (
          <ClientRoute>
            <ReservaTurno />
          </ClientRoute>
        )

      case 'cancelar':
        return (
          <ClientRoute>
            <CancelarTurno />
          </ClientRoute>
        )

      case 'gestion':
        return (
          <AdminRoute>
            <GestionHorarios />
          </AdminRoute>
        )

      default:
        return <div>Página no encontrada</div>
    }
  }

  return (
    <div className='app'>
      {renderNavigation()}

      <main className='app-main'>{renderContent()}</main>

      <footer className='app-footer'>
        <p>&copy; 2024 TurnoYa - Sistema de Gestión de Turnos</p>
      </footer>
    </div>
  )
}

export default App
