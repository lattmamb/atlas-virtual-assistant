
import React from 'react';
import { motion } from 'framer-motion';
import { usePanel } from '@/contexts/PanelContext';

interface PanelIndicatorProps {
  panels: string[];
  className?: string;
}

const PanelIndicator: React.FC<PanelIndicatorProps> = ({ 
  panels,
  className = ''
}) => {
  const { activePanel, navigateToPanel } = usePanel();

  return (
    <div className={`panel-indicator flex items-center justify-center space-x-2 ${className}`}>
      {panels.map((panel) => (
        <motion.div
          key={panel}
          className={`panel-dot w-2.5 h-2.5 rounded-full cursor-pointer 
            ${activePanel === panel 
              ? 'bg-primary shadow-glow' 
              : 'bg-white/20'
            }`}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            scale: activePanel === panel ? 1.2 : 1,
            opacity: activePanel === panel ? 1 : 0.6,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20
          }}
          onClick={() => navigateToPanel(panel)}
        />
      ))}
    </div>
  );
};

export default PanelIndicator;
