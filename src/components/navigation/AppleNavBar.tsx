
import React from 'react';
import { cn } from "@/lib/utils";
import { SidebarTrigger } from '@/components/ui/sidebar';
import { 
  MessageSquare, 
  Settings, 
  Grid,
  Search,
  Workflow,
  Shield
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import ThemeSwitcherDropdown from '../ThemeSwitcherDropdown';
import { NavButton } from './NavButton';
import { NavLink } from './NavLink';
import { BrandLogo } from './BrandLogo';
import { ProfileButton } from './ProfileButton';

interface AppleNavBarProps {
  onToggleAppGrid?: () => void;
  showAppGridButton?: boolean;
  hideMainNav?: boolean;
  className?: string;
  onSearch?: () => void;
}

const AppleNavBar: React.FC<AppleNavBarProps> = ({
  onToggleAppGrid,
  showAppGridButton = true,
  hideMainNav = false,
  className,
  onSearch
}) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={cn(
      "fixed top-0 left-0 right-0 z-50 h-12 backdrop-blur-xl flex items-center justify-between px-4 border-b transition-all duration-300",
      isDarkMode 
        ? "bg-black/60 border-white/10 text-white" 
        : "bg-white/80 border-gray-200 text-gray-800",
      className
    )}>
      <div className="flex items-center">
        <SidebarTrigger className="mr-3" />
        <BrandLogo />
      </div>
      
      {!hideMainNav && (
        <div className="flex items-center space-x-1 sm:space-x-2">
          {onSearch && (
            <NavButton 
              icon={<Search className="h-4 w-4" />}
              onClick={onSearch}
            />
          )}
          
          {showAppGridButton && (
            <NavButton 
              icon={<Grid className="h-4 w-4" />}
              onClick={onToggleAppGrid}
            />
          )}
          
          <NavLink to="/atlas-link" icon={<Shield className="h-4 w-4" />} />
          <NavLink to="/workflows" icon={<Workflow className="h-4 w-4" />} />
          <NavLink to="/chat" icon={<MessageSquare className="h-4 w-4" />} />
          <NavLink to="/settings" icon={<Settings className="h-4 w-4" />} />
          
          <ThemeSwitcherDropdown />
          <ProfileButton />
        </div>
      )}
      
      {hideMainNav && (
        <div className="flex items-center space-x-2">
          {showAppGridButton && (
            <NavButton 
              icon={<Grid className="h-4 w-4" />}
              onClick={onToggleAppGrid}
            />
          )}
          
          <ThemeSwitcherDropdown />
          <ProfileButton />
        </div>
      )}
    </div>
  );
};

export default AppleNavBar;
