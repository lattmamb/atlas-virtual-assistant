
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { VehicleData } from './types';

interface VehicleFeaturesProps {
  vehicle: VehicleData;
  onToggleFeatures: () => void;
}

const VehicleFeatures: React.FC<VehicleFeaturesProps> = ({ vehicle, onToggleFeatures }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="flex-1 flex flex-col">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="font-medium">Key Features</h4>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onToggleFeatures}
          className="text-xs"
        >
          Hide Features
        </Button>
      </div>
      
      <ul className={cn(
        "space-y-2 mb-4 flex-1 px-1",
        isDarkMode ? "text-gray-200" : "text-gray-700"
      )}>
        {vehicle.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500/10 
                  flex items-center justify-center mt-0.5">
              <span className="text-green-500 text-xs">✓</span>
            </div>
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VehicleFeatures;
