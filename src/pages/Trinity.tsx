import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Car, Headphones, Map, Phone, Star, Tool, User, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import IOSStatusBar from '@/components/ios/IOSStatusBar';
import BackgroundEffects from '@/components/widgets/BackgroundEffects';
import { useTheme } from '@/context/ThemeContext';

const Trinity: React.FC = () => {
  const { currentTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('vehicles');
  
  // Vehicle data
  const vehicles = [
    {
      id: 1,
      name: "Dodge Ram 1500",
      price: "$38,000",
      image: "/lovable-uploads/832b4165-5082-4a12-9ea7-84ebd50a41a2.png",
      features: ["12,750 lbs towing", "Crew cab", "V8 engine", "4WD"],
      description: "The perfect truck for Taylorville roads and farm work. Powerful, reliable, and comfortable."
    },
    {
      id: 2,
      name: "Dodge Charger",
      price: "$32,000",
      image: "/lovable-uploads/85c5470c-e869-42d4-a384-94b139a50bf0.png",
      features: ["V6 engine", "SXT Trim", "Sporty design", "Touchscreen"],
      description: "Experience performance and style with the iconic Dodge Charger. Turn heads in Taylorville."
    },
    {
      id: 3,
      name: "Dodge Durango",
      price: "$41,000",
      image: "/lovable-uploads/c9ad08ff-68c3-4635-af88-f133d638efc9.png",
      features: ["7 seats", "8,700 lbs towing", "SUV", "AWD"],
      description: "The family-friendly SUV that doesn't compromise on power. Perfect for Illinois winters."
    }
  ];
  
  // Current active vehicle (first one by default)
  const [activeVehicle, setActiveVehicle] = useState(vehicles[0]);
  
  return (
    <div className="trinity-page min-h-screen bg-black text-white relative overflow-hidden">
      <BackgroundEffects currentTheme={currentTheme} />
      <IOSStatusBar />
      
      <div className="p-4 pb-24">
        {/* Header with back button */}
        <div className="flex items-center mb-6">
          <Link to="/">
            <motion.div 
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-black/20 backdrop-blur-lg"
            >
              <ArrowLeft className="h-5 w-5" />
            </motion.div>
          </Link>
          <h1 className="text-2xl font-bold ml-3">Trinity Dodge</h1>
        </div>
        
        {/* Tab navigation */}
        <div className="flex overflow-x-auto space-x-4 mb-6 tab-navigation">
          <button 
            className={cn("tab-button pb-2 px-1 text-sm font-medium", activeTab === 'vehicles' && "active")}
            onClick={() => setActiveTab('vehicles')}
          >
            Vehicles
          </button>
          <button 
            className={cn("tab-button pb-2 px-1 text-sm font-medium", activeTab === 'services' && "active")}
            onClick={() => setActiveTab('services')}
          >
            Services
          </button>
          <button 
            className={cn("tab-button pb-2 px-1 text-sm font-medium", activeTab === 'dealership' && "active")}
            onClick={() => setActiveTab('dealership')}
          >
            About Us
          </button>
          <button 
            className={cn("tab-button pb-2 px-1 text-sm font-medium", activeTab === 'contact' && "active")}
            onClick={() => setActiveTab('contact')}
          >
            Contact
          </button>
        </div>
        
        {/* Vehicles tab content */}
        {activeTab === 'vehicles' && (
          <div>
            {/* Current vehicle view */}
            <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-4 mb-6 border border-white/10">
              <div className="vehicle-detail-header flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{activeVehicle.name}</h2>
                <span className="vehicle-price-tag">{activeVehicle.price}</span>
              </div>
              
              <div className="mb-4 rounded-xl overflow-hidden">
                <img 
                  src={activeVehicle.image} 
                  alt={activeVehicle.name} 
                  className="w-full h-48 object-cover object-center"
                />
              </div>
              
              <p className="text-sm opacity-80 mb-4">{activeVehicle.description}</p>
              
              <div className="mb-4 flex flex-wrap gap-2">
                {activeVehicle.features.map((feature, idx) => (
                  <span key={idx} className="vehicle-feature-tag">{feature}</span>
                ))}
              </div>
              
              <div className="flex space-x-2 action-button-container">
                <motion.button 
                  className="flex-1 action-button bg-red-600 text-white rounded-xl px-4 py-2 text-sm font-medium"
                  whileTap={{ scale: 0.95 }}
                >
                  Test Drive
                </motion.button>
                <motion.button 
                  className="flex-1 action-button bg-white/10 backdrop-blur-sm text-white rounded-xl px-4 py-2 text-sm font-medium border border-white/20"
                  whileTap={{ scale: 0.95 }}
                >
                  Get Quote
                </motion.button>
              </div>
            </div>
            
            {/* Vehicle selection grid */}
            <h3 className="text-lg font-semibold mb-3">Our Inventory</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 vehicle-grid">
              {vehicles.map(vehicle => (
                <motion.div
                  key={vehicle.id}
                  className={cn(
                    "vehicle-card bg-black/20 backdrop-blur-lg rounded-2xl p-3 border",
                    activeVehicle.id === vehicle.id 
                      ? "border-red-500" 
                      : "border-white/10"
                  )}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setActiveVehicle(vehicle)}
                >
                  <div className="mb-2 rounded-xl overflow-hidden">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.name} 
                      className="w-full h-24 object-cover object-center"
                    />
                  </div>
                  <h3 className="font-medium">{vehicle.name}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm opacity-80">{vehicle.price}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-yellow-500" fill={i < 4 ? "currentColor" : "none"} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {/* Services tab content */}
        {activeTab === 'services' && (
          <div className="space-y-4">
            <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-4 border border-white/10">
              <div className="flex items-center mb-2">
                <Tool className="h-5 w-5 mr-2 text-red-500" />
                <h3 className="text-lg font-semibold">Maintenance & Repairs</h3>
              </div>
              <p className="text-sm opacity-80 mb-3">Professional service for all Dodge vehicles. Oil changes, tune-ups, and more.</p>
              <motion.button 
                className="action-button bg-white/10 backdrop-blur-sm text-white rounded-xl px-4 py-2 text-sm font-medium border border-white/20 w-full"
                whileTap={{ scale: 0.95 }}
              >
                Schedule Service
              </motion.button>
            </div>
            
            <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-4 border border-white/10">
              <div className="flex items-center mb-2">
                <Car className="h-5 w-5 mr-2 text-red-500" />
                <h3 className="text-lg font-semibold">Parts Department</h3>
              </div>
              <p className="text-sm opacity-80 mb-3">Genuine Dodge parts to keep your vehicle performing at its best.</p>
              <motion.button 
                className="action-button bg-white/10 backdrop-blur-sm text-white rounded-xl px-4 py-2 text-sm font-medium border border-white/20 w-full"
                whileTap={{ scale: 0.95 }}
              >
                Order Parts
              </motion.button>
            </div>
            
            <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-4 border border-white/10">
              <div className="flex items-center mb-2">
                <Headphones className="h-5 w-5 mr-2 text-red-500" />
                <h3 className="text-lg font-semibold">Customer Support</h3>
              </div>
              <p className="text-sm opacity-80 mb-3">Our team is ready to assist with any questions or concerns about your vehicle.</p>
              <motion.button 
                className="action-button bg-white/10 backdrop-blur-sm text-white rounded-xl px-4 py-2 text-sm font-medium border border-white/20 w-full"
                whileTap={{ scale: 0.95 }}
              >
                Contact Support
              </motion.button>
            </div>
          </div>
        )}
        
        {/* Dealership tab content */}
        {activeTab === 'dealership' && (
          <div className="space-y-4">
            <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-4 border border-white/10">
              <h3 className="text-lg font-semibold mb-3">About Trinity Dodge</h3>
              <p className="text-sm opacity-80 mb-4">
                Trinity Dodge has been serving Taylorville and the surrounding areas for over 20 years. 
                We pride ourselves on exceptional customer service and quality vehicles.
              </p>
              
              <div className="flex items-center mb-3">
                <Users className="h-5 w-5 mr-2 text-red-500" />
                <h4 className="font-medium">Our Team</h4>
              </div>
              <p className="text-sm opacity-80 mb-4">
                Our staff consists of experienced professionals who are passionate about helping 
                customers find the perfect vehicle for their needs.
              </p>
              
              <div className="flex items-center mb-3">
                <Map className="h-5 w-5 mr-2 text-red-500" />
                <h4 className="font-medium">Location</h4>
              </div>
              <p className="text-sm opacity-80">
                We're conveniently located at 123 Main Street, Taylorville, IL 62568.
                Just 30 miles southeast of Springfield.
              </p>
            </div>
            
            <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-4 border border-white/10">
              <div className="flex items-center mb-3">
                <Calendar className="h-5 w-5 mr-2 text-red-500" />
                <h4 className="font-medium">Business Hours</h4>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Monday - Friday</div>
                <div>9:00 AM - 8:00 PM</div>
                <div>Saturday</div>
                <div>10:00 AM - 6:00 PM</div>
                <div>Sunday</div>
                <div>Closed</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Contact tab content */}
        {activeTab === 'contact' && (
          <div className="space-y-4">
            <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-4 border border-white/10">
              <div className="flex items-center mb-3">
                <Phone className="h-5 w-5 mr-2 text-red-500" />
                <h4 className="font-medium">Call Us</h4>
              </div>
              <p className="text-sm opacity-80 mb-3">
                Sales: (217) 555-1234<br />
                Service: (217) 555-5678<br />
                Parts: (217) 555-9101
              </p>
              <motion.button 
                className="action-button bg-red-600 text-white rounded-xl px-4 py-2 text-sm font-medium w-full"
                whileTap={{ scale: 0.95 }}
              >
                Call Now
              </motion.button>
            </div>
            
            <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-4 border border-white/10">
              <div className="flex items-center mb-3">
                <User className="h-5 w-5 mr-2 text-red-500" />
                <h4 className="font-medium">Send a Message</h4>
              </div>
              <form className="space-y-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-2 text-sm"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-2 text-sm"
                />
                <textarea
                  placeholder="Your Message"
                  rows={3}
                  className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-2 text-sm"
                ></textarea>
                <motion.button 
                  className="action-button bg-red-600 text-white rounded-xl px-4 py-2 text-sm font-medium w-full"
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trinity;
