
import React, { useEffect, useState } from "react";
import { SparklesCore } from "./sparkles";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

type LoadingScreenProps = {
  duration?: number;
  subtitle?: string;
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  duration = 2000,
  subtitle
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  
  // Determine which page we're on for custom subtitle text
  const getSubtitleText = () => {
    if (subtitle) return subtitle;
    
    const path = location.pathname;
    switch (path) {
      case '/':
        return "Welcome Back";
      case '/chat':
        return "Starting Conversation";
      case '/settings':
        return "Loading Preferences";
      case '/workflows':
        return "Preparing Automations";
      case '/atlas-link':
        return "Connecting to Atlas";
      default:
        return "Loading...";
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="md:text-7xl text-5xl lg:text-9xl font-bold text-center text-white relative z-20">
            ATLAS
          </h1>
          <p className="text-white/70 mt-4 text-xl">{getSubtitleText()}</p>
          <div className="w-full h-40 relative">
            {/* Gradients */}
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

            {/* Core sparkles component */}
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />

            {/* Radial Gradient to prevent sharp edges */}
            <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
