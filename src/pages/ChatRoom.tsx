
import React, { useState } from "react";
import { useChat } from "@/hooks/use-chat";
import { useTheme } from "@/context/ThemeContext";
import { AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useToast } from "@/hooks/use-toast";
import { useChatKeyboardShortcuts } from "@/hooks/use-chat-keyboard-shortcuts";
import { useMessageEffects } from "@/hooks/use-message-effects";
import { useTypingStatus } from "@/hooks/use-typing-status";

import ChatRoomHeader from "@/components/chat/ChatRoomHeader";
import ChatRoomContainer from "@/components/chat/ChatRoomContainer";
import ChatTimelinePanel from "@/components/chat/ChatTimelinePanel";
import ChatNavBar from "@/components/chat/ChatNavBar";
import ChatRoomBackground from "@/components/chat/ChatRoomBackground";
import HeroParallaxToggle from "@/components/chat/HeroParallaxToggle";

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
  
  const { isDarkMode } = useTheme();
  const [showTimeline, setShowTimeline] = useState(false);
  const [starredMessage, setStarredMessage] = useState<string | null>(null);
  const [aiMode, setAIMode] = useState<'atlas' | 'grok'>('atlas');
  const { ref: scrollRef, scrollProgress } = useScrollAnimation();
  const { toast } = useToast();
  const [showSearch, setShowSearch] = useState(false);
  
  // Use custom hooks
  const { showHeroParallax, toggleHeroParallax } = useChatKeyboardShortcuts();
  
  useMessageEffects({ 
    messages, 
    toggleHeroParallax, 
    setAIMode 
  });
  
  const typingStatus = useTypingStatus(isLoading, messages, aiMode);

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
      {/* Background Elements */}
      <ChatRoomBackground 
        showHeroParallax={showHeroParallax}
        isDarkMode={isDarkMode}
        aiMode={aiMode}
      />
      
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
      <HeroParallaxToggle aiMode={aiMode} setAIMode={setAIMode} />
    </div>
  );
};

export default ChatRoom;
