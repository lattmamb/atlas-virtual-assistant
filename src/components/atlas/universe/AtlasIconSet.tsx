
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Define the base icon components
export type AtlasIconName = 
  'atlasCore' | 
  'missionControl' | 
  'fleetManager' | 
  'workflows' | 
  'neuralNet' | 
  'pulseDock' | 
  'haloNotifications';

interface AtlasIconProps {
  name: AtlasIconName;
  size?: number;
  color?: string;
  secondaryColor?: string;
  animate?: boolean;
  onClick?: () => void;
  className?: string;
}

const AtlasIcon: React.FC<AtlasIconProps> = ({
  name,
  size = 40,
  color = '#0A84FF',
  secondaryColor = '#E947FF',
  animate = true,
  onClick,
  className
}) => {
  // Common animation properties
  const animations = animate ? {
    initial: { scale: 1 },
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.95 },
    transition: { duration: 0.2 }
  } : {};
  
  // Render different icons based on name
  const renderIcon = () => {
    switch (name) {
      case 'atlasCore':
        return (
          <motion.div 
            className={cn("relative", className)}
            style={{ width: size, height: size }}
            onClick={onClick}
            {...animations}
          >
            {/* Base orb */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{ 
                background: `radial-gradient(circle, ${color}, ${secondaryColor}90)`,
                boxShadow: `0 0 15px ${color}60`
              }}
            />
            
            {/* Animated radial beams */}
            {animate && (
              <>
                <motion.div 
                  className="absolute inset-0 rounded-full"
                  style={{ 
                    background: 'transparent',
                    border: `1px solid ${color}40`,
                  }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                <motion.div 
                  className="absolute inset-0 rounded-full"
                  style={{ 
                    background: 'transparent',
                    border: `1px solid ${secondaryColor}30`,
                  }}
                  animate={{ scale: [1, 1.8, 1] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.5
                  }}
                />
              </>
            )}
          </motion.div>
        );
        
      case 'missionControl':
        return (
          <motion.div 
            className={cn("relative", className)}
            style={{ width: size, height: size }}
            onClick={onClick}
            {...animations}
          >
            {/* Hexagonal grid background */}
            <div 
              className="absolute inset-0 rounded-lg"
              style={{ 
                background: `conic-gradient(from 0deg, ${color}50, ${secondaryColor}50, ${color}50)`,
                boxShadow: `0 0 10px ${color}40`
              }}
            />
            
            {/* Node points */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-1">
                {[...Array(9)].map((_, i) => (
                  <div 
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{ 
                      background: i % 2 === 0 ? color : secondaryColor,
                      boxShadow: `0 0 5px ${i % 2 === 0 ? color : secondaryColor}`
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Pulsing overlay */}
            {animate && (
              <motion.div 
                className="absolute inset-0 rounded-lg"
                style={{ background: `${color}10` }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              />
            )}
          </motion.div>
        );
        
      case 'workflows':
        return (
          <motion.div 
            className={cn("relative", className)}
            style={{ width: size, height: size }}
            onClick={onClick}
            {...animations}
          >
            {/* Background */}
            <div 
              className="absolute inset-0 rounded-lg"
              style={{ 
                background: `linear-gradient(135deg, ${color}40, ${secondaryColor}40)`,
                boxShadow: `0 0 10px ${color}30`
              }}
            />
            
            {/* Node graph */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-2/3 h-2/3">
                {/* Nodes */}
                <div 
                  className="absolute top-0 left-0 w-3 h-3 rounded-full"
                  style={{ background: color, boxShadow: `0 0 5px ${color}` }}
                />
                <div 
                  className="absolute top-1/2 right-0 w-3 h-3 rounded-full"
                  style={{ background: secondaryColor, boxShadow: `0 0 5px ${secondaryColor}` }}
                />
                <div 
                  className="absolute bottom-0 left-1/4 w-3 h-3 rounded-full"
                  style={{ background: color, boxShadow: `0 0 5px ${color}` }}
                />
                
                {/* Connecting lines */}
                <div 
                  className="absolute top-1.5 left-1.5 h-px transform rotate-45"
                  style={{ 
                    background: `linear-gradient(to right, ${color}, ${secondaryColor})`,
                    width: '60%'
                  }}
                />
                <div 
                  className="absolute bottom-1.5 left-1/4 h-px transform -rotate-45"
                  style={{ 
                    background: `linear-gradient(to right, ${secondaryColor}, ${color})`,
                    width: '60%'
                  }}
                />
              </div>
            </div>
            
            {/* Animation effect */}
            {animate && (
              <motion.div 
                className="absolute inset-0 rounded-lg"
                style={{ background: 'transparent', border: `1px solid ${color}30` }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity
                }}
              />
            )}
          </motion.div>
        );
        
      case 'neuralNet':
        return (
          <motion.div 
            className={cn("relative", className)}
            style={{ width: size, height: size }}
            onClick={onClick}
            {...animations}
          >
            {/* Background */}
            <div 
              className="absolute inset-0 rounded-lg"
              style={{ 
                background: `radial-gradient(circle, ${secondaryColor}50, ${color}30)`,
                boxShadow: `0 0 10px ${secondaryColor}30`
              }}
            />
            
            {/* Neural network visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-3/4 h-3/4">
                {/* Layers */}
                <div className="absolute left-0 inset-y-0 flex flex-col justify-around">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{ background: color }}
                    />
                  ))}
                </div>
                
                <div className="absolute left-1/3 inset-y-0 flex flex-col justify-around">
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{ background: secondaryColor }}
                    />
                  ))}
                </div>
                
                <div className="absolute left-2/3 inset-y-0 flex flex-col justify-around">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{ background: color }}
                    />
                  ))}
                </div>
                
                <div className="absolute right-0 inset-y-0 flex flex-col justify-around">
                  {[...Array(2)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{ background: secondaryColor }}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Animation */}
            {animate && (
              <motion.div 
                className="absolute inset-0 rounded-lg opacity-50"
                style={{ background: `${secondaryColor}10` }}
                animate={{ 
                  background: [
                    `${secondaryColor}10`,
                    `${color}20`,
                    `${secondaryColor}10`,
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity
                }}
              />
            )}
          </motion.div>
        );
        
      case 'haloNotifications':
        return (
          <motion.div 
            className={cn("relative", className)}
            style={{ width: size, height: size }}
            onClick={onClick}
            {...animations}
          >
            {/* Beacon background */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{ 
                background: `radial-gradient(circle, ${color}70, ${secondaryColor}20)`,
                boxShadow: `0 0 15px ${color}40`
              }}
            />
            
            {/* Halo rings */}
            {animate && (
              <>
                <motion.div 
                  className="absolute inset-0 rounded-full"
                  style={{ 
                    border: `1px solid ${color}50`
                  }}
                  animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
                <motion.div 
                  className="absolute inset-0 rounded-full"
                  style={{ 
                    border: `1px solid ${secondaryColor}40`
                  }}
                  animate={{ scale: [1, 1.8], opacity: [1, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: 0.5
                  }}
                />
              </>
            )}
            
            {/* Central dot */}
            <div 
              className="absolute inset-0 flex items-center justify-center"
            >
              <div 
                className="w-1/4 h-1/4 rounded-full"
                style={{ 
                  background: color,
                  boxShadow: `0 0 10px ${color}`
                }}
              />
            </div>
          </motion.div>
        );
        
      // Add other icons as needed
      default:
        return (
          <motion.div 
            className={cn("relative", className)}
            style={{ width: size, height: size }}
            onClick={onClick}
            {...animations}
          >
            <div 
              className="absolute inset-0 rounded-lg"
              style={{ 
                background: `linear-gradient(135deg, ${color}, ${secondaryColor})`,
                boxShadow: `0 0 10px ${color}40`
              }}
            />
          </motion.div>
        );
    }
  };
  
  return renderIcon();
};

export default AtlasIcon;
