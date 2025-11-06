import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface ActivityItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="flex items-start mb-4 last:mb-0">
      <div className="p-2 bg-highlight/10 text-highlight rounded-full flex-shrink-0 mr-3">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className="font-medium text-headline">{title}</h4>
        <p className="text-sm text-sub-headline">{description}</p>
      </div>
    </div>
  );
};
