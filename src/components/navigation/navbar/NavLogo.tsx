
import React from 'react';
import { Apple } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavLogoProps {
  isDarkMode: boolean;
  onClick: () => void;
}

const NavLogo: React.FC<NavLogoProps> = ({ isDarkMode, onClick }) => {
  return (
    <div 
      className="text-3xl cursor-pointer"
      onClick={onClick}
    >
      <Apple className={cn(
        "h-7 w-7 transition-colors",
        isDarkMode ? "text-white" : "text-black"
      )} />
    </div>
  );
};

export default NavLogo;
