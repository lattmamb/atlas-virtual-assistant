
import React from 'react';
import { AppleWidget } from '@/components/icloud/AppleWidget';
import { Cloud, FileText, Image } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

const StorageWidget: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <AppleWidget 
      title="iCloud Storage"
      icon={<Cloud className="h-5 w-5 text-blue-400" />}
      className="row-span-1 glass"
    >
      <div className="p-4">
        <div className="mb-2 flex justify-between items-center">
          <span className="text-sm">15.2 GB of 20 GB used</span>
          <span className="text-xs text-blue-400">Manage</span>
        </div>
        <div className={cn(
          "relative h-2 rounded-full overflow-hidden",
          isDarkMode ? "bg-white/10" : "bg-black/10"
        )}>
          <div 
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
            style={{ width: '76%' }}
          ></div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className={cn(
            "p-2 rounded-lg flex items-center gap-2",
            isDarkMode ? "bg-white/5" : "bg-black/5"
          )}>
            <FileText className="h-4 w-4 text-blue-400" />
            <div className="text-xs">
              <div>Documents</div>
              <div className="text-gray-400">4.7 GB</div>
            </div>
          </div>
          <div className={cn(
            "p-2 rounded-lg flex items-center gap-2",
            isDarkMode ? "bg-white/5" : "bg-black/5"
          )}>
            <Image className="h-4 w-4 text-blue-400" />
            <div className="text-xs">
              <div>Photos</div>
              <div className="text-gray-400">8.3 GB</div>
            </div>
          </div>
        </div>
      </div>
    </AppleWidget>
  );
};

export default StorageWidget;
