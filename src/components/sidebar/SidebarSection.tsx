
import React from 'react';
import { cn } from '@/lib/utils';
import { SidebarSectionProps } from './types';

const SidebarSection: React.FC<SidebarSectionProps> = ({
  label,
  items,
  isActive,
  isCollapsed = false,
  children
}) => {
  return (
    <div className="px-3 py-2">
      {label && (
        <h3 className={cn(
          "mb-2 text-xs font-semibold text-sidebar-muted-foreground",
          isCollapsed && "sr-only"
        )}>
          {label}
        </h3>
      )}
      
      {children ? (
        children
      ) : (
        <div className="space-y-1">
          {items.map((item) => (
            <button
              key={item.path}
              onClick={item.onClick}
              className={cn(
                "flex items-center w-full justify-start px-3 py-2 text-sm rounded-md",
                isActive(item.path) 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent/10"
              )}
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {!isCollapsed && <span>{item.title}</span>}
              
              {!isCollapsed && item.badge && (
                <span className={cn(
                  "ml-auto px-1.5 py-0.5 text-xs rounded-full",
                  `bg-${item.badge.color}-500/20 text-${item.badge.color}-500`
                )}>
                  {item.badge.count}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarSection;
