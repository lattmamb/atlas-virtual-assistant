
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface IOSWidgetProps {
  children: React.ReactNode;
  title?: string;
  icon?: LucideIcon;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  onClick?: () => void;
}

const IOSWidget: React.FC<IOSWidgetProps> = ({
  children,
  title,
  icon: Icon,
  size = 'medium',
  className,
  onClick
}) => {
  // Define grid span based on size
  const sizeClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-2 row-span-1',
    large: 'col-span-2 row-span-2'
  };
  
  return (
    <motion.div
      className={cn(
        "ios-widget rounded-3xl overflow-hidden shadow-lg backdrop-blur-xl",
        "bg-white/15 dark:bg-black/20 border border-white/10 dark:border-white/5",
        sizeClasses[size],
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      {title && (
        <div className="ios-widget-header px-3 py-2 border-b border-white/5 flex items-center">
          {Icon && <Icon className="mr-2 h-4 w-4 opacity-70" />}
          <h3 className="text-xs font-medium">{title}</h3>
        </div>
      )}
      <div className="ios-widget-content">
        {children}
      </div>
    </motion.div>
  );
};

export default IOSWidget;
