
import { Message } from "@/lib/types";
import { ChatMessageList } from "@/components/ui/chat-message-list";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat-bubble";

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  return (
    <div className="flex-1 overflow-auto">
      <ChatMessageList>
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            variant={message.role === "user" ? "sent" : "received"}
          >
            <ChatBubbleAvatar
              className="h-8 w-8 shrink-0"
              fallback={message.role === "user" ? "You" : "AI"}
            />
            <ChatBubbleMessage
              variant={message.role === "user" ? "sent" : "received"}
              isLoading={message.isLoading}
            >
              {message.content}
            </ChatBubbleMessage>
          </ChatBubble>
        ))}
      </ChatMessageList>
    </div>
  );
};

export default ChatMessages;
