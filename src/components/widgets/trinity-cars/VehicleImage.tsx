
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { VehicleData } from './types';

interface VehicleImageProps {
  vehicle: VehicleData;
  onNext: () => void;
  onPrevious: () => void;
}

const VehicleImage: React.FC<VehicleImageProps> = ({ 
  vehicle, 
  onNext, 
  onPrevious 
}) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="relative overflow-hidden rounded-xl h-48 mb-4 group">
      <img 
        src={vehicle.image} 
        alt={vehicle.model} 
        className="w-full h-full object-cover transition-transform duration-700 
                transform group-hover:scale-110"
      />
      
      <div className="absolute inset-0 flex items-center justify-between p-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onPrevious}
          className="rounded-full glass h-8 w-8 text-white hover:bg-white/20"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onNext}
          className="rounded-full glass h-8 w-8 text-white hover:bg-white/20"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className={cn(
        "absolute bottom-0 left-0 right-0 glass py-2 px-3 transition-all duration-300",
        isDarkMode ? "bg-black/40" : "bg-white/40"
      )}>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{vehicle.model}</h3>
            <p className="text-sm">{vehicle.year} • {vehicle.color}</p>
          </div>
          <div className="flex items-center">
            <span className="font-semibold">${vehicle.price.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleImage;
