
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { SidebarTrigger } from '@/components/ui/sidebar';
import { 
  MessageSquare, 
  Settings, 
  User, 
  Grid,
  Cloud,
  Search,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeSwitcherDropdown from './ThemeSwitcherDropdown';
import { useTheme } from '@/context/ThemeContext';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface AppleNavBarProps {
  onToggleAppGrid?: () => void;
  showAppGridButton?: boolean;
  className?: string;
  onSearch?: () => void;
}

const AppleNavBar: React.FC<AppleNavBarProps> = ({
  onToggleAppGrid,
  showAppGridButton = true,
  className,
  onSearch
}) => {
  const { isDarkMode } = useTheme();

  const handleProfileClick = () => {
    toast.success('Profile feature coming soon!', {
      description: 'Your Trinity Dodge profile will be available in the next update.',
      duration: 3000,
    });
  };

  const MotionLink = motion(Link);
  const MotionButton = motion(Button);

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
        <MotionLink 
          to="/" 
          className="flex items-center group perspective-tilt"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative w-6 h-6 mr-2 flex items-center justify-center">
            <Cloud 
              className={cn(
                "absolute h-5 w-5 transition-all duration-500 text-blue-400",
                "group-hover:scale-110 group-hover:rotate-[360deg]"
              )} 
            />
            <Sparkles className="absolute h-3 w-3 bottom-[1px] right-[1px] text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <span className="font-medium hidden sm:inline transition-colors group-hover:text-blue-400 group-hover:animated-gradient-text">
            Atlas Assistant
          </span>
        </MotionLink>
      </div>
      
      <div className="flex items-center space-x-1 sm:space-x-2">
        {onSearch && (
          <MotionButton 
            variant="ghost" 
            size="icon"
            onClick={onSearch}
            className={cn(
              "rounded-full w-8 h-8 glow-on-hover",
              isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Search className="h-4 w-4" />
          </MotionButton>
        )}
        
        {showAppGridButton && (
          <MotionButton 
            variant="ghost" 
            size="icon"
            onClick={onToggleAppGrid}
            className={cn(
              "rounded-full w-8 h-8 transition-transform hover:scale-110 active:scale-95 glow-on-hover",
              isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Grid className="h-4 w-4" />
          </MotionButton>
        )}
        
        <MotionLink 
          to="/chat"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button 
            variant="ghost" 
            size="icon"
            className={cn(
              "rounded-full w-8 h-8 transition-transform hover:scale-110 active:scale-95 glow-on-hover",
              isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
            )}
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
        </MotionLink>
        
        <MotionLink 
          to="/settings"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button 
            variant="ghost" 
            size="icon"
            className={cn(
              "rounded-full w-8 h-8 transition-transform hover:scale-110 active:scale-95 glow-on-hover",
              isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
            )}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </MotionLink>
        
        <ThemeSwitcherDropdown />
        
        <MotionButton 
          variant="ghost" 
          size="icon"
          onClick={handleProfileClick}
          className={cn(
            "rounded-full w-8 h-8 ml-1 transition-all",
            "bg-gradient-to-br from-blue-500 to-blue-600 text-white",
            "hover:shadow-md hover:shadow-blue-500/20 hover:scale-110 active:scale-95",
            "border border-blue-400/30 glow-on-hover"
          )}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
        >
          <User className="h-4 w-4" />
        </MotionButton>
      </div>
    </div>
  );
};

export default AppleNavBar;
