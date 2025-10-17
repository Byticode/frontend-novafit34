import type { MemberPlan } from './member';
export type PaymentStatus = 'Pagado' | 'Pendiente';

export interface Payment {
  id: string;
  memberId: string; // ID del miembro asociado
  memberName: string; // Nombre del miembro
  plan: MemberPlan;
  fechaInicio: string;
  fechaVencimiento: string;
  estado: PaymentStatus;
  monto: number;
  referenciaBancaria: string;
}

export type NewPaymentData = Omit<
  Payment,
  'id' | 'fechaInicio' | 'fechaVencimiento' | 'estado' | 'memberName'
> & {
  memberName: string;
  plan: MemberPlan;
  monto: number;
  referenciaBancaria: string;
  memberId: string;
};

export const DUMMY_PAYMENTS: Payment[] = [
  {
    id: 'p1',
    memberId: 'm1',
    memberName: 'Elena Ramirez',
    plan: 'Premium',
    fechaInicio: '2024-01-01',
    fechaVencimiento: '2025-01-01',
    estado: 'Pagado',
    monto: 500,
    referenciaBancaria: 'REF001PYMNT',
  },
  {
    id: 'p2',
    memberId: 'm2',
    memberName: 'Carlos Lopez',
    plan: 'Básico',
    fechaInicio: '2024-02-15',
    fechaVencimiento: '2025-02-15',
    estado: 'Pendiente',
    monto: 50,
    referenciaBancaria: 'REF002PYMNT',
  },
  {
    id: 'p3',
    memberId: 'm3',
    memberName: 'Sofia Torres',
    plan: 'Premium',
    fechaInicio: '2024-03-01',
    fechaVencimiento: '2025-03-01',
    estado: 'Pagado',
    monto: 500,
    referenciaBancaria: 'REF003PYMNT',
  },
  {
    id: 'p4',
    memberId: 'm4',
    memberName: 'Diego Vargas',
    plan: 'Básico',
    fechaInicio: '2024-04-15',
    fechaVencimiento: '2025-04-15',
    estado: 'Pendiente',
    monto: 50,
    referenciaBancaria: 'REF004PYMNT',
  },
  {
    id: 'p5',
    memberId: 'm5',
    memberName: 'Isabella Castro',
    plan: 'Premium',
    fechaInicio: '2024-04-01',
    fechaVencimiento: '2025-04-01',
    estado: 'Pagado',
    monto: 500,
    referenciaBancaria: 'REF005PYMNT',
  },
  {
    id: 'p6',
    memberId: 'm6',
    memberName: 'Luis Hernandez',
    plan: 'Básico',
    fechaInicio: '2024-06-01',
    fechaVencimiento: '2025-06-01',
    estado: 'Pagado',
    monto: 50,
    referenciaBancaria: 'REF006PYMNT',
  },
  {
    id: 'p7',
    memberId: 'm7',
    memberName: 'Elena Castillo',
    plan: 'Premium',
    fechaInicio: '2024-07-25',
    fechaVencimiento: '2025-07-25',
    estado: 'Pendiente',
    monto: 500,
    referenciaBancaria: 'REF007PYMNT',
  },
];
