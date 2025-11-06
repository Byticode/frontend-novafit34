import React from 'react';
import {
  Calendar,
  DollarSign,
  BarChart,
  ShoppingBag,
  Bell,
  Settings,
  LogOut,
  Briefcase,
  ListTodo,
  House,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '../ui/sidebar';
import { NavItem } from './NavItem.tsx';
import { MembersIcon } from '@/components/icons';
import { useAuth } from '../../hooks/UseConvexAuth';
import { useNavigate } from 'react-router-dom';

const adminLinks = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: House },
  { name: 'Notificaciones', href: '/admin/notifications', icon: Bell },
  { name: 'Miembros', href: '/admin/members', icon: MembersIcon },
  { name: 'Clases', href: '/admin/classes', icon: Calendar },
  { name: 'Pagos', href: '/admin/payments', icon: DollarSign },
  { name: 'Reportes', href: '/admin/reports', icon: BarChart },
  { name: 'Empleados', href: '/admin/employees', icon: Briefcase },
  { name: 'Inventario', href: '/admin/inventory', icon: ShoppingBag },
  { name: 'Tareas y Notas', href: '/admin/tasks', icon: ListTodo },
  { name: 'Ajustes', href: '/admin/settings', icon: Settings },
];

export const AppSidebar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/sign-in', { replace: true });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Sidebar
      variant="sidebar"
      collapsible="offcanvas"
      className="bg-background border-r border-secondary/30"
    >
      <SidebarHeader className="border-b border-secondary/30">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold text-headline">Novafit34</h2>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="">
              {adminLinks.map((link) => (
                <SidebarMenuItem key={link.name}>
                  <NavItem {...link} />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-secondary/30 px-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-red-400 hover:text-red-500 hover:bg-card-background rounded-lg transition-colors duration-200 cursor-pointer"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span className="font-medium">Salir</span>
            </button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
