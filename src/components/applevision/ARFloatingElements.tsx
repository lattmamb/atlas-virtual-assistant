
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { UniverseComponentProps } from '@/lib/types';

const ARFloatingElements: React.FC<UniverseComponentProps> = ({ scrollY }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating Element 1 - Top Right */}
      <motion.div 
        className={cn(
          "absolute top-[15%] right-[10%] h-20 w-20 rounded-full",
          "bg-gradient-to-br from-blue-500/20 to-violet-500/20",
          "backdrop-blur-lg"
        )}
        style={{
          boxShadow: isDarkMode ? '0 0 30px 5px rgba(120, 120, 255, 0.15)' : '0 0 30px 5px rgba(120, 120, 255, 0.1)',
          translateY: -scrollY * 0.2,
          translateX: scrollY * 0.05
        }}
      />
      
      {/* Floating Element 2 - Left */}
      <motion.div 
        className={cn(
          "absolute top-[40%] left-[5%] h-32 w-32 rounded-full",
          "bg-gradient-to-tr from-indigo-500/10 to-purple-500/10",
          "backdrop-blur-lg"
        )}
        style={{
          boxShadow: isDarkMode ? '0 0 40px 8px rgba(120, 0, 255, 0.1)' : '0 0 40px 8px rgba(120, 0, 255, 0.05)',
          translateY: scrollY * 0.15
        }}
      />
      
      {/* Floating Element 3 - Bottom Right */}
      <motion.div 
        className={cn(
          "absolute bottom-[10%] right-[15%] h-16 w-16 rounded-full",
          "bg-gradient-to-bl from-blue-400/20 to-cyan-400/20",
          "backdrop-blur-lg"
        )}
        style={{
          boxShadow: isDarkMode ? '0 0 25px 5px rgba(0, 200, 255, 0.15)' : '0 0 25px 5px rgba(0, 200, 255, 0.1)',
          translateY: -scrollY * 0.1,
          translateX: -scrollY * 0.05
        }}
      />
      
      {/* Floating Element 4 - Center Left */}
      <motion.div 
        className={cn(
          "absolute top-[60%] left-[20%] h-24 w-24 rounded-full",
          "bg-gradient-to-r from-purple-500/15 to-pink-500/15",
          "backdrop-blur-lg"
        )}
        style={{
          boxShadow: isDarkMode ? '0 0 35px 7px rgba(200, 0, 255, 0.12)' : '0 0 35px 7px rgba(200, 0, 255, 0.07)',
          translateY: scrollY * 0.05,
          translateX: scrollY * 0.1
        }}
      />
      
      {/* Additional floating elements for more depth */}
      {/* Small Element 1 */}
      <motion.div 
        className={cn(
          "absolute top-[25%] left-[40%] h-8 w-8 rounded-full",
          "bg-gradient-to-tr from-blue-300/20 to-indigo-300/20",
          "backdrop-blur-lg"
        )}
        style={{
          boxShadow: isDarkMode ? '0 0 15px 3px rgba(100, 100, 255, 0.15)' : '0 0 15px 3px rgba(100, 100, 255, 0.1)',
          translateY: -scrollY * 0.3
        }}
      />
      
      {/* Small Element 2 */}
      <motion.div 
        className={cn(
          "absolute top-[70%] right-[30%] h-12 w-12 rounded-full",
          "bg-gradient-to-bl from-violet-400/20 to-fuchsia-400/20",
          "backdrop-blur-lg"
        )}
        style={{
          boxShadow: isDarkMode ? '0 0 20px 4px rgba(150, 0, 255, 0.12)' : '0 0 20px 4px rgba(150, 0, 255, 0.08)',
          translateY: scrollY * 0.25
        }}
      />
      
      {/* Background radial gradients */}
      <div 
        className={cn(
          "absolute inset-0 opacity-50",
          isDarkMode 
            ? "bg-[radial-gradient(ellipse_at_top_right,_rgba(50,50,180,0.15),_transparent_70%),radial-gradient(ellipse_at_bottom_left,_rgba(100,50,150,0.1),_transparent_70%)]" 
            : "bg-[radial-gradient(ellipse_at_top_right,_rgba(100,100,255,0.1),_transparent_70%),radial-gradient(ellipse_at_bottom_left,_rgba(150,100,200,0.05),_transparent_70%)]"
        )}
        style={{
          transform: `translateY(${scrollY * 0.05}px)`
        }}
      />
    </div>
  );
};

export default ARFloatingElements;
