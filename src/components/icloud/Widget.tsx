
import React, { useState, useRef } from 'react';
import { Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WidgetProps {
  title: string;
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  minWidth?: string;
  minHeight?: string;
}

const Widget: React.FC<WidgetProps> = ({ 
  title, 
  icon, 
  className, 
  children,
  minWidth = '320px',
  minHeight = '280px'
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [size, setSize] = useState({ width: minWidth, height: minHeight });
  const widgetRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const resizeStartRef = useRef({ width: 0, height: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.resize-handle')) return;
    if ((e.target as HTMLElement).closest('button')) return;
    
    setIsDragging(true);
    dragStartRef.current = { 
      x: e.clientX - position.x, 
      y: e.clientY - position.y 
    };
  };

  const handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>, direction: string) => {
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

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={widgetRef}
      className={cn(
        "icloud-widget absolute",
        isDragging && "cursor-grabbing opacity-80 z-50",
        className
      )}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        width: size.width,
        height: size.height,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="icloud-widget-header cursor-move">
        <div className="icloud-widget-title">
          <div className="flex items-center gap-2">
            {icon && <div className="text-primary">{icon}</div>}
            <span>{title}</span>
          </div>
        </div>
        <div>
          <button className="p-1.5 hover:bg-white/10 rounded-full transition">
            <Minus className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="icloud-widget-body overflow-auto" style={{ maxHeight: `calc(${size.height} - 54px)` }}>
        {children}
      </div>
      
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
    </div>
  );
};

export default Widget;
