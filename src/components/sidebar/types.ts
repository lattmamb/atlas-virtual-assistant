
import React from 'react';

export interface NavItem {
  icon?: React.ReactNode;
  title: string;
  name: string; // Making this required
  path: string;
  active?: boolean;
  children?: NavItem[];
  badge?: string | number | {
    count: string | number;
    color: string;
  };
  badgeColor?: string;
  isExternal?: boolean;
  onClick?: () => void;
}

export interface SidebarSectionProps {
  children?: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  label?: string;
  items?: NavItem[];
  isActive?: (path: string) => boolean;
  isCollapsed?: boolean; // Added prop
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
  isCollapsed?: boolean; // Added prop
}

export interface SidebarLogoProps {
  isCollapsed?: boolean;
}

export interface UserProfileProps {
  isCollapsed?: boolean;
}

export interface QuickNavProps {
  buttons?: {
    icon: React.ReactNode;
    ariaLabel: string;
  }[];
  isCollapsed?: boolean; // Added prop
}

export interface UniverseComponentProps {
  scrollY?: number; // Added prop
}
