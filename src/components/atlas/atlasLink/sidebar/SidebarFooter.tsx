
import React from 'react';
import { Sparkles, Laptop, Monitor, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const SidebarFooter: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  const handleInfoClick = () => {
    toast.info("Atlas Intelligence", {
      description: "Enhancing human capability through AI",
      duration: 3000,
    });
  };
  
  return (
    <div className="p-4 border-t border-gray-800 space-y-3">
      {/* Status display */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse-subtle"></div>
          <span className="text-xs text-gray-500">All systems operational</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6 rounded-full hover:bg-gray-800"
          onClick={handleInfoClick}
        >
          <Info className="h-3 w-3 text-gray-500" />
        </Button>
      </div>
      
      {/* Preview widgets display */}
      <motion.div 
        className="rounded-lg bg-gray-900/50 border border-gray-800 p-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-gray-500">Active previews</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-800 text-gray-400">3</span>
        </div>
        
        <div className="flex justify-between items-center space-x-2">
          <motion.div 
            className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="h-3 w-3 text-white" />
          </motion.div>
          
          <motion.div 
            className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Laptop className="h-3 w-3 text-white" />
          </motion.div>
          
          <motion.div 
            className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Monitor className="h-3 w-3 text-white" />
          </motion.div>
        </div>
      </motion.div>
      
      <div className="text-center pt-1">
        <motion.p 
          className="text-[10px] text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          © 2025 Atlas Intelligence LLC
        </motion.p>
      </div>
    </div>
  );
};

export default SidebarFooter;
