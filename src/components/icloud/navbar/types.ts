
import { ReactNode } from 'react';

export interface NavItemProps {
  icon: ReactNode;
  to?: string;
  onClick?: () => void;
  className?: string;
  label?: string;
}

export interface AppleNavBarProps {
  onToggleAppGrid?: () => void;
  showAppGridButton?: boolean;
  hideMainNav?: boolean;
  className?: string;
  onSearch?: () => void;
}
