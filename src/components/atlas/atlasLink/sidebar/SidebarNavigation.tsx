
import React from 'react';
import { cn } from "@/lib/utils";
import { SubMenuSection } from '@/components/sidebar';
import { useTheme } from '@/context/ThemeContext';
import { 
  getPrimaryItems,
  getSettingsItems
} from './navigationItems';

interface SidebarNavigationProps {
  activePage: string;
  onPageChange: (name: string) => void;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  activePage,
  onPageChange
}) => {
  const { isDarkMode } = useTheme();
  
  const primaryItems = getPrimaryItems();
  const settingsItems = getSettingsItems();

  return (
    <div 
      className={cn(
        "flex flex-col flex-grow overflow-y-auto py-2",
        "scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
      )}
    >
      <SubMenuSection
        label="Main Navigation"
        items={primaryItems}
        isActive={(path) => activePage === path}
        onItemClick={onPageChange}
        collapsible={true}
        activeItem={activePage}
      />
      
      <div className="mt-auto pt-4">
        <SubMenuSection
          label="Settings"
          items={settingsItems}
          isActive={(path) => activePage === path}
          onItemClick={onPageChange}
          collapsible={true}
          activeItem={activePage}
        />
      </div>
    </div>
  );
};

export default SidebarNavigation;
