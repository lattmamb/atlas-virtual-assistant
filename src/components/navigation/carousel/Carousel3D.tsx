
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@/components/ui/3d-carousel';

interface PageInfo {
  path: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  imageUrl?: string;
}

interface Carousel3DProps {
  pages: PageInfo[];
  activePageIndex: number;
  rotation: any;
  controls: any;
  isCarouselActive: boolean;
  handleCardClick: (path: string, index: number) => void;
}

const Carousel3D = ({ 
  pages, 
  activePageIndex, 
  rotation, 
  controls, 
  isCarouselActive,
  handleCardClick 
}: Carousel3DProps) => {
  const isScreenSizeSm = useMediaQuery("(max-width: 640px)");
  const cylinderWidth = isScreenSizeSm ? 600 : 1200;
  const faceCount = pages.length;
  const faceWidth = cylinderWidth / faceCount;
  const radius = cylinderWidth / (2 * Math.PI);
  
  return (
    <div 
      className="flex h-full items-center justify-center"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="relative flex h-full origin-center justify-center"
        style={{
          transform: rotation,
          rotateY: rotation,
          width: cylinderWidth,
          transformStyle: "preserve-3d",
        }}
        animate={controls}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDrag={(_, info) => {
          rotation.set(rotation.get() + info.offset.x * 0.05);
        }}
        onDragEnd={(_, info) => {
          const newIndex = Math.round(rotation.get() / (360 / faceCount)) % faceCount;
          const normalizedIndex = newIndex < 0 ? faceCount + newIndex : newIndex;
          // Calculate distance to closest card
          const closestIndex = Math.round(rotation.get() / (360 / faceCount));
          const normalizedClosestIndex = closestIndex < 0 
            ? faceCount + (closestIndex % faceCount) 
            : closestIndex % faceCount;
          
          // Set active page index through outside handler
          handleCardClick(pages[normalizedClosestIndex].path, normalizedClosestIndex);
        }}
      >
        {pages.map((page, i) => (
          <motion.div
            key={`page-${page.path}`}
            className={cn(
              "absolute flex h-full origin-center items-center justify-center rounded-xl",
              "backdrop-blur-md border border-white/10"
            )}
            style={{
              width: `${faceWidth}px`,
              transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
            }}
            onClick={() => handleCardClick(page.path, i)}
          >
            <motion.div
              className={cn(
                "w-full h-full rounded-lg flex flex-col items-center justify-center text-white",
                "bg-gradient-to-br", page.color
              )}
              layoutId={`page-card-${page.path}`}
            >
              <span className="text-4xl mb-4">{page.icon}</span>
              <h3 className="text-xl font-bold mb-2">{page.title}</h3>
              <p className="text-sm text-center max-w-xs px-4">
                {page.description}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Carousel3D;
