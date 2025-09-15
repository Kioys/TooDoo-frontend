import Parse from "parse";

/**
 * Servicio para manejar todas las operaciones de autenticación
 */
export class AuthService {
  /**
   * Iniciar sesión
   */
  static async login(username, password) {
    return Parse.User.logIn(username, password);
  }

  /**
   * Registrar nuevo usuario
   */
  static async register({ username, email, password }) {
    const user = new Parse.User();
    user.set({ username, email, password });
    return user.signUp();
  }

  /**
   * Cerrar sesión
   */
  static async logout() {
    return Parse.User.logOut();
  }

  /**
   * Obtener usuario actual
   */
  static getCurrentUser() {
    return Parse.User.current();
  }

  /**
   * Verificar si hay un usuario autenticado
   */
  static isAuthenticated() {
    return !!Parse.User.current();
  }
}