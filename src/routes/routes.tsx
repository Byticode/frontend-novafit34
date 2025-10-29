import React, { type JSX } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AdminLayout } from '../layouts/AdminLayout.tsx';
import { ConvexSignIn } from '../components/auth/ConvexSignIn.tsx';
import { ConvexSignUp } from '../components/auth/ConvexSignUp.tsx';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage.tsx';
import { ClassesPage } from '../pages/admin/ClassesPage.tsx';
import { InventoryPage } from '../pages/admin/InventoryPage.tsx';
import { MembersPage } from '../pages/admin/MembersPage.tsx';
import { MemberProfilePage } from '../pages/admin/MemberProfilePage.tsx';
import { PaymentsPage } from '../pages/admin/PaymentsPage.tsx';
import { SettingsPage } from '../pages/admin/SettingsPage.tsx';
import { ManageUsersPage } from '../pages/admin/ManageUsersPage.tsx';
import { SecurityPage } from '../pages/admin/SecurityPage.tsx';
import { GymProfilePage } from '../pages/admin/GymProfilePage.jsx';
import { ReportsPage } from '../pages/admin/ReportsPage.tsx';
import { TasksPage } from '../pages/admin/TasksPage.tsx';
import { useConvexAuth } from 'convex/react';

const PrivateRoute: React.FC<{
  children: JSX.Element;
  role: 'admin' | 'coach' | 'client';
}> = ({ children, role }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const location = useLocation();

  // Show loading while checking authentication
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

  if (!isAuthenticated) {
    // Redirigir si no está logeado
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  // For now, assume all authenticated users are admin
  // TODO: Implement proper role checking when roles are added to schema
  if (role === 'admin') {
    return children;
  }

  // Redirigir si no tiene el rol correcto
  return <Navigate to="/unauthorized" replace />;
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
      <Route path="/" element={<Navigate to="/sign-in" replace />} />
      <Route path="/sign-in" element={<ConvexSignIn />} />
      <Route path="/sign-up" element={<ConvexSignUp />} />
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
                <Route path="tasks" element={<TasksPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="settings/profile" element={<GymProfilePage />} />
                <Route path="settings/users" element={<ManageUsersPage />} />
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
