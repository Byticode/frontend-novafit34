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
  X,
} from 'lucide-react';
import { NavItem } from './NavItem';
import { useAuth } from '../../hooks/UseConvexAuth';
import { useNavigate } from 'react-router-dom';

interface MobileMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const adminLinks = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
  { name: 'Miembros', href: '/admin/members', icon: Users },
  { name: 'Clases', href: '/admin/classes', icon: Calendar },
  { name: 'Pagos', href: '/admin/payments', icon: DollarSign },
  { name: 'Reportes', href: '/admin/reports', icon: BarChart },
  { name: 'Empleados', href: '/admin/employees', icon: Briefcase },
  { name: 'Inventario', href: '/admin/inventory', icon: ShoppingBag },
  { name: 'Notificaciones', href: '/admin/notifications', icon: Bell },
  { name: 'Ajustes', href: '/admin/settings', icon: Settings },
];

export const MobileMenuModal: React.FC<MobileMenuModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      onClose(); // Cerrar el modal
      navigate('/sign-in', { replace: true });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (!isOpen) return null; // No renderizar si no está abierto

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/70 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div
        className={`w-72 h-full bg-[#21294a] shadow-2xl overflow-y-auto pt-6 text-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        onClick={(e) => e.stopPropagation()} // Evita que el click cierre el modal
      >
        <div className="flex justify-between items-center px-6 mb-8">
          <div className="text-2xl font-bold text-indigo-400">Menú</div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="pb-4">
          {adminLinks.map((link) => (
            <div key={link.name} onClick={onClose}>
              <NavItem {...link} />
            </div>
          ))}
        </nav>

        {/* Opción Salir (Logout) */}
        <div className="p-4 border-t border-gray-700 mt-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-indigo-600/20 rounded-lg transition-colors duration-200"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-medium">Salir</span>
          </button>
        </div>
      </div>
    </div>
  );
};
