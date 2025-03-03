
import React from 'react';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { VehicleData } from './types';

interface VehicleSummaryProps {
  vehicle: VehicleData;
  onToggleFeatures: () => void;
}

const VehicleSummary: React.FC<VehicleSummaryProps> = ({ vehicle, onToggleFeatures }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <div>
          <span className={cn(
            "text-xs px-2 py-1 rounded-full",
            isDarkMode ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-800"
          )}>
            {vehicle.inStock} in stock
          </span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onToggleFeatures}
          className="text-xs flex items-center gap-1"
        >
          <Info className="h-3 w-3" />
          <span>View Features</span>
        </Button>
      </div>
      
      <p className={cn(
        "text-sm mb-4 flex-1",
        isDarkMode ? "text-gray-300" : "text-gray-600"
      )}>
        Visit Trinity Dodge in Taylorville to take this {vehicle.year} {vehicle.model} for a test drive. 
        Special financing available with rates as low as 2.9% APR.
      </p>
    </div>
  );
};

export default VehicleSummary;
