
import React from 'react';
import { Cloud, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import ThemeSwitcherDropdown from '@/components/ThemeSwitcherDropdown';
import { toast } from 'sonner';

interface iOS18NavBarProps {
  className?: string;
  onSearch?: () => void;
}

const iOS18NavBar: React.FC<iOS18NavBarProps> = ({ className, onSearch }) => {
  const MotionLink = motion(Link);
  const MotionButton = motion(Button);
  
  const handleProfileClick = () => {
    toast.success('Profile feature coming soon!', {
      description: 'Your Trinity Dodge profile will be available in the next update.',
      duration: 3000,
    });
  };
  
  return (
    <div className={cn(
      "fixed top-0 left-0 right-0 z-50 h-12 backdrop-blur-xl flex items-center justify-between px-4 transition-all duration-300",
      "bg-black/60 border-b border-white/5 text-white",
      className
    )}>
      <div className="flex items-center">
        <MotionLink 
          to="/" 
          className="flex items-center group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative w-6 h-6 mr-2 flex items-center justify-center">
            <Cloud 
              className="absolute h-5 w-5 transition-all duration-500 text-blue-400 group-hover:scale-110" 
            />
          </div>
          <span className="font-medium hidden sm:inline text-white">
            Atlas
          </span>
        </MotionLink>
      </div>
      
      <div className="flex items-center space-x-1">
        {onSearch && (
          <MotionButton 
            variant="ghost" 
            size="icon"
            onClick={onSearch}
            className="rounded-full w-8 h-8 hover:bg-white/10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Search className="h-4 w-4" />
          </MotionButton>
        )}
        
        <ThemeSwitcherDropdown />
        
        <MotionButton 
          variant="ghost" 
          size="icon"
          onClick={handleProfileClick}
          className={cn(
            "rounded-full w-8 h-8 ml-1",
            "bg-gradient-to-br from-blue-500 to-blue-600 text-white",
            "border border-blue-400/30"
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <User className="h-4 w-4" />
        </MotionButton>
      </div>
    </div>
  );
};

export default iOS18NavBar;
