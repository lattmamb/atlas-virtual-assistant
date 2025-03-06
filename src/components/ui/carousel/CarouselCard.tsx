
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CarouselCardProps } from "./types";

const CarouselCard: React.FC<CarouselCardProps> = ({
  card,
  index,
  faceWidth,
  faceCount,
  radius,
  onClick,
  isDarkMode
}) => {
  return (
    <motion.div
      key={`key-${card.id}-${index}`}
      className="absolute flex h-full origin-center items-center justify-center p-2"
      style={{
        width: `${faceWidth}px`,
        transform: `rotateY(${
          index * (360 / faceCount)
        }deg) translateZ(${radius}px)`,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
      onClick={() => onClick(card, index)}
    >
      <motion.div
        className={cn(
          "w-full h-full rounded-2xl overflow-hidden flex flex-col items-center justify-center",
          "bg-gradient-to-br", card.color,
          "border", isDarkMode ? "border-white/10" : "border-black/10",
          "shadow-lg transform-gpu transition-transform",
          "hover:scale-105 hover:shadow-xl"
        )}
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(20px)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
        whileHover={{ 
          scale: 1.05, 
          rotateY: 5,
          z: 30,
          boxShadow: "0 15px 40px rgba(0,0,0,0.7)" 
        }}
        layoutId={`card-${card.id}`}
      >
        <span className="text-5xl mb-4 transform-gpu">{card.icon}</span>
        <h3 className="text-2xl font-bold text-white mb-2">{card.title}</h3>
        <p className="text-white/80 text-sm px-4 text-center">
          {card.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default CarouselCard;
