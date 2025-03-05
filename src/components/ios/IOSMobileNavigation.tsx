
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { MessageSquare, Home, Settings, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

// This component now serves as a minimal fixed navigation at the bottom
// Most navigation functionality has moved to the PageCarousel
const IOSMobileNavigation: React.FC = () => {
  const location = useLocation();
  const { isDarkMode } = useTheme();
  
  const mainItems = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: MessageSquare, path: '/chatroom', label: 'Chat Room' },
  ];
  
  return (
    <div className={cn(
      "ios-dock fixed bottom-4 left-1/2 -translate-x-1/2 z-30",
      "backdrop-blur-xl bg-black/40 border border-white/10 rounded-xl",
      "flex items-center justify-between px-2 py-1 w-auto"
    )}>
      {mainItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        
        return (
          <Link key={item.path} to={item.path} className="no-select">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className={cn(
                "ios-dock-mini flex items-center justify-center p-3 mx-1",
                "rounded-full",
                isActive 
                  ? "bg-gradient-to-b from-blue-500 to-blue-600" 
                  : isDarkMode 
                    ? "bg-white/10 backdrop-blur-xl" 
                    : "bg-black/10 backdrop-blur-xl"
              )}
            >
              <Icon 
                className={cn(
                  "h-5 w-5",
                  isActive ? "text-white" : "text-white/80"
                )} 
              />
            </motion.div>
          </Link>
        );
      })}
      
      {/* Indicator to swipe up for page carousel */}
      <motion.div
        className={cn(
          "ios-dock-mini flex items-center justify-center p-3 mx-1 rounded-full",
          isDarkMode ? "bg-white/10" : "bg-black/10"
        )}
        animate={{ y: [0, -5, 0] }}
        transition={{ 
          repeat: Infinity, 
          duration: 1.5,
          repeatType: "loop" 
        }}
      >
        <ChevronUp className="h-5 w-5 text-white/80" />
      </motion.div>
    </div>
  );
};

export default IOSMobileNavigation;
