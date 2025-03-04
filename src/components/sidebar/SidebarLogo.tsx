
import React from 'react';
import { cn } from '@/lib/utils';

interface SidebarLogoProps {
  isCollapsed: boolean;
}

const SidebarLogo: React.FC<SidebarLogoProps> = ({ isCollapsed }) => {
  return (
    <div className={cn(
      "flex items-center h-16 px-6",
      isCollapsed ? "justify-center" : "justify-start"
    )}>
      <div className="h-8 w-8 rounded-md bg-sidebar-accent flex items-center justify-center">
        <span className="text-sidebar-accent-foreground font-bold text-lg">A</span>
      </div>
      
      {!isCollapsed && (
        <span className="ml-3 font-semibold text-sidebar-foreground">
          Atlas Assistant
        </span>
      )}
    </div>
  );
};

export default SidebarLogo;
