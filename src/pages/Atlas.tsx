
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import AppSidebar from '@/components/AppSidebar';
import AppleNavBar from '@/components/icloud/AppleNavBar';
import ChatRoom from './ChatRoom';
import AtlasLink from './AtlasLink';
import WorkflowDashboard from '@/components/workflow';
import HeaderSection from '@/components/widgets/HeaderSection';
import { toast } from "sonner";
import { motion } from 'framer-motion';

const Atlas = () => {
  const [activeView, setActiveView] = useState<'chat' | 'link' | 'workflows' | 'store' | 'knowledge' | 'api' | 'settings'>('chat');
  const { currentTheme, isDarkMode } = useTheme();
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Display welcome toast on initial load
    setTimeout(() => {
      toast.success("Atlas AI Assistant", {
        description: "Select a tool from the navigation to get started.",
        duration: 3000,
      });
    }, 1000);
  }, []);

  // Parse the URL query parameters to set the active view
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const viewParam = searchParams.get('view') as typeof activeView | null;
    
    if (viewParam && ['chat', 'link', 'workflows', 'store', 'knowledge', 'api', 'settings'].includes(viewParam)) {
      setActiveView(viewParam);
    } else if (!searchParams.has('view')) {
      // If no view parameter, set default to chat and update URL
      const newParams = new URLSearchParams(location.search);
      newParams.set('view', 'chat');
      navigate(`${location.pathname}?${newParams.toString()}`, { replace: true });
    }
  }, [location, navigate]);

  const renderContent = () => {
    switch (activeView) {
      case 'chat':
        return <ChatRoom />;
      case 'link':
        return <AtlasLink />;
      case 'workflows':
        return <WorkflowDashboard />;
      case 'store':
        return (
          <motion.div 
            className="flex items-center justify-center h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            GPT Store Coming Soon
          </motion.div>
        );
      case 'knowledge':
        return (
          <motion.div 
            className="flex items-center justify-center h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Knowledge Base Coming Soon
          </motion.div>
        );
      case 'api':
        return (
          <motion.div 
            className="flex items-center justify-center h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            API Integrations Coming Soon
          </motion.div>
        );
      case 'settings':
        return (
          <motion.div 
            className="flex items-center justify-center h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Settings Coming Soon
          </motion.div>
        );
      default:
        return <ChatRoom />;
    }
  };

  return (
    <div className={`min-h-screen w-full overflow-hidden theme-${currentTheme}`}>
      <SidebarProvider defaultOpen={!isMobile}>
        <div className={cn(
          "flex h-screen w-full overflow-hidden",
          isDarkMode ? "text-white" : "text-gray-800"
        )}>
          <AppSidebar activePage="atlas" />
          
          <main className="flex-1 flex flex-col overflow-hidden">
            <AppleNavBar 
              showAppGridButton={true}
              hideMainNav={true}
            />
            
            <div className="relative z-10 mt-4 mb-8 pt-10">
              <HeaderSection 
                isDarkMode={isDarkMode}
                setShowAppGrid={() => {}}
                showAppGrid={false}
                title={`Atlas - ${activeView.charAt(0).toUpperCase() + activeView.slice(1)}`}
              />
              
              <div className="flex-1 h-full overflow-hidden mt-4">
                {renderContent()}
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Atlas;
