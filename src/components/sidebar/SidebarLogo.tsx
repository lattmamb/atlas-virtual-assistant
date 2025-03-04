
import React from 'react';
import { Sparkles, Cloud } from 'lucide-react';
import { motion } from 'framer-motion';
import { SidebarHeaderTitle } from '@/components/ui/sidebar';

const SidebarLogo: React.FC = () => {
  return (
    <SidebarHeaderTitle>
      <div className="relative">
        <motion.div 
          className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
          whileHover={{ 
            scale: 1.1,
            rotate: [0, 5, -5, 0],
            transition: { duration: 0.5 }
          }}
        >
          <Cloud className="h-3.5 w-3.5" />
          <motion.div
            className="absolute -right-1 -bottom-1 h-3 w-3 flex items-center justify-center rounded-full bg-amber-400"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <Sparkles className="h-2 w-2 text-white" />
          </motion.div>
        </motion.div>
      </div>
      <span className="text-lg font-medium">Atlas Assistant</span>
    </SidebarHeaderTitle>
  );
};

export default SidebarLogo;
