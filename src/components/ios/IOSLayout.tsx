
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import IOSStatusBar from './IOSStatusBar';
import IOSMobileNavigation from './IOSMobileNavigation';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const IOSLayout: React.FC = () => {
  const { currentTheme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  
  // Automatically set to iOS theme on mobile
  useEffect(() => {
    if (isMobile && currentTheme !== 'ios18') {
      setTheme('ios18');
    }
  }, [isMobile, currentTheme, setTheme]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000B1E] to-[#001E3C] text-white">
      <IOSStatusBar />
      
      <main className={cn(
        "pt-12 pb-20",
        // Add the HeroParallax styling for consistent immersive feel
        "h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto",
        "[perspective:1000px] [transform-style:preserve-3d]"
      )}>
        <Outlet />
      </main>
      
      <IOSMobileNavigation />
    </div>
  );
};

export default IOSLayout;
