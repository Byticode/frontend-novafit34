import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SidebarMenuButton } from '../ui/sidebar';
import { cn } from '@/lib/utils';

interface NavItemProps {
  name: string;
  href: string;
  icon: React.ComponentType<{ className: string }>;
}

export const NavItem: React.FC<NavItemProps> = ({ name, href, icon: Icon }) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <SidebarMenuButton
      asChild
      isActive={isActive}
      tooltip={name}
      className={cn(
        isActive && '!bg-card-background !text-headline',
        'px-4 text-base text-headline hover:bg-card-background hover:text-headline'
      )}
    >
      <Link to={href} className="h-11">
        <Icon className="!size-5" />
        <span>{name}</span>
      </Link>
    </SidebarMenuButton>
  );
};
