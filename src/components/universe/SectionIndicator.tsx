
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionIndicatorProps {
  sections: Array<{ id: string; title: string }>;
  currentIndex: number;
  onSelectSection: (index: number) => void;
}

const SectionIndicator: React.FC<SectionIndicatorProps> = ({
  sections,
  currentIndex,
  onSelectSection
}) => {
  return (
    <div className="flex items-center gap-2">
      {sections.map((section, index) => (
        <motion.button
          key={section.id}
          className={cn(
            "w-2.5 h-2.5 rounded-full",
            "border border-white/30 backdrop-blur-sm",
            currentIndex === index 
              ? "bg-white" 
              : "bg-white/30 hover:bg-white/50"
          )}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onSelectSection(index)}
          title={section.title}
          aria-label={`Go to ${section.title} section`}
        />
      ))}
    </div>
  );
};

export default SectionIndicator;
