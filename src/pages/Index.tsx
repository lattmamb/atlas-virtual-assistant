import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChat } from "@/context/ChatContext";
import { useIsMobile } from "@/hooks/use-mobile";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import { Settings, Trash2, Apple, LayoutGrid, MessageSquare, Workflow, Menu, X } from "lucide-react";
import { NavbarDemo } from "@/components/ui/code-demo";
import { VercelV0Chat } from "@/components/ui/v0-ai-chat";
import ICloudLayout from "@/components/icloud/ICloudLayout";
import Widget from "@/components/icloud/Widget";
import NavbarMenu from "@/components/ui/navbar-menu";

const ChatContainer = () => {
  const { messages, clearMessages, selectedProvider, availableProviders, setSelectedProvider } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between py-3 px-4 md:py-4 md:px-8 border-b bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="text-primary">
            <Apple size={isMobile ? 24 : 28} />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-medium">Atlas Assistant</h1>
            <p className="text-xs text-muted-foreground">Your personal AI companion</p>
          </div>
        </div>
        
        {isMobile ? (
          <>
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            {menuOpen && (
              <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 z-50 w-[200px] animate-fade-in">
                <NavbarMenu vertical />
                <div className="mt-4 space-y-2">
                  {availableProviders.length > 0 && (
                    <select
                      value={selectedProvider || ""}
                      onChange={(e) => setSelectedProvider(e.target.value as any)}
                      className="w-full bg-secondary text-sm rounded-full px-4 py-1.5 border-none focus:ring-2 focus:ring-primary/20 outline-none"
                    >
                      <option value="" disabled>Select Provider</option>
                      {availableProviders.map((provider) => (
                        <option key={provider} value={provider}>
                          {provider.charAt(0).toUpperCase() + provider.slice(1)}
                        </option>
                      ))}
                    </select>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={clearMessages}
                      className="flex-1 py-2 px-3 rounded-lg hover:bg-secondary transition-colors text-slate-600 flex items-center justify-center gap-2"
                      aria-label="Clear chat"
                    >
                      <Trash2 size={16} />
                      <span className="text-sm">Clear</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate("/settings");
                        setMenuOpen(false);
                      }}
                      className="flex-1 py-2 px-3 rounded-lg hover:bg-secondary transition-colors text-slate-600 flex items-center justify-center gap-2"
                      aria-label="Settings"
                    >
                      <Settings size={16} />
                      <span className="text-sm">Settings</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <NavbarMenu />
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
          </>
        )}
      </header>

      <div className="flex-1 overflow-y-auto px-3 py-4 md:px-6 md:py-6 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="py-4 px-3 md:py-6 md:px-6 border-t bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <ChatInput />
        </div>
      </div>
    </div>
  );
};

const WidgetChatContainer = () => {
  const { messages } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[300px]">
        {messages.length > 0 ? (
          messages.slice(-3).map((message) => (
            <div key={message.id} className="flex flex-col">
              <div className="text-xs font-medium mb-1">
                {message.role === "user" ? "You" : "Atlas"}
              </div>
              <div className={`p-2 rounded-lg text-sm ${
                message.role === "user" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
              }`}>
                {message.content}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-6">
            <p className="text-sm">Ask me anything!</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-3 border-t">
        <ChatInput compact />
      </div>
    </div>
  );
};

const Index = () => {
  const [displayMode, setDisplayMode] = useState<'atlas' | 'vercel' | 'icloud'>('icloud');
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="h-screen w-full overflow-hidden">
      {displayMode === 'icloud' ? (
        <ICloudLayout>
          <div className="flex flex-wrap gap-4 p-4">
            <Widget
              title="Atlas Assistant"
              icon={<MessageSquare className="h-5 w-5" />}
              minWidth={isMobile ? "280px" : "340px"}
            >
              <WidgetChatContainer />
            </Widget>
            
            <Widget
              title="Workflows"
              icon={<Workflow className="h-5 w-5" />}
              minWidth={isMobile ? "280px" : "340px"}
            >
              <div className="p-4 flex flex-col items-center justify-center h-full">
                <div className="text-center mb-4">
                  <Workflow className="h-10 w-10 text-primary/50 mb-2 mx-auto" />
                  <h3 className="text-lg font-medium">Automation Workflows</h3>
                  <p className="text-sm text-muted-foreground">Create powerful AI automations</p>
                </div>
                <button 
                  onClick={() => navigate("/workflows")}
                  className="px-4 py-2 bg-primary text-white rounded-full text-sm"
                >
                  Open Workflows
                </button>
              </div>
            </Widget>
          </div>
        </ICloudLayout>
      ) : displayMode === 'vercel' ? (
        <div className="h-full w-full overflow-auto bg-gradient-to-br from-zinc-900 to-black">
          <VercelV0Chat />
        </div>
      ) : (
        <div className="h-full w-full max-w-[1400px] mx-auto apple-card my-0 md:my-4 lg:my-8 overflow-hidden shadow-xl bg-white/95">
          <ChatContainer />
        </div>
      )}
      
      <div className={`fixed ${isMobile ? 'bottom-2 right-2' : 'bottom-4 right-4'} flex ${isMobile ? 'flex-col gap-1' : 'gap-2'}`}>
        <button 
          onClick={() => setDisplayMode('atlas')}
          className={`${displayMode === 'atlas' ? 'bg-primary' : 'bg-secondary'} text-white ${isMobile ? 'px-3 py-1.5 text-xs' : 'px-4 py-2'} rounded-md shadow-md flex items-center gap-1`}
        >
          <Apple size={16} /> {!isMobile && "Atlas"}
        </button>
        <button 
          onClick={() => setDisplayMode('vercel')}
          className={`${displayMode === 'vercel' ? 'bg-primary' : 'bg-secondary'} text-white ${isMobile ? 'px-3 py-1.5 text-xs' : 'px-4 py-2'} rounded-md shadow-md flex items-center gap-1`}
        >
          {!isMobile && "Vercel UI"}
          <span className="font-bold">V0</span>
        </button>
        <button 
          onClick={() => setDisplayMode('icloud')}
          className={`${displayMode === 'icloud' ? 'bg-primary' : 'bg-secondary'} text-white ${isMobile ? 'px-3 py-1.5 text-xs' : 'px-4 py-2'} rounded-md shadow-md flex items-center gap-1`}
        >
          <LayoutGrid size={16} /> {!isMobile && "iCloud"}
        </button>
      </div>
    </div>
  );
};

export default Index;
