
import React, { memo } from "react";
import { motion, useMotionValue, useTransform, AnimationControls } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import CarouselCard from "./CarouselCard";

interface CarouselContainerProps {
  handleClick: (imgUrl: string, index: number) => void;
  controls: AnimationControls;
  cards: string[];
  isCarouselActive: boolean;
}

const CarouselContainer = memo(({
  handleClick,
  controls,
  cards,
  isCarouselActive,
}: CarouselContainerProps) => {
  const isScreenSizeSm = useMediaQuery("(max-width: 640px)");
  const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
  const faceCount = cards.length;
  const faceWidth = cylinderWidth / faceCount;
  const radius = cylinderWidth / (2 * Math.PI);
  const rotation = useMotionValue(0);
  const transform = useTransform(
    rotation,
    (value) => `rotate3d(0, 1, 0, ${value}deg)`
  );

  return (
    <div
      className="flex h-full items-center justify-center"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      <motion.div
        drag={isCarouselActive ? "x" : false}
        className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
        style={{
          transform,
          rotateY: rotation,
          width: cylinderWidth,
          transformStyle: "preserve-3d",
        }}
        onDrag={(_, info) =>
          isCarouselActive &&
          rotation.set(rotation.get() + info.offset.x * 0.05)
        }
        onDragEnd={(_, info) =>
          isCarouselActive &&
          controls.start({
            rotateY: rotation.get() + info.velocity.x * 0.05,
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
        {cards.map((imgUrl, i) => (
          <CarouselCard
            key={`carousel-card-${i}`}
            imgUrl={imgUrl}
            index={i}
            faceWidth={faceWidth}
            faceCount={faceCount}
            radius={radius}
            onClick={handleClick}
          />
        ))}
      </motion.div>
    </div>
  );
});

CarouselContainer.displayName = "CarouselContainer";

export default CarouselContainer;
