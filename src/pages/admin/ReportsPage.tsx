import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
// import { Card } from '../../components/ui/card';
import { IncomeOverviewCard } from '../../components/admin/reports/IncomeOverviewCard';
import { IncomeByTypeCard } from '../../components/admin/reports/IncomeByTypeCard';
import { IncomeByClassCard } from '../../components/admin/reports/IncomeByClassCard';
import type { IncomeTypeFilter, TimePeriodFilter } from '../../types/reports';
import {
  DUMMY_WEEKLY_INCOME,
  DUMMY_MONTHLY_INCOME_BY_CATEGORY,
  DUMMY_CLASS_INCOME,
} from '../../types/reports';

export const ReportsPage: React.FC = () => {
  const [incomeType, setIncomeType] = useState<IncomeTypeFilter>('Todos');
  const [timePeriod, setTimePeriod] = useState<TimePeriodFilter>('Este Mes');

  // Datos Simulados para las Tarjetas
  const totalIncomeOverview = 25000;
  const percentageChangeOverview = 15; // +15%

  const totalIncomeByType = 10000; // Total de Membresías, Clases, Productos para el mes
  const percentageChangeByType = 10; // +10%

  const totalIncomeByClass = 5000; // Suma de ingresos por clase para el mes
  const percentageChangeByClass = 5; // +5%

  return (
    <div className="min-h-screen p-4 lg:p-8 space-y-8">
      <h1 className="text-3xl lg:text-4xl font-bold text-white">
        Reportes de Ingresos
      </h1>

      {/* Selectores de Filtro */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Select
          value={incomeType}
          onValueChange={(value: IncomeTypeFilter) => setIncomeType(value)}
        >
          <SelectTrigger className="w-full sm:w-[200px] bg-card text-white border-gray-700">
            <SelectValue placeholder="Tipo de Ingreso" />
          </SelectTrigger>
          <SelectContent className="bg-card text-white border-gray-700">
            <SelectItem value="Todos">Todos los Ingresos</SelectItem>
            <SelectItem value="Membresías">Membresías</SelectItem>
            <SelectItem value="Clases">Clases</SelectItem>
            <SelectItem value="Productos">Productos</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={timePeriod}
          onValueChange={(value: TimePeriodFilter) => setTimePeriod(value)}
        >
          <SelectTrigger className="w-full sm:w-[200px] bg-card text-white border-gray-700">
            <SelectValue placeholder="Periodo de Tiempo" />
          </SelectTrigger>
          <SelectContent className="bg-card text-white border-gray-700">
            <SelectItem value="Este Mes">Este Mes</SelectItem>
            <SelectItem value="Últimos 3 Meses">Últimos 3 Meses</SelectItem>
            <SelectItem value="Este Año">Este Año</SelectItem>
            <SelectItem value="Personalizado">Personalizado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tarjetas de Reportes */}
      <div className="grid gap-6">
        <IncomeOverviewCard
          totalIncome={totalIncomeOverview}
          percentageChange={percentageChangeOverview}
          data={DUMMY_WEEKLY_INCOME}
        />

        <IncomeByTypeCard
          totalIncome={totalIncomeByType}
          percentageChange={percentageChangeByType}
          data={DUMMY_MONTHLY_INCOME_BY_CATEGORY}
        />

        <IncomeByClassCard
          totalIncome={totalIncomeByClass}
          percentageChange={percentageChangeByClass}
          data={DUMMY_CLASS_INCOME}
        />
      </div>
    </div>
  );
};
