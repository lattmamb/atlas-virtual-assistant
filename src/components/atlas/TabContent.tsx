
import { ReactNode } from "react";
import { TabsContent } from "@/components/ui/tabs";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInputForm from "@/components/chat/ChatInputForm";
import ToolsPanel from "@/components/chat/ToolsPanel";
import SettingsPanel from "@/components/chat/SettingsPanel";
import { Message, ApiKeyProvider } from "@/lib/types";

interface TabContentProps {
  activeTab: string;
  messages: Message[];
  isLoading: boolean;
  selectedProvider: ApiKeyProvider | null;
  availableProviders: ApiKeyProvider[];
  sendMessage: (content: string) => void;
  setSelectedProvider: (provider: ApiKeyProvider | null) => void;
  activeTool: string | null;
  setActiveTool: (tool: string | null) => void;
}

const TabContent = ({
  activeTab,
  messages,
  isLoading,
  selectedProvider,
  availableProviders,
  sendMessage,
  setSelectedProvider,
  activeTool,
  setActiveTool
}: TabContentProps) => {
  return (
    <>
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
    </>
  );
};

export default TabContent;
