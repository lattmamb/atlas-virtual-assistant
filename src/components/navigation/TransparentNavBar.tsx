
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { useNavBarScroll } from './navbar/useNavBarScroll';
import NavLogo from './navbar/NavLogo';
import DesktopNav from './navbar/DesktopNav';
import MobileMenuButton from './navbar/MobileMenuButton';
import MobileMenu from './navbar/MobileMenu';
import { NavigationItem } from './navbar/types';

const TransparentNavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isScrolled, isVisible } = useNavBarScroll();

  const navItems: NavigationItem[] = [
    { path: '/', label: 'Home' },
    { path: '/universe', label: 'U-N-I-Verse' },
    { path: '/chatroom', label: 'Chat Room' },
    { path: '/atlaslink', label: 'Atlas Link' },
    { path: '/applevisionpro', label: 'Vision Pro' },
    { path: '/settings', label: 'Settings' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  // Determine active path
  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header 
          className={cn(
            "fixed top-0 left-0 right-0 z-50 py-3 px-4 md:px-6 transition-all duration-300",
            isScrolled 
              ? isDarkMode 
                ? "bg-black/70 backdrop-blur-lg" 
                : "bg-white/70 backdrop-blur-lg"
              : "bg-transparent"
          )}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Logo */}
            <NavLogo 
              isDarkMode={isDarkMode} 
              onClick={() => navigate('/')} 
            />
            
            {/* Desktop Navigation */}
            <DesktopNav 
              navItems={navItems}
              isActivePath={isActivePath}
              isDarkMode={isDarkMode}
              onNavigation={handleNavigation}
            />
            
            {/* Mobile Menu Button */}
            <MobileMenuButton 
              isOpen={isMobileMenuOpen}
              isDarkMode={isDarkMode}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </motion.header>
      )}
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu 
            isOpen={isMobileMenuOpen}
            navItems={navItems}
            isActivePath={isActivePath}
            isDarkMode={isDarkMode}
            onNavigation={handleNavigation}
          />
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};

export default TransparentNavBar;
