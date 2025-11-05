import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import type { Member, MemberPlan, MemberStatus } from '../../../types/member';

interface EditMemberInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member | null;
  onSave: (
    memberId: string,
    newPlan: MemberPlan,
    newStatus: MemberStatus
  ) => void;
}

export const EditMemberInfoModal: React.FC<EditMemberInfoModalProps> = ({
  isOpen,
  onClose,
  member,
  onSave,
}) => {
  const [currentPlan, setCurrentPlan] = useState<MemberPlan>('Básico');
  const [currentStatus, setCurrentStatus] = useState<MemberStatus>('Activo');

  useEffect(() => {
    if (member) {
      setCurrentPlan(member.plan);
      setCurrentStatus(member.estado);
    }
  }, [member]);

  const handleSave = () => {
    if (member) {
      onSave(member.id, currentPlan, currentStatus);
      onClose();
    }
  };

  if (!member) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-md bg-background text-headline border-secondary/30">
        <DialogHeader className="border-b border-secondary/30 pb-4 mb-4">
          <DialogTitle className="text-2xl font-bold text-headline">
            Editar Membresía de {member.nombre}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {/* Plan */}
          <div>
            <label
              htmlFor="plan"
              className="block text-sm font-medium text-sub-headline mb-2"
            >
              Plan Actual
            </label>
            <Select
              value={currentPlan}
              onValueChange={(value) => setCurrentPlan(value as MemberPlan)}
            >
              <SelectTrigger className="w-full bg-card-background text-headline border-sm border-secondary/30 focus:ring-highlight focus:border-highlight">
                <SelectValue placeholder="Selecciona el plan" />
              </SelectTrigger>
              <SelectContent className="bg-card-background text-headline border-secondary/30">
                <SelectItem value="Básico">Básico</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Estado */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-sub-headline mb-2"
            >
              Estado
            </label>
            <Select
              value={currentStatus}
              onValueChange={(value) => setCurrentStatus(value as MemberStatus)}
            >
              <SelectTrigger className="w-full bg-card-background text-headline border-sm border-secondary/30 focus:ring-highlight focus:border-highlight">
                <SelectValue placeholder="Selecciona el estado" />
              </SelectTrigger>
              <SelectContent className="bg-card-background text-headline border-secondary/30">
                <SelectItem value="Activo">Activo</SelectItem>
                <SelectItem value="Inactivo">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
            onClick={handleSave}
            className="bg-highlight hover:bg-highlight/70 text-headline cursor-pointer"
          >
            Guardar Cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
