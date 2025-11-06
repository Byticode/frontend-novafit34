import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { GrowthData } from '../../../types/dashboard';
import {
  DUMMY_MEMBERSHIP_GROWTH,
  DUMMY_ATTENDANCE_DATA,
} from '../../../types/dashboard';
import { cn } from '../../../lib/utils';

interface PerformanceChartProps {
  title: string;
  value: string;
  change: number;
  data: GrowthData[];
  chartType: 'line' | 'bar';
  color: string;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({
  title,
  value,
  change,
  data,
  chartType,
  // color,
}) => {
  const isPositive = change >= 0;

  return (
    <Card className="bg-card-background border-sm border-secondary/30">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg font-semibold text-headline">
          {title}
        </CardTitle>
        <div className="flex flex-col">
          <span className="text-3xl font-extrabold text-headline">{value}</span>
          <span className="text-sm text-sub-headline">
            Últimos 3 Meses{' '}
            <span
              className={cn(
                'font-bold',
                isPositive ? 'text-tertiary' : 'text-red-400'
              )}
            >
              {isPositive ? '+' : ''}
              {change}%
            </span>
          </span>
        </div>
      </CardHeader>
      <CardContent className="h-[150px] p-4 pt-0">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            >
              <XAxis
                dataKey="name"
                stroke="#4B5563"
                tick={{ fill: '#94a1b2', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#16161a',
                  border: 'none',
                  borderRadius: '4px',
                  color: '#E5E7EB',
                }}
                labelStyle={{ color: '#9CA3AF' }}
                formatter={(val: number) => [`${val}%`, 'Crecimiento']}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={'#6246ea'}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          ) : (
            <BarChart
              data={data}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            >
              <XAxis
                dataKey="name"
                stroke="#4B5563"
                tick={{ fill: '#94a1b2', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: '#374151', opacity: 0.6 }}
                contentStyle={{
                  backgroundColor: '#16161a',
                  border: 'none',
                  borderRadius: '4px',
                  color: '#E5E7EB',
                }}
                labelStyle={{ color: '#94a1b2' }}
                formatter={(val: number) => [`${val}%`, 'Asistencia']}
              />
              <Bar dataKey="value" fill={'#6246ea'} radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// Componente principal del resumen de rendimiento
export const PerformanceOverview: React.FC = () => {
  return (
    <div className="space-y-4 mb-12">
      <h2 className="text-2xl font-bold text-headline">
        Resumen de Rendimiento
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart
          title="Crecimiento de Membresía"
          value="+15%"
          change={15}
          data={DUMMY_MEMBERSHIP_GROWTH}
          chartType="line"
          color="#6366F1" // Indigo
        />
        <PerformanceChart
          title="Asistencia a Clases"
          value="+12%"
          change={12}
          data={DUMMY_ATTENDANCE_DATA}
          chartType="bar"
          color="#4F46E5" // Indigo oscuro
        />
      </div>
    </div>
  );
};
