
import { useState, useRef } from "react";
import { useChat } from "@/context/ChatContext";
import {
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import Widget from "@/components/icloud/Widget";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInputForm from "@/components/chat/ChatInputForm";
import ToolsPanel from "@/components/chat/ToolsPanel";
import SettingsPanel from "@/components/chat/SettingsPanel";

const AtlasChatBot = () => {
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

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Widget
      title="Atlas Assistant"
      icon={<ChatHeader 
        isExpanded={isExpanded} 
        isMinimized={isMinimized} 
        toggleExpand={toggleExpand} 
        toggleMinimize={toggleMinimize} 
      />}
      minWidth="340px"
      minHeight={isMinimized ? "52px" : "480px"}
      className="z-30"
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
              <ChatMessages messages={messages} />
              
              <div className="mt-4">
                <ChatInputForm 
                  isLoading={isLoading}
                  selectedProvider={selectedProvider}
                  sendMessage={sendMessage}
                  availableProviders={availableProviders}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="tools" className="space-y-4">
              <ToolsPanel 
                activeTool={activeTool} 
                setActiveTool={setActiveTool}
              />
            </TabsContent>
            
            <TabsContent value="settings">
              <SettingsPanel
                selectedProvider={selectedProvider}
                setSelectedProvider={setSelectedProvider}
                availableProviders={availableProviders}
              />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </Widget>
  );
};

export default AtlasChatBot;
