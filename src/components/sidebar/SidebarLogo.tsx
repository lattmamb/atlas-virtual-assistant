
import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { SidebarHeaderTitle } from '@/components/ui/sidebar';

const SidebarLogo: React.FC = () => {
  return (
    <SidebarHeaderTitle>
      <motion.div 
        className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white"
        whileHover={{ rotate: 180 }}
        transition={{ duration: 0.5 }}
      >
        <Sparkles className="h-3.5 w-3.5" />
      </motion.div>
      <span className="text-lg font-medium">Atlas Assistant</span>
    </SidebarHeaderTitle>
  );
};

export default SidebarLogo;
