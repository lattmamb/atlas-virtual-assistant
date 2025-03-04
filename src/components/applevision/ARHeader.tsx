
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { UniverseComponentProps } from '@/lib/types';

const ARHeader: React.FC<UniverseComponentProps> = ({ scrollY }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <motion.header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 px-6",
        "backdrop-blur-md",
        isDarkMode ? "bg-black/10" : "bg-white/10",
        "border-b",
        isDarkMode ? "border-white/5" : "border-black/5"
      )}
      style={{
        transform: scrollY > 20 ? 'translateY(0)' : 'translateY(0)',
        opacity: scrollY > 100 ? 0.98 : 1,
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <span className={cn(
            "text-xl font-semibold",
            "bg-clip-text text-transparent bg-gradient-to-r",
            isDarkMode 
              ? "from-blue-400 to-purple-400" 
              : "from-blue-600 to-purple-600"
          )}>
            AppleVision Pro
          </span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          {['Home', 'Features', 'Specs', 'Pricing', 'Contact'].map((item, index) => (
            <motion.a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className={cn(
                "text-sm font-medium",
                isDarkMode ? "text-white hover:text-blue-300" : "text-gray-800 hover:text-blue-600",
                "transition-colors"
              )}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              {item}
            </motion.a>
          ))}
        </nav>
        
        <div className="flex items-center">
          <button className={cn(
            "px-4 py-2 rounded-full",
            "text-sm font-medium",
            "border",
            isDarkMode 
              ? "border-white/20 text-white hover:bg-white/10" 
              : "border-black/20 text-black hover:bg-black/5",
            "transition-colors"
          )}>
            Pre-Order
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default ARHeader;
