import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from './layouts/AdminLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage.tsx';
// import { MembersPage } from './pages/admin/MembersPage';
// import { ClassesPage } from './pages/admin/ClassesPage';
// import { PaymentsPage } from './pages/admin/PaymentsPage';
// import { ReportsPage } from './pages/admin/ReportsPage';
// import { EmployeesPage } from './pages/admin/EmployeesPage';
// import { InventoryPage } from './pages/admin/InventoryPage';
// import { NotificationsPage } from './pages/admin/NotificationsPage';
// import { SettingsPage } from './pages/admin/SettingsPage';
// No necesitamos las vistas de Auth por ahora

// Importa aquí todas las páginas de Admin que vayas a desarrollar.

// --- Componente principal ---
const App: React.FC = () => {
  return (
    // 1. Envuelve toda la aplicación con BrowserRouter (necesario para el enrutamiento)
    <BrowserRouter>
      {/*
        2. En Modo Desarrollo, siempre renderizamos el AdminLayout.
           Esto simula que el usuario ya ha iniciado sesión como Admin.
      */}
      <AdminLayout>
        {/*
          3. Las rutas dentro del Layout son las específicas del Admin.
             Usaremos el prefijo '/admin' para organizarlas.
        */}
        <Routes>
          {/* Ruta principal que redirige al dashboard */}
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

          {/* Vistas principales del Administrador */}
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          {/* <Route path="/admin/members" element={<MembersPage />} /> */}
          {/* <Route path="/admin/classes" element={<ClassesPage />} /> */}
          {/* <Route path="/admin/payments" element={<PaymentsPage />} /> */}
          {/* <Route path="/admin/reports" element={<ReportsPage />} /> */}
          {/* <Route path="/admin/employees" element={<EmployeesPage />} /> */}
          {/* <Route path="/admin/inventory" element={<InventoryPage />} /> */}
          {/* <Route path="/admin/notifications" element={<NotificationsPage />} /> */}
          {/* <Route path="/admin/settings" element={<SettingsPage />} /> */}

          {/* Opcional: Manejo de rutas no encontradas (404) */}
          <Route path="*" element={
            <div className="p-8 text-center text-xl">404 | Página no encontrada</div>
          } />
        </Routes>
      </AdminLayout>
    </BrowserRouter>
  );
};

export default App;