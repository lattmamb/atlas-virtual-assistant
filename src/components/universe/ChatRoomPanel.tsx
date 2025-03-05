
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { MessageSquare, Send } from 'lucide-react';
import { LampContainer } from '@/components/ui/lamp';

const ChatRoomPanel: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <LampContainer className="h-full">
      <motion.div 
        className={cn(
          "w-full max-w-4xl mx-auto h-[70vh] rounded-2xl overflow-hidden",
          "border backdrop-blur-xl shadow-xl",
          isDarkMode 
            ? "border-white/10 bg-black/30" 
            : "border-gray-200 bg-white/70"
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-400" />
              <h2 className="font-semibold">Atlas Chat</h2>
            </div>
            <div className="text-xs text-white/50">
              Powered by Vision AI
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className={cn(
              "max-w-[80%] p-3 rounded-2xl",
              "bg-blue-500/10 border border-blue-500/20"
            )}>
              <p className="text-sm">Hello, I am Atlas. How can I assist you today?</p>
            </div>
            
            <div className={cn(
              "max-w-[80%] p-3 rounded-2xl ml-auto",
              "bg-white/10 border border-white/20"
            )}>
              <p className="text-sm">Can you help me understand the Vision Pro features?</p>
            </div>
            
            <div className={cn(
              "max-w-[80%] p-3 rounded-2xl",
              "bg-blue-500/10 border border-blue-500/20"
            )}>
              <p className="text-sm">Absolutely! The Vision Pro offers revolutionary spatial computing capabilities, allowing you to experience your digital content in a completely immersive way. It features ultra-high resolution micro-OLED displays, seamless integration with your Apple ecosystem, and powerful privacy features.</p>
            </div>
          </div>
          
          <div className="p-4 border-t border-white/10">
            <div className={cn(
              "flex items-center gap-2 rounded-full px-4 py-2",
              "border backdrop-blur-md",
              isDarkMode 
                ? "border-white/10 bg-white/5" 
                : "border-gray-200 bg-white/50"
            )}>
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="bg-transparent border-none flex-1 outline-none text-sm"
              />
              <button className="p-1.5 rounded-full bg-blue-500 text-white">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </LampContainer>
  );
};

export default ChatRoomPanel;
