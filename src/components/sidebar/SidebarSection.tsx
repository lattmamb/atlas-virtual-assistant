
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

const SidebarSection: React.FC<SidebarSectionProps> = ({ label, items, isActive }) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild isActive={isActive(item.path)}>
                <Link to={item.path} className={isActive(item.path) ? 'font-medium' : ''}>
                  {item.icon}
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className={`ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-${item.badge.color}/10 text-${item.badge.color} text-xs`}>
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
