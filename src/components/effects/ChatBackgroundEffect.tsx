
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
      {/* Space-themed background effect */}
      <div className="absolute inset-0 z-[-1] bg-[#0D0015]">
        {/* Stars */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[2px] h-[2px] rounded-full bg-white"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.8 + 0.2,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
        
        {/* Nebula effects */}
        <motion.div 
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(123, 97, 255, 0.3) 0%, rgba(123, 97, 255, 0) 70%)",
          }}
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
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(90, 60, 190, 0.2) 0%, rgba(90, 60, 190, 0) 70%)",
          }}
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
        
        {/* Dark overlay with subtle noise texture */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
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
