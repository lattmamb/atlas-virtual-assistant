
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { SparklesCore } from '@/components/ui/sparkles';

interface ARBackgroundProps {
  scrollY: number;
}

const ARBackground: React.FC<ARBackgroundProps> = ({ scrollY }) => {
  const { isDarkMode } = useTheme();
  const particlesRef = useRef<HTMLDivElement>(null);
  
  // Apply subtle parallax effect to particles based on scroll
  useEffect(() => {
    if (particlesRef.current) {
      const speed = 0.2;
      particlesRef.current.style.transform = `translateY(${scrollY * speed}px)`;
    }
  }, [scrollY]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      {/* Base gradient background */}
      <div 
        className={`absolute inset-0 transition-colors duration-1000 ${
          isDarkMode 
            ? 'bg-gradient-to-b from-black via-slate-900 to-slate-950' 
            : 'bg-gradient-to-b from-slate-50 via-blue-50 to-indigo-100'
        }`}
      />
      
      {/* Animated particles */}
      <div ref={particlesRef} className="absolute inset-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.8}
          particleDensity={isDarkMode ? 45 : 35}
          className="w-full h-full"
          particleColor={isDarkMode ? "#FFFFFF" : "#6366f1"}
          speed={0.2}
        />
      </div>
      
      {/* Animated ambient glows */}
      <motion.div 
        className={`absolute top-20 -right-20 w-[500px] h-[500px] rounded-full opacity-30 blur-[130px] ${
          isDarkMode ? 'bg-blue-500/20' : 'bg-indigo-500/30'
        }`}
        animate={{
          scale: [1, 1.1, 1],
          opacity: isDarkMode ? [0.2, 0.3, 0.2] : [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      <motion.div 
        className={`absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full opacity-30 blur-[130px] ${
          isDarkMode ? 'bg-purple-500/20' : 'bg-blue-500/30'
        }`}
        animate={{
          scale: [1, 1.15, 1],
          opacity: isDarkMode ? [0.2, 0.3, 0.2] : [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      {/* Grid overlay */}
      <div 
        className={`absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:60px_60px] ${
          isDarkMode ? 'opacity-5' : 'opacity-20'
        }`}
        style={{
          transform: `translateY(${scrollY * 0.1}px)` 
        }}
      />
    </div>
  );
};

export default ARBackground;
