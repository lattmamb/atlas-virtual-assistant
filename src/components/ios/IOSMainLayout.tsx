
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import IOSStatusBar from './IOSStatusBar';
import IOSMobileNavigation from './IOSMobileNavigation';
import IOSParallaxBackground from './IOSParallaxBackground';

interface IOSMainLayoutProps {
  children: ReactNode;
  className?: string;
  useCelestial?: boolean;
}

const IOSMainLayout: React.FC<IOSMainLayoutProps> = ({ 
  children,
  className,
  useCelestial = true
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000B1E] to-[#001E3C] text-white">
      <IOSStatusBar />
      
      <IOSParallaxBackground useCelestialBackground={useCelestial}>
        <main className={cn(
          "pt-12 pb-20 relative z-10",
          className
        )}>
          {children}
        </main>
      </IOSParallaxBackground>
      
      <IOSMobileNavigation />
    </div>
  );
};

export default IOSMainLayout;
