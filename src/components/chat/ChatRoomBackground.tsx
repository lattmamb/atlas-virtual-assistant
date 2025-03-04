
import React from "react";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/grid-pattern";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { products } from "@/components/ui/hero-parallax.demo";
import AmbientGlow from "@/components/effects/AmbientGlow";
import { ChatBackgroundEffect } from "@/components/effects/ChatBackgroundEffect";

interface ChatRoomBackgroundProps {
  showHeroParallax: boolean;
  isDarkMode: boolean;
  aiMode: 'atlas' | 'grok';
}

const ChatRoomBackground: React.FC<ChatRoomBackgroundProps> = ({
  showHeroParallax,
  isDarkMode,
  aiMode
}) => {
  return (
    <>
      {showHeroParallax && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <HeroParallax products={products} />
        </div>
      )}
      
      <div 
        className={cn(
          "fixed inset-0 z-0 transition-all duration-700",
          showHeroParallax ? "opacity-0" : "opacity-100"
        )}
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
        
        {/* Apply background effects based on AI mode */}
        <AmbientGlow aiMode={aiMode} />
        <ChatBackgroundEffect isDarkMode={isDarkMode} />
      </div>
    </>
  );
};

export default ChatRoomBackground;
