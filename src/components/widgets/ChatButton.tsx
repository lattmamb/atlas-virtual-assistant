
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { AtlasChatBot } from '@/components/atlas/index';

interface ChatButtonProps {
  showChat: boolean;
  setShowChat: (show: boolean) => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ showChat, setShowChat }) => {
  return (
    <>
      <div className="fixed bottom-4 right-4 z-40">
        <Button 
          className="rounded-full flex items-center justify-center w-12 h-12 p-0 shadow-lg bg-blue-500 hover:bg-blue-600 transition-all shadow-blue-500/20"
          onClick={() => setShowChat(!showChat)}
        >
          <MessageSquare className="text-white h-5 w-5" />
        </Button>
      </div>

      {showChat && (
        <div className="fixed bottom-20 right-4 z-40 w-80 md:w-96 h-96 shadow-2xl rounded-2xl border border-white/10 overflow-hidden bg-[#1a1a1a]/90 backdrop-blur-xl animate-fade-in">
          <AtlasChatBot />
        </div>
      )}
    </>
  );
};

export default ChatButton;
