
import React, { memo } from "react";
import { motion, AnimationControls } from "framer-motion";
import CarouselCard from "./CarouselCard";
import { PageInfo } from "./types";

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
        <CarouselCard
          key={`carousel-card-${i}`}
          card={card}
          index={i}
          faceWidth={faceWidth}
          faceCount={faceCount}
          radius={radius}
          onClick={handleClick}
          isDarkMode={isDarkMode}
        />
      ))}
    </motion.div>
  );
});

PageCarouselContainer.displayName = "PageCarouselContainer";

export default PageCarouselContainer;
