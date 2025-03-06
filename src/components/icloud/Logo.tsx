
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Cloud, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface LogoProps {
  variant?: 'default' | 'ios18';
}

const MotionLink = motion(Link);

const Logo: React.FC<LogoProps> = ({ variant = 'default' }) => {
  const isIOS18 = variant === 'ios18';
  
  if (isIOS18) {
    return (
      <MotionLink 
        to="/" 
        className="flex items-center group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative w-6 h-6 mr-2 flex items-center justify-center">
          <Cloud 
            className="absolute h-5 w-5 transition-all duration-500 text-blue-400 group-hover:scale-110" 
          />
        </div>
        <span className="font-medium hidden sm:inline text-white">
          Atlas
        </span>
      </MotionLink>
    );
  }
  
  return (
    <MotionLink 
      to="/" 
      className="flex items-center group perspective-tilt"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative w-6 h-6 mr-2 flex items-center justify-center">
        <Cloud 
          className={cn(
            "absolute h-5 w-5 transition-all duration-500 text-blue-400",
            "group-hover:scale-110 group-hover:rotate-[360deg]"
          )} 
        />
        <Sparkles className="absolute h-3 w-3 bottom-[1px] right-[1px] text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <span className="font-medium hidden sm:inline transition-colors group-hover:text-blue-400 group-hover:animated-gradient-text">
        Atlas Assistant
      </span>
    </MotionLink>
  );
};

export default Logo;
