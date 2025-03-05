
import React from "react";
import { Message } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ChatMessageList } from "../ui/chat-message-list";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";

interface ChatMessagesProps {
  messages: Message[];
  customRenderer?: (message: Message) => React.ReactNode;
  aiMode?: "atlas" | "grok"; // New prop for AI mode
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ 
  messages, 
  customRenderer,
  aiMode = "atlas" 
}) => {
  const { isDarkMode } = useTheme();
  
  const renderMessageContent = (message: Message) => {
    if (customRenderer) {
      return customRenderer(message);
    }
    
    return message.content;
  };
  
  if (messages.length === 0) {
    return (
      <LampContainer className="h-full rounded-none">
        <div className="flex h-full items-center justify-center p-4 text-center">
          <div className="max-w-md">
            <h3 className="text-xl font-semibold mb-2 text-white">
              {aiMode === "atlas" ? "Atlas AI Assistant" : "Grok AI"}
            </h3>
            <p className="text-muted-foreground mb-4 text-white/70">
              {aiMode === "atlas" 
                ? "How can I help you today?"
                : "Ask me anything, I'm significantly more fun and more importantly, I'm real-time."}
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <button className="p-2 border border-white/20 rounded-lg hover:bg-white/10 transition-colors text-left text-white/80">
                {aiMode === "atlas" 
                  ? "\"Tell me about the 2025 Dodge Ram\""
                  : "\"What happened in the world today?\""}
              </button>
              <button className="p-2 border border-white/20 rounded-lg hover:bg-white/10 transition-colors text-left text-white/80">
                {aiMode === "atlas" 
                  ? "\"What financing options are available?\""
                  : "\"Explain quantum computing like I'm five\""}
              </button>
              <button className="p-2 border border-white/20 rounded-lg hover:bg-white/10 transition-colors text-left text-white/80">
                {aiMode === "atlas" 
                  ? "\"Show me your inventory\""
                  : "\"Write a short sci-fi story\""}
              </button>
              <button className="p-2 border border-white/20 rounded-lg hover:bg-white/10 transition-colors text-left text-white/80">
                {aiMode === "atlas" 
                  ? "\"Schedule a test drive\""
                  : "\"Debate the pros and cons of AI\""}
              </button>
            </div>
          </div>
        </div>
      </LampContainer>
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
              {aiMode === "atlas" ? (
                <AvatarFallback className="bg-blue-600">A</AvatarFallback>
              ) : (
                <AvatarFallback className="bg-purple-600">G</AvatarFallback>
              )}
            </Avatar>
          )}
          
          <div
            className={cn(
              "rounded-lg px-4 py-2",
              message.role === "user"
                ? "bg-primary text-primary-foreground"
                : isDarkMode 
                  ? aiMode === "atlas" 
                    ? "bg-gray-800 text-gray-100"
                    : "bg-purple-900/80 text-gray-100" 
                  : aiMode === "atlas"
                    ? "bg-gray-200 text-gray-900"
                    : "bg-purple-200 text-gray-900"
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
