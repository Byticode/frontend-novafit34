import { Routes, Route } from 'react-router-dom';
import { AdminLayout } from '../layouts/AdminLayout';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage.tsx';
// ... importa las otras páginas del admin

const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas de Autenticación */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Rutas de Administrador (Protegidas) */}
      <Route path="/admin/*" element={
        <PrivateRoute roles={['admin']}>
          <AdminLayout>
            <Routes>
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="members" element={<MembersPage />} />
              {/* ... más rutas de admin */}
            </Routes>
          </AdminLayout>
        </PrivateRoute>
      }/>
    </Routes>
  );
};