import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { cn } from '../../../lib/utils';
import { Users, DollarSign, BarChart, Clock } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string;
  percentage?: number;
  icon?: React.ElementType;
}

const getIcon = (title: string) => {
  switch (title) {
    case 'Miembros activos':
      return Users;
    case 'Ingresos Recientes':
      return DollarSign;
    case 'Clases Hoy':
      return BarChart;
    case 'Tareas pendientes':
      return Clock;
    default:
      return Users;
  }
};

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  percentage,
}) => {
  const Icon = getIcon(title);
  const isPositive = percentage && percentage >= 0;

  return (
    <Card className="bg-card border border-gray-800 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
        <CardTitle className="text-sm font-medium text-gray-400">
          {title}
        </CardTitle>
        <Icon className="w-5 h-5 text-indigo-400" />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="text-2xl font-bold text-white">{value}</div>
        {percentage !== undefined && (
          <p className="text-xs text-gray-400 pt-1">
            <span
              className={cn(
                isPositive ? 'text-green-500' : 'text-red-500',
                'font-bold'
              )}
            >
              {isPositive ? '+' : ''}
              {percentage}%
            </span>{' '}
            este mes
          </p>
        )}
      </CardContent>
    </Card>
  );
};
