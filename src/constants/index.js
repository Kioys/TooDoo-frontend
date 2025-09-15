/**
 * Constantes para la aplicación TooDoo
 */

// Estados de tareas (preparado para futuras mejoras)
export const TASK_STATES = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
};

// Colores para tags
export const TAG_COLORS = {
  DEFAULT: 'blue',
  WORK: 'geekblue',
  PERSONAL: 'green',
  URGENT: 'red',
  LOW_PRIORITY: 'gray',
};

// Configuración de tabla
export const TABLE_CONFIG = {
  PAGE_SIZE: 10,
  SCROLL_Y: 400,
};

// Mensajes de la aplicación
export const MESSAGES = {
  LOGIN: {
    REQUIRED_USERNAME: 'Por favor ingresa tu nombre de usuario',
    REQUIRED_PASSWORD: 'Por favor ingresa tu contraseña',
    SUCCESS: 'Sesión iniciada correctamente',
    ERROR: 'Credenciales incorrectas',
  },
  REGISTER: {
    REQUIRED_EMAIL: 'Por favor ingresa tu email',
    REQUIRED_USERNAME: 'Por favor ingresa un nombre de usuario',
    REQUIRED_PASSWORD: 'La contraseña debe tener al menos 6 caracteres',
    PASSWORD_MISMATCH: 'Las contraseñas no coinciden',
    SUCCESS: 'Cuenta creada correctamente',
  },
  TASKS: {
    CREATED: 'Tarea creada exitosamente',
    UPDATED: 'Tarea actualizada exitosamente',
    DELETED: 'Tarea eliminada exitosamente',
    DELETE_CONFIRM: '¿Estás seguro de que quieres eliminar esta tarea?',
    NO_TASKS: 'No tienes tareas aún. ¡Crea tu primera tarea!',
  },
};

// Rutas de la aplicación
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
};

// Configuración de animaciones
export const ANIMATION_CONFIG = {
  DURATION: 300,
  EASING: 'ease-out',
  STAGGER_DELAY: 100,
};