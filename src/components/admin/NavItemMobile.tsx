import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface NavItemProps {
  name: string;
  href: string;
  icon: LucideIcon;
}

export const NavItemMobile: React.FC<NavItemProps> = ({
  name,
  href,
  icon: Icon,
}) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  const activeClasses = isActive
    ? 'text-indigo-400'
    : 'text-gray-400 hover:text-white';

  return (
    <Link
      to={href}
      className={`flex flex-col items-center p-2 transition-colors ${activeClasses}`}
    >
      <Icon className="w-6 h-6" />
      <span className="text-xs mt-1">{name}</span>
    </Link>
  );
};
