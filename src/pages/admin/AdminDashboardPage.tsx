import React from 'react';
import { UserPlus, CalendarCheck, DollarSign } from 'lucide-react';
import { DashboardCard } from '../../components/admin/dashboard/DashboardCard';
import { ActivityItem } from '../../components/admin/dashboard/ActivityItem';
import { PerformanceOverview } from '../../components/admin/dashboard/PerformanceOverview';
import { TasksSummary } from '../../components/admin/dashboard/TasksSummary';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Card } from '../../components/ui/card';
// import { title } from 'process';

// Componente de Actividad Reciente
const ActivityList: React.FC = () => (
  <div className="bg-primary border-none mb-12">
    <h2 className="text-2xl font-bold text-white mb-6">Actividad reciente</h2>
    <div className="flex flex-col gap-4">
      <ActivityItem
        icon={UserPlus}
        title="Nuevo miembro registrado"
        description="Emmanuel C. se unió a Novafit34"
      />
      <ActivityItem
        icon={CalendarCheck}
        title="Clase de yoga reservada"
        description="Dua Lipa reservó la clase de yoga"
      />
      <ActivityItem
        icon={DollarSign}
        title="Pago recibido"
        description="Se recibió un pago de $100"
      />
    </div>
  </div>
);

// Componente de Próximas Clases
const UpcomingClasses: React.FC = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-white mb-4 pb-0">Próximas clases</h2>
    <Card className="bg-card border border-gray-800 shadow-md p-6">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700 bg-card hover:bg-card">
              <TableHead className="py-3 px-2 text-sm font-medium text-gray-400">
                Clase
              </TableHead>
              <TableHead className="py-3 px-2 text-sm font-medium text-gray-400">
                Instructor
              </TableHead>
              <TableHead className="py-3 px-2 text-sm font-medium text-gray-400">
                Hora
              </TableHead>
              <TableHead className="py-3 px-2 text-sm font-medium text-gray-400">
                Miembros inscritos
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-b border-gray-800 hover:bg-gray-700/30 transition-colors">
              <TableCell className="py-4 px-2 font-medium text-white">
                Yoga
              </TableCell>
              <TableCell className="py-4 px-2 text-gray-300">
                Emily S.
              </TableCell>
              <TableCell className="py-4 px-2 text-gray-300">8:00 AM</TableCell>
              <TableCell className="py-4 px-2 text-gray-300">
                <div className="flex justify-center lg:justify-start items-center">
                  <span>15</span>
                  <div className="ml-3 w-20 h-2 bg-gray-700 rounded-full hidden lg:block">
                    <div
                      className="bg-indigo-500 h-full rounded-full"
                      style={{ width: '75%' }}
                    ></div>
                  </div>
                </div>
              </TableCell>
            </TableRow>
            <TableRow className="border-b border-gray-800 hover:bg-gray-700/30 transition-colors">
              <TableCell className="py-4 px-2 font-medium text-white">
                Spin
              </TableCell>
              <TableCell className="py-4 px-2 text-gray-300">Mark T.</TableCell>
              <TableCell className="py-4 px-2 text-gray-300">9:00 AM</TableCell>
              <TableCell className="py-4 px-2 text-gray-300">
                <div className="flex justify-center lg:justify-start items-center">
                  <span>18</span>
                  <div className="ml-3 w-20 h-2 bg-gray-700 rounded-full hidden lg:block">
                    <div
                      className="bg-indigo-500 h-full rounded-full"
                      style={{ width: '90%' }}
                    ></div>
                  </div>
                </div>
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-gray-700/30 transition-colors">
              <TableCell className="py-4 px-2 font-medium text-white">
                Pilates
              </TableCell>
              <TableCell className="py-4 px-2 text-gray-300">
                Laura K.
              </TableCell>
              <TableCell className="py-4 px-2 text-gray-300">
                10:00 AM
              </TableCell>
              <TableCell className="py-4 px-2 text-gray-300">
                <div className="flex justify-center lg:justify-start items-center">
                  <span>12</span>
                  <div className="ml-3 w-20 h-2 bg-gray-700 rounded-full hidden lg:block">
                    <div
                      className="bg-indigo-500 h-full rounded-full"
                      style={{ width: '60%' }}
                    ></div>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Card>
  </div>
);

export const AdminDashboardPage: React.FC = () => {
  // Datos simulados para las tarjetas
  const dashboardData = {
    activeMembers: 250,
    activeMembersPercent: 10,
    recentRevenue: 5500,
    recentRevenuePercent: 8,
    classesToday: 15,
    classesTodayPercent: 5,
    pendingTasks: 8,
    pendingTasksPercent: -2,
  };

  return (
    <div className="min-h-screen p-4 lg:p-8 space-y-8">
      <h1 className="text-3xl lg:text-4xl font-bold text-white">Dashboard</h1>

      {/* Tarjetas de Visión General (Overview Cards con porcentaje) */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-14">
        <DashboardCard
          title="Miembros activos"
          value={dashboardData.activeMembers.toString()}
          percentage={dashboardData.activeMembersPercent}
        />
        <DashboardCard
          title="Clases Hoy"
          value={dashboardData.classesToday.toString()}
          percentage={dashboardData.classesTodayPercent}
        />
        <DashboardCard
          title="Ingresos Recientes"
          value={`$${dashboardData.recentRevenue.toLocaleString()}`}
          percentage={dashboardData.recentRevenuePercent}
        />
        <DashboardCard
          title="Tareas pendientes"
          value={dashboardData.pendingTasks.toString()}
          percentage={dashboardData.pendingTasksPercent}
        />
      </div>

      {/* Resumen de Rendimiento  */}
      <PerformanceOverview />

      <div className="grid grid-cols-1 gap-8">
        {/* Actividad Reciente (Columna 1) */}
        <div className="lg:col-span-1">
          <ActivityList />
        </div>

        <div className="lg:col-span-2 space-y-8">
          {/* Resumen de Tareas (Tasks Summary) */}
          <TasksSummary />

          {/* Próximas Clases */}
          <UpcomingClasses />
        </div>
      </div>
    </div>
  );
};
