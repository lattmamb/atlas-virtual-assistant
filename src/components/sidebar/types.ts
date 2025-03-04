
import React from 'react';

export interface NavItem {
  icon?: React.ReactNode;
  title: string;
  name?: string; // Adding name property
  path: string;
  active?: boolean;
  children?: NavItem[];
  badge?: string | number | {
    count: string | number;
    color: string;
  };
  badgeColor?: string;
  isExternal?: boolean;
  onClick?: () => void; // Adding onClick property
}

export interface SidebarSectionProps {
  children?: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  label?: string;
  items?: NavItem[];
  isActive?: (path: string) => boolean;
}

export interface SubMenuSectionProps {
  label: string;
  items: NavItem[];
  isActive?: (path: string) => boolean;
  onItemClick?: (path: string) => void;
  collapsible?: boolean;
  defaultOpen?: boolean;
  activeItem?: string;
  onNavItemClick?: (item: NavItem) => void;
}

export interface SidebarLogoProps {
  isCollapsed?: boolean;
}

export interface UserProfileProps {
  isCollapsed?: boolean;
}
