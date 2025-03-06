
import React from 'react';
import { cn } from "@/lib/utils";

interface AmbientEffectProps {
  celestialMode: boolean;
}

const AmbientEffect: React.FC<AmbientEffectProps> = ({ celestialMode }) => {
  if (celestialMode) return null;
  
  return (
    <>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-transparent to-blue-500/10 rounded-full filter blur-[120px] pointer-events-none opacity-30" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-transparent to-purple-500/10 rounded-full filter blur-[100px] pointer-events-none opacity-30" />
    </>
  );
};

export default AmbientEffect;
