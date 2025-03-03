
import React, { useState, useRef, useEffect } from 'react';
import { ChatInput } from "@/components/ui/chat-input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAtlasLink } from './AtlasLinkContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ChevronDown } from 'lucide-react';

const ChatTab: React.FC = () => {
  const { messages, inputMessage, setInputMessage, handleSendMessage } = useAtlasLink();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Check if the user has scrolled up
  const handleScroll = () => {
    if (!chatContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100;
    setShowScrollButton(isScrolledUp);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="h-full flex flex-col relative">
      <div 
        ref={chatContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto mb-4 pr-1 space-y-3 p-4"
      >
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div 
              key={message.id} 
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
                "p-3 rounded-2xl",
                message.role === 'user' 
                  ? "bg-primary text-primary-foreground rounded-tr-sm" 
                  : "bg-gray-800 text-gray-100 rounded-tl-sm"
              )}>
                {message.content}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-2">
                {message.role === 'user' ? 'You' : 'Atlas AI'} • {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </div>
      
      {showScrollButton && (
        <motion.button
          className="absolute bottom-[80px] right-6 z-10 p-2 rounded-full bg-primary/80 text-white shadow-lg"
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
      
      <div className="flex gap-2 py-2 px-4 border-t border-gray-800">
        <ChatInput
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
          placeholder="Ask me anything..."
          className="flex-1 bg-gray-900 text-white border-gray-700"
        />
        <Button 
          onClick={handleSendMessage} 
          className="dark-apple-button rounded-full h-10 w-10 p-0 flex items-center justify-center"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatTab;
