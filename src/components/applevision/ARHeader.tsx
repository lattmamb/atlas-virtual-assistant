
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

interface NavigationLink {
  label: string;
  href: string;
}

interface ARHeaderProps {
  scrollY: number;
  links?: NavigationLink[];
}

const defaultLinks: NavigationLink[] = [
  { label: 'Explore', href: '#explore' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' }
];

const ARHeader: React.FC<ARHeaderProps> = ({ scrollY, links = defaultLinks }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <motion.header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "py-6 px-6 md:px-10",
        "flex items-center justify-between",
        "transition-all duration-300"
      )}
      style={{
        background: scrollY > 50 
          ? isDarkMode 
            ? 'rgba(0, 0, 0, 0.7)' 
            : 'rgba(255, 255, 255, 0.7)'
          : 'transparent',
        backdropFilter: scrollY > 50 ? 'blur(10px)' : 'none',
        borderBottom: scrollY > 50 
          ? isDarkMode 
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : '1px solid rgba(0, 0, 0, 0.1)'
          : 'none'
      }}
    >
      <motion.div 
        className="logo flex items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-8 h-8 mr-2"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" />
          <line x1="21.17" y1="8" x2="12" y2="8" />
          <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
          <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
        </svg>
        <span className={cn(
          "text-xl font-semibold",
          isDarkMode ? "text-white" : "text-black"
        )}>
          Vision Pro
        </span>
      </motion.div>
      
      <nav className="hidden md:flex items-center space-x-8">
        {links.map((link) => (
          <motion.a
            key={link.label}
            href={link.href}
            className={cn(
              "text-sm font-medium relative",
              isDarkMode ? "text-white/90" : "text-black/90",
              "hover:opacity-100 transition-opacity"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {link.label}
            <motion.span 
              className={cn(
                "absolute bottom-0 left-0 w-0 h-0.5 rounded",
                isDarkMode ? "bg-white" : "bg-black"
              )}
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.2 }}
            />
          </motion.a>
        ))}
      </nav>
      
      <motion.button
        className={cn(
          "md:hidden",
          "w-10 h-10 flex flex-col justify-center items-center",
          "rounded-full",
          isDarkMode ? "bg-white/10" : "bg-black/5",
          "backdrop-blur-md"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className={cn(
          "w-5 h-0.5 mb-1",
          isDarkMode ? "bg-white" : "bg-black"
        )} />
        <span className={cn(
          "w-5 h-0.5",
          isDarkMode ? "bg-white" : "bg-black"
        )} />
      </motion.button>
    </motion.header>
  );
};

export default ARHeader;
