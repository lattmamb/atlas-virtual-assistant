
import React, { useState } from 'react';
import { AppleWidget } from '@/components/icloud/AppleWidget';
import { Car, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { inventory } from './trinity-cars/types';
import VehicleImage from './trinity-cars/VehicleImage';
import VehicleFeatures from './trinity-cars/VehicleFeatures';
import VehicleSummary from './trinity-cars/VehicleSummary';
import VehicleActions from './trinity-cars/VehicleActions';

const TrinityCarsWidget = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFeatures, setShowFeatures] = useState(false);
  const { isDarkMode } = useTheme();
  
  const currentVehicle = inventory[currentIndex];
  
  const nextVehicle = () => {
    setShowFeatures(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % inventory.length);
  };
  
  const prevVehicle = () => {
    setShowFeatures(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + inventory.length) % inventory.length);
  };
  
  const handleToggleFeatures = () => {
    setShowFeatures(!showFeatures);
  };

  return (
    <AppleWidget
      title="Trinity Dodge Inventory"
      icon={<Car className="h-5 w-5 text-blue-400" />}
      className={cn("col-span-1 md:col-span-2 hybrid", 
        isDarkMode ? "text-white" : "text-gray-800"
      )}
    >
      <div className="p-4 flex flex-col h-full">
        <VehicleImage 
          vehicle={currentVehicle} 
          onNext={nextVehicle} 
          onPrevious={prevVehicle} 
        />
        
        {showFeatures ? (
          <VehicleFeatures 
            vehicle={currentVehicle} 
            onToggleFeatures={handleToggleFeatures} 
          />
        ) : (
          <VehicleSummary 
            vehicle={currentVehicle} 
            onToggleFeatures={handleToggleFeatures} 
          />
        )}
        
        <VehicleActions modelName={currentVehicle.model} />
      </div>
    </AppleWidget>
  );
};

export default TrinityCarsWidget;
