
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavItem, SubMenuSectionProps } from './types';

const SubMenuSection: React.FC<SubMenuSectionProps> = ({
  title,
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
      {title && <li className="px-3 py-2 text-xs uppercase font-semibold text-white/50">{title}</li>}
      {items.map((item) => (
        <li key={item.path}>
          <Link
            to={item.path}
            className={cn(
              "flex items-center justify-between group px-3 py-2 text-sm font-medium rounded-md",
              "transition-colors duration-200",
              (isActive && isActive(item.path)) || (activeItem && activeItem === item.path)
                ? "bg-white/10 text-white"
                : "text-white/75 hover:text-white hover:bg-white/10"
            )}
            onClick={() => {
              if (onItemClick) onItemClick(item.path);
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
              {item.name || item.title}
            </span>
            
            {item.badge && (
              <span
                className={cn(
                  "px-2 py-0.5 text-xs font-semibold rounded-full",
                  typeof item.badge === 'object' 
                    ? `bg-${item.badge.color}-500 text-white` 
                    : "bg-blue-600 text-white"
                )}
              >
                {typeof item.badge === 'object' ? item.badge.count : item.badge}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SubMenuSection;
