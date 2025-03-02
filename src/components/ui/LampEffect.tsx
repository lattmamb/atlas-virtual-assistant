
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LampEffectProps {
  children?: React.ReactNode;
  className?: string;
  subtle?: boolean;
}

export const LampEffect: React.FC<LampEffectProps> = ({ 
  children, 
  className,
  subtle = false
}) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0 top-10 -z-10 transform-gpu overflow-hidden blur-3xl"
        aria-hidden="true"
        initial={{ opacity: 0.7 }}
        animate={{
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <div
          className={cn(
            "relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr",
            subtle 
              ? "from-blue-400/30 to-purple-400/30 opacity-30" 
              : "from-blue-500 to-purple-500 opacity-50"
          )}
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </motion.div>
      
      {children}
    </div>
  );
};
