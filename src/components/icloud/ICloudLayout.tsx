
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarProvider } from '@/components/ui/sidebar';
import Widget from './Widget';
import { Image, Mail, Calendar, FileText, Settings, MessageSquare, Grid, Plus } from 'lucide-react';
import AtlasChatBot from '@/components/AtlasChatBot';
import AppGrid from './AppGrid';
import AppSidebar from '@/components/AppSidebar';
import AppleNavBar from '@/components/AppleNavBar';
import { GridPattern } from '@/components/ui/grid-pattern';

interface ICloudLayoutProps {
  children: React.ReactNode;
}

const ICloudLayout: React.FC<ICloudLayoutProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isAppGridOpen, setIsAppGridOpen] = useState<boolean>(false);
  const [widgetCount, setWidgetCount] = useState<number>(2);
  const isMobile = useIsMobile();
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const addWidget = () => {
    setWidgetCount(prev => prev + 1);
  };

  // Additional widgets that can be added
  const additionalWidgets = [
    { title: "Notes", icon: <FileText className="h-5 w-5" /> },
    { title: "Weather", icon: <Image className="h-5 w-5" /> },
    { title: "Reminders", icon: <Calendar className="h-5 w-5" /> },
  ];

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className={cn(
        'min-h-screen font-sans transition-all duration-500 relative flex w-full',
        isDarkMode ? 'bg-[#111111] text-white' : 'bg-gray-50 text-gray-800'
      )}>
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 overflow-hidden">
          <GridPattern
            width={24}
            height={24}
            className={cn(
              isDarkMode 
                ? "fill-white/[0.02] stroke-white/[0.05] [mask-image:radial-gradient(800px_circle_at_center,white,transparent)]" 
                : "fill-black/[0.02] stroke-black/[0.05] [mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
            )}
            strokeDasharray={isDarkMode ? "1 3" : "1 3"}
          />
        </div>

        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navigation Bar */}
          <AppleNavBar 
            isDarkMode={isDarkMode} 
            onToggleDarkMode={toggleDarkMode}
            onToggleAppGrid={() => setIsAppGridOpen(!isAppGridOpen)}
          />

          {/* Content Area with Proper Spacing for NavBar */}
          <main className="flex-1 overflow-auto p-2 md:p-6 pt-14">
            {isAppGridOpen && (
              <AppGrid 
                isDarkMode={isDarkMode} 
                onClose={() => setIsAppGridOpen(false)} 
              />
            )}
            
            <div className="relative z-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mt-2">
              {/* Main content passed as children */}
              {children}
              
              {/* Demo widgets */}
              <Widget
                title="Mail"
                icon={<Mail className="h-5 w-5" />}
                minWidth={isMobile ? "260px" : "280px"}
                className="hidden md:block"
                isDarkMode={isDarkMode}
              >
                <div className={cn("p-4 text-center", isDarkMode ? "text-gray-300" : "text-gray-500")}>
                  <p>Your inbox is empty</p>
                </div>
              </Widget>
              
              <Widget
                title="Photos"
                icon={<Image className="h-5 w-5" />}
                minWidth={isMobile ? "260px" : "280px"}
                className="hidden lg:block"
                isDarkMode={isDarkMode}
              >
                <div className="grid grid-cols-3 gap-2 p-4">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div 
                      key={item} 
                      className={cn("aspect-square rounded-md animate-pulse", 
                        isDarkMode ? "bg-gray-700" : "bg-gray-200")}
                    />
                  ))}
                </div>
              </Widget>
              
              <Widget
                title="Calendar"
                icon={<Calendar className="h-5 w-5" />}
                minWidth={isMobile ? "260px" : "320px"}
                className="hidden lg:block"
                isDarkMode={isDarkMode}
              >
                <div className="p-4">
                  <div className={cn("text-sm font-medium", isDarkMode ? "text-white" : "text-black")}>June 2023</div>
                  <div className="mt-2 grid grid-cols-7 gap-1">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={cn("aspect-square flex items-center justify-center text-xs rounded-full", 
                          isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100")}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </Widget>
              
              {/* Dynamically added widgets */}
              {widgetCount > 2 && (
                <>
                  {additionalWidgets.slice(0, widgetCount - 2).map((widget, index) => (
                    <Widget
                      key={`additional-${index}`}
                      title={widget.title}
                      icon={widget.icon}
                      minWidth={isMobile ? "260px" : "280px"}
                      isDarkMode={isDarkMode}
                    >
                      <div className={cn("p-4 text-center", isDarkMode ? "text-gray-300" : "text-gray-500")}>
                        <p>{widget.title} content will appear here</p>
                      </div>
                    </Widget>
                  ))}
                </>
              )}
            </div>

            {/* Fixed Add Widget Button */}
            <div className="fixed bottom-6 right-6 z-20">
              <button 
                className={cn(
                  "rounded-full w-12 h-12 shadow-lg flex items-center justify-center transition-all",
                  isDarkMode 
                    ? "bg-[#0071e3] hover:bg-[#0077ED] text-white" 
                    : "bg-[#0071e3] hover:bg-[#0077ED] text-white"
                )}
                onClick={addWidget}
                aria-label="Add widget"
              >
                <Plus className="h-6 w-6" />
              </button>
            </div>
          </main>
        </div>

        {/* Atlas Chatbot widget */}
        <AtlasChatBot />
      </div>
    </SidebarProvider>
  );
};

export default ICloudLayout;
