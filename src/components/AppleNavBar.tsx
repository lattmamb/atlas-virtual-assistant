
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
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeSwitcher from './ThemeSwitcher';
import { useTheme } from '@/context/ThemeContext';

interface AppleNavBarProps {
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
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
        <Link to="/" className="flex items-center group">
          <div className="relative w-6 h-6 mr-2 flex items-center justify-center">
            <Cloud 
              className={cn(
                "absolute h-5 w-5 transition-all duration-500 text-blue-400",
                "group-hover:scale-110 group-hover:rotate-[360deg]"
              )} 
            />
          </div>
          <span className="font-medium hidden sm:inline transition-colors group-hover:text-blue-400">
            Atlas Assistant
          </span>
        </Link>
      </div>
      
      <div className="flex items-center space-x-1 sm:space-x-2">
        {onSearch && (
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onSearch}
            className={cn(
              "rounded-full w-8 h-8",
              isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
            )}
          >
            <Search className="h-4 w-4" />
          </Button>
        )}
        
        {showAppGridButton && (
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onToggleAppGrid}
            className={cn(
              "rounded-full w-8 h-8 transition-transform hover:scale-110 active:scale-95",
              isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
            )}
          >
            <Grid className="h-4 w-4" />
          </Button>
        )}
        
        <Link to="/chat">
          <Button 
            variant="ghost" 
            size="icon"
            className={cn(
              "rounded-full w-8 h-8 transition-transform hover:scale-110 active:scale-95",
              isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
            )}
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
        </Link>
        
        <Link to="/settings">
          <Button 
            variant="ghost" 
            size="icon"
            className={cn(
              "rounded-full w-8 h-8 transition-transform hover:scale-110 active:scale-95",
              isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
            )}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </Link>
        
        <ThemeSwitcher />
        
        <Button 
          variant="ghost" 
          size="icon"
          className={cn(
            "rounded-full w-8 h-8 ml-1 transition-all",
            "bg-gradient-to-br from-blue-500 to-blue-600 text-white",
            "hover:shadow-md hover:shadow-blue-500/20 hover:scale-110 active:scale-95",
            "border border-blue-400/30"
          )}
        >
          <User className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AppleNavBar;
