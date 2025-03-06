
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Paperclip, Smile } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

interface MessageInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  aiMode?: 'atlas' | 'grok';
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  placeholder = 'Type a message...',
  disabled = false,
  className,
  aiMode = 'atlas'
}) => {
  const [message, setMessage] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { isDarkMode } = useTheme();
  
  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage('');
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSend();
    }
  };
  
  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);
  
  // Determine styles based on AI mode
  const accentColor = aiMode === 'atlas' 
    ? 'bg-blue-500 hover:bg-blue-600'
    : 'bg-purple-500 hover:bg-purple-600';
    
  const bgColor = isDarkMode
    ? 'bg-gray-800/50 border-gray-700'
    : 'bg-gray-100/50 border-gray-200';
  
  return (
    <div className={cn(
      "relative flex items-end gap-2",
      className
    )}>
      <div className={cn(
        "flex-1 rounded-2xl border backdrop-blur-md transition-all overflow-hidden",
        bgColor,
        "focus-within:ring-2",
        aiMode === 'atlas' ? "focus-within:ring-blue-500/50" : "focus-within:ring-purple-500/50"
      )}>
        <div className="relative flex">
          <button
            type="button"
            className={cn(
              "flex-shrink-0 p-3 text-muted-foreground transition-colors",
              "hover:text-foreground"
            )}
            disabled={disabled}
          >
            <Paperclip className="h-5 w-5" />
          </button>
          
          <textarea
            ref={textareaRef}
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            placeholder={placeholder}
            rows={1}
            disabled={disabled}
            className={cn(
              "w-full bg-transparent py-3 px-1 outline-none resize-none",
              "placeholder:text-muted-foreground text-sm max-h-[120px]"
            )}
          />
          
          <button
            type="button"
            className={cn(
              "flex-shrink-0 p-3 text-muted-foreground transition-colors",
              "hover:text-foreground"
            )}
            disabled={disabled}
          >
            <Smile className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {message.trim() ? (
          <motion.button
            key="send"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
            disabled={disabled || !message.trim()}
            className={cn(
              "rounded-full p-3 text-white transition-colors flex-shrink-0",
              accentColor,
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <Send className="h-5 w-5" />
          </motion.button>
        ) : (
          <motion.button
            key="mic"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileTap={{ scale: 0.9 }}
            disabled={disabled}
            className={cn(
              "rounded-full p-3 text-white transition-colors flex-shrink-0",
              accentColor,
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <Mic className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MessageInput;
