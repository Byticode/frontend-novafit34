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
import { CalendarIcon } from 'lucide-react';
import { type SavedNewEquipment } from '../../../types/inventory';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'; // Para formato en español
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { Calendar } from '../../ui/calendar';
import { cn } from '../../../lib/utils'; //

interface AddEquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: SavedNewEquipment) => void; // `any` por ahora, luego InventoryItem
}

export const AddEquipmentModal: React.FC<AddEquipmentModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [estado, setEstado] = useState<'En uso' | 'En mantenimiento'>('En uso');
  const [ubicacion, setUbicacion] = useState('');
  const [fechaCompra, setFechaCompra] = useState<Date | undefined>(undefined);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const resetForm = () => {
    setNombre('');
    setTipo('');
    setEstado('En uso');
    setUbicacion('');
    setFechaCompra(undefined);
    setErrors({});
  };

  const handleSave = () => {
    const newErrors: Record<string, string> = {};
    if (!nombre) newErrors['nombre'] = 'El nombre es requerido.';
    if (!tipo) newErrors['tipo'] = 'El tipo es requerido.';
    if (!ubicacion) newErrors['ubicacion'] = 'La ubicación es requerida.';
    if (!fechaCompra)
      newErrors['fechaCompra'] = 'La fecha de compra es requerida.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      nombre,
      tipo,
      estado,
      ubicacion,
      fechaCompra: fechaCompra ? format(fechaCompra, 'yyyy-MM-dd') : '',
    } as SavedNewEquipment);
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-xl bg-background text-headline border-secondary/30">
        <DialogHeader className="border-b border-secondary/30 pb-4 mb-4">
          <DialogTitle className="text-2xl font-bold text-headline">
            Añadir nuevo equipamiento
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {/* Nombre */}
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-sub-headline mb-2"
            >
              Nombre
            </label>
            <Input
              id="nombre"
              placeholder="Ej: Mancuernas"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
                setErrors((prev) => ({ ...prev, nombre: '' }));
              }}
              className={`bg-card-background text-headline border-sm ${errors['nombre'] ? 'border-red-500' : 'border-secondary/30'} focus:ring-highlight focus:border-highlight`}
            />
            {errors['nombre'] && (
              <p className="mt-1 text-xs text-red-500">{errors['nombre']}</p>
            )}
          </div>
          {/* Tipo */}
          <div>
            <label
              htmlFor="tipo"
              className="block text-sm font-medium text-sub-headline mb-2"
            >
              Tipo
            </label>
            <Input
              id="tipo"
              placeholder="Ej: Fuerza"
              value={tipo}
              onChange={(e) => {
                setTipo(e.target.value);
                setErrors((prev) => ({ ...prev, tipo: '' }));
              }}
              className={`bg-card-background text-headline border-sm ${errors['tipo'] ? 'border-red-500' : 'border-secondary/30'} focus:ring-highlight focus:border-highlight`}
            />
            {errors['tipo'] && (
              <p className="mt-1 text-xs text-red-500">{errors['tipo']}</p>
            )}
          </div>
          {/* Estado */}
          <div>
            <label
              htmlFor="estado"
              className="block text-sm font-medium text-sub-headline mb-2"
            >
              Estado
            </label>
            <Select
              value={estado}
              onValueChange={(value) =>
                setEstado(value as 'En uso' | 'En mantenimiento')
              }
            >
              <SelectTrigger className="w-full bg-card-background text-headline border-sm border-secondary/30 focus:ring-highlight focus:border-highlight">
                <SelectValue placeholder="Selecciona el estado" />
              </SelectTrigger>
              <SelectContent className="bg-card-background text-headline border-secondary/30">
                <SelectItem value="En uso">En uso</SelectItem>
                <SelectItem value="En mantenimiento">
                  En mantenimiento
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Ubicación */}
          <div>
            <label
              htmlFor="ubicacion"
              className="block text-sm font-medium text-sub-headline mb-2"
            >
              Ubicación
            </label>
            <Input
              id="ubicacion"
              placeholder="Ej: Sala de pesas"
              value={ubicacion}
              onChange={(e) => {
                setUbicacion(e.target.value);
                setErrors((prev) => ({ ...prev, ubicacion: '' }));
              }}
              className={`bg-card-background text-headline border-sm ${errors['ubicacion'] ? 'border-red-500' : 'border-secondary/30'} focus:ring-highlight focus:border-highlight`}
            />
            {errors['ubicacion'] && (
              <p className="mt-1 text-xs text-red-500">{errors['ubicacion']}</p>
            )}
          </div>
          {/* Fecha de Compra (DatePicker) */}
          <div className="md:col-span-2">
            <label
              htmlFor="fechaCompra"
              className="block text-sm font-medium text-sub-headline mb-2"
            >
              Fecha de Compra
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full justify-start text-left font-normal bg-card-background text-headline border-sm border-secondary/30 hover:bg-card-background hover:text-headline',
                    !fechaCompra && 'text-sub-headline',
                    errors['fechaCompra'] && 'border-red-500'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {fechaCompra ? (
                    format(fechaCompra, 'PPP', { locale: es })
                  ) : (
                    <span>Selecciona una fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-card-background border-secondary/30">
                <Calendar
                  mode="single"
                  selected={fechaCompra}
                  onSelect={(date) => {
                    setFechaCompra(date);
                    setErrors((prev) => ({ ...prev, fechaCompra: '' }));
                  }}
                  initialFocus
                  locale={es}
                  classNames={{
                    month: 'space-y-4',
                    caption: 'flex justify-center pt-1 relative items-center',
                    caption_label: 'text-sm font-medium text-white',
                    nav: 'space-x-1 flex items-center justify-between absolute left-0 right-0 text-white',
                    nav_button:
                      'h-7 w-7 bg-transparent p-0 opacity-100 hover:opacity-100 text-white',
                    nav_button_previous: 'absolute left-1 hover:bg-transparent',
                    nav_button_next: 'absolute right-1 hover:bg-transparent',
                    table: 'w-full border-collapse space-y-1',
                    head_row: 'flex justify-around mt-2',
                    head_cell:
                      'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
                    row: 'flex w-full mt-2 justify-around',
                    cell: 'h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20',
                    day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100 text-white hover:bg-gray-700/50',
                    day_selected:
                      'bg-indigo-600 text-white hover:bg-indigo-700 focus:bg-indigo-700',
                    day_today: 'bg-indigo-500 text-gray-900 font-bold',
                    day_outside: 'text-muted-foreground opacity-50',
                    day_disabled: 'text-muted-foreground opacity-50',
                    day_range_middle:
                      'aria-selected:bg-accent aria-selected:text-accent-foreground',
                    day_hidden: 'invisible',
                  }}
                />
              </PopoverContent>
            </Popover>
            {errors['fechaCompra'] && (
              <p className="mt-1 text-xs text-red-500">
                {errors['fechaCompra']}
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
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
