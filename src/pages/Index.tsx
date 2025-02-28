
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChat } from "@/context/ChatContext";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import { Settings, Trash2, Apple } from "lucide-react";
import { NavbarDemo } from "@/components/ui/code-demo";
import { VercelV0Chat } from "@/components/ui/v0-ai-chat";

const ChatContainer = () => {
  const { messages, clearMessages, selectedProvider, availableProviders, setSelectedProvider } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between py-4 px-8 border-b bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="text-primary">
            <Apple size={28} />
          </div>
          <div>
            <h1 className="text-xl font-medium">Atlas Assistant</h1>
            <p className="text-xs text-muted-foreground">Your personal AI companion</p>
          </div>
        </div>
        <NavbarDemo />
        <div className="flex items-center gap-4">
          {availableProviders.length > 0 && (
            <select
              value={selectedProvider || ""}
              onChange={(e) => setSelectedProvider(e.target.value as any)}
              className="bg-secondary text-sm rounded-full px-4 py-1.5 border-none focus:ring-2 focus:ring-primary/20 outline-none"
            >
              <option value="" disabled>Select Provider</option>
              {availableProviders.map((provider) => (
                <option key={provider} value={provider}>
                  {provider.charAt(0).toUpperCase() + provider.slice(1)}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={clearMessages}
            className="p-2 rounded-full hover:bg-secondary transition-colors text-slate-400 hover:text-slate-600"
            aria-label="Clear chat"
          >
            <Trash2 size={20} />
          </button>
          <button
            onClick={() => navigate("/settings")}
            className="p-2 rounded-full hover:bg-secondary transition-colors text-slate-400 hover:text-slate-600"
            aria-label="Settings"
          >
            <Settings size={20} />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-6 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="py-6 px-6 border-t bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <ChatInput />
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  const [showVercelUI, setShowVercelUI] = useState(false);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-50 to-red-50/30 overflow-hidden">
      {showVercelUI ? (
        <div className="h-full w-full overflow-auto">
          <VercelV0Chat />
        </div>
      ) : (
        <div className="h-full w-full max-w-[1400px] mx-auto apple-card my-4 md:my-6 lg:my-8 overflow-hidden shadow-xl bg-white/95">
          <ChatContainer />
        </div>
      )}
      <div className="fixed bottom-4 right-4">
        <button 
          onClick={() => setShowVercelUI(!showVercelUI)}
          className="bg-primary text-white px-4 py-2 rounded-md shadow-md"
        >
          {showVercelUI ? "Switch to Atlas" : "Switch to Vercel UI"}
        </button>
      </div>
    </div>
  );
};

export default Index;
