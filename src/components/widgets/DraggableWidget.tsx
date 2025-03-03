
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import EnhancedWidget from './EnhancedWidget';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Palette, Maximize, Minimize } from 'lucide-react';

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
  const [widgetStyle, setWidgetStyle] = useState<'glass' | 'neomorph' | 'hybrid'>(style);
  const [widgetHoverEffect, setWidgetHoverEffect] = useState<'scale' | 'glow' | 'lift' | 'none'>(hoverEffect);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Find and enhance the original content by injecting the style selector
  const enhanceChildrenWithStyleSelector = (children: React.ReactNode) => {
    if (!React.isValidElement(children)) return children;
    
    // Check if the child is an AppleWidget (has title and className props)
    if (React.isValidElement(children) && 'title' in children.props) {
      // Clone the child with additional headerActions
      return React.cloneElement(children, {
        ...children.props,
        headerActions: (
          <div className="flex items-center space-x-1">
            {/* Toggle expand/collapse */}
            <button 
              onClick={() => setIsExpanded(!isExpanded)} 
              className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              title={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? 
                <Minimize className="h-3.5 w-3.5 text-gray-400" /> : 
                <Maximize className="h-3.5 w-3.5 text-gray-400" />
              }
            </button>
            
            {/* Style switcher dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                  title="Change style"
                >
                  <Palette className="h-3.5 w-3.5 text-gray-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem 
                  onClick={() => setWidgetStyle('glass')}
                  className={widgetStyle === 'glass' ? 'bg-blue-100 dark:bg-blue-900/30' : ''}
                >
                  Glass
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setWidgetStyle('neomorph')}
                  className={widgetStyle === 'neomorph' ? 'bg-blue-100 dark:bg-blue-900/30' : ''}
                >
                  Neomorphic
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setWidgetStyle('hybrid')}
                  className={widgetStyle === 'hybrid' ? 'bg-blue-100 dark:bg-blue-900/30' : ''}
                >
                  Hybrid
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setWidgetHoverEffect(widgetHoverEffect === 'none' ? 'scale' : 'none')}
                  className="border-t mt-1 pt-1"
                >
                  {widgetHoverEffect === 'none' ? 'Enable' : 'Disable'} Hover Effect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Original header actions if any */}
            {children.props.headerActions}
          </div>
        )
      });
    }
    return children;
  };
  
  // Enhanced content with style selector
  const enhancedChildren = enhanceChildrenWithStyleSelector(children);
  
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
          style={widgetStyle}
          hoverEffect="none"
          accentColor={accentColor}
        >
          {enhancedChildren}
        </EnhancedWidget>
      </motion.div>
    );
  }
  
  return (
    <div className={cn(
      className,
      isExpanded && "col-span-1 md:col-span-2 transition-all duration-300 transform z-10"
    )}>
      <EnhancedWidget 
        className="h-full" 
        style={widgetStyle} 
        hoverEffect={widgetHoverEffect}
        accentColor={accentColor}
      >
        {enhancedChildren}
      </EnhancedWidget>
    </div>
  );
};

export default DraggableWidget;
