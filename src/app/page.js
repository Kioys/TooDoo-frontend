"use client";
import MainPage from "@/components/pages/MainPage";
import UserPage from "@/components/pages/UserPage";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { isLoading, isInitialized, isAuthenticated, error } = useAuth();
  
  // Loading state mientras se inicializa Parse
  if (!isInitialized || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center animate-fade-in-up">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
            <div className="loading-spinner w-8 h-8"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Cargando TooDoo...</h2>
          <p className="text-gray-600">Preparando tu espacio de productividad</p>
        </div>
      </div>
    );
  }

  // Error state si hay problemas con Parse
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <div className="text-center animate-fade-in-up max-w-md mx-auto p-6">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">Error de Conexión</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // Renderizar la página correspondiente según el estado de autenticación
  return <>{isAuthenticated ? <UserPage /> : <MainPage />}</>;
}
