import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Pencil, ArrowLeft, Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { cn } from '../../lib/utils';
import type { User, UserRole, UserStatus } from '../../types/user';

// --- DATOS SIMULADOS ---
const initialUsers: User[] = [
  {
    id: 'u001',
    name: 'Ethan Carter',
    email: 'ethan.carter@example.com',
    role: 'Administrador',
    status: 'Active',
  },
  {
    id: 'u002',
    name: 'Olivia Cardw',
    email: 'olivia.bennett@example.com',
    role: 'Recepcionista',
    status: 'Active',
  },
  {
    id: 'u003',
    name: 'Noah Thompson',
    email: 'noah.thompson@example.com',
    role: 'Instructor',
    status: 'Active',
  },
  {
    id: 'u004',
    name: 'Sofía Carson',
    email: 'sofia.rodriguez@example.com',
    role: 'Miembro',
    status: 'Active',
  },
  {
    id: 'u005',
    name: 'Ava Rodriguez',
    email: 'ava.rodriguez@example.com',
    role: 'Miembro',
    status: 'Inactive',
  },
  {
    id: 'u006',
    name: 'Liam Walker',
    email: 'liam.walker@example.com',
    role: 'Miembro',
    status: 'Active',
  },
];

type FilterOption = 'Todos' | UserRole | UserStatus;

const roleOptions: UserRole[] = [
  'Administrador',
  'Instructor',
  'Recepcionista',
  'Miembro',
];

const FILTER_OPTIONS: FilterOption[] = [
  'Todos',
  'Active',
  'Inactive',
  ...roleOptions,
];
const statusOptions: UserStatus[] = ['Active', 'Inactive'];

