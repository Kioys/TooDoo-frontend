import { useState } from 'react';
import { AuthService } from '@/services/authService';

/**
 * Hook personalizado para manejar autenticación
 */
export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const user = await AuthService.login(username, password);
      
      // Recargar la página después del login exitoso
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
      
      return user;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ username, email, password }) => {
    try {
      setLoading(true);
      setError(null);
      
      const user = await AuthService.register({ username, email, password });
      
      // Recargar la página después del registro exitoso
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
      
      return user;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      
      // Recargar la página después del logout
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    login,
    register,
    logout,
    loading,
    error,
    clearError,
    isAuthenticated: AuthService.isAuthenticated(),
    currentUser: AuthService.getCurrentUser(),
  };
};