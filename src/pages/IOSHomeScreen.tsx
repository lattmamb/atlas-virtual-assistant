
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import IOSStatusBar from '@/components/ios/IOSStatusBar';
import IOSAppGrid from '@/components/ios/IOSAppGrid';
import IOSWidget from '@/components/ios/IOSWidget';
import { Clock, Calendar, Cloud, MessageSquare, Settings, Workflow, Music, Image, FileText } from 'lucide-react';
import BackgroundEffects from '@/components/widgets/BackgroundEffects';

// Import all pages
import UniverseHome from './UniverseHome';
import AppleVisionPro from './AppleVisionPro';
import Atlas from './Atlas';
import AtlasLink from './AtlasLink';
import AtlasUniverse from './AtlasUniverse';
import ChatRoom from './ChatRoom';
import Settings from './Settings';
import Workflows from './Workflows';
import Trinity from './Trinity';

const IOSHomeScreen: React.FC = () => {
  const { currentTheme } = useTheme();
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState({ temp: '72°', condition: 'Sunny' });
  const [activePage, setActivePage] = useState<string | null>(null);
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Widgets data
  const widgets = [
    {
      id: 'time',
      title: 'Time & Weather',
      size: 'medium',
      content: (
        <div className="flex flex-col items-center justify-center h-full p-3 text-center">
          <Clock className="h-6 w-6 mb-1 text-blue-400" />
          <h3 className="text-2xl font-bold">{formatTime(time)}</h3>
          <p className="text-sm opacity-70">{formatDate(time)}</p>
          <div className="mt-2 flex items-center">
            <span className="text-lg font-semibold">{weather.temp}</span>
            <span className="ml-2 text-sm opacity-70">{weather.condition}</span>
          </div>
        </div>
      )
    },
    {
      id: 'calendar',
      title: 'Calendar',
      size: 'medium',
      content: (
        <div className="p-3">
          <div className="flex items-center mb-2">
            <Calendar className="h-5 w-5 mr-2 text-red-500" />
            <h3 className="font-semibold">Upcoming</h3>
          </div>
          <div className="space-y-2">
            <div className="bg-black/10 p-2 rounded-lg">
              <p className="text-xs font-bold">9:00 AM</p>
              <p className="text-sm">Morning Meeting</p>
            </div>
            <div className="bg-black/10 p-2 rounded-lg">
              <p className="text-xs font-bold">2:30 PM</p>
              <p className="text-sm">Trinity Dodge Team Call</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'chat',
      title: 'Atlas Chat',
      size: 'large',
      content: (
        <div className="p-3 h-full flex flex-col">
          <div className="flex items-center mb-2">
            <MessageSquare className="h-5 w-5 mr-2 text-blue-500" />
            <h3 className="font-semibold">Recent Messages</h3>
          </div>
          <div className="flex-1 space-y-2 overflow-hidden">
            <div className="bg-black/10 p-2 rounded-lg">
              <p className="text-xs font-bold">Atlas Assistant</p>
              <p className="text-sm truncate">Welcome to Trinity Dodge! How can I assist you today?</p>
            </div>
            <div className="bg-black/10 p-2 rounded-lg">
              <p className="text-xs font-bold">You</p>
              <p className="text-sm truncate">I'm interested in the new Dodge Charger</p>
            </div>
            <div className="bg-black/10 p-2 rounded-lg">
              <p className="text-xs font-bold">Atlas Assistant</p>
              <p className="text-sm truncate">Great choice! The 2025 Dodge Charger starts at $32,000 with several trims available...</p>
            </div>
          </div>
          <motion.button 
            className="w-full mt-2 bg-blue-500 text-white py-2 rounded-xl text-sm font-medium"
            whileTap={{ scale: 0.95 }}
          >
            Continue Chat
          </motion.button>
        </div>
      )
    },
    {
      id: 'workflows',
      title: 'Workflows',
      size: 'small',
      content: (
        <div className="p-3 h-full flex flex-col justify-center items-center">
          <Workflow className="h-8 w-8 mb-2 text-purple-500" />
          <p className="text-sm text-center">3 Active Workflows</p>
        </div>
      )
    },
    {
      id: 'trinity',
      title: 'Trinity Dodge',
      size: 'large',
      content: (
        <div className="p-3 h-full">
          <h3 className="font-semibold mb-2">Featured Vehicles</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-black/10 p-2 rounded-lg">
              <p className="text-xs font-bold">Dodge Ram 1500</p>
              <p className="text-xs opacity-70">$38,000</p>
              <p className="text-[10px] mt-1 opacity-60">Perfect for Taylorville roads</p>
            </div>
            <div className="bg-black/10 p-2 rounded-lg">
              <p className="text-xs font-bold">Dodge Charger</p>
              <p className="text-xs opacity-70">$32,000</p>
              <p className="text-[10px] mt-1 opacity-60">Power and performance</p>
            </div>
            <div className="bg-black/10 p-2 rounded-lg">
              <p className="text-xs font-bold">Dodge Durango</p>
              <p className="text-xs opacity-70">$41,000</p>
              <p className="text-[10px] mt-1 opacity-60">Family-friendly SUV</p>
            </div>
            <Link to="/trinity" className="block">
              <motion.div 
                className="bg-red-500/20 p-2 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <p className="text-xs font-bold">Visit Trinity Dodge</p>
                <p className="text-[10px] mt-1 opacity-60">Tap to view inventory</p>
              </motion.div>
            </Link>
          </div>
        </div>
      )
    },
    {
      id: 'music',
      title: 'Now Playing',
      size: 'medium',
      content: (
        <div className="p-3 h-full flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-3">
            <Music className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-sm">Drive My Car</h4>
            <p className="text-xs opacity-70">Road Trip Playlist</p>
            <div className="flex space-x-2 mt-1">
              <motion.button className="text-xs bg-black/10 px-2 py-1 rounded-md" whileTap={{ scale: 0.95 }}>
                ◀◀
              </motion.button>
              <motion.button className="text-xs bg-black/10 px-2 py-1 rounded-md" whileTap={{ scale: 0.95 }}>
                ▶
              </motion.button>
              <motion.button className="text-xs bg-black/10 px-2 py-1 rounded-md" whileTap={{ scale: 0.95 }}>
                ▶▶
              </motion.button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'notes',
      title: 'Quick Notes',
      size: 'medium',
      content: (
        <div className="p-3 h-full">
          <div className="flex items-center mb-2">
            <FileText className="h-5 w-5 mr-2 text-yellow-500" />
            <h3 className="font-semibold">Notes</h3>
          </div>
          <div className="space-y-2">
            <div className="bg-black/10 p-2 rounded-lg">
              <p className="text-xs">Call Trinity Dodge service center about oil change</p>
            </div>
            <div className="bg-black/10 p-2 rounded-lg">
              <p className="text-xs">Check financing options for new Charger</p>
            </div>
          </div>
          <motion.button 
            className="w-full mt-2 bg-black/10 py-1 rounded-xl text-xs font-medium"
            whileTap={{ scale: 0.95 }}
          >
            + New Note
          </motion.button>
        </div>
      )
    },
    {
      id: 'photos',
      title: 'Recent Photos',
      size: 'small',
      content: (
        <div className="p-2 h-full flex flex-col justify-center items-center">
          <Image className="h-8 w-8 mb-1 text-pink-500" />
          <p className="text-xs text-center">12 new photos</p>
        </div>
      )
    }
  ];

  // Function to handle app icon clicks
  const handleAppClick = (appName: string) => {
    setActivePage(appName);
  };

  // Function to go back to home screen
  const handleBackToHome = () => {
    setActivePage(null);
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'Messages':
        return <ChatRoom />;
      case 'Universe':
        return <UniverseHome />;
      case 'Vision Pro':
        return <AppleVisionPro />;
      case 'Cloud':
        return <Atlas />;
      case 'Atlas Link':
        return <AtlasLink />;
      case 'Atlas Universe':
        return <AtlasUniverse />;
      case 'Settings':
        return <Settings />;
      case 'Workflows':
        return <Workflows />;
      case 'Trinity':
        return <Trinity />;
      default:
        return null;
    }
  };

  return (
    <div className="ios-home-screen min-h-screen overflow-y-auto pb-24">
      <BackgroundEffects currentTheme={currentTheme} />
      <IOSStatusBar onBackClick={activePage ? handleBackToHome : undefined} />
      
      <AnimatePresence mode="wait">
        {activePage ? (
          <motion.div
            key="active-page"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="pt-16"
          >
            {renderActivePage()}
          </motion.div>
        ) : (
          <motion.div
            key="home-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Widgets section */}
            <div className="ios-widget-stack mt-12 mb-6">
              <div className="grid grid-cols-4 gap-3 p-4">
                {widgets.map(widget => (
                  <IOSWidget 
                    key={widget.id}
                    title={widget.title}
                    size={widget.size as 'small' | 'medium' | 'large'}
                  >
                    {widget.content}
                  </IOSWidget>
                ))}
              </div>
            </div>
            
            {/* Page indicator */}
            <div className="ios-page-indicator">
              <div className="ios-page-dot active"></div>
              <div className="ios-page-dot"></div>
            </div>
            
            {/* App grid */}
            <IOSAppGrid onAppClick={handleAppClick} />
            
            {/* iOS-style dock at bottom */}
            <div className="ios-dock">
              <motion.div 
                className="ios-dock-app bg-green-500" 
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAppClick('Messages')}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
              </motion.div>
              <motion.div 
                className="ios-dock-app bg-blue-500" 
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAppClick('Cloud')}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Cloud className="h-6 w-6 text-white" />
                </div>
              </motion.div>
              <motion.div 
                className="ios-dock-app bg-purple-500" 
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAppClick('Workflows')}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Workflow className="h-6 w-6 text-white" />
                </div>
              </motion.div>
              <motion.div 
                className="ios-dock-app bg-gray-700" 
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAppClick('Settings')}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Settings className="h-6 w-6 text-white" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IOSHomeScreen;
