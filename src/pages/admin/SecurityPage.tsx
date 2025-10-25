import React, { useState } from 'react';
import { ArrowLeft, Lock, Activity, Shield, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Switch } from '../../components/ui/switch';
import { ChangePasswordModal } from '../../components/admin/settings/ChangePasswordModal';
import { ActivityLogModal } from '../../components/admin/settings/ActivityLogModal';
import { Card, CardContent } from '../../components/ui/card';

// Componente para una sección de seguridad
interface SecuritySectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const SecuritySection: React.FC<SecuritySectionProps> = ({
  title,
  description,
  children,
}) => (
  <div className="flex justify-between items-start space-x-4 py-4">
    <div className="flex-1">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-sm text-gray-400 mt-1">{description}</p>
    </div>
    <div className="flex-shrink-0">{children}</div>
  </div>
);

export const SecurityPage: React.FC = () => {
  const navigate = useNavigate();
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  return (
    <div className="min-h-screen p-4 lg:p-8 space-y-4">
      {/* HEADER y BOTÓN VOLVER */}
      <Button
        variant="link"
        onClick={() => navigate('/admin/settings')}
        className="text-indigo-400 hover:text-indigo-300 p-0 mb-4 cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Volver a Ajustes
      </Button>

      <h1 className="text-3xl lg:text-4xl font-bold text-white">Seguridad</h1>
      <p className="text-gray-400">
        Gestiona la configuración de seguridad de tu cuenta y el acceso.
      </p>

      <Card className="bg-bg-primary border-none p-6 mt-10">
        <CardContent className="space-y-8 p-0">
          {/* Autenticación de dos factores */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white flex items-center mb-3">
              <Shield className="w-6 h-6 mr-2 text-indigo-400" /> Autenticación
              de dos factores
            </h2>
            <SecuritySection
              title="Autenticación de dos factores"
              description="Añade una capa extra de seguridad a tu cuenta requiriendo un código de verificación de tu teléfono además de tu contraseña."
            >
              <Switch
                checked={is2FAEnabled}
                onCheckedChange={setIs2FAEnabled}
                className="data-[state=checked]:bg-indigo-600"
              />
            </SecuritySection>
          </div>

          {/* Contraseña */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white flex items-center mb-3">
              <Lock className="w-6 h-6 mr-2 text-indigo-400" /> Contraseña
            </h2>
            <SecuritySection
              title="Cambiar contraseña"
              description="Cambia tu contraseña actual por una nueva."
            >
              <Button
                onClick={() => setIsPasswordModalOpen(true)}
                variant="default"
                className="bg-gray-700 hover:bg-gray-600 text-white cursor-pointer"
              >
                Cambiar
              </Button>
            </SecuritySection>
          </div>

          {/* Registro de actividad */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white flex items-center mb-3">
              <Activity className="w-6 h-6 mr-2 text-indigo-400" /> Registro de
              actividad
            </h2>
            <SecuritySection
              title="Ver registro de actividad"
              description="Revisa la actividad reciente de tu cuenta, incluyendo inicios de sesión y cambios en la configuración."
            >
              <Button
                onClick={() => setIsActivityModalOpen(true)}
                variant="default"
                className="bg-gray-700 hover:bg-gray-600 text-white cursor-pointer"
              >
                Ver
              </Button>
            </SecuritySection>
          </div>

          {/* 4. Políticas de sesión */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white flex items-center mb-3">
              <Clock className="w-6 h-6 mr-2 text-indigo-400" /> Políticas de
              sesión
            </h2>
            <SecuritySection
              title="Gestionar políticas de sesión"
              description="Gestiona la duración de la sesión y las restricciones de acceso (Pendiente de implementación)."
            >
              <Button
                variant="default"
                className="bg-gray-700 hover:bg-gray-600 text-white cursor-pointer"
                disabled // Deshabilitado hasta que se defina la funcionalidad
              >
                Gestionar
              </Button>
            </SecuritySection>
          </div>
        </CardContent>
      </Card>

      {/* MODALES */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
      <ActivityLogModal
        isOpen={isActivityModalOpen}
        onClose={() => setIsActivityModalOpen(false)}
      />
    </div>
  );
};
