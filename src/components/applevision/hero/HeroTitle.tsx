
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

const HeroTitle: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8,
          delay: 0.3,
        }}
        className="mb-6"
      >
        <span className={cn(
          "inline-block text-sm font-medium tracking-wider px-3 py-1 rounded-full mb-6",
          isDarkMode 
            ? "bg-white/10 text-white backdrop-blur-sm"
            : "bg-black/5 text-gray-800 backdrop-blur-sm"
        )}>
          INTRODUCING APPLE VISION PRO
        </span>
      </motion.div>
      
      <motion.h1 
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-8 md:mt-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8,
          delay: 0.5,
        }}
      >
        Experience the Future of
        <br />
        <span className={cn(
          "inline-block mt-2 bg-clip-text text-transparent bg-gradient-to-r",
          isDarkMode 
            ? "from-blue-400 via-indigo-400 to-purple-400"
            : "from-blue-600 via-indigo-600 to-purple-600"
        )}>
          Augmented Reality
        </span>
      </motion.h1>
    </>
  );
};

export default HeroTitle;
