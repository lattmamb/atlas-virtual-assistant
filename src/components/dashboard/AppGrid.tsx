
import React from 'react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface AppGridProps {
  icon: React.ReactNode;
  name: string;
  path: string;
  badgeCount?: number;
}

const AppGrid: React.FC<AppGridProps> = ({
  icon,
  name,
  path,
  badgeCount
}) => {
  const navigate = useNavigate();
  
  return (
    <button 
      className="flex flex-col items-center justify-center p-1"
      onClick={() => navigate(path)}
    >
      <div className="relative">
        <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center overflow-hidden border border-gray-700">
          <div className="text-white">
            {icon}
          </div>
        </div>
        
        {badgeCount && badgeCount > 0 && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
            {badgeCount}
          </div>
        )}
      </div>
      <span className="text-white text-xs mt-1">{name}</span>
    </button>
  );
};

export default AppGrid;
