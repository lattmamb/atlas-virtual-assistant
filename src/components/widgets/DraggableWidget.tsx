
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import EnhancedWidget from './EnhancedWidget';

interface DraggableWidgetProps {
  children: React.ReactNode;
  id: string;
  className?: string;
  isEditing?: boolean;
  position?: { x: number; y: number };
  onReposition?: (id: string, x: number, y: number) => void;
  style?: 'glass' | 'neomorph' | 'hybrid';
  hoverEffect?: 'scale' | 'glow' | 'lift' | 'none';
  accentColor?: string;
}

const DraggableWidget: React.FC<DraggableWidgetProps> = ({
  children,
  id,
  className,
  isEditing = false,
  position = { x: 0, y: 0 },
  onReposition,
  style = 'glass',
  hoverEffect = 'scale',
  accentColor,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  
  if (isEditing) {
    return (
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0}
        initial={{ x: position.x, y: position.y }}
        animate={{ x: position.x, y: position.y }}
        className={cn(
          "absolute cursor-grab active:cursor-grabbing",
          className
        )}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(_, info) => {
          setIsDragging(false);
          if (onReposition) {
            onReposition(id, position.x + info.offset.x, position.y + info.offset.y);
          }
        }}
        whileDrag={{ 
          scale: 1.02, 
          zIndex: 10, 
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" 
        }}
      >
        <EnhancedWidget 
          className={cn("h-full opacity-80", isDragging ? "ring-2 ring-primary" : "")}
          style={style}
          hoverEffect="none"
          accentColor={accentColor}
        >
          {children}
        </EnhancedWidget>
      </motion.div>
    );
  }
  
  return (
    <div className={className}>
      <EnhancedWidget 
        className="h-full" 
        style={style} 
        hoverEffect={hoverEffect}
        accentColor={accentColor}
      >
        {children}
      </EnhancedWidget>
    </div>
  );
};

export default DraggableWidget;
