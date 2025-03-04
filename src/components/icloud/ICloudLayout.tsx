
import React, { useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import AppleNavBar from '@/components/icloud/AppleNavBar';
import { useLocation } from 'react-router-dom';

interface ICloudLayoutProps {
  children: ReactNode;
  activePage?: string;
}

const ICloudLayout: React.FC<ICloudLayoutProps> = ({ children, activePage }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isAppGridOpen, setIsAppGridOpen] = useState<boolean>(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  // Determine the active page from URL if not provided
  const getActivePage = () => {
    if (activePage) return activePage;
    
    const path = location.pathname;
    if (path.startsWith('/atlas')) return 'atlas';
    if (path.startsWith('/settings')) return 'settings';
    return 'home';
  };
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={cn(
      'min-h-screen font-sans transition-all duration-500 relative flex w-full',
      isDarkMode ? 'bg-[#111111] text-white' : 'bg-gray-50 text-gray-800'
    )}>
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
  );
}

export default ICloudLayout;
