
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

interface EnhancedWidgetProps {
  children: React.ReactNode;
  className?: string;
  style?: 'glass' | 'neomorph' | 'hybrid';
  hoverEffect?: 'scale' | 'glow' | 'lift' | 'none';
  accentColor?: string;
}

const EnhancedWidget: React.FC<EnhancedWidgetProps> = ({
  children,
  className,
  style = 'glass',
  hoverEffect = 'scale',
  accentColor,
}) => {
  const { isDarkMode } = useTheme();
  
  // Base styles for different design approaches with improved contrast
  const styleClasses = {
    glass: cn(
      "backdrop-blur-xl border rounded-xl overflow-hidden transition-all duration-300",
      isDarkMode 
        ? "bg-gray-900/75 border-white/10 shadow-lg text-gray-100" 
        : "bg-white/80 border-gray-200/50 shadow-md text-gray-800"
    ),
    neomorph: cn(
      "rounded-xl overflow-hidden transition-all duration-300",
      isDarkMode
        ? "bg-[#1e1e1e] shadow-[5px_5px_10px_#151515,-5px_-5px_10px_#2a2a2a] border-[#252525] text-gray-100"
        : "bg-[#f0f0f3] shadow-[5px_5px_10px_#d1d1d4,-5px_-5px_10px_#ffffff] border-[#e8e8e8] text-gray-800"
    ),
    hybrid: cn(
      "backdrop-blur-lg border rounded-xl overflow-hidden transition-all duration-300",
      isDarkMode
        ? "bg-gradient-to-br from-gray-900/90 to-black/80 border-gray-800/50 shadow-[inset_0px_0px_20px_rgba(255,255,255,0.05),0px_10px_20px_rgba(0,0,0,0.2)] text-gray-100"
        : "bg-gradient-to-br from-white to-gray-100/90 border-white shadow-[inset_0px_0px_20px_rgba(255,255,255,0.8),0px_10px_20px_rgba(0,0,0,0.05)] text-gray-800"
    ),
  };
  
  // Hover effect variations
  const hoverEffects = {
    scale: {
      whileHover: { 
        scale: 1.02, 
        transition: { duration: 0.3, ease: "easeOut" }
      },
    },
    glow: {
      whileHover: { 
        boxShadow: isDarkMode 
          ? `0 0 20px 2px ${accentColor || 'rgba(59, 130, 246, 0.5)'}` 
          : `0 0 25px 5px ${accentColor || 'rgba(59, 130, 246, 0.25)'}`
      },
    },
    lift: {
      whileHover: { 
        y: -8,
        transition: { duration: 0.4, ease: "easeOut" }
      },
    },
    none: {},
  };
  
  return (
    <motion.div
      className={cn(styleClasses[style], className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      {...hoverEffects[hoverEffect]}
    >
      {children}
    </motion.div>
  );
};

export default EnhancedWidget;
