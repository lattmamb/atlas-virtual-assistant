
import React from 'react';
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";

interface BackgroundEffectsProps {
  isDarkMode: boolean;
}

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ isDarkMode }) => {
  return (
    <div className="fixed inset-0 z-0">
      <GridPattern 
        width={40} 
        height={40} 
        className={cn(
          "absolute inset-0 stroke-[0.5px] [mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
          isDarkMode 
            ? "fill-white/[0.01] stroke-white/[0.05]" 
            : "fill-black/[0.01] stroke-black/[0.05]"
        )}
        strokeDasharray="1 3"
      />
      {isDarkMode && (
        <>
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -z-10"></div>
          <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] -z-10"></div>
        </>
      )}
    </div>
  );
};

export default BackgroundEffects;
