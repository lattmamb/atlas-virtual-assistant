
import { Tabs } from "@/components/ui/tabs";
import TabsNavigation from "./TabsNavigation";
import TabContent from "./TabContent";
import { Message, ApiKeyProvider } from "@/lib/types";

interface ChatBotContainerProps {
  isMinimized: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  messages: Message[];
  isLoading: boolean;
  selectedProvider: ApiKeyProvider | null;
  availableProviders: ApiKeyProvider[];
  sendMessage: (content: string) => void;
  setSelectedProvider: (provider: ApiKeyProvider | null) => void;
  activeTool: string | null;
  setActiveTool: (tool: string | null) => void;
}

const ChatBotContainer = ({
  isMinimized,
  activeTab,
  setActiveTab,
  messages,
  isLoading,
  selectedProvider,
  availableProviders,
  sendMessage,
  setSelectedProvider,
  activeTool,
  setActiveTool
}: ChatBotContainerProps) => {
  if (isMinimized) {
    return null;
  }

  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsNavigation activeTab={activeTab} onChange={setActiveTab} />
        
        <TabContent
          activeTab={activeTab}
          messages={messages}
          isLoading={isLoading}
          selectedProvider={selectedProvider}
          availableProviders={availableProviders}
          sendMessage={sendMessage}
          setSelectedProvider={setSelectedProvider}
          activeTool={activeTool}
          setActiveTool={setActiveTool}
        />
      </Tabs>
    </div>
  );
};

export default ChatBotContainer;
