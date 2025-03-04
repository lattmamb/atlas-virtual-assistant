
import React, { useState, useEffect, useRef } from "react";
import { useChat } from "@/hooks/use-chat";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/grid-pattern";
import { AnimatePresence, motion } from "framer-motion";
import { ChatBackgroundEffect } from "@/components/effects/ChatBackgroundEffect";
import AmbientGlow from "@/components/effects/AmbientGlow";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useToast } from "@/hooks/use-toast";
import ChatRoomHeader from "@/components/chat/ChatRoomHeader";
import ChatRoomContainer from "@/components/chat/ChatRoomContainer";
import ChatTimelinePanel from "@/components/chat/ChatTimelinePanel";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { products } from "@/components/ui/hero-parallax.demo";
import ChatNavBar from "@/components/chat/ChatNavBar";

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
  const [showHeroParallax, setShowHeroParallax] = useState(false);
  const [aiMode, setAIMode] = useState<'atlas' | 'grok'>('atlas');
  const { ref: scrollRef, scrollProgress } = useScrollAnimation();
  const { toast } = useToast();
  const [showSearch, setShowSearch] = useState(false);

  // Toggle hero parallax with keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'h' && e.ctrlKey) {
        setShowHeroParallax(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
        } else if (lastMessage.content.toLowerCase().includes('show parallax')) {
          setShowHeroParallax(true);
          toast({
            title: "Parallax Effect",
            description: "Hero parallax effect activated",
          });
        } else if (lastMessage.content.toLowerCase().includes('hide parallax')) {
          setShowHeroParallax(false);
          toast({
            title: "Parallax Effect",
            description: "Hero parallax effect deactivated",
          });
        } else if (lastMessage.content.toLowerCase().includes('switch to grok') ||
                 lastMessage.content.toLowerCase().includes('use grok')) {
          setAIMode('grok');
          toast({
            title: "AI Mode Changed",
            description: "Switched to Grok AI mode",
          });
        } else if (lastMessage.content.toLowerCase().includes('switch to atlas') ||
                 lastMessage.content.toLowerCase().includes('use atlas')) {
          setAIMode('atlas');
          toast({
            title: "AI Mode Changed",
            description: "Switched to Atlas AI mode",
          });
        }
      }
    }
  }, [messages, toast]);

  // Simulate typing status changes
  useEffect(() => {
    if (isLoading) {
      setTypingStatus(aiMode === 'atlas' ? "Atlas is thinking..." : "Grok is thinking...");
    } else if (messages.length > 0 && messages[messages.length - 1].role === 'assistant') {
      setTypingStatus("Message delivered");
      
      // Reset back to ready after a delay
      const timer = setTimeout(() => {
        setTypingStatus("Ready");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, messages, aiMode]);

  const handleStarMessage = (messageId: string) => {
    setStarredMessage(starredMessage === messageId ? null : messageId);
    toast({
      title: starredMessage === messageId ? "Message unstarred" : "Message starred",
      description: "You can find starred messages in your timeline",
    });
  };

  const handleSearch = () => {
    setShowSearch(!showSearch);
    toast({
      title: showSearch ? "Search closed" : "Search opened",
      description: showSearch ? "Search has been closed" : "Use search to find messages",
    });
  };

  const handleAIModeChange = (mode: 'atlas' | 'grok') => {
    setAIMode(mode);
    toast({
      title: "AI Mode Changed",
      description: `Switched to ${mode === 'atlas' ? 'Atlas' : 'Grok'} AI mode`,
    });
  };

  return (
    <div className="flex flex-col h-full relative">
      {showHeroParallax && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <HeroParallax products={products} />
        </div>
      )}
      
      <div 
        className={cn(
          "fixed inset-0 z-0 transition-all duration-700",
          showHeroParallax ? "opacity-0" : "opacity-100"
        )}
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
        
        {/* Apply background effects based on AI mode */}
        <AmbientGlow aiMode={aiMode} />
        <ChatBackgroundEffect isDarkMode={isDarkMode} />
      </div>
      
      {/* Chat NavBar */}
      <ChatNavBar onSearch={handleSearch} className="z-10" />
      
      {/* Chat Room Header */}
      <ChatRoomHeader 
        typingStatus={typingStatus}
        isLoading={isLoading}
        showTimeline={showTimeline}
        setShowTimeline={setShowTimeline}
        aiMode={aiMode}
      />
      
      <div className="flex-1 flex h-full overflow-hidden p-4 animate-fade-in relative z-10">
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
          aiMode={aiMode}
          onAIModeChange={handleAIModeChange}
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
      
      {/* Mode toggle button */}
      <motion.button
        className={cn(
          "absolute bottom-6 right-6 z-50 px-4 py-2 text-white rounded-md shadow-lg",
          aiMode === 'atlas' ? "bg-blue-600 hover:bg-blue-700" : "bg-purple-600 hover:bg-purple-700"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setAIMode(aiMode === 'atlas' ? 'grok' : 'atlas')}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {aiMode === 'atlas' ? "Switch to Grok" : "Switch to Atlas"}
      </motion.button>
    </div>
  );
};

export default ChatRoom;
