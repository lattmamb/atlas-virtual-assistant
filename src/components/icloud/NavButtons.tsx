
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { 
  MessageSquare, 
  Settings, 
  Workflow,
  Shield,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface NavButtonsProps {
  isDarkMode: boolean;
  onSearch?: () => void;
}

const MotionLink = motion(Link);
const MotionButton = motion(Button);

const NavButtons: React.FC<NavButtonsProps> = ({ isDarkMode, onSearch }) => {
  return (
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
      
      <MotionLink 
        to="/atlas-link"
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
          <Shield className="h-4 w-4" />
        </Button>
      </MotionLink>
      
      <MotionLink 
        to="/workflows"
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
          <Workflow className="h-4 w-4" />
        </Button>
      </MotionLink>
      
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
    </div>
  );
};

export default NavButtons;
