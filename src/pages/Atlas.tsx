
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { Link, Link2, MessageSquare, Shield } from 'lucide-react';
import AppSidebar from '@/components/AppSidebar';
import AppleNavBar from '@/components/AppleNavBar';
import ChatRoom from './ChatRoom';
import AtlasLink from './AtlasLink';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Atlas = () => {
  const [activeView, setActiveView] = useState<'chat' | 'link'>('chat');
  const { isDarkMode } = useTheme();
  const isMobile = useIsMobile();

  const renderContent = () => {
    if (activeView === 'chat') {
      return <ChatRoom />;
    } else {
      return <AtlasLink />;
    }
  };

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className={cn(
        "flex h-screen w-full overflow-hidden",
        isDarkMode ? "bg-[#111111] text-white" : "bg-gray-50 text-gray-800"
      )}>
        <AppSidebar activePage="atlas" />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          <AppleNavBar showAppGridButton={true} />
          
          {/* Atlas Navigation Bar */}
          <div className="flex justify-center pt-14 pb-1 z-10 relative">
            <div className="flex items-center gap-2 p-1 bg-black/10 dark:bg-white/10 backdrop-blur-md rounded-full">
              <Button
                variant={activeView === 'chat' ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "rounded-full gap-1 transition-all",
                  activeView === 'chat' ? "shadow-sm" : "hover:bg-black/5 dark:hover:bg-white/5"
                )}
                onClick={() => setActiveView('chat')}
              >
                <MessageSquare className="h-4 w-4" />
                <span>Atlas Chat</span>
              </Button>
              
              <Button
                variant={activeView === 'link' ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "rounded-full gap-1 transition-all",
                  activeView === 'link' ? "shadow-sm" : "hover:bg-black/5 dark:hover:bg-white/5"
                )}
                onClick={() => setActiveView('link')}
              >
                <Link2 className="h-4 w-4" />
                <span>Atlas Link</span>
              </Button>
            </div>
          </div>
          
          {/* Render content based on active view */}
          <div className="flex-1 h-full overflow-hidden">
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Atlas;
