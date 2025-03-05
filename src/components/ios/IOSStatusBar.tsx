
import React, { useState, useEffect } from 'react';
import { Battery, Signal, Wifi } from 'lucide-react';

const IOSStatusBar: React.FC = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  
  return (
    <div className="ios-status-bar">
      <div className="flex items-center space-x-1">
        <div className="text-xs font-medium">{formattedTime}</div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Signal className="h-3 w-3" />
        <Wifi className="h-3 w-3" />
        <Battery className="h-4 w-4" />
      </div>
    </div>
  );
};

export default IOSStatusBar;
