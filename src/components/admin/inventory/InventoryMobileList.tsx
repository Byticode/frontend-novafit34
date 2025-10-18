import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../../ui/button';
// import { cn } from '../../../lib/utils';
import { type InventoryItem } from '../../../types/inventory';

interface InventoryMobileListProps {
  filteredItems: InventoryItem[];
  onOpenStatusChange: (item: InventoryItem) => void;
}

export const InventoryMobileList: React.FC<InventoryMobileListProps> = ({
  filteredItems,
  onOpenStatusChange,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="lg:hidden space-y-4">
      {' '}
      {/* Visible solo en mobile */}
      {filteredItems.map((item) => (
        <div key={item.id} className="bg-card p-4 rounded-lg shadow-md">
          <div
            className="flex justify-between items-center"
            onClick={() => toggleExpand(item.id)}
          >
            <div className="flex flex-col">
              <span className="font-medium text-white">{item.nombre}</span>
              <span
                className={`px-2 py-1 mt-1 rounded-full text-xs font-semibold w-fit ${
                  item.estado === 'En uso'
                    ? 'bg-green-900/40 text-green-300'
                    : 'bg-orange-900/40 text-orange-300'
                }`}
              >
                {item.estado}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-700/30"
            >
              {expandedId === item.id ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </Button>
          </div>

          {expandedId === item.id && (
            <div className="mt-4 border-t border-gray-700 pt-4 text-sm text-gray-300 space-y-2">
              <p>
                <strong>Tipo:</strong> {item.tipo}
              </p>
              <p>
                <strong>Ubicación:</strong> {item.ubicacion}
              </p>
              <p>
                <strong>Fecha de compra:</strong> {item.fechaCompra}
              </p>
              <div className="mt-3">
                <Button
                  variant="link"
                  onClick={() => onOpenStatusChange(item)}
                  className="p-0 h-auto text-indigo-400 hover:text-indigo-500"
                >
                  Cambiar estado
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
