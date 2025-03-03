
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

interface DraggableWidgetProps {
  children: React.ReactNode;
  id: string;
  onReposition?: (id: string, x: number, y: number) => void;
  className?: string;
  initialPosition?: { x: number, y: number };
}

const DraggableWidget: React.FC<DraggableWidgetProps> = ({ 
  children, 
  id, 
  onReposition,
  className,
  initialPosition = { x: 0, y: 0 }
}) => {
  const { isDarkMode } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [jiggling, setJiggling] = useState(false);
  const longPressTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  const handleLongPress = () => {
    setJiggling(true);
    setIsEditing(true);
  };

  const handleMouseDown = () => {
    longPressTimeoutRef.current = setTimeout(handleLongPress, 500);
  };

  const handleMouseUp = () => {
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
      longPressTimeoutRef.current = null;
    }
  };

  const handleTouchStart = () => {
    longPressTimeoutRef.current = setTimeout(handleLongPress, 500);
  };

  const handleTouchEnd = () => {
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
      longPressTimeoutRef.current = null;
    }
  };

  const handleDragEnd = (event: any, info: any) => {
    if (onReposition && isEditing) {
      onReposition(id, info.point.x, info.point.y);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isEditing && widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsEditing(false);
        setJiggling(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing]);

  useEffect(() => {
    return () => {
      if (longPressTimeoutRef.current) {
        clearTimeout(longPressTimeoutRef.current);
      }
    };
  }, []);

  const jiggleAnimation = {
    rotate: jiggling ? [0, -1, 0, 1, 0] : 0
  };

  return (
    <motion.div
      ref={widgetRef}
      className={cn(
        "relative cursor-grab active:cursor-grabbing touch-none",
        isEditing && "z-10",
        className
      )}
      drag={isEditing}
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.1}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      initial={initialPosition}
      animate={jiggleAnimation}
      transition={{ 
        rotate: { 
          repeat: Infinity, 
          duration: 0.3, 
          ease: "linear" 
        },
        default: {
          duration: 0.3
        } 
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {isEditing && (
        <div className={cn(
          "absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center z-10",
          isDarkMode ? "bg-gray-800 text-white border-white/20" : "bg-gray-200 text-gray-700 border-black/20"
        )}>
          <span className="text-xs">✖</span>
        </div>
      )}
      {children}
    </motion.div>
  );
};

export default DraggableWidget;
