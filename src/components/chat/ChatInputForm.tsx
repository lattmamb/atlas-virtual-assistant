
import { useState, FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatInput } from "@/components/ui/chat-input";
import { useNavigate } from "react-router-dom";
import { ApiKeyProvider } from "@/lib/types";

interface ChatInputFormProps {
  isLoading: boolean;
  selectedProvider: ApiKeyProvider | null;
  sendMessage: (content: string) => void;
  availableProviders: ApiKeyProvider[];
}

const ChatInputForm = ({ isLoading, selectedProvider, sendMessage, availableProviders }: ChatInputFormProps) => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    sendMessage(input);
    setInput("");
  };

  if (availableProviders.length === 0) {
    return (
      <div className="text-center p-2">
        <p className="text-sm text-muted-foreground mb-2">
          Please add an API key in Settings to start chatting
        </p>
        <Button
          size="sm"
          onClick={() => navigate("/settings")}
          className="w-full"
        >
          Go to Settings
        </Button>
      </div>
    );
  }

  return (
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
  );
};

export default ChatInputForm;