interface EditUserModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User, newRole: UserRole, newStatus: UserStatus) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  user,
  isOpen,
  onClose,
  onSave,
}) => {
  const [newRole, setNewRole] = useState<UserRole>(user.role);
  const [newStatus, setNewStatus] = useState<UserStatus>(user.status);

  const handleSave = () => {
    onSave(user, newRole, newStatus);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-background border-secondary/30 p-6">
        <DialogHeader className="flex justify-start items-center border-b border-secondary/30 pb-3">
          <DialogTitle className="text-xl font-bold text-headline">
            Editar {user.name}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-5">
          {/* Edición de Rol */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-sub-headline block">
              Rol
            </label>
            <Select
              value={newRole}
              onValueChange={(value) => setNewRole(value as UserRole)}
            >
              <SelectTrigger className="w-full bg-card-background border-secondary/30 text-headline">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card-background border-secondary/30 text-headline">
                {roleOptions.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Edición de Estado */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-sub-headline block">
              Estado
            </label>
            <Select
              value={newStatus}
              onValueChange={(value) => setNewStatus(value as UserStatus)}
            >
              <SelectTrigger className="w-full bg-card-background border-secondary/30 text-headline">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card-background border-secondary/30 text-headline">
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-secondary/30">
          <Button
            onClick={handleSave}
            className="bg-highlight hover:bg-highlight/70 text-headline cursor-pointer"
          >
            Guardar Cambios
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// --- Componente de Fila de Usuario ---
interface UserTableRowProps {
  user: User;
  onEdit: (user: User) => void;
  onViewProfile: (user: User) => void;
}

const UserTableRow: React.FC<UserTableRowProps> = ({
  user,
  onEdit,
  onViewProfile,
}) => {
  // Estilos de Badge para Estado (similar a y)
  const statusClass =
    user.status === 'Active'
      ? 'bg-green-600/30 text-green-300'
      : 'bg-red-600/30 text-red-300';

  // Estilos de Badge para Rol (similar a)
  const roleClass =
    user.role === 'Administrador'
      ? 'bg-indigo-600/30 text-indigo-300'
      : user.role === 'Miembro'
        ? 'bg-blue-600/30 text-blue-300'
        : 'bg-gray-600/30 text-gray-300';

  // Función de navegación al hacer clic en la fila
  const handleRowClick = () => {
    onViewProfile(user);
  };

  return (
    <TableRow
      className="border-b border-secondary/30 hover:bg-background/20 transition-colors cursor-pointer"
      onClick={handleRowClick}
    >
      <TableCell className="py-4 px-4 font-medium text-sub-headline">
        {user.name}
      </TableCell>
      <TableCell className="py-4 px-4 text-sub-headline">
        {user.email}
      </TableCell>

      <TableCell className="py-4 px-4">
        <span
          className={cn(
            'inline-block px-3 py-1 text-xs font-semibold rounded-full',
            roleClass
          )}
        >
          {user.role}
        </span>
      </TableCell>

      <TableCell className="py-4 px-4">
        <span
          className={cn(
            'inline-block px-3 py-1 text-xs font-semibold rounded-full',
            statusClass
          )}
        >
          {user.status === 'Active' ? 'Activo' : 'Inactivo'}
        </span>
      </TableCell>

      <TableCell className="py-4 px-4 w-[100px] pointer-events-auto">
        {/* Botón de Editar que abre el modal (Detiene la propagación del click de la fila) */}
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(user);
          }}
          title="Editar Rol y Estado"
          className="hover:bg-card-background cursor-pointer"
        >
          <Pencil className="w-5 h-5 text-highlight" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

// --- Componente Principal ---
export const ManageUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterOption>('Todos');
  const navigate = useNavigate();

  // Lógica de actualización (Se reemplazaría por la llamada a la DB)
  const handleSaveUser = (
    user: User,
    newRole: UserRole,
    newStatus: UserStatus
  ) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.id === user.id ? { ...u, role: newRole, status: newStatus } : u
      )
    );
    console.log(`Usuario ${user.id}: Rol/Estado guardado.`);
  };

  // Lógica de Navegación Condicional (al hacer clic en la fila)
  const handleViewProfile = (user: User) => {
    if (user.role === 'Miembro') {
      // Navegar a perfil de miembro
      navigate(`/admin/members/${user.id}/profile`);
    } else {
      // Navegar a perfil de empleado (Placeholder)
      navigate(`/admin/users/${user.id}/profile`);
    }
  };

  const filteredAndSearchedUsers = useMemo(() => {
    let tempUsers = users;

    if (filter !== 'Todos') {
      tempUsers = tempUsers.filter(
        (user) => user.role === filter || user.status === filter
      );
    }

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      tempUsers = tempUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          user.email.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    return tempUsers;
  }, [users, filter, searchTerm]);

  return (
    <div className="min-h-screen p-2 lg:p-8">
      <Button
        variant="link"
        onClick={() => navigate('/admin/settings')}
        className="text-indigo-400 hover:text-indigo-300 p-0 mb-4 cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Volver a Ajustes
      </Button>
      <h1 className="text-3xl lg:text-4xl font-bold text-headline mb-4">
        Usuarios y Roles
      </h1>
      <p className="text-sub-headline mb-8">
        Gestiona todos los usuarios del sistema, incluyendo miembros y
        empleados.
      </p>

      <div className="relative mb-6">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-sub-headline"
          size={20}
        />
        <Input
          type="text"
          placeholder="Buscar usuarios por nombre o correo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-6 pl-10 rounded-lg bg-card-background text-headline placeholder-sub-headline border border-secondary/30 focus:outline-none focus:ring-2 focus:ring-highlight shadow-md"
        />
      </div>

      <div className="flex border-b border-secondary/30 mb-6 overflow-x-auto whitespace-nowrap">
        {FILTER_OPTIONS.map((option) => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            className={`py-2 px-4 text-sm font-medium transition-colors ${
              filter === option
                ? 'border-b-2 border-highlight text-indigo-400'
                : 'text-sub-headline hover:text-headline cursor-pointer'
            }`}
          >
            {option === 'Active'
              ? 'Activos'
              : option === 'Inactive'
                ? 'Inactivos'
                : option}
          </button>
        ))}
      </div>

      <Card className="bg-card-background border border-secondary/30 shadow-xl p-4 overflow-x-auto">
        <Table>
          <TableHeader className="">
            <TableRow className="border-b border-secondary/30 hover:bg-card-background">
              <TableHead className="py-3 px-4 text-sm font-medium text-headline">
                Nombre
              </TableHead>
              <TableHead className="py-3 px-4 text-sm font-medium text-headline">
                Correo Electrónico
              </TableHead>
              <TableHead className="py-3 px-4 text-sm font-medium text-headline">
                Rol
              </TableHead>
              <TableHead className="py-3 px-4 text-sm font-medium text-headline">
                Estado
              </TableHead>
              <TableHead className="py-3 px-4 text-sm font-medium text-headline">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSearchedUsers.map((user) => (
              <UserTableRow
                key={user.id}
                user={user}
                onEdit={setEditingUser}
                onViewProfile={handleViewProfile}
              />
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Modal de Edición */}
      {editingUser && (
        <EditUserModal
          user={editingUser}
          isOpen={!!editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
};
