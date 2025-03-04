
import { useState, useRef, useEffect } from "react";

export function useChatInputState() {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto-focus the input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const handleInputChange = (value: string) => {
    setInput(value);
    setShowSuggestions(value.length > 0 && value.length < 5);
  };
  
  const handleFocus = () => {
    setIsFocused(true);
  };
  
  const handleBlur = () => {
    setIsFocused(false);
    // Small delay to allow clicking on suggestions
    setTimeout(() => setShowSuggestions(false), 200);
  };
  
  const handleSelectSuggestion = (suggestion: string) => {
    setInput(suggestion);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  const clearInput = () => {
    setInput("");
    setShowSuggestions(false);
  };
  
  return {
    input,
    isFocused,
    showSuggestions,
    inputRef,
    handleInputChange,
    handleFocus,
    handleBlur,
    handleSelectSuggestion,
    clearInput
  };
}
