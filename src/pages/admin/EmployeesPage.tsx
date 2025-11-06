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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Plus, Search, Pencil } from 'lucide-react';
import { Input } from '../../components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { cn } from '../../lib/utils';
import type {
  Employee,
  EmployeeType,
  EmployeeStatus,
} from '../../types/employee';

// DATOS SIMULADOS
const initialEmployees: Employee[] = [
  {
    id: 'e001',
    name: 'Will Turner',
    email: 'will.turner@protonmail.com',
    type: 'Entrenador',
    status: 'Activo',
  },
  {
    id: 'e002',
    name: 'Olivia Bennett',
    email: 'olivia.b@protonmail.com',
    type: 'Recepcionista',
    status: 'Activo',
  },
  {
    id: 'e003',
    name: 'David Lee',
    email: 'david.lee@protonmail.com',
    type: 'Entrenador',
    status: 'Inactivo',
  },
  {
    id: 'e004',
    name: 'Laura Gómez',
    email: 'laura.gomez@protonmail.com',
    type: 'Limpieza',
    status: 'Activo',
  },
  {
    id: 'e005',
    name: 'Javier Solís',
    email: 'javier.s@protonmail.com',
    type: 'Recepcionista',
    status: 'Inactivo',
  },
];

const employeeTypes: EmployeeType[] = [
  'Entrenador',
  'Recepcionista',
  'Limpieza',
];
const statusOptions: EmployeeStatus[] = ['Activo', 'Inactivo'];

const allFilters: ('Todos' | EmployeeStatus | EmployeeType)[] = [
  'Todos',
  'Activo',
  'Inactivo',
  ...employeeTypes,
];

// Subcomponente Modal de Edición de Estado
interface EditStatusModalProps {
  employee: Employee;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, newStatus: EmployeeStatus) => void;
}

