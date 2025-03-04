
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { 
  Film, 
  Phone, 
  Clock, 
  Users, 
  Headphones,
  Glasses
} from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const { isDarkMode } = useTheme();

  const featuresList = [
    {
      title: "Entertainment",
      description: "Experience movies and games with a massive screen that wraps around you.",
      icon: <Film className="h-6 w-6" />,
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Communication",
      description: "Video calls feel like you're in the same room with spatial audio and 3D rendering.",
      icon: <Phone className="h-6 w-6" />,
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "Productivity",
      description: "Create a multi-display workspace anywhere you go with infinite screen space.",
      icon: <Clock className="h-6 w-6" />,
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: "Social",
      description: "Share experiences in real-time with friends and family across the globe.",
      icon: <Users className="h-6 w-6" />,
      color: "from-orange-500 to-red-600"
    },
    {
      title: "Audio",
      description: "Spatial audio creates a soundscape that perfectly matches your visual environment.",
      icon: <Headphones className="h-6 w-6" />,
      color: "from-cyan-500 to-blue-600"
    },
    {
      title: "Comfort",
      description: "Lightweight design with balanced weight distribution for all-day wear.",
      icon: <Glasses className="h-6 w-6" />,
      color: "from-violet-500 to-purple-600"
    }
  ];

  return (
    <section className={cn(
      "py-20 px-4 sm:px-6 relative",
      isDarkMode 
        ? "bg-black/30 backdrop-blur-xl" 
        : "bg-white/50 backdrop-blur-lg"
    )}>
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
            Unlimited Possibilities
          </h2>
          
          <p className={cn(
            "mt-4 text-xl max-w-3xl mx-auto",
            isDarkMode ? "text-gray-300" : "text-gray-600"
          )}>
            Discover how Apple Vision Pro transforms the way you work, play, and connect.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feature, index) => (
            <motion.div
              key={index}
              className={cn(
                "rounded-2xl overflow-hidden",
                "group transition-all duration-300",
                isDarkMode 
                  ? "bg-white/5 hover:bg-white/10 border border-white/10" 
                  : "bg-white/60 hover:bg-white/80 border border-white/30",
                "backdrop-blur-lg"
              )}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="h-2 bg-gradient-to-r w-full" style={{ 
                backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`, 
                '--tw-gradient-from': `${feature.color.split(' ')[0].split('-')[1]}`,
                '--tw-gradient-to': `${feature.color.split(' ')[1].split('-')[1]}`,
              }}></div>
              
              <div className="p-6">
                <div className={cn(
                  "inline-flex items-center justify-center rounded-xl p-3 mb-4",
                  `bg-gradient-to-br ${feature.color} text-white`
                )}>
                  {feature.icon}
                </div>
                
                <h3 className={cn(
                  "text-xl font-semibold mb-3",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>
                  {feature.title}
                </h3>
                
                <p className={cn(
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
