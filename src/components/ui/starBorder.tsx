
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StarBorderProps {
  children: React.ReactNode;
  highlighted?: boolean;
  className?: string;
}

export const StarBorder: React.FC<StarBorderProps> = ({ 
  children, 
  highlighted = false,
  className 
}) => {
  return (
    <div className={cn("relative", className)}>
      {highlighted && (
        <motion.div 
          className="absolute inset-0 rounded-xl border-2 border-yellow-300 dark:border-yellow-400 -m-0.5 z-0 pointer-events-none overflow-hidden"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-200 dark:from-yellow-400 dark:via-yellow-500 dark:to-yellow-400 opacity-25" />
          <div className="absolute -inset-0.5 bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] animate-spin-slow opacity-70" />
        </motion.div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