const EditStatusModal: React.FC<EditStatusModalProps> = ({
  employee,
  isOpen,
  onClose,
  onSave,
}) => {
  const [newStatus, setNewStatus] = useState<EmployeeStatus>(employee.status);

  const handleSave = () => {
    onSave(employee.id, newStatus);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[350px] bg-background border-secondary/30 p-6">
        <DialogHeader className="flex justify-between items-center border-b border-secondary/30 pb-3">
          <DialogTitle className="text-xl font-bold text-headline">
            Cambiar Estado de {employee.name}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {/* Edición de Estado */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-sub-headline block">
              Estado
            </label>
            <Select
              value={newStatus}
              onValueChange={(value) => setNewStatus(value as EmployeeStatus)}
            >
              <SelectTrigger className="bg-card-background border-secondary/30 text-headline w-full">
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
            Guardar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Subcomponente Modal para Añadir Empleado
interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newEmployee: Omit<Employee, 'id' | 'status'>) => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState<EmployeeType | undefined>(undefined);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSave = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors[name] = 'El nombre es requerido.';
    if (!email.trim()) {
      newErrors[email] = 'El correo es requerido.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors[email] = 'El correo no es válido.';
    }
    if (!type) newErrors['type'] = 'Debes seleccionar un tipo de empleado.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSave({ name, email, type: type! });
      onClose();
      setName('');
      setEmail('');
      setType(undefined);
      setErrors({});
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] bg-background border-secondary/30 p-6">
        <DialogHeader className="flex justify-start items-center border-b border-secondary/30 pb-3">
          <DialogTitle className="text-xl font-bold text-headline flex items-center">
            Añadir Nuevo Empleado
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 grid gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-sub-headline">
              Nombre Completo
            </label>
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors[name]) setErrors((prev) => ({ ...prev, name: '' }));
              }}
              placeholder="Ej: Juan Pérez"
              className={cn(
                'bg-card-background border-secondary/30 text-headline',
                errors[name] && 'border-red-500'
              )}
            />
            {errors[name] && (
              <p className="text-xs text-red-500 mt-1">{errors[name]}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-sub-headline">
              Correo Electrónico
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors[email])
                  setErrors((prev) => ({ ...prev, email: '' }));
              }}
              placeholder="ejemplo@correo.com"
              className={cn(
                'bg-card-background border-secondary/30 text-headline',
                errors[email] && 'border-red-500'
              )}
            />
            {errors[email] && (
              <p className="text-xs text-red-500 mt-1">{errors[email]}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-sub-headline">
              Tipo de Empleado
            </label>
            <Select
              value={type || ''}
              onValueChange={(value) => {
                setType(value as EmployeeType);
                if (errors['type'])
                  setErrors((prev) => ({ ...prev, type: '' }));
              }}
            >
              <SelectTrigger
                className={cn(
                  'w-full bg-card-background border-secondary/30 text-headline',
                  errors['type'] && 'border-red-500'
                )}
              >
                <SelectValue placeholder="Selecciona un tipo" />
              </SelectTrigger>
              <SelectContent className="bg-card-background border-secondary/30 text-headline">
                {employeeTypes.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors['type'] && (
              <p className="text-xs text-red-500 mt-1">{errors['type']}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-secondary/30 space-x-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-transparent border-secondary/30 text-sub-headline hover:bg-card-background hover:text-headline cursor-pointer"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            className="bg-highlight hover:bg-highlight/70 text-headline cursor-pointer"
          >
            Guardar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Componente de Fila de Empleado
interface EmployeeTableRowProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onViewProfile: (employee: Employee) => void;
}

const EmployeeTableRow: React.FC<EmployeeTableRowProps> = ({
  employee,
  onEdit,
  onViewProfile,
}) => {
  const statusClass =
    employee.status === 'Activo'
      ? 'bg-green-600/30 text-green-300'
      : 'bg-red-600/30 text-red-300';

  const handleRowClick = () => {
    onViewProfile(employee);
  };

  return (
    <TableRow
      className="border-b border-secondary/30 hover:bg-background/20 transition-colors cursor-pointer"
      onClick={handleRowClick}
    >
      <TableCell className="py-4 px-4 font-medium text-sub-headline">
        {employee.name}
      </TableCell>
      <TableCell className="py-4 px-4 text-sub-headline">
        {employee.email}
      </TableCell>

      <TableCell className="py-4 px-4">
        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-indigo-600/30 text-indigo-300">
          {employee.type}
        </span>
      </TableCell>

      <TableCell className="py-4 px-4">
        <span
          className={cn(
            'inline-block px-3 py-1 text-xs font-semibold rounded-full',
            statusClass
          )}
        >
          {employee.status}
        </span>
      </TableCell>

      <TableCell className="py-4 px-4 w-[100px] pointer-events-auto">
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(employee);
          }}
          title="Modificar Estado"
          className="hover:bg-background/30 cursor-pointer"
        >
          <Pencil className="w-5 h-5 text-highlight hover:text-headline" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

// Componente Principal
export const EmployeesPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<
    'Todos' | EmployeeStatus | EmployeeType
  >('Todos');
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();

  // Logica de actualización simulada
  const handleStatusChange = (id: string, newStatus: EmployeeStatus) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === id ? { ...emp, status: newStatus } : emp
      )
    );
  };

  // Lógica para añadir un nuevo empleado
  const handleAddEmployee = (
    newEmployeeData: Omit<Employee, 'id' | 'status'>
  ) => {
    const newEmployee: Employee = {
      id: `e${Date.now()}`,
      ...newEmployeeData,
      status: 'Activo',
    };
    setEmployees((prev) => [newEmployee, ...prev]);
    console.log('Nuevo empleado añadido:', newEmployee);
  };

  // Lógica de navegación al perfil
  const handleViewProfile = (employee: Employee) => {
    navigate(`/admin/users/${employee.id}/profile`);
  };

  // Filtrado de la lista
  const filteredEmployees = useMemo(() => {
    let list = employees;

    if (searchTerm) {
      list = list.filter(
        (emp) =>
          emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (activeFilter !== 'Todos') {
      list = list.filter(
        (emp) => emp.status === activeFilter || emp.type === activeFilter
      );
    }

    return list;
  }, [employees, searchTerm, activeFilter]);

  return (
    <div className="min-h-screen p-2 lg:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-headline">
          Personal del Gimnasio
        </h1>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-highlight hover:bg-highlight/70 text-headline cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-2" /> Añadir Empleado
        </Button>
      </div>

      {/* Búsqueda y Filtros */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-secondary/30 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Buscar empleado por nombre o correo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-6 pl-10 bg-card-background border-secondary/30 text-headline placeholder-sub-headline"
          />
        </div>

        {/* Botones de Filtro */}
        <div className="flex space-x-4 border-b border-secondary/30">
          {allFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                'py-2 px-1 text-sm font-medium transition-colors relative',
                activeFilter === filter
                  ? 'text-indigo-400'
                  : 'text-sub-headline hover:text-headline cursor-pointer'
              )}
            >
              {filter}
              {activeFilter === filter && (
                <span className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-highlight rounded-t-sm" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla de Empleados */}
      <Card className="bg-card-background border-sm border-secondary/30 shadow-xl p-4 overflow-x-auto">
        <Table>
          <TableHeader className="bg-card-background">
            <TableRow className="border-b border-secondary/30 hover:bg-card-background">
              <TableHead className="py-3 px-4 text-sm font-medium text-headline">
                Nombre
              </TableHead>
              <TableHead className="py-3 px-4 text-sm font-medium text-headline">
                Correo Electrónico
              </TableHead>
              <TableHead className="py-3 px-4 text-sm font-medium text-headline">
                Tipo de Empleado
              </TableHead>
              <TableHead className="py-3 px-4 text-sm font-medium text-headline">
                Estado
              </TableHead>
              <TableHead className="py-3 px-4 text-sm font-medium text-headline">
                Acción
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <EmployeeTableRow
                key={employee.id}
                employee={employee}
                onEdit={setEditingEmployee}
                onViewProfile={handleViewProfile}
              />
            ))}
          </TableBody>
        </Table>
        {filteredEmployees.length === 0 && (
          <div className="text-center py-10 text-sub-headline">
            No se encontraron empleados que coincidan con los filtros.
          </div>
        )}
      </Card>

      {/* Modal de Edición de Estado */}
      {editingEmployee && (
        <EditStatusModal
          employee={editingEmployee}
          isOpen={!!editingEmployee}
          onClose={() => setEditingEmployee(null)}
          onSave={handleStatusChange}
        />
      )}

      {/* Modal para Añadir Empleado */}
      <AddEmployeeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddEmployee}
      />
    </div>
  );
};
