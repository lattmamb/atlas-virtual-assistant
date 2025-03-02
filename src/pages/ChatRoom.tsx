
import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInputForm from "@/components/chat/ChatInputForm";
import { useChat } from "@/context/ChatContext";
import AppleNavBar from "@/components/AppleNavBar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/grid-pattern";
import { MessageSquare, ZoomIn, ZoomOut, Send } from "lucide-react";
import { AppleWidget } from "@/components/icloud/AppleWidget";
import { Button } from "@/components/ui/button";

const ChatRoom = () => {
  const { 
    messages, 
    sendMessage, 
    isLoading, 
    selectedProvider, 
    availableProviders 
  } = useChat();
  
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(100);
  const isMobile = useIsMobile();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleZoomIn = () => {
    if (zoomLevel < 150) setZoomLevel(prev => prev + 10);
  };

  const handleZoomOut = () => {
    if (zoomLevel > 70) setZoomLevel(prev => prev - 10);
  };

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className={cn(
        "min-h-screen w-full overflow-hidden transition-colors duration-300",
        isDarkMode ? "bg-gradient-to-b from-[#1a1a1a] to-[#0c0c0c] text-white" : "bg-gradient-to-b from-[#f9f9f9] to-[#f1f1f1] text-gray-800"
      )}>
        <div className="fixed inset-0 z-0">
          <GridPattern 
            width={40} 
            height={40} 
            className={cn(
              "absolute inset-0 stroke-[0.5px] [mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
              isDarkMode 
                ? "fill-white/[0.01] stroke-white/[0.05]" 
                : "fill-black/[0.01] stroke-black/[0.05]"
            )}
            strokeDasharray="1 3"
          />
          {isDarkMode && (
            <>
              <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -z-10"></div>
              <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] -z-10"></div>
            </>
          )}
        </div>
        
        <AppSidebar />
        
        <main className="flex-1 flex flex-col overflow-hidden ml-[var(--sidebar-width)]">
          <AppleNavBar 
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
            showAppGridButton={false}
          />
          
          <div className="flex-1 flex flex-col h-full p-4 pt-16 animate-fade-in">
            <div className="mb-4 flex justify-between items-center">
              <h1 className="text-2xl font-light">
                Atlas <span className="font-medium">Chat</span>
              </h1>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full hover:bg-white/10"
                  onClick={handleZoomOut}
                >
                  <ZoomOut size={18} />
                </Button>
                <span className="text-sm">{zoomLevel}%</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full hover:bg-white/10"
                  onClick={handleZoomIn}
                >
                  <ZoomIn size={18} />
                </Button>
              </div>
            </div>
            
            <AppleWidget
              title="Chat"
              icon={<MessageSquare className="h-5 w-5 text-blue-400" />}
              className="flex-1 overflow-hidden"
              minHeight="calc(100vh - 160px)"
            >
              <div className="flex flex-col h-full">
                <div 
                  className="flex-1 overflow-y-auto p-4" 
                  style={{ fontSize: `${zoomLevel}%` }}
                >
                  <ChatMessages messages={messages} />
                </div>
                
                <div className="p-4 border-t border-white/10">
                  <ChatInputForm 
                    isLoading={isLoading}
                    selectedProvider={selectedProvider}
                    sendMessage={sendMessage}
                    availableProviders={availableProviders}
                  />
                </div>
              </div>
            </AppleWidget>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ChatRoom;
