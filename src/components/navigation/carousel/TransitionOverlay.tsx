
import React from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface TransitionOverlayProps {
  activeImg: string | null;
  activePageIndex: number;
  pages: Array<{
    title: string;
    description: string;
    icon: string;
    color: string;
  }>;
  onClose: () => void;
}

const TransitionOverlay = ({ 
  activeImg, 
  activePageIndex, 
  pages, 
  onClose 
}: TransitionOverlayProps) => {
  if (!activeImg) return null;
  
  return (
    <AnimatePresence>
      {activeImg && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            layoutId={`page-transition-${activePageIndex}`}
            className="w-64 h-64 md:w-96 md:h-96 rounded-2xl overflow-hidden"
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className={cn(
              "w-full h-full flex flex-col items-center justify-center bg-gradient-to-br rounded-xl",
              pages[activePageIndex].color
            )}>
              <span className="text-6xl mb-6">{pages[activePageIndex].icon}</span>
              <h2 className="text-2xl text-white font-bold mb-2">{pages[activePageIndex].title}</h2>
              <p className="text-white/80 text-sm text-center max-w-[80%]">
                {pages[activePageIndex].description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TransitionOverlay;
