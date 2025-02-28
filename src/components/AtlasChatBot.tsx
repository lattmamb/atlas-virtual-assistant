
import { useState, FormEvent, useRef } from "react";
import { Bot, Send, Sparkles, Settings, Code, FileText, Image, PenTool, Workflow, X, Maximize2, Minimize2 } from "lucide-react";
import { useChat } from "@/context/ChatContext";
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from "@/components/ui/expandable-chat";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat-bubble";
import { ChatInput } from "@/components/ui/chat-input";
import { Button } from "@/components/ui/button";
import { ChatMessageList } from "@/components/ui/chat-message-list";
import Widget from "@/components/icloud/Widget";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const AITools = [
  { name: "Text Generation", icon: <FileText size={16} /> },
  { name: "Code Assistant", icon: <Code size={16} /> },
  { name: "Image Creation", icon: <Image size={16} /> },
  { name: "Drawing", icon: <PenTool size={16} /> },
  { name: "Workflows", icon: <Workflow size={16} /> },
];

const AtlasChatBot = () => {
  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  const { 
    messages, 
    sendMessage, 
    isLoading, 
    selectedProvider, 
    availableProviders, 
    setSelectedProvider 
  } = useChat();
  
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    sendMessage(input);
    setInput("");
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleToolClick = (toolName: string) => {
    setActiveTool(toolName === activeTool ? null : toolName);
  };

  return (
    <Widget
      title="Atlas Assistant"
      icon={<Bot className="h-5 w-5" />}
      minWidth="340px"
      minHeight={isMinimized ? "52px" : "480px"}
      className="z-30"
      headerControls={
        <>
          {isExpanded ? (
            <button onClick={toggleExpand} className="p-1.5 hover:bg-white/10 rounded-full transition">
              <Minimize2 className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button onClick={toggleExpand} className="p-1.5 hover:bg-white/10 rounded-full transition">
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}
          <button onClick={toggleMinimize} className="p-1.5 hover:bg-white/10 rounded-full transition">
            {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
          </button>
        </>
      }
    >
      {!isMinimized && (
        <div className="flex flex-col h-full">
          <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-2">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="flex-1 flex flex-col h-full">
              <div className="flex-1 overflow-auto">
                <ChatMessageList>
                  {messages.map((message) => (
                    <ChatBubble
                      key={message.id}
                      variant={message.role === "user" ? "sent" : "received"}
                    >
                      <ChatBubbleAvatar
                        className="h-8 w-8 shrink-0"
                        fallback={message.role === "user" ? "You" : "AI"}
                      />
                      <ChatBubbleMessage
                        variant={message.role === "user" ? "sent" : "received"}
                        isLoading={message.isLoading}
                      >
                        {message.content}
                      </ChatBubbleMessage>
                    </ChatBubble>
                  ))}
                </ChatMessageList>
              </div>
              
              <div className="mt-4">
                {availableProviders.length === 0 ? (
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
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
                  >
                    <ChatInput
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask me anything..."
                      className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
                      disabled={isLoading || !selectedProvider}
                    />
                    <div className="flex items-center p-3 pt-0 justify-between">
                      <div className="text-xs text-muted-foreground italic">
                        {selectedProvider ? 
                          `Using ${selectedProvider.charAt(0).toUpperCase() + selectedProvider.slice(1)}` : 
                          "Select a provider above"}
                      </div>
                      <Button 
                        type="submit" 
                        size="sm" 
                        className="ml-auto gap-1.5"
                        disabled={!input.trim() || isLoading || !selectedProvider}
                      >
                        Send
                        <Send className="size-3.5" />
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="tools" className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {AITools.map((tool) => (
                  <TooltipProvider key={tool.name}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant={activeTool === tool.name ? "default" : "outline"} 
                          className="flex flex-col h-20 items-center justify-center gap-2 text-xs"
                          onClick={() => handleToolClick(tool.name)}
                        >
                          {tool.icon}
                          {tool.name}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Coming soon</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
              
              {activeTool && (
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      {AITools.find(t => t.name === activeTool)?.icon}
                      {activeTool}
                    </h3>
                    <Button size="sm" variant="ghost" onClick={() => setActiveTool(null)}>
                      <X size={14} />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This feature is coming soon. Check back later!
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="settings">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">AI Provider</h3>
                  {availableProviders.length > 0 ? (
                    <select
                      value={selectedProvider || ""}
                      onChange={(e) => setSelectedProvider(e.target.value as any)}
                      className="w-full p-2 text-sm rounded-md border"
                    >
                      <option value="" disabled>Select Provider</option>
                      {availableProviders.map((provider) => (
                        <option key={provider} value={provider}>
                          {provider.charAt(0).toUpperCase() + provider.slice(1)}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No API keys found. Please add them in the settings page.
                    </p>
                  )}
                </div>
                
                <Button 
                  onClick={() => navigate("/settings")} 
                  className="w-full flex items-center gap-2"
                >
                  <Settings size={14} />
                  Manage API Keys
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </Widget>
  );
};

export default AtlasChatBot;
