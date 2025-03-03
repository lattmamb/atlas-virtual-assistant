
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
           (path !== '/' && location.pathname.startsWith(path)) ||
           (path.includes('?') && location.search.includes(path.split('?')[1]));
  };

  return (
    <Sidebar
      variant="sidebar"
      collapsible="offcanvas"
      className={cn(
        "border-r shadow-sm",
        isDarkMode 
          ? "bg-black/90 backdrop-blur-xl border-white/10" 
          : "bg-white/90 backdrop-blur-xl border-gray-200/70"
      )}
    >
      <SidebarHeader className={cn(
        "border-b", 
        isDarkMode ? "border-white/10" : "border-gray-200/70"
      )}>
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
      
      <SidebarFooter className={cn(
        "border-t", 
        isDarkMode ? "border-white/10" : "border-gray-200/70"
      )}>
        <UserProfile />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
