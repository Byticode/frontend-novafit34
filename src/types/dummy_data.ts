import type { MemberStatus } from './member';

export type MembershipType = 'Premium' | 'Básica';

export interface MembershipHistory {
  type: MembershipType;
  estado: MemberStatus;
  fechaInicio: string; // YYYY-MM-DD
  fechaFin: string; // YYYY-MM-DD
}

export interface PaymentRecord {
  fecha: string; // YYYY-MM-DD
  monto: number;
  metodo: string;
  estado: 'Completado' | 'Fallido' | 'Pendiente';
}

export interface ClassAttendance {
  clase: string;
  fecha: string; // YYYY-MM-DD
  hora: string; // HH:MM AM/PM
}

export interface MemberNotes {
  note: string;
}

// --- DATOS SIMULADOS ---
export const DUMMY_MEMBERSHIPS: MembershipHistory[] = [
  {
    type: 'Premium',
    estado: 'Activo',
    fechaInicio: '2024-01-15',
    fechaFin: '2025-01-14',
  },
  {
    type: 'Básica',
    estado: 'Inactivo',
    fechaInicio: '2023-01-01',
    fechaFin: '2023-12-31',
  },
];

export const DUMMY_PAYMENT_HISTORY: PaymentRecord[] = [
  {
    fecha: '2024-01-15',
    monto: 50,
    metodo: 'Tarjeta de Debito',
    estado: 'Completado',
  },
  {
    fecha: '2024-02-15',
    monto: 50,
    metodo: 'Transferencia',
    estado: 'Completado',
  },
  {
    fecha: '2024-03-15',
    monto: 50,
    metodo: 'Tarjeta de Debito',
    estado: 'Completado',
  },
  { fecha: '2024-04-15', monto: 50, metodo: 'Efectivo', estado: 'Pendiente' },
];

export const DUMMY_ATTENDANCE: ClassAttendance[] = [
  { clase: 'Yoga', fecha: '2024-07-20', hora: '10:00 AM' },
  { clase: 'Spinning', fecha: '2024-07-22', hora: '6:00 PM' },
  { clase: 'Zumba', fecha: '2024-07-24', hora: '7:00 PM' },
];

export const DUMMY_NOTES: MemberNotes = {
  note: 'Breach.',
};
