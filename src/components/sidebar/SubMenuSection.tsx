
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavItem, SubMenuSectionProps } from './types';

interface ExtendedSubMenuSectionProps extends SubMenuSectionProps {
  label: string;
  isActive?: (path: string) => boolean;
  onItemClick?: (name: string) => void;
  collapsible?: boolean;
}

const SubMenuSection: React.FC<ExtendedSubMenuSectionProps> = ({
  label,
  items,
  activeItem,
  isActive,
  onItemClick,
  collapsible = false,
  onNavItemClick
}) => {
  return (
    <ul className="space-y-1 py-1">
      {items.map((item) => (
        <li key={item.path}>
          <Link
            to={item.path}
            className={cn(
              "flex items-center justify-between group px-3 py-2 text-sm font-medium rounded-md",
              "transition-colors duration-200",
              isActive && isActive(item.path)
                ? "bg-white/10 text-white"
                : "text-white/75 hover:text-white hover:bg-white/10"
            )}
            onClick={() => {
              if (onItemClick) onItemClick(item.name);
              if (onNavItemClick) onNavItemClick(item);
              if (item.onClick) item.onClick();
            }}
          >
            <span className="flex items-center">
              {item.icon && (
                <span className="mr-2 text-white/70 group-hover:text-white/90">
                  {item.icon}
                </span>
              )}
              {item.name}
            </span>
            
            {item.badge && (
              <span
                className={cn(
                  "px-2 py-0.5 text-xs font-semibold rounded-full",
                  `bg-${item.badge.color} text-white`
                )}
              >
                {item.badge.count}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SubMenuSection;
