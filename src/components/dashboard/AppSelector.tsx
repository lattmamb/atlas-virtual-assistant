
import React from 'react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface AppSelectorProps {
  icon: React.ReactNode;
  name: string;
  path: string;
  badgeCount?: number;
  onClick?: () => void;
}

const AppSelector: React.FC<AppSelectorProps> = ({
  icon,
  name,
  path,
  badgeCount,
  onClick
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(path);
    if (onClick) onClick();
  };
  
  return (
    <button 
      className="flex flex-col items-center justify-center p-2"
      onClick={handleClick}
    >
      <div className="relative mb-2">
        <div className="w-14 h-14 bg-gray-800 rounded-xl flex items-center justify-center overflow-hidden border border-gray-700">
          <div className="text-white scale-125">
            {icon}
          </div>
        </div>
        
        {badgeCount && badgeCount > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
            {badgeCount}
          </div>
        )}
      </div>
      <span className="text-white text-xs">{name}</span>
    </button>
  );
};

export default AppSelector;
