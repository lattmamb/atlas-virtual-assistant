
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInputForm from "@/components/chat/ChatInputForm";
import { useChat } from "@/context/ChatContext";
import AppleNavBar from "@/components/AppleNavBar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

const ChatRoom = () => {
  const { 
    messages, 
    sendMessage, 
    isLoading, 
    selectedProvider, 
    availableProviders 
  } = useChat();
  
  const { currentTheme, isDarkMode } = useTheme();
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className={cn(
        "flex h-screen w-full overflow-hidden",
        `theme-${currentTheme}`
      )}>
        <AppSidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <AppleNavBar 
            showAppGridButton={false}
          />
          
          <div className="flex-1 flex flex-col h-full max-h-[calc(100vh-3rem)] overflow-hidden p-4 pt-14 animate-fade-in">
            <div className="flex-1 overflow-hidden border rounded-lg flex flex-col"
              style={{ borderColor: 'var(--widget-border)' }}>
              <div className="flex-1 overflow-y-auto">
                <ChatMessages messages={messages} />
              </div>
              
              <div className="p-4 border-t" style={{ borderColor: 'var(--widget-border)' }}>
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

export default ChatRoom;
