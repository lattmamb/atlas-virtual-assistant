
import React from 'react';
import { GridPattern } from '@/components/ui/grid-pattern';
import { cn } from '@/lib/utils';

interface BackgroundEffectsProps {
  currentTheme: string;
}

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ currentTheme }) => {
  return (
    <div 
      className="fixed inset-0 z-0 transition-all duration-700"
      style={{ background: `var(--background-gradient)` }}
    >
      <GridPattern 
        width={40} 
        height={40} 
        className={cn(
          "absolute inset-0 fill-white/[0.01] stroke-white/[0.05]",
          "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]"
        )}
        strokeDasharray="1 3"
      />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] -z-10 transition-all duration-700" 
        style={{ backgroundColor: `var(--accent-color)`, opacity: 0.1 }}></div>
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full blur-[100px] -z-10 transition-all duration-700"
        style={{ backgroundColor: `var(--accent-color)`, opacity: 0.05 }}></div>
    </div>
  );
};

export default BackgroundEffects;
