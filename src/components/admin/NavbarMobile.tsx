import React from 'react';
import { Home, Users, Calendar, CircleUserRound } from 'lucide-react';
import { NavItemMobile } from './NavItemMobile.tsx';

const mainMobileLinks = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
  { name: 'Miembros', href: '/admin/members', icon: Users },
  { name: 'Clases', href: '/admin/classes', icon: Calendar },
  { name: 'Perfil', href: '/admin/profile', icon: CircleUserRound },
];

export const NavbarMobile: React.FC = ( onMenuToggle ) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full py-10 h-16 bg-bg-primary shadow-2xl border-t border-gray-700 z-40">
      <nav className="flex justify-around items-center h-full">
        {mainMobileLinks.map((link) => (
          <NavItemMobile key={link.name} {...link} />
        ))}
        {/* <button onClick={onMenuToggle} className="text-white flex flex-col items-center">
          <Menu className="w-6 h-6" />
          <span className="text-xs mt-1">Más</span>
        </button> */}
      </nav>
    </div>
  );
};