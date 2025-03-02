
import React from 'react';
import { cn } from "@/lib/utils";

interface WidgetProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: React.ReactNode;
  minWidth?: string;
  minHeight?: string;
  isDarkMode?: boolean;
}

const Widget: React.FC<WidgetProps> = ({ 
  children, 
  className,
  title,
  icon,
  minWidth,
  minHeight, 
  isDarkMode = true 
}) => {
  const style: React.CSSProperties = {
    minWidth: minWidth,
    minHeight: minHeight,
  };

  return (
    <div 
      className={cn(
        "rounded-xl border border-[#2a2a2a] bg-[#1a1a1a]/60 backdrop-blur-xl shadow-md overflow-hidden relative",
        isDarkMode ? "text-white" : "text-gray-800 border-gray-200 bg-white/60",
        className
      )}
      style={style}
    >
      {icon && (
        <div className="flex items-center justify-between p-2 border-b border-[#333333]">
          {icon}
          {title && <span className="text-sm font-medium">{title}</span>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Widget;
