
import React, { useState, useRef } from 'react';
import { Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface WidgetProps {
  title: string;
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  minWidth?: string;
  minHeight?: string;
  headerControls?: React.ReactNode;
  isDarkMode?: boolean;
}

const Widget: React.FC<WidgetProps> = ({ 
  title, 
  icon, 
  className, 
  children,
  minWidth = '320px',
  minHeight = '280px',
  headerControls,
  isDarkMode = false
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [size, setSize] = useState({ width: minWidth, height: minHeight });
  const widgetRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const resizeStartRef = useRef({ width: 0, height: 0 });
  const isMobile = useIsMobile();

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.resize-handle')) return;
    if ((e.target as HTMLElement).closest('button')) return;
    
    // Don't allow dragging on mobile
    if (isMobile) return;
    
    setIsDragging(true);
    dragStartRef.current = { 
      x: e.clientX - position.x, 
      y: e.clientY - position.y 
    };
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.resize-handle')) return;
    if ((e.target as HTMLElement).closest('button')) return;
    
    // For mobile: make sure we're touching in the header area
    const headerElement = e.currentTarget.querySelector('.icloud-widget-header');
    if (!headerElement) return;
    
    const headerRect = headerElement.getBoundingClientRect();
    const touch = e.touches[0];
    
    // Check if touch is within header
    if (
      touch.clientX >= headerRect.left && 
      touch.clientX <= headerRect.right &&
      touch.clientY >= headerRect.top &&
      touch.clientY <= headerRect.bottom
    ) {
      setIsDragging(true);
      dragStartRef.current = { 
        x: touch.clientX - position.x, 
        y: touch.clientY - position.y 
      };
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>, direction: string) => {
    if (isMobile) return; // Disable resize on mobile
    
    e.stopPropagation();
    e.preventDefault();
    
    const startResizing = (moveEvent: MouseEvent) => {
      if (!widgetRef.current) return;
      
      const currentWidth = parseInt(size.width.replace('px', ''));
      const currentHeight = parseInt(size.height.replace('px', ''));
      
      if (direction.includes('e')) {
        const newWidth = Math.max(parseInt(minWidth), currentWidth + (moveEvent.clientX - e.clientX));
        setSize(prev => ({ ...prev, width: `${newWidth}px` }));
      }
      
      if (direction.includes('s')) {
        const newHeight = Math.max(parseInt(minHeight), currentHeight + (moveEvent.clientY - e.clientY));
        setSize(prev => ({ ...prev, height: `${newHeight}px` }));
      }
    };
    
    const stopResizing = () => {
      window.removeEventListener('mousemove', startResizing);
      window.removeEventListener('mouseup', stopResizing);
    };
    
    window.addEventListener('mousemove', startResizing);
    window.addEventListener('mouseup', stopResizing);
  };

  React.useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        setPosition({
          x: touch.clientX - dragStartRef.current.x,
          y: touch.clientY - dragStartRef.current.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    // Mouse events
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Touch events
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  // Ensure the widget respects the minHeight prop
  React.useEffect(() => {
    setSize(prev => ({
      ...prev,
      height: minHeight,
    }));
  }, [minHeight]);

  return (
    <div
      ref={widgetRef}
      className={cn(
        "icloud-widget absolute",
        isDragging && "cursor-grabbing opacity-80 z-50",
        isDarkMode ? "bg-slate-800/90 backdrop-blur-sm border-slate-700" : "bg-white/90 backdrop-blur-sm border-gray-200/50",
        className
      )}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        width: size.width,
        height: size.height,
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div className={cn(
        "icloud-widget-header cursor-move",
        isDarkMode ? "bg-slate-800/80 border-slate-700" : "bg-gray-50/80 border-gray-200/50"
      )}>
        <div className="icloud-widget-title">
          <div className="flex items-center gap-2">
            {icon && <div className={cn("text-primary", isDarkMode && "text-blue-400")}>{icon}</div>}
            <span className={isDarkMode ? "text-white" : "text-gray-800"}>{title}</span>
          </div>
        </div>
        <div className="flex items-center">
          {headerControls}
        </div>
      </div>
      <div className="icloud-widget-body overflow-auto" style={{ maxHeight: `calc(${size.height} - 54px)` }}>
        {children}
      </div>
      
      {!isMobile && (
        <>
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize resize-handle z-20"
            onMouseDown={(e) => handleResizeMouseDown(e, 'se')}
          />
          <div
            className="absolute bottom-0 right-4 left-4 h-4 cursor-s-resize resize-handle z-10"
            onMouseDown={(e) => handleResizeMouseDown(e, 's')}
          />
          <div
            className="absolute right-0 bottom-4 top-12 w-4 cursor-e-resize resize-handle z-10"
            onMouseDown={(e) => handleResizeMouseDown(e, 'e')}
          />
        </>
      )}
    </div>
  );
};

export default Widget;
