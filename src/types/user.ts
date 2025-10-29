export type UserRole =
  | 'Administrador'
  | 'Instructor'
  | 'Recepcionista'
  | 'Miembro';
export type UserStatus = 'Active' | 'Inactive';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}
