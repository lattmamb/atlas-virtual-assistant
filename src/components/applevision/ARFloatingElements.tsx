
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  type: 'particle' | 'icon' | 'data';
  icon?: string;
  label?: string;
}

interface ARFloatingElementsProps {
  scrollY: number;
  density?: 'low' | 'medium' | 'high';
}

const generateElements = (density: 'low' | 'medium' | 'high'): FloatingElement[] => {
  const count = density === 'low' ? 15 : density === 'medium' ? 30 : 50;
  const elements: FloatingElement[] = [];
  
  const types = ['particle', 'particle', 'particle', 'icon', 'data'];
  const icons = ['✉️', '🔔', '📱', '🌐', '⚙️', '📊', '📈', '🔍'];
  const labels = ['Mail', 'Notifications', 'Messages', 'Safari', 'Settings', 'Analytics', 'Performance', 'Search'];
  
  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    elements.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: type === 'particle' ? 2 + Math.random() * 4 : 20 + Math.random() * 20,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 20,
      type,
      icon: type === 'icon' ? icons[Math.floor(Math.random() * icons.length)] : undefined,
      label: type === 'data' ? labels[Math.floor(Math.random() * labels.length)] : undefined
    });
  }
  
  return elements;
};

const ARFloatingElements: React.FC<ARFloatingElementsProps> = ({ scrollY, density = 'medium' }) => {
  const { isDarkMode } = useTheme();
  const elements = useRef<FloatingElement[]>(generateElements(density));
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.current.map((element) => (
        <motion.div
          key={element.id}
          className={cn(
            "absolute rounded-full pointer-events-none",
            element.type === 'particle' ? 'opacity-30' : 'opacity-70'
          )}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: element.type === 'particle' ? `${element.size}px` : `${element.size}px`,
            height: element.type === 'particle' ? `${element.size}px` : `${element.size}px`,
            background: element.type === 'particle' 
              ? isDarkMode 
                ? `radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)` 
                : `radial-gradient(circle, rgba(0,122,255,0.3) 0%, rgba(0,122,255,0) 70%)`
              : 'transparent',
            transform: `translateY(${scrollY * (0.1 + Math.random() * 0.2)}px)`,
            zIndex: element.type === 'particle' ? 0 : 10
          }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: element.type === 'particle' ? 0.3 : 0.7,
            x: [0, Math.random() * 30 - 15, 0],
            y: [0, Math.random() * 30 - 15, 0]
          }}
          transition={{ 
            delay: element.delay,
            duration: element.duration, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          {element.type === 'icon' && (
            <div className="w-full h-full flex items-center justify-center text-xl">
              {element.icon}
            </div>
          )}
          
          {element.type === 'data' && (
            <div className={cn(
              "flex flex-col items-center justify-center",
              "px-3 py-2 rounded-lg backdrop-blur-sm",
              isDarkMode ? "bg-white/10" : "bg-black/5",
              isDarkMode ? "text-white" : "text-black"
            )}>
              <span className="text-xs font-medium">{element.label}</span>
              <span className="text-xs opacity-70">
                {Math.floor(Math.random() * 100)}
              </span>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default ARFloatingElements;
