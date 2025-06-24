// Configuración simulada de Firebase

// Configuración de Firebase (simulada)
export const firebaseConfig = {
  apiKey: 'AIzaSyBxEjemplo1234567890abcdefghijklmnop',
  authDomain: 'turnoya-app.firebaseapp.com',
  projectId: 'turnoya-app',
  storageBucket: 'turnoya-app.appspot.com',
  messagingSenderId: '123456789012',
  appId: '1:123456789012:web:abcdefghijklmnopqrstuv'
}

// Simulación de Firebase Auth
class FirebaseAuth {
  constructor() {
    this.currentUser = null
    this.authStateListeners = []
  }

  // Simular inicio de sesión
  async signInWithEmailAndPassword(email, password) {
    // Simular validación de credenciales
    if (email === 'admin@turnoya.com' && password === 'admin123') {
      this.currentUser = {
        uid: 'admin-123',
        email: email,
        displayName: 'Administrador',
        role: 'admin'
      }
      this.notifyAuthStateChange()
      return { user: this.currentUser }
    } else if (email === 'cliente@turnoya.com' && password === 'cliente123') {
      this.currentUser = {
        uid: 'cliente-456',
        email: email,
        displayName: 'Cliente',
        role: 'cliente'
      }
      this.notifyAuthStateChange()
      return { user: this.currentUser }
    } else {
      throw new Error('Credenciales inválidas')
    }
  }

  // Simular registro
  async createUserWithEmailAndPassword(email, password, displayName) {
    const uid = `user-${Date.now()}`
    this.currentUser = {
      uid: uid,
      email: email,
      displayName: displayName,
      role: 'cliente'
    }
    this.notifyAuthStateChange()
    return { user: this.currentUser }
  }

  // Simular cierre de sesión
  async signOut() {
    this.currentUser = null
    this.notifyAuthStateChange()
  }

  // Obtener usuario actual
  getCurrentUser() {
    return this.currentUser
  }

  // Escuchar cambios en el estado de autenticación
  onAuthStateChanged(callback) {
    this.authStateListeners.push(callback)
    // Ejecutar callback inmediatamente con el estado actual
    callback(this.currentUser)
  }

  // Notificar cambios a todos los listeners
  notifyAuthStateChange() {
    this.authStateListeners.forEach((callback) => {
      callback(this.currentUser)
    })
  }
}

// Instancia global de Firebase Auth
export const auth = new FirebaseAuth()

// Función helper para verificar si el usuario está autenticado
export const isAuthenticated = () => {
  return auth.getCurrentUser() !== null
}

// Función helper para obtener el rol del usuario
export const getUserRole = () => {
  const user = auth.getCurrentUser()
  return user ? user.role : null
}

// Función helper para verificar si es admin
export const isAdmin = () => {
  return getUserRole() === 'admin'
}
