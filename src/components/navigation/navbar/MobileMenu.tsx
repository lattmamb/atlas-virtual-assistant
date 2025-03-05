
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavigationItem } from './types';
import { RainbowButton } from '@/components/ui/rainbow-button-new';

interface MobileMenuProps {
  isOpen: boolean;
  navItems: NavigationItem[];
  isActivePath: (path: string) => boolean;
  isDarkMode: boolean;
  onNavigation: (path: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  navItems,
  isActivePath,
  isDarkMode,
  onNavigation,
}) => {
  const navigate = useNavigate();
  
  if (!isOpen) return null;
  
  return (
    <motion.div 
      className={cn(
        "fixed inset-0 z-40 pt-20 px-4 py-6",
        isDarkMode 
          ? "bg-black/95 backdrop-blur-lg" 
          : "bg-white/95 backdrop-blur-lg"
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col space-y-4">
        {navItems.map((item, index) => (
          <motion.button
            key={item.path}
            onClick={() => onNavigation(item.path)}
            className={cn(
              "text-lg font-medium py-3 border-b",
              isActivePath(item.path)
                ? isDarkMode 
                  ? "text-white border-gray-700 bg-white/10" 
                  : "text-black border-gray-200 bg-black/10"
                : isDarkMode 
                  ? "text-gray-300 border-gray-800" 
                  : "text-gray-700 border-gray-200",
            )}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            {item.label}
          </motion.button>
        ))}
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: navItems.length * 0.05 }}
          className="mt-4 flex justify-center"
        >
          <RainbowButton
            onClick={() => {
              navigate('/atlaslink');
              onNavigation('/atlaslink');
            }}
          >
            Try Atlas AI
          </RainbowButton>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MobileMenu;
