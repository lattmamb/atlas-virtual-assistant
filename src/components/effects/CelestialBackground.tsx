
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDuration: number;
}

interface Nebula {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
}

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  length: number;
  speed: number;
  delay: number;
}

const CelestialBackground: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [nebulas, setNebulas] = useState<Nebula[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  
  useEffect(() => {
    // Generate random stars
    const generateStars = () => {
      const newStars: Star[] = [];
      const count = Math.floor(window.innerWidth * window.innerHeight / 10000);
      
      for (let i = 0; i < count; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          animationDuration: Math.random() * 8 + 2,
        });
      }
      
      setStars(newStars);
    };

    // Generate nebulas
    const generateNebulas = () => {
      const newNebulas: Nebula[] = [];
      const nebulaColors = [
        'rgba(70, 100, 255, 0.15)',
        'rgba(255, 100, 100, 0.1)',
        'rgba(180, 100, 255, 0.12)',
        'rgba(100, 200, 255, 0.13)',
        'rgba(255, 180, 100, 0.08)'
      ];
      
      for (let i = 0; i < 5; i++) {
        newNebulas.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 400 + 300,
          color: nebulaColors[i % nebulaColors.length],
          opacity: Math.random() * 0.2 + 0.1
        });
      }
      
      setNebulas(newNebulas);
    };

    // Generate shooting stars
    const generateShootingStars = () => {
      const newShootingStars: ShootingStar[] = [];
      
      for (let i = 0; i < 3; i++) {
        newShootingStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 50,
          length: Math.random() * 30 + 20,
          speed: Math.random() * 3 + 2,
          delay: Math.random() * 10
        });
      }
      
      setShootingStars(newShootingStars);
    };
    
    generateStars();
    generateNebulas();
    generateShootingStars();
    
    // Regenerate elements on window resize
    window.addEventListener('resize', () => {
      generateStars();
      generateNebulas();
      generateShootingStars();
    });
    
    return () => window.removeEventListener('resize', generateStars);
  }, []);
  
  return (
    <div className="celestial-bg fixed inset-0 z-0 overflow-hidden">
      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
          }}
          animate={{
            opacity: [star.opacity, star.opacity + 0.3, star.opacity],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.animationDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Nebulas */}
      {nebulas.map((nebula) => (
        <motion.div
          key={nebula.id}
          className="nebula"
          style={{
            left: `${nebula.x}%`,
            top: `${nebula.y}%`,
            width: `${nebula.size}px`,
            height: `${nebula.size}px`,
            background: `radial-gradient(ellipse at center, ${nebula.color}, transparent 70%)`,
            opacity: nebula.opacity,
          }}
          animate={{
            opacity: [nebula.opacity, nebula.opacity * 1.3, nebula.opacity],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Shooting stars */}
      {shootingStars.map((shootingStar) => (
        <motion.div
          key={shootingStar.id}
          className="shooting-star"
          style={{
            left: `${shootingStar.x}%`,
            top: `${shootingStar.y}%`,
            width: `${shootingStar.length}px`,
          }}
          animate={{
            x: [0, 200],
            y: [0, 200],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: shootingStar.speed,
            repeat: Infinity,
            delay: shootingStar.delay,
            repeatDelay: 10,
          }}
        />
      ))}
      
      {/* Base gradients for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-purple-900/5 mix-blend-screen" />
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-transparent to-slate-950" />
      
      {/* Space dust particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="space-dust"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 2}px`,
            height: `${Math.random() * 2}px`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
};

export default CelestialBackground;
