
import React from 'react';
import { motion } from 'framer-motion';
import AtlasLink from '@/pages/AtlasLink';

const LinkPanel: React.FC = () => {
  return (
    <motion.div
      className="link-panel w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AtlasLink />
    </motion.div>
  );
};

export default LinkPanel;
