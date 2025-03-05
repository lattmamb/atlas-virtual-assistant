
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ExploreHeroParallaxProps {
  title: string;
  subtitle: string;
  background: string;
  parallaxStrength: number;
}

const ExploreHeroParallax: React.FC<ExploreHeroParallaxProps> = ({
  title,
  subtitle,
  parallaxStrength
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 30, bounce: 0 };

  // Create parallax effects
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, parallaxStrength * 10]),
    springConfig
  );
  
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [1, 0]),
    springConfig
  );
  
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [1, 0.9]),
    springConfig
  );

  // Particle animation for background
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10
  }));

  return (
    <div 
      ref={ref} 
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Dynamic gradient background with particles */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] to-[#121212] z-0" />
      
      {/* Animated particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white opacity-30 z-10"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            x: [
              Math.random() * 50 - 25,
              Math.random() * 50 - 25,
              Math.random() * 50 - 25,
            ],
            y: [
              Math.random() * 50 - 25,
              Math.random() * 50 - 25,
              Math.random() * 50 - 25,
            ],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
      
      {/* Glow effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#ff0040] opacity-10 blur-[100px] z-0" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#0ea5e9] opacity-10 blur-[100px] z-0" />
      
      {/* Content */}
      <motion.div 
        className="relative z-20 flex flex-col items-center justify-center h-full w-full px-4 text-center"
        style={{ y, opacity, scale }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {title}
        </motion.h1>
        
        <motion.p
          className="max-w-2xl text-lg sm:text-xl text-white/80 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <motion.div
            className="w-8 h-14 border-2 border-white/30 rounded-full flex justify-center p-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
          >
            <motion.div
              className="w-1 h-3 bg-white/50 rounded-full"
              animate={{ height: [12, 6, 12], opacity: [0.5, 0.2, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ExploreHeroParallax;
