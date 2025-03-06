
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface NavigationControlsProps {
  pages: Array<{ path: string }>;
  activePageIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
}

const NavigationControls = ({ 
  pages, 
  activePageIndex, 
  onPrevious, 
  onNext, 
  onDotClick 
}: NavigationControlsProps) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="flex justify-between items-center px-6 py-3">
      <motion.button
        whileTap={{ scale: 0.9 }}
        className={cn(
          "p-2 rounded-full", 
          isDarkMode ? "bg-white/10" : "bg-black/10",
          "transition-all duration-300"
        )}
        onClick={onPrevious}
      >
        <ChevronLeft className="h-5 w-5" />
      </motion.button>
      
      <div className="flex space-x-1">
        {pages.map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              i === activePageIndex 
                ? isDarkMode ? "bg-white" : "bg-black" 
                : isDarkMode ? "bg-white/30" : "bg-black/30"
            )}
            animate={{
              scale: i === activePageIndex ? 1.2 : 1
            }}
            onClick={() => onDotClick(i)}
          />
        ))}
      </div>
      
      <motion.button
        whileTap={{ scale: 0.9 }}
        className={cn(
          "p-2 rounded-full", 
          isDarkMode ? "bg-white/10" : "bg-black/10",
          "transition-all duration-300"
        )}
        onClick={onNext}
      >
        <ChevronRight className="h-5 w-5" />
      </motion.button>
    </div>
  );
};

export default NavigationControls;
