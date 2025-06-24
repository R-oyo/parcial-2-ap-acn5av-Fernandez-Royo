// Componente de ruta protegida con Firebase

import { useState, useEffect } from 'react'
import { auth, isAuthenticated, getUserRole, isAdmin } from '../../config/firebase.js'
import Login from './Login.js'

function ProtectedRoute({ children, requireAuth = true, requireAdmin = false, fallback = null }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Escuchar cambios en el estado de autenticación
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    // Cleanup function
    return () => {
      // En una implementación real, aquí se llamaría unsubscribe()
    }
  }, [])

  const handleLoginSuccess = (user) => {
    setUser(user)
  }

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className='loading-container'>
        <div className='loading-spinner'>
          <p>Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  // Si no requiere autenticación, mostrar el contenido directamente
  if (!requireAuth) {
    return children
  }

  // Si requiere autenticación pero no hay usuario, mostrar login
  if (!isAuthenticated()) {
    return <Login onLoginSuccess={handleLoginSuccess} />
  }

  // Si requiere admin pero el usuario no es admin
  if (requireAdmin && !isAdmin()) {
    return (
      <div className='access-denied'>
        <h2>Acceso Denegado</h2>
        <p>No tienes permisos de administrador para acceder a esta página.</p>
        <p>Tu rol actual: {getUserRole()}</p>
        <button onClick={() => auth.signOut()}>Cerrar Sesión</button>
      </div>
    )
  }

  // Si pasa todas las validaciones, mostrar el contenido protegido
  return children
}

// Componente helper para rutas de cliente
function ClientRoute({ children }) {
  return (
    <ProtectedRoute requireAuth={true} requireAdmin={false}>
      {children}
    </ProtectedRoute>
  )
}

// Componente helper para rutas de administrador
function AdminRoute({ children }) {
  return (
    <ProtectedRoute requireAuth={true} requireAdmin={true}>
      {children}
    </ProtectedRoute>
  )
}

// Componente helper para rutas públicas
function PublicRoute({ children }) {
  return <ProtectedRoute requireAuth={false}>{children}</ProtectedRoute>
}

export default ProtectedRoute
export { ClientRoute, AdminRoute, PublicRoute }
