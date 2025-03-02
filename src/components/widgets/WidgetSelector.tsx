
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { X, Plus } from 'lucide-react';

interface WidgetOption {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface WidgetSelectorProps {
  isDarkMode: boolean;
  showWidgetSelector: boolean;
  setShowWidgetSelector: (show: boolean) => void;
  availableWidgets: WidgetOption[];
  activeWidgets: string[];
  toggleWidget: (widgetId: string) => void;
}

const WidgetSelector: React.FC<WidgetSelectorProps> = ({
  isDarkMode,
  showWidgetSelector,
  setShowWidgetSelector,
  availableWidgets,
  activeWidgets,
  toggleWidget
}) => {
  return (
    <>
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>Dashboard</h2>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "flex items-center gap-1",
            isDarkMode ? "border-white/10 hover:bg-white/5" : "border-black/10 hover:bg-black/5"
          )}
          onClick={() => setShowWidgetSelector(!showWidgetSelector)}
        >
          {showWidgetSelector ? (
            <>
              <X size={14} />
              <span className="text-xs">Close</span>
            </>
          ) : (
            <>
              <Plus size={14} />
              <span className="text-xs">Customize</span>
            </>
          )}
        </Button>
      </div>
      
      {showWidgetSelector && (
        <div 
          className={cn(
            "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-6 p-4 rounded-xl animate-fade-in",
            isDarkMode ? "bg-black/20 backdrop-blur-md border border-white/10" : "bg-white/20 backdrop-blur-md border border-black/10"
          )}
        >
          {availableWidgets.map(widget => (
            <Button
              key={widget.id}
              variant={activeWidgets.includes(widget.id) ? "default" : "outline"}
              size="sm"
              className={cn(
                "h-auto py-2 flex flex-col items-center gap-2",
                activeWidgets.includes(widget.id) 
                  ? "bg-blue-500 hover:bg-blue-600 text-white" 
                  : isDarkMode ? "border-white/10" : "border-black/10"
              )}
              onClick={() => toggleWidget(widget.id)}
            >
              {widget.icon}
              <span className="text-xs">{widget.name}</span>
            </Button>
          ))}
        </div>
      )}
    </>
  );
};

export default WidgetSelector;
