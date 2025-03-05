
import React from 'react';
import { cn } from '@/lib/utils';

interface IOSParallaxBackgroundProps {
  className?: string;
}

const IOSParallaxBackground: React.FC<IOSParallaxBackgroundProps> = ({ 
  className 
}) => {
  return (
    <div className={cn(
      // HeroParallax styling for consistent immersive feel
      "h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto",
      "[perspective:1000px] [transform-style:preserve-3d]",
      className
    )}>
    </div>
  );
};

export default IOSParallaxBackground;
