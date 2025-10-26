import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import type { ClassIncomeData } from '../../../types/reports';
import { cn } from '../../../lib/utils';

interface IncomeByClassCardProps {
  totalIncome: number;
  percentageChange: number;
  data: ClassIncomeData[];
}

export const IncomeByClassCard: React.FC<IncomeByClassCardProps> = ({
  totalIncome,
  percentageChange,
  data,
}) => {
  const isPositive = percentageChange >= 0;

  return (
    <Card className="bg-bg-primary border border-gray-800 shadow-xl">
      <CardHeader className="p-6 pb-2">
        <CardTitle className="text-xl font-bold text-white mb-2">
          Ingresos por Clase
        </CardTitle>
        <div className="flex items-center space-x-2">
          <span className="text-4xl font-extrabold text-white">
            ${totalIncome.toLocaleString()}
          </span>
          <span
            className={cn(
              'text-sm font-semibold',
              isPositive ? 'text-green-500' : 'text-red-500'
            )}
          >
            {isPositive ? '+' : ''}
            {percentageChange}% Este Mes
          </span>
        </div>
      </CardHeader>
      <CardContent className="h-[250px] p-6 pt-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              type="number"
              stroke="#4B5563"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              stroke="#4B5563"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={80}
            />
            <Tooltip
              cursor={{ fill: '#374151', opacity: 0.6 }}
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '4px',
                color: '#E5E7EB',
              }}
              labelStyle={{ color: '#9CA3AF' }}
              formatter={(value: number) => [
                `$${value.toLocaleString()}`,
                'Ingreso',
              ]}
            />
            <Bar dataKey="income" fill="#008cff80" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
