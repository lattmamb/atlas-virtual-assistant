
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "@/components/ui/glowing-effect";

interface ChatBackgroundEffectProps {
  isDarkMode: boolean;
}

export const ChatBackgroundEffect: React.FC<ChatBackgroundEffectProps> = ({ 
  isDarkMode 
}) => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Apple-inspired background effect */}
      <div className="absolute inset-0 z-[-1]">
        <motion.div 
          className={cn(
            "absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20",
            isDarkMode ? "bg-blue-500" : "bg-blue-400"
          )}
          animate={{
            x: [50, 0, 30, 0, 50],
            y: [0, 30, 50, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div 
          className={cn(
            "absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10",
            isDarkMode ? "bg-purple-500" : "bg-purple-400"
          )}
          animate={{
            x: [0, 50, 30, 50, 0],
            y: [50, 30, 0, 30, 50],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        {/* Add glowing effect container */}
        <div className="absolute inset-0 pointer-events-none">
          <GlowingEffect
            spread={60}
            glow={true}
            disabled={false}
            proximity={100}
            inactiveZone={0.01}
            borderWidth={2}
            className="opacity-20"
          />
        </div>
      </div>
    </div>
  );
};
