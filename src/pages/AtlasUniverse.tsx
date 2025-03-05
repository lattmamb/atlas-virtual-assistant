
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import AtlasLockScreen from '@/components/atlas/universe/AtlasLockScreen';
import AtlasParticleCore from '@/components/atlas/universe/AtlasParticleCore';
import AtlasIcon from '@/components/atlas/universe/AtlasIconSet';
import { useTheme } from '@/context/ThemeContext';
import IOSStatusBar from '@/components/ios/IOSStatusBar';
import { Clock, Calendar, MessageSquare, Shield, Settings } from 'lucide-react';

// Define the themes
type ThemeMode = 'dawn' | 'command' | 'warpspace' | 'nebula';

const AtlasUniverse: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [isLocked, setIsLocked] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>('command');
  
  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      // Change theme based on time of day
      const hour = now.getHours();
      if (hour >= 5 && hour < 10) {
        setCurrentTheme('dawn'); // Morning
      } else if (hour >= 10 && hour < 17) {
        setCurrentTheme('command'); // Work hours
      } else if (hour >= 17 && hour < 22) {
        setCurrentTheme('warpspace'); // Evening
      } else {
        setCurrentTheme('nebula'); // Night
      }
      
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Format time display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  
  // Theme color configurations
  const themeConfig = {
    dawn: {
      colors: ['#F5C06D', '#00D8FF'],
      background: 'linear-gradient(135deg, #1A1F2C, #394050)'
    },
    command: {
      colors: ['#1C1548', '#E947FF'],
      background: 'linear-gradient(135deg, #0A0A15, #1C1548)'
    },
    warpspace: {
      colors: ['#E947FF', '#FF4500'],
      background: 'linear-gradient(135deg, #190419, #5A0632)'
    },
    nebula: {
      colors: ['#1A237E', '#B39DDB'],
      background: 'linear-gradient(135deg, #0F1135, #1A237E)'
    }
  };
  
  // Handle unlock
  const handleUnlock = () => {
    setIsLocked(false);
  };
  
  // Reusable ambient widget component
  const AmbientWidget = ({ 
    title, 
    icon, 
    size = 'medium',
    children 
  }: { 
    title: string;
    icon: React.ReactNode;
    size?: 'small' | 'medium' | 'large';
    children: React.ReactNode;
  }) => {
    const sizeClasses = {
      small: 'col-span-1 row-span-1',
      medium: 'col-span-2 row-span-1',
      large: 'col-span-2 row-span-2'
    };
    
    return (
      <motion.div
        className={`${sizeClasses[size]} overflow-hidden backdrop-blur-xl border rounded-3xl`}
        style={{
          background: `${themeConfig[currentTheme].colors[0]}10`,
          borderColor: `${themeConfig[currentTheme].colors[0]}30`
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="p-3 border-b"
          style={{ borderColor: `${themeConfig[currentTheme].colors[0]}20` }}>
          <div className="flex items-center">
            {icon}
            <h3 className="ml-2 text-sm font-medium">{title}</h3>
          </div>
        </div>
        <div className="p-3">
          {children}
        </div>
      </motion.div>
    );
  };
  
  return (
    <div 
      className="min-h-screen w-full relative overflow-hidden"
      style={{ background: themeConfig[currentTheme].background }}
    >
      <AnimatePresence>
        {isLocked && (
          <motion.div
            key="lockscreen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50"
          >
            <AtlasLockScreen 
              onUnlock={handleUnlock} 
              theme={currentTheme}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {!isLocked && (
        <>
          <IOSStatusBar />
          
          {/* Home screen header */}
          <div className="pt-16 px-6 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <AtlasParticleCore 
                size={120}
                colors={themeConfig[currentTheme].colors}
                pulseEffect={true}
              />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl font-bold text-white mb-1"
            >
              Atlas Universe
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-white/80 text-sm mb-6"
            >
              Welcome, Commander
            </motion.p>
            
            {/* Core command icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex space-x-6 mb-10"
            >
              <AtlasIcon
                name="atlasCore"
                color={themeConfig[currentTheme].colors[0]}
                secondaryColor={themeConfig[currentTheme].colors[1]}
              />
              
              <AtlasIcon
                name="missionControl"
                color={themeConfig[currentTheme].colors[0]}
                secondaryColor={themeConfig[currentTheme].colors[1]}
              />
              
              <AtlasIcon
                name="workflows"
                color={themeConfig[currentTheme].colors[0]}
                secondaryColor={themeConfig[currentTheme].colors[1]}
              />
              
              <AtlasIcon
                name="neuralNet"
                color={themeConfig[currentTheme].colors[0]}
                secondaryColor={themeConfig[currentTheme].colors[1]}
              />
            </motion.div>
          </div>
          
          {/* Widget grid */}
          <div className="px-4 pb-24">
            <div className="grid grid-cols-4 gap-3">
              <AmbientWidget
                title="Time & Status"
                icon={<Clock className="h-4 w-4" style={{ color: themeConfig[currentTheme].colors[0] }} />}
                size="medium"
              >
                <div className="flex flex-col items-center">
                  <h2 className="text-xl font-bold text-white">{formatTime(currentTime)}</h2>
                  <p className="text-white/60 text-xs mt-1">{currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)} Mode Active</p>
                  
                  <div className="mt-3 w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: themeConfig[currentTheme].colors[0] }}
                      initial={{ width: '0%' }}
                      animate={{ width: '85%' }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                  <p className="text-white/60 text-xs mt-1">System Integrity: 85%</p>
                </div>
              </AmbientWidget>
              
              <AmbientWidget
                title="Calendar"
                icon={<Calendar className="h-4 w-4" style={{ color: themeConfig[currentTheme].colors[1] }} />}
                size="medium"
              >
                <div className="space-y-2">
                  <div style={{ background: `${themeConfig[currentTheme].colors[0]}20` }} className="p-2 rounded-lg">
                    <p className="text-xs font-bold text-white">9:00 AM</p>
                    <p className="text-xs text-white/80">Trinity Dodge Team Meeting</p>
                  </div>
                  <div style={{ background: `${themeConfig[currentTheme].colors[1]}20` }} className="p-2 rounded-lg">
                    <p className="text-xs font-bold text-white">2:30 PM</p>
                    <p className="text-xs text-white/80">Review Sales Performance</p>
                  </div>
                </div>
              </AmbientWidget>
              
              <AmbientWidget
                title="Messages"
                icon={<MessageSquare className="h-4 w-4" style={{ color: themeConfig[currentTheme].colors[0] }} />}
                size="large"
              >
                <div className="flex flex-col h-full">
                  <div className="flex-1 space-y-2">
                    <div style={{ background: `${themeConfig[currentTheme].colors[0]}15` }} className="p-2 rounded-lg">
                      <p className="text-xs font-bold text-white">Atlas Assistant</p>
                      <p className="text-xs text-white/80 truncate">I've analyzed today's sales data. Would you like a report?</p>
                    </div>
                    <div style={{ background: `${themeConfig[currentTheme].colors[1]}15` }} className="p-2 rounded-lg">
                      <p className="text-xs font-bold text-white">Marketing Team</p>
                      <p className="text-xs text-white/80 truncate">New Dodge Charger campaign is ready for review</p>
                    </div>
                    <div style={{ background: `${themeConfig[currentTheme].colors[0]}15` }} className="p-2 rounded-lg">
                      <p className="text-xs font-bold text-white">Service Department</p>
                      <p className="text-xs text-white/80 truncate">5 vehicles scheduled for maintenance tomorrow</p>
                    </div>
                  </div>
                  
                  <Link to="/chatroom">
                    <motion.button
                      className="w-full mt-2 py-2 rounded-xl text-sm font-medium"
                      style={{ background: themeConfig[currentTheme].colors[0] }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View All Messages
                    </motion.button>
                  </Link>
                </div>
              </AmbientWidget>
              
              <AmbientWidget
                title="Security"
                icon={<Shield className="h-4 w-4" style={{ color: themeConfig[currentTheme].colors[1] }} />}
                size="small"
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-1"
                    style={{ background: `${themeConfig[currentTheme].colors[1]}30` }}
                  >
                    <Shield className="h-5 w-5" fill={themeConfig[currentTheme].colors[1]} />
                  </div>
                  <p className="text-xs text-white/80">System Secure</p>
                </div>
              </AmbientWidget>
              
              <Link to="/trinity" className="col-span-2 row-span-1">
                <motion.div
                  className="h-full overflow-hidden backdrop-blur-xl border rounded-3xl"
                  style={{
                    background: `rgba(230, 30, 30, 0.2)`,
                    borderColor: `rgba(230, 30, 30, 0.3)`
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="p-3 border-b border-red-500/20">
                    <div className="flex items-center">
                      <Car className="h-4 w-4 text-red-500" />
                      <h3 className="ml-2 text-sm font-medium">Trinity Dodge</h3>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div style={{ background: `rgba(230, 30, 30, 0.15)` }} className="p-2 rounded-lg">
                        <p className="text-xs font-bold text-white">Dodge Ram 1500</p>
                        <p className="text-xs text-white/80">$38,000</p>
                      </div>
                      <div style={{ background: `rgba(230, 30, 30, 0.15)` }} className="p-2 rounded-lg">
                        <p className="text-xs font-bold text-white">Dodge Charger</p>
                        <p className="text-xs text-white/80">$32,000</p>
                      </div>
                    </div>
                    <p className="text-center text-xs text-white/60 mt-2">Tap to view inventory</p>
                  </div>
                </motion.div>
              </Link>
              
              <Link to="/settings" className="col-span-1 row-span-1">
                <motion.div
                  className="h-full overflow-hidden backdrop-blur-xl border rounded-3xl"
                  style={{
                    background: `${themeConfig[currentTheme].colors[0]}10`,
                    borderColor: `${themeConfig[currentTheme].colors[0]}30`
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="p-3 border-b"
                    style={{ borderColor: `${themeConfig[currentTheme].colors[0]}20` }}>
                    <div className="flex items-center">
                      <Settings className="h-4 w-4" style={{ color: themeConfig[currentTheme].colors[0] }} />
                      <h3 className="ml-2 text-sm font-medium">Settings</h3>
                    </div>
                  </div>
                  <div className="p-3 flex flex-col items-center justify-center h-full">
                    <Settings className="h-8 w-8 mb-1" style={{ color: themeConfig[currentTheme].colors[0] }} />
                    <p className="text-xs text-white/80">Configure System</p>
                  </div>
                </motion.div>
              </Link>
            </div>
          </div>
          
          {/* Bottom dock */}
          <motion.div
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-4 rounded-2xl backdrop-blur-lg border z-10"
            style={{
              background: `${themeConfig[currentTheme].colors[0]}20`,
              borderColor: `${themeConfig[currentTheme].colors[0]}30`,
              boxShadow: `0 10px 25px ${themeConfig[currentTheme].colors[0]}20`
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex space-x-6">
              <AtlasIcon name="atlasCore" size={30} color={themeConfig[currentTheme].colors[0]} secondaryColor={themeConfig[currentTheme].colors[1]} />
              <AtlasIcon name="missionControl" size={30} color={themeConfig[currentTheme].colors[0]} secondaryColor={themeConfig[currentTheme].colors[1]} />
              <AtlasIcon name="workflows" size={30} color={themeConfig[currentTheme].colors[0]} secondaryColor={themeConfig[currentTheme].colors[1]} />
              <AtlasIcon name="haloNotifications" size={30} color={themeConfig[currentTheme].colors[0]} secondaryColor={themeConfig[currentTheme].colors[1]} />
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default AtlasUniverse;
