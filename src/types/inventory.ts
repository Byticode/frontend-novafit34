export interface InventoryItem {
  id: string;
  nombre: string;
  tipo: string;
  estado: 'En uso' | 'En mantenimiento';
  ubicacion: string;
  fechaCompra: string; // Formato YYYY-MM-DD
}

export type NewEquipmentFormData = Omit<InventoryItem, 'id' | 'fechaCompra'> & {
  fechaCompra: Date | undefined;
};

export type SavedNewEquipment = Omit<InventoryItem, 'id'>;

export const DUMMY_INVENTORY: InventoryItem[] = [
  {
    id: '1',
    nombre: 'Cinta de correr',
    tipo: 'Cardio',
    estado: 'En uso',
    ubicacion: 'Sala principal',
    fechaCompra: '2022-01-15',
  },
  {
    id: '2',
    nombre: 'Bicicleta estática',
    tipo: 'Cardio',
    estado: 'En mantenimiento',
    ubicacion: 'Sala principal',
    fechaCompra: '2022-01-15',
  },
  {
    id: '3',
    nombre: 'Máquina de remo',
    tipo: 'Cardio',
    estado: 'En uso',
    ubicacion: 'Sala principal',
    fechaCompra: '2022-01-15',
  },
  {
    id: '4',
    nombre: 'Banco de pesas',
    tipo: 'Fuerza',
    estado: 'En uso',
    ubicacion: 'Sala de pesas',
    fechaCompra: '2022-02-20',
  },
  {
    id: '5',
    nombre: 'Máquina de poleas',
    tipo: 'Fuerza',
    estado: 'En uso',
    ubicacion: 'Sala de pesas',
    fechaCompra: '2022-02-20',
  },
  {
    id: '6',
    nombre: 'Mancuernas 5kg',
    tipo: 'Fuerza',
    estado: 'En uso',
    ubicacion: 'Área de mancuernas',
    fechaCompra: '2023-03-10',
  },
  {
    id: '7',
    nombre: 'Barras Olímpicas',
    tipo: 'Fuerza',
    estado: 'En mantenimiento',
    ubicacion: 'Almacén',
    fechaCompra: '2021-11-01',
  },
  {
    id: '8',
    nombre: 'Elíptica',
    tipo: 'Cardio',
    estado: 'En uso',
    ubicacion: 'Sala principal',
    fechaCompra: '2022-05-20',
  },
];
