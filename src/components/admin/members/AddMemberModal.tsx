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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import type { NewMemberData, MemberPlan } from '../../../types/member.d.ts';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (memberData: NewMemberData) => void;
}

export const AddMemberModal: React.FC<AddMemberModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [plan, setPlan] = useState<MemberPlan>('Básico');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const resetForm = () => {
    setNombre('');
    setCorreo('');
    setPlan('Básico');
    setErrors({});
  };

  const handleSave = () => {
    const newErrors: Record<string, string> = {};
    if (!nombre) newErrors[nombre] = 'El nombre es requerido.';
    if (!correo || !correo.includes('@'))
      newErrors[correo] = 'El correo es inválido.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      nombre,
      correo,
      plan,
    } as NewMemberData);

    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-md bg-background text-headline border-sm border-secondary/30">
        <DialogHeader className="border-b border-secondary/30 pb-4 mb-4">
          <DialogTitle className="text-2xl font-bold text-headline">
            Añadir Nuevo Miembro
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {/* Nombre */}
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-sub-headline mb-2"
            >
              Nombre Completo
            </label>
            <Input
              id="nombre"
              placeholder="Ej: Juan Pérez"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
                setErrors((prev) => ({ ...prev, nombre: '' }));
              }}
              className={`bg-card-background text-headline border-sm ${errors[nombre] ? 'border-red-500' : 'border-secondary/30'} focus:ring-highlight focus:border-indigo-500`}
            />
            {errors[nombre] && (
              <p className="mt-1 text-xs text-red-500">{errors[nombre]}</p>
            )}
          </div>

          {/* Correo */}
          <div>
            <label
              htmlFor="correo"
              className="block text-sm font-medium text-sub-headline mb-2"
            >
              Correo Electrónico
            </label>
            <Input
              id="correo"
              type="email"
              placeholder="ejemplo@gimnasio.com"
              value={correo}
              onChange={(e) => {
                setCorreo(e.target.value);
                setErrors((prev) => ({ ...prev, correo: '' }));
              }}
              className={`bg-card-background text-headline border-sm ${errors[correo] ? 'border-red-500' : 'border-secondary/30'} focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors[correo] && (
              <p className="mt-1 text-xs text-red-500">{errors[correo]}</p>
            )}
          </div>

          {/* Tipo de Plan */}
          <div>
            <label
              htmlFor="plan"
              className="block text-sm font-medium text-sub-headline mb-2"
            >
              Tipo de Plan
            </label>
            <Select
              value={plan}
              onValueChange={(value) => setPlan(value as MemberPlan)}
            >
              <SelectTrigger className="w-full bg-card-background text-headline border-sm border-secondary/30 focus:ring-highlight focus:border-highlight">
                <SelectValue placeholder="Selecciona el plan" />
              </SelectTrigger>
              <SelectContent className="bg-card-background text-headline border-sm border-secondary/30">
                <SelectItem value="Básico">Básico</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
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
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
