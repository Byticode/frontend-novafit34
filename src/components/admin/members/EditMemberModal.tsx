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

interface EditMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member | null;
  onSave: (
    memberId: string,
    newPlan: MemberPlan,
    newStatus: MemberStatus
  ) => void;
}

export const EditMemberModal: React.FC<EditMemberModalProps> = ({
  isOpen,
  onClose,
  member,
  onSave,
}) => {
  const [newPlan, setNewPlan] = useState<MemberPlan>('Básico');
  const [newStatus, setNewStatus] = useState<MemberStatus>('Activo');

  useEffect(() => {
    if (member) {
      setNewPlan(member.plan);
      setNewStatus(member.estado);
    }
  }, [member]);

  const handleSave = () => {
    if (member) {
      onSave(member.id, newPlan, newStatus);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-background text-headline border-sm border-secondary/30">
        <DialogHeader className="border-b border-secondary/30 pb-4 mb-4">
          <DialogTitle className="text-xl font-bold text-headline">
            Editar Membresía de {member?.nombre || 'Miembro'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Edición de Plan */}
          <div>
            <label
              htmlFor="plan"
              className="block text-sm font-medium text-sub-headline mb-2"
            >
              Tipo de Plan
            </label>
            <Select
              value={newPlan}
              onValueChange={(value) => setNewPlan(value as MemberPlan)}
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

          {/* Edición de Estado */}
          <div>
            <label
              htmlFor="estado"
              className="block text-sm font-medium text-sub-headline mb-2"
            >
              Estado
            </label>
            <Select
              value={newStatus}
              onValueChange={(value) => setNewStatus(value as MemberStatus)}
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
            className="bg-transparent text-sub-headline border-sm border-secondary/30 hover:bg-card-background hover:text-headline cursor-pointer"
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
