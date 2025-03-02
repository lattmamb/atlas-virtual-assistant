
import React from "react";
import { motion } from "framer-motion";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInputForm from "@/components/chat/ChatInputForm";
import WelcomeScreen from "@/components/chat/WelcomeScreen";
import { Message } from "@/lib/types";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StarBorder } from "@/components/ui/starBorder";

interface ChatRoomContainerProps {
  messages: Message[];
  isLoading: boolean;
  selectedProvider: string | null;
  availableProviders: string[];
  sendMessage: (content: string) => void;
  starredMessage: string | null;
  handleStarMessage: (messageId: string) => void;
  scrollRef: React.RefObject<HTMLDivElement>;
}

const ChatRoomContainer: React.FC<ChatRoomContainerProps> = ({
  messages,
  isLoading,
  selectedProvider,
  availableProviders,
  sendMessage,
  starredMessage,
  handleStarMessage,
  scrollRef,
}) => {
  // Custom renderer for messages that adds star button
  const renderMessage = (message: Message) => {
    const isStarred = starredMessage === message.id;
    
    return (
      <StarBorder highlighted={isStarred} key={message.id}>
        <div className="relative group">
          {message.role === 'user' && (
            <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 text-yellow-500"
                onClick={() => handleStarMessage(message.id)}
              >
                <Star className="h-4 w-4" />
              </Button>
            </div>
          )}
          {message.content}
        </div>
      </StarBorder>
    );
  };

  return (
    <motion.div 
      className="flex-1 flex flex-col overflow-hidden border rounded-lg hybrid"
      style={{ borderColor: 'var(--widget-border)' }}
      ref={scrollRef}
      animate={{
        scale: 1,
        y: 0,
      }}
      transition={{ duration: 0.1, ease: "easeOut" }}
    >
      <div className="flex-1 overflow-y-auto relative">
        <ChatMessages 
          messages={messages} 
          customRenderer={renderMessage} 
        />
        
        {messages.length === 0 && <WelcomeScreen sendMessage={sendMessage} />}
      </div>
      
      <div className="p-4 border-t" style={{ borderColor: 'var(--widget-border)' }}>
        <ChatInputForm 
          isLoading={isLoading}
          selectedProvider={selectedProvider}
          sendMessage={sendMessage}
          availableProviders={availableProviders}
        />
      </div>
    </motion.div>
  );
};

export default ChatRoomContainer;
