
import { forwardRef } from "react";
import { ChatInput } from "@/components/ui/chat-input";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import InputSparkles from "./InputSparkles";
import ChatInputSuggestions from "./ChatInputSuggestions";

interface ChatInputFieldProps {
  input: string;
  isFocused: boolean;
  showSuggestions: boolean;
  aiMode: 'atlas' | 'grok';
  suggestions: string[];
  isLoading: boolean;
  selectedProvider: string | null;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onSelectSuggestion: (suggestion: string) => void;
}

const ChatInputField = forwardRef<HTMLTextAreaElement, ChatInputFieldProps>(({
  input,
  isFocused,
  showSuggestions,
  aiMode,
  suggestions,
  isLoading,
  selectedProvider,
  onChange,
  onFocus,
  onBlur,
  onSelectSuggestion
}, ref) => {
  return (
    <div className="relative">
      <AnimatePresence>
        <InputSparkles isFocused={isFocused} aiMode={aiMode} />
      </AnimatePresence>
      
      <ChatInput
        ref={ref}
        value={input}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={aiMode === "atlas" ? "Ask me anything..." : "Ask me anything... I'm real-time"}
        className={cn(
          "min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0",
          isFocused && "bg-background/50"
        )}
        disabled={isLoading || !selectedProvider}
      />
      
      <AnimatePresence>
        {showSuggestions && (
          <ChatInputSuggestions
            input={input}
            suggestions={suggestions}
            onSelectSuggestion={onSelectSuggestion}
            showSuggestions={showSuggestions}
          />
        )}
      </AnimatePresence>
    </div>
  );
});

ChatInputField.displayName = "ChatInputField";

export default ChatInputField;
