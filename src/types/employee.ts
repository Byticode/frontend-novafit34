export type EmployeeType = 'Entrenador' | 'Recepcionista' | 'Limpieza';
export type EmployeeStatus = 'Activo' | 'Inactivo';

export interface Employee {
  id: string;
  name: string;
  email: string;
  type: EmployeeType;
  status: EmployeeStatus;
}
