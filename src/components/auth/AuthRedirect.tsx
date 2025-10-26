import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConvexAuth } from 'convex/react';

interface AuthRedirectProps {
  children: React.ReactNode;
}

export const AuthRedirect: React.FC<AuthRedirectProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Mientras se carga el estado de autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-4">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Cargando...</h2>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
        </div>
      </div>
    );
  }

  // Si está autenticado, redirigir
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-4">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Redirigiendo...</h2>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
