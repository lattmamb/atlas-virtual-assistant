
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import AppSidebar from '@/components/AppSidebar';
import AppleNavBar from '@/components/AppleNavBar';
import ChatRoom from './ChatRoom';
import AtlasLink from './AtlasLink';
import WorkflowDashboard from '@/components/workflow';

const Atlas = () => {
  const [activeView, setActiveView] = useState<'chat' | 'link' | 'workflows' | 'store' | 'knowledge' | 'api' | 'settings'>('chat');
  const { isDarkMode } = useTheme();
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();

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
          <AppleNavBar showAppGridButton={true} hideMainNav={true} />
          
          {/* Render content based on active view */}
          <div className="flex-1 h-full overflow-hidden pt-12">
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Atlas;
