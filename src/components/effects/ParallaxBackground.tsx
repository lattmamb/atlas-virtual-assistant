
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

export const ParallaxBackground: React.FC = () => {
  const { isDarkMode } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Parallax effect values for different layers
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  
  // Mouse parallax effect
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
    >
      {/* Base gradient background */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          isDarkMode 
            ? "bg-gradient-to-b from-black via-gray-900 to-black" 
            : "bg-gradient-to-b from-white via-gray-100 to-white"
        )}
      />
      
      {/* Grid pattern */}
      <motion.div 
        className={cn(
          "absolute inset-0 opacity-20",
          "bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)]",
          "bg-[size:100px_100px]"
        )}
        style={{
          y: y1,
          x: mousePosition.x * -20,
          opacity: opacity1
        }}
      />
      
      {/* Floating orbs / light streaks */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: y2,
          x: mousePosition.x * -40,
          scale: scale1
        }}
      >
        {/* Orb 1 */}
        <motion.div
          className={cn(
            "absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-20",
            isDarkMode ? "bg-blue-500" : "bg-blue-300"
          )}
          animate={{
            x: [0, 20, 0, -20, 0],
            y: [0, -20, 0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
        
        {/* Orb 2 */}
        <motion.div
          className={cn(
            "absolute top-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10",
            isDarkMode ? "bg-purple-500" : "bg-purple-300"
          )}
          animate={{
            x: [0, -30, 0, 30, 0],
            y: [0, 30, 0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
        
        {/* Orb 3 */}
        <motion.div
          className={cn(
            "absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full blur-3xl opacity-15",
            isDarkMode ? "bg-teal-500" : "bg-teal-300"
          )}
          animate={{
            x: [0, 40, 0, -40, 0],
            y: [0, -40, 0, 40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      </motion.div>
      
      {/* Floating particles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: y3,
          x: mousePosition.x * -30
        }}
      >
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              "absolute w-1 h-1 rounded-full",
              isDarkMode ? "bg-white" : "bg-black"
            )}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "mirror",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </motion.div>
      
      {/* Light rays effect */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: isDarkMode 
            ? `radial-gradient(circle at ${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%, rgba(255,255,255,0.1) 0%, transparent 50%)` 
            : `radial-gradient(circle at ${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%, rgba(0,0,0,0.05) 0%, transparent 50%)`,
          y: y2
        }}
      />
      
      {/* Lens flare effect */}
      <motion.div
        className={cn(
          "absolute w-96 h-96 rounded-full blur-3xl opacity-20",
          isDarkMode ? "bg-blue-400" : "bg-blue-200"
        )}
        style={{
          left: `calc(${50 + mousePosition.x * 20}% - 12rem)`,
          top: `calc(${50 + mousePosition.y * 20}% - 12rem)`,
        }}
      />
    </div>
  );
};
