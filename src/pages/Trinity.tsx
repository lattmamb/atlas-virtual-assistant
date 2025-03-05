
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Car, Clock, DollarSign, Info, MapPin, MessageSquare, Phone, Share2, Star } from 'lucide-react';
import BackgroundEffects from '@/components/widgets/BackgroundEffects';
import IOSStatusBar from '@/components/ios/IOSStatusBar';
import { useTheme } from '@/context/ThemeContext';

// Vehicle type definition
interface Vehicle {
  id: string;
  name: string;
  price: string;
  image: string;
  year: string;
  features: string[];
  description: string;
  ratings: number;
}

const Trinity: React.FC = () => {
  const navigate = useNavigate();
  const { currentTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'inventory' | 'services' | 'about'>('inventory');
  
  // Featured vehicles data
  const featuredVehicles: Vehicle[] = [
    {
      id: 'ram1500',
      name: 'Dodge Ram 1500',
      price: '$38,000',
      image: 'https://imgs.search.brave.com/aQYGfJh8YY9J3XiXKkw2Zq3GiqnkQNTe-OANX5MLFI4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXRhdXRvLmNv/bS9tb2RlbHMvMjAy/My9kb2RnZS9yYW0t/MTUwMC90cmFkaXRp/b25hbC8yMDIzX2Rv/ZGdlX3JhbS0xNTAw/XzRkci1waWNrdXBf/YmlnLWhvcm5fbmF2/XzEuanBn',
      year: '2025',
      features: ['Towing up to 12,750 lbs', 'Crew cab', 'Quad cab', 'Regular cab options', 'Perfect for Taylorville trails'],
      description: 'The 2025 Dodge Ram 1500 combines power and comfort, perfect for Taylorville\'s rural roads and farming needs.',
      ratings: 4.8,
    },
    {
      id: 'charger',
      name: 'Dodge Charger',
      price: '$32,000',
      image: 'https://imgs.search.brave.com/xZP2sLqg2rdnWYLwjzk5Lm5xfZQcHEFST0XVJElx6n8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXRhdXRvLmNv/bS9tb2RlbHMvMjAy/My9kb2RnZS9jaGFy/Z2VyL3RyYWRpdGlv/bmFsLzIwMjNfZG9k/Z2VfY2hhcmdlcl81/ZHItaGJ3ZW1pX3N4/dF9mdnBfMy5qcGc',
      year: '2025',
      features: ['SXT, GT, R/T trims', 'Performance-focused', 'Powerful engine options', 'Modern tech features', 'City appeal'],
      description: 'The 2025 Dodge Charger delivers exhilarating performance and head-turning style that stands out on Taylorville streets.',
      ratings: 4.7,
    },
    {
      id: 'durango',
      name: 'Dodge Durango',
      price: '$41,000',
      image: 'https://imgs.search.brave.com/iFVzC4z_7H8ZsFFq6Zl1_4D3rA5IIMnXTEvpVV5YfZQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXRhdXRvLmNv/bS9tb2RlbHMvMjAy/NC9kb2RnZS9kdXJh/bmdvL3RyYWRpdGlv/bmFsLzIwMjRfZG9k/Z2VfZHVyYW5nb181/ZHItc3V2X3IvdF9u/YXZfMS5qcGc',
      year: '2025',
      features: ['7-seat capacity', 'Towing up to 8,700 lbs', 'Family-friendly', 'AWD option', 'Great for Illinois winters'],
      description: 'The 2025 Dodge Durango SUV combines spacious comfort for families with rugged capability for Illinois weather.',
      ratings: 4.6,
    }
  ];
  
  // Active vehicle state
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  
  // Vehicle detail view handler
  const handleViewVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };
  
  // Go back handler
  const handleGoBack = () => {
    if (selectedVehicle) {
      setSelectedVehicle(null);
    } else {
      navigate('/');
    }
  };
  
  return (
    <div className="trinity-page min-h-screen overflow-y-auto pb-24">
      <BackgroundEffects currentTheme={currentTheme} />
      <IOSStatusBar />
      
      {/* Header */}
      <motion.div 
        className="px-4 pt-12 pb-4 sticky top-0 z-10 backdrop-blur-lg bg-black/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center">
          <motion.button 
            onClick={handleGoBack} 
            className="mr-3 p-2 rounded-full bg-black/20"
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft className="h-5 w-5" />
          </motion.button>
          <div>
            <h1 className="text-xl font-bold">Trinity Dodge</h1>
            <div className="flex items-center text-xs">
              <MapPin className="h-3 w-3 mr-1" />
              <span>123 Main St, Taylorville, IL</span>
            </div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex mt-4 border-b border-white/10">
          <motion.button 
            className={`flex-1 pb-2 text-sm font-medium ${activeTab === 'inventory' ? 'border-b-2 border-red-500' : ''}`}
            onClick={() => setActiveTab('inventory')}
            whileTap={{ scale: 0.95 }}
          >
            Inventory
          </motion.button>
          <motion.button 
            className={`flex-1 pb-2 text-sm font-medium ${activeTab === 'services' ? 'border-b-2 border-red-500' : ''}`}
            onClick={() => setActiveTab('services')}
            whileTap={{ scale: 0.95 }}
          >
            Services
          </motion.button>
          <motion.button 
            className={`flex-1 pb-2 text-sm font-medium ${activeTab === 'about' ? 'border-b-2 border-red-500' : ''}`}
            onClick={() => setActiveTab('about')}
            whileTap={{ scale: 0.95 }}
          >
            About
          </motion.button>
        </div>
      </motion.div>
      
      {/* Content Area */}
      <div className="px-4 pb-24">
        {/* Vehicle Detail View */}
        {selectedVehicle ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="pb-20"
          >
            <div className="relative rounded-2xl overflow-hidden mb-4">
              <img 
                src={selectedVehicle.image} 
                alt={selectedVehicle.name} 
                className="w-full h-56 object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <motion.button 
                  className="p-2 rounded-full bg-black/40 backdrop-blur-md"
                  whileTap={{ scale: 0.9 }}
                >
                  <Share2 className="h-5 w-5" />
                </motion.button>
                <motion.button 
                  className="p-2 rounded-full bg-black/40 backdrop-blur-md"
                  whileTap={{ scale: 0.9 }}
                >
                  <Star className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{selectedVehicle.name}</h2>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span className="text-xs">{selectedVehicle.year}</span>
                    <div className="mx-2 h-1 w-1 rounded-full bg-white/50"></div>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-400 mr-1" />
                      <span className="text-xs">{selectedVehicle.ratings}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">{selectedVehicle.price}</div>
                  <div className="text-xs opacity-70">Starting MSRP</div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-sm opacity-80">{selectedVehicle.description}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Features</h3>
              <div className="grid grid-cols-1 gap-2">
                {selectedVehicle.features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-center bg-white/5 backdrop-blur-md rounded-lg p-2"
                  >
                    <div className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center mr-3">
                      <Car className="h-4 w-4 text-red-500" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/50 backdrop-blur-xl border-t border-white/10">
              <div className="flex gap-2">
                <motion.button 
                  className="flex-1 bg-white/10 backdrop-blur-md rounded-xl py-3 flex justify-center items-center"
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="h-5 w-5 mr-2" />
                  <span>Call Dealer</span>
                </motion.button>
                <motion.button 
                  className="flex-1 bg-red-600 rounded-xl py-3 flex justify-center items-center"
                  whileTap={{ scale: 0.95 }}
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>Test Drive</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : (
          // Tabs Content
          <div>
            {activeTab === 'inventory' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="py-4">
                  <h2 className="text-xl font-bold mb-4">Featured Vehicles</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {featuredVehicles.map((vehicle) => (
                      <motion.div 
                        key={vehicle.id}
                        className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleViewVehicle(vehicle)}
                      >
                        <div className="relative">
                          <img 
                            src={vehicle.image} 
                            alt={vehicle.name} 
                            className="w-full h-40 object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                            <div className="flex justify-between items-end">
                              <div>
                                <h3 className="font-bold">{vehicle.name}</h3>
                                <div className="text-xs opacity-80">{vehicle.year}</div>
                              </div>
                              <div className="bg-red-600 px-2 py-1 rounded-lg text-sm font-bold">
                                {vehicle.price}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              <span className="text-sm">{vehicle.ratings}</span>
                            </div>
                            <div className="text-xs opacity-70">Taylorville's Choice</div>
                          </div>
                          <div className="text-sm opacity-80 line-clamp-2">
                            {vehicle.description}
                          </div>
                          <div className="flex justify-between items-center mt-3">
                            <div className="flex space-x-1">
                              <div className="px-2 py-1 text-xs bg-white/10 rounded-full">
                                {vehicle.features[0]}
                              </div>
                            </div>
                            <div className="text-sm text-red-400">View Details</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'services' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="py-4"
              >
                <h2 className="text-xl font-bold mb-4">Service Center</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                    <h3 className="font-bold text-lg mb-2">Maintenance Services</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                          <Info className="h-4 w-4 text-blue-500" />
                        </div>
                        <span className="text-sm">Oil Changes & Filter Replacement</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                          <Info className="h-4 w-4 text-blue-500" />
                        </div>
                        <span className="text-sm">Tire Rotation & Balancing</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                          <Info className="h-4 w-4 text-blue-500" />
                        </div>
                        <span className="text-sm">Multi-Point Vehicle Inspection</span>
                      </li>
                    </ul>
                    <motion.button 
                      className="w-full mt-4 bg-blue-600 rounded-xl py-3 flex justify-center items-center"
                      whileTap={{ scale: 0.95 }}
                    >
                      <Calendar className="h-5 w-5 mr-2" />
                      <span>Schedule Service</span>
                    </motion.button>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                    <h3 className="font-bold text-lg mb-2">Parts Department</h3>
                    <p className="text-sm opacity-80 mb-4">
                      Find genuine OEM parts for your Dodge vehicle at competitive prices.
                    </p>
                    <motion.button 
                      className="w-full bg-white/10 backdrop-blur-md rounded-xl py-3 flex justify-center items-center"
                      whileTap={{ scale: 0.95 }}
                    >
                      <MessageSquare className="h-5 w-5 mr-2" />
                      <span>Inquire About Parts</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'about' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="py-4"
              >
                <h2 className="text-xl font-bold mb-4">About Trinity Dodge</h2>
                <div className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 mb-4">
                  <img 
                    src="https://imgs.search.brave.com/pmdwzFAuDQ2T6FWUBxuaGVqJ8JsN4unuuT3f-IVr3Co/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jYXJz/aG93Y2FzZS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDEvMjAyMC1EaXN0/cmljdC1vZi1Db2x1/bWJpYS1XYXNoaW5n/dG9uLURDLUludGVy/bmF0aW9uYWwtQXV0/by1TaG93LURvZGdl/LWJvb3RoLmpwZw" 
                    alt="Trinity Dodge Dealership" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <p className="text-sm opacity-80 mb-4">
                      Trinity Dodge is Taylorville's premier Dodge dealership, serving Illinois families, farmers, and professionals with quality vehicles and exceptional service since 1985.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-3 text-red-500" />
                        <div>
                          <div className="font-medium">123 Main Street</div>
                          <div className="text-xs opacity-70">Taylorville, IL 62568</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-3 text-red-500" />
                        <div>
                          <div className="font-medium">Mon-Fri: 9AM-8PM</div>
                          <div className="text-xs opacity-70">Sat: 9AM-6PM, Sun: Closed</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 mr-3 text-red-500" />
                        <div>
                          <div className="font-medium">217-555-1234</div>
                          <div className="text-xs opacity-70">Sales & Service</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <h3 className="font-bold text-lg mb-2">Financing Options</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                        <DollarSign className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <div className="font-medium">0% APR for 60 months</div>
                        <div className="text-xs opacity-70">On select 2025 models</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                        <DollarSign className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <div className="font-medium">Lease from $499/month</div>
                        <div className="text-xs opacity-70">With $3,000 down, 36 months</div>
                      </div>
                    </div>
                  </div>
                  <motion.button 
                    className="w-full mt-4 bg-green-600 rounded-xl py-3 flex justify-center items-center"
                    whileTap={{ scale: 0.95 }}
                  >
                    <DollarSign className="h-5 w-5 mr-2" />
                    <span>Get Pre-Approved</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
      
      {/* Bottom Action Bar (when no vehicle is selected) */}
      {!selectedVehicle && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/50 backdrop-blur-xl border-t border-white/10">
          <div className="flex gap-2">
            <motion.button 
              className="flex-1 bg-white/10 backdrop-blur-md rounded-xl py-3 flex justify-center items-center"
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="h-5 w-5 mr-2" />
              <span>Call Us</span>
            </motion.button>
            <motion.button 
              className="flex-1 bg-red-600 rounded-xl py-3 flex justify-center items-center"
              whileTap={{ scale: 0.95 }}
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              <span>Chat With Us</span>
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trinity;
