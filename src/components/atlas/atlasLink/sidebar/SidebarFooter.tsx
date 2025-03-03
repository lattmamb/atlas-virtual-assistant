
import React from 'react';
import { Sparkles, Laptop, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const SidebarFooter: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="p-4 text-center text-xs border-t border-gray-800">
      <div className="mb-3 text-gray-500">
        <p>© 2025 Atlas Intelligence LLC</p>
      </div>
      
      {/* Preview widgets mini display */}
      <motion.div 
        className="flex justify-center items-center space-x-1 mt-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-[10px] text-gray-500 mr-1">Active previews:</div>
        <motion.div 
          className="h-4 w-4 rounded-sm bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center"
          whileHover={{ scale: 1.2 }}
        >
          <Sparkles className="h-2 w-2 text-white" />
        </motion.div>
        
        <motion.div 
          className="h-4 w-4 rounded-sm bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center"
          whileHover={{ scale: 1.2 }}
        >
          <Laptop className="h-2 w-2 text-white" />
        </motion.div>
        
        <motion.div 
          className="h-4 w-4 rounded-sm bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center"
          whileHover={{ scale: 1.2 }}
        >
          <Monitor className="h-2 w-2 text-white" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SidebarFooter;
