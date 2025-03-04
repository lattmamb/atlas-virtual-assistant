
"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BackgroundBeamsWithCollisionProps {
  children: React.ReactNode;
  className?: string;
  numParticles?: number;
}

export const BackgroundBeamsWithCollision: React.FC<BackgroundBeamsWithCollisionProps> = ({
  children,
  className,
  numParticles = 20,
}) => {
  const [particles, setParticles] = useState<Array<{
    x: number;
    y: number;
    size: number;
    color: string;
    vx: number;
    vy: number;
    id: number;
  }>>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const { width, height } = container.getBoundingClientRect();
    
    // Initialize particles
    const initialParticles = Array.from({ length: numParticles }).map((_, i) => {
      const colors = [
        "rgba(125, 125, 255, 0.4)",
        "rgba(200, 125, 255, 0.4)",
        "rgba(125, 200, 255, 0.4)",
        "rgba(255, 125, 255, 0.4)",
      ];
      
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        id: i,
      };
    });
    
    setParticles(initialParticles);
    
    const animate = () => {
      setParticles(prevParticles => {
        return prevParticles.map(particle => {
          let { x, y, vx, vy, size } = particle;
          
          // Update position
          x += vx;
          y += vy;
          
          // Bounce off walls
          if (x < 0 || x > width) vx = -vx;
          if (y < 0 || y > height) vy = -vy;
          
          // Check for collisions with other particles
          prevParticles.forEach(other => {
            if (other.id !== particle.id) {
              const dx = other.x - x;
              const dy = other.y - y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              const minDistance = (size + other.size) / 2;
              
              if (distance < minDistance) {
                // Collision response (very simple)
                vx = -vx * 0.8;
                vy = -vy * 0.8;
              }
            }
          });
          
          return { ...particle, x, y, vx, vy };
        });
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [numParticles]);
  
  return (
    <div ref={containerRef} className={cn("relative h-screen w-full overflow-hidden", className)}>
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm dark:bg-black/50" />
      
      {/* Particles Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full blur-xl"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              filter: `blur(${particle.size}px)`,
            }}
            animate={{
              x: particle.x,
              y: particle.y,
              transition: { duration: 0.1, ease: "linear" },
            }}
          />
        ))}
      </div>
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_14px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
