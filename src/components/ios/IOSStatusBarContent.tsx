
import React, { useState, useEffect } from 'react';
import { Battery, Signal, Wifi } from 'lucide-react';
import { motion } from 'framer-motion';

interface IOSStatusBarContentProps {
  isDarkMode?: boolean;
}

const IOSStatusBarContent: React.FC<IOSStatusBarContentProps> = ({ 
  isDarkMode = true 
}) => {
  const [time, setTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(100);
  
  useEffect(() => {
    // Update time every minute
    const interval = setInterval(() => {
      setTime(new Date());
    }, 60000);
    
    // Simulate random battery level
    setBatteryLevel(Math.floor(Math.random() * 30) + 70);
    
    return () => clearInterval(interval);
  }, []);
  
  const formattedTime = time.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true
  });
  
  return (
    <div className={`ios-status-bar ${isDarkMode ? 'text-white' : 'text-black'}`}>
      <div className="ios-status-bar-content">
        <span className="font-medium">{formattedTime}</span>
      </div>
      
      <div className="ios-status-bar-content">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-1"
        >
          <Signal className="w-3.5 h-3.5" />
          <Wifi className="w-3.5 h-3.5" />
          <div className="relative w-5 h-3">
            <div className="absolute inset-0 border rounded-sm border-current w-full h-full" />
            <div 
              className={`absolute left-0.5 top-0.5 bottom-0.5 rounded-sm ${isDarkMode ? 'bg-white' : 'bg-black'}`} 
              style={{ width: `${(batteryLevel / 100) * 80}%` }}
            />
          </div>
          <span className="text-[10px] ml-[-1px]">{batteryLevel}%</span>
        </motion.div>
      </div>
    </div>
  );
};

export default IOSStatusBarContent;
