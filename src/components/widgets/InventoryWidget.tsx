
import React from 'react';
import { AppleWidget } from '@/components/icloud/AppleWidget';
import { Car, ChevronRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface CarData {
  id: number;
  model: string;
  year: number;
  price: string;
  image: string;
  available: boolean;
}

const InventoryWidget: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  // Sample inventory data
  const cars: CarData[] = [
    { 
      id: 1, 
      model: 'Dodge Ram 1500', 
      year: 2025, 
      price: '$38,000', 
      image: '/lovable-uploads/832b4165-5082-4a12-9ea7-84ebd50a41a2.png',
      available: true 
    },
    { 
      id: 2, 
      model: 'Dodge Charger', 
      year: 2025, 
      price: '$32,000', 
      image: '/lovable-uploads/85c5470c-e869-42d4-a384-94b139a50bf0.png',
      available: true 
    },
    { 
      id: 3, 
      model: 'Dodge Durango', 
      year: 2025, 
      price: '$41,000', 
      image: '/lovable-uploads/c9ad08ff-68c3-4635-af88-f133d638efc9.png',
      available: true 
    },
  ];
  
  const handleCarClick = (car: CarData) => {
    toast.success(`Viewing details for ${car.year} ${car.model}`, {
      description: `Starting at ${car.price}`,
      position: "top-center",
      duration: 3000,
    });
  };

  return (
    <AppleWidget
      title="Trinity Dodge Inventory"
      icon={<Car className="h-5 w-5 text-blue-400" />}
      className="col-span-1 md:col-span-2"
    >
      <div className="p-4">
        <div className="text-sm text-blue-300 mb-3">Featured Vehicles</div>
        <div className="space-y-3">
          {cars.map((car) => (
            <div 
              key={car.id} 
              className={cn(
                "flex items-center p-3 rounded-lg cursor-pointer transition-all",
                isDarkMode ? "bg-white/5 hover:bg-white/10" : "bg-black/5 hover:bg-black/10"
              )}
              onClick={() => handleCarClick(car)}
            >
              <div className="w-16 h-16 rounded-md overflow-hidden mr-3">
                <img 
                  src={car.image} 
                  alt={car.model} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="font-medium">{car.year} {car.model}</div>
                <div className="text-xs text-gray-400">Starting at {car.price}</div>
                {car.available ? (
                  <div className="text-xs text-green-400">In Stock</div>
                ) : (
                  <div className="text-xs text-red-400">Out of Stock</div>
                )}
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className={cn(
              "text-xs",
              isDarkMode ? "border-white/10 hover:bg-white/5" : "border-black/10 hover:bg-black/5"
            )}
            onClick={() => toast.info("Full inventory coming soon", {
              position: "top-center"
            })}
          >
            View All Inventory
          </Button>
        </div>
      </div>
    </AppleWidget>
  );
};

export default InventoryWidget;
