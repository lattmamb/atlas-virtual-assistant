
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { SidebarLogo } from '@/components/sidebar/SidebarLogo';
import { UserProfile } from '@/components/sidebar/UserProfile';
import SubMenuSection from '@/components/sidebar/SubMenuSection';
import SidebarSection from '@/components/sidebar/SidebarSection';
import { useTheme } from '@/context/ThemeContext';
import { useSidebar } from '@/components/ui/sidebar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  getPrimaryNavItems, 
  getAtlasNavItems, 
  getTrinityNavItems,
  getToolsNavItems
} from '@/components/sidebar/navigationItems';

interface AppSidebarProps {
  activePage?: string;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ activePage = 'home' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { isOpen, setIsOpen } = useSidebar();
  const [activeItem, setActiveItem] = useState<string>(activePage);

  const isActivePath = (path: string): boolean => {
    const currentPath = location.pathname;
    
    // Check for exact match
    if (currentPath === path) return true;
    
    // Check for subpath match, but only if the path is not '/'
    if (path !== '/' && currentPath.startsWith(path)) return true;
    
    // Special case for query parameters - check for atlas views
    if (path.includes('?view=') && currentPath === '/atlas') {
      const searchParams = new URLSearchParams(location.search);
      const viewParam = searchParams.get('view');
      const pathViewParam = new URLSearchParams(path.split('?')[1]).get('view');
      return viewParam === pathViewParam;
    }
    
    return false;
  };

  const primaryNavItems = getPrimaryNavItems();
  const atlasNavItems = getAtlasNavItems();
  const trinityNavItems = getTrinityNavItems();
  const toolsNavItems = getToolsNavItems();

  const handleNavItemClick = (name: string) => {
    setActiveItem(name.toLowerCase());
  };

  return (
    <div
      className={cn(
        "relative h-screen",
        "border-r transition-all duration-300 ease-in-out",
        isDarkMode ? "bg-black/30 border-white/10" : "bg-white/90 border-gray-200/50",
        "backdrop-blur-md",
        isOpen ? "w-60" : "w-16"
      )}
    >
      {/* Sidebar Header */}
      <div className="p-4 flex items-center justify-between">
        <SidebarLogo isCollapsed={!isOpen} />
        
        {/* Toggle Button */}
        <button
          className={cn(
            "p-1 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
            isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-200/50"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <div className="h-[calc(100vh-144px)] overflow-y-auto">
        <SidebarSection
          label="Navigation"
          items={primaryNavItems}
          isActive={isActivePath}
          title="Navigation"
        >
          <SubMenuSection
            label="Primary"
            items={primaryNavItems}
            isActive={isActivePath}
            onItemClick={handleNavItemClick}
            activeItem={activeItem}
          />
        </SidebarSection>

        {activeItem === 'atlas' && (
          <SidebarSection
            label="Atlas Tools"
            items={atlasNavItems}
            isActive={isActivePath}
            title="Atlas Tools"
          >
            <SubMenuSection
              label="Atlas Tools"
              items={atlasNavItems}
              isActive={isActivePath}
              onItemClick={handleNavItemClick}
              activeItem={activeItem}
            />
          </SidebarSection>
        )}

        <SidebarSection
          label="Trinity Dodge"
          items={trinityNavItems}
          isActive={isActivePath}
          title="Trinity Dodge"
        >
          <SubMenuSection
            label="Trinity Dodge"
            items={trinityNavItems}
            isActive={isActivePath}
            onItemClick={handleNavItemClick}
            activeItem={activeItem}
          />
        </SidebarSection>

        <SidebarSection
          label="Tools"
          items={toolsNavItems}
          isActive={isActivePath}
          title="Tools"
        >
          <SubMenuSection
            label="Tools"
            items={toolsNavItems}
            isActive={isActivePath}
            onItemClick={handleNavItemClick}
            activeItem={activeItem}
          />
        </SidebarSection>
      </div>

      {/* User Profile */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <UserProfile isCollapsed={!isOpen} />
      </div>
    </div>
  );
};

export default AppSidebar;
