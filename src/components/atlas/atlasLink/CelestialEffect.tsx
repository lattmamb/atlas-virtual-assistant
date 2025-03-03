
import React, { useEffect } from 'react';
import { useAtlasLink } from './AtlasLinkContext';
import { motion } from 'framer-motion';

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
    for (let i = 0; i < 50; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.width = `${Math.random() * 3 + 1}px`;
      star.style.height = star.style.width;
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      starsContainer.appendChild(star);
    }
  };

  if (!celestialMode) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div id="starsContainer" className="absolute inset-0 pointer-events-none z-0"></div>
      
      {/* Apple-inspired animated effects */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[20%] left-[30%] w-[300px] h-[300px] rounded-full bg-gradient-radial from-blue-500/30 to-transparent blur-3xl"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] rounded-full bg-gradient-radial from-purple-500/20 to-transparent blur-3xl"
      />
      
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse",
        }}
        className="absolute top-[40%] right-[30%] w-[200px] h-[200px] rounded-full bg-gradient-radial from-cyan-500/30 to-transparent blur-3xl"
      />
    </div>
  );
};

export default CelestialEffect;
