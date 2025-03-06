
import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { ThreeDPageCarousel } from '@/components/ui/3d-carousel';
import { Squares } from '@/components/ui/squares-background';
import { motion } from 'framer-motion';

const HomeScreen: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="min-h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Squares className="-z-10" />
      </div>
      
      {/* Home Title */}
      <motion.div 
        className={cn(
          "absolute top-0 left-0 right-0 text-center pt-10 z-20",
          isDarkMode ? "text-white" : "text-black"
        )}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-2">
          Atlas Universe
        </h1>
        <p className="text-lg opacity-80 max-w-md mx-auto">
          Select a destination to explore
        </p>
      </motion.div>
      
      {/* Main Carousel */}
      <div className={cn(
        "w-full min-h-screen flex flex-col items-center justify-center",
        isDarkMode ? "text-white" : "text-black"
      )}>
        <div className="w-full max-w-7xl mx-auto flex-1 flex items-center justify-center">
          <ThreeDPageCarousel fullWidth={true} />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
