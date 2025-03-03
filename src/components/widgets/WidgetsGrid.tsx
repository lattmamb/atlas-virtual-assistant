
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Grid, Plus } from 'lucide-react';
import { toast } from "sonner";

interface WidgetsGridProps {
  children: React.ReactNode;
  onEditMode?: (editing: boolean) => void;
}

const WidgetsGrid: React.FC<WidgetsGridProps> = ({ children, onEditMode }) => {
  const { isDarkMode } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [positions, setPositions] = useState<Record<string, { x: number, y: number }>>({});

  const toggleEditMode = () => {
    const newEditMode = !isEditing;
    setIsEditing(newEditMode);
    
    if (onEditMode) {
      onEditMode(newEditMode);
    }
    
    if (newEditMode) {
      toast.info("Edit mode activated", {
        description: "Press and hold widgets to reposition them",
        duration: 3000,
      });
    } else {
      toast.success("Widget layout saved", {
        duration: 2000,
      });
    }
  };

  const handleReposition = (id: string, x: number, y: number) => {
    setPositions(prev => ({
      ...prev,
      [id]: { x, y }
    }));
  };

  useEffect(() => {
    // Save positions to localStorage when they change
    if (Object.keys(positions).length > 0) {
      localStorage.setItem('widget-positions', JSON.stringify(positions));
    }
  }, [positions]);

  useEffect(() => {
    // Load positions from localStorage on component mount
    const savedPositions = localStorage.getItem('widget-positions');
    if (savedPositions) {
      try {
        setPositions(JSON.parse(savedPositions));
      } catch (e) {
        console.error('Failed to parse saved widget positions', e);
      }
    }
  }, []);

  // Clone children and add draggable functionality
  const draggableChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const id = child.key?.toString() || '';
      const position = positions[id] || { x: 0, y: 0 };
      
      return React.cloneElement(child, {
        ...child.props,
        isEditing: isEditing,
        position: position,
        onReposition: handleReposition,
      });
    }
    return child;
  });

  return (
    <div className="relative">
      <div className="sticky top-0 z-30 flex justify-end mb-4">
        <Button
          variant={isEditing ? "default" : "outline"}
          size="sm"
          className={cn(
            "flex items-center gap-1 transition-all",
            isEditing && "bg-green-500 hover:bg-green-600"
          )}
          onClick={toggleEditMode}
        >
          {isEditing ? (
            <>
              <Check size={14} />
              <span className="text-xs">Done</span>
            </>
          ) : (
            <>
              <Grid size={14} />
              <span className="text-xs">Edit Widgets</span>
            </>
          )}
        </Button>
      </div>
      
      <motion.div 
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
          isEditing && "relative min-h-[600px]"
        )}
        layout
      >
        {draggableChildren}
      </motion.div>
    </div>
  );
};

export default WidgetsGrid;
