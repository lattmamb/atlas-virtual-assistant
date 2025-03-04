
export interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  name: string;
  badge?: {
    count: number;
    color: string;
  } | string;
  onClick?: () => void;
}

export interface SubMenuSectionProps {
  items: NavItem[];
  isActive: (path: string) => boolean;
  title?: string;
  isCollapsed?: boolean;
  label?: string;
  activeItem?: string;
  onItemClick?: (path: string) => void;
  collapsible?: boolean;
  onNavItemClick?: (item: NavItem) => void;
}

export interface SidebarSectionProps {
  label?: string;
  items: NavItem[];
  isActive: (path: string) => boolean;
  isCollapsed?: boolean;
  children?: React.ReactNode;
}
