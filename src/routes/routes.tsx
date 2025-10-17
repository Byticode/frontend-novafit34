import React, { type JSX } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AdminLayout } from '../layouts/AdminLayout.tsx';
import { LoginPage } from '../pages/auth/LoginPage.tsx';
import { RegisterPage } from '../pages/auth/RegisterPage.tsx';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage.tsx';
import { ClassesPage } from '../pages/admin/ClassesPage.tsx';
import { MembersPage } from '../pages/admin/MembersPage.tsx';
import { PaymentsPage } from '../pages/admin/PaymentsPage.tsx';
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
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* ruta para recuperación */}

      {/* Rutas Privadas del Administrador */}
      {/* Envolvemos todas las vistas de admin en AdminLayout y PrivateRoute */}
      <Route
        path="/admin/*"
        element={
          <PrivateRoute role="admin">
            <AdminLayout>
              <Routes>
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="classes" element={<ClassesPage />} />
                <Route path="members" element={<MembersPage />} />
                <Route path="payments" element={<PaymentsPage />} />

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
