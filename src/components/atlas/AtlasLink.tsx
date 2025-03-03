
import React from 'react';
import { cn } from "@/lib/utils";
import { AtlasLinkProvider } from './atlasLink/AtlasLinkContext';
import { useAtlasLink } from './atlasLink/AtlasLinkContext';
import CelestialEffect from './atlasLink/CelestialEffect';
import Sidebar from './atlasLink/Sidebar';
import ChatTab from './atlasLink/ChatTab';
import MobileNavigation from './atlasLink/MobileNavigation';
import { RetroGrid } from '@/components/ui/retro-grid';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

const AtlasLinkContent: React.FC = () => {
  const { celestialMode } = useAtlasLink();
  const { isDarkMode } = useTheme();
  const isMobile = useIsMobile();
  
  return (
    <motion.div 
      className={cn(
        "h-full flex flex-col overflow-hidden relative",
        "bg-black text-white"
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {!celestialMode && (
        <RetroGrid 
          className="opacity-30" 
          angle={55}
        />
      )}
      
      {celestialMode && <CelestialEffect />}
      
      <SidebarProvider defaultOpen={!isMobile}>
        <div className="flex w-full h-full overflow-hidden">
          {/* Atlas Sidebar with controls and settings */}
          <Sidebar />
          
          {/* Main Content - Just the Chat Interface */}
          <div className="flex-1 flex flex-col h-full overflow-hidden relative">
            <ChatTab />
          </div>
        </div>
      </SidebarProvider>
      
      {/* Mobile navigation */}
      <MobileNavigation />
      
      {/* Ambient corner glow */}
      {!celestialMode && (
        <>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-transparent to-blue-500/10 rounded-full filter blur-[120px] pointer-events-none opacity-30" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-transparent to-purple-500/10 rounded-full filter blur-[100px] pointer-events-none opacity-30" />
        </>
      )}
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
