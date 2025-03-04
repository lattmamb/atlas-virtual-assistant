
import React from 'react';
import { cn } from "@/lib/utils";
import { useTheme } from '@/context/ThemeContext';
import SidebarHeader from './sidebar/SidebarHeader';
import SidebarFooter from './sidebar/SidebarFooter';
import SidebarNavigation from './sidebar/SidebarNavigation';
import QuickNav from './sidebar/QuickNav';

// Import and use types from SidebarNavigation
interface SidebarProps {
  className?: string;
  activePage: string;
  onPageChange: (name: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  className,
  activePage,
  onPageChange
}) => {
  const { isDarkMode } = useTheme();
  
  return (
    <aside
      className={cn(
        "flex flex-col h-full w-56 lg:w-64 flex-shrink-0 border-r relative",
        "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800",
        className
      )}
    >
      <SidebarHeader />
      
      <div className="flex flex-col h-full overflow-hidden">
        <QuickNav />
        
        <div className="flex-grow overflow-y-auto">
          <SidebarNavigation 
            activePage={activePage}
            onPageChange={onPageChange}
          />
        </div>
      </div>
      
      <SidebarFooter />
    </aside>
  );
};

export default Sidebar;
