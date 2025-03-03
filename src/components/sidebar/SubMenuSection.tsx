
import React, { useState } from 'react';
import { NavItem, SubMenuSectionProps } from './types';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight } from 'lucide-react';

const SubMenuSection: React.FC<SubMenuSectionProps> = ({ 
  label, 
  items, 
  isActive, 
  onItemClick, 
  collapsible = false 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    if (collapsible) {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel 
        onClick={toggleCollapse} 
        className={collapsible ? "cursor-pointer flex items-center justify-between" : ""}
      >
        <span>{label}</span>
        {collapsible && (
          isCollapsed 
            ? <ChevronRight className="h-4 w-4" /> 
            : <ChevronDown className="h-4 w-4" />
        )}
      </SidebarGroupLabel>
      {!isCollapsed && (
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton 
                  isActive={isActive ? isActive(item.path) : false}
                  onClick={() => {
                    if (onItemClick) onItemClick(item.name);
                  }}
                >
                  <div className="flex items-center w-full">
                    <span className="flex items-center justify-center h-5 w-5 mr-3">
                      {item.icon}
                    </span>
                    <span className="flex-grow">{item.name}</span>
                    {item.badge && (
                      <span className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium",
                        `bg-${item.badge.color} text-white`
                      )}>
                        {item.badge.count}
                      </span>
                    )}
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      )}
    </SidebarGroup>
  );
};

export default SubMenuSection;
