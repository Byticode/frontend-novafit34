import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/UseConvexAuth';

interface AuthRedirectProps {
  children: React.ReactNode;
}

export const AuthRedirect: React.FC<AuthRedirectProps> = ({ children }) => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  // Mientras se carga el estado de autenticación
  if (user === undefined) {
    return <></>;
  }

  // Si está autenticado, redirigir
  if (isLoggedIn) {
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
