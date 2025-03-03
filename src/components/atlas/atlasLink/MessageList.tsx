
import React, { useRef, useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import { Message } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDarkMode, currentTheme } = useTheme();

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Check if the user has scrolled up
  const handleScroll = () => {
    if (!containerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100;
    setShowScrollButton(isScrolledUp);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="relative flex-1 overflow-hidden">
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className={`h-full overflow-y-auto mb-4 pr-1 space-y-3 p-4 transition-colors duration-300 ${
          isDarkMode ? 'scrollbar-dark' : 'scrollbar-light'
        }`}
      >
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <MessageItem 
              key={message.id} 
              message={message} 
              index={index} 
              isDarkMode={isDarkMode}
            />
          ))}
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </div>

      {showScrollButton && (
        <motion.button
          className={`absolute bottom-6 right-6 z-10 p-2 rounded-full shadow-lg transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-primary/80 text-white' 
              : 'bg-primary/90 text-white'
          }`}
          onClick={scrollToBottom}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.button>
      )}
    </div>
  );
};

interface MessageItemProps {
  message: Message;
  index: number;
  isDarkMode: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, index, isDarkMode }) => {
  return (
    <motion.div 
      className={cn(
        "max-w-[80%] md:max-w-[70%]",
        message.role === 'user' 
          ? "ml-auto" 
          : "mr-auto"
      )}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay: index * 0.1
      }}
    >
      <div className={cn(
        "p-3 rounded-2xl transition-colors duration-300",
        message.role === 'user' 
          ? `${isDarkMode ? 'bg-primary' : 'bg-primary'} text-primary-foreground rounded-tr-sm` 
          : `${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} ${isDarkMode ? 'text-white' : 'text-gray-900'} rounded-tl-sm` // Improved contrast
      )}>
        {message.content}
      </div>
      <div className={`text-xs mt-1 px-2 transition-colors duration-300 ${
        isDarkMode ? 'text-gray-300' : 'text-gray-700' // Improved from text-gray-400/text-gray-600
      }`}>
        {message.role === 'user' ? 'You' : 'Atlas AI'} • {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
      </div>
    </motion.div>
  );
};

export default MessageList;
