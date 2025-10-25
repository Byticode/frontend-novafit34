import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import {
  Building,
  Users,
  Plug,
  ShieldCheck,
  // Settings as SettingsIcon,
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface SettingOption {
  title: string;
  description: string;
  icon: React.ElementType;
  route: string;
}

const SETTINGS_OPTIONS: SettingOption[] = [
  {
    title: 'Perfil del GYM',
    description: 'Actualiza la información de tu gimnasio.',
    icon: Building,
    route: '/admin/settings/profile',
  },
  {
    title: 'Usuarios y Roles',
    description: 'Gestiona los usuarios y sus roles.',
    icon: Users,
    route: '/admin/settings/users',
  },
  {
    title: 'Integraciones',
    description: 'Conecta con otras aplicaciones.',
    icon: Plug,
    route: '/admin/settings/integrations',
  },
  {
    title: 'Seguridad',
    description: 'Configura la seguridad de tu cuenta.',
    icon: ShieldCheck,
    route: '/admin/settings/security',
  },
];

const SettingsCard: React.FC<{ option: SettingOption }> = ({ option }) => {
  const navigate = useNavigate();
  const Icon = option.icon;

  return (
    <Card
      className={cn(
        'cursor-pointer bg-card border border-gray-800 hover:bg-gray-800/50 transition-colors shadow-lg',
        'flex flex-col justify-between h-full'
      )}
      onClick={() => navigate(option.route)}
    >
      <CardHeader className="flex flex-col items-start justify-between space-y-0 p-4">
        <Icon className="w-6 h-6 text-indigo-400" />
        <CardTitle className="text-xl font-bold text-white">
          {option.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-gray-400">{option.description}</p>
      </CardContent>
    </Card>
  );
};

export const SettingsPage: React.FC = () => {
  return (
    <div className="min-h-screen p-4 lg:p-8 space-y-4">
      <h1 className="text-3xl lg:text-4xl font-bold text-white">Ajustes</h1>
      <p className="text-gray-400">
        Personaliza y gestiona la configuración de Novafit34.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {SETTINGS_OPTIONS.map((option) => (
          <SettingsCard key={option.route} option={option} />
        ))}
      </div>
    </div>
  );
};
