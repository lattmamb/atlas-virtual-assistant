
import React from 'react';
import { cn } from "@/lib/utils";
import { useTheme } from '@/context/ThemeContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Settings, 
  ArrowLeft,
  Search,
  Bell,
  User,
  Moon,
  Sun
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatNavBarProps {
  onSearch?: () => void;
  onBack?: () => void;
  className?: string;
}

const ChatNavBar: React.FC<ChatNavBarProps> = ({
  onSearch,
  onBack,
  className
}) => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <motion.div 
      className={cn(
        "w-full h-14 flex items-center justify-between px-4 z-10",
        isDarkMode 
          ? "text-white border-b border-white/10" 
          : "text-gray-800 border-b border-gray-200",
        className
      )}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-4">
        <Link to="/">
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "rounded-full w-8 h-8 transition-colors",
              isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
            )}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        
        <div className="flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-primary" />
          <span className="font-medium text-base">Trinity Dodge Chat</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {onSearch && (
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onSearch}
            className={cn(
              "rounded-full w-8 h-8 transition-colors",
              isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
            )}
          >
            <Search className="h-4 w-4" />
          </Button>
        )}
        
        <Button 
          variant="ghost" 
          size="icon"
          className={cn(
            "rounded-full w-8 h-8 transition-colors",
            isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
          )}
        >
          <Bell className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={toggleTheme}
          className={cn(
            "rounded-full w-8 h-8 transition-colors",
            isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
          )}
        >
          {isDarkMode ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
        
        <Link to="/settings">
          <Button 
            variant="ghost" 
            size="icon"
            className={cn(
              "rounded-full w-8 h-8 transition-colors",
              isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
            )}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </Link>
        
        <Button 
          variant="ghost" 
          size="icon"
          className={cn(
            "rounded-full w-8 h-8 ml-1 transition-all",
            "hover:bg-gray-100 dark:hover:bg-white/10"
          )}
        >
          <User className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default ChatNavBar;
