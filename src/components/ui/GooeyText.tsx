
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface GooeyTextProps {
  text: string;
  className?: string;
  duration?: number;
}

export const GooeyText: React.FC<GooeyTextProps> = ({ 
  text, 
  className,
  duration = 0.5 
}) => {
  const [currentText, setCurrentText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (text !== currentText) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setCurrentText(text);
        setIsAnimating(false);
      }, duration * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [text, currentText, duration]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentText}
        className={cn("relative inline-block overflow-hidden", className)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ 
          duration: duration * 0.5,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {currentText}
        <div 
          className="absolute inset-0 bg-background/50 backdrop-blur-sm rounded-sm opacity-0"
          style={{ 
            opacity: isAnimating ? 0.5 : 0, 
            transition: `opacity ${duration * 0.3}s ease-in-out`
          }} 
        />
      </motion.div>
    </AnimatePresence>
  );
};
