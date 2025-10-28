// Performance Overview
export interface GrowthData {
  name: string;
  value: number;
}

//  Tabla de Tareas
export type TaskStatus = 'Pendiente' | 'Completada';

export interface Task {
  id: string;
  taskName: string;
  status: TaskStatus;
  dueDate: string;
}

// DATOS SIMULADOS

export const DUMMY_MEMBERSHIP_GROWTH: GrowthData[] = [
  { name: 'ene', value: 10 },
  { name: 'Feb', value: 12 },
  { name: 'Mar', value: 15 },
];

export const DUMMY_ATTENDANCE_DATA: GrowthData[] = [
  { name: 'ene', value: 8 },
  { name: 'Feb', value: 10 },
  { name: 'Mar', value: 12 },
];

export const DUMMY_TASKS: Task[] = [
  {
    id: 't1',
    taskName: 'Follow up with new leads',
    status: 'Pendiente',
    dueDate: '2025-03-15',
  },
  {
    id: 't2',
    taskName: 'Review class schedules',
    status: 'Completada',
    dueDate: '2025-03-10',
  },
  {
    id: 't3',
    taskName: 'Update billing information',
    status: 'Pendiente',
    dueDate: '2025-03-20',
  },
  {
    id: 't4',
    taskName: 'Order new yoga mats',
    status: 'Pendiente',
    dueDate: '2025-03-25',
  },
];
