
import { LucideIcon } from "lucide-react";

export interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  badge?: {
    count: number;
    color: string;
  };
}

export interface SidebarSectionProps {
  label: string;
  items: NavItem[];
  isActive: (path: string) => boolean;
}
