
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { UniverseComponentProps } from '@/lib/types';

const ARBackground: React.FC<UniverseComponentProps> = ({ scrollY }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Base gradient background */}
      <div className={cn(
        "absolute inset-0 transition-colors duration-500",
        isDarkMode 
          ? "bg-gradient-to-br from-gray-950 via-gray-900 to-black" 
          : "bg-gradient-to-br from-gray-100 via-white to-gray-50"
      )} />
      
      {/* Overlay gradient with parallax effect */}
      <motion.div 
        className={cn(
          "absolute inset-0",
          isDarkMode 
            ? "bg-gradient-to-tr from-blue-950/30 via-indigo-950/20 to-purple-950/30" 
            : "bg-gradient-to-tr from-blue-100/50 via-indigo-100/30 to-purple-100/50"
        )}
        style={{
          backgroundPosition: `${scrollY * 0.05}% ${scrollY * 0.05}%`
        }}
      />
      
      {/* Noise texture for a more natural feel */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />
      
      {/* Gradient mesh - subtle overlay */}
      <div className={cn(
        "absolute inset-0 opacity-30",
        isDarkMode 
          ? "bg-[radial-gradient(at_top_left,rgba(30,60,140,0.15),transparent_50%),radial-gradient(at_bottom_right,rgba(120,40,200,0.15),transparent_50%)]" 
          : "bg-[radial-gradient(at_top_left,rgba(70,130,255,0.1),transparent_50%),radial-gradient(at_bottom_right,rgba(180,100,255,0.1),transparent_50%)]"
      )} />
      
      {/* Light rays effect */}
      <motion.div 
        className={cn(
          "absolute inset-0 opacity-20",
          isDarkMode 
            ? "bg-[conic-gradient(from_0deg_at_50%_-10%,transparent_60%,rgba(100,100,255,0.2)_75%,transparent_80%)]" 
            : "bg-[conic-gradient(from_0deg_at_50%_-10%,transparent_60%,rgba(150,150,255,0.15)_75%,transparent_80%)]"
        )}
        style={{
          transform: `translateY(${scrollY * 0.1}px) scale(${1 + scrollY * 0.0002})`,
        }}
      />
      
      {/* Stars/particles for dark mode only */}
      {isDarkMode && (
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle at center, white 0.1px, transparent 0.5px)',
            backgroundSize: '20px 20px',
            transform: `translateY(${-scrollY * 0.05}px)`,
          }}
        />
      )}
      
      {/* Very subtle vignette */}
      <div className={cn(
        "absolute inset-0",
        "bg-[radial-gradient(ellipse_at_center,transparent_65%,rgba(0,0,0,0.2)_100%)]",
        isDarkMode ? "opacity-80" : "opacity-30"
      )} />
    </div>
  );
};

export default ARBackground;
