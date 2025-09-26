import React from 'react';
import {
  Home,
  Users,
  Calendar,
  DollarSign,
  BarChart,
  ShoppingBag,
  Bell,
  Settings,
  LogOut,
  Briefcase,
} from 'lucide-react';
import { NavItem } from './NavItem.tsx';

const adminLinks = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
  { name: 'Notificaciones', href: '/admin/notifications', icon: Bell },
  { name: 'Miembros', href: '/admin/members', icon: Users },
  { name: 'Clases', href: '/admin/classes', icon: Calendar },
  { name: 'Pagos', href: '/admin/payments', icon: DollarSign },
  { name: 'Reportes', href: '/admin/reports', icon: BarChart },
  { name: 'Empleados', href: '/admin/employees', icon: Briefcase },
  { name: 'Inventario', href: '/admin/inventory', icon: ShoppingBag },
  { name: 'Ajustes', href: '/admin/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  return (
    <div className="hidden lg:flex flex-col w-64 h-full fixed top-0 left-0 pt-6 bg-blue-primary text-white shadow-xl">
      <div className="px-6 mb-8 text-2xl font-bold text-indigo-400">
        Novafit34
      </div>
      <nav className="flex-1 overflow-y-auto">
        {adminLinks.map((link) => (
          <NavItem key={link.name} {...link} />
        ))}
      </nav>
      {/* Opción Salir (Logout) */}
      <div className="px-4 py-1 border-t border-gray-700">
        <NavItem name="Salir" href="/login" icon={LogOut} />
      </div>
    </div>
  );
};
