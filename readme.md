## 📄 Estructura del Proyecto Frontend: Gestión de Gimnasio (CRM)

Este documento define la estructura de directorios del proyecto, implementado con **React, TypeScript, y Tailwind CSS**.

-----

## 👥 Vistas y Roles

La aplicación soporta **tres roles principales**: Administrador, Entrenador (Coach) y Cliente. Las vistas se organizan bajo el directorio `pages/` para una clara **separación por responsabilidades**.

### 1\. Vistas de Autenticación (`pages/auth`)

| Vista | Propósito | URL Estimada |
| :--- | :--- | :--- |
| **`LoginPage.tsx`** | Acceso al sistema. | `/login` |
| **`RegisterPage.tsx`** | Registro de nuevos usuarios (posiblemente solo para clientes/coaches, si el admin lo gestiona). | `/register` |

### 2\. Vistas del Administrador (`pages/admin`)

El rol de **Admin** tiene acceso completo al CRM y las funcionalidades de gestión.

| Vista | Propósito | URL Estimada |
| :--- | :--- | :--- |
| **`AdminDashboardPage.tsx`** | Resumen general y métricas clave del gimnasio. | `/admin/dashboard` |
| **`MembersPage.tsx`** | Gestión completa de los miembros activos, inactivos y potenciales. | `/admin/members` |
| **`ClassesPage.tsx`** | Creación, edición y gestión de horarios y tipos de clases. | `/admin/classes` |
| **`PaymentsPage.tsx`** | Gestión y seguimiento de pagos, cuotas y suscripciones. | `/admin/payments` |
| **`ReportsPage.tsx`** | Generación de reportes financieros y de rendimiento. | `/admin/reports` |
| **`EmployeesPage.tsx`** | Gestión de personal, incluyendo coaches y otros empleados. | `/admin/employees` |
| **`InventoryPage.tsx`** | Control de stock de productos, equipamiento y suministros. | `/admin/inventory` |
| **`NotificationsPage.tsx`** | Configuración y envío de notificaciones internas y externas. | `/admin/notifications` |
| **`SettingsPage.tsx`** | Ajustes generales de la aplicación (perfil, tarifas, etc.). | `/admin/settings` |

### 3\. Vistas del Entrenador (`pages/coach`)

*(Estructura por definir, incluirá vistas como gestión de clases asignadas, seguimiento de clientes, etc.)*

### 4\. Vistas del Cliente (`pages/client`)

*(Estructura por definir, incluirá vistas como perfil, historial de clases, reserva de clases, pagos, etc.)*

-----
