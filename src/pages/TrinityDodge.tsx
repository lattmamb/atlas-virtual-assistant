
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Car, Calendar, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

const TrinityDodge: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className={cn(
      "min-h-screen",
      isDarkMode 
        ? "bg-gradient-to-b from-[#1a0505] to-[#2a0808]" 
        : "bg-gradient-to-b from-[#fff5f5] to-[#ffe0e0]",
      isDarkMode ? "text-white" : "text-gray-900"
    )}>
      <header className="p-6">
        <Link to="/">
          <motion.div 
            className={cn(
              "flex items-center", 
              isDarkMode ? "text-white/70 hover:text-white" : "text-gray-700 hover:text-gray-900"
            )}
            whileHover={{ x: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            <span>Back to Explore</span>
          </motion.div>
        </Link>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <motion.div 
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Trinity Dodge</h1>
            <p className="text-xl max-w-2xl mx-auto mb-8 opacity-80">
              Explore premium vehicle offerings in Taylorville, Illinois. Trinity Dodge offers the latest models with exceptional service.
            </p>
          </motion.div>
          
          <motion.div 
            variants={fadeInUp}
            className={cn(
              "p-8 rounded-2xl backdrop-blur-md border mx-auto mb-12",
              isDarkMode 
                ? "bg-white/5 border-white/10" 
                : "bg-white/50 border-gray-200/30",
              "max-w-3xl"
            )}
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
                <p className="opacity-80 mb-6">Our premium vehicle showcase is under development. Experience the next generation of Trinity Dodge innovation, coming to Atlas in 2025.</p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      isDarkMode ? "bg-red-900/30" : "bg-red-100"
                    )}>
                      <MapPin className={isDarkMode ? "text-red-400" : "text-red-600"} size={18} />
                    </div>
                    <div>
                      <p className="font-medium">123 Main Street</p>
                      <p className="opacity-70 text-sm">Taylorville, IL 62568</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      isDarkMode ? "bg-red-900/30" : "bg-red-100"
                    )}>
                      <Phone className={isDarkMode ? "text-red-400" : "text-red-600"} size={18} />
                    </div>
                    <div>
                      <p className="font-medium">217-555-1234</p>
                      <p className="opacity-70 text-sm">Sales & Service</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      isDarkMode ? "bg-red-900/30" : "bg-red-100"
                    )}>
                      <Calendar className={isDarkMode ? "text-red-400" : "text-red-600"} size={18} />
                    </div>
                    <div>
                      <p className="font-medium">Mon-Sat: 9AM-7PM</p>
                      <p className="opacity-70 text-sm">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-1/2 flex justify-center">
                <motion.div
                  className="relative w-64 h-64"
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                  }}
                >
                  <Car size={64} className={cn(
                    "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
                    isDarkMode ? "text-red-500" : "text-red-600"
                  )} />
                  <div className={cn(
                    "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full opacity-30 blur-xl",
                    isDarkMode ? "bg-red-600" : "bg-red-300"
                  )} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default TrinityDodge;
