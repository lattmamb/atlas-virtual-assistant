
import { useState, FormEvent } from "react";
import { Bot, Send, Sparkles } from "lucide-react";
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
  const { messages, sendMessage, isLoading, selectedProvider, availableProviders, setSelectedProvider } = useChat();
  
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
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-xl font-semibold">Atlas Assistant</h1>
          <Sparkles className="h-4 w-4 text-amber-500" />
        </div>
        <p className="text-sm text-muted-foreground">
          Powered by OpenAI and other AI providers
        </p>
        {availableProviders.length > 0 && (
          <div className="mt-2">
            <select
              value={selectedProvider || ""}
              onChange={(e) => setSelectedProvider(e.target.value as any)}
              className="text-xs px-2 py-1 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="" disabled>Select AI Provider</option>
              {availableProviders.map((provider) => (
                <option key={provider} value={provider}>
                  {provider.charAt(0).toUpperCase() + provider.slice(1)}
                </option>
              ))}
            </select>
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
        {availableProviders.length === 0 ? (
          <div className="text-center p-2">
            <p className="text-sm text-muted-foreground mb-2">
              Please add an API key in Settings to start chatting
            </p>
            <Button
              size="sm"
              onClick={() => window.location.href = "/settings"}
              className="w-full"
            >
              Go to Settings
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
          >
            <ChatInput
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
              disabled={isLoading || !selectedProvider}
            />
            <div className="flex items-center p-3 pt-0 justify-between">
              <div className="text-xs text-muted-foreground italic">
                {selectedProvider ? 
                  `Using ${selectedProvider.charAt(0).toUpperCase() + selectedProvider.slice(1)}` : 
                  "Select a provider above"}
              </div>
              <Button 
                type="submit" 
                size="sm" 
                className="ml-auto gap-1.5"
                disabled={!input.trim() || isLoading || !selectedProvider}
              >
                Send
                <Send className="size-3.5" />
              </Button>
            </div>
          </form>
        )}
      </ExpandableChatFooter>
    </ExpandableChat>
  );
};

export default AtlasChatBot;
