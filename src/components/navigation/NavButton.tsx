
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

interface NavButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const MotionButton = motion(Button);

export const NavButton: React.FC<NavButtonProps> = ({
  icon,
  onClick,
  className
}) => {
  const { isDarkMode } = useTheme();
  
  return (
    <MotionButton 
      variant="ghost" 
      size="icon"
      onClick={onClick}
      className={cn(
        "rounded-full w-8 h-8 glow-on-hover",
        isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100",
        className
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {icon}
    </MotionButton>
  );
};
