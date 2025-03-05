
import React, { useState, useEffect } from 'react';
import { Battery, Signal, Wifi } from 'lucide-react';

const IOSStatusBar: React.FC = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };
  
  return (
    <div className="ios-status-bar fixed top-0 left-0 right-0 flex items-center justify-between px-5 py-2 bg-black/30 backdrop-blur-md z-50 text-white">
      <div className="text-xs font-medium">{formatTime(time)}</div>
      <div className="flex items-center gap-1">
        <Signal className="h-3 w-3" />
        <Wifi className="h-3 w-3" />
        <Battery className="h-4 w-4" />
      </div>
    </div>
  );
};

export default IOSStatusBar;
