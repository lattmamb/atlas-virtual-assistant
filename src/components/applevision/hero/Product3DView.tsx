
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

const Product3DView: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div 
      className="relative w-full max-w-2xl h-60 sm:h-80 mt-12 sm:mt-16 mb-8"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 1,
        delay: 1.1,
        type: "spring", 
        stiffness: 50 
      }}
    >
      <div className={cn(
        "absolute inset-0 rounded-3xl overflow-hidden",
        "flex items-center justify-center",
        isDarkMode ? "bg-black/30" : "bg-white/40",
        "backdrop-blur-xl border",
        isDarkMode ? "border-white/10" : "border-black/5"
      )}>
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="/lovable-uploads/c9ad08ff-68c3-4635-af88-f133d638efc9.png"
            alt="Apple Vision Pro" 
            className="w-full h-full object-contain p-4 opacity-90 hover:opacity-100 transition-opacity duration-300"
          />
        </div>
        
        <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
      </div>
    </motion.div>
  );
};

export default Product3DView;
