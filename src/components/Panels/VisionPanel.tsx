
import React from 'react';
import { motion } from 'framer-motion';
import AppleVisionPro from '@/pages/AppleVisionPro';

const VisionPanel: React.FC = () => {
  return (
    <motion.div
      className="vision-panel w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AppleVisionPro />
    </motion.div>
  );
};

export default VisionPanel;
