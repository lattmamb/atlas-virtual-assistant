
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { Check, Sparkles } from 'lucide-react';

const PricingSection: React.FC = () => {
  const { isDarkMode } = useTheme();

  const plans = [
    {
      name: "Vision Pro",
      price: "$3,499",
      description: "The complete Apple Vision Pro experience",
      features: [
        "256GB Storage",
        "Dual 4K Micro-OLED Displays",
        "M2 & R1 Chips",
        "Eye Tracking & Hand Gesture Control",
        "Spatial Audio with Dynamic Head Tracking",
        "1-year Apple Care",
      ],
      isPopular: false,
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      name: "Vision Pro Max",
      price: "$4,299",
      description: "Ultimate performance with expanded capabilities",
      features: [
        "512GB Storage",
        "Ultra High Resolution Retina Displays",
        "M2 Pro & R1 Chips",
        "Enhanced Eye & Gesture Control",
        "Premium Spatial Audio System",
        "2-year Apple Care+",
        "Priority Support",
      ],
      isPopular: true,
      gradient: "from-purple-500 to-pink-600",
    },
    {
      name: "Vision Pro Enterprise",
      price: "$5,999",
      description: "For business and professional applications",
      features: [
        "1TB Storage",
        "Maximum Resolution Displays",
        "M2 Max & R1 Chips",
        "Advanced Control System",
        "Studio-Quality Spatial Audio",
        "3-year AppleCare for Enterprise",
        "24/7 Dedicated Support",
        "Enterprise Integration Tools",
      ],
      isPopular: false,
      gradient: "from-emerald-500 to-teal-600",
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={cn(
            "text-3xl sm:text-4xl font-bold",
            isDarkMode ? "text-white" : "text-gray-900"
          )}>
            Choose Your Experience
          </h2>
          
          <p className={cn(
            "mt-4 text-xl max-w-3xl mx-auto",
            isDarkMode ? "text-gray-300" : "text-gray-600"
          )}>
            Select the Apple Vision Pro that's right for you.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={cn(
                "relative rounded-2xl overflow-hidden",
                "transition-all duration-500",
                isDarkMode 
                  ? "bg-white/5 border border-white/10" 
                  : "bg-white/60 border border-white/30",
                "backdrop-blur-lg",
                plan.isPopular && "transform z-10 scale-105 shadow-xl"
              )}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 } 
              }}
            >
              {plan.isPopular && (
                <div className={cn(
                  "absolute top-0 left-0 right-0 py-1 text-xs font-medium text-white text-center",
                  `bg-gradient-to-r ${plan.gradient}`
                )}>
                  <div className="flex items-center justify-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    MOST POPULAR
                    <Sparkles className="h-3 w-3" />
                  </div>
                </div>
              )}
              
              <div className={cn(
                "p-6",
                plan.isPopular && "pt-8"
              )}>
                <h3 className={cn(
                  "text-xl font-semibold",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>
                  {plan.name}
                </h3>
                
                <p className={cn(
                  "mt-1 text-sm",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  {plan.description}
                </p>
                
                <div className="mt-4 mb-6">
                  <span className={cn(
                    "text-4xl font-bold",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>
                    {plan.price}
                  </span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className={cn(
                        "h-5 w-5 mr-2 flex-shrink-0",
                        isDarkMode ? "text-green-400" : "text-green-600"
                      )} />
                      <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <button className={cn(
                  "w-full py-3 px-4 rounded-lg font-medium",
                  "transition-all duration-300",
                  isDarkMode 
                    ? `bg-gradient-to-r ${plan.gradient} text-white hover:opacity-90` 
                    : `bg-gradient-to-r ${plan.gradient} text-white hover:opacity-90`
                )}>
                  Pre-Order Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.p 
          className={cn(
            "text-center mt-10 text-sm",
            isDarkMode ? "text-gray-400" : "text-gray-600"
          )}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          All plans include free shipping and 14-day return policy. 
          Taxes may apply depending on your location.
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
