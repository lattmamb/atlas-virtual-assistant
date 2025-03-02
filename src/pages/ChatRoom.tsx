
import React, { useState, useEffect } from "react";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInputForm from "@/components/chat/ChatInputForm";
import { useChat } from "@/context/ChatContext";
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
import { 
  MessageSquarePlus, 
  PanelRightOpen, 
  Star, 
  Sparkles, 
  Info,
  Pin,
  Bookmark,
  PencilLine,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

  const messageActions = [
    { icon: <Star className="h-4 w-4" />, label: "Star message" },
    { icon: <Bookmark className="h-4 w-4" />, label: "Save to bookmarks" },
    { icon: <PencilLine className="h-4 w-4" />, label: "Take notes" },
    { icon: <Pin className="h-4 w-4" />, label: "Pin to dashboard" },
  ];

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
      
      {/* Apply Lamp effect to the header */}
      <LampEffect subtle className="w-full">
        <div className="max-w-4xl mx-auto w-full px-4 py-2 flex items-center justify-between">
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span className="text-xs opacity-70">
                {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </span>
            </div>
            <div className="h-4 border-r border-gray-300 dark:border-gray-700" />
            <GooeyText text={typingStatus} duration={0.5} className="italic" />
            {isLoading && (
              <span className="inline-block animate-pulse ml-1">
                <Sparkles className="h-3 w-3 text-amber-400" />
              </span>
            )}
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
      
      <div className="flex-1 flex h-full overflow-hidden p-4 animate-fade-in">
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
          <div className="flex-1 overflow-y-auto relative">
            <ChatMessages 
              messages={messages} 
              customRenderer={renderMessage} 
            />
            
            {messages.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-3 text-center p-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">Welcome to Atlas Assistant</h3>
                  <p className="text-sm text-muted-foreground max-w-sm mt-2">
                    Ask me about Trinity Dodge in Taylorville, Illinois, or chat about anything you'd like to know.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="mt-6 flex flex-wrap gap-2 justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {[
                    "Tell me about the 2025 Dodge Ram",
                    "What deals do you have?",
                    "Schedule a test drive",
                    "Show me your inventory"
                  ].map((suggestion, i) => (
                    <Button 
                      key={i} 
                      variant="outline" 
                      size="sm" 
                      className="text-sm"
                      onClick={() => sendMessage(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </motion.div>
              </div>
            )}
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
              className="w-72 ml-4 overflow-hidden border rounded-lg hybrid hidden md:flex md:flex-col"
              style={{ borderColor: 'var(--widget-border)' }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-3 border-b flex items-center justify-between" style={{ borderColor: 'var(--widget-border)' }}>
                <h3 className="text-sm font-medium flex items-center gap-1.5">
                  <Info className="h-3.5 w-3.5" />
                  Conversation Timeline
                </h3>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowTimeline(false)}>
                  <PanelRightOpen className="h-3.5 w-3.5" />
                </Button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-3">
                <ChatTimeline items={timelineItems} />
              </div>
              
              <div className="p-3 border-t" style={{ borderColor: 'var(--widget-border)' }}>
                <div className="grid grid-cols-4 gap-1">
                  {messageActions.map((action, i) => (
                    <Button 
                      key={i} 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-full flex flex-col items-center justify-center gap-1"
                      title={action.label}
                    >
                      {action.icon}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChatRoom;
