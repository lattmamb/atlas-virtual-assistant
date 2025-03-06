import React, { useState, useRef, useEffect } from 'react';
import { useAtlasLink } from './AtlasLinkContext';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Sparkles, Send } from 'lucide-react';

const ChatTab: React.FC = () => {
  const { 
    messages, 
    inputMessage, 
    setInputMessage, 
    handleSendMessage,
    celestialMode
  } = useAtlasLink();
  const { isDarkMode } = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Apply iOS blur effect style based on theme
  const backgroundStyle = isDarkMode 
    ? 'bg-black/80 backdrop-blur-xl border border-white/10' 
    : 'bg-white/80 backdrop-blur-xl border border-gray-200/50';

  return (
    <motion.div 
      className={`h-full flex flex-col relative transition-colors duration-300 ${backgroundStyle} rounded-xl overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Chat header with status */}
      <div className="p-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-blue-500/20 p-2 rounded-full">
            <MessageSquare className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Atlas Assistant</h3>
            <div className="flex items-center text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Online
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {celestialMode && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-xs py-1 px-2 rounded-full bg-blue-500/20 text-blue-400 font-medium"
            >
              <span className="flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Celestial Mode
              </span>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Visual gradient overlay at the top */}
      <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />
      
      {/* Messages container with improved styling */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none">
        <MessageList messages={messages} />
        <div ref={messagesEndRef} />
      </div>
      
      {/* Typing indicator when needed - can be controlled by state */}
      <AnimatePresence>
        {false && ( // Replace with actual typing state
          <motion.div 
            className="px-4 py-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center space-x-1">
                <div className="h-2 w-2 bg-blue-400 rounded-full animate-wave" style={{ "--wave-index": "0" } as React.CSSProperties}></div>
                <div className="h-2 w-2 bg-blue-400 rounded-full animate-wave" style={{ "--wave-index": "1" } as React.CSSProperties}></div>
                <div className="h-2 w-2 bg-blue-400 rounded-full animate-wave" style={{ "--wave-index": "2" } as React.CSSProperties}></div>
              </div>
              <span className="text-xs text-muted-foreground">Atlas is typing...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Message input with gradient effect */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-[40px] bg-gradient-to-t from-background to-transparent pointer-events-none" />
        <div className="p-3 border-t border-white/10">
          <div className="relative flex items-center">
            <MessageInput 
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              onSend={handleSendMessage}
              className="pr-10"
            />
            <button 
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="absolute right-3 p-1.5 rounded-full bg-blue-500 text-white disabled:opacity-50 disabled:bg-gray-500 transition-all duration-200"
            >
              <Send className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatTab;
