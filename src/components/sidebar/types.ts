
import React from 'react';

export interface NavItem {
  icon?: React.ReactNode;
  title: string;
  path: string;
  active?: boolean;
  children?: NavItem[];
  badge?: string | number;
  badgeColor?: string;
  isExternal?: boolean;
}

export interface SidebarSectionProps {
  children?: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

export interface SubMenuSectionProps {
  label: string;
  items: NavItem[];
  isActive: (path: string) => boolean;
  onItemClick?: (path: string) => void;
  collapsible?: boolean;
  defaultOpen?: boolean;
  activeItem?: string;
}
