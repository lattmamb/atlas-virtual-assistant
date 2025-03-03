
import React from 'react';
import { ChatInput } from "@/components/ui/chat-input";
import { Button } from "@/components/ui/button";
import { Send } from 'lucide-react';

interface MessageInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ value, onChange, onSend }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex gap-2 py-2 px-4 border-t border-gray-800">
      <ChatInput
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="Ask me anything..."
        className="flex-1 bg-gray-900 text-white border-gray-700"
      />
      <Button 
        onClick={onSend} 
        className="dark-apple-button rounded-full h-10 w-10 p-0 flex items-center justify-center"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default MessageInput;
