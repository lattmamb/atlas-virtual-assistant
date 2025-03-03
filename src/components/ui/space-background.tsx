
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SpaceBackgroundProps {
  className?: string;
}

const SpaceBackground: React.FC<SpaceBackgroundProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
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
    const stars: {x: number, y: number, radius: number, opacity: number, speed: number}[] = [];
    for (let i = 0; i < 300; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        opacity: Math.random(),
        speed: Math.random() * 0.05
      });
    }
    
    // Create nebulas
    const nebulas = [
      { x: canvas.width * 0.2, y: canvas.height * 0.3, radius: 200, color: 'rgba(75, 0, 130, 0.1)' },
      { x: canvas.width * 0.8, y: canvas.height * 0.7, radius: 250, color: 'rgba(138, 43, 226, 0.05)' },
      { x: canvas.width * 0.5, y: canvas.height * 0.2, radius: 300, color: 'rgba(0, 0, 255, 0.03)' }
    ];
    
    // Animation loop
    let animationFrameId: number;
    
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw space background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0D0015');
      gradient.addColorStop(1, '#1A1A2E');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw nebulas
      nebulas.forEach(nebula => {
        const nebulaGradient = ctx.createRadialGradient(
          nebula.x, nebula.y, 0, 
          nebula.x, nebula.y, nebula.radius
        );
        nebulaGradient.addColorStop(0, nebula.color);
        nebulaGradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = nebulaGradient;
        ctx.beginPath();
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Draw stars
      stars.forEach(star => {
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none z-[-1] ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" />
      
      {/* Additional space elements */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-48 h-48 rounded-full bg-purple-500/5 blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full bg-blue-500/5 blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  );
};

export { SpaceBackground };
