
import { ReactNode } from 'react';

export interface NavButtonProps {
  icon: ReactNode;
  onClick?: () => void;
  to?: string;
  className?: string;
}

export interface AppleNavBarProps {
  onToggleAppGrid?: () => void;
  showAppGridButton?: boolean;
  hideMainNav?: boolean;
  className?: string;
  onSearch?: () => void;
}
