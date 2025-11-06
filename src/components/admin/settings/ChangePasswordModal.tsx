import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert('Las nuevas contraseñas no coinciden.');
      return;
    }
    // Lógica para enviar el cambio de contraseña (simulado)
    console.log('Cambiando contraseña...');
    // Aquí iría la llamada a la API
    onClose();
    alert('Contraseña cambiada exitosamente (simulado).');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-background text-headlibe border-secondary/30">
        <DialogHeader className="border-b border-secondary/30 pb-4 mb-4">
          <DialogTitle className="text-2xl font-bold text-headline">
            Cambiar Contraseña
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="current" className="text-right text-sub-headline">
              Contraseña Actual
            </Label>
            <Input
              id="current"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="bg-card-background border-secondary/30 text-headline focus:ring-highlight"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new" className="text-right text-sub-headline">
              Nueva Contraseña
            </Label>
            <Input
              id="new"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-card-background border-secondary/30 text-headline focus:ring-highlight"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm" className="text-right text-sub-headline">
              Confirmar Nueva Contraseña
            </Label>
            <Input
              id="confirm"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="bg-card-background border-secondary/30 text-headline focus:ring-highlight"
              required
            />
          </div>
          <DialogFooter className="pt-4 mt-4 border-t border-secondary/30">
            <Button
              variant="outline"
              onClick={onClose}
              className="bg-transparent text-sub-headline border-secondary/30 hover:bg-card-background hover:text-headline cursor-pointer"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-highlight hover:bg-highlight/70 text-headline cursor-pointer"
            >
              Guardar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
