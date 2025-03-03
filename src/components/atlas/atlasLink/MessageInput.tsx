
import React, { useState } from 'react';
import { ChatInput } from "@/components/ui/chat-input";
import { Button } from "@/components/ui/button";
import { Send, Mic, Image, Smile, Paperclip } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface MessageInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ value, onChange, onSend }) => {
  const { isDarkMode } = useTheme();
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
      className={cn(
        "py-3 px-4 border-t transition-all duration-300",
        isDarkMode ? 'border-gray-800 bg-black/30' : 'border-gray-200 bg-white/10'
      )}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex items-center gap-2 max-w-4xl mx-auto">
        {/* Attachments button (only visible when not typing) */}
        <AnimatePresence mode="wait">
          {value.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                size="icon" 
                variant="ghost" 
                className={cn(
                  "h-10 w-10 rounded-full",
                  isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                )}
                onClick={handleAttachmentClick}
              >
                <Paperclip className="h-5 w-5 text-gray-400" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Input field */}
        <div className="flex-1 relative">
          <ChatInput
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Message Atlas..."
            className={cn(
              "flex-1 transition-all duration-300 rounded-2xl",
              isDarkMode 
                ? 'bg-gray-900 text-white border-gray-700' 
                : 'bg-white/70 text-gray-800 border-gray-300',
              isFocused ? 'ring-2 ring-blue-400 ring-opacity-50' : ''
            )}
          />
          
          {/* Empty state buttons */}
          <AnimatePresence>
            {value.length === 0 && (
              <motion.div 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
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
            )}
          </AnimatePresence>
        </div>
        
        {/* Send button */}
        <motion.div
          initial={{ scale: 1 }}
          animate={{ 
            scale: value.length > 0 ? [1, 1.05, 1] : 1,
            transition: { duration: 0.3 }
          }}
        >
          <Button 
            onClick={onSend} 
            className={cn(
              "rounded-full h-10 w-10 p-0 flex items-center justify-center transition-all duration-300",
              value.length === 0 
                ? (isDarkMode ? 'bg-gray-800' : 'bg-gray-200') 
                : 'bg-blue-600 hover:bg-blue-500'
            )}
            disabled={value.length === 0}
          >
            {value.length === 0 ? (
              <Mic className="h-5 w-5 text-gray-400" />
            ) : (
              <Send className="h-5 w-5 text-white" />
            )}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MessageInput;
