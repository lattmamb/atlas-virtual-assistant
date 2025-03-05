
import React from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileMenuButtonProps {
  isOpen: boolean;
  isDarkMode: boolean;
  onClick: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
  isOpen,
  isDarkMode,
  onClick,
}) => {
  return (
    <button 
      className="md:hidden"
      onClick={onClick}
    >
      {isOpen ? (
        <X className={cn(
          "h-6 w-6",
          isDarkMode ? "text-white" : "text-black"
        )} />
      ) : (
        <Menu className={cn(
          "h-6 w-6",
          isDarkMode ? "text-white" : "text-black"
        )} />
      )}
    </button>
  );
};

export default MobileMenuButton;
