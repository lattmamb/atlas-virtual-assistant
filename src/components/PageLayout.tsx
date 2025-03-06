
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { ThreeDPageCarousel } from './ui/3d-carousel';

interface PageLayoutProps {
  children: ReactNode;
  showCarousel?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  showCarousel = true 
}) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Main content */}
      <div className="flex-grow">
        {children}
      </div>
      
      {/* Carousel navigation at bottom */}
      {showCarousel && (
        <div className={cn(
          "w-full pt-6 pb-12 px-4",
          "border-t",
          isDarkMode ? "border-white/10" : "border-black/10"
        )}>
          <div className="max-w-7xl mx-auto">
            <h2 className={cn(
              "text-xl font-semibold mb-4 text-center",
              isDarkMode ? "text-white/80" : "text-black/80"
            )}>
              Navigation
            </h2>
            <ThreeDPageCarousel />
          </div>
        </div>
      )}
    </div>
  );
};

export default PageLayout;
