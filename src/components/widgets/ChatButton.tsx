
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatButtonProps {
  onClick: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  return (
    <Button 
      className={cn(
        "rounded-full flex items-center justify-center w-12 h-12 p-0 shadow-lg transition-all",
        "bg-blue-500 hover:bg-blue-600 shadow-blue-500/20",
        "theme-glow"
      )}
      onClick={onClick}
    >
      <MessageSquare className="text-white h-5 w-5" />
    </Button>
  );
};

export default ChatButton;
