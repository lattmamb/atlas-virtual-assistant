
import React, { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';
import { Send, Mic } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAtlasLink } from './AtlasLinkContext';
import { useTheme } from '@/context/ThemeContext';

export interface MessageInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  className?: string; // Add className to interface
}

const MessageInput: React.FC<MessageInputProps> = ({
  value,
  onChange,
  onSend,
  className, // Destructure className
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const { celestialMode } = useAtlasLink();
  const { isDarkMode } = useTheme();
  
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.min(textarea.scrollHeight, 120); // Max height of 120px
      textarea.style.height = `${newHeight}px`;
    }
  };
  
  useEffect(() => {
    adjustHeight();
  }, [value]);
  
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };
  
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Would start recording here in a real app
      setTimeout(() => {
        setIsRecording(false);
      }, 3000);
    }
  };
  
  return (
    <div 
      className={cn(
        "relative w-full",
        celestialMode ? "px-4" : "px-2",
        className // Apply passed className
      )}
    >
      <div 
        className={cn(
          "flex items-end w-full overflow-hidden rounded-2xl",
          celestialMode 
            ? "bg-black/30 border border-white/10 backdrop-blur-xl" 
            : isDarkMode 
              ? "bg-gray-800/80 border border-gray-700" 
              : "bg-gray-100 border border-gray-200"
        )}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => {
            onChange(e);
            adjustHeight();
          }}
          onKeyDown={handleKeyDown}
          placeholder="Message Atlas..."
          className={cn(
            "w-full resize-none py-3 px-4 bg-transparent",
            "outline-none focus:outline-none",
            "text-sm md:text-base",
            "min-h-[44px] max-h-[120px]",
            celestialMode ? "text-white placeholder:text-white/50" : ""
          )}
          rows={1}
        />
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={value.trim() ? onSend : toggleRecording}
          className={cn(
            "p-3 mr-2 mb-2 rounded-xl",
            "flex items-center justify-center",
            celestialMode 
              ? "bg-blue-500/30 text-white hover:bg-blue-500/40" 
              : "bg-blue-500 text-white hover:bg-blue-600"
          )}
        >
          {value.trim() ? (
            <Send size={18} />
          ) : (
            <Mic size={18} className={isRecording ? "animate-pulse text-red-400" : ""} />
          )}
        </motion.button>
      </div>
      
      {isRecording && (
        <div className="absolute -top-8 left-0 right-0 flex justify-center">
          <div className="bg-red-500 text-white text-xs px-3 py-1 rounded-full animate-pulse">
            Recording...
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageInput;
