
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInputForm from "@/components/chat/ChatInputForm";
import { useChat } from "@/context/ChatContext";
import AppleNavBar from "@/components/AppleNavBar";
import { useIsMobile } from "@/hooks/use-mobile";

const ChatRoom = () => {
  const { 
    messages, 
    sendMessage, 
    isLoading, 
    selectedProvider, 
    availableProviders 
  } = useChat();
  
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const isMobile = useIsMobile();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className={cn(
        "flex h-screen w-full overflow-hidden",
        isDarkMode ? "bg-[#111111] text-white" : "bg-gray-50 text-gray-800"
      )}>
        <AppSidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <AppleNavBar 
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
            showAppGridButton={false}
          />
          
          <div className="flex-1 flex flex-col h-full max-h-[calc(100vh-3rem)] overflow-hidden p-4 pt-14 animate-fade-in">
            <div className="flex-1 overflow-hidden border rounded-lg flex flex-col">
              <div className="flex-1 overflow-y-auto">
                <ChatMessages messages={messages} />
              </div>
              
              <div className="p-4 border-t">
                <ChatInputForm 
                  isLoading={isLoading}
                  selectedProvider={selectedProvider}
                  sendMessage={sendMessage}
                  availableProviders={availableProviders}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

// Add the missing cn import
import { cn } from "@/lib/utils";

export default ChatRoom;
