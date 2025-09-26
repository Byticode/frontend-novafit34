import React, { type JSX } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AdminLayout } from '../layouts/AdminLayout.tsx';
import { LoginPage } from '../pages/auth/LoginPage.tsx';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage.tsx';
import { useAuth } from '../hooks/UseAuth.tsx';

const PrivateRoute: React.FC<{
  children: JSX.Element;
  role: 'admin' | 'coach' | 'client';
}> = ({ children, role }) => {
  const { isLoggedIn, userRole } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirigir si no está logeado
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (userRole !== role) {
    // Redirigir si no tiene el rol correcto
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {/* ruta para registro y recuperación */}
      {/* <Route path="/register" element={} /> */}

      {/* Rutas Privadas del Administrador */}
      {/* Envolvemos todas las vistas de admin en AdminLayout y PrivateRoute */}
      <Route
        path="/admin/*"
        element={
          <PrivateRoute role="admin">
            <AdminLayout>
              <Routes>
                <Route path="dashboard" element={<AdminDashboardPage />} />

                <Route
                  path="*"
                  element={<Navigate to="/unauthorized" replace />}
                />
              </Routes>
            </AdminLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/unauthorized"
        element={
          <div className="bg-bg-primary min-h-screen flex items-center justify-center text-white text-3xl font-bold">
            No autorizado
          </div>
        }
      />
    </Routes>
  );
};
