
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import IOSStatusBar from './IOSStatusBar';
import IOSMobileNavigation from './IOSMobileNavigation';
import IOSParallaxBackground from './IOSParallaxBackground';

interface IOSMainLayoutProps {
  children: ReactNode;
  className?: string;
  useSplashCursor?: boolean;
}

const IOSMainLayout: React.FC<IOSMainLayoutProps> = ({ 
  children,
  className,
  useSplashCursor = true
}) => {
  return (
    <div className="min-h-screen text-white">
      <IOSStatusBar />
      
      <IOSParallaxBackground 
        useSplashCursor={useSplashCursor}
      >
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
