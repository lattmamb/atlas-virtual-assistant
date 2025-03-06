
import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { ThreeDPageCarousel } from '@/components/ui/3d-carousel';
import { Squares } from '@/components/ui/squares-background';

const HomeScreen: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="min-h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Squares className="-z-10" />
      </div>
      
      {/* Carousel Hero */}
      <div className={cn(
        "w-full min-h-screen pt-16 pb-12 flex flex-col items-center justify-center",
        isDarkMode ? "text-white" : "text-black"
      )}>
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">
          Atlas Universe
        </h1>
        <p className="text-lg md:text-xl mb-12 text-center max-w-xl mx-auto opacity-80">
          Explore our suite of interconnected applications
        </p>
        
        <div className="w-full max-w-7xl mx-auto">
          <ThreeDPageCarousel />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
