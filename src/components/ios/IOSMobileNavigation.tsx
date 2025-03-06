
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { MessageSquare, Home, ChevronUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const IOSMobileNavigation: React.FC = () => {
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const [isAppSwitcherOpen, setIsAppSwitcherOpen] = useState(false);
  
  const mainItems = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: MessageSquare, path: '/chatroom', label: 'Chat Room' },
  ];

  const allApps = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: MessageSquare, path: '/chatroom', label: 'Chat Room' },
    { icon: () => <span className="text-lg">👁️</span>, path: '/applevisionpro', label: 'Vision Pro' },
    { icon: () => <span className="text-lg">🔗</span>, path: '/atlaslink', label: 'Atlas Link' },
    { icon: () => <span className="text-lg">⚙️</span>, path: '/settings', label: 'Settings' },
  ];
  
  return (
    <>
      {/* App Switcher */}
      <AnimatePresence>
        {isAppSwitcherOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }} 
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={cn(
              "fixed inset-x-0 bottom-safe sm:bottom-20 z-40 px-4",
            )}
          >
            <motion.div
              className={cn(
                "mx-auto rounded-2xl overflow-hidden max-w-md",
                "backdrop-blur-xl",
                isDarkMode 
                  ? "bg-black/70 border border-white/10" 
                  : "bg-white/70 border border-black/10",
              )}
            >
              <div className="flex justify-end p-2">
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsAppSwitcherOpen(false)}
                  className={cn(
                    "p-1 rounded-full", 
                    isDarkMode 
                      ? "bg-white/10 text-white/80" 
                      : "bg-black/10 text-black/80"
                  )}
                >
                  <X size={18} />
                </motion.button>
              </div>
              
              <div className="grid grid-cols-4 gap-4 p-4">
                {allApps.map((app) => {
                  const isActive = location.pathname === app.path;
                  const Icon = app.icon;
                  
                  return (
                    <Link 
                      key={app.path} 
                      to={app.path} 
                      onClick={() => setIsAppSwitcherOpen(false)}
                      className="no-select"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex flex-col items-center"
                      >
                        <div 
                          className={cn(
                            "w-14 h-14 rounded-2xl mb-1 flex items-center justify-center",
                            isActive 
                              ? "bg-gradient-to-b from-blue-500 to-blue-600" 
                              : isDarkMode 
                                ? "bg-white/10" 
                                : "bg-black/10"
                          )}
                        >
                          <Icon className={cn(
                            "h-6 w-6",
                            isActive ? "text-white" : isDarkMode ? "text-white/80" : "text-black/80"
                          )} />
                        </div>
                        <span className={cn(
                          "text-xs font-medium",
                          isDarkMode ? "text-white/80" : "text-black/80"
                        )}>
                          {app.label}
                        </span>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Dock */}
      <div className={cn(
        "ios-dock fixed bottom-safe sm:bottom-4 left-1/2 -translate-x-1/2 z-50",
        "backdrop-blur-xl bg-black/40 border border-white/10 rounded-xl",
        "flex items-center justify-between px-2 py-1 w-auto",
        "shadow-lg"
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
        
        <motion.div
          className={cn(
            "ios-dock-mini flex items-center justify-center p-3 mx-1 rounded-full",
            isDarkMode ? "bg-white/10" : "bg-black/10"
          )}
          animate={{ y: isAppSwitcherOpen ? 0 : [0, -5, 0] }}
          transition={{ 
            repeat: isAppSwitcherOpen ? 0 : Infinity, 
            duration: 1.5,
            repeatType: "loop" 
          }}
          onClick={() => setIsAppSwitcherOpen(!isAppSwitcherOpen)}
        >
          <ChevronUp className="h-5 w-5 text-white/80" />
        </motion.div>
      </div>
    </>
  );
};

export default IOSMobileNavigation;
