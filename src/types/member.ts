export type MemberPlan = 'Básico' | 'Premium';
export type MemberStatus = 'Activo' | 'Inactivo';

export interface Member {
  id: string;
  nombre: string;
  correo: string;
  plan: MemberPlan;
  fechaInicio: string;
  estado: MemberStatus;
}

export type NewMemberData = Omit<Member, 'id' | 'fechaInicio' | 'estado'> & {
  plan: MemberPlan;
};

export const DUMMY_MEMBERS: Member[] = [
  {
    id: 'm1',
    nombre: 'Sofía Rodríguez',
    correo: 'sofia.rodriguez@example.com',
    plan: 'Premium',
    fechaInicio: '2023-01-15',
    estado: 'Activo',
  },
  {
    id: 'm2',
    nombre: 'Carlos Pérez',
    correo: 'carlos.perez@example.com',
    plan: 'Básico',
    fechaInicio: '2023-02-20',
    estado: 'Activo',
  },
  {
    id: 'm3',
    nombre: 'Ana García',
    correo: 'ana.garcia@example.com',
    plan: 'Premium',
    fechaInicio: '2023-03-10',
    estado: 'Activo',
  },
  {
    id: 'm4',
    nombre: 'Javier López',
    correo: 'javier.lopez@example.com',
    plan: 'Básico',
    fechaInicio: '2023-04-05',
    estado: 'Inactivo',
  },
  {
    id: 'm5',
    nombre: 'María Martínez',
    correo: 'maria.martinez@example.com',
    plan: 'Premium',
    fechaInicio: '2023-05-12',
    estado: 'Activo',
  },
  {
    id: 'm6',
    nombre: 'Luis Hernández',
    correo: 'luis.hernandez@example.com',
    plan: 'Básico',
    fechaInicio: '2024-06-01',
    estado: 'Activo',
  },
  {
    id: 'm7',
    nombre: 'Elena Castillo',
    correo: 'elena.castillo@example.com',
    plan: 'Premium',
    fechaInicio: '2024-07-25',
    estado: 'Inactivo',
  },
];
