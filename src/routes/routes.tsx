import React, { type JSX } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AdminLayout } from '../layouts/AdminLayout.tsx';
import { LoginPage } from '../pages/auth/LoginPage.tsx';
import { RegisterPage } from '../pages/auth/RegisterPage.tsx';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage.tsx';
import { ClassesPage } from '../pages/admin/ClassesPage.tsx';
import { InventoryPage } from '../pages/admin/InventoryPage.tsx';
import { MembersPage } from '../pages/admin/MembersPage.tsx';
import { MemberProfilePage } from '../pages/admin/MemberProfilePage.tsx';
import { PaymentsPage } from '../pages/admin/PaymentsPage.tsx';
import { SettingsPage } from '../pages/admin/SettingsPage.tsx';
import { SecurityPage } from '../pages/admin/SecurityPage.tsx';
import { GymProfilePage } from '../pages/admin/GymProfilePage.jsx';
import { ReportsPage } from '../pages/admin/ReportsPage.tsx';
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

const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="p-8 text-white">
    <h1 className="text-3xl font-bold">Página de {title}</h1>
    <p className="mt-2 text-gray-400">Aun esta en desarrollo... |-/</p>
  </div>
);

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
                <Route path="inventory" element={<InventoryPage />} />
                <Route path="members" element={<MembersPage />} />
                <Route
                  path="members/:memberid"
                  element={<MemberProfilePage />}
                />
                <Route path="payments" element={<PaymentsPage />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="settings/profile" element={<GymProfilePage />} />
                <Route
                  path="settings/users"
                  element={<PlaceholderPage title="Usuarios y Roles" />}
                />
                <Route
                  path="settings/integrations"
                  element={<PlaceholderPage title="Integraciones" />}
                />
                <Route path="settings/security" element={<SecurityPage />} />

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
