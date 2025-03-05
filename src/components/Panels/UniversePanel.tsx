
import React from 'react';
import { motion } from 'framer-motion';
import UniverseHome from '@/pages/UniverseHome';

const UniversePanel: React.FC = () => {
  return (
    <motion.div
      className="universe-panel w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <UniverseHome />
    </motion.div>
  );
};

export default UniversePanel;
