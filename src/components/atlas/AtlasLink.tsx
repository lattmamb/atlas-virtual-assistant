
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { AtlasLinkProvider } from './atlasLink/AtlasLinkContext';
import { useAtlasLink } from './atlasLink/AtlasLinkContext';
import CelestialEffect from './atlasLink/CelestialEffect';
import Sidebar from './atlasLink/Sidebar';
import ChatTab from './atlasLink/ChatTab';
import MobileNavigation from './atlasLink/MobileNavigation';
import { RetroGrid } from '@/components/ui/retro-grid';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import AppSidebar from '@/components/AppSidebar';
import IOSStatusBarContent from '@/components/ios/IOSStatusBarContent';
import { Settings, Info, Command, Menu, X } from 'lucide-react';
import { toast } from 'sonner';

const AtlasLinkContent: React.FC = () => {
  const { celestialMode, toggleCelestialMode } = useAtlasLink();
  const { isDarkMode, setTheme } = useTheme();
  const isMobile = useIsMobile();
  const [activePage, setActivePage] = useState("chat");
  const [showCommandMenu, setShowCommandMenu] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  
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
      
      {!celestialMode && (
        <RetroGrid 
          className="opacity-30" 
          angle={55}
        />
      )}
      
      {celestialMode && <CelestialEffect />}
      
      <SidebarProvider defaultOpen={!isMobile}>
        <div className="flex w-full h-full overflow-hidden pt-11">
          {/* App Navigation Sidebar */}
          <AppSidebar activePage="atlas" />
          
          {/* Atlas Sidebar with controls and settings */}
          <Sidebar 
            activePage={activePage}
            onPageChange={setActivePage}
          />
          
          {/* Main Content - Just the Chat Interface */}
          <div className="flex-1 flex flex-col h-full overflow-hidden relative">
            <ChatTab />
            
            {/* Floating action buttons */}
            <div className="absolute bottom-20 right-4 flex flex-col gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleCelestialMode}
                className="p-3 rounded-full bg-blue-500/20 backdrop-blur-lg border border-blue-500/30 text-white shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Settings className="h-5 w-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowInfo(true)}
                className="p-3 rounded-full bg-purple-500/20 backdrop-blur-lg border border-purple-500/30 text-white shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Info className="h-5 w-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCommandMenu(true)}
                className="p-3 rounded-full bg-green-500/20 backdrop-blur-lg border border-green-500/30 text-white shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Command className="h-5 w-5" />
              </motion.button>
            </div>
            
            {/* Command menu */}
            <AnimatePresence>
              {showCommandMenu && (
                <motion.div
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowCommandMenu(false)}
                >
                  <motion.div
                    className="w-full max-w-md bg-black/90 border border-white/20 rounded-lg shadow-2xl overflow-hidden"
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <span className="font-medium">Command Menu</span>
                      <button 
                        onClick={() => setShowCommandMenu(false)}
                        className="p-1 rounded-full hover:bg-white/10 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => {
                          toggleCelestialMode();
                          setShowCommandMenu(false);
                        }}
                        className="w-full text-left p-3 rounded-md hover:bg-white/10 transition-colors flex items-center gap-3"
                      >
                        <div className="p-2 rounded-full bg-blue-500/20">
                          <Settings className="h-4 w-4 text-blue-400" />
                        </div>
                        <div>
                          <div className="font-medium">Toggle Celestial Mode</div>
                          <div className="text-xs text-gray-400">Change the visual experience</div>
                        </div>
                      </button>
                      
                      <button
                        onClick={() => {
                          setTheme(isDarkMode ? 'light' : 'dark');
                          setShowCommandMenu(false);
                        }}
                        className="w-full text-left p-3 rounded-md hover:bg-white/10 transition-colors flex items-center gap-3"
                      >
                        <div className="p-2 rounded-full bg-purple-500/20">
                          <Menu className="h-4 w-4 text-purple-400" />
                        </div>
                        <div>
                          <div className="font-medium">Toggle Theme</div>
                          <div className="text-xs text-gray-400">Switch between light and dark mode</div>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Info panel */}
            <AnimatePresence>
              {showInfo && (
                <motion.div
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowInfo(false)}
                >
                  <motion.div
                    className="w-full max-w-md bg-black/90 border border-white/20 rounded-lg shadow-2xl overflow-hidden"
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <span className="font-medium">About Atlas Link</span>
                      <button 
                        onClick={() => setShowInfo(false)}
                        className="p-1 rounded-full hover:bg-white/10 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="p-4 space-y-4">
                      <p className="text-sm text-gray-300">
                        Atlas Link is an AI assistant with an iCloud-inspired interface. It provides:
                      </p>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="h-5 w-5 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">•</span>
                          <span>AI-powered chat assistance</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-5 w-5 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">•</span>
                          <span>Immersive celestial mode for a unique experience</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-5 w-5 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">•</span>
                          <span>Workflow automation capabilities</span>
                        </li>
                      </ul>
                      <p className="text-sm text-gray-300 mt-4">
                        Press <kbd className="px-2 py-1 bg-black/50 border border-white/20 rounded text-xs">Cmd/Ctrl+K</kbd> anytime to access the command menu.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
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
