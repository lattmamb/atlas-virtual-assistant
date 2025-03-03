
import React from 'react';
import { cn } from "@/lib/utils";
import { 
  MessageSquare, 
  Settings, 
  Grid,
  Search,
  Shield,
  Workflow,
  Sparkles
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import ThemeSwitcherDropdown from '../ThemeSwitcherDropdown';
import LogoButton from './LogoButton';
import NavButton from './NavButton';
import ProfileButton from './ProfileButton';
import { AppleNavBarProps } from './types';
import { GlowingEffect } from '@/components/ui/glowing-effect';

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
      "fixed top-0 left-0 right-0 z-50 h-14 backdrop-blur-xl flex items-center justify-between px-4 border-b transition-all duration-300",
      isDarkMode 
        ? "bg-black/40 border-white/10 text-white" 
        : "bg-white/80 border-gray-200 text-gray-800",
      className
    )}>
      <div className="flex items-center gap-2">
        <LogoButton />
        <div className="hidden md:flex items-center h-8 px-3 py-2 bg-white/10 rounded-full text-white/80 text-sm font-medium">
          <Sparkles className="h-3.5 w-3.5 mr-2 text-purple-400" />
          Atlas Intelligence
        </div>
      </div>
      
      {!hideMainNav && (
        <div className="relative flex items-center space-x-1 sm:space-x-2">
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={50}
            inactiveZone={0.1}
            borderWidth={1}
            className="opacity-20"
          >
            {onSearch && (
              <NavButton 
                icon={<Search className="h-4 w-4" />}
                onClick={onSearch}
                className="bg-white/5 hover:bg-white/10 text-white border-0"
              />
            )}
            
            {showAppGridButton && (
              <NavButton 
                icon={<Grid className="h-4 w-4" />}
                onClick={onToggleAppGrid}
                className="bg-white/5 hover:bg-white/10 text-white border-0"
              />
            )}
            
            <NavButton 
              icon={<Shield className="h-4 w-4" />}
              to="/atlas-link"
              className="bg-white/5 hover:bg-white/10 text-white border-0"
            />
            
            <NavButton 
              icon={<Workflow className="h-4 w-4" />}
              to="/workflows"
              className="bg-white/5 hover:bg-white/10 text-white border-0"
            />
            
            <NavButton 
              icon={<MessageSquare className="h-4 w-4" />}
              to="/chat"
              className="bg-white/5 hover:bg-white/10 text-white border-0"
            />
            
            <NavButton 
              icon={<Settings className="h-4 w-4" />}
              to="/settings"
              className="bg-white/5 hover:bg-white/10 text-white border-0"
            />
            
            <ThemeSwitcherDropdown />
            
            <ProfileButton />
          </GlowingEffect>
        </div>
      )}
      
      {hideMainNav && (
        <div className="flex items-center space-x-2">
          {showAppGridButton && (
            <NavButton 
              icon={<Grid className="h-4 w-4" />}
              onClick={onToggleAppGrid}
              className="bg-white/5 hover:bg-white/10 text-white border-0"
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
