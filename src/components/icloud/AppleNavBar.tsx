
import React from 'react';
import { cn } from "@/lib/utils";
import { SidebarTrigger } from '@/components/ui/sidebar';
import ThemeSwitcherDropdown from '../ThemeSwitcherDropdown';
import { useTheme } from '@/context/ThemeContext';
import Logo from './Logo';
import NavButtons from './NavButtons';
import ProfileButton from './ProfileButton';
import GridButton from './GridButton';

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
  const { isDarkMode, currentTheme } = useTheme();
  const isIOS18Theme = currentTheme === 'ios18';

  // If using iOS 18 theme, we'll use a more iOS-like navigation
  if (isIOS18Theme) {
    return (
      <div className={cn(
        "fixed top-0 left-0 right-0 z-50 h-12 backdrop-blur-xl flex items-center justify-between px-4 transition-all duration-300",
        "bg-black/60 border-b border-white/5 text-white",
        className
      )}>
        <div className="flex items-center">
          <Logo variant="ios18" />
        </div>
        
        <div className="flex items-center space-x-1">
          {onSearch && (
            <GridButton 
              onToggleAppGrid={onSearch} 
              isDarkMode={isDarkMode} 
              variant="ios18"
            />
          )}
          
          <ThemeSwitcherDropdown />
          
          <ProfileButton isDarkMode={isDarkMode} variant="ios18" />
        </div>
      </div>
    );
  }

  // For all other themes, use the original navigation
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
        <Logo />
      </div>
      
      {!hideMainNav && (
        <div className="flex items-center space-x-1 sm:space-x-2">
          <NavButtons isDarkMode={isDarkMode} onSearch={onSearch} />
          
          {showAppGridButton && (
            <GridButton onToggleAppGrid={onToggleAppGrid} isDarkMode={isDarkMode} />
          )}
          
          <ThemeSwitcherDropdown />
          
          <ProfileButton isDarkMode={isDarkMode} />
        </div>
      )}
      
      {hideMainNav && (
        <div className="flex items-center space-x-2">
          {showAppGridButton && (
            <GridButton onToggleAppGrid={onToggleAppGrid} isDarkMode={isDarkMode} />
          )}
          
          <ThemeSwitcherDropdown />
          
          <ProfileButton isDarkMode={isDarkMode} />
        </div>
      )}
    </div>
  );
};

export default AppleNavBar;
