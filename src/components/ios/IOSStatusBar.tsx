
import React, { useState, useEffect } from 'react';
import { Battery, Signal, Wifi } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    <div className={cn(
      "ios-status-bar fixed top-0 left-0 right-0 z-50",
      "backdrop-blur-xl bg-black/30 border-b border-white/5"
    )}>
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
