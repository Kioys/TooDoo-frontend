/**
 * Configuración centralizada para la aplicación TooDoo
 */

// Configuración de Parse Server
export const PARSE_CONFIG = {
  APPLICATION_ID: "toodoo-app",
  JAVASCRIPT_KEY: "toodoo-js-key", 
  SERVER_URL: "https://parseapi.back4app.com/",
};

// Configuración de la aplicación
export const APP_CONFIG = {
  NAME: "TooDoo",
  VERSION: "1.0.0",
  DESCRIPTION: "Tu compañero para la productividad",
  AUTHOR: "Matias Arratibel",
  LINKEDIN: "https://www.linkedin.com/in/matias-arratibel/",
};

// Configuración de UI
export const UI_CONFIG = {
  SIDEBAR_WIDTH: 500,
  MODAL_WIDTH: 600,
  TABLE_PAGE_SIZE: 10,
  ANIMATION_DURATION: 300,
};

// Breakpoints para responsive
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
};