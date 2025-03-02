
import React from 'react';
import { NavItem } from './types';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

interface SubMenuSectionProps {
  label: string;
  items: NavItem[];
  onItemClick?: (name: string) => void;
}

const SubMenuSection: React.FC<SubMenuSectionProps> = ({ label, items, onItemClick }) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton 
                onClick={() => {
                  console.log(`Switch to ${item.name}`);
                  if (onItemClick) onItemClick(item.name);
                }}
              >
                <div className="flex items-center">
                  {item.icon}
                  <span>{item.name}</span>
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
