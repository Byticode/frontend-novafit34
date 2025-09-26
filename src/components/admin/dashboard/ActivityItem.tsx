import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ActivityItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex items-start mb-4 last:mb-0">
      <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-full flex-shrink-0 mr-3">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className="font-medium text-white">{title}</h4>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
};