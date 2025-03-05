
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Car, ArrowLeft, Phone, Calendar, MapPin, Clock, InfoIcon, Settings, Wrench } from 'lucide-react';
import UniversalThemeSwitcher from '@/components/theme/UniversalThemeSwitcher';
import { cn } from '@/lib/utils';

// Vehicle type
interface Vehicle {
  id: string;
  model: string;
  year: number;
  price: string;
  image: string;
  description: string;
  features: string[];
}

// Component for Trinity Dodge dealership
const Trinity: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'vehicles' | 'service' | 'about'>('vehicles');
  
  // Sample vehicle data
  const vehicles: Vehicle[] = [
    {
      id: 'ram-1500',
      model: 'Dodge Ram 1500',
      year: 2025,
      price: '$38,000',
      image: 'https://images.unsplash.com/photo-1599256621730-535171e28c2a?q=80&w=1000',
      description: 'The powerful 2025 Ram 1500 with towing capacity up to 12,750 lbs, perfect for Taylorville farmers and rural use.',
      features: ['Crew Cab', '5.7L V8 Engine', '4WD', 'Apple CarPlay', 'Trailer Tow Package']
    },
    {
      id: 'charger',
      model: 'Dodge Charger',
      year: 2025,
      price: '$32,000',
      image: 'https://images.unsplash.com/photo-1612911912304-5f59094b4602?q=80&w=1000',
      description: 'The sleek and powerful 2025 Dodge Charger, designed for performance enthusiasts in Taylorville.',
      features: ['SXT Trim', '3.6L V6 Engine', 'RWD', 'Leather Seats', 'Sport Mode']
    },
    {
      id: 'durango',
      model: 'Dodge Durango',
      year: 2025,
      price: '$41,000',
      image: 'https://images.unsplash.com/photo-1581540222534-4c3e43b9b2fa?q=80&w=1000',
      description: 'The spacious 7-seat 2025 Dodge Durango SUV with towing up to 8,700 lbs, ideal for Taylorville families and Illinois winters.',
      features: ['7 Passenger Seating', '5.7L V8 Engine', 'AWD', 'Heated Seats', 'Tow Package']
    },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
      {/* Header */}
      <header className="backdrop-blur-lg bg-white/70 dark:bg-black/70 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/')} 
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-semibold">Trinity Dodge</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <a href="tel:+12175551234" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
              <Phone className="h-5 w-5" />
            </a>
            <UniversalThemeSwitcher variant="minimal" />
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="container mx-auto px-4 pb-2">
          <div className="flex gap-1">
            {[
              { id: 'vehicles', label: 'Vehicles', icon: <Car className="h-4 w-4" /> },
              { id: 'service', label: 'Service', icon: <Wrench className="h-4 w-4" /> },
              { id: 'about', label: 'About', icon: <InfoIcon className="h-4 w-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                  selectedTab === tab.id 
                    ? "bg-primary text-white" 
                    : "hover:bg-gray-200 dark:hover:bg-gray-800"
                )}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Vehicles Tab */}
        {selectedTab === 'vehicles' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-6">Featured Vehicles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </div>
        )}
        
        {/* Service Tab */}
        {selectedTab === 'service' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-6">Service Department</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ServiceCard 
                title="Oil Change & Maintenance"
                description="Regular maintenance services to keep your Dodge running smoothly."
                price="From $49.95"
                icon={<Wrench className="h-6 w-6 text-red-500" />}
              />
              
              <ServiceCard 
                title="Tire Service"
                description="Rotation, balancing, and replacement for all Dodge vehicles."
                price="From $29.95"
                icon={<Settings className="h-6 w-6 text-blue-500" />}
              />
              
              <ServiceCard 
                title="Brake Service"
                description="Complete brake inspection and repair services."
                price="From $99.95"
                icon={<Wrench className="h-6 w-6 text-orange-500" />}
              />
              
              <ServiceCard 
                title="Battery Service"
                description="Testing and replacement of batteries for all Dodge models."
                price="From $39.95"
                icon={<Settings className="h-6 w-6 text-green-500" />}
              />
            </div>
            
            <div className="mt-8 p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Schedule Service</h3>
              <p className="mb-4">Book your next service appointment at Trinity Dodge in Taylorville:</p>
              
              <div className="flex flex-col md:flex-row gap-4">
                <button className="flex-1 bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>Schedule Online</span>
                </button>
                
                <button className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-4 py-3 rounded-lg flex items-center justify-center gap-2">
                  <Phone className="h-5 w-5" />
                  <span>Call: (217) 555-1234</span>
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* About Tab */}
        {selectedTab === 'about' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-6">About Trinity Dodge</h2>
            
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
              <p className="mb-4">
                Trinity Dodge is Taylorville's premier Dodge dealership, serving central Illinois with a wide selection of new and pre-owned vehicles. 
                Our friendly staff is dedicated to providing exceptional customer service to help you find the perfect vehicle for your needs.
              </p>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p>123 Main Street, Taylorville, IL 62568</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Hours</h4>
                    <p>Monday - Friday: 8:00 AM - 7:00 PM</p>
                    <p>Saturday: 9:00 AM - 5:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Contact</h4>
                    <p>Sales: (217) 555-1234</p>
                    <p>Service: (217) 555-5678</p>
                    <p>Email: info@trinitydodge.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-6 rounded-xl bg-primary/10 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
              <p>
                At Trinity Dodge, we strive to provide exceptional service and quality vehicles to our Taylorville community. 
                We believe in building long-lasting relationships with our customers through transparency, integrity, and dedication.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// Vehicle Card Component
const VehicleCard: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
  return (
    <motion.div 
      className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="aspect-[16/9] relative overflow-hidden">
        <img 
          src={vehicle.image} 
          alt={vehicle.model} 
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 right-2 bg-primary text-white text-sm px-2 py-1 rounded">
          {vehicle.year}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold">{vehicle.model}</h3>
        <p className="text-xl font-bold text-primary mt-1">{vehicle.price}</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">{vehicle.description}</p>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Key Features:</h4>
          <ul className="grid grid-cols-2 gap-1">
            {vehicle.features.map((feature, index) => (
              <li key={index} className="text-sm flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/80"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
          <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded">
            View Details
          </button>
          <button className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded">
            Test Drive
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Service Card Component
const ServiceCard: React.FC<{ 
  title: string;
  description: string;
  price: string;
  icon: React.ReactNode;
}> = ({ title, description, price, icon }) => {
  return (
    <motion.div 
      className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{description}</p>
          <p className="text-primary font-semibold mt-2">{price}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Trinity;
