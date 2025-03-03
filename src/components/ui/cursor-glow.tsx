
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CursorGlow: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-screen"
      animate={{
        x: mousePosition.x - 20,
        y: mousePosition.y - 20,
        opacity: isVisible ? 1 : 0
      }}
      transition={{
        x: { type: 'spring', stiffness: 500, damping: 30 },
        y: { type: 'spring', stiffness: 500, damping: 30 },
        opacity: { duration: 0.2 }
      }}
    >
      <div className="w-10 h-10 rounded-full relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-50 blur-md" />
        <div className="absolute inset-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70 blur-sm" />
        <div className="absolute inset-2 rounded-full bg-white opacity-30" />
      </div>
    </motion.div>
  );
};

export { CursorGlow };
