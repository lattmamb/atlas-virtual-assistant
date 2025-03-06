
import React from "react";
import { motion } from "framer-motion";

interface FullscreenOverlayProps {
  activeImg: string | null;
  onClose: () => void;
}

const transitionOverlay = { 
  duration: 0.5, 
  ease: [0.32, 0.72, 0, 1] 
};

const FullscreenOverlay: React.FC<FullscreenOverlayProps> = ({ 
  activeImg, 
  onClose 
}) => {
  if (!activeImg) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      layoutId={`img-container-${activeImg}`}
      layout="position"
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50 m-5 md:m-36 lg:mx-[19rem] rounded-3xl"
      style={{ willChange: "opacity" }}
      transition={transitionOverlay}
    >
      <motion.img
        layoutId={`img-${activeImg}`}
        src={activeImg}
        className="max-w-full max-h-full rounded-lg shadow-lg"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{
          delay: 0.5,
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        style={{
          willChange: "transform",
        }}
      />
    </motion.div>
  );
};

export default FullscreenOverlay;
