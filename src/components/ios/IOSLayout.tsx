
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';
import IOSMainLayout from './IOSMainLayout';

const IOSLayout: React.FC = () => {
  const { currentTheme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Automatically set to iOS theme on mobile
  useEffect(() => {
    if (isMobile && currentTheme !== 'ios18') {
      setTheme('ios18');
    }
  }, [isMobile, currentTheme, setTheme]);

  // Determine if we should use the splash cursor based on route
  // Homepage and universe pages get the full immersive experience
  const isHomePage = location.pathname === '/' || location.pathname === '/index' || location.pathname === '/universe';
  
  return (
    <IOSMainLayout 
      useCelestial={true}
      useSplashCursor={isHomePage} // Only use on homepage for better performance on other pages
    >
      <Outlet />
    </IOSMainLayout>
  );
};

export default IOSLayout;
