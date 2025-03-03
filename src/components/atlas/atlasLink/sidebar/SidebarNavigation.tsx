
import React from 'react';
import { getAtlasFeatures, getSystemItems } from './navigationItems';
import SubMenuSection from '@/components/sidebar/SubMenuSection';
import { toast } from 'sonner';
import { useTheme } from '@/context/ThemeContext';

interface SidebarNavigationProps {
  onItemClick?: (name: string) => void;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ onItemClick }) => {
  const { toggleTheme } = useTheme();

  const handleItemClick = (name: string) => {
    if (name === 'Appearance') {
      toggleTheme();
    } else if (onItemClick) {
      onItemClick(name);
    } else {
      toast.info(`${name} feature coming soon`);
    }
  };

  return (
    <div className="space-y-4">
      {/* Atlas Features */}
      <SubMenuSection 
        label="Atlas Features"
        items={getAtlasFeatures().map(item => ({
          ...item,
          icon: <item.icon className="h-4 w-4" />
        }))}
        collapsible={true}
        onItemClick={handleItemClick}
      />
      
      {/* System */}
      <SubMenuSection 
        label="System"
        items={getSystemItems().map(item => ({
          ...item,
          icon: <item.icon className="h-4 w-4" />
        }))}
        collapsible={true}
        onItemClick={handleItemClick}
      />
    </div>
  );
};

export default SidebarNavigation;
