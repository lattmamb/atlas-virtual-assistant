import React from 'react';
import { cn } from "@/lib/utils";

interface WidgetProps {
  children: React.ReactNode;
  className?: string;
}

const Widget: React.FC<WidgetProps> = ({ children, className }) => {
  return (
    <div 
      className={cn(
        "rounded-xl border border-[#2a2a2a] bg-[#1a1a1a]/60 backdrop-blur-xl shadow-md overflow-hidden relative",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Widget;
