import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface NavItemProps {
  name: string;
  href: string;
  icon: LucideIcon;
}

export const NavItem: React.FC<NavItemProps> = ({ name, href, icon: Icon }) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  const activeClasses = isActive
    ? 'bg-indigo-600/90 font-semibold text-white border-l-4 border-indigo-400'
    : 'text-gray-300 hover:bg-gray-700/50 hover:text-white';

  return (
    <Link
      to={href}
      className={`flex items-center p-4 mx-4 my-2 rounded-lg transition-colors ${activeClasses}`}
    >
      <Icon className="w-5 h-5 mr-3" />
      <span className="font-medium">{name}</span>
    </Link>
  );
};
