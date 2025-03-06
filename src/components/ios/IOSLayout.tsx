
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';
import IOSMainLayout from './IOSMainLayout';
import IOSMobileNavigation from './IOSMobileNavigation';
import IOSStatusBar from './IOSStatusBar';
import { toast } from 'sonner';

const IOSLayout: React.FC = () => {
  const { currentTheme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  
  // Automatically set to iOS theme on mobile
  useEffect(() => {
    if (isMobile && currentTheme !== 'ios18') {
      setTheme('ios18');
      
      toast.info("iOS Theme Activated", {
        description: "Using iOS theme for optimal mobile experience",
        duration: 3000,
      });
    }
  }, [isMobile, currentTheme, setTheme]);
  
  return (
    <IOSMainLayout 
      useSplashCursor={true} // Enable for all pages
    >
      {/* iOS Status Bar */}
      <IOSStatusBar />
      
      {/* Main Content */}
      <div className="pt-12 pb-24">
        <Outlet />
      </div>
      
      {/* iOS Mobile Navigation */}
      <IOSMobileNavigation />
      
      {/* iOS Home Indicator */}
      <div className="ios-home-indicator" />
    </IOSMainLayout>
  );
};

export default IOSLayout;
