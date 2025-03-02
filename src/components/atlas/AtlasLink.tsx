
import React from 'react';
import { cn } from "@/lib/utils";
import { AtlasLinkProvider } from './atlasLink/AtlasLinkContext';
import { useAtlasLink } from './atlasLink/AtlasLinkContext';
import CelestialEffect from './atlasLink/CelestialEffect';
import Sidebar from './atlasLink/Sidebar';
import TopBar from './atlasLink/TopBar';
import TabContent from './atlasLink/TabContent';
import MobileNavigation from './atlasLink/MobileNavigation';

const AtlasLinkContent: React.FC = () => {
  const { celestialMode } = useAtlasLink();
  
  return (
    <div className={cn("h-screen flex flex-col md:flex-row overflow-hidden", 
      celestialMode ? "celestial-bg" : "bg-gradient-to-br from-blue-50 to-slate-100")}>
      
      <CelestialEffect />
      
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
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
