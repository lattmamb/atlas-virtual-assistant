
import React from 'react';
import { Cloud, FileText, Image } from 'lucide-react';
import { AppleWidget } from '@/components/icloud/AppleWidget';

const StorageWidget: React.FC = () => {
  return (
    <AppleWidget 
      title="iCloud Storage"
      icon={<Cloud className="h-5 w-5 text-blue-400" />}
      className="row-span-1"
    >
      <div className="p-4">
        <div className="mb-2 flex justify-between items-center">
          <span className="text-sm">15.2 GB of 20 GB used</span>
          <span className="text-xs text-blue-400">Manage</span>
        </div>
        <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
            style={{ width: '76%' }}
          ></div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="bg-white/5 p-2 rounded-lg flex items-center gap-2">
            <FileText className="h-4 w-4 text-blue-400" />
            <div className="text-xs">
              <div>Documents</div>
              <div className="text-gray-400">4.7 GB</div>
            </div>
          </div>
          <div className="bg-white/5 p-2 rounded-lg flex items-center gap-2">
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
