
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroParallaxToggleProps {
  aiMode: 'atlas' | 'grok';
  setAIMode: (mode: 'atlas' | 'grok') => void;
}

const HeroParallaxToggle: React.FC<HeroParallaxToggleProps> = ({ 
  aiMode, 
  setAIMode 
}) => {
  return (
    <motion.button
      className={cn(
        "absolute bottom-6 right-6 z-50 px-4 py-2 text-white rounded-md shadow-lg",
        aiMode === 'atlas' ? "bg-blue-600 hover:bg-blue-700" : "bg-purple-600 hover:bg-purple-700"
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setAIMode(aiMode === 'atlas' ? 'grok' : 'atlas')}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {aiMode === 'atlas' ? "Switch to Grok" : "Switch to Atlas"}
    </motion.button>
  );
};

export default HeroParallaxToggle;
