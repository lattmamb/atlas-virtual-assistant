
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PageInfo } from "./types";

interface ActiveCardOverlayProps {
  activeCard: PageInfo | null;
  setActiveCard: (card: PageInfo | null) => void;
  setIsCarouselActive: (active: boolean) => void;
}

const ActiveCardOverlay: React.FC<ActiveCardOverlayProps> = ({
  activeCard,
  setActiveCard,
  setIsCarouselActive
}) => {
  if (!activeCard) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
      style={{ willChange: "opacity" }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      onClick={() => {
        setActiveCard(null);
        setIsCarouselActive(true);
      }}
    >
      <motion.div
        layoutId={`card-${activeCard.id}`}
        className={cn(
          "w-64 h-64 md:w-96 md:h-96 rounded-2xl overflow-hidden",
          "bg-gradient-to-br", activeCard.color,
          "shadow-[0_0_60px_rgba(255,255,255,0.15)]"
        )}
        initial={{ scale: 0.8, opacity: 0.5, rotateY: 5 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.8, opacity: 0, rotateY: 5 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center p-6">
          <span className="text-6xl mb-6">{activeCard.icon}</span>
          <h2 className="text-2xl text-white font-bold mb-2">{activeCard.title}</h2>
          <p className="text-white/80 text-center">
            {activeCard.description}
          </p>
          <p className="text-white/60 text-sm mt-6">
            Loading page...
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ActiveCardOverlay;
