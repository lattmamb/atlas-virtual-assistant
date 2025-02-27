
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatProvider, useChat } from "@/context/ChatContext";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import AnimatedLogo from "@/components/AnimatedLogo";
import { Settings, Trash2 } from "lucide-react";

const ChatContainer = () => {
  const { messages, clearMessages } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between py-4 px-8 border-b">
        <div className="flex items-center gap-3">
          <AnimatedLogo />
          <div>
            <h1 className="text-xl font-medium">Atlas Assistant</h1>
            <p className="text-xs text-muted-foreground">Your personal AI companion</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={clearMessages}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
            aria-label="Clear chat"
          >
            <Trash2 size={20} />
          </button>
          <button
            onClick={() => navigate("/settings")}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
            aria-label="Settings"
          >
            <Settings size={20} />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="py-6 px-6 border-t bg-gradient-to-b from-transparent to-slate-50/50">
        <ChatInput />
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-50 to-slate-50 overflow-hidden">
      <ChatProvider>
        <div className="h-full w-full max-w-[1400px] mx-auto">
          <ChatContainer />
        </div>
      </ChatProvider>
    </div>
  );
};

export default Index;
