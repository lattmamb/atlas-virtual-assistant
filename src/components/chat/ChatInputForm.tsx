
import { useState, FormEvent } from "react";
import { Send, Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatInput } from "@/components/ui/chat-input";
import { useNavigate } from "react-router-dom";
import { ApiKeyProvider } from "@/lib/types";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

interface ChatInputFormProps {
  isLoading: boolean;
  selectedProvider: ApiKeyProvider | null;
  sendMessage: (content: string) => void;
  availableProviders: ApiKeyProvider[];
}

const ChatInputForm = ({ isLoading, selectedProvider, sendMessage, availableProviders }: ChatInputFormProps) => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    sendMessage(input);
    setInput("");
  };

  if (availableProviders.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-sm text-muted-foreground mb-3">
          Please add an API key in Settings to start chatting
        </p>
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button
            size="sm"
            onClick={() => navigate("/settings")}
            className={cn(
              "w-full py-2.5 rounded-xl transition-all duration-300",
              "bg-gradient-to-br from-blue-500 to-blue-600 hover:shadow-lg",
              "border border-blue-400/20"
            )}
          >
            <Sparkle className="mr-2 h-4 w-4" />
            Go to Settings
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative rounded-xl border focus-within:ring-1 focus-within:ring-ring p-1.5",
        isDarkMode ? "bg-[#1a1a1a] border-white/10" : "bg-white border-gray-200"
      )}
    >
      <ChatInput
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask me anything..."
        className={cn(
          "min-h-12 resize-none rounded-lg border-0 p-3 shadow-none focus-visible:ring-0",
          isDarkMode ? "bg-[#1a1a1a] placeholder:text-gray-500" : "bg-white placeholder:text-gray-400"
        )}
        disabled={isLoading || !selectedProvider}
      />
      <div className="flex items-center p-3 pt-0 justify-between">
        <div className="text-xs text-muted-foreground italic">
          {selectedProvider ? 
            `Using ${selectedProvider.charAt(0).toUpperCase() + selectedProvider.slice(1)}` : 
            "Select a provider above"}
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            type="submit" 
            size="sm" 
            className={cn(
              "ml-auto gap-1.5 rounded-full px-4",
              "bg-gradient-to-r from-blue-500 to-blue-600",
              "border border-blue-400/20",
              "hover:shadow-md hover:shadow-blue-500/20",
              "disabled:opacity-50 disabled:shadow-none"
            )}
            disabled={!input.trim() || isLoading || !selectedProvider}
          >
            Send
            <Send className="size-3.5" />
          </Button>
        </motion.div>
      </div>
    </form>
  );
};

export default ChatInputForm;
