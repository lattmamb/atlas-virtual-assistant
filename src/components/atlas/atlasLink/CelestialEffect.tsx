
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAtlasLink } from './AtlasLinkContext';
import { cn } from '@/lib/utils';

const CelestialEffect: React.FC = () => {
  const { celestialMode } = useAtlasLink();
  
  useEffect(() => {
    if (celestialMode) {
      generateStars();
    }
  }, [celestialMode]);
  
  const generateStars = () => {
    const starsContainer = document.getElementById('starsContainer');
    if (!starsContainer) return;
    
    starsContainer.innerHTML = '';
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.width = `${Math.random() * 3 + 1}px`;
      star.style.height = star.style.width;
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      star.style.opacity = `${Math.random() * 0.8 + 0.2}`;
      starsContainer.appendChild(star);
    }
  };

  if (!celestialMode) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <div id="starsContainer" className="absolute inset-0 pointer-events-none z-0"></div>
      
      {/* Add Apple-inspired floating elements */}
      <motion.div
        className={cn(
          "absolute top-1/4 left-1/4 w-60 h-60 rounded-full",
          "bg-gradient-to-br from-blue-400 to-purple-500 opacity-20 blur-3xl"
        )}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      <motion.div
        className={cn(
          "absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full",
          "bg-gradient-to-tr from-purple-500 to-pink-400 opacity-15 blur-3xl"
        )}
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  );
};

export default CelestialEffect;
