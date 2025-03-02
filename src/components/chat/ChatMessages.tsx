
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
        <div>
          <p className="text-muted-foreground">No messages yet.</p>
          <p className="text-sm text-muted-foreground">
            Start a conversation by typing a message below.
          </p>
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
            "flex gap-3 px-4 py-2 group",
            message.role === "user" && "flex-row-reverse"
          )}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index % 5 }}
        >
          <Avatar className={cn("h-8 w-8")}>
            <AvatarFallback>
              {message.role === "user" ? "U" : "A"}
            </AvatarFallback>
          </Avatar>
          <div
            className={cn(
              "rounded-lg px-3 py-2 max-w-[85%]",
              message.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            )}
          >
            {renderMessageContent(message)}
          </div>
        </motion.div>
      ))}
    </ChatMessageList>
  );
};

export default ChatMessages;
