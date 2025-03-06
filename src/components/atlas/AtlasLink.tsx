
import React, { useState } from 'react';
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
import { useIsMobile } from '@/hooks/use-mobile';

const AtlasLinkContent: React.FC = () => {
  const { celestialMode } = useAtlasLink();
  const { isDarkMode } = useTheme();
  const isMobile = useIsMobile();
  const [activePage, setActivePage] = useState("chat");
  
  return (
    <motion.div 
      className={cn(
        "h-full flex flex-col overflow-hidden relative interactive-element content-area",
        "bg-black text-white rounded-xl"
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
      
      <div className="flex flex-col md:flex-row w-full h-full overflow-hidden">
        {/* Atlas Sidebar with controls and settings */}
        <Sidebar 
          activePage={activePage}
          onPageChange={setActivePage}
        />
        
        {/* Main Content - Just the Chat Interface */}
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          <ChatTab />
        </div>
      </div>
      
      {/* Mobile navigation */}
      {isMobile && <MobileNavigation />}
      
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
