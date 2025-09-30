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
      <DialogContent className="sm:max-w-[425px] bg-bg-primary text-white border-gray-700">
        <DialogHeader className="border-b border-gray-700 pb-4 mb-4">
          <DialogTitle className="text-xl font-bold text-white">
            Cambiar estado de {item?.nombre}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <label
            htmlFor="estado"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Nuevo Estado
          </label>
          <Select
            value={newStatus}
            onValueChange={(value) =>
              setNewStatus(value as 'En uso' | 'En mantenimiento')
            }
          >
            <SelectTrigger className="w-full bg-blue-primary text-white border border-gray-700 focus:ring-indigo-500 focus:border-indigo-500">
              <SelectValue placeholder="Selecciona el nuevo estado" />
            </SelectTrigger>
            <SelectContent className="bg-card text-white border-gray-700">
              <SelectItem value="En uso">En uso</SelectItem>
              <SelectItem value="En mantenimiento">En mantenimiento</SelectItem>
            </SelectContent>
          </Select>
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
