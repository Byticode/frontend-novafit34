import React from 'react';
import { UserPlus, CalendarCheck, DollarSign } from 'lucide-react';
import { DashboardCard } from '../../components/admin/dashboard/DashboardCard.tsx';
import { ActivityItem } from '../../components/admin/dashboard/ActivityItem.tsx';

export const AdminDashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen p-2 lg:p-8">
      {/* En mobile, el título está en el header del AdminLayout */}
      <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6 lg:mb-8 hidden lg:block">
        Dashboard
      </h1>

      {/* Grid de Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard title="Miembros activos" value="250" />
        <DashboardCard title="Ingresos totales" value="$15,000" />
        <DashboardCard title="Clases reservadas" value="120" />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Sección de Actividad Reciente */}
        <div className="p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-white mb-8">
            Actividad reciente
          </h2>
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

        {/* Sección de Próximas Clases */}
        <div className="bg-blue-primary/60 p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-white mb-6">
            Próximas clases
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-2 text-sm font-medium text-gray-400">
                    Clase
                  </th>
                  <th className="py-3 px-2 text-sm font-medium text-gray-400">
                    Instructor
                  </th>
                  <th className="py-3 px-2 text-sm font-medium text-gray-400">
                    Hora
                  </th>
                  <th className="py-3 px-2 text-sm font-medium text-gray-400">
                    Miembros inscritos
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Fila 1 */}
                <tr className="border-b border-gray-800 hover:bg-gray-700/30 transition-colors">
                  <td className="py-4 px-2 font-medium text-white">Yoga</td>
                  <td className="py-4 px-2 text-gray-300">Emily S.</td>
                  <td className="py-4 px-2 text-gray-300">8:00 AM</td>
                  <td className="py-4 px-2 text-gray-300">
                    <div className="flex justify-center lg:justify-start items-center">
                      <span>15</span>
                      <div className="ml-3 w-20 h-2 bg-gray-700 rounded-full hidden lg:block">
                        <div
                          className="bg-indigo-500 h-full rounded-full"
                          style={{ width: '75%' }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
                {/* Fila 2 */}
                <tr className="border-b border-gray-800 hover:bg-gray-700/30 transition-colors">
                  <td className="py-4 px-2 font-medium text-white">Spin</td>
                  <td className="py-4 px-2 text-gray-300">Mark T.</td>
                  <td className="py-4 px-2 text-gray-300">9:00 AM</td>
                  <td className="py-4 px-2 text-gray-300">
                    <div className="flex justify-center lg:justify-start items-center">
                      <span>18</span>
                      <div className="ml-3 w-20 h-2 bg-gray-700 rounded-full hidden lg:block">
                        <div
                          className="bg-indigo-500 h-full rounded-full"
                          style={{ width: '90%' }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
                {/* Fila 3 */}
                <tr className="hover:bg-gray-700/30 transition-colors">
                  <td className="py-4 px-2 font-medium text-white">Pilates</td>
                  <td className="py-4 px-2 text-gray-300">Laura K.</td>
                  <td className="py-4 px-2 text-gray-300">10:00 AM</td>
                  <td className="py-4 px-2 text-gray-300">
                    <div className="flex justify-center lg:justify-start items-center">
                      <span>12</span>
                      <div className="ml-3 w-20 h-2 bg-gray-700 rounded-full hidden lg:block">
                        <div
                          className="bg-indigo-500 h-full rounded-full"
                          style={{ width: '60%' }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
