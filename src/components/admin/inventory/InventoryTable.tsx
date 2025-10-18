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
    <div className="bg-blue-primary rounded-lg p-6 overflow-x-auto hidden lg:block">
      <Table className="min-w-full text-left">
        <TableHeader>
          <TableRow className="border-gray-700 bg-blue-primary hover:bg-blue-primary">
            <TableHead className="text-sm font-semibold text-gray-400">
              Nombre
            </TableHead>
            <TableHead className="text-sm font-semibold text-gray-400">
              Tipo
            </TableHead>
            <TableHead className="text-sm font-semibold text-gray-400">
              Estado
            </TableHead>
            <TableHead className="text-sm font-semibold text-gray-400">
              Ubicación
            </TableHead>
            <TableHead className="text-sm font-semibold text-gray-400">
              Fecha de compra
            </TableHead>
            <TableHead className="text-sm font-semibold text-gray-400">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((item) => (
            <TableRow
              key={item.id}
              className="border-gray-800 hover:bg-gray-700/30 transition-colors"
            >
              <TableCell className="py-4 px-2 font-medium text-white">
                {item.nombre}
              </TableCell>
              <TableCell className="py-4 px-2 text-gray-300">
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
              <TableCell className="py-4 px-2 text-gray-300">
                {item.ubicacion}
              </TableCell>
              <TableCell className="py-4 px-2 text-gray-300">
                {item.fechaCompra}
              </TableCell>
              <TableCell className="py-4 px-2">
                <Button
                  variant="link"
                  onClick={() => onOpenStatusChange(item)}
                  className="p-0 h-auto text-indigo-400 hover:text-indigo-500 cursor-pointer"
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
