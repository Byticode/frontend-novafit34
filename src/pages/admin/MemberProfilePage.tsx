import React, { useState, useMemo } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Edit } from 'lucide-react';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
// import { Badge } from '../../components/ui/badge';
import { EditMemberInfoModal } from '../../components/admin/members/EditMemberInfoModal';
import { DUMMY_MEMBERS } from '../../types/member.ts';
import type { Member, MemberPlan, MemberStatus } from '../../types/member';
// import type {  MembershipHistory, PaymentRecord, ClassAttendance } from '../../types/dummy_data';
import {
  DUMMY_MEMBERSHIPS,
  DUMMY_PAYMENT_HISTORY,
  DUMMY_ATTENDANCE,
  DUMMY_NOTES,
} from '../../types/dummy_data';

const StatusTag: React.FC<{
  status: MemberStatus | MemberPlan | 'Completado' | 'Fallido' | 'Pendiente';
  type: 'status' | 'plan';
}> = ({ status, type }) => {
  let bgColor = 'bg-gray-800';
  let textColor = 'text-gray-300';

  if (type === 'plan') {
    if (status === 'Premium') {
      bgColor = 'bg-yellow-900/40';
      textColor = 'text-yellow-300';
    } else if (status === 'Básico') {
      bgColor = 'bg-indigo-900/40';
      textColor = 'text-indigo-300';
    }
  } else {
    if (status === 'Activo' || status === 'Completado') {
      bgColor = 'bg-green-900/40';
      textColor = 'text-green-300';
    } else if (status === 'Pendiente') {
      bgColor = 'bg-blue-900/40';
      textColor = 'text-blue-300';
    } else {
      bgColor = 'bg-red-900/40';
      textColor = 'text-red-300';
    }
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold w-fit ${bgColor} ${textColor}`}
    >
      {status}
    </span>
  );
};

export const MemberProfilePage: React.FC = () => {
  const navigate = useNavigate();
  // Obtener el ID del miembro de la URL. Usamos un ID simulado si no hay uno.
  const { memberId } = useParams<{ memberId: string }>();
  const location = useLocation();

  const [members, setMembers] = useState<Member[]>(() => {
    return DUMMY_MEMBERS;
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const member = useMemo(() => {
    // Prioriza el miembro pasado en el estado de la navegación
    if (location.state?.member) {
      return location.state.member as Member;
    }
    // Si se accede a la URL directamente, busca en la lista
    return members.find((m) => m.id === memberId);
  }, [memberId, location.state, members]);

  if (!member) {
    console.error(
      `Error: Miembro con ID "${memberId}" no encontrado en DUMMY_MEMBERS.`
    );
    return (
      <div className="p-8 text-white h-screen">
        <Button
          variant="link"
          onClick={() => navigate('/admin/members')}
          className="mb-6 text-indigo-400 p-0 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Volver a Miembros
        </Button>
        <h1 className="text-3xl font-bold">Miembro no encontrado.</h1>
        <p className="text-gray-400 mt-2">
          El ID <span className="text-red-400 font-mono">{memberId}</span> no
          corresponde a ningún miembro registrado. Revisa tus IDs simulados.
        </p>
      </div>
    );
  }

  // Handler para la edición de Plan y Estado
  const handleEditMemberInfo = (
    memberId: string,
    currentPlan: MemberPlan,
    currentStatus: MemberStatus
  ) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === memberId
          ? { ...member, plan: currentPlan, estado: currentStatus }
          : member
      )
    );
    // setIsEditModalOpen(false);
  };

  // Datos fijos de ejemplo
  const currentMemberships = DUMMY_MEMBERSHIPS;
  const paymentHistory = DUMMY_PAYMENT_HISTORY;
  const attendanceHistory = DUMMY_ATTENDANCE;
  const notes = DUMMY_NOTES;

  // Icono para el perfil
  const Avatar = () => (
    <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-4xl font-bold text-white overflow-hidden">
      {/* Para usar el primer caracter del nombre como avatar */}
      {member.nombre.charAt(0)}
    </div>
  );

  return (
    <div className="min-h-screen bg-bg-primary p-4 lg:p-8 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="link"
          onClick={() => navigate('/admin/members')}
          className="text-indigo-400 hover:text-indigo-300 p-0 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Volver a Miembros
        </Button>
      </div>

      <h1 className="text-3xl lg:text-4xl font-bold text-white">
        Perfil del Miembro
      </h1>
      <p className="text-gray-400">
        Gestiona la información del miembro y su membresía.
      </p>

      <Card className="bg-bg-primary border-none mt-8">
        <CardContent className="p-0 flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
          <Avatar />

          <div className="flex-1 space-y-1">
            <h2 className="text-3xl font-extrabold text-white">
              {member.nombre}
            </h2>
            <p className="text-sm text-gray-400">ID: {member.id}</p>
            <p className="text-sm text-gray-400">
              Miembro desde: {member.fechaInicio}
            </p>
            <div className="flex space-x-2 mt-2">
              <StatusTag status={member.estado} type="status" />
              <StatusTag status={member.plan} type="plan" />
            </div>
          </div>

          <div className="md:self-start">
            <Button
              onClick={() => setIsEditModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center shadow-lg cursor-pointer"
            >
              <Edit className="w-4 h-4 mr-2" /> Editar Membresía
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-8">
        {/* COLUMNA 1: INFORMACIÓN PERSONAL */}
        <div className="space-y-6 mb-8">
          <Card className="bg-bg-primary border-none p-0">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white border-b border-gray-700 pb-3">
                Información Personal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>Correo: {member.correo}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-indigo-400" />
                <span>Teléfono: {member.telefono}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span>Dirección: {member.direccion}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* COLUMNA 2/3: MEMBRESÍAS  */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card border border-gray-800 shadow-md p-6">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white border-b border-gray-700 pb-3">
                Historial de Membresías
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700 bg-[var(--blue-primary)] hover:bg-[var(--blue-primary)]">
                    <TableHead className="text-sm font-medium text-gray-400">
                      Tipo
                    </TableHead>
                    <TableHead className="text-sm font-medium text-gray-400">
                      Estado
                    </TableHead>
                    <TableHead className="text-sm font-medium text-gray-400">
                      Fecha de Inicio
                    </TableHead>
                    <TableHead className="text-sm font-medium text-gray-400">
                      Fecha de Fin
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentMemberships.map((m, index) => (
                    <TableRow
                      key={index}
                      className="border-gray-800 hover:bg-gray-700/30 transition-colors"
                    >
                      <TableCell className="font-medium text-white">
                        {m.type}
                      </TableCell>
                      <TableCell>
                        <StatusTag status={m.estado} type="status" />
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {m.fechaInicio}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {m.fechaFin}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* TABLAS HISTORIAL DE PAGOS Y ASISTENCIA */}
      <div className="space-y-8">
        {/* HISTORIAL DE PAGOS */}
        <Card className="bg-card border border-gray-800 shadow-md p-6">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white border-b border-gray-700 pb-3">
              Historial de Pagos
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 bg-[var(--blue-primary)] hover:bg-[var(--blue-primary)]">
                  <TableHead className="text-sm font-medium text-gray-400">
                    Fecha
                  </TableHead>
                  <TableHead className="text-sm font-medium text-gray-400">
                    Monto
                  </TableHead>
                  <TableHead className="text-sm font-medium text-gray-400">
                    Método
                  </TableHead>
                  <TableHead className="text-sm font-medium text-gray-400">
                    Estado
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentHistory.map((p, index) => (
                  <TableRow
                    key={index}
                    className="border-gray-800 hover:bg-gray-700/30 transition-colors"
                  >
                    <TableCell className="text-gray-300">{p.fecha}</TableCell>
                    <TableCell className="text-green-400 font-semibold">
                      ${p.monto.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-gray-300">{p.metodo}</TableCell>
                    <TableCell>
                      <StatusTag status={p.estado} type="status" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* ASISTENCIA A CLASES */}
        <Card className="bg-card border border-gray-800 shadow-md p-6">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white border-b border-gray-700 pb-3">
              Asistencia a Clases
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 bg-[var(--blue-primary)] hover:bg-[var(--blue-primary)]">
                  <TableHead className="text-sm font-medium text-gray-400">
                    Clase
                  </TableHead>
                  <TableHead className="text-sm font-medium text-gray-400">
                    Fecha
                  </TableHead>
                  <TableHead className="text-sm font-medium text-gray-400">
                    Hora
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceHistory.map((a, index) => (
                  <TableRow
                    key={index}
                    className="border-gray-800 hover:bg-gray-700/30 transition-colors"
                  >
                    <TableCell className="font-medium text-white">
                      {a.clase}
                    </TableCell>
                    <TableCell className="text-gray-300">{a.fecha}</TableCell>
                    <TableCell className="text-gray-300">{a.hora}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* NOTAS */}
        <Card className="bg-card border border-gray-800 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white border-b border-gray-700 pb-3">
              Notas Adicionales
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 text-sm">
            <p>{notes.note}</p>
          </CardContent>
        </Card>
      </div>

      {/* MODAL DE EDICIÓN */}
      <EditMemberInfoModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        member={member}
        onSave={handleEditMemberInfo}
      />
    </div>
  );
};
