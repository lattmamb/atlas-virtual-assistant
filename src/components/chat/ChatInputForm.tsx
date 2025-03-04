
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ApiKeyProvider } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";

// Import new component files
import ChatInputField from "./input/ChatInputField";
import ChatInputActions from "./input/ChatInputActions";
import NoProviderMessage from "./input/NoProviderMessage";
import { useChatInputState } from "./input/useChatInputState";
import { getSuggestions } from "./input/getSuggestions";

interface ChatInputFormProps {
  isLoading: boolean;
  selectedProvider: ApiKeyProvider | null;
  sendMessage: (content: string) => void;
  availableProviders: ApiKeyProvider[];
  aiMode?: 'atlas' | 'grok';
}

const ChatInputForm = ({ 
  isLoading, 
  selectedProvider, 
  sendMessage, 
  availableProviders,
  aiMode = "atlas" 
}: ChatInputFormProps) => {
  const navigate = useNavigate();
  const {
    input,
    isFocused,
    showSuggestions,
    inputRef,
    handleInputChange,
    handleFocus,
    handleBlur,
    handleSelectSuggestion,
    clearInput
  } = useChatInputState();
  
  const suggestions = getSuggestions(aiMode);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    sendMessage(input);
    clearInput();
  };

  if (availableProviders.length === 0) {
    return <NoProviderMessage onNavigateToSettings={() => navigate("/settings")} />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1",
        aiMode === "grok" && isFocused && "focus-within:ring-purple-500"
      )}
    >
      <ChatInputField
        ref={inputRef}
        input={input}
        isFocused={isFocused}
        showSuggestions={showSuggestions}
        aiMode={aiMode}
        suggestions={suggestions}
        isLoading={isLoading}
        selectedProvider={selectedProvider}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onSelectSuggestion={handleSelectSuggestion}
      />
      
      <AnimatePresence>
        <ChatInputActions
          input={input}
          isLoading={isLoading}
          selectedProvider={selectedProvider}
          aiMode={aiMode}
          onSubmit={handleSubmit}
        />
      </AnimatePresence>
    </form>
  );
};

export default ChatInputForm;
