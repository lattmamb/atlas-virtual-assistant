
import React, { useState } from 'react';
import { ChatInput } from "@/components/ui/chat-input";
import { Button } from "@/components/ui/button";
import { Send, Mic, Image, Smile } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface MessageInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ value, onChange, onSend }) => {
  const { currentTheme, isDarkMode } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleAttachmentClick = () => {
    toast.info("Attachment feature coming soon", {
      position: "bottom-center",
      duration: 2000
    });
  };

  return (
    <motion.div 
      className={`flex gap-2 py-3 px-4 border-t transition-all duration-300 ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex-1 relative">
        <ChatInput
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Ask me anything..."
          className={`flex-1 transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-900 text-white border-gray-700' 
              : 'bg-white/70 text-gray-800 border-gray-300'
          } ${isFocused ? 'ring-2 ring-blue-400 ring-opacity-50' : ''}`}
        />
        
        <motion.div 
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2 ${value.length > 0 ? 'opacity-0' : 'opacity-100'}`}
          animate={{ opacity: value.length > 0 ? 0 : 1, scale: value.length > 0 ? 0.8 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100/10"
            onClick={handleAttachmentClick}
          >
            <Image className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100/10"
            onClick={handleAttachmentClick}
          >
            <Smile className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
      
      <Button 
        onClick={onSend} 
        className={`rounded-full h-10 w-10 p-0 flex items-center justify-center transition-all duration-300 ${
          isDarkMode 
            ? 'dark-apple-button hover:bg-gray-700' 
            : 'apple-button hover:bg-primary/90'
        } ${value.length === 0 ? 'bg-blue-500' : 'bg-blue-600'}`}
        disabled={value.length === 0}
      >
        {value.length === 0 ? (
          <Mic className="h-4 w-4" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </motion.div>
  );
};

export default MessageInput;
