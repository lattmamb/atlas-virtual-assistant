
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import SubMenuSection from './SubMenuSection';
import { SidebarSectionProps } from './types';

interface ExtendedSidebarSectionProps extends SidebarSectionProps {
  label: string;
  items: any[];
  isActive: (path: string) => boolean;
}

const SidebarSection: React.FC<ExtendedSidebarSectionProps> = ({
  label,
  items,
  isActive,
  children,
  collapsible = true,
  defaultOpen = true
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-3">
      {collapsible ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider px-3 py-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
        >
          {label}
          <ChevronRight
            className={cn(
              "h-4 w-4 transition-transform",
              isOpen && "rotate-90"
            )}
          />
        </button>
      ) : (
        <div className="text-xs font-bold uppercase tracking-wider px-3 py-2 text-slate-500 dark:text-slate-400">
          {label}
        </div>
      )}

      {isOpen && (
        <div className="pl-2">
          {children ? (
            children
          ) : (
            <SubMenuSection 
              label={label}
              items={items}
              isActive={isActive}
              activeItem=""
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SidebarSection;
