
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { Link2, MessageSquare, Workflow, Store, Book, Key, Settings } from 'lucide-react';
import AppSidebar from '@/components/AppSidebar';
import AppleNavBar from '@/components/AppleNavBar';
import ChatRoom from './ChatRoom';
import AtlasLink from './AtlasLink';
import WorkflowDashboard from '@/components/workflow';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Atlas = () => {
  const [activeView, setActiveView] = useState<'chat' | 'link' | 'workflows' | 'store' | 'knowledge' | 'api' | 'settings'>('chat');
  const { isDarkMode } = useTheme();
  const isMobile = useIsMobile();

  const renderContent = () => {
    switch (activeView) {
      case 'chat':
        return <ChatRoom />;
      case 'link':
        return <AtlasLink />;
      case 'workflows':
        return <WorkflowDashboard />;
      case 'store':
        return <div className="flex items-center justify-center h-full">GPT Store Coming Soon</div>;
      case 'knowledge':
        return <div className="flex items-center justify-center h-full">Knowledge Base Coming Soon</div>;
      case 'api':
        return <div className="flex items-center justify-center h-full">API Integrations Coming Soon</div>;
      case 'settings':
        return <div className="flex items-center justify-center h-full">Settings Coming Soon</div>;
      default:
        return <ChatRoom />;
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
            <div className="flex items-center gap-2 p-1 bg-black/10 dark:bg-white/10 backdrop-blur-md rounded-full overflow-x-auto scrollbar-hide">
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
                <span>Chat</span>
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
                <span>Link</span>
              </Button>
              
              <Button
                variant={activeView === 'workflows' ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "rounded-full gap-1 transition-all",
                  activeView === 'workflows' ? "shadow-sm" : "hover:bg-black/5 dark:hover:bg-white/5"
                )}
                onClick={() => setActiveView('workflows')}
              >
                <Workflow className="h-4 w-4" />
                <span>Workflows</span>
              </Button>

              <Button
                variant={activeView === 'store' ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "rounded-full gap-1 transition-all",
                  activeView === 'store' ? "shadow-sm" : "hover:bg-black/5 dark:hover:bg-white/5"
                )}
                onClick={() => setActiveView('store')}
              >
                <Store className="h-4 w-4" />
                <span>Store</span>
              </Button>

              <Button
                variant={activeView === 'knowledge' ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "rounded-full gap-1 transition-all",
                  activeView === 'knowledge' ? "shadow-sm" : "hover:bg-black/5 dark:hover:bg-white/5"
                )}
                onClick={() => setActiveView('knowledge')}
              >
                <Book className="h-4 w-4" />
                <span>Knowledge</span>
              </Button>

              <Button
                variant={activeView === 'api' ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "rounded-full gap-1 transition-all",
                  activeView === 'api' ? "shadow-sm" : "hover:bg-black/5 dark:hover:bg-white/5"
                )}
                onClick={() => setActiveView('api')}
              >
                <Key className="h-4 w-4" />
                <span>API</span>
              </Button>

              <Button
                variant={activeView === 'settings' ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "rounded-full gap-1 transition-all",
                  activeView === 'settings' ? "shadow-sm" : "hover:bg-black/5 dark:hover:bg-white/5"
                )}
                onClick={() => setActiveView('settings')}
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
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
