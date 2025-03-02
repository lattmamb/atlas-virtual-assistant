
import React, { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInputForm from "@/components/chat/ChatInputForm";
import { useChat } from "@/context/ChatContext";
import AppleNavBar from "@/components/AppleNavBar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/grid-pattern";
import { AnimatePresence, motion } from "framer-motion";
import { Message } from "@/lib/types";
import { ChatBackgroundEffect } from "@/components/effects/ChatBackgroundEffect";
import { LampEffect } from "@/components/ui/LampEffect";
import ChatTimeline from "@/components/chat/ChatTimeline";
import { GooeyText } from "@/components/ui/GooeyText";
import RainbowButton from "@/components/chat/RainbowButton";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { StarBorder } from "@/components/ui/starBorder";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus, PanelRightOpen, Star } from "lucide-react";

// Sample timeline items for the demo
const timelineItems = [
  { id: '1', time: '10:30 AM', content: 'Started conversation', type: 'event' as const },
  { id: '2', time: '10:32 AM', content: 'Asked about weather', type: 'message' as const },
  { id: '3', time: '10:35 AM', content: 'Important reminder highlighted', type: 'star' as const },
];

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
  const [showTimeline, setShowTimeline] = useState(false);
  const [starredMessage, setStarredMessage] = useState<string | null>(null);
  const [typingStatus, setTypingStatus] = useState<string>("Ready");
  const { ref: scrollRef, scrollProgress } = useScrollAnimation();

  // Simulate typing status changes
  useEffect(() => {
    if (isLoading) {
      setTypingStatus("Assistant is typing...");
    } else if (messages.length > 0 && messages[messages.length - 1].role === 'assistant') {
      setTypingStatus("Message delivered");
      
      // Reset back to ready after a delay
      const timer = setTimeout(() => {
        setTypingStatus("Ready");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, messages]);

  const handleStarMessage = (messageId: string) => {
    setStarredMessage(starredMessage === messageId ? null : messageId);
  };

  // Wrap message in StarBorder when it's starred
  const renderMessage = (message: Message) => {
    const isStarred = starredMessage === message.id;
    
    return (
      <StarBorder highlighted={isStarred} key={message.id}>
        <div className="relative group">
          {message.role === 'user' && (
            <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 text-yellow-500"
                onClick={() => handleStarMessage(message.id)}
              >
                <Star className="h-4 w-4" />
              </Button>
            </div>
          )}
          {message.content}
        </div>
      </StarBorder>
    );
  };

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className={cn(
        "flex h-screen w-full overflow-hidden",
        `theme-${currentTheme}`
      )}>
        <div 
          className="fixed inset-0 z-0 transition-all duration-700"
          style={{ background: `var(--background-gradient)` }}
        >
          <GridPattern 
            width={40} 
            height={40} 
            className={cn(
              "absolute inset-0 fill-white/[0.01] stroke-white/[0.05]",
              "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]"
            )}
            strokeDasharray="1 3"
          />
          
          {/* Apply background effects */}
          <ChatBackgroundEffect isDarkMode={isDarkMode} />
        </div>
        
        <AppSidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <AppleNavBar 
            showAppGridButton={false}
          />
          
          {/* Apply Lamp effect to the header */}
          <LampEffect subtle className="w-full pt-14">
            <div className="max-w-4xl mx-auto w-full px-4 py-2 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                <GooeyText text={typingStatus} duration={0.5} className="italic" />
              </div>
              
              <div className="flex items-center gap-2">
                <RainbowButton
                  size="sm" 
                  subtle 
                  variant="outline"
                  onClick={() => setShowTimeline(!showTimeline)}
                >
                  {showTimeline ? <MessageSquarePlus className="h-4 w-4 mr-1" /> : <PanelRightOpen className="h-4 w-4 mr-1" />}
                  {showTimeline ? "Focus Chat" : "Show Timeline"}
                </RainbowButton>
              </div>
            </div>
          </LampEffect>
          
          <div className="flex-1 flex h-full max-h-[calc(100vh-3rem)] overflow-hidden p-4 animate-fade-in">
            <motion.div 
              className="flex-1 flex flex-col overflow-hidden border rounded-lg hybrid"
              style={{ borderColor: 'var(--widget-border)' }}
              ref={scrollRef}
              animate={{
                scale: 1 - (scrollProgress * 0.03),
                y: scrollProgress * 10,
              }}
              transition={{ duration: 0.1, ease: "easeOut" }}
            >
              <div className="flex-1 overflow-y-auto">
                <ChatMessages 
                  messages={messages} 
                  customRenderer={renderMessage} 
                />
              </div>
              
              <div className="p-4 border-t" style={{ borderColor: 'var(--widget-border)' }}>
                <ChatInputForm 
                  isLoading={isLoading}
                  selectedProvider={selectedProvider}
                  sendMessage={sendMessage}
                  availableProviders={availableProviders}
                />
              </div>
            </motion.div>
            
            {/* Timeline panel */}
            <AnimatePresence>
              {showTimeline && (
                <motion.div 
                  className="w-72 ml-4 overflow-hidden border rounded-lg hybrid hidden md:block"
                  style={{ borderColor: 'var(--widget-border)' }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-4">
                    <ChatTimeline items={timelineItems} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ChatRoom;
