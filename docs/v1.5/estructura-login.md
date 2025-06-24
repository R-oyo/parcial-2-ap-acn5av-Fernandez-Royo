# Estructura Técnica del Sistema de Login

## Descripción Técnica del Código

### Configuración Firebase (`src/config/firebase.js`)

#### Configuración Base

```javascript
export const firebaseConfig = {
  apiKey: 'AIzaSyBxEjemplo1234567890abcdefghijklmnop',
  authDomain: 'turnoya-app.firebaseapp.com',
  projectId: 'turnoya-app',
  storageBucket: 'turnoya-app.appspot.com',
  messagingSenderId: '123456789012',
  appId: '1:123456789012:web:abcdefghijklmnopqrstuv'
}
```

#### Clase FirebaseAuth Simulada

```javascript
class FirebaseAuth {
  constructor() {
    this.currentUser = null;
    this.authStateListeners = [];
  }

  // Métodos principales simulados
  async signInWithEmailAndPassword(email, password)
  async createUserWithEmailAndPassword(email, password, displayName)
  async signOut()
  getCurrentUser()
  onAuthStateChanged(callback)
}
```

#### Funciones Helper

- `isAuthenticated()` - Verifica si hay usuario autenticado
- `getUserRole()` - Obtiene el rol del usuario actual
- `isAdmin()` - Verifica si el usuario es administrador

### Componente Login (`src/components/auth/Login.js`)

#### Estados del Componente

```javascript
const [isLogin, setIsLogin] = useState(true)
const [formData, setFormData] = useState({
  email: '',
  password: '',
  displayName: ''
})
const [loading, setLoading] = useState(false)
const [error, setError] = useState('')
const [success, setSuccess] = useState('')
```

#### Funciones Principales

##### `handleSubmit(e)`

- Maneja tanto login como registro
- Validaciones de formulario
- Llamadas a Firebase Auth
- Manejo de errores y éxito

##### `handleLogout()`

- Cierra la sesión del usuario
- Limpia el estado del formulario
- Notifica al componente padre

##### `toggleMode()`

- Cambia entre modo login y registro
- Limpia mensajes y formulario
- Actualiza la interfaz

#### Renderizado Condicional

```javascript
// Si está autenticado, muestra información del usuario
if (isAuthenticated()) {
  return <UserInfo user={user} onLogout={handleLogout} />
}

// Si no está autenticado, muestra formulario
return <LoginForm {...props} />
```

### Componente ProtectedRoute (`src/components/auth/ProtectedRoute.js`)

#### Props del Componente

```javascript
{
  children, // Contenido a proteger
    requireAuth, // Requiere autenticación (default: true)
    requireAdmin, // Requiere rol admin (default: false)
    fallback // Componente alternativo
}
```

#### Lógica de Protección

1. **Verificación de autenticación**
2. **Verificación de roles**
3. **Redirección automática**
4. **Manejo de estados de carga**

#### Componentes Helper

- `ClientRoute` - Solo para clientes autenticados
- `AdminRoute` - Solo para administradores
- `PublicRoute` - Acceso público

## Arquitectura del Sistema

### Flujo de Autenticación

```
Usuario → Login.js → firebase-config.js → Estado Global → ProtectedRoute → Componentes
```

### Gestión de Estado

- **Local**: Estados de formulario y UI
- **Global**: Estado de autenticación compartido
- **Persistencia**: Simulada en memoria

### Patrones de Diseño

#### Observer Pattern

```javascript
// Listeners para cambios de autenticación
auth.onAuthStateChanged((user) => {
  // Actualizar estado global
})
```

#### Strategy Pattern

```javascript
// Diferentes estrategias según el rol
if (isAdmin()) {
  return <AdminComponent />
} else {
  return <ClientComponent />
}
```

## Estructura de Datos

### Usuario

```javascript
{
  uid: 'admin-123',
  email: 'admin@turnoya.com',
  displayName: 'Administrador',
  role: 'admin'
}
```

### Formulario de Login

```javascript
{
  email: string,
  password: string,
  displayName: string (solo para registro)
}
```

### Estado de Autenticación

```javascript
{
  user: User | null,
  loading: boolean,
  error: string | null
}
```

## Validaciones Implementadas

### Frontend

- ✅ Campos requeridos
- ✅ Formato de email válido
- ✅ Longitud mínima de contraseña
- ✅ Nombre requerido para registro

### Backend (Simulado)

- ✅ Credenciales predefinidas
- ✅ Verificación de usuario existente
- ✅ Generación de UID único

## Manejo de Errores

### Tipos de Error

1. **Credenciales inválidas**
2. **Campos faltantes**
3. **Error de red (simulado)**
4. **Acceso denegado**

### Estrategia de Manejo

```javascript
try {
  await auth.signInWithEmailAndPassword(email, password)
  setSuccess('Login exitoso')
} catch (error) {
  setError(error.message)
} finally {
  setLoading(false)
}
```

## Integración con el Sistema

### Servicios

```javascript
// turnosService.js
export function reservarTurno(usuario, fecha) {
  // Verificar autenticación antes de reservar
  if (!isAuthenticated()) {
    throw new Error('Usuario no autenticado')
  }
  turnos.push({ usuario, fecha })
}
```

### Componentes Protegidos

```javascript
// App.js
<ClientRoute>
  <ReservaTurno />
</ClientRoute>

<AdminRoute>
  <GestionHorarios />
</AdminRoute>
```

## Consideraciones de Rendimiento

### Optimizaciones Implementadas

- ✅ Lazy loading de componentes
- ✅ Memoización de estados
- ✅ Cleanup de listeners
- ✅ Debounce en formularios

### Escalabilidad

- ✅ Código modular
- ✅ Separación de responsabilidades
- ✅ Fácil extensión de funcionalidades
- ✅ Preparado para Firebase real

## Testing

### Casos de Prueba Cubiertos

- ✅ Login exitoso
- ✅ Login fallido
- ✅ Registro exitoso
- ✅ Registro fallido
- ✅ Cierre de sesión
- ✅ Acceso denegado
- ✅ Rutas protegidas

### Credenciales de Testing

```javascript
// Admin
email: 'admin@turnoya.com'
password: 'admin123'

// Cliente
email: 'cliente@turnoya.com'
password: 'cliente123'
```
