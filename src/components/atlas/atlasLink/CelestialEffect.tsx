
import React, { useEffect } from 'react';
import { useAtlasLink } from './AtlasLinkContext';

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

  return <div id="starsContainer" className="absolute inset-0 pointer-events-none z-0"></div>;
};

export default CelestialEffect;
