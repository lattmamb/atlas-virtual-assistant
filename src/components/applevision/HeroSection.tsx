import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

const HeroSection: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <section className="min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 sm:px-6 pt-[120px] pb-24 md:pt-[140px]">
      <div className="max-w-5xl mx-auto text-center z-10">
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
      </div>
      
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
    </section>
  );
};

export default HeroSection;
