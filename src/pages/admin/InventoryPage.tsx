import React, { useState, useMemo } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { AddEquipmentModal } from '../../components/admin/inventory/AddEquipmentModal';
import { ChangeStatusModal } from '../../components/admin/inventory/ChangeStatusModal';
import { InventoryTable } from '../../components/admin/inventory/InventoryTable';
import { InventoryMobileList } from '../../components/admin/inventory/InventoryMobileList';
import {
  type InventoryItem,
  type SavedNewEquipment,
  DUMMY_INVENTORY,
} from '../../types/inventory';

type FilterStatus = 'Todos' | 'En uso' | 'En mantenimiento';

export const InventoryPage: React.FC = () => {
  const [inventoryItems, setInventoryItems] =
    useState<InventoryItem[]>(DUMMY_INVENTORY);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterStatus>('Todos');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const handleAddItem = (newItem: SavedNewEquipment) => {
    setInventoryItems((prev) => [
      ...prev,
      { ...newItem, id: String(Date.now()) } as InventoryItem,
    ]);
  };

  const handleOpenStatusChange = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsStatusModalOpen(true);
  };

  const handleChangeStatus = (
    itemId: string,
    newStatus: 'En uso' | 'En mantenimiento'
  ) => {
    setInventoryItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, estado: newStatus } : item
      )
    );
  };

  const filteredAndSearchedItems = useMemo(() => {
    let tempItems = inventoryItems;

    // 1. Filtrar por estado
    if (filter !== 'Todos') {
      tempItems = tempItems.filter((item) => item.estado === filter);
    }

    // 2. Filtrar por término de búsqueda
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      tempItems = tempItems.filter(
        (item) =>
          item.nombre.toLowerCase().includes(lowerCaseSearchTerm) ||
          item.tipo.toLowerCase().includes(lowerCaseSearchTerm) ||
          item.ubicacion.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    return tempItems;
  }, [inventoryItems, filter, searchTerm]);

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 lg:mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-headline mb-4 md:mb-0">
          Inventario
        </h1>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-highlight hover:bg-highlight/70 text-headline flex items-center cursor-pointer"
        >
          <Plus className="w-5 h-5 mr-2" /> Añadir
        </Button>
      </div>

      <div className="relative mb-6">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-sub-headline"
          size={20}
        />
        <Input
          type="text"
          placeholder="Buscar equipamiento..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-6 pl-10 rounded-lg bg-card-background text-headline placeholder-sub-headline border-sm border-secondary/30 focus:outline-none focus:ring-2 focus:ring-highlight"
        />
      </div>

      <div className="flex border-b border-secondary/30 mb-6">
        {['Todos', 'En uso', 'En mantenimiento'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as FilterStatus)}
            className={`py-2 px-4 text-sm font-medium ${
              filter === status
                ? 'border-b-2 border-highlight text-indigo-400'
                : 'text-sub-headline hover:text-headline cursor-pointer'
            } transition-colors`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Tabla para Desktop */}
      <InventoryTable
        filteredItems={filteredAndSearchedItems}
        onOpenStatusChange={handleOpenStatusChange}
      />

      {/* Lista para Mobile */}
      <InventoryMobileList
        filteredItems={filteredAndSearchedItems}
        onOpenStatusChange={handleOpenStatusChange}
      />

      {/* Modales */}
      <AddEquipmentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddItem}
      />
      <ChangeStatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        item={selectedItem}
        onSave={handleChangeStatus}
      />
    </div>
  );
};
