
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { Eye, Monitor, Brain, Layers } from 'lucide-react';

interface ParallaxSectionProps {
  scrollY: number;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ scrollY }) => {
  const { isDarkMode } = useTheme();

  const features = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Immersive Visuals",
      description: "Ultra-high resolution displays that render content with stunning clarity and depth.",
      parallaxFactor: 0.15,
      delay: 0,
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Infinite Workspace",
      description: "Transform any space into a personalized workspace with unlimited virtual screens.",
      parallaxFactor: 0.2,
      delay: 0.1,
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Spatial Computing",
      description: "Interact with digital content as naturally as you interact with physical objects.",
      parallaxFactor: 0.25,
      delay: 0.2,
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Seamless Integration",
      description: "Works seamlessly with your existing Apple devices and ecosystem of apps.",
      parallaxFactor: 0.3,
      delay: 0.3,
    }
  ];

  return (
    <section className="relative py-20 w-full px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className={cn(
              "text-3xl sm:text-4xl font-bold",
              isDarkMode ? "text-white" : "text-gray-900"
            )}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            Redefine What's Possible
          </motion.h2>
          
          <motion.div 
            className="h-1 w-20 mx-auto mt-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 80, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={cn(
                "relative rounded-2xl p-6 overflow-hidden group",
                "backdrop-blur-lg border",
                isDarkMode 
                  ? "bg-white/5 border-white/10 hover:bg-white/10" 
                  : "bg-white/70 border-black/5 hover:bg-white/90",
                "transition-all duration-500"
              )}
              style={{
                transform: `translateY(${scrollY * feature.parallaxFactor}px)`,
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 + index * 0.1 }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <div className={cn(
                "absolute top-0 left-0 w-full h-1",
                "bg-gradient-to-r from-transparent via-blue-500/50 to-transparent",
                "opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              )} />
              
              <div className="mb-4 text-blue-500">
                {feature.icon}
              </div>
              
              <h3 className={cn(
                "text-xl font-semibold mb-3",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>
                {feature.title}
              </h3>
              
              <p className={cn(
                "text-sm",
                isDarkMode ? "text-gray-300" : "text-gray-600"
              )}>
                {feature.description}
              </p>
              
              <div className={cn(
                "absolute bottom-0 left-0 w-full h-1",
                "bg-gradient-to-r from-transparent via-purple-500/50 to-transparent",
                "opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              )} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParallaxSection;
