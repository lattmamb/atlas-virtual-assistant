
export interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  name: string;
  badge?: {
    count: number;
    color: string;
  };
  onClick?: () => void;
}

export interface SubMenuSectionProps {
  items: NavItem[];
  isActive: (path: string) => boolean;
  title?: string;
  isCollapsed?: boolean;
}

export interface SidebarSectionProps {
  label?: string;
  items: NavItem[];
  isActive: (path: string) => boolean;
  isCollapsed?: boolean;
  children?: React.ReactNode;
}
