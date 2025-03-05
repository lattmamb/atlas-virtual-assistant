
import React from "react";
import { cn } from "@/lib/utils";

interface LampEffectProps {
  children?: React.ReactNode;
  className?: string;
  subtle?: boolean;
}

export const LampEffect: React.FC<LampEffectProps> = ({ 
  children, 
  className
}) => {
  // Return children without effects
  return (
    <div className={cn("relative", className)}>
      {children}
    </div>
  );
};
