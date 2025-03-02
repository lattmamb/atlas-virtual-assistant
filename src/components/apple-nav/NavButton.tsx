
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from '@/context/ThemeContext';
import { NavButtonProps } from './types';

const NavButton: React.FC<NavButtonProps> = ({ 
  icon, 
  onClick, 
  to, 
  className 
}) => {
  const { isDarkMode } = useTheme();
  const MotionButton = motion(Button);
  const MotionLink = motion(Link);

  const buttonClasses = cn(
    "rounded-full w-8 h-8 glow-on-hover",
    isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100",
    className
  );

  const motionProps = {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 }
  };

  if (to) {
    return (
      <MotionLink to={to} {...motionProps}>
        <Button 
          variant="ghost" 
          size="icon"
          className={buttonClasses}
        >
          {icon}
        </Button>
      </MotionLink>
    );
  }

  return (
    <MotionButton 
      variant="ghost" 
      size="icon"
      onClick={onClick}
      className={buttonClasses}
      {...motionProps}
    >
      {icon}
    </MotionButton>
  );
};

export default NavButton;
