
import React from 'react';
import { 
  MessageSquare, 
  Settings, 
  Grid,
  Search,
  Workflow,
  Shield 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useTheme } from '@/context/ThemeContext';
import ThemeSwitcherDropdown from '@/components/ThemeSwitcherDropdown';
import AppleLogo from './AppleLogo';
import NavItem from './NavItem';
import ProfileButton from './ProfileButton';

interface StandardNavBarProps {
  onToggleAppGrid?: () => void;
  showAppGridButton?: boolean;
  hideMainNav?: boolean;
  className?: string;
  onSearch?: () => void;
}

const StandardNavBar: React.FC<StandardNavBarProps> = ({
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
        <AppleLogo />
      </div>
      
      {!hideMainNav && (
        <div className="flex items-center space-x-1 sm:space-x-2">
          {onSearch && (
            <NavItem 
              icon={<Search className="h-4 w-4" />} 
              onClick={onSearch}
              label="Search"
            />
          )}
          
          {showAppGridButton && (
            <NavItem 
              icon={<Grid className="h-4 w-4" />} 
              onClick={onToggleAppGrid}
              label="App Grid"
            />
          )}
          
          <NavItem 
            icon={<Shield className="h-4 w-4" />} 
            to="/atlas-link"
            label="Atlas Link"
          />
          
          <NavItem 
            icon={<Workflow className="h-4 w-4" />} 
            to="/workflows"
            label="Workflows"
          />
          
          <NavItem 
            icon={<MessageSquare className="h-4 w-4" />} 
            to="/chat"
            label="Chat"
          />
          
          <NavItem 
            icon={<Settings className="h-4 w-4" />} 
            to="/settings"
            label="Settings"
          />
          
          <ThemeSwitcherDropdown />
          
          <ProfileButton />
        </div>
      )}
      
      {hideMainNav && (
        <div className="flex items-center space-x-2">
          {showAppGridButton && (
            <NavItem 
              icon={<Grid className="h-4 w-4" />} 
              onClick={onToggleAppGrid}
              label="App Grid"
            />
          )}
          
          <ThemeSwitcherDropdown />
          
          <ProfileButton />
        </div>
      )}
    </div>
  );
};

export default StandardNavBar;
