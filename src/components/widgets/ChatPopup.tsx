
import React from 'react';
import { AtlasChatBot } from '@/components/atlas/index';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface ChatPopupProps {
  isDarkMode: boolean;
  onClose?: () => void;
}

const ChatPopup: React.FC<ChatPopupProps> = ({ isDarkMode, onClose }) => {
  return (
    <motion.div 
      className={cn(
        "fixed bottom-20 right-4 z-40 w-80 md:w-96 h-96 shadow-2xl rounded-2xl overflow-hidden",
        isDarkMode 
          ? "backdrop-blur-xl border border-white/10 bg-[#1a1a1a]/90"
          : "backdrop-blur-xl border border-black/10 bg-white/90",
        "glossy subtle-shadow"
      )}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 25 
      }}
    >
      {onClose && (
        <motion.button
          className="absolute top-2 right-2 z-50 p-1 rounded-full bg-gray-200 text-gray-700 
                    hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="h-4 w-4" />
        </motion.button>
      )}
      <AtlasChatBot />
    </motion.div>
  );
};

export default ChatPopup;
