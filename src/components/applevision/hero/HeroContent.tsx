
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

const HeroContent: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <>
      <motion.p 
        className={cn(
          "mt-6 text-lg sm:text-xl max-w-3xl mx-auto",
          isDarkMode ? "text-gray-300" : "text-gray-600"
        )}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8,
          delay: 0.7,
        }}
      >
        Your Portal to a New Dimension. Seamlessly blend digital content with your physical space, 
        creating unlimited possibilities for work, play, and connection.
      </motion.p>
      
      <motion.div 
        className="mt-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8,
          delay: 0.9,
        }}
      >
        <motion.button
          className={cn(
            "px-8 py-3 rounded-full text-lg font-medium inline-flex items-center gap-2",
            "transition-all duration-300 group",
            isDarkMode 
              ? "bg-white text-black hover:bg-opacity-90" 
              : "bg-black text-white hover:bg-opacity-80"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Discover More
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </motion.div>
    </>
  );
};

export default HeroContent;
