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
      <DialogContent className="sm:max-w-[425px] bg-bg-primary text-white border-gray-700">
        <DialogHeader className="border-b border-gray-700 pb-4 mb-4">
          <DialogTitle className="text-xl font-bold text-white">
            Editar Membresía de {member?.nombre || 'Miembro'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Edición de Plan */}
          <div>
            <label
              htmlFor="plan"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Tipo de Plan
            </label>
            <Select
              value={newPlan}
              onValueChange={(value) => setNewPlan(value as MemberPlan)}
            >
              <SelectTrigger className="w-full bg-blue-primary text-white border border-gray-700 focus:ring-indigo-500 focus:border-indigo-500">
                <SelectValue placeholder="Selecciona el plan" />
              </SelectTrigger>
              <SelectContent className="bg-card text-white border-gray-700">
                <SelectItem value="Básico">Básico</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Edición de Estado */}
          <div>
            <label
              htmlFor="estado"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Estado
            </label>
            <Select
              value={newStatus}
              onValueChange={(value) => setNewStatus(value as MemberStatus)}
            >
              <SelectTrigger className="w-full bg-blue-primary text-white border border-gray-700 focus:ring-indigo-500 focus:border-indigo-500">
                <SelectValue placeholder="Selecciona el estado" />
              </SelectTrigger>
              <SelectContent className="bg-card text-white border-gray-700">
                <SelectItem value="Activo">Activo</SelectItem>
                <SelectItem value="Inactivo">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="pt-4 mt-4 border-t border-gray-700">
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-transparent text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white cursor-pointer"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            onClick={handleSave}
            className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
          >
            Guardar Cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
