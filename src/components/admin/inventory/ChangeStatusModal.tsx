import React, { useState } from 'react';
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
import { type InventoryItem } from '../../../types/inventory';
interface ChangeStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: InventoryItem | null; // El ítem que se va a editar
  onSave: (itemId: string, newStatus: 'En uso' | 'En mantenimiento') => void;
}

export const ChangeStatusModal: React.FC<ChangeStatusModalProps> = ({
  isOpen,
  onClose,
  item,
  onSave,
}) => {
  const [newStatus, setNewStatus] = useState<'En uso' | 'En mantenimiento'>(
    item?.estado || 'En uso'
  );

  React.useEffect(() => {
    if (item) {
      setNewStatus(item.estado);
    }
  }, [item]);

  const handleSave = () => {
    if (item) {
      onSave(item.id, newStatus);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-background text-headline border-secondary/30">
        <DialogHeader className="border-b border-secondary/30 pb-4 mb-4">
          <DialogTitle className="text-xl font-bold text-headline">
            Cambiar estado de {item?.nombre}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <label
            htmlFor="estado"
            className="block text-sm font-medium text-sub-headline mb-2"
          >
            Nuevo Estado
          </label>
          <Select
            value={newStatus}
            onValueChange={(value) =>
              setNewStatus(value as 'En uso' | 'En mantenimiento')
            }
          >
            <SelectTrigger className="w-full bg-card-background text-headline border-sm border-secondary/30 focus:ring-highlight focus:border-highlight">
              <SelectValue placeholder="Selecciona el nuevo estado" />
            </SelectTrigger>
            <SelectContent className="bg-card-background text-headline border-secondary/30">
              <SelectItem value="En uso">En uso</SelectItem>
              <SelectItem value="En mantenimiento">En mantenimiento</SelectItem>
            </SelectContent>
          </Select>
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
