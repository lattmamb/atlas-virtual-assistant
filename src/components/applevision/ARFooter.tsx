
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { Github, Twitter, Instagram } from 'lucide-react';

const ARFooter: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <footer className={cn(
      "py-8 px-6 w-full border-t",
      isDarkMode ? "border-white/10" : "border-black/5"
    )}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm mb-4 md:mb-0">
          <p className={cn(
            isDarkMode ? "text-white/70" : "text-black/70"
          )}>
            © {new Date().getFullYear()} Apple Inc. All rights reserved.
          </p>
        </div>
        
        <div className="flex items-center space-x-6">
          <motion.a 
            href="#"
            className={cn(
              "text-sm",
              isDarkMode ? "text-white/70 hover:text-white" : "text-black/70 hover:text-black"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Privacy
          </motion.a>
          
          <motion.a 
            href="#"
            className={cn(
              "text-sm",
              isDarkMode ? "text-white/70 hover:text-white" : "text-black/70 hover:text-black"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Terms
          </motion.a>
          
          <motion.a 
            href="#"
            className={cn(
              "text-sm",
              isDarkMode ? "text-white/70 hover:text-white" : "text-black/70 hover:text-black"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Support
          </motion.a>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <motion.a 
            href="#"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Github className={cn(
              "h-5 w-5",
              isDarkMode ? "text-white/70 hover:text-white" : "text-black/70 hover:text-black"
            )} />
          </motion.a>
          
          <motion.a 
            href="#"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Twitter className={cn(
              "h-5 w-5",
              isDarkMode ? "text-white/70 hover:text-white" : "text-black/70 hover:text-black"
            )} />
          </motion.a>
          
          <motion.a 
            href="#"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Instagram className={cn(
              "h-5 w-5",
              isDarkMode ? "text-white/70 hover:text-white" : "text-black/70 hover:text-black"
            )} />
          </motion.a>
        </div>
      </div>
    </footer>
  );
};

export default ARFooter;
