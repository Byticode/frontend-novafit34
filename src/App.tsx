import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/UseAuth.tsx';
import { AdminLayout } from './layouts/AdminLayout';
import { LoginPage } from './pages/auth/LoginPage.tsx';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage.tsx';
// import { NotificationsPage } from './pages/admin/NotificationsPage';
// import { MembersPage } from './pages/admin/MembersPage';
// import { ClassesPage } from './pages/admin/ClassesPage';
// import { PaymentsPage } from './pages/admin/PaymentsPage';
// import { ReportsPage } from './pages/admin/ReportsPage';
// import { EmployeesPage } from './pages/admin/EmployeesPage';
// import { InventoryPage } from './pages/admin/InventoryPage';
// import { SettingsPage } from './pages/admin/SettingsPage';

// Componente para proteger las rutas privadas
const PrivateRoute: React.FC<{ children: JSX.Element; role: 'admin' | 'coach' | 'client' }> = ({ children, role }) => {
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


const AppRoutes: React.FC = () => {
  const { userRole } = useAuth();

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
                {/* <Route path="members" element={<MembersPage />} /> */}
                {/* <Route path="classes" element={<ClassesPage />} /> */}
                {/* <Route path="payments" element={<PaymentsPage />} /> */}
                {/* <Route path="reports" element={<ReportsPage />} /> */}
                {/* <Route path="employees" element={<EmployeesPage />} /> */}
                {/* <Route path="inventory" element={<InventoryPage />} /> */}
                {/* <Route path="notifications" element={<NotificationsPage />} /> */}
                {/* <Route path="settings" element={<SettingsPage />} /> */}
                <Route path="*" element={<Navigate to="/unauthorized" replace />} />
              </Routes>
            </AdminLayout>
          </PrivateRoute>
        }
      />

      {/* Redirección inicial al dashboard */}
      <Route
        path="/"
        element={
          userRole ? (
            <Navigate to={`/${userRole}/dashboard`} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Página de "No autorizado" */}
      <Route path="/unauthorized" element={
        <div className="bg-bg-primary min-h-screen flex items-center justify-center text-white text-3xl font-bold">
          No autorizado
        </div>
      } />

    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;