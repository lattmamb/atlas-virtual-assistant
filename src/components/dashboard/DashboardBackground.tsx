
import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

const DashboardBackground: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div
      className={cn(
        "fixed inset-0 z-0 transition-all duration-700",
        isDarkMode ? "bg-gradient-to-b from-gray-900 to-black" : "bg-gradient-to-b from-gray-100 to-white"
      )}
    />
  );
};

export default DashboardBackground;
