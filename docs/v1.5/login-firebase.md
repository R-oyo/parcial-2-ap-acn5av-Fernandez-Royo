# Integración con Firebase Auth (Login Simulado)

## Objetivo

Agregar una capa de autenticación para simular que los usuarios deben iniciar sesión antes de gestionar turnos o hacer reservas.

## Justificación

### Necesidad del Sistema de Autenticación

El sistema TurnoYa requiere un mecanismo de autenticación por las siguientes razones:

1. **Seguridad**: Proteger las funcionalidades del sistema
2. **Personalización**: Mostrar contenido específico por usuario
3. **Control de Acceso**: Diferenciar entre clientes y administradores
4. **Trazabilidad**: Registrar acciones por usuario
5. **Escalabilidad**: Preparar el sistema para múltiples usuarios

### Beneficios de Firebase Auth

- **Desarrollo Rápido**: SDK completo y bien documentado
- **Escalabilidad**: Infraestructura gestionada por Google
- **Seguridad**: Estándares de seguridad empresarial
- **Flexibilidad**: Múltiples métodos de autenticación
- **Integración**: Fácil integración con otros servicios

## Implementación

### Enfoque de Desarrollo

Se implementó un sistema de autenticación simulado que replica la funcionalidad de Firebase Auth para permitir el desarrollo y testing sin depender de servicios externos.

### Características Implementadas

- ✅ Login con email/password
- ✅ Registro de nuevos usuarios
- ✅ Cierre de sesión
- ✅ Control de roles (admin/cliente)
- ✅ Rutas protegidas
- ✅ Persistencia de estado

### Flujo de Usuario

1. **Acceso**: El usuario accede al formulario de login
2. **Autenticación**: Ingresa credenciales o se registra
3. **Validación**: Sistema verifica credenciales
4. **Autorización**: Se asigna rol y permisos
5. **Navegación**: Acceso a funcionalidades según rol

## Tecnologías

- Firebase Web SDK (v9 modular)
- Firebase Auth (email/password)
- React (simulado, adaptable a otros frameworks)

## Seguridad

No se implementaron reglas de seguridad ni control de roles avanzado, dado que el objetivo es mostrar el flujo básico de autenticación para la entrega del parcial.

## Estado

- ✅ Funcionalidad simulada
- ✅ Login y registro funcionales
- ✅ Firebase inicializado correctamente

## Credenciales de Prueba

### Administrador

- **Email**: admin@turnoya.com
- **Contraseña**: admin123
- **Rol**: admin

### Cliente

- **Email**: cliente@turnoya.com
- **Contraseña**: cliente123
- **Rol**: cliente

## Funcionalidades Implementadas

### Autenticación

- ✅ Login con email/password
- ✅ Registro de nuevos usuarios
- ✅ Cierre de sesión
- ✅ Persistencia de estado de autenticación

### Control de Acceso

- ✅ Rutas protegidas por autenticación
- ✅ Control de acceso por roles (admin/cliente)
- ✅ Redirección automática según permisos

### Integración con HUs

- ✅ HU1: Reserva de turnos (solo clientes autenticados)
- ✅ HU2: Cancelación de turnos (solo clientes autenticados)
- ✅ HU3: Gestión de horarios (solo administradores)

## Consideraciones de Desarrollo

### Modo Simulado

- No requiere configuración real de Firebase
- Funciona completamente en desarrollo local
- Fácil de adaptar a Firebase real

### Escalabilidad

- Estructura preparada para Firebase real
- Fácil agregar nuevos métodos de autenticación
- Código reutilizable y mantenible

### Seguridad

- Validaciones básicas implementadas
- Control de acceso por roles
- Preparado para reglas de seguridad de Firebase

## Conclusión

La integración con Firebase Auth proporciona una base sólida para la autenticación de usuarios en el sistema TurnoYa. La implementación simulada permite demostrar la funcionalidad completa sin depender de servicios externos, facilitando el desarrollo y testing del sistema.

### Documentación Técnica

Para detalles técnicos del código, ver: `estructura-login.md`
