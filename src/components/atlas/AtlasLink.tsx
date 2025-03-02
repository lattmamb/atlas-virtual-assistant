
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

const AtlasLinkContent: React.FC = () => {
  const { celestialMode } = useAtlasLink();
  
  return (
    <div className={cn("h-screen flex flex-col md:flex-row overflow-hidden relative",
      celestialMode ? "celestial-bg" : "bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-800")}>
      
      {!celestialMode && <RetroGrid className="opacity-30" />}
      {celestialMode && <CelestialEffect />}
      
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <TopBar />
        <TabContent />
        <MobileNavigation />
      </div>
    </div>
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
