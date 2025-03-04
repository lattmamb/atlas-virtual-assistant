
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  index = 0
}) => {
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div
      className={cn(
        "p-6 rounded-xl relative overflow-hidden",
        "backdrop-blur-lg border",
        isDarkMode 
          ? "bg-white/5 border-white/10 shadow-xl" 
          : "bg-black/5 border-black/10 shadow-lg"
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div 
        className={cn(
          "absolute top-0 right-0 -mt-8 -mr-8",
          "w-24 h-24 rounded-full blur-2xl opacity-30",
          isDarkMode ? "bg-blue-500" : "bg-indigo-500"
        )} 
      />
      
      <div className="relative">
        <div 
          className={cn(
            "mb-4 w-12 h-12 flex items-center justify-center rounded-lg",
            isDarkMode ? "bg-white/10" : "bg-black/5"
          )}
        >
          {icon}
        </div>
        
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        
        <p className={cn(
          "text-sm",
          isDarkMode ? "text-white/70" : "text-black/70"
        )}>
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
