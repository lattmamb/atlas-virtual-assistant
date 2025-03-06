
import React from 'react';
import { X, Settings, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { useAtlasLink } from './AtlasLinkContext';

interface CommandMenuProps {
  show: boolean;
  onClose: () => void;
}

const CommandMenu: React.FC<CommandMenuProps> = ({ show, onClose }) => {
  const { isDarkMode, setTheme } = useTheme();
  const { toggleCelestialMode } = useAtlasLink();
  
  if (!show) return null;
  
  return (
    <motion.div
      className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
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
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-2">
          <button
            onClick={() => {
              toggleCelestialMode();
              onClose();
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
              onClose();
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
  );
};

export default CommandMenu;
