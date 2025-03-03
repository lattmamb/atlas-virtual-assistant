
import React from 'react';
import { User, Grid3X3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HeaderSectionProps {
  isDarkMode: boolean;
  showAppGrid: boolean;
  setShowAppGrid: (show: boolean) => void;
  title?: string;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  isDarkMode,
  showAppGrid,
  setShowAppGrid,
  title = "Atlas Assistant"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center justify-between px-6">
        <div className="flex items-center space-x-2">
          <h1 className={cn(
            "text-2xl font-medium",
            isDarkMode ? "text-white" : "text-gray-800"
          )}>
            {title}
          </h1>
        </div>
        
        <div className="flex items-center space-x-3">
          {setShowAppGrid && (
            <button 
              onClick={() => setShowAppGrid(!showAppGrid)}
              className={cn(
                "p-2 rounded-full transition-colors",
                isDarkMode 
                  ? "hover:bg-gray-800 text-gray-300" 
                  : "hover:bg-gray-100 text-gray-600"
              )}
            >
              <Grid3X3 size={20} />
            </button>
          )}
          
          <button className={cn(
            "p-2 rounded-full transition-colors",
            isDarkMode 
              ? "hover:bg-gray-800 text-gray-300" 
              : "hover:bg-gray-100 text-gray-600"
          )}>
            <User size={20} />
          </button>
        </div>
      </div>
      
      <div className={cn(
        "h-[1px] mt-4 mx-6",
        isDarkMode ? "bg-gray-800" : "bg-gray-200"
      )} />
    </motion.div>
  );
};

export default HeaderSection;
