
import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarSectionProps } from './types';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const SidebarSection: React.FC<SidebarSectionProps> = ({ label, items, isActive }) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild isActive={isActive(item.path)}>
                <Link to={item.path} className={cn(
                  "flex items-center w-full", 
                  isActive(item.path) ? 'font-medium text-primary' : ''
                )}>
                  <span className="flex items-center justify-center h-5 w-5 mr-3">
                    {item.icon}
                  </span>
                  <span className="flex-grow">{item.name}</span>
                  {item.badge && (
                    <span className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium",
                      item.badge.color.includes('-') 
                        ? `bg-${item.badge.color} text-white` 
                        : `bg-${item.badge.color}-600 text-white`
                    )}>
                      {item.badge.count}
                    </span>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarSection;
