
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

interface SpecItemProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  index?: number;
}

const SpecItem: React.FC<SpecItemProps> = ({ label, value, icon, index = 0 }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div 
      className={cn(
        "flex items-center space-x-4 p-4 rounded-lg",
        isDarkMode ? "bg-white/5" : "bg-black/5"
      )}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {icon && (
        <div className={cn(
          "flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full",
          isDarkMode ? "bg-white/10" : "bg-black/10"
        )}>
          {icon}
        </div>
      )}
      <div>
        <p className={cn(
          "text-xs font-medium",
          isDarkMode ? "text-white/50" : "text-black/50"
        )}>
          {label}
        </p>
        <p className="text-sm font-semibold mt-1">{value}</p>
      </div>
    </motion.div>
  );
};

const VisionProSpecs: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <SpecItem 
        label="Display"
        value="Micro-OLED with 23 million pixels"
        icon={<span className="text-lg">📱</span>}
        index={0}
      />
      <SpecItem 
        label="Processor"
        value="M2 chip with 16-core Neural Engine"
        icon={<span className="text-lg">⚡</span>}
        index={1}
      />
      <SpecItem 
        label="Audio"
        value="Spatial Audio with dynamic head tracking"
        icon={<span className="text-lg">🔊</span>}
        index={2}
      />
      <SpecItem 
        label="Battery Life"
        value="Up to 2.5 hours on single charge"
        icon={<span className="text-lg">🔋</span>}
        index={3}
      />
      <SpecItem 
        label="Connectivity"
        value="Wi-Fi 6E, Bluetooth 5.3, USB-C"
        icon={<span className="text-lg">📶</span>}
        index={4}
      />
      <SpecItem 
        label="Weight"
        value="600 grams (1.3 lbs)"
        icon={<span className="text-lg">⚖️</span>}
        index={5}
      />
    </div>
  );
};

export default VisionProSpecs;
