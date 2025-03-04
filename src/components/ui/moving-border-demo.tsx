
"use client";
import React from "react";
import { Button, MovingBorder } from "./moving-border";
import { StarBorder } from "./starBorder";

export function MovingBorderDemo() {
  return (
    <div className="flex flex-col items-center justify-center space-y-10 py-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Moving Borders</h2>
      
      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          borderRadius="1.75rem"
          className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
        >
          Borders are cool
        </Button>
        
        <Button
          borderRadius="0.5rem"
          className="bg-black dark:bg-slate-800 text-white dark:text-white border-neutral-200 dark:border-slate-800"
        >
          Trinity Dodge
        </Button>
        
        <MovingBorder className="px-4 py-2 text-sm font-medium">
          <span>Atlas Link</span>
        </MovingBorder>
      </div>
      
      <StarBorder highlighted>
        <div className="p-8 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10">
          <MovingBorder className="p-4 text-center">
            <h3 className="text-xl font-bold mb-2">Featured Vehicle</h3>
            <p className="text-sm">
              Dodge Ram 1500 - Starting at $38,000, perfect for Taylorville farmers.
            </p>
          </MovingBorder>
        </div>
      </StarBorder>
    </div>
  );
}
