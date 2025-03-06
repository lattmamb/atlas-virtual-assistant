
import React from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

interface InfoPanelProps {
  show: boolean;
  onClose: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ show, onClose }) => {
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
          <span className="font-medium">About Atlas Link</span>
          <button 
            onClick={onClose}
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
  );
};

export default InfoPanel;
