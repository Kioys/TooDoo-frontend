"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import Parse from 'parse';
import { PARSE_CONFIG } from '@/lib/config';

// Crear el contexto
const AuthContext = createContext(null);

// Provider del contexto
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);

  // Inicializar Parse una sola vez
  useEffect(() => {
    const initializeParse = async () => {
      try {
        if (!isInitialized) {
          // Usar configuración desde variables de entorno o fallback
          Parse.initialize(
            process.env.NEXT_PUBLIC_PARSE_APP_ID || PARSE_CONFIG.APPLICATION_ID,
            process.env.NEXT_PUBLIC_PARSE_JS_KEY || PARSE_CONFIG.JAVASCRIPT_KEY
          );
          Parse.serverURL = process.env.NEXT_PUBLIC_PARSE_SERVER_URL || PARSE_CONFIG.SERVER_URL;
          
          console.log('✅ Parse initialized successfully');
          setIsInitialized(true);

          // Verificar si hay un usuario logueado
          const currentUser = Parse.User.current();
          if (currentUser) {
            try {
              // Verificar que la sesión siga siendo válida
              await currentUser.fetch();
              setUser(currentUser);
              console.log('✅ User session restored:', currentUser.get('username'));
            } catch (error) {
              console.log('⚠️  Invalid session, logging out');
              await Parse.User.logOut();
              setUser(null);
            }
          }
        }
      } catch (error) {
        console.error('❌ Error initializing Parse:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    initializeParse();
  }, [isInitialized]);

  // Funciones de autenticación
  const login = async (username, password) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const user = await Parse.User.logIn(username, password);
      setUser(user);
      console.log('✅ Login successful:', user.get('username'));
      
      return user;
    } catch (error) {
      console.error('❌ Login error:', error);
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async ({ username, email, password }) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const user = new Parse.User();
      user.set({ username, email, password });
      
      await user.signUp();
      setUser(user);
      console.log('✅ Registration successful:', user.get('username'));
      
      return user;
    } catch (error) {
      console.error('❌ Registration error:', error);
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await Parse.User.logOut();
      setUser(null);
      console.log('✅ Logout successful');
    } catch (error) {
      console.error('❌ Logout error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  // Valor del contexto
  const value = {
    user,
    isLoading,
    isInitialized,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar el contexto
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}