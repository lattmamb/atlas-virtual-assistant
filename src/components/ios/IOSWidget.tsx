
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type IOSWidgetSize = 'small' | 'medium' | 'large';

interface IOSWidgetProps {
  title?: string;
  icon?: React.ReactNode;
  size?: IOSWidgetSize;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const IOSWidget: React.FC<IOSWidgetProps> = ({ 
  title, 
  icon, 
  size = 'medium', 
  children, 
  className,
  onClick
}) => {
  const sizeClasses = {
    small: 'ios-widget-small',
    medium: 'ios-widget-medium',
    large: 'ios-widget-large'
  };
  
  return (
    <motion.div
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={cn(
        "ios-widget-container",
        sizeClasses[size],
        onClick && "cursor-pointer",
        className
      )}
    >
      {title && (
        <div className="p-3 flex items-center justify-between">
          {icon && <div className="mr-2">{icon}</div>}
          <h3 className="text-sm font-medium text-white">{title}</h3>
        </div>
      )}
      <div className="p-3">
        {children}
      </div>
    </motion.div>
  );
};

export default IOSWidget;
