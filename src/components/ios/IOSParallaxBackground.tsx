
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import SplashCursor from '@/components/effects/SplashCursor';

interface IOSParallaxBackgroundProps {
  className?: string;
  children?: ReactNode;
  useSplashCursor?: boolean;
}

const IOSParallaxBackground: React.FC<IOSParallaxBackgroundProps> = ({ 
  className,
  children,
  useSplashCursor = true
}) => {
  return (
    <div className={cn(
      "h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto",
      className
    )}>
      {useSplashCursor && (
        <SplashCursor 
          BACK_COLOR={{ r: 0.0, g: 0.0, b: 0.15 }}
          SPLAT_RADIUS={0.25}
          DENSITY_DISSIPATION={3.0}
          TRANSPARENT={true}
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default IOSParallaxBackground;
