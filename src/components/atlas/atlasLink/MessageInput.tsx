
import React from 'react';
import { ChatInput } from "@/components/ui/chat-input";
import { Button } from "@/components/ui/button";
import { Send } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface MessageInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ value, onChange, onSend }) => {
  const { currentTheme, isDarkMode } = useTheme();
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className={`flex gap-2 py-3 px-4 border-t transition-all duration-300 ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
      <ChatInput
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="Ask me anything..."
        className={`flex-1 transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-gray-900 text-white border-gray-700' 
            : 'bg-white/70 text-gray-800 border-gray-300'
        }`}
      />
      <Button 
        onClick={onSend} 
        className={`rounded-full h-10 w-10 p-0 flex items-center justify-center transition-all duration-300 ${
          isDarkMode 
            ? 'dark-apple-button hover:bg-gray-700' 
            : 'apple-button hover:bg-primary/90'
        }`}
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default MessageInput;
