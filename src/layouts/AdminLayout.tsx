import React from 'react';
import { AppSidebar } from '../components/admin/Sidebar';
import { NavbarMobile } from '../components/admin/NavbarMobile';
import { MobileMenuModal } from '../components/admin/MobileMenuModal';
import { Menu } from 'lucide-react';
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '../components/ui/sidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        {/* Header (Solo para Mobile para el título y el menú hamburguesa) */}
        <header className="lg:hidden sticky top-0 bg-background border-b border-gray-700/50 p-4 flex justify-between items-center z-30">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-white p-1"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="w-6 h-6"></div>
        </header>

        {/* Contenido Principal */}
        <main className="pb-20 lg:pb-4 p-4 lg:p-8 bg-background">
          <div className="flex items-center gap-2 mb-0">
            <SidebarTrigger />
          </div>
          {children}
        </main>

        {/* Navbar (Mobile Inferior) */}
        <NavbarMobile onMenuToggle={openMenu} />

        {/* Menú Desplegable (Modal/Off-canvas para opciones restantes en Mobile) */}
        <MobileMenuModal isOpen={isMenuOpen} onClose={closeMenu} />
      </SidebarInset>
    </SidebarProvider>
  );
};
