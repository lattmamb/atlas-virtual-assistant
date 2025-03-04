
import { useState, FormEvent, KeyboardEvent, useRef, useEffect } from "react";
import { Send, Loader2, X } from "lucide-react";
import { useChat } from "@/context/ChatContext";

interface ChatInputProps {
  compact?: boolean;
}

const ChatInput = ({ compact = false }: ChatInputProps) => {
  const [input, setInput] = useState("");
  const { sendMessage, isLoading } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className={`relative flex items-center ${compact ? 'rounded-full' : 'rounded-xl'} bg-secondary/30 shadow-input focus-within:ring-2 focus-within:ring-primary/20`}>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={compact ? "Ask Atlas..." : "Type your message..."}
          className={`flex-1 resize-none border-0 bg-transparent py-3 ${compact ? 'px-4 text-sm' : 'px-5'} placeholder:text-muted-foreground focus:outline-none focus:ring-0 disabled:opacity-50 max-h-[200px]`}
          rows={compact ? 1 : 2}
          disabled={isLoading}
        />
        {input && !isLoading && (
          <button
            type="button"
            onClick={() => setInput("")}
            className="p-2 text-muted-foreground hover:text-foreground"
            aria-label="Clear input"
          >
            <X size={18} />
          </button>
        )}
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className={`${compact ? 'mr-1 p-2' : 'mr-2 p-2'} text-primary bg-primary-foreground rounded-full disabled:opacity-50 hover:bg-accent transition-colors`}
          aria-label="Send message"
        >
          {isLoading ? (
            <Loader2 size={compact ? 16 : 20} className="animate-spin" />
          ) : (
            <Send size={compact ? 16 : 20} />
          )}
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
