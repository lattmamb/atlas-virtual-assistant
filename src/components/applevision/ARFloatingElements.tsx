
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { Sparkles, Zap, Globe, Bot, Cloud, Database } from 'lucide-react';

type ElementType = 'icon' | 'data' | 'particle';

interface FloatingElement {
  id: string;
  x: string;
  y: string;
  size: number;
  type: ElementType;
  content?: React.ReactNode;
  delay?: number;
}

const ARFloatingElements: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  const floatingElements: FloatingElement[] = [
    {
      id: 'element1',
      x: '10%',
      y: '20%',
      size: 40,
      type: 'icon',
      content: <Sparkles className="text-blue-400" />,
      delay: 0.2
    },
    {
      id: 'element2',
      x: '80%',
      y: '15%',
      size: 36,
      type: 'icon',
      content: <Globe className="text-purple-400" />,
      delay: 0.7
    },
    {
      id: 'element3',
      x: '70%',
      y: '70%',
      size: 44,
      type: 'icon',
      content: <Bot className="text-cyan-400" />,
      delay: 1.1
    },
    {
      id: 'element4',
      x: '25%',
      y: '65%',
      size: 38,
      type: 'icon',
      content: <Cloud className="text-pink-400" />,
      delay: 0.5
    },
    {
      id: 'element5',
      x: '45%',
      y: '35%',
      size: 32,
      type: 'data',
      content: <div className="text-xs font-mono">U-N-I</div>,
      delay: 0.9
    },
    {
      id: 'element6',
      x: '60%',
      y: '50%',
      size: 34,
      type: 'data',
      content: <div className="text-xs font-mono">Vision Pro</div>,
      delay: 1.3
    },
    {
      id: 'element7',
      x: '15%',
      y: '40%',
      size: 28,
      type: 'data',
      content: <Zap className="text-amber-400" />,
      delay: 0.4
    },
    {
      id: 'element8',
      x: '85%',
      y: '85%',
      size: 30,
      type: 'particle',
      delay: 0.3
    },
    {
      id: 'element9',
      x: '30%',
      y: '90%',
      size: 26,
      type: 'particle',
      delay: 0.8
    }
  ];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className={cn(
            "absolute rounded-full flex items-center justify-center",
            element.type === 'icon' && "backdrop-blur-sm border",
            element.type === 'data' && "backdrop-blur-md border",
            element.type === 'particle' && "backdrop-blur-sm bg-gradient-to-br",
            isDarkMode 
              ? "border-white/10 from-white/5 to-transparent" 
              : "border-black/10 from-black/5 to-transparent"
          )}
          style={{
            left: element.x,
            top: element.y,
            width: element.size,
            height: element.size,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: element.type === 'particle' ? 0.4 : 0.8, 
            scale: 1,
            x: [0, 10, -10, 0],
            y: [0, -10, 10, 0]
          }}
          transition={{
            duration: 8,
            delay: element.delay,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {element.content}
        </motion.div>
      ))}
    </div>
  );
};

export default ARFloatingElements;
