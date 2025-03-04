import { Sparkles } from "lucide-react";
import { Message } from "@/lib/types";
import { useChat } from "@/hooks/use-chat";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div className={`chat-message-fade-in mb-6 ${isUser ? "ml-auto" : "mr-auto"} max-w-3xl`}>
      <div className={`flex items-start gap-3 ${isUser ? "justify-end" : ""}`}>
        {!isUser && (
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
        )}
        <div
          className={`px-4 py-3 rounded-xl ${
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-none"
              : "bg-card text-card-foreground rounded-tl-none"
          }`}
        >
          <p className="whitespace-pre-wrap">
            {message.content}
          </p>
          <div className={`text-[10px] mt-1 ${isUser ? "text-primary-foreground/70" : "text-muted-foreground"} flex justify-between`}>
            <span>
              {message.createdAt.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            {!isUser && message.model && (
              <span className="ml-2 italic">
                {message.model}
              </span>
            )}
          </div>
        </div>
        {isUser && (
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mt-1">
            <span className="text-xs font-medium text-primary-foreground">You</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
