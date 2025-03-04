
import React from 'react';
import { cn } from '@/lib/utils';
import AppGrid from '@/components/dashboard/AppGrid';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface AppGridSidebarProps {
  isOpen: boolean;
  appGridItems: Array<{
    icon: React.ReactNode;
    name: string;
    path: string;
    badgeCount: number;
  }>;
  onClose: () => void;
}

const AppGridSidebar: React.FC<AppGridSidebarProps> = ({
  isOpen,
  appGridItems,
  onClose
}) => {
  return (
    <motion.aside
      className={cn(
        "fixed top-0 left-0 h-screen w-full bg-black/50 backdrop-blur-lg z-50 p-4",
        "flex flex-col items-center justify-center space-y-4",
        "transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="grid grid-cols-3 gap-4">
        {appGridItems.map((app, index) => (
          <AppGrid
            key={index}
            icon={app.icon}
            name={app.name}
            path={app.path}
            badgeCount={app.badgeCount}
          />
        ))}
      </div>
      <Button onClick={onClose}>Close</Button>
    </motion.aside>
  );
};

export default AppGridSidebar;
