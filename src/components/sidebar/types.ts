
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
