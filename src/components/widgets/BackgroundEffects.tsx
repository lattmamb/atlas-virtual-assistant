
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface BackgroundEffectsProps {
  currentTheme: string;
}

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ currentTheme }) => {
  return (
    <>
      {/* Background base */}
      <motion.div 
        className="fixed inset-0 z-0 transition-all duration-700"
        style={{ background: `var(--background-gradient)` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      />
      
      {/* Ambient glow effects */}
      <motion.div 
        className="fixed top-0 right-0 w-[40vw] h-[40vw] -z-10 transition-all duration-700" 
        style={{ 
          background: `radial-gradient(circle, var(--accent-color) 0%, transparent 70%)`,
          opacity: 0.1,
          filter: 'blur(120px)'
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      />
      
      <motion.div 
        className="fixed bottom-0 left-10 w-[30vw] h-[30vw] -z-10 transition-all duration-700"
        style={{ 
          background: `radial-gradient(circle, var(--secondary-color) 0%, transparent 70%)`,
          opacity: 0.05,
          filter: 'blur(100px)'
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      
      {/* Grid overlay */}
      <motion.div 
        className={cn(
          "fixed inset-0 z-0 opacity-10 pointer-events-none",
          "bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)]",
          "bg-[size:4rem_4rem]"
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 0.7, delay: 0.7 }}
      />
    </>
  );
};

export default BackgroundEffects;
