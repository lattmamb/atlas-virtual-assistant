
import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { motion, PanInfo } from 'framer-motion';
import HeroTitle from './hero/HeroTitle';
import HeroContent from './hero/HeroContent';
import Product3DView from './hero/Product3DView';
import IOSAppSwitcher from '../ios/IOSAppSwitcher';

const HeroSection: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [showAppSwitcher, setShowAppSwitcher] = useState(false);
  
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y < -100) {
      // Dragged up significantly
      setShowAppSwitcher(true);
    }
  };
  
  return (
    <>
      <motion.section 
        className={cn(
          "min-h-[100dvh] w-full flex flex-col items-center justify-center",
          "px-4 sm:px-6 pt-[120px] pb-24 md:pt-[140px]"
        )}
        drag="y"
        dragDirectionLock
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragEnd={handleDragEnd}
      >
        <div className="max-w-5xl mx-auto text-center z-10">
          <HeroTitle />
          <HeroContent />
        </div>
        
        <Product3DView />
        
        <motion.div 
          className="absolute bottom-8 left-0 right-0 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ 
            repeat: Infinity, 
            repeatType: "reverse", 
            duration: 1.5 
          }}
        >
          <div className="text-center">
            <div className="w-10 h-1 bg-gray-400 rounded-full mx-auto mb-2" />
            <p className="text-sm text-gray-400">Swipe up for apps</p>
          </div>
        </motion.div>
      </motion.section>
      
      {showAppSwitcher && (
        <IOSAppSwitcher />
      )}
    </>
  );
};

export default HeroSection;
