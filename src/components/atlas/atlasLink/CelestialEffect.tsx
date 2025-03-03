
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAtlasLink } from './AtlasLinkContext';
import { cn } from '@/lib/utils';

const CelestialEffect: React.FC = () => {
  const { celestialMode } = useAtlasLink();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!celestialMode) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create stars
    const stars: {x: number, y: number, size: number, opacity: number, speed: number}[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        opacity: Math.random(),
        speed: Math.random() * 0.05
      });
    }
    
    // Animation loop
    let animationFrameId: number;
    
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw space background
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      stars.forEach(star => {
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        
        const twinkle = 0.5 + Math.sin(Date.now() / 1000 + star.x) * 0.5;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [celestialMode]);
  
  if (!celestialMode) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Add Apple-inspired floating elements */}
      <motion.div
        className={cn(
          "absolute top-1/4 left-1/4 w-80 h-80 rounded-full",
          "bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-20 blur-3xl"
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
          "absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full",
          "bg-gradient-to-tr from-purple-500/20 to-pink-400/20 opacity-15 blur-3xl"
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
      
      <motion.div
        className={cn(
          "absolute top-1/2 left-1/2 w-64 h-64 rounded-full -translate-x-1/2 -translate-y-1/2",
          "bg-gradient-to-tr from-blue-400/10 to-teal-400/10 opacity-10 blur-3xl"
        )}
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  );
};

export default CelestialEffect;
