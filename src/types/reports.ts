// Tipos para los filtros
export type IncomeTypeFilter = 'Todos' | 'Membresías' | 'Clases' | 'Productos';
export type TimePeriodFilter =
  | 'Este Mes'
  | 'Últimos 3 Meses'
  | 'Este Año'
  | 'Personalizado';

// Datos para el gráfico de Ingresos Totales (Barras Semanales)
export interface WeeklyIncomeData {
  name: string;
  income: number;
}

// Datos para el gráfico de Ingresos por Tipo
export type IncomeCategory = 'Membresías' | 'Clases' | 'Productos' | 'Otros';

export interface MonthlyIncomeByCategoryData {
  name: string;
  Membresías: number;
  Clases: number;
  Productos: number;
  Otros: number; // Para escalabilidad
}

// Datos para el gráfico de Ingresos por Clase (las barras horizontales)
export interface ClassIncomeData {
  name: string;
  income: number;
}

export const DUMMY_WEEKLY_INCOME: WeeklyIncomeData[] = [
  { name: 'Sem 1', income: 6000 },
  { name: 'Sem 2', income: 7000 },
  { name: 'Sem 3', income: 5500 },
  { name: 'Sem 4', income: 6500 },
];

export const DUMMY_MONTHLY_INCOME_BY_CATEGORY: MonthlyIncomeByCategoryData[] = [
  { name: 'Ene', Membresías: 3000, Clases: 1500, Productos: 500, Otros: 200 },
  { name: 'Feb', Membresías: 3200, Clases: 1600, Productos: 600, Otros: 250 },
  { name: 'Mar', Membresías: 3500, Clases: 1700, Productos: 700, Otros: 300 },
  { name: 'Abr', Membresías: 3800, Clases: 1800, Productos: 800, Otros: 350 },
  { name: 'May', Membresías: 4000, Clases: 1900, Productos: 900, Otros: 400 },
  { name: 'Jun', Membresías: 4200, Clases: 2000, Productos: 1000, Otros: 450 },
  { name: 'Jul', Membresías: 4500, Clases: 2100, Productos: 1100, Otros: 500 },
];

export const DUMMY_CLASS_INCOME: ClassIncomeData[] = [
  { name: 'Yoga', income: 2500 },
  { name: 'Spinning', income: 1000 },
  { name: 'Zumba', income: 1500 },
  { name: 'Pilates', income: 500 },
  { name: 'Funcional', income: 700 },
];
