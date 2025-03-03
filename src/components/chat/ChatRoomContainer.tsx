
import React from "react";
import { motion } from "framer-motion";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInputForm from "@/components/chat/ChatInputForm";
import WelcomeScreen from "@/components/chat/WelcomeScreen";
import { Message, ApiKeyProvider } from "@/lib/types";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StarBorder } from "@/components/ui/starBorder";
import ModelSwitcher from "./ModelSwitcher";

interface ChatRoomContainerProps {
  messages: Message[];
  isLoading: boolean;
  selectedProvider: ApiKeyProvider | null;
  availableProviders: ApiKeyProvider[];
  sendMessage: (content: string) => void;
  starredMessage: string | null;
  handleStarMessage: (messageId: string) => void;
  scrollRef: React.RefObject<HTMLDivElement>;
  aiMode: 'atlas' | 'grok';
  onAIModeChange: (mode: 'atlas' | 'grok') => void;
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
  aiMode,
  onAIModeChange,
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
      className="flex-1 flex flex-col overflow-hidden"
      ref={scrollRef}
      animate={{
        scale: 1,
        y: 0,
      }}
      transition={{ duration: 0.1, ease: "easeOut" }}
    >
      <div className="mx-auto w-full max-w-3xl px-4 py-2">
        <ModelSwitcher 
          currentModel={aiMode} 
          onModelChange={onAIModeChange} 
          className="mx-auto mb-2"
        />
      </div>
      
      <div className="flex-1 overflow-y-auto relative">
        <ChatMessages 
          messages={messages} 
          customRenderer={renderMessage}
          aiMode={aiMode}
        />
        
        {messages.length === 0 && (
          <WelcomeScreen 
            sendMessage={sendMessage} 
            aiMode={aiMode}
          />
        )}
      </div>
      
      <div className="p-4 border-t dark:border-white/10 border-gray-200">
        <ChatInputForm 
          isLoading={isLoading}
          selectedProvider={selectedProvider}
          sendMessage={sendMessage}
          availableProviders={availableProviders}
          aiMode={aiMode}
        />
      </div>
    </motion.div>
  );
};

export default ChatRoomContainer;
