
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EnhancedWidgetProps {
  children: React.ReactNode;
  className?: string;
  style?: 'glass' | 'neomorph' | 'hybrid' | 'ios';
  hoverEffect?: 'scale' | 'glow' | 'lift' | 'none' | 'subtle';
  accentColor?: string;
  size?: 'sm' | 'md' | 'lg';
  redirectTo?: string;
  redirectLabel?: string;
}

const EnhancedWidget: React.FC<EnhancedWidgetProps> = ({
  children,
  className,
  style = 'hybrid',
  hoverEffect = 'subtle',
  accentColor,
  size = 'md',
  redirectTo,
  redirectLabel = 'View More',
}) => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  
  // Base styles for different design approaches with improved contrast
  const styleClasses = {
    glass: cn(
      "backdrop-blur-xl border rounded-xl overflow-hidden transition-all duration-300",
      isDarkMode 
        ? "bg-gray-900/80 border-white/10 shadow-lg text-white"
        : "bg-white/90 border-gray-200/50 shadow-md text-gray-900"
    ),
    neomorph: cn(
      "rounded-xl overflow-hidden transition-all duration-300",
      isDarkMode
        ? "bg-[#1e1e1e] shadow-[5px_5px_10px_#151515,-5px_-5px_10px_#2a2a2a] border-[#252525] text-white"
        : "bg-[#f0f0f3] shadow-[5px_5px_10px_#d1d1d4,-5px_-5px_10px_#ffffff] border-[#e8e8e8] text-gray-900"
    ),
    hybrid: cn(
      "backdrop-blur-lg border rounded-xl overflow-hidden transition-all duration-300",
      isDarkMode
        ? "bg-gradient-to-br from-gray-900/90 to-black/80 border-gray-800/50 shadow-[inset_0px_0px_20px_rgba(255,255,255,0.05),0px_10px_20px_rgba(0,0,0,0.2)] text-white"
        : "bg-gradient-to-br from-white to-gray-100/90 border-white shadow-[inset_0px_0px_20px_rgba(255,255,255,0.8),0px_10px_20px_rgba(0,0,0,0.05)] text-gray-900"
    ),
    ios: cn(
      "rounded-2xl overflow-hidden transition-all duration-300",
      isDarkMode
        ? "bg-black/90 border border-gray-800/70 shadow-xl text-white"
        : "bg-white/95 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.12)] text-gray-900"
    ),
  };

  // Size variations
  const sizeClasses = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
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
    subtle: {
      whileHover: { 
        y: -3,
        scale: 1.01,
        transition: { duration: 0.3, ease: "easeOut" }
      },
    },
    none: {},
  };
  
  return (
    <motion.div
      className={cn(styleClasses[style], sizeClasses[size], "flex flex-col", className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      {...hoverEffects[hoverEffect]}
    >
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
      
      {redirectTo && (
        <div className={cn(
          "mt-3 pt-3 flex justify-end",
          isDarkMode ? "border-t border-white/10" : "border-t border-gray-200/50"
        )}>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "text-xs gap-1 h-8 transition-all duration-200",
              isDarkMode 
                ? "hover:bg-white/10 text-blue-400 hover:text-blue-300" 
                : "hover:bg-black/5 text-blue-600 hover:text-blue-500"
            )}
            onClick={() => navigate(redirectTo)}
          >
            <span>{redirectLabel}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default EnhancedWidget;
