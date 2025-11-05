import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { DUMMY_MEMBERS } from '../../../types/member';
import type { NewPaymentData } from '../../../types/payment';
import type { MemberPlan } from '../../../types/member';

interface AddPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (paymentData: NewPaymentData) => void;
}

export const AddPaymentModal: React.FC<AddPaymentModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [selectedMemberId, setSelectedMemberId] = useState<string>('');
  const [selectedPlan, setSelectedPlan] = useState<MemberPlan>('Básico');
  const [monto, setMonto] = useState<string>('');
  const [referenciaBancaria, setReferenciaBancaria] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Cuando el miembro cambia, intenta preseleccionar el plan y monto por defecto
    const member = DUMMY_MEMBERS.find((m) => m.id === selectedMemberId);
    if (member) {
      setSelectedPlan(member.plan);
      setMonto(member.plan === 'Premium' ? '500' : '50');
    } else {
      setSelectedPlan('Básico');
      setMonto('50');
    }
  }, [selectedMemberId]);

  const resetForm = () => {
    setSelectedMemberId('');
    setSelectedPlan('Básico');
    setMonto('');
    setReferenciaBancaria('');
    setErrors({});
  };

  const handleSave = () => {
    const newErrors: Record<string, string> = {};
    if (!selectedMemberId)
      newErrors['selectedMemberId'] = 'Debe seleccionar un miembro.';
    if (!monto || parseFloat(monto) <= 0)
      newErrors[monto] = 'El monto es inválido.';
    if (!referenciaBancaria)
      newErrors[referenciaBancaria] = 'La referencia bancaria es requerida.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const member = DUMMY_MEMBERS.find((m) => m.id === selectedMemberId);
    if (!member) {
      newErrors['selectedMemberId'] = 'Miembro no encontrado.';
      setErrors(newErrors);
      return;
    }

    onSave({
      memberId: selectedMemberId,
      memberName: member.nombre,
      plan: selectedPlan,
      monto: parseFloat(monto),
      referenciaBancaria,
    } as NewPaymentData);

    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-md bg-background text-headline border-secondary/30">
        <DialogHeader className="border-b border-secondary/30 pb-4 mb-4">
          <DialogTitle className="text-2xl font-bold text-headline">
            Añadir Nuevo Pago
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {/* Selector de Miembro */}
          <div>
            <label
              htmlFor="member"
              className="block text-sm font-medium text-sub-headline mb-2"
            >
              Miembro
            </label>
            <Select
              value={selectedMemberId}
              onValueChange={(value) => {
                setSelectedMemberId(value);
                setErrors((prev) => ({ ...prev, memberId: '' }));
              }}
            >
              <SelectTrigger
                className={`w-full bg-card-background text-headline border-sm ${errors['selectedMemberId'] ? 'border-red-500' : 'border-secondary/30'} focus:ring-highlight focus:border-highlight`}
              >
                <SelectValue placeholder="Selecciona un miembro" />
              </SelectTrigger>
              <SelectContent className="bg-card-background text-headline border-secondary/30">
                {DUMMY_MEMBERS.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.nombre} ({member.correo})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors['selectedMemberId'] && (
              <p className="mt-1 text-xs text-red-500">
                {errors['selectedMemberId']}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="plan"
              className="block text-sm font-medium text-sub-headline mb-2"
            >
              Plan
            </label>
            <Select
              value={selectedPlan}
              onValueChange={(value) => setSelectedPlan(value as MemberPlan)}
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

          {/* Monto */}
          <div>
            <label
              htmlFor="monto"
              className="block text-sm font-medium text-sub-headline mb-2"
            >
              Monto ($)
            </label>
            <Input
              id="monto"
              type="number"
              placeholder="Ej: 500"
              value={monto}
              onChange={(e) => {
                setMonto(e.target.value);
                setErrors((prev) => ({ ...prev, monto: '' }));
              }}
              className={`bg-card-background text-headline border-sm ${errors[monto] ? 'border-red-500' : 'border-secondary/30'} focus:ring-highlight focus:border-highlight`}
            />
            {errors[monto] && (
              <p className="mt-1 text-xs text-red-500">{errors[monto]}</p>
            )}
          </div>

          {/* Referencia Bancaria */}
          <div>
            <label
              htmlFor="referencia"
              className="block text-sm font-medium text-sub-headline mb-2"
            >
              Referencia Bancaria
            </label>
            <Input
              id="referencia"
              placeholder="Ej: REF00123ABC"
              value={referenciaBancaria}
              onChange={(e) => {
                setReferenciaBancaria(e.target.value);
                setErrors((prev) => ({ ...prev, referenciaBancaria: '' }));
              }}
              className={`bg-card-background text-headline border-sm ${errors[referenciaBancaria] ? 'border-red-500' : 'border-secondary/30'} focus:ring-highlight focus:border-highlight`}
            />
            {errors[referenciaBancaria] && (
              <p className="mt-1 text-xs text-red-500">
                {errors[referenciaBancaria]}
              </p>
            )}
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
            Guardar Pago
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
