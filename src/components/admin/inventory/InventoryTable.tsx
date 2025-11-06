import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import { Button } from '../../ui/button';
import { type InventoryItem } from '../../../types/inventory';

interface InventoryTableProps {
  filteredItems: InventoryItem[];
  onOpenStatusChange: (item: InventoryItem) => void;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({
  filteredItems,
  onOpenStatusChange,
}) => {
  return (
    <div className="bg-card-background rounded-lg p-6 overflow-x-auto hidden lg:block">
      <Table className="min-w-full text-left">
        <TableHeader>
          <TableRow className="border-secondary/30 bg-card-background hover:bg-card-background">
            <TableHead className="text-sm font-semibold text-headline">
              Nombre
            </TableHead>
            <TableHead className="text-sm font-semibold text-headline">
              Tipo
            </TableHead>
            <TableHead className="text-sm font-semibold text-headline">
              Estado
            </TableHead>
            <TableHead className="text-sm font-semibold text-headline">
              Ubicación
            </TableHead>
            <TableHead className="text-sm font-semibold text-headline">
              Fecha de compra
            </TableHead>
            <TableHead className="text-sm font-semibold text-headline">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((item) => (
            <TableRow
              key={item.id}
              className="border-secondary/20 hover:bg-background/20 transition-colors"
            >
              <TableCell className="py-4 px-2 font-medium text-sub-headline">
                {item.nombre}
              </TableCell>
              <TableCell className="py-4 px-2 text-sub-headline">
                {item.tipo}
              </TableCell>
              <TableCell className="py-4 px-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.estado === 'En uso'
                      ? 'bg-green-900/40 text-green-300'
                      : 'bg-orange-900/40 text-orange-300'
                  }`}
                >
                  {item.estado}
                </span>
              </TableCell>
              <TableCell className="py-4 px-2 text-sub-headline">
                {item.ubicacion}
              </TableCell>
              <TableCell className="py-4 px-2 text-sub-headline">
                {item.fechaCompra}
              </TableCell>
              <TableCell className="py-4 px-2">
                <Button
                  variant="link"
                  onClick={() => onOpenStatusChange(item)}
                  className="p-0 h-auto text-indigo-400 hover:text-highlight cursor-pointer"
                >
                  Cambiar estado
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
