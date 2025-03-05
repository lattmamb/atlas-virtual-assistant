
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { NavItemProps } from './types';

const NavItem: React.FC<NavItemProps> = ({
  icon,
  to,
  onClick,
  className,
  label
}) => {
  const { isDarkMode } = useTheme();
  const MotionLink = motion(Link);
  const MotionButton = motion(Button);
  
  const baseClassName = cn(
    "rounded-full w-8 h-8 transition-transform hover:scale-110 active:scale-95 glow-on-hover",
    isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100",
    className
  );
  
  // If there's a 'to' prop, render a Link, otherwise render a Button
  if (to) {
    return (
      <MotionLink
        to={to}
        aria-label={label}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          variant="ghost"
          size="icon"
          className={baseClassName}
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
      aria-label={label}
      className={baseClassName}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {icon}
    </MotionButton>
  );
};

export default NavItem;
