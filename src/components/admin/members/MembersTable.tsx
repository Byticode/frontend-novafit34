import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import { Button } from '../../ui/button';
import { ChevronDown, ChevronUp, Pencil } from 'lucide-react';
import type {
  Member,
  MemberPlan,
  MemberStatus,
} from '../../../types/member.ts';
import { cn } from '../../../lib/utils';

interface MembersTableProps {
  filteredMembers: Member[];
  onEditMember: (member: Member) => void;
}

// Componente auxiliar para estilizar las etiquetas
const MemberTag: React.FC<{
  type: 'plan' | 'status';
  value: MemberPlan | MemberStatus;
}> = ({ type, value }) => {
  let bgColor = 'bg-gray-800';
  let textColor = 'text-gray-300';

  if (type === 'plan') {
    if (value === 'Premium') {
      bgColor = 'bg-yellow-900/40';
      textColor = 'text-yellow-300';
    } else {
      // Básico
      bgColor = 'bg-indigo-900/40';
      textColor = 'text-indigo-300';
    }
  } else if (type === 'status') {
    if (value === 'Activo') {
      bgColor = 'bg-green-900/30';
      textColor = 'text-green-300';
    } else {
      // Inactivo
      bgColor = 'bg-red-900/30';
      textColor = 'text-red-300';
    }
  }

  return (
    <span
      className={cn(
        'px-3 py-1 rounded-full text-xs font-semibold w-fit',
        bgColor,
        textColor
      )}
    >
      {value}
    </span>
  );
};

export const MembersTable: React.FC<MembersTableProps> = ({
  filteredMembers,
  onEditMember,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleViewProfile = (member: Member) => {
    navigate(`/admin/members/${member.id}`, { state: { member } });
  };

  // --- VISTA DESKTOP ---
  const DesktopTable = (
    <div className="overflow-x-auto hidden lg:block bg-card-background rounded-lg shadow-xl border-sm border-secondary/20 px-6 py-4">
      <Table className="min-w-full text-left">
        <TableHeader>
          <TableRow className="border-secondary/30 bg-card-background hover:bg-card-background">
            <TableHead className="text-sm font-medium text-headline">
              Nombre
            </TableHead>
            <TableHead className="text-sm font-medium text-headline">
              Correo Electrónico
            </TableHead>
            <TableHead className="text-sm font-medium text-headline">
              Suscripción
            </TableHead>
            <TableHead className="text-sm font-medium text-headline">
              Fecha de Inicio
            </TableHead>
            <TableHead className="text-sm font-medium text-headline">
              Estado
            </TableHead>
            <TableHead className="text-sm font-medium text-headline">
              Acción
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMembers.map((member) => (
            <TableRow
              key={member.id}
              className="border-secondary/20 hover:bg-background/20 transition-colors cursor-pointer"
              onClick={() => handleViewProfile(member)}
            >
              <TableCell className="py-4 px-2 font-medium text-sub-headline">
                {member.nombre}
              </TableCell>
              <TableCell className="py-4 px-2 text-sub-headline">
                {member.correo}
              </TableCell>
              <TableCell className="py-4 px-2">
                <MemberTag type="plan" value={member.plan} />
              </TableCell>
              <TableCell className="py-4 px-2 text-sub-headline">
                {member.fechaInicio}
              </TableCell>
              <TableCell className="py-4 px-2">
                <MemberTag type="status" value={member.estado} />
              </TableCell>
              <TableCell
                className="py-4 px-2"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEditMember(member)}
                  className="text-highlight hover:text-headline hover:bg-secondary/20 cursor-pointer"
                  title="Editar miembro"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  // --- VISTA MOBILE (responsive) ---
  const MobileList = (
    <div className="lg:hidden space-y-4">
      {filteredMembers.map((item) => (
        <div
          key={item.id}
          className="bg-card-background p-4 rounded-lg shadow-md border-sm border-secondary/20"
        >
          <div
            className="flex justify-between items-center"
            onClick={() => toggleExpand(item.id)}
          >
            <div className="flex flex-col space-y-1">
              <span className="font-medium text-headline">{item.nombre}</span>
              <div className="flex space-x-2">
                <MemberTag type="status" value={item.estado} />
                <MemberTag type="plan" value={item.plan} />
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-700/30"
            >
              {expandedId === item.id ? (
                <ChevronUp className="h-5 w-5 text-secondary" />
              ) : (
                <ChevronDown className="h-5 w-5 text-secondary" />
              )}
            </Button>
          </div>

          {expandedId === item.id && (
            <div className="mt-4 border-t border-secondary/30 pt-4 text-sm text-sub-headline space-y-2">
              <p>
                <strong>Correo:</strong> {item.correo}
              </p>
              <p>
                <strong>Inicio:</strong> {item.fechaInicio}
              </p>
              <div className="mt-3 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEditMember(item)}
                  className="bg-transparent text-indigo-400 border-indigo-400/50 hover:bg-indigo-900/30"
                >
                  <Pencil className="w-4 h-4 mr-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <>
      {DesktopTable}
      {MobileList}
    </>
  );
};
