
import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, useAnimation, useMotionValue, PanInfo } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { ChevronDown } from 'lucide-react';

interface AppInfo {
  id: string;
  path: string;
  title: string;
  icon: string;
  color: string;
}

const IOSAppSwitcher: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const y = useMotionValue(0);
  
  const apps: AppInfo[] = [
    { id: 'home', path: '/', title: 'Home', icon: '🏠', color: 'from-blue-500 to-purple-600' },
    { id: 'universe', path: '/universe', title: 'Universe', icon: '🌌', color: 'from-purple-500 to-indigo-600' },
    { id: 'vision', path: '/applevisionpro', title: 'Vision Pro', icon: '👁️', color: 'from-gray-700 to-gray-900' },
    { id: 'chat', path: '/chatroom', title: 'Chat Room', icon: '💬', color: 'from-green-500 to-teal-600' },
    { id: 'atlas', path: '/atlaslink', title: 'Atlas Link', icon: '🔗', color: 'from-amber-500 to-orange-600' },
    { id: 'settings', path: '/settings', title: 'Settings', icon: '⚙️', color: 'from-slate-500 to-slate-700' },
  ];
  
  // Find current app
  const currentAppIndex = apps.findIndex(app => app.path === location.pathname);
  const currentApp = apps[currentAppIndex >= 0 ? currentAppIndex : 0];
  
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset } = info;
    
    // If dragged up significantly, close the app switcher
    if (offset.y < -100) {
      // Here you would implement code to close this component
      return;
    }
    
    // Handle horizontal swipes for app switching
    if (Math.abs(offset.x) > 100) {
      let newIndex = currentAppIndex;
      
      if (offset.x > 0) {
        // Swipe right - go to previous app
        newIndex = Math.max(0, currentAppIndex - 1);
      } else {
        // Swipe left - go to next app
        newIndex = Math.min(apps.length - 1, currentAppIndex + 1);
      }
      
      if (newIndex !== currentAppIndex) {
        navigate(apps[newIndex].path);
      }
    }
    
    // Reset position
    controls.start({ x: 0, y: 0 });
  };
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        "fixed inset-0 z-40 pt-20 overflow-hidden",
        isDarkMode ? "bg-black/70" : "bg-white/70",
        "backdrop-blur-lg"
      )}
    >
      <div className="absolute top-4 left-0 right-0 flex justify-center">
        <motion.div 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="w-10 h-1 bg-gray-400/30 rounded-full mb-2" />
          <p className={cn(
            "text-sm font-medium",
            isDarkMode ? "text-white/60" : "text-black/60"
          )}>
            Swipe to switch apps
          </p>
        </motion.div>
      </div>
      
      <motion.div
        drag
        dragConstraints={containerRef}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ y }}
        className="h-full w-full pt-10 pb-20"
      >
        <div className="relative h-full flex flex-col items-center justify-center">
          <div className="relative w-full max-w-md aspect-[9/16] mx-auto">
            {apps.map((app, index) => {
              const isCurrent = app.id === currentApp.id;
              const offset = index - currentAppIndex;
              
              return (
                <motion.div
                  key={app.id}
                  className={cn(
                    "absolute inset-x-4 rounded-3xl overflow-hidden",
                    "border shadow-xl",
                    isDarkMode ? "border-white/10" : "border-black/10"
                  )}
                  initial={{ 
                    top: `${50 + (offset * 60)}px`, 
                    bottom: `${50 - (offset * 60)}px`, 
                    scale: 1 - (Math.abs(offset) * 0.05),
                    opacity: 1 - (Math.abs(offset) * 0.2),
                    zIndex: 10 - Math.abs(offset)
                  }}
                  animate={{ 
                    top: `${50 + (offset * 60)}px`, 
                    bottom: `${50 - (offset * 60)}px`, 
                    scale: 1 - (Math.abs(offset) * 0.05),
                    opacity: 1 - (Math.abs(offset) * 0.2),
                    zIndex: 10 - Math.abs(offset)
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  onClick={() => isCurrent ? null : navigate(app.path)}
                >
                  <div className={cn(
                    "w-full h-full flex flex-col items-center justify-center",
                    "bg-gradient-to-br", app.color
                  )}>
                    <span className="text-5xl mb-4">{app.icon}</span>
                    <h3 className="text-2xl font-bold text-white mb-2">{app.title}</h3>
                    
                    {isCurrent && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-6 flex flex-col items-center"
                      >
                        <ChevronDown className="h-6 w-6 text-white/70 mb-1" />
                        <p className="text-sm text-white/70">Current App</p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default IOSAppSwitcher;
