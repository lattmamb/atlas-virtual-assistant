
import React from 'react';
import { cn } from "@/lib/utils";
import { Grid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface GridButtonProps {
  onToggleAppGrid?: () => void;
  isDarkMode: boolean;
  variant?: 'default' | 'ios18';
}

const MotionButton = motion(Button);

const GridButton: React.FC<GridButtonProps> = ({ 
  onToggleAppGrid, 
  isDarkMode,
  variant = 'default'
}) => {
  const isIOS18 = variant === 'ios18';
  
  if (!onToggleAppGrid) return null;
  
  if (isIOS18) {
    return (
      <MotionButton 
        variant="ghost" 
        size="icon"
        onClick={onToggleAppGrid}
        className={cn(
          "rounded-full w-8 h-8",
          "hover:bg-white/10"
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Grid className="h-4 w-4" />
      </MotionButton>
    );
  }
  
  return (
    <MotionButton 
      variant="ghost" 
      size="icon"
      onClick={onToggleAppGrid}
      className={cn(
        "rounded-full w-8 h-8 transition-transform hover:scale-110 active:scale-95 glow-on-hover",
        isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Grid className="h-4 w-4" />
    </MotionButton>
  );
};

export default GridButton;
