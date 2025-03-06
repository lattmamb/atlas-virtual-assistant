
import React, { memo } from "react";
import { motion, AnimationControls } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageInfo {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  color: string;
  imageUrl?: string;
}

interface PageCarouselContainerProps {
  handleClick: (card: PageInfo, index: number) => void;
  controls: AnimationControls;
  cards: PageInfo[];
  isCarouselActive: boolean;
  isDarkMode: boolean;
  cylinderWidth: number;
}

const PageCarouselContainer = memo(({
  handleClick,
  controls,
  cards,
  isCarouselActive,
  isDarkMode,
  cylinderWidth,
}: PageCarouselContainerProps) => {
  const faceCount = cards.length;
  const faceWidth = cylinderWidth / faceCount;
  const radius = cylinderWidth / (2 * Math.PI);
  
  return (
    <motion.div
      drag={isCarouselActive ? "x" : false}
      className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
      style={{
        width: cylinderWidth,
        transformStyle: "preserve-3d",
      }}
      onDrag={(_, info) =>
        isCarouselActive && controls.set({ rotateY: info.offset.x * 0.05 })
      }
      onDragEnd={(_, info) =>
        isCarouselActive &&
        controls.start({
          rotateY: info.velocity.x * 0.5,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 30,
            mass: 0.1,
          },
        })
      }
      animate={controls}
    >
      {cards.map((card, i) => (
        <motion.div
          key={`key-${card.id}-${i}`}
          className="absolute flex h-full origin-center items-center justify-center p-2"
          style={{
            width: `${faceWidth}px`,
            transform: `rotateY(${
              i * (360 / faceCount)
            }deg) translateZ(${radius}px)`,
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
          onClick={() => handleClick(card, i)}
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
      ))}
    </motion.div>
  );
});

PageCarouselContainer.displayName = "PageCarouselContainer";

export default PageCarouselContainer;
