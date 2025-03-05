
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';
import IOSMainLayout from './IOSMainLayout';

interface IOSLayoutProps {
  useCelestial?: boolean;
}

const IOSLayout: React.FC<IOSLayoutProps> = ({ useCelestial = true }) => {
  const { currentTheme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Automatically set to iOS theme on mobile
  useEffect(() => {
    if (isMobile && currentTheme !== 'ios18') {
      setTheme('ios18');
    }
  }, [isMobile, currentTheme, setTheme]);

  // Determine if current page is the landing/universe page
  const isLandingPage = location.pathname === '/' || location.pathname === '/index' || location.pathname === '/universe';

  return (
    <IOSMainLayout useCelestial={isLandingPage || useCelestial}>
      <Outlet />
    </IOSMainLayout>
  );
};

export default IOSLayout;
