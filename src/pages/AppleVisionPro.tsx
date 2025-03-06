
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import HeroSection from '@/components/applevision/HeroSection';
import ParallaxSection from '@/components/applevision/ParallaxSection';
import FeaturesSection from '@/components/applevision/FeaturesSection';
import PricingSection from '@/components/applevision/PricingSection';
import AppleNavBar from '@/components/applevision/AppleNavBar';
import { toast } from 'sonner';

const AppleVisionPro = () => {
  const { isDarkMode } = useTheme();
  const [scrollY, setScrollY] = useState(0);

  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Display welcome toast
  useEffect(() => {
    setTimeout(() => {
      toast.success("Welcome to Apple Vision Pro", {
        description: "Experience the future of augmented reality",
        icon: <Sparkles className="h-5 w-5" />,
        duration: 5000,
      });
    }, 1500);
  }, []);

  return (
    <div className={cn(
      "relative w-full overflow-x-hidden content-area interactive-element",
      isDarkMode ? "text-white" : "text-gray-900"
    )}>
      {/* Content */}
      <div className="relative z-10">
        <AppleNavBar />
        
        <main className="flex flex-col items-center">
          {/* Main Content */}
          <div className="w-full">
            {/* Hero Section */}
            <HeroSection />
            
            {/* Parallax Features Section */}
            <ParallaxSection scrollY={scrollY} />
            
            {/* Features Grid */}
            <FeaturesSection />
            
            {/* Pricing Section */}
            <PricingSection />
          </div>
        </main>
        
        {/* Footer */}
        <footer className="py-8 px-4 text-center">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm opacity-70">
              © {new Date().getFullYear()} Apple Vision Pro. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AppleVisionPro;
