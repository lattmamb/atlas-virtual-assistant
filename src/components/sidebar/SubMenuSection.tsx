
import React from 'react';
import { NavItem, SubMenuSectionProps } from './types';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

const SubMenuSection: React.FC<SubMenuSectionProps> = ({ label, items, isActive, onItemClick }) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton 
                isActive={isActive ? isActive(item.path) : false}
                onClick={() => {
                  console.log(`Switch to ${item.name}`);
                  if (onItemClick) onItemClick(item.name);
                }}
              >
                <div className="flex items-center">
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SubMenuSection;
