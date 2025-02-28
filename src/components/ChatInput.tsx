
import { useState } from "react";
import { useChat } from "@/context/ChatContext";
import { SendHorizonal, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ApiKeyProvider } from "@/lib/types";

const ChatInput = () => {
  const [input, setInput] = useState("");
  const { 
    sendMessage, 
    isLoading, 
    availableProviders, 
    selectedProvider, 
    setSelectedProvider 
  } = useChat();
  const navigate = useNavigate();

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const providerNames: Record<string, string> = {
    openai: "OpenAI",
    anthropic: "Anthropic",
    cohere: "Cohere",
    huggingface: "Hugging Face",
    "hugging face": "Hugging Face",
    google: "Google"
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Provider selector */}
      {availableProviders.length > 0 ? (
        <div className="flex justify-center">
          <Select
            value={selectedProvider || undefined}
            onValueChange={(value) => setSelectedProvider(value as ApiKeyProvider)}
          >
            <SelectTrigger className="w-[180px] mx-auto">
              <SelectValue placeholder="Select provider" />
            </SelectTrigger>
            <SelectContent>
              {availableProviders.map((provider) => (
                <SelectItem key={provider} value={provider}>
                  {providerNames[provider] || provider}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : (
        <div className="text-center">
          <button
            onClick={() => navigate("/settings")}
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <Settings size={14} />
            Configure API Keys
          </button>
        </div>
      )}

      {/* Input area */}
      <div className="relative flex items-center">
        <textarea
          className="w-full resize-none rounded-full pl-6 pr-16 py-3 
                    bg-white border border-slate-200 shadow-sm focus:ring-1 focus:ring-primary focus:outline-none 
                    transition-all duration-200 placeholder:text-gray-400 min-h-[54px]"
          placeholder="Ask me anything..."
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button
          className={`absolute right-2 h-10 w-10 rounded-full flex items-center justify-center
                    ${
                      input.trim() && !isLoading
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-400"
                    }
                    hover:scale-105 active:scale-95 transition-all duration-200`}
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
        >
          <SendHorizonal size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
