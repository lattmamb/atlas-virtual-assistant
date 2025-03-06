
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface CarouselHeaderProps {
  isExpanded: boolean;
  onClick: () => void;
  activePage: {
    title: string;
    description: string;
    icon: string;
  };
}

const CarouselHeader = ({ isExpanded, onClick, activePage }: CarouselHeaderProps) => {
  return (
    <>
      {/* Header with drag indicator */}
      <div 
        className="py-2 px-4 flex justify-center cursor-grab active:cursor-grabbing"
        onClick={onClick}
      >
        <div className="w-12 h-1 rounded-full bg-gray-400/30" />
      </div>
      
      {/* Current page info */}
      <div className="px-6 py-2">
        <h2 className="text-lg font-medium">
          {activePage.icon} {activePage.title}
        </h2>
        {isExpanded && (
          <p className="text-sm opacity-70">
            {activePage.description}
          </p>
        )}
      </div>
      
      {/* Swipe up indicator */}
      {!isExpanded && (
        <motion.div 
          className="absolute top-1 left-0 right-0 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ 
            repeat: Infinity, 
            repeatType: "reverse", 
            duration: 1.5 
          }}
        >
          <ChevronUp className="h-4 w-4" />
        </motion.div>
      )}
    </>
  );
};

export default CarouselHeader;
