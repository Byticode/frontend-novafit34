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
import { HomeIcon, MembersIcon } from '@/components/icons';

const adminLinks = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
  { name: 'Notificaciones', href: '/admin/notifications', icon: Bell },
  { name: 'Miembros', href: '/admin/members', icon: MembersIcon },
  { name: 'Clases', href: '/admin/classes', icon: Calendar },
  { name: 'Pagos', href: '/admin/payments', icon: DollarSign },
  { name: 'Reportes', href: '/admin/reports', icon: BarChart },
  { name: 'Empleados', href: '/admin/employees', icon: Briefcase },
  { name: 'Inventario', href: '/admin/inventory', icon: ShoppingBag },
  { name: 'Ajustes', href: '/admin/settings', icon: Settings },
];

export const AppSidebar: React.FC = () => {
  return (
    <Sidebar
      variant="sidebar"
      collapsible="offcanvas"
      className="border-r border-[#21294a]"
    >
      <SidebarHeader className="border-b border-[#21294a]">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold text-white">Novafit34</h2>
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

      <SidebarFooter className="border-t border-[#21294a]">
        <SidebarMenu>
          <SidebarMenuItem>
            <NavItem name="Salir" href="/login" icon={LogOut} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
