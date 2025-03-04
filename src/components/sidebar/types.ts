
import { ReactNode } from 'react';

export interface NavItem {
  name: string;
  path: string;
  icon: ReactNode;
  onClick?: () => void;
  badge?: {
    count: number | string;
    color: string;
  };
}

export interface SidebarSectionProps {
  title: string;
  children: ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

export interface SubMenuSectionProps {
  activeItem: string;
  items: NavItem[];
  onNavItemClick?: (item: NavItem) => void;
}
