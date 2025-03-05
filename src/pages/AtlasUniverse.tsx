
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AtlasLockScreen from '@/components/atlas/universe/AtlasLockScreen';
import AtlasParticleCore from '@/components/atlas/universe/AtlasParticleCore';
import UniversalThemeSwitcher from '@/components/theme/UniversalThemeSwitcher';
import { CalendarDays, Cloud, Settings, BrainCircuit, Route, Clock, Battery, Wifi } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WidgetProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

// Universe Dashboard Widget component
const Widget: React.FC<WidgetProps> = ({ 
  icon, 
  title, 
  children, 
  size = 'md',
  className 
}) => {
  const sizeClasses = {
    sm: 'col-span-1',
    md: 'col-span-1 md:col-span-2',
    lg: 'col-span-2 md:col-span-3',
    xl: 'col-span-2 md:col-span-4',
  };

  return (
    <motion.div 
      className={cn(
        "rounded-xl overflow-hidden backdrop-blur-lg border border-white/10",
        "bg-black/30 text-white shadow-xl",
        sizeClasses[size],
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-primary/20 p-1.5 rounded-full">
            {icon}
          </div>
          <h3 className="font-medium">{title}</h3>
        </div>
        <div className="text-white/90">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

// Gets appropriate theme based on time of day
const getTimeBasedTheme = (): 'dawn' | 'command' | 'warpspace' | 'nebula' => {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 10) return 'dawn'; // Morning
  if (hour >= 10 && hour < 18) return 'command'; // Day/Work
  if (hour >= 18 && hour < 22) return 'warpspace'; // Evening
  return 'nebula'; // Night
};

// Main Atlas Universe component
const AtlasUniverse: React.FC = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [currentMode, setCurrentMode] = useState<'dashboard' | 'mission' | 'fleet'>('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lockScreenTheme, setLockScreenTheme] = useState<'dawn' | 'command' | 'warpspace' | 'nebula'>(getTimeBasedTheme());
  
  // Update time periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      // Update theme based on time of day
      setLockScreenTheme(getTimeBasedTheme());
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);
  
  const handleUnlock = () => {
    setIsLocked(false);
  };
  
  // Generate greeting based on time
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };
  
  // Format current time
  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };
  
  return (
    <div className="fixed inset-0 bg-black">
      {/* Lock Screen */}
      <AnimatePresence>
        {isLocked && (
          <AtlasLockScreen onUnlock={handleUnlock} theme={lockScreenTheme} />
        )}
      </AnimatePresence>
      
      {/* Main Dashboard */}
      <AnimatePresence>
        {!isLocked && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background Particle Effect */}
            <div className="fixed inset-0 z-0">
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <AtlasParticleCore 
                  size={400} 
                  density={100}
                  speed={0.5}
                  colors={['#0A84FF', '#E947FF']}
                  pulseEffect={true}
                />
              </div>
            </div>
            
            {/* Status Bar */}
            <div className="fixed top-0 left-0 right-0 flex justify-between items-center px-6 py-3 z-10">
              <div className="text-white/90 text-sm">{formatTime()}</div>
              <div className="flex items-center space-x-3">
                <Wifi className="h-4 w-4 text-white/90" />
                <Battery className="h-4 w-4 text-white/90" />
              </div>
            </div>
            
            {/* Main Content */}
            <div className="absolute inset-0 pt-14 pb-20 px-6 overflow-y-auto z-10">
              {/* Header Section */}
              <div className="mb-8 text-center">
                <motion.h1 
                  className="text-4xl font-bold bg-gradient-to-r from-white via-white/95 to-white/85 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {getGreeting()}
                </motion.h1>
                <motion.p 
                  className="text-white/70 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Welcome to Atlas Universe
                </motion.p>
              </div>
              
              {/* Navigation */}
              <motion.div 
                className="flex gap-3 justify-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {['dashboard', 'mission', 'fleet'].map((mode) => (
                  <button
                    key={mode}
                    className={`px-4 py-2 rounded-full transition-all ${
                      currentMode === mode 
                        ? 'bg-primary text-white' 
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                    onClick={() => setCurrentMode(mode as any)}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </motion.div>
              
              {/* Widget Grid */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {/* Widgets */}
                <Widget 
                  icon={<CalendarDays className="h-5 w-5 text-primary" />} 
                  title="Today" 
                  size="md"
                >
                  <div className="space-y-2">
                    <div className="text-lg font-semibold">
                      {currentTime.toLocaleDateString('en-US', { weekday: 'long' })}
                    </div>
                    <div className="text-sm text-white/70">
                      {currentTime.toLocaleDateString('en-US', { 
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="mt-3 text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        <span>9:00 AM - Morning Briefing</span>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        <span>2:30 PM - Fleet Management</span>
                      </div>
                    </div>
                  </div>
                </Widget>
                
                <Widget 
                  icon={<BrainCircuit className="h-5 w-5 text-primary" />} 
                  title="AI Status" 
                  size="md"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span>Intelligence</span>
                      <span className="text-primary">98%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '98%' }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 mb-2">
                      <span>Memory Sync</span>
                      <span className="text-primary">86%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '86%' }}></div>
                    </div>
                  </div>
                </Widget>
                
                <Widget 
                  icon={<Route className="h-5 w-5 text-primary" />} 
                  title="Fleet Status" 
                  size="md"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Vehicles Online</span>
                      <span className="text-green-400">3/4</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                        <Clock className="h-4 w-4 text-white" />
                      </div>
                      <div className="text-sm">
                        <div>Dodge Charger</div>
                        <div className="text-white/60 text-xs">Last ping: 10 mins ago</div>
                      </div>
                    </div>
                  </div>
                </Widget>
                
                <Widget 
                  icon={<Cloud className="h-5 w-5 text-primary" />} 
                  title="System Status" 
                  size="md"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Cloud Storage</span>
                      <span>2.4 TB / 5 TB</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '48%' }}></div>
                    </div>
                    
                    <div className="flex justify-between mt-3">
                      <span>Network</span>
                      <span className="text-green-400">Secure</span>
                    </div>
                  </div>
                </Widget>
                
                <Widget 
                  icon={<Settings className="h-5 w-5 text-primary" />} 
                  title="Quick Controls" 
                  size="lg"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Mission Mode', 'Fleet Sync', 'Security', 'Voice Assist'].map((control) => (
                      <button 
                        key={control}
                        className="bg-white/10 hover:bg-white/20 transition-colors p-3 rounded-lg text-sm"
                      >
                        {control}
                      </button>
                    ))}
                  </div>
                </Widget>
              </motion.div>
            </div>
            
            {/* Theme Switcher */}
            <UniversalThemeSwitcher position="floating" variant="minimal" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AtlasUniverse;
