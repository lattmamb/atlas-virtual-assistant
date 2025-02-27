
import { Message } from "../context/ChatContext";
import { useEffect, useRef } from "react";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.classList.add("chat-message-fade-in");
    }
  }, []);

  return (
    <div
      ref={messageRef}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
      style={{ opacity: 0 }}
    >
      <div
        className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-5 py-3 ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "glassmorphism"
        }`}
      >
        {message.isLoading ? (
          <div className="loading-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        ) : (
          <div className="text-sm">{message.content}</div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
