
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { SidebarTrigger } from '@/components/ui/sidebar';
import { 
  MessageSquare, 
  Settings, 
  User, 
  Grid,
  Moon,
  Sun
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AppleNavBarProps {
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  onToggleAppGrid?: () => void;
  showAppGridButton?: boolean;
  className?: string;
}

const AppleNavBar: React.FC<AppleNavBarProps> = ({
  isDarkMode = true,
  onToggleDarkMode,
  onToggleAppGrid,
  showAppGridButton = true,
  className
}) => {
  return (
    <div className={cn(
      "fixed top-0 left-0 right-0 z-50 h-12 backdrop-blur-lg flex items-center justify-between px-4 border-b transition-colors duration-200",
      isDarkMode 
        ? "bg-[#1a1a1a]/80 border-[#333333] text-white" 
        : "bg-white/80 border-gray-200 text-gray-800",
      className
    )}>
      <div className="flex items-center">
        <SidebarTrigger className="mr-3" />
        <Link to="/" className="flex items-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="h-5 w-5 mr-2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a4.5 4.5 0 0 0 0 9 4.5 4.5 0 0 1 0 9 10 10 0 0 0 0-18Z" />
            <path d="M12 2c-2 4-4 5-6 6 1.5 2 2 4 2 6s-.5 4-2 6c2-1 4-2 6-6 2 4 4 5 6 6-1.5-2-2-4-2-6s.5-4 2-6c-2 1-4 2-6 6Z" />
          </svg>
          <span className="font-medium hidden sm:inline">Atlas Assistant</span>
        </Link>
      </div>
      
      <div className="flex items-center space-x-2">
        {showAppGridButton && (
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onToggleAppGrid}
            className={cn(
              "rounded-full w-8 h-8",
              isDarkMode ? "hover:bg-[#333333]" : "hover:bg-gray-100"
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
              "rounded-full w-8 h-8",
              isDarkMode ? "hover:bg-[#333333]" : "hover:bg-gray-100"
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
              "rounded-full w-8 h-8",
              isDarkMode ? "hover:bg-[#333333]" : "hover:bg-gray-100"
            )}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </Link>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onToggleDarkMode}
          className={cn(
            "rounded-full w-8 h-8",
            isDarkMode ? "hover:bg-[#333333]" : "hover:bg-gray-100"
          )}
        >
          {isDarkMode ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          className={cn(
            "rounded-full w-8 h-8",
            isDarkMode ? "hover:bg-[#333333]" : "hover:bg-gray-100"
          )}
        >
          <User className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AppleNavBar;
