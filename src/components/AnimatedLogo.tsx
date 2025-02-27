
import { useState, useEffect } from "react";

const AnimatedLogo = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Trigger animation every 5 seconds
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      // Reset animation state after animation completes
      setTimeout(() => {
        setIsAnimating(false);
      }, 1500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-12 w-12 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`absolute inset-0 ${isAnimating ? 'animate-ripple' : ''} 
                        rounded-full bg-primary/20`} />
      </div>
      
      <div className="relative h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-white font-semibold text-sm">AI</span>
        </div>
      </div>
      
      {/* Sound wave effect */}
      <div className={`absolute inset-0 flex items-center justify-center 
                      ${isAnimating ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
        <div className="flex gap-[2px] pt-[40px] items-end h-full justify-center w-full">
          <div className="w-[2px] h-3 bg-primary/60 rounded-full animate-wave1"></div>
          <div className="w-[2px] h-5 bg-primary/70 rounded-full animate-wave2"></div>
          <div className="w-[2px] h-7 bg-primary/80 rounded-full animate-wave3"></div>
          <div className="w-[2px] h-5 bg-primary/70 rounded-full animate-wave2"></div>
          <div className="w-[2px] h-3 bg-primary/60 rounded-full animate-wave1"></div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedLogo;
