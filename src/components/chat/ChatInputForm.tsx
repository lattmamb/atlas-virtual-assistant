
import { useState, FormEvent, useRef, useEffect } from "react";
import { Send, Mic, PlusCircle, Image, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatInput } from "@/components/ui/chat-input";
import { useNavigate } from "react-router-dom";
import { ApiKeyProvider } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ChatInputFormProps {
  isLoading: boolean;
  selectedProvider: ApiKeyProvider | null;
  sendMessage: (content: string) => void;
  availableProviders: ApiKeyProvider[];
}

const ChatInputForm = ({ isLoading, selectedProvider, sendMessage, availableProviders }: ChatInputFormProps) => {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    sendMessage(input);
    setInput("");
    setShowSuggestions(false);
  };
  
  // Auto-focus the input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  // Sample suggestions based on input
  const suggestions = [
    "Tell me about the 2025 Dodge Ram",
    "What's the pricing for a Charger?",
    "Do you have financing options?",
    "Schedule a test drive"
  ];

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
      <div className="relative">
        {/* Sparkles animation behind input when focused */}
        <AnimatePresence>
          {isFocused && (
            <motion.div 
              className="absolute -inset-1 rounded-lg opacity-20 overflow-hidden pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20" />
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-blue-400"
                  initial={{ 
                    x: Math.random() * 100 + "%", 
                    y: Math.random() * 100 + "%",
                    opacity: 0.7,
                    scale: 0.5
                  }}
                  animate={{ 
                    x: Math.random() * 100 + "%", 
                    y: Math.random() * 100 + "%",
                    opacity: [0.4, 0.8, 0.4],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        <ChatInput
          ref={inputRef}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setShowSuggestions(e.target.value.length > 0 && e.target.value.length < 5);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            // Small delay to allow clicking on suggestions
            setTimeout(() => setShowSuggestions(false), 200);
          }}
          placeholder="Ask me anything..."
          className={cn(
            "min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0",
            isFocused && "bg-background/50"
          )}
          disabled={isLoading || !selectedProvider}
        />
        
        {/* Input suggestions */}
        <AnimatePresence>
          {showSuggestions && (
            <motion.div 
              className="absolute left-0 right-0 top-full mt-1 bg-background rounded-lg border shadow-md z-10 overflow-hidden"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-1">
                {suggestions
                  .filter(s => s.toLowerCase().includes(input.toLowerCase()))
                  .slice(0, 3)
                  .map((suggestion, i) => (
                    <button
                      key={i}
                      type="button"
                      className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                      onClick={() => {
                        setInput(suggestion);
                        setShowSuggestions(false);
                        if (inputRef.current) {
                          inputRef.current.focus();
                        }
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="flex items-center p-3 pt-0 justify-between">
        <div className="flex items-center gap-1">
          <div className="text-xs text-muted-foreground italic">
            {selectedProvider ? 
              `Using ${selectedProvider.charAt(0).toUpperCase() + selectedProvider.slice(1)}` : 
              "Select a provider above"}
          </div>
          
          {isLoading && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="ml-1"
            >
              <Sparkles className="h-3 w-3 text-amber-400" />
            </motion.div>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          <AnimatePresence>
            {input.length === 0 && (
              <>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1"
                >
                  <Button 
                    type="button" 
                    size="icon" 
                    variant="ghost"
                    className="h-8 w-8 rounded-full"
                    disabled={isLoading || !selectedProvider}
                  >
                    <Image className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  
                  <Button 
                    type="button" 
                    size="icon" 
                    variant="ghost"
                    className="h-8 w-8 rounded-full"
                    disabled={isLoading || !selectedProvider}
                  >
                    <PlusCircle className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  
                  <Button 
                    type="button" 
                    size="icon" 
                    variant="ghost"
                    className="h-8 w-8 rounded-full"
                    disabled={isLoading || !selectedProvider}
                  >
                    <Mic className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
          
          <Button 
            type="submit" 
            size="sm" 
            className={cn(
              "ml-auto gap-1.5",
              input.length > 0 ? "bg-primary" : "bg-muted text-muted-foreground"
            )}
            disabled={!input.trim() || isLoading || !selectedProvider}
          >
            Send
            <Send className="size-3.5" />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ChatInputForm;
