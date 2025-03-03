
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minimize2, Maximize2, X, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export type PipWidgetProps = {
  title: string;
  pageUrl: string;
  initialSize?: "small" | "medium" | "large";
  className?: string;
  onClose?: () => void;
};

export function PipWidget({
  title,
  pageUrl,
  initialSize = "small",
  className,
  onClose
}: PipWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [size, setSize] = useState(initialSize);
  const widgetRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Size presets
  const sizeClasses = {
    small: "w-72 h-64",
    medium: "w-96 h-96",
    large: "w-[32rem] h-[28rem]",
    expanded: "fixed inset-4 z-50"
  };
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const nextSize = () => {
    const sizes = ["small", "medium", "large"] as const;
    const currentIndex = sizes.indexOf(size as any);
    const nextIndex = (currentIndex + 1) % sizes.length;
    setSize(sizes[nextIndex]);
  };
  
  const navigateToPage = () => {
    navigate(pageUrl);
  };
  
  // Handle closing
  const handleClose = () => {
    if (onClose) onClose();
  };
  
  return (
    <AnimatePresence>
      <motion.div
        ref={widgetRef}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: 0,
          width: isExpanded ? "auto" : undefined,
          height: isExpanded ? "auto" : undefined,
        }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={cn(
          "bg-black/75 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden shadow-xl",
          isExpanded ? sizeClasses.expanded : sizeClasses[size],
          "flex flex-col",
          "animate-fade-in duration-300 ease-out",
          "resize-drag",
          className
        )}
        style={{ 
          position: isExpanded ? "fixed" : "relative", 
          zIndex: isExpanded ? 50 : 10 
        }}
      >
        {/* Header */}
        <div className="p-2 bg-black/50 flex items-center justify-between border-b border-white/10">
          <div className="text-sm font-medium text-white truncate px-2">{title}</div>
          <div className="flex items-center space-x-1">
            <button 
              onClick={nextSize} 
              className="p-1 text-white/70 hover:text-white hover:bg-white/10 rounded-md"
              aria-label="Change size"
            >
              {!isExpanded && <Maximize2 className="h-3.5 w-3.5" />}
            </button>
            <button 
              onClick={toggleExpand} 
              className="p-1 text-white/70 hover:text-white hover:bg-white/10 rounded-md"
              aria-label={isExpanded ? "Minimize" : "Expand"}
            >
              {isExpanded ? 
                <Minimize2 className="h-3.5 w-3.5" /> : 
                <ExternalLink className="h-3.5 w-3.5" />
              }
            </button>
            <button 
              onClick={handleClose} 
              className="p-1 text-white/70 hover:text-white hover:bg-white/10 rounded-md"
              aria-label="Close"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-auto">
          <iframe 
            src={pageUrl} 
            className="w-full h-full border-none" 
            title={title}
            onClick={navigateToPage}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
