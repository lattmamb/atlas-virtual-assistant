
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { usePanel } from '@/contexts/PanelContext';

interface PanelHeaderProps {
  title: string;
  showBackButton?: boolean;
  className?: string;
  onSettingsClick?: () => void;
  rightContent?: React.ReactNode;
}

const PanelHeader: React.FC<PanelHeaderProps> = ({
  title,
  showBackButton = true,
  className = '',
  onSettingsClick,
  rightContent
}) => {
  const { goBack, previousPanel } = usePanel();

  return (
    <motion.div
      className={`panel-header flex items-center justify-between px-4 py-3 backdrop-blur-lg bg-black/20 ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center">
        {showBackButton && previousPanel && (
          <motion.button
            className="mr-2 p-1 rounded-full"
            whileTap={{ scale: 0.9 }}
            onClick={goBack}
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </motion.button>
        )}
        <h1 className="text-lg font-semibold text-white">{title}</h1>
      </div>
      
      <div className="flex items-center">
        {rightContent}
      </div>
    </motion.div>
  );
};

export default PanelHeader;
