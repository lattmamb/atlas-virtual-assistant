
import React from "react";
import { Message } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ChatMessageList } from "../ui/chat-message-list";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

interface ChatMessagesProps {
  messages: Message[];
  customRenderer?: (message: Message) => React.ReactNode;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, customRenderer }) => {
  const { isDarkMode } = useTheme();
  
  const renderMessageContent = (message: Message) => {
    if (customRenderer) {
      return customRenderer(message);
    }
    
    return message.content;
  };
  
  if (messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-4 text-center">
        <div className="max-w-md">
          <h3 className="text-xl font-semibold mb-2">Atlas AI Assistant</h3>
          <p className="text-muted-foreground mb-4">How can I help you today?</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <button className="p-2 border rounded-lg hover:bg-muted transition-colors text-left">
              "Tell me about the 2025 Dodge Ram"
            </button>
            <button className="p-2 border rounded-lg hover:bg-muted transition-colors text-left">
              "What financing options are available?"
            </button>
            <button className="p-2 border rounded-lg hover:bg-muted transition-colors text-left">
              "Show me your inventory"
            </button>
            <button className="p-2 border rounded-lg hover:bg-muted transition-colors text-left">
              "Schedule a test drive"
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ChatMessageList>
      {messages.map((message, index) => (
        <motion.div
          key={message.id || index}
          className={cn(
            "flex gap-3 px-4 py-3 group max-w-3xl mx-auto w-full",
            message.role === "user" ? "justify-end" : "justify-start"
          )}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index % 5 }}
        >
          {message.role !== "user" && (
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          )}
          
          <div
            className={cn(
              "rounded-lg px-4 py-2",
              message.role === "user"
                ? "bg-primary text-primary-foreground"
                : isDarkMode 
                  ? "bg-gray-800 text-gray-100" 
                  : "bg-gray-200 text-gray-900" // Changed from text-gray-800 for better contrast
            )}
          >
            {renderMessageContent(message)}
          </div>
          
          {message.role === "user" && (
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          )}
        </motion.div>
      ))}
    </ChatMessageList>
  );
};

export default ChatMessages;
