
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { MessageSquare, Home, Settings, Workflow, Grid, Cloud } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';

const IOSMobileNavigation: React.FC = () => {
  const location = useLocation();
  const { isDarkMode } = useTheme();
  
  const navItems = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: MessageSquare, path: '/chat', label: 'Chat' },
    { icon: Workflow, path: '/workflows', label: 'Flows' },
    { icon: Settings, path: '/settings', label: 'Settings' }
  ];
  
  return (
    <div className="ios-dock">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        
        return (
          <Link key={item.path} to={item.path} className="no-select">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className={cn(
                "ios-dock-app flex items-center justify-center",
                isActive 
                  ? "bg-gradient-to-b from-blue-500 to-blue-600" 
                  : isDarkMode 
                    ? "bg-white/20 backdrop-blur-xl" 
                    : "bg-black/10 backdrop-blur-xl"
              )}
            >
              <Icon 
                className={cn(
                  "h-6 w-6",
                  isActive ? "text-white" : "text-white/80"
                )} 
              />
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
};

export default IOSMobileNavigation;
