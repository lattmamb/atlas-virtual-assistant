
import { useState, useEffect, FormEvent } from "react";
import { Bot, Send } from "lucide-react";
import { useChat } from "@/context/ChatContext";
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from "@/components/ui/expandable-chat";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat-bubble";
import { ChatInput } from "@/components/ui/chat-input";
import { Button } from "@/components/ui/button";
import { ChatMessageList } from "@/components/ui/chat-message-list";

const AtlasChatBot = () => {
  const [input, setInput] = useState("");
  const { messages, sendMessage, isLoading, selectedProvider } = useChat();
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    sendMessage(input);
    setInput("");
  };

  return (
    <ExpandableChat 
      size="lg" 
      position="bottom-right" 
      icon={<Bot className="h-6 w-6" />}
    >
      <ExpandableChatHeader className="flex-col text-center justify-center">
        <h1 className="text-xl font-semibold">Atlas Assistant</h1>
        <p className="text-sm text-muted-foreground">
          Your personal AI companion
        </p>
        {selectedProvider && (
          <div className="text-xs text-muted-foreground mt-1">
            Using {selectedProvider.charAt(0).toUpperCase() + selectedProvider.slice(1)}
          </div>
        )}
      </ExpandableChatHeader>

      <ExpandableChatBody>
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
      </ExpandableChatBody>

      <ExpandableChatFooter>
        <form
          onSubmit={handleSubmit}
          className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
        >
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
            disabled={isLoading}
          />
          <div className="flex items-center p-3 pt-0 justify-between">
            <Button 
              type="submit" 
              size="sm" 
              className="ml-auto gap-1.5"
              disabled={!input.trim() || isLoading}
            >
              Send
              <Send className="size-3.5" />
            </Button>
          </div>
        </form>
      </ExpandableChatFooter>
    </ExpandableChat>
  );
};

export default AtlasChatBot;
