
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AtlasParticleCoreProps {
  size?: number;
  density?: number;
  speed?: number;
  colors?: string[];
  pulseEffect?: boolean;
}

const AtlasParticleCore: React.FC<AtlasParticleCoreProps> = ({
  size = 200,
  density = 50,
  speed = 1,
  colors = ['#0A84FF', '#E947FF'],
  pulseEffect = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);
  const animationRef = useRef<number>(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = size;
    canvas.height = size;
    
    // Center coordinates
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Create particles
    class Particle {
      x: number;
      y: number;
      radius: number;
      color: string;
      angle: number;
      distance: number;
      orbitSpeed: number;
      
      constructor() {
        this.angle = Math.random() * Math.PI * 2;
        this.distance = (Math.random() * size / 2.5) + 10;
        this.x = centerX + Math.cos(this.angle) * this.distance;
        this.y = centerY + Math.sin(this.angle) * this.distance;
        this.radius = Math.random() * 2 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.orbitSpeed = (Math.random() * 0.002 + 0.001) * speed;
      }
      
      update() {
        // Orbital motion
        this.angle += this.orbitSpeed;
        this.x = centerX + Math.cos(this.angle) * this.distance;
        this.y = centerY + Math.sin(this.angle) * this.distance;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      }
    }
    
    // Initialize particles
    particlesRef.current = [];
    for (let i = 0; i < density; i++) {
      particlesRef.current.push(new Particle());
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw core glow
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, size / 3);
      gradient.addColorStop(0, `${colors[0]}60`);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update particles
      particlesRef.current.forEach(particle => {
        particle.update();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [size, density, speed, colors]);
  
  return (
    <motion.div
      className="relative"
      animate={pulseEffect ? {
        scale: [1, 1.05, 1]
      } : {}}
      transition={pulseEffect ? {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse"
      } : {}}
      style={{ width: size, height: size }}
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0"
        width={size}
        height={size}
      />
    </motion.div>
  );
};

export default AtlasParticleCore;
