
import React, { useEffect } from 'react';
import { cn } from "@/lib/utils";
import { AtlasLinkProvider } from './atlasLink/AtlasLinkContext';
import { motion } from 'framer-motion';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import AppSidebar from '@/components/AppSidebar';
import IOSStatusBarContent from '@/components/ios/IOSStatusBarContent';
import Sidebar from './atlasLink/Sidebar';
import MainContent from './atlasLink/MainContent';
import MobileNavigation from './atlasLink/MobileNavigation';
import { toast } from 'sonner';

const AtlasLinkContent: React.FC = () => {
  const isMobile = useIsMobile();
  const [activePage, setActivePage] = React.useState("chat");
  
  // Show welcome toast on first load
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('atlas_welcome_seen');
    if (!hasSeenWelcome) {
      setTimeout(() => {
        toast.success("Welcome to Atlas Link", {
          description: "Your AI assistant is ready. Try the celestial mode for an immersive experience!",
          duration: 5000,
        });
        localStorage.setItem('atlas_welcome_seen', 'true');
      }, 1000);
    }
  }, []);
  
  return (
    <motion.div 
      className={cn(
        "h-screen flex flex-col overflow-hidden relative",
        "bg-black text-white"
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* iOS Status Bar */}
      <IOSStatusBarContent isDarkMode={true} />
      
      <SidebarProvider defaultOpen={!isMobile}>
        <div className="flex w-full h-full overflow-hidden pt-11">
          {/* App Navigation Sidebar */}
          <AppSidebar activePage="atlas" />
          
          {/* Atlas Sidebar with controls and settings */}
          <Sidebar 
            activePage={activePage}
            onPageChange={setActivePage}
          />
          
          {/* Main Content */}
          <MainContent />
        </div>
      </SidebarProvider>
      
      {/* Mobile navigation */}
      <MobileNavigation />
      
      {/* iOS Home Indicator */}
      <div className="ios-home-indicator" />
    </motion.div>
  );
};

const AtlasLink: React.FC = () => {
  return (
    <AtlasLinkProvider>
      <AtlasLinkContent />
    </AtlasLinkProvider>
  );
};

export default AtlasLink;
