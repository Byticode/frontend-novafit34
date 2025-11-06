import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { History, Lock, Settings } from 'lucide-react';
import { ScrollArea } from '../../ui/scroll-area';

interface ActivityLogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ActivityRecord {
  id: number;
  icon: React.ElementType;
  description: string;
  timestamp: string;
}

// Datos de actividad simulada
const DUMMY_ACTIVITY: ActivityRecord[] = [
  {
    id: 1,
    icon: Lock,
    description: 'Contraseña cambiada por el administrador.',
    timestamp: '2025-10-24 14:30:00',
  },
  {
    id: 2,
    icon: History,
    description: 'Inicio de sesión exitoso desde Caracas, Venezuela.',
    timestamp: '2025-10-25 09:00:00',
  },
  {
    id: 3,
    icon: Settings,
    description: 'Configuración de integración de pagos modificada.',
    timestamp: '2025-10-25 10:15:00',
  },
  {
    id: 4,
    icon: History,
    description: 'Cierre de sesión manual.',
    timestamp: '2025-10-25 11:00:00',
  },
  {
    id: 5,
    icon: History,
    description: 'Inicio de sesión fallido (contraseña incorrecta).',
    timestamp: '2025-10-25 11:05:00',
  },
];

export const ActivityLogModal: React.FC<ActivityLogModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl bg-background text-headline border-secondary/30">
        <DialogHeader className="border-b border-secondary/30 pb-4 mb-4">
          <DialogTitle className="text-2xl font-bold text-headline flex items-center">
            <History className="w-6 h-6 mr-2 text-highlight" /> Registro de
            Actividad
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {DUMMY_ACTIVITY.map((activity) => {
              const Icon = activity.icon;
              return (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 p-3 hover:bg-background/20 transition-colors border-b border-secondary/30 last:border-b-0"
                >
                  <Icon className="w-5 h-5 mt-1 text-sub-headline flex-shrink-0" />
                  <div className="flex-grow">
                    <p className="text-headline font-medium">
                      {activity.description}
                    </p>
                    <p className="text-xs text-sub-headline mt-1">
                      {new Date(activity.timestamp).toLocaleString('es-ES', {
                        dateStyle: 'short',
                        timeStyle: 'short',
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
