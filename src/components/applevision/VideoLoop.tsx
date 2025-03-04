
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

interface VideoLoopProps {
  videoSrc?: string;
  posterSrc?: string;
}

const VideoLoop: React.FC<VideoLoopProps> = ({ 
  videoSrc = "/visionpro-demo.mp4", 
  posterSrc = "/lovable-uploads/c9ad08ff-68c3-4635-af88-f133d638efc9.png" 
}) => {
  const { isDarkMode } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.play().catch(error => {
        console.log("Auto-play was prevented:", error);
        // We'll implement a play button for this case
      });
    }
  }, []);
  
  return (
    <motion.div
      className={cn(
        "relative rounded-xl overflow-hidden",
        "border",
        isDarkMode ? "border-white/20" : "border-black/10",
        "shadow-2xl"
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.3 }}
    >
      {/* Ambient glow effect around the video */}
      <div 
        className={cn(
          "absolute -inset-1 blur-xl z-0 opacity-30",
          isDarkMode ? "bg-blue-500" : "bg-indigo-300"
        )} 
      />
      
      {/* The actual video element */}
      <div className="relative z-10">
        <video
          ref={videoRef}
          className="w-full h-full object-cover rounded-xl"
          poster={posterSrc}
          loop
          muted
          playsInline
        >
          {videoSrc && <source src={videoSrc} type="video/mp4" />}
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay with gradient */}
        <div 
          className={cn(
            "absolute inset-0 rounded-xl",
            "bg-gradient-to-b from-transparent via-transparent",
            isDarkMode 
              ? "to-black/70" 
              : "to-white/70"
          )} 
        />
      </div>
      
      {/* Play button (appears if autoplay fails) */}
      <button
        className={cn(
          "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
          "w-16 h-16 flex items-center justify-center",
          "rounded-full",
          isDarkMode ? "bg-white/20" : "bg-black/20",
          "backdrop-blur-sm",
          "hover:scale-110 transition-transform",
          "focus:outline-none"
        )}
        onClick={() => videoRef.current?.play()}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className="w-6 h-6"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
    </motion.div>
  );
};

export default VideoLoop;
