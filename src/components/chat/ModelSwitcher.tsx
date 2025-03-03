
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { Sparkles, Zap } from 'lucide-react';

interface ModelSwitcherProps {
  currentModel: 'atlas' | 'grok';
  onModelChange: (model: 'atlas' | 'grok') => void;
  className?: string;
}

const ModelSwitcher: React.FC<ModelSwitcherProps> = ({
  currentModel,
  onModelChange,
  className
}) => {
  const { isDarkMode } = useTheme();

  return (
    <div 
      className={cn(
        "flex items-center justify-center p-2 rounded-full",
        isDarkMode ? "bg-gray-800/50" : "bg-gray-200/50",
        "backdrop-blur-md border",
        isDarkMode ? "border-gray-700" : "border-gray-300",
        className
      )}
    >
      <button
        onClick={() => onModelChange('atlas')}
        className={cn(
          "relative flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-300",
          currentModel === 'atlas' ? (
            isDarkMode ? "bg-blue-600 text-white" : "bg-blue-500 text-white"
          ) : (
            "text-gray-500 hover:bg-gray-700/20"
          )
        )}
      >
        <Sparkles className="h-4 w-4" />
        <span className="text-xs font-medium">Atlas AI</span>
        {currentModel === 'atlas' && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute inset-0 rounded-full bg-current opacity-20 z-[-1]"
            transition={{ type: "spring", duration: 0.5 }}
          />
        )}
      </button>
      
      <button
        onClick={() => onModelChange('grok')}
        className={cn(
          "relative flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-300",
          currentModel === 'grok' ? (
            isDarkMode ? "bg-purple-600 text-white" : "bg-purple-500 text-white"
          ) : (
            "text-gray-500 hover:bg-gray-700/20"
          )
        )}
      >
        <Zap className="h-4 w-4" />
        <span className="text-xs font-medium">Grok AI</span>
        {currentModel === 'grok' && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute inset-0 rounded-full bg-current opacity-20 z-[-1]"
            transition={{ type: "spring", duration: 0.5 }}
          />
        )}
      </button>
    </div>
  );
};

export default ModelSwitcher;
