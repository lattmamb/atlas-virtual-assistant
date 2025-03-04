
import { useRef } from "react";
import { useChat } from "@/context/ChatContext";
import { useIsMobile } from "@/hooks/use-mobile";
import Widget from "@/components/icloud/Widget";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatBotContainer from "./ChatBotContainer";
import { useAtlasState } from "./hooks/useAtlasState";

const AtlasChatBot = () => {
  const widgetRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const {
    isMinimized,
    isExpanded,
    activeTab,
    activeTool,
    setActiveTab,
    setActiveTool,
    toggleMinimize,
    toggleExpand
  } = useAtlasState();

  const { 
    messages, 
    sendMessage, 
    isLoading, 
    selectedProvider, 
    availableProviders, 
    setSelectedProvider 
  } = useChat();

  return (
    <Widget
      title="Atlas Assistant"
      icon={<ChatHeader 
        isExpanded={isExpanded} 
        isMinimized={isMinimized} 
        toggleExpand={toggleExpand} 
        toggleMinimize={toggleMinimize} 
      />}
      minWidth={isMobile ? "280px" : "340px"}
      minHeight={isMinimized ? "52px" : isMobile ? "400px" : "480px"}
      className="z-30"
      isDarkMode={true}
    >
      <ChatBotContainer
        isMinimized={isMinimized}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        messages={messages}
        isLoading={isLoading}
        selectedProvider={selectedProvider}
        availableProviders={availableProviders}
        sendMessage={sendMessage}
        setSelectedProvider={setSelectedProvider}
        activeTool={activeTool}
        setActiveTool={setActiveTool}
      />
    </Widget>
  );
};

export default AtlasChatBot;
