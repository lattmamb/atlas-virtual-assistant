
import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInputForm from "@/components/chat/ChatInputForm";
import { useChat } from "@/context/ChatContext";

const ChatRoom = () => {
  const { 
    messages, 
    sendMessage, 
    isLoading, 
    selectedProvider, 
    availableProviders 
  } = useChat();

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center p-4 border-b">
            <SidebarTrigger className="mr-2" />
            <h1 className="font-semibold text-xl">Chat</h1>
          </div>
          
          <div className="flex-1 flex flex-col h-full max-h-[calc(100vh-8rem)] overflow-hidden p-4 animate-fade-in">
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

export default ChatRoom;
