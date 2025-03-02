
import React, { useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Grid, MessageSquare, Plus } from 'lucide-react';
import AppSidebar from '@/components/AppSidebar';
import AppleNavBar from '@/components/AppleNavBar';
import { GridPattern } from '@/components/ui/grid-pattern';

interface ICloudLayoutProps {
  children: ReactNode;
}

const ICloudLayout: React.FC<ICloudLayoutProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isAppGridOpen, setIsAppGridOpen] = useState<boolean>(false);
  const isMobile = useIsMobile();
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className={cn(
        'min-h-screen font-sans transition-all duration-500 relative flex w-full',
        isDarkMode ? 'bg-[#111111] text-white' : 'bg-gray-50 text-gray-800'
      )}>
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navigation Bar */}
          <AppleNavBar 
            showAppGridButton={true}
            onToggleAppGrid={() => setIsAppGridOpen(!isAppGridOpen)}
          />

          {/* Content Area with Proper Spacing for NavBar */}
          <main className="flex-1 overflow-auto p-2 md:p-6 pt-14">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ICloudLayout;
