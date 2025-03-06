
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { AnimatePresence } from 'framer-motion';
import { useAtlasLink } from './AtlasLinkContext';
import { RetroGrid } from '@/components/ui/retro-grid';
import ChatTab from './ChatTab';
import CelestialEffect from './CelestialEffect';
import FloatingActionButtons from './FloatingActionButtons';
import CommandMenu from './CommandMenu';
import InfoPanel from './InfoPanel';
import AmbientEffect from './AmbientEffect';

const MainContent: React.FC = () => {
  const { celestialMode } = useAtlasLink();
  const [showCommandMenu, setShowCommandMenu] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  
  const handleKeyPress = (e: KeyboardEvent) => {
    // Command/Ctrl + K to toggle command menu
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setShowCommandMenu(prev => !prev);
    }
    
    // Escape to close panels
    if (e.key === 'Escape') {
      if (showCommandMenu) setShowCommandMenu(false);
      if (showInfo) setShowInfo(false);
    }
  };
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showCommandMenu, showInfo]);
  
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative">
      {!celestialMode && (
        <RetroGrid 
          className="opacity-30" 
          angle={55}
        />
      )}
      
      {celestialMode && <CelestialEffect />}
      
      <ChatTab />
      
      <FloatingActionButtons 
        onInfoClick={() => setShowInfo(true)}
        onCommandClick={() => setShowCommandMenu(true)} 
      />
      
      <AnimatePresence>
        <CommandMenu 
          show={showCommandMenu} 
          onClose={() => setShowCommandMenu(false)} 
        />
        
        <InfoPanel 
          show={showInfo} 
          onClose={() => setShowInfo(false)} 
        />
      </AnimatePresence>
      
      <AmbientEffect celestialMode={celestialMode} />
    </div>
  );
};

export default MainContent;
