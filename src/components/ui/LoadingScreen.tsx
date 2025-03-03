
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LampEffect } from "./LampEffect";

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
          <LampEffect color="blue" size="lg" intensity="high" />
          
          <motion.h1 
            className="md:text-7xl text-5xl lg:text-9xl font-bold text-center text-white relative z-20"
            initial={{ opacity: 0.5, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            ATLAS
          </motion.h1>
          
          <motion.p 
            className="text-white/70 mt-4 text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.2,
            }}
          >
            {getSubtitleText()}
          </motion.p>
          
          <motion.div
            className="mt-8 flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.4,
            }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-white rounded-full"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
