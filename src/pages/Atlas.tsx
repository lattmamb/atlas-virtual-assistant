
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import AppSidebar from '@/components/AppSidebar';
import { AppleNavBar } from '@/components/navigation'; // Updated import path
import ChatRoom from './ChatRoom';
import AtlasLink from './AtlasLink';
import WorkflowDashboard from '@/components/workflow';
import HeaderSection from '@/components/widgets/HeaderSection';
import BackgroundEffects from '@/components/widgets/BackgroundEffects';
import { SparklesCore } from '@/components/ui/sparkles';
import { toast } from "sonner";
import { motion } from 'framer-motion';
import { HeroParallax } from '@/components/ui/hero-parallax';
import { products } from '@/components/ui/hero-parallax.demo';

const Atlas = () => {
  const [activeView, setActiveView] = useState<'chat' | 'link' | 'workflows' | 'store' | 'knowledge' | 'api' | 'settings'>('chat');
  const { currentTheme, isDarkMode } = useTheme();
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const [showHeroParallax, setShowHeroParallax] = useState(false);

  useEffect(() => {
    // Display welcome toast on initial load
    setTimeout(() => {
      toast.success("Atlas AI Assistant", {
        description: "Select a tool from the navigation to get started.",
        duration: 3000,
      });
    }, 1000);

    // Add keyboard shortcut to toggle hero parallax
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'h' && e.ctrlKey) {
        setShowHeroParallax(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
      {showHeroParallax ? (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <HeroParallax products={products} />
        </div>
      ) : (
        <BackgroundEffects currentTheme={currentTheme} />
      )}
      
      {isDarkMode && !showHeroParallax && (
        <div className="fixed inset-0 pointer-events-none z-0 opacity-50">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={20}
            className="w-full h-full"
            particleColor="#FFFFFF"
            speed={0.5}
          />
        </div>
      )}
      
      <SidebarProvider defaultOpen={!isMobile}>
        <div className={cn(
          "flex h-screen w-full overflow-hidden",
          isDarkMode ? "bg-[#111111] text-white" : "bg-gray-50 text-gray-800"
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
      
      {/* Parallax toggle button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 px-4 py-2 bg-primary text-white rounded-md shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowHeroParallax(prev => !prev)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {showHeroParallax ? "Hide Parallax" : "Show Parallax"}
      </motion.button>
    </div>
  );
};

export default Atlas;
