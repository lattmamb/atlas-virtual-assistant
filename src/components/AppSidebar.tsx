
import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader,
  SidebarSeparator,
  useSidebar
} from '@/components/ui/sidebar';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

// Import the refactored components
import SidebarSection from './sidebar/SidebarSection';
import SubMenuSection from './sidebar/SubMenuSection';
import UserProfile from './sidebar/UserProfile';
import SidebarLogo from './sidebar/SidebarLogo';
import { 
  getPrimaryNavItems, 
  getAtlasNavItems, 
  getTrinityNavItems, 
  getToolsNavItems 
} from './sidebar/navigationItems';

interface AppSidebarProps {
  activePage?: string;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ activePage }) => {
  const location = useLocation();
  const { state } = useSidebar();
  const { isDarkMode } = useTheme();
  
  const isActive = (path: string) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
  };

  return (
    <Sidebar
      variant="sidebar"
      collapsible="offcanvas"
      className={cn(
        "border-r border-border/40 shadow-sm",
        isDarkMode ? "bg-black/90 backdrop-blur-xl" : "bg-white/90 backdrop-blur-xl"
      )}
    >
      <SidebarHeader className="border-b border-border/40">
        <SidebarLogo />
      </SidebarHeader>
      
      <SidebarContent className="pt-4">
        {/* Primary Navigation */}
        <SidebarSection 
          label="Navigation" 
          items={getPrimaryNavItems()} 
          isActive={isActive} 
        />
        
        {/* Atlas Submenu - only shown when Atlas is active */}
        {activePage === 'atlas' && (
          <>
            <SidebarSeparator />
            <SubMenuSection 
              label="Atlas Features" 
              items={getAtlasNavItems()} 
              isActive={isActive}
              onItemClick={(name) => {
                console.log(`Clicked on ${name}`);
                // Handle navigation within Atlas
              }}
            />
          </>
        )}
        
        <SidebarSeparator />
        
        {/* Trinity Dodge Navigation */}
        <SidebarSection 
          label="Trinity Dodge" 
          items={getTrinityNavItems()} 
          isActive={isActive} 
        />
        
        <SidebarSeparator />
        
        {/* Tools Navigation */}
        <SidebarSection 
          label="Tools" 
          items={getToolsNavItems()} 
          isActive={isActive} 
        />
      </SidebarContent>
      
      <SidebarFooter className="border-t border-border/40">
        <UserProfile />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
