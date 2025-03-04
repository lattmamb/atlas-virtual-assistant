
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { Apple, Settings, MessageSquare, Workflow, Sparkles, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface UniverseNavBarProps {
  currentSection: string;
}

const UniverseNavBar: React.FC<UniverseNavBarProps> = ({ currentSection }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  const navItems = [
    { id: 'vision', label: 'Vision Pro', icon: <Apple className="h-4 w-4" />, path: '/' },
    { id: 'parallax', label: 'Explore', icon: <Sparkles className="h-4 w-4" />, path: '/explore' },
    { id: 'chat', label: 'Chat', icon: <MessageSquare className="h-4 w-4" />, path: '/chatroom' },
    { id: 'atlas', label: 'Atlas', icon: <Sparkles className="h-4 w-4" />, path: '/atlas' },
    { id: 'workflow', label: 'Workflows', icon: <Workflow className="h-4 w-4" />, path: '/workflows' },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-4 w-4" />, path: '/settings' },
  ];
  
  return (
    <motion.header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-4 py-3",
        "backdrop-blur-md border-b border-white/10",
        isDarkMode ? "bg-black/20" : "bg-white/20"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <motion.div 
            className="p-1.5 rounded-full bg-gradient-to-br from-blue-500 to-purple-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Apple className="h-5 w-5 text-white" />
          </motion.div>
          <span className="text-lg font-semibold">Atlas Universe</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          {navItems.map((item) => (
            <Link key={item.id} to={item.path}>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "flex items-center gap-1.5 relative",
                  currentSection === item.id ? "bg-white/10 text-white" : "text-white/70"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
                {currentSection === item.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                    layoutId="activeSection"
                  />
                )}
              </Button>
            </Link>
          ))}
        </div>
        
        <div className="md:hidden">
          <Button variant="ghost" size="sm" className="text-white/70">
            <ChevronDown className="h-4 w-4 mr-1" />
            <span>{navItems.find(item => item.id === currentSection)?.label}</span>
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white/70"
            onClick={toggleTheme}
          >
            {isDarkMode ? (
              <span className="text-xs">☀️</span>
            ) : (
              <span className="text-xs">🌙</span>
            )}
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default UniverseNavBar;
