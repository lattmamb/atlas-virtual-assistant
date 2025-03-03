
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

interface AmbientGlowProps {
  aiMode: 'atlas' | 'grok';
  className?: string;
}

const AmbientGlow: React.FC<AmbientGlowProps> = ({ aiMode, className }) => {
  const { isDarkMode } = useTheme();
  
  // Define different glow colors based on AI mode
  const glowColors = {
    atlas: {
      primary: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.15)',
      secondary: isDarkMode ? 'rgba(37, 99, 235, 0.15)' : 'rgba(37, 99, 235, 0.1)',
    },
    grok: {
      primary: isDarkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.15)',
      secondary: isDarkMode ? 'rgba(124, 58, 237, 0.15)' : 'rgba(124, 58, 237, 0.1)',
    }
  };
  
  const currentGlow = glowColors[aiMode];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Top-left glow */}
      <motion.div 
        className="absolute -top-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-60"
        style={{ 
          background: aiMode === 'atlas' 
            ? 'radial-gradient(circle, rgba(59, 130, 246, 0.3), rgba(59, 130, 246, 0.1) 70%)'
            : 'radial-gradient(circle, rgba(139, 92, 246, 0.3), rgba(139, 92, 246, 0.1) 70%)'
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.7, 0.6],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      {/* Bottom-right glow */}
      <motion.div 
        className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-60"
        style={{ 
          background: aiMode === 'atlas' 
            ? 'radial-gradient(circle, rgba(59, 130, 246, 0.4), rgba(37, 99, 235, 0.1) 70%)'
            : 'radial-gradient(circle, rgba(139, 92, 246, 0.4), rgba(124, 58, 237, 0.1) 70%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.5, 0.6],
        }}
        transition={{
          duration: 10,
          delay: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      {/* Center subtle glow */}
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30"
        style={{ 
          background: aiMode === 'atlas' 
            ? `radial-gradient(circle, ${currentGlow.primary}, transparent 70%)`
            : `radial-gradient(circle, ${currentGlow.primary}, transparent 70%)`
        }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  );
};

export default AmbientGlow;
