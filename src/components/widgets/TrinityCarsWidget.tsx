
import React, { useState } from 'react';
import { AppleWidget } from '@/components/icloud/AppleWidget';
import { Button } from '@/components/ui/button';
import { Car, ChevronLeft, ChevronRight, DollarSign, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { toast } from 'sonner';

// Trinity Dodge inventory data
const inventory = [
  {
    id: 1,
    model: 'Dodge Ram 1500',
    year: 2025,
    price: 38000,
    image: '/lovable-uploads/832b4165-5082-4a12-9ea7-84ebd50a41a2.png',
    features: [
      'Crew/Quad/Regular Cab Options',
      'Up to 12,750 lbs towing capacity',
      'Perfect for Taylorville farmers',
      'Available 4x4 for Illinois winters'
    ],
    inStock: 7,
    color: 'Bright White'
  },
  {
    id: 2,
    model: 'Dodge Charger',
    year: 2025,
    price: 32000,
    image: '/lovable-uploads/85c5470c-e869-42d4-a384-94b139a50bf0.png',
    features: [
      'SXT, GT, and R/T trims',
      'Powerful performance engine',
      'Sporty design',
      'Advanced safety features'
    ],
    inStock: 5,
    color: 'Pitch Black'
  },
  {
    id: 3,
    model: 'Dodge Durango',
    year: 2025,
    price: 41000,
    image: '/lovable-uploads/c9ad08ff-68c3-4635-af88-f133d638efc9.png',
    features: [
      '7-seat SUV for families',
      'Up to 8,700 lbs towing',
      'All-wheel drive option',
      'Premium interior options'
    ],
    inStock: 4,
    color: 'Octane Red'
  }
];

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
  
  const handleScheduleTestDrive = () => {
    toast.success(`Test drive scheduled for ${currentVehicle.model}`, {
      description: "A Trinity Dodge representative will contact you shortly."
    });
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
        <div className="relative overflow-hidden rounded-xl h-48 mb-4 group">
          <img 
            src={currentVehicle.image} 
            alt={currentVehicle.model} 
            className="w-full h-full object-cover transition-transform duration-700 
                    transform group-hover:scale-110"
          />
          
          <div className="absolute inset-0 flex items-center justify-between p-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={prevVehicle}
              className="rounded-full glass h-8 w-8 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={nextVehicle}
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
                <h3 className="text-lg font-semibold">{currentVehicle.model}</h3>
                <p className="text-sm">{currentVehicle.year} • {currentVehicle.color}</p>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 text-green-400" />
                <span className="font-semibold">{currentVehicle.price.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
        
        {showFeatures ? (
          <div className="flex-1 flex flex-col">
            <div className="mb-2 flex items-center justify-between">
              <h4 className="font-medium">Key Features</h4>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleToggleFeatures}
                className="text-xs"
              >
                Hide Features
              </Button>
            </div>
            
            <ul className={cn(
              "space-y-2 mb-4 flex-1 px-1",
              isDarkMode ? "text-gray-200" : "text-gray-700"
            )}>
              {currentVehicle.features.map((feature, index) => (
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
        ) : (
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <div>
                <span className={cn(
                  "text-xs px-2 py-1 rounded-full",
                  isDarkMode ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-800"
                )}>
                  {currentVehicle.inStock} in stock
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleToggleFeatures}
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
              Visit Trinity Dodge in Taylorville to take this {currentVehicle.year} {currentVehicle.model} for a test drive. 
              Special financing available with rates as low as 2.9% APR.
            </p>
          </div>
        )}
        
        <div className="mt-auto flex space-x-2">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => toast.info(`View details for ${currentVehicle.model}`, {
              description: "Opening vehicle details page..."
            })}
          >
            View Details
          </Button>
          <Button 
            className="flex-1"
            onClick={handleScheduleTestDrive}
          >
            Schedule Test Drive
          </Button>
        </div>
      </div>
    </AppleWidget>
  );
};

export default TrinityCarsWidget;
