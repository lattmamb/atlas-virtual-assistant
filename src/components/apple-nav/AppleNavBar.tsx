
import React from 'react';
import { cn } from "@/lib/utils";
import { SidebarTrigger } from '@/components/ui/sidebar';
import { 
  MessageSquare, 
  Settings, 
  Grid,
  Search,
  Shield,
  Workflow
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import ThemeSwitcherDropdown from '../ThemeSwitcherDropdown';
import LogoButton from './LogoButton';
import NavButton from './NavButton';
import ProfileButton from './ProfileButton';
import { AppleNavBarProps } from './types';

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
        <LogoButton />
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
          
          <NavButton 
            icon={<Shield className="h-4 w-4" />}
            to="/atlas-link"
          />
          
          <NavButton 
            icon={<Workflow className="h-4 w-4" />}
            to="/workflows"
          />
          
          <NavButton 
            icon={<MessageSquare className="h-4 w-4" />}
            to="/chat"
          />
          
          <NavButton 
            icon={<Settings className="h-4 w-4" />}
            to="/settings"
          />
          
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
