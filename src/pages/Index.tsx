
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ThreeDCardDemo } from '@/components/ThreeDCardDemo';
import { GlowMenuDemo } from '@/components/ui/glow-menu-demo';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

const Index = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={cn(
      "min-h-screen w-full p-4",
      isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
    )}>
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-2">Atlas Assistant</h1>
          <p className="text-xl text-muted-foreground">Trinity Dodge - Taylorville, Illinois</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <h2 className="text-2xl font-bold mb-4">Interactive Components</h2>
            <Card className="p-4">
              <h3 className="text-xl font-medium mb-4">Glow Menu</h3>
              <GlowMenuDemo />
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-4">3D Hover Card</h2>
            <ThreeDCardDemo />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;
