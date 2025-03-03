
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

interface LampEffectProps {
  className?: string;
  subtle?: boolean;
  animate?: boolean;
  color?: "blue" | "purple" | "cyan" | "pink";
  size?: "sm" | "md" | "lg";
  intensity?: "low" | "medium" | "high";
  children?: React.ReactNode;
}

export const LampEffect: React.FC<LampEffectProps> = ({
  className,
  subtle = false,
  animate = true,
  color = "blue",
  size = "md",
  intensity = "medium",
  children,
}) => {
  const controls = useAnimation();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    if (animate) {
      controls.start({
        opacity: [0.6, 0.8, 0.6],
        scale: [1, 1.05, 1],
        transition: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      });
    }
  }, [animate, controls]);
  
  if (!mounted) return null;
  
  // Color mappings
  const colorMap = {
    blue: "from-blue-400",
    purple: "from-purple-400",
    cyan: "from-cyan-400",
    pink: "from-pink-400"
  };
  
  // Size mappings
  const sizeMap = {
    sm: {
      width: "15rem",
      height: "10rem",
    },
    md: {
      width: "25rem",
      height: "15rem",
    },
    lg: {
      width: "40rem",
      height: "20rem",
    }
  };
  
  // Intensity mappings
  const intensityMap = {
    low: "opacity-20 blur-xl",
    medium: "opacity-30 blur-2xl",
    high: "opacity-40 blur-3xl"
  };
  
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={controls}
          className={cn(
            "absolute w-full h-full pointer-events-none",
            subtle ? "opacity-10" : ""
          )}
        >
          <div 
            className={cn(
              "absolute",
              "rounded-full bg-gradient-radial",
              colorMap[color], 
              "to-transparent",
              intensityMap[intensity]
            )} 
            style={{
              width: sizeMap[size].width,
              height: sizeMap[size].height,
              top: "20%",
              left: "50%",
              transform: "translate(-50%, -20%)",
            }}
          />
          
          {animate && (
            <motion.div
              animate={{
                x: ["-5%", "5%", "-5%"],
                y: ["-2%", "5%", "-2%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={cn(
                "absolute rounded-full",
                "bg-gradient-radial", 
                colorMap[color === "blue" ? "purple" : "blue"],
                "to-transparent", 
                intensityMap[intensity]
              )}
              style={{
                width: sizeMap[size].width,
                height: sizeMap[size].height,
                bottom: "10%",
                right: "20%",
              }}
            />
          )}
        </motion.div>
      </div>
      {children}
    </div>
  );
};
