
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ChatButtonProps {
  onClick: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 15,
        duration: 0.5
      }}
    >
      <Button 
        className={cn(
          "rounded-full flex items-center justify-center p-0 shadow-lg transition-all",
          "bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-600 text-white",
          "hover:shadow-xl hover:shadow-blue-500/30",
          "border border-blue-400/30 h-14 w-14 group"
        )}
        onClick={onClick}
      >
        <div className="relative">
          <MessageSquare className="text-white h-6 w-6 group-hover:scale-90 transition-transform duration-300" />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: 0.2,
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            className="absolute -top-1 -right-1"
          >
            <Sparkles className="h-3 w-3 text-amber-300" />
          </motion.div>
        </div>
      </Button>
    </motion.div>
  );
};

export default ChatButton;
