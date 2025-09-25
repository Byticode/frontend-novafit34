import React from 'react';
import { Sidebar } from '../components/admin/Sidebar';
import { NavbarMobile } from '../components/admin/NavbarMobile';
import { MobileMenuModal } from '../components/admin/MobileMenuModal';
import { Menu } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false); // Estado para el menú hamburguesa (opciones restantes)

    // Función que se puede pasar al Header o a la Navbar para abrir el menú
    const openMenu = () => setIsMenuOpen(true);
    const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="min-h-screen bg-bg-primary text-gray-100">
      {/* Sidebar (Desktop) */}
      <Sidebar />
      
      {/* Header (Solo para Mobile para el título y el menú hamburguesa) */}
      <header className="lg:hidden sticky top-0 bg-bg-primary border-b border-gray-700/50 p-4 flex justify-between items-center z-30">
        <button onClick={() => setIsMenuOpen(true)} className="text-white p-1">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold">Dashboard</h1> {/* Título de la página actual */}
        <div className="w-6 h-6"></div> {/* Placeholder para centrar el título */}
      </header>

      {/* Contenido Principal */}
      <main className="lg:ml-64 pb-20 lg:pb-4 p-4 lg:p-8">
        {children}
      </main>

    {/* 4. Navbar (Mobile Inferior) */}
      {/* Puedes cambiar NavbarMobile para que incluya un botón "Más" que llame a openMenu */}
      <NavbarMobile onMenuToggle={openMenu} />

      {/* 5. Menú Desplegable (Modal/Off-canvas para opciones restantes en Mobile) */}
      <MobileMenuModal isOpen={isMenuOpen} onClose={closeMenu} />
    </div>
  );
};