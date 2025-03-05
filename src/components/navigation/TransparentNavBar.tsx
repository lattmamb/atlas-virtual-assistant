
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { Menu, X, Apple, ChevronDown } from 'lucide-react';
import { RainbowButton } from '@/components/ui/rainbow-button-new';

const TransparentNavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Track scroll position for navbar visibility and background changes
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if navbar should be visible based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false); // Scrolling down, hide navbar
      } else {
        setIsVisible(true); // Scrolling up, show navbar
      }
      
      // Update background based on scroll position
      setIsScrolled(currentScrollY > 20);
      
      // Update last scroll position
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
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
            <div 
              className="text-3xl cursor-pointer"
              onClick={() => navigate('/')}
            >
              <Apple className={cn(
                "h-7 w-7 transition-colors",
                isDarkMode ? "text-white" : "text-black"
              )} />
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <div key={item.path} className="relative group">
                  <button 
                    onClick={() => handleNavigation(item.path)}
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
            
            {/* CTA Button */}
            <RainbowButton
              onClick={() => navigate('/atlaslink')}
              className="hidden md:inline-flex h-9 px-4 py-2 text-sm"
            >
              Try Atlas AI
            </RainbowButton>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
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
          </div>
        </motion.header>
      )}
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
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
                  onClick={() => handleNavigation(item.path)}
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
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Try Atlas AI
                </RainbowButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};

export default TransparentNavBar;
