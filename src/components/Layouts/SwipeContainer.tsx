
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSwipe } from '@/hooks/useSwipe';
import { usePanel } from '@/contexts/PanelContext';

interface SwipeContainerProps {
  children: React.ReactNode;
  className?: string;
}

const SwipeContainer: React.FC<SwipeContainerProps> = ({ children, className }) => {
  const { activePanel, navigateToPanel } = usePanel();
  const [isSwiping, setIsSwiping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Define available panels and their order
  const panels = ['home', 'vision', 'universe', 'link'];
  
  const currentIndex = panels.indexOf(activePanel);

  const handleSwipeLeft = () => {
    if (currentIndex < panels.length - 1) {
      navigateToPanel(panels[currentIndex + 1]);
    }
  };

  const handleSwipeRight = () => {
    if (currentIndex > 0) {
      navigateToPanel(panels[currentIndex - 1]);
    }
  };

  const swipeHandlers = useSwipe({
    onSwipeLeft: handleSwipeLeft,
    onSwipeRight: handleSwipeRight,
  });

  return (
    <div 
      ref={containerRef}
      className={`swipe-container relative overflow-hidden w-full h-full ${className}`}
      {...swipeHandlers}
    >
      {children}
      
      {/* Panel indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {panels.map((panel, index) => (
          <motion.div
            key={panel}
            className={`w-2 h-2 rounded-full ${
              panel === activePanel 
                ? 'bg-primary' 
                : 'bg-white/30'
            }`}
            animate={{
              scale: panel === activePanel ? 1.2 : 1,
              opacity: panel === activePanel ? 1 : 0.5,
            }}
            onClick={() => navigateToPanel(panel)}
          />
        ))}
      </div>
    </div>
  );
};

export default SwipeContainer;
