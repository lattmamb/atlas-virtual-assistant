
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  className?: string;
}

const MotionLink = motion(Link);

export const NavLink: React.FC<NavLinkProps> = ({
  to,
  icon,
  className
}) => {
  const { isDarkMode } = useTheme();
  
  return (
    <MotionLink 
      to={to}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Button 
        variant="ghost" 
        size="icon"
        className={cn(
          "rounded-full w-8 h-8 transition-transform hover:scale-110 active:scale-95 glow-on-hover",
          isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100",
          className
        )}
      >
        {icon}
      </Button>
    </MotionLink>
  );
};
