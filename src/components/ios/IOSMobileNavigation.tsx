
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MessageSquare, Settings, Sparkles, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const IOSMobileNavigation: React.FC = () => {
  const { pathname } = useLocation();
  const isMobile = useIsMobile();
  
  if (!isMobile) return null;
  
  const navItems = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: MessageSquare, path: '/chatroom', label: 'Chat', badge: 2 },
    { icon: Search, path: '/search', label: 'Search' },
    { icon: Sparkles, path: '/atlas', label: 'Atlas' },
    { icon: Settings, path: '/settings', label: 'Settings' },
  ];
  
  return (
    <div className="ios-dock">
      {navItems.map((item) => (
        <Link key={item.path} to={item.path}>
          <motion.div 
            className={cn(
              "ios-app-icon relative",
              pathname === item.path ? "opacity-100" : "opacity-70"
            )}
            whileTap={{ scale: 0.9 }}
          >
            <div className="ios-app-icon-inner">
              <item.icon className="h-6 w-6" />
            </div>
            
            {item.badge && (
              <div className="ios-notification-badge">
                {item.badge}
              </div>
            )}
          </motion.div>
        </Link>
      ))}
    </div>
  );
};

export default IOSMobileNavigation;
