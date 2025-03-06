
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import HeroTitle from './hero/HeroTitle';
import HeroContent from './hero/HeroContent';
import Product3DView from './hero/Product3DView';

const HeroSection: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <motion.section 
      className={cn(
        "min-h-[100dvh] w-full flex flex-col items-center justify-center",
        "px-4 sm:px-6 pt-[80px] pb-24"
      )}
    >
      <div className="max-w-5xl mx-auto text-center z-10">
        <HeroTitle />
        <HeroContent />
      </div>
      
      <Product3DView />
    </motion.section>
  );
};

export default HeroSection;
