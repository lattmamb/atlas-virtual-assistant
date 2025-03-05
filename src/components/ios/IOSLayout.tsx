
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';
import IOSMainLayout from './IOSMainLayout';

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
    <IOSMainLayout 
      useSplashCursor={true} // Enable for all pages
    >
      <Outlet />
    </IOSMainLayout>
  );
};

export default IOSLayout;
