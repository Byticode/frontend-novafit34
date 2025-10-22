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
      <DialogContent className="sm:max-w-[425px] md:max-w-md bg-bg-primary text-white border-gray-700">
        <DialogHeader className="border-b border-gray-700 pb-4 mb-4">
          <DialogTitle className="text-2xl font-bold text-white">
            Editar Membresía de {member.nombre}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {/* Plan */}
          <div>
            <label
              htmlFor="plan"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Plan Actual
            </label>
            <Select
              value={currentPlan}
              onValueChange={(value) => setCurrentPlan(value as MemberPlan)}
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

          {/* Estado */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Estado
            </label>
            <Select
              value={currentStatus}
              onValueChange={(value) => setCurrentStatus(value as MemberStatus)}
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
