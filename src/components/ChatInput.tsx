
import { useState } from "react";
import { useChat } from "@/context/ChatContext";
import { SendHorizonal } from "lucide-react";

const ChatInput = () => {
  const [input, setInput] = useState("");
  const { sendMessage, isLoading } = useChat();

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

  return (
    <div className="w-full max-w-4xl mx-auto">
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
