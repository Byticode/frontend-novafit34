import React, { useState, useMemo } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { AddMemberModal } from '../../components/admin/members/AddMemberModal';
import { EditMemberModal } from '../../components/admin/members/EditMemberModal';
import { MembersTable } from '../../components/admin/members/MembersTable';
import { DUMMY_MEMBERS } from '../../types/member';
import type {
  Member,
  NewMemberData,
  MemberPlan,
  MemberStatus,
} from '../../types/member';

type FilterOption = 'Todos' | MemberPlan | MemberStatus;

const FILTER_OPTIONS: FilterOption[] = [
  'Todos',
  'Activo',
  'Inactivo',
  'Básico',
  'Premium',
];

export const MembersPage: React.FC = () => {
  const [members, setMembers] = useState<Member[]>(DUMMY_MEMBERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterOption>('Todos');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // --- HANDLERS DE MODALES ---

  const handleAddMember = (newMemberData: NewMemberData) => {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const newMember: Member = {
      ...newMemberData,
      id: String(Date.now()), // ID único
      fechaInicio: today,
      estado: 'Activo',
    };
    setMembers((prev) => [...prev, newMember]);
  };

  const handleOpenEditMember = (member: Member) => {
    setSelectedMember(member);
    setIsEditModalOpen(true);
  };

  const handleEditMember = (
    memberId: string,
    newPlan: MemberPlan,
    newStatus: MemberStatus
  ) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === memberId
          ? { ...member, plan: newPlan, estado: newStatus }
          : member
      )
    );
  };

  const filteredAndSearchedMembers = useMemo(() => {
    let tempMembers = members;

    if (filter !== 'Todos') {
      tempMembers = tempMembers.filter(
        (member) => member.plan === filter || member.estado === filter
      );
    }

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      tempMembers = tempMembers.filter(
        (member) =>
          member.nombre.toLowerCase().includes(lowerCaseSearchTerm) ||
          member.correo.toLowerCase().includes(lowerCaseSearchTerm) ||
          member.plan.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    return tempMembers;
  }, [members, filter, searchTerm]);

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 lg:mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-headline mb-4 md:mb-0">
          Miembros
        </h1>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-highlight hover:bg-highlight/70 text-headline flex items-center shadow-lg cursor-pointer"
        >
          <Plus className="w-5 h-5 mr-2" /> Añadir Miembro
        </Button>
      </div>

      <div className="relative mb-6">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary"
          size={20}
        />
        <Input
          type="text"
          placeholder="Buscar miembros por nombre o correo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-6 pl-10 rounded-lg bg-card-background text-headline placeholder-secondary border-sm border-secondary/20 focus:outline-none focus:ring-2 focus:ring-highlight shadow-md"
        />
      </div>

      <div className="flex border-b border-secondary/40 mb-6 overflow-x-auto whitespace-nowrap">
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
            {option}
          </button>
        ))}
      </div>

      <MembersTable
        filteredMembers={filteredAndSearchedMembers}
        onEditMember={handleOpenEditMember}
      />

      {/* MODALES */}
      <AddMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddMember}
      />
      <EditMemberModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        member={selectedMember}
        onSave={handleEditMember}
      />
    </div>
  );
};
