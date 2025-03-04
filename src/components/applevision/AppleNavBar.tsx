
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { Menu, X, Apple, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const AppleNavBar: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Track scroll position for navbar background changes
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: "Overview", href: "#overview" },
    { label: "Features", href: "#features" },
    { label: "Tech Specs", href: "#specs", hasDropdown: true },
    { label: "Pricing", href: "#pricing" },
    { label: "Support", href: "#support" },
  ];

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300",
        isScrolled 
          ? isDarkMode 
            ? "bg-black/70 backdrop-blur-lg" 
            : "bg-white/70 backdrop-blur-lg"
          : "bg-transparent"
      )}>
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <Link to="/" className="text-3xl">
            <Apple className={cn(
              "h-7 w-7 transition-colors",
              isDarkMode ? "text-white" : "text-black"
            )} />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                <a 
                  href={item.href}
                  className={cn(
                    "text-sm font-medium",
                    "transition-colors duration-200",
                    isDarkMode 
                      ? "text-gray-300 hover:text-white" 
                      : "text-gray-700 hover:text-black",
                    "flex items-center gap-1"
                  )}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDown className="h-4 w-4 opacity-70" />
                  )}
                </a>
                
                {!isScrolled && (
                  <motion.div 
                    className={cn(
                      "absolute bottom-0 left-0 h-0.5 w-0 bg-current",
                      "group-hover:w-full transition-all duration-300"
                    )}
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                  />
                )}
              </div>
            ))}
          </nav>
          
          {/* CTA Button */}
          <button className={cn(
            "hidden md:block px-4 py-1.5 text-sm font-medium rounded-full",
            "transition-all duration-300",
            isDarkMode 
              ? "bg-white text-black hover:bg-opacity-90" 
              : "bg-black text-white hover:bg-opacity-90"
          )}>
            Buy Now
          </button>
          
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
      </header>
      
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
            <div className="flex flex-col space-y-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className={cn(
                    "text-xl font-medium py-2 border-b",
                    isDarkMode 
                      ? "text-white border-gray-800" 
                      : "text-black border-gray-200"
                  )}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
              
              <motion.button 
                className={cn(
                  "mt-4 px-6 py-3 text-base font-medium rounded-full",
                  "transition-all duration-300",
                  isDarkMode 
                    ? "bg-white text-black" 
                    : "bg-black text-white"
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
              >
                Buy Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AppleNavBar;
