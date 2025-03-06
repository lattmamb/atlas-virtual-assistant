
import React, { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import SplashCursor from '../effects/SplashCursor';

interface IOSParallaxBackgroundProps {
  children: ReactNode;
  useSplashCursor?: boolean;
}

const IOSParallaxBackground: React.FC<IOSParallaxBackgroundProps> = ({ 
  children,
  useSplashCursor = true
}) => {
  const { isDarkMode, currentTheme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to center of screen
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Calculate distance from center (normalized from -1 to 1)
      const x = (e.clientX - centerX) / centerX;
      const y = (e.clientY - centerY) / centerY;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Determine background based on theme
  const getBackground = () => {
    if (currentTheme === 'ios18') {
      return 'bg-gradient-to-br from-black to-gray-900';
    }
    
    return isDarkMode
      ? 'bg-gradient-to-br from-gray-900 to-gray-950'
      : 'bg-gradient-to-br from-blue-50 to-indigo-100';
  };
  
  return (
    <div className="w-full h-screen overflow-hidden relative">
      {/* SplashCursor if enabled */}
      {useSplashCursor && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <SplashCursor 
            BACK_COLOR={{ r: 0.0, g: 0.0, b: 0.15 }}
            SPLAT_RADIUS={0.25}
            DENSITY_DISSIPATION={3.0}
            TRANSPARENT={true}
          />
        </div>
      )}
      
      {/* Parallax background */}
      <motion.div 
        className={`absolute inset-0 z-0 ${getBackground()}`}
        style={{
          x: mousePosition.x * -10,
          y: mousePosition.y * -10,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      />
      
      {/* Decorative gradients */}
      <motion.div 
        className="absolute top-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full opacity-20 bg-blue-500 filter blur-[120px]"
        style={{
          x: mousePosition.x * -30,
          y: mousePosition.y * -30,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
      />
      
      <motion.div 
        className="absolute bottom-[-200px] left-[-200px] w-[500px] h-[500px] rounded-full opacity-20 bg-purple-500 filter blur-[120px]"
        style={{
          x: mousePosition.x * 30,
          y: mousePosition.y * 30,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
      />
      
      {/* Content with subtle parallax */}
      <motion.div 
        className="relative z-10 w-full h-full overflow-auto"
        style={{
          x: mousePosition.x * 5,
          y: mousePosition.y * 5,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default IOSParallaxBackground;
