
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

export interface WidgetsGridProps {
  children?: React.ReactNode;
  onEditMode?: (editing: boolean) => void;
}

const WidgetsGrid: React.FC<WidgetsGridProps> = ({ children, onEditMode }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div 
      className={cn(
        "dashboard-grid",
        isDarkMode ? 'text-white' : 'text-gray-900'
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default WidgetsGrid;
