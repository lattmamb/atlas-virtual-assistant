
import React from 'react';
import { AtlasChatBot } from '@/components/atlas/index';
import { cn } from '@/lib/utils';

interface ChatPopupProps {
  isDarkMode: boolean;
}

const ChatPopup: React.FC<ChatPopupProps> = ({ isDarkMode }) => {
  return (
    <div className={cn(
      "fixed bottom-20 right-4 z-40 w-80 md:w-96 h-96 shadow-2xl rounded-2xl overflow-hidden animate-fade-in",
      isDarkMode 
        ? "backdrop-blur-xl border border-white/10 bg-[#1a1a1a]/90"
        : "backdrop-blur-xl border border-black/10 bg-white/90",
    )}>
      <AtlasChatBot />
    </div>
  );
};

export default ChatPopup;
