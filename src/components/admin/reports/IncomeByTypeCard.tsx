import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import type {
  MonthlyIncomeByCategoryData,
  IncomeCategory,
} from '../../../types/reports';
import { cn } from '../../../lib/utils';

interface IncomeByTypeCardProps {
  totalIncome: number;
  percentageChange: number;
  data: MonthlyIncomeByCategoryData[];
}

// Colores para cada categoría de ingreso
const categoryColors: Record<IncomeCategory, string> = {
  Membresías: '#8884d8', // Morado
  Clases: '#82ca9d', // Verde
  Productos: '#ffc658', // Amarillo
  Otros: '#ff7300', // Naranja
};

export const IncomeByTypeCard: React.FC<IncomeByTypeCardProps> = ({
  totalIncome,
  percentageChange,
  data,
}) => {
  const isPositive = percentageChange >= 0;

  const categories: IncomeCategory[] = Object.keys(
    categoryColors
  ) as IncomeCategory[];

  return (
    <Card className="bg-card-background border-sm border-secondary/30 shadow-xl">
      <CardHeader className="p-6 pb-2">
        <CardTitle className="text-xl font-bold text-headline mb-2">
          Ingresos por Tipo
        </CardTitle>
        <div className="flex items-center space-x-2">
          <span className="text-4xl font-extrabold text-headline">
            ${totalIncome.toLocaleString()}
          </span>
          <span
            className={cn(
              'text-sm font-semibold',
              isPositive ? 'text-tertiary' : 'text-red-400'
            )}
          >
            {isPositive ? '+' : ''}
            {percentageChange}% Este Mes
          </span>
        </div>
      </CardHeader>
      <CardContent className="h-[250px] p-6 pt-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          >
            <XAxis
              dataKey="name"
              stroke="#4B5563"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <YAxis
              stroke="#4B5563"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
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
              formatter={(value: number, name: string) => [
                `$${value.toLocaleString()}`,
                name,
              ]}
            />
            <Legend
              wrapperStyle={{
                fontSize: 12,
                color: '#9CA3AF',
                paddingTop: '10px',
              }}
            />
            {categories.map((category) => (
              <Area
                key={category}
                type="monotone"
                dataKey={category}
                stackId="1" // Para apilar las áreas
                stroke={categoryColors[category]}
                fill={categoryColors[category]}
                fillOpacity={0.6}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
