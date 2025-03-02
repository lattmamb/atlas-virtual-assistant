
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import AppleNavBar from '../AppleNavBar';
import AppGrid from './AppGrid';
import { AnimatePresence } from 'framer-motion';

interface ICloudLayoutProps {
  children: React.ReactNode;
  className?: string;
  showNavbar?: boolean;
  showAppGridButton?: boolean;
}

const ICloudLayout: React.FC<ICloudLayoutProps> = ({
  children,
  className,
  showNavbar = true,
  showAppGridButton = true
}) => {
  const [isAppGridOpen, setIsAppGridOpen] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const toggleAppGrid = () => {
    setIsAppGridOpen(!isAppGridOpen);
  };

  const handleSearch = () => {
    // Placeholder for search functionality
    console.log('Search clicked');
  };

  return (
    <div
      className={cn(
        'relative w-full h-screen flex flex-col',
        isDarkMode
          ? 'bg-gradient-to-b from-slate-900 to-slate-950 text-white'
          : 'bg-gradient-to-b from-slate-50 to-white text-slate-900',
        className
      )}
    >
      {showNavbar && (
        <AppleNavBar
          onToggleAppGrid={toggleAppGrid}
          showAppGridButton={showAppGridButton}
          onSearch={handleSearch}
        />
      )}

      <AnimatePresence>
        {isAppGridOpen && (
          <AppGrid
            onClose={() => setIsAppGridOpen(false)}
            isDarkMode={isDarkMode}
          />
        )}
      </AnimatePresence>

      <main className={cn('flex-1 overflow-auto', showNavbar && 'pt-12')}>
        {children}
      </main>
    </div>
  );
};

export default ICloudLayout;
