import React from 'react';
import { useAuth } from '../../hooks/UseConvexAuth';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  fallback = <div>Loading...</div>,
}) => {
  const { isLoggedIn, user } = useAuth();

  // Mientras se carga el estado de autenticación
  if (user === undefined) {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-4">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Cargando...</h2>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
