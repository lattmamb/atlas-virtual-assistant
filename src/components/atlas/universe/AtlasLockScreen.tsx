
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Moon, Sun, Battery, Wifi, Shield } from 'lucide-react';

interface AtlasLockScreenProps {
  onUnlock: () => void;
  theme?: 'dawn' | 'command' | 'warpspace' | 'nebula';
}

const AtlasLockScreen: React.FC<AtlasLockScreenProps> = ({ 
  onUnlock,
  theme = 'command'
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isUnlocking, setIsUnlocking] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  
  // Theme configurations
  const themes = {
    dawn: {
      colors: ['#F5C06D', '#00D8FF'],
      particleSpeed: 0.5,
      background: 'linear-gradient(to bottom, #1A1F2C, #2A3040)'
    },
    command: {
      colors: ['#1C1548', '#E947FF'],
      particleSpeed: 1.2,
      background: 'linear-gradient(to bottom, #0A0A15, #1C1548)'
    },
    warpspace: {
      colors: ['#E947FF', '#FF4500'],
      particleSpeed: 2.0,
      background: 'linear-gradient(to bottom, #190419, #5A0632)'
    },
    nebula: {
      colors: ['#1A237E', '#B39DDB'],
      particleSpeed: 0.3,
      background: 'linear-gradient(to bottom, #0F1135, #1A237E)'
    }
  };
  
  // Particle class for the ambient effect
  class Particle {
    x: number;
    y: number;
    radius: number;
    color: string;
    velocity: { x: number; y: number };
    life: number;
    maxLife: number;
    
    constructor(canvas: HTMLCanvasElement, colors: string[]) {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.radius = Math.random() * 2 + 1;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.velocity = {
        x: (Math.random() - 0.5) * themes[theme].particleSpeed,
        y: (Math.random() - 0.5) * themes[theme].particleSpeed
      };
      this.life = 0;
      this.maxLife = Math.random() * 100 + 100;
    }
    
    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
    
    update(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      
      // Boundary check
      if (this.x < 0 || this.x > canvas.width) this.velocity.x *= -1;
      if (this.y < 0 || this.y > canvas.height) this.velocity.y *= -1;
      
      // Life cycle
      this.life++;
      if (this.life >= this.maxLife) {
        this.life = 0;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
      }
      
      this.draw(ctx);
    }
  }
  
  // Initialize canvas and particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full screen
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    // Create particles
    particlesRef.current = [];
    for (let i = 0; i < 100; i++) {
      particlesRef.current.push(new Particle(canvas, themes[theme].colors));
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        particle.update(canvas, ctx);
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Update time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      clearInterval(timeInterval);
      window.removeEventListener('resize', resize);
    };
  }, [theme]);
  
  // Handle unlock
  const handleUnlock = () => {
    setIsUnlocking(true);
    setTimeout(() => {
      onUnlock();
    }, 700);
  };
  
  // Format time to display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  
  // Format date to display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div 
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{ background: themes[theme].background }}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0"
      />
      
      {/* Status bar */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 py-3 z-10">
        <div className="text-white/80 text-xs">Atlas</div>
        <div className="flex items-center space-x-2">
          <Wifi className="h-4 w-4 text-white/80" />
          <Battery className="h-4 w-4 text-white/80" />
        </div>
      </div>
      
      {/* Time and date */}
      <AnimatePresence>
        {!isUnlocking && (
          <motion.div 
            className="relative z-10 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-6xl font-bold text-white mb-2">
              {formatTime(currentTime)}
            </h1>
            <p className="text-white/80 text-lg mb-6">
              {formatDate(currentTime)}
            </p>
            
            {/* Particle ring */}
            <motion.div 
              className="w-32 h-32 rounded-full relative mx-auto my-6"
              style={{
                background: `radial-gradient(circle, ${themes[theme].colors[0]}40 0%, ${themes[theme].colors[1]}20 70%)`,
                boxShadow: `0 0 40px ${themes[theme].colors[0]}40`
              }}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <motion.div 
                className="absolute inset-0 rounded-full"
                style={{
                  border: `2px solid ${themes[theme].colors[1]}40`,
                }}
                animate={{
                  rotate: 360
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <Shield className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-12 w-12 text-white/90" />
            </motion.div>
            
            {/* Unlock instruction */}
            <motion.p 
              className="text-white/60 text-sm mt-12"
              animate={{
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            >
              Swipe up to unlock
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Swipe area */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1/4 z-20"
        onPan={(e, info) => {
          if (info.offset.y < -50 && !isUnlocking) {
            handleUnlock();
          }
        }}
      />
      
      {/* Time indicator */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center">
        <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-md px-4 py-1.5 rounded-full">
          {currentTime.getHours() < 12 ? (
            <Sun className="h-4 w-4 text-amber-400" />
          ) : (
            <Moon className="h-4 w-4 text-blue-400" />
          )}
          <span className="text-white/80 text-xs">
            {currentTime.getHours() < 12 ? 'Morning' : 'Evening'} Mode
          </span>
        </div>
      </div>
    </div>
  );
};

export default AtlasLockScreen;
