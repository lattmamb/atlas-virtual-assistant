
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  title?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
}) => {
  const [isPinned, setIsPinned] = useState(false);

  return (
    <div
      className={cn(
        "relative group/pin z-10 w-fit h-fit",
        containerClassName
      )}
      onMouseEnter={() => setIsPinned(true)}
      onMouseLeave={() => setIsPinned(false)}
    >
      <div className="absolute pointer-events-none -inset-x-2 -inset-y-2 z-0 opacity-0 group-hover/pin:opacity-100 transition duration-300 bg-gradient-to-br from-blue-500/20 via-violet-400/20 to-purple-500/20 shadow-lg shadow-indigo-500/20 border border-indigo-500/40 blur" />
      
      <motion.div
        className={cn(
          "flex flex-col overflow-hidden relative z-10 p-4 rounded-2xl border border-slate-800 bg-black shadow-xl shadow-indigo-500/10",
          className
        )}
        initial={{ scale: 1, y: 0, x: 0 }}
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ 
          duration: 0.2,
          ease: "easeInOut"
        }}
      >
        {isPinned && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: "easeIn" }}
            className="absolute top-2 right-2 z-50"
          >
            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
          </motion.div>
        )}
        
        {title && (
          <div className="absolute top-2 left-2 z-30">
            <span className="text-[9px] uppercase tracking-wider text-slate-500 px-2 opacity-70">
              {title}
            </span>
          </div>
        )}
        
        {href && (
          <a href={href} className="absolute inset-0 z-20" target="_blank" rel="noopener noreferrer">
            <span className="sr-only">View</span>
          </a>
        )}
        
        <div className="flex flex-1 flex-col gap-3">{children}</div>
      </motion.div>
    </div>
  );
};
