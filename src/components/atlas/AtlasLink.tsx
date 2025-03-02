
import React from 'react';
import { cn } from "@/lib/utils";
import { AtlasLinkProvider } from './atlasLink/AtlasLinkContext';
import { useAtlasLink } from './atlasLink/AtlasLinkContext';
import CelestialEffect from './atlasLink/CelestialEffect';
import Sidebar from './atlasLink/Sidebar';
import TopBar from './atlasLink/TopBar';
import TabContent from './atlasLink/TabContent';
import MobileNavigation from './atlasLink/MobileNavigation';
import { RetroGrid } from '@/components/ui/retro-grid';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

const AtlasLinkContent: React.FC = () => {
  const { celestialMode } = useAtlasLink();
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div 
      className={cn("h-screen flex flex-col md:flex-row overflow-hidden relative",
        celestialMode ? "celestial-bg" : "bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-800")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      
      {!celestialMode && (
        <RetroGrid 
          className={cn(
            "opacity-20", 
            isDarkMode ? "opacity-30" : "opacity-10"
          )} 
        />
      )}
      
      {celestialMode && <CelestialEffect />}
      
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <TopBar />
        <TabContent />
        <MobileNavigation />
      </div>
      
      {/* Ambient corner glow */}
      {!celestialMode && (
        <>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-transparent to-blue-500/10 rounded-full filter blur-[120px] pointer-events-none opacity-60" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-transparent to-purple-500/10 rounded-full filter blur-[100px] pointer-events-none opacity-50" />
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
