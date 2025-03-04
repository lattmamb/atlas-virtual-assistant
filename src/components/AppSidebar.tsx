
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import SidebarLogo from '@/components/sidebar/SidebarLogo';
import UserProfile from '@/components/sidebar/UserProfile';
import { navigationItems } from '@/components/sidebar/navigationItems';
import SidebarSection from '@/components/sidebar/SidebarSection';

interface SidebarContextValue {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

// Define props interface for AppSidebar
interface AppSidebarProps {
  activePage?: string;
}

// Interface for SidebarLogo 
interface SidebarLogoProps {
  isCollapsed: boolean;
}

// Interface for UserProfile
interface UserProfileProps {
  isCollapsed: boolean;
}

// Simplified mock context since we can't modify the original
const useSidebar = (): SidebarContextValue => {
  return {
    isCollapsed: false,
    setIsCollapsed: () => {}
  };
};

const AppSidebar = ({ activePage }: AppSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isCollapsed, setIsCollapsed } = useSidebar();
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside 
      className={cn(
        "h-screen bg-sidebar fixed top-0 z-20 border-r border-sidebar-border",
        "transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        <SidebarLogo isCollapsed={isCollapsed} />
        
        <div className="flex-grow overflow-y-auto py-4">
          <SidebarSection 
            label="Navigation" 
            items={navigationItems}
            isActive={isActive}
            isCollapsed={isCollapsed}
          >
            <div className="space-y-1 px-3">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md w-full",
                    isActive(item.path) 
                      ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                  )}
                >
                  <span className="mr-2">{item.icon}</span>
                  {!isCollapsed && <span>{item.title}</span>}
                </button>
              ))}
            </div>
          </SidebarSection>
        </div>
        
        <UserProfile isCollapsed={isCollapsed} />
      </div>
    </aside>
  );
};

export default AppSidebar;
