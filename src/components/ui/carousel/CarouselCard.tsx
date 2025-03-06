
import React from "react";
import { motion } from "framer-motion";

interface CarouselCardProps {
  imgUrl: string;
  index: number;
  faceWidth: number;
  faceCount: number;
  radius: number;
  onClick: (imgUrl: string, index: number) => void;
}

const transition = { 
  duration: 0.15, 
  ease: [0.32, 0.72, 0, 1], 
  filter: "blur(4px)" 
};

const CarouselCard: React.FC<CarouselCardProps> = ({
  imgUrl,
  index,
  faceWidth,
  faceCount,
  radius,
  onClick,
}) => {
  return (
    <motion.div
      key={`key-${imgUrl}-${index}`}
      className="absolute flex h-full origin-center items-center justify-center rounded-xl p-2"
      style={{
        width: `${faceWidth}px`,
        transform: `rotateY(${
          index * (360 / faceCount)
        }deg) translateZ(${radius}px)`,
      }}
      onClick={() => onClick(imgUrl, index)}
    >
      <motion.img
        src={imgUrl}
        alt={`keyword_${index} ${imgUrl}`}
        layoutId={`img-${imgUrl}`}
        className="pointer-events-none w-full rounded-xl object-cover aspect-square"
        initial={{ filter: "blur(4px)" }}
        layout="position"
        animate={{ filter: "blur(0px)" }}
        transition={transition}
      />
    </motion.div>
  );
};

export default CarouselCard;
