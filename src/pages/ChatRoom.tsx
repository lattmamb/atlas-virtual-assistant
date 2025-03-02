
import React, { useState, useEffect } from "react";
import { useChat } from "@/context/ChatContext";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/grid-pattern";
import { AnimatePresence } from "framer-motion";
import { ChatBackgroundEffect } from "@/components/effects/ChatBackgroundEffect";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useToast } from "@/hooks/use-toast";
import ChatRoomHeader from "@/components/chat/ChatRoomHeader";
import ChatRoomContainer from "@/components/chat/ChatRoomContainer";
import ChatTimelinePanel from "@/components/chat/ChatTimelinePanel";

// Sample timeline items for the demo
const timelineItems = [
  { id: '1', time: '10:30 AM', content: 'Started conversation', type: 'event' as const },
  { id: '2', time: '10:32 AM', content: 'Asked about weather', type: 'message' as const },
  { id: '3', time: '10:35 AM', content: 'Important reminder highlighted', type: 'star' as const },
  { id: '4', time: '10:40 AM', content: 'Discussed vehicle options', type: 'message' as const },
  { id: '5', time: '10:45 AM', content: 'Shared inventory details', type: 'event' as const },
  { id: '6', time: 'Now', content: 'Current activity', type: 'star' as const },
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
  const [showTimeline, setShowTimeline] = useState(false);
  const [starredMessage, setStarredMessage] = useState<string | null>(null);
  const [typingStatus, setTypingStatus] = useState<string>("Ready");
  const { ref: scrollRef, scrollProgress } = useScrollAnimation();
  const { toast } = useToast();

  // Toggle theme on specific message patterns
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'user') {
        if (lastMessage.content.toLowerCase().includes('dark mode') || 
            lastMessage.content.toLowerCase().includes('night mode')) {
          document.documentElement.classList.add('dark');
          toast({
            title: "Theme changed",
            description: "Dark mode activated",
          });
        } else if (lastMessage.content.toLowerCase().includes('light mode') || 
                 lastMessage.content.toLowerCase().includes('day mode')) {
          document.documentElement.classList.remove('dark');
          toast({
            title: "Theme changed",
            description: "Light mode activated",
          });
        }
      }
    }
  }, [messages, toast]);

  // Simulate typing status changes
  useEffect(() => {
    if (isLoading) {
      setTypingStatus("Atlas is thinking...");
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
    toast({
      title: starredMessage === messageId ? "Message unstarred" : "Message starred",
      description: "You can find starred messages in your timeline",
    });
  };

  return (
    <div className="flex flex-col h-full">
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
      
      {/* Chat Room Header */}
      <ChatRoomHeader 
        typingStatus={typingStatus}
        isLoading={isLoading}
        showTimeline={showTimeline}
        setShowTimeline={setShowTimeline}
      />
      
      <div className="flex-1 flex h-full overflow-hidden p-4 animate-fade-in">
        {/* Main Chat Container */}
        <ChatRoomContainer
          messages={messages}
          isLoading={isLoading}
          selectedProvider={selectedProvider}
          availableProviders={availableProviders}
          sendMessage={sendMessage}
          starredMessage={starredMessage}
          handleStarMessage={handleStarMessage}
          scrollRef={scrollRef}
        />
        
        {/* Timeline Panel */}
        <AnimatePresence>
          {showTimeline && (
            <ChatTimelinePanel 
              items={timelineItems} 
              onClose={() => setShowTimeline(false)} 
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChatRoom;
