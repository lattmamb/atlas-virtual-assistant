
import React from 'react';
import { Settings, Info, Command } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAtlasLink } from './AtlasLinkContext';

interface FloatingActionButtonsProps {
  onInfoClick: () => void;
  onCommandClick: () => void;
}

const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({
  onInfoClick,
  onCommandClick,
}) => {
  const { toggleCelestialMode } = useAtlasLink();

  return (
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
        onClick={onInfoClick}
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
        onClick={onCommandClick}
        className="p-3 rounded-full bg-green-500/20 backdrop-blur-lg border border-green-500/30 text-white shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Command className="h-5 w-5" />
      </motion.button>
    </div>
  );
};

export default FloatingActionButtons;
