
import React, { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { ThreeDPageCarousel } from '../ui/3d-carousel';

interface PerspectivePageLayoutProps {
  children: ReactNode;
  title?: string;
  showCarousel?: boolean;
  carouselScale?: number;
}

const PerspectivePageLayout: React.FC<PerspectivePageLayoutProps> = ({
  children,
  title,
  showCarousel = true,
  carouselScale = 0.6,
}) => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isPageActive, setIsPageActive] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle background click to return to carousel
  const handleBackgroundClick = (e: React.MouseEvent) => {
    // Only trigger if clicking directly on the background container, not on content
    if (e.target === e.currentTarget && isPageActive && !isTransitioning) {
      setIsTransitioning(true);
      setIsPageActive(false);
      
      // Delay navigation to allow animation to play
      setTimeout(() => {
        navigate('/');
      }, 500);
    }
  };

  // Set page as active when mounted
  useEffect(() => {
    setIsPageActive(true);
    setIsTransitioning(false);
    
    // Add click handler to document for areas outside main content
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if click is outside main content areas by looking for specific class markers
      if (
        !target.closest('.content-area') && 
        !target.closest('.carousel-area') &&
        !target.closest('.interactive-element') &&
        isPageActive && 
        !isTransitioning &&
        location.pathname !== '/'
      ) {
        setIsTransitioning(true);
        setIsPageActive(false);
        
        setTimeout(() => {
          navigate('/');
        }, 500);
      }
    };

    document.addEventListener('click', handleDocumentClick);
    
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [location.pathname, navigate, isPageActive, isTransitioning]);

  return (
    <div 
      className="min-h-screen w-full flex flex-col relative overflow-hidden"
      onClick={handleBackgroundClick}
    >
      {/* 3D Page Content with Perspective */}
      <AnimatePresence mode="wait">
        {isPageActive && (
          <motion.div 
            className={cn(
              "flex-grow content-area z-20 relative",
              "bg-background/5 backdrop-blur-sm rounded-xl shadow-2xl",
              "border", isDarkMode ? "border-white/10" : "border-black/10"
            )}
            initial={{ scale: 0.8, opacity: 0, y: 40, rotateX: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40, rotateX: 10 }}
            transition={{ 
              duration: 0.5, 
              ease: [0.19, 1, 0.22, 1],
              opacity: { duration: 0.4 }
            }}
          >
            {title && (
              <div className={cn(
                "w-full text-center py-4",
                isDarkMode ? "text-white" : "text-black"
              )}>
                <h1 className="text-2xl font-bold">{title}</h1>
              </div>
            )}
            
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Perspective Background with Carousel */}
      {showCarousel && (
        <div className={cn(
          "carousel-area absolute inset-0 flex items-center justify-center",
          "transition-all duration-500 ease-in-out transform-gpu",
          isPageActive 
            ? "opacity-30 z-10 scale-75 translate-y-[15%] blur-[1px]" 
            : "opacity-100 z-20 scale-100 translate-y-0 blur-0"
        )}>
          <motion.div 
            className="w-full max-w-7xl mx-auto"
            initial={{ scale: carouselScale, y: 60, rotateX: 15 }}
            animate={{ 
              scale: isPageActive ? carouselScale : 1,
              y: isPageActive ? 60 : 0,
              rotateX: isPageActive ? 15 : 0
            }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          >
            <ThreeDPageCarousel fullWidth={!isPageActive} />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PerspectivePageLayout;
