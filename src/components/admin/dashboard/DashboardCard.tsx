import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  description?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  description,
}) => {
  return (
    <div className="bg-blue-primary p-6 rounded-lg shadow-md flex flex-col justify-between">
      <h3 className="text-sm font-medium text-gray-400 mb-2">{title}</h3>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      {description && <p className="text-xs text-gray-500">{description}</p>}
    </div>
  );
};
