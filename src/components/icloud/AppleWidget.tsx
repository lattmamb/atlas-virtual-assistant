
import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AppleWidgetProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: React.ReactNode;
  minWidth?: string;
  minHeight?: string;
  badge?: number;
  isDarkMode?: boolean;
  headerActionIcon?: React.ReactNode;
  headerActionTooltip?: string;
  onHeaderActionClick?: () => void;
  headerActions?: React.ReactNode;
}

export const AppleWidget: React.FC<AppleWidgetProps> = ({ 
  children, 
  className,
  title,
  icon,
  minWidth = "240px",
  minHeight,
  badge,
  isDarkMode = true,
  headerActionIcon,
  headerActionTooltip,
  onHeaderActionClick,
  headerActions
}) => {
  return (
    <div 
      className={cn(
        "rounded-xl overflow-hidden transition-all duration-300 h-full",
        "border border-white/10 bg-black/30 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
        "hover:shadow-[0_8px_30px_rgb(0,0,0,0.24)] hover:bg-black/40 group",
        "flex flex-col",
        className
      )}
      style={{ 
        minWidth, 
        minHeight,
      }}
    >
      {(title || icon) && (
        <div className="flex items-center justify-between p-3 border-b border-white/10">
          <div className="flex items-center space-x-2">
            {icon}
            {title && <span className="text-sm font-medium">{title}</span>}
            {badge !== undefined && badge > 0 && (
              <span className="bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {badge > 9 ? '9+' : badge}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-1">
            {headerActionIcon && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-full opacity-70 hover:opacity-100 hover:bg-white/10"
                      onClick={onHeaderActionClick}
                    >
                      {headerActionIcon}
                    </Button>
                  </TooltipTrigger>
                  {headerActionTooltip && (
                    <TooltipContent>
                      <p>{headerActionTooltip}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            )}
            
            {headerActions}
          </div>
        </div>
      )}
      
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};
