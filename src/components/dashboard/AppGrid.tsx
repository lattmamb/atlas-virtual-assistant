
import React from 'react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    <motion.button 
      className="flex flex-col items-center justify-center p-2 group"
      onClick={() => navigate(path)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <div className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden",
          "bg-white/10 backdrop-blur-xl border border-white/20",
          "shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
          "group-hover:bg-white/20 transition-all duration-300"
        )}>
          <div className="text-white scale-150 transition-transform group-hover:scale-[1.6]">
            {icon}
          </div>
        </div>
        
        {badgeCount && badgeCount > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-medium">
            {badgeCount}
          </div>
        )}
      </div>
      <span className="text-sm text-white/90 mt-2 font-medium">{name}</span>
    </motion.button>
  );
};

export default AppGrid;
