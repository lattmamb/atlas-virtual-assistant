
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NavigationItem } from './types';
import { RainbowButton } from '@/components/ui/rainbow-button-new';
import { useNavigate } from 'react-router-dom';

interface DesktopNavProps {
  navItems: NavigationItem[];
  isActivePath: (path: string) => boolean;
  isDarkMode: boolean;
  onNavigation: (path: string) => void;
}

const DesktopNav: React.FC<DesktopNavProps> = ({
  navItems,
  isActivePath,
  isDarkMode,
  onNavigation,
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="hidden md:flex items-center justify-between w-full">
      <nav className="flex items-center space-x-4">
        {navItems.map((item) => (
          <div key={item.path} className="relative group">
            <button 
              onClick={() => onNavigation(item.path)}
              className={cn(
                "text-sm font-medium px-3 py-2 rounded-md",
                "transition-colors duration-200",
                isActivePath(item.path)
                  ? isDarkMode 
                    ? "bg-white/10 text-white" 
                    : "bg-black/10 text-black"
                  : isDarkMode 
                    ? "text-gray-300 hover:text-white hover:bg-white/5" 
                    : "text-gray-700 hover:text-black hover:bg-black/5"
              )}
            >
              {item.label}
            </button>
            
            {isActivePath(item.path) && (
              <motion.div 
                className={cn(
                  "absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                )}
                layoutId="activeNavIndicator"
              />
            )}
          </div>
        ))}
      </nav>
      
      <RainbowButton
        onClick={() => navigate('/atlaslink')}
        className="h-9 px-4 py-2 text-sm"
      >
        Try Atlas AI
      </RainbowButton>
    </div>
  );
};

export default DesktopNav;
