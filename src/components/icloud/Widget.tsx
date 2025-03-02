
import React from 'react';
import { cn } from '@/lib/utils';

interface WidgetProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  minWidth?: string;
  minHeight?: string;
  className?: string;
  isDarkMode?: boolean;
}

const Widget: React.FC<WidgetProps> = ({
  title,
  icon,
  children,
  minWidth = '300px',
  minHeight = 'auto',
  className,
  isDarkMode = true
}) => {
  return (
    <div
      className={cn(
        'icloud-widget',
        isDarkMode ? 'apple-blur text-white' : 'glass-light',
        className
      )}
      style={{ minWidth, minHeight }}
    >
      <div className={cn(
        'icloud-widget-header',
        isDarkMode ? 'border-[#2a2a2a]' : 'border-gray-200'
      )}>
        <div className="icloud-widget-title">
          {icon && <span className="mr-2">{icon}</span>}
          {title}
        </div>
        <div className="flex items-center space-x-1">
          <button className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <button className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <button className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
      </div>
      <div className="icloud-widget-body">
        {children}
      </div>
    </div>
  );
};

export default Widget;
