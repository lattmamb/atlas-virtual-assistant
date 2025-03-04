
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface ChatInputSuggestionsProps {
  input: string;
  suggestions: string[];
  onSelectSuggestion: (suggestion: string) => void;
  showSuggestions: boolean;
}

const ChatInputSuggestions = ({
  input,
  suggestions,
  onSelectSuggestion,
  showSuggestions,
}: ChatInputSuggestionsProps) => {
  if (!showSuggestions) return null;

  return (
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
              onClick={() => onSelectSuggestion(suggestion)}
            >
              {suggestion}
            </button>
          ))}
      </div>
    </motion.div>
  );
};

export default ChatInputSuggestions;
