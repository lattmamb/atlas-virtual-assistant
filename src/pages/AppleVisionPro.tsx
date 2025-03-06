
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
import AppSidebar from '@/components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';
import IOSStatusBarContent from '@/components/ios/IOSStatusBarContent';

const AppleVisionPro = () => {
  const { isDarkMode } = useTheme();
  const isMobile = useIsMobile();
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
    <SidebarProvider defaultOpen={!isMobile}>
      <motion.div 
        className={cn(
          "relative min-h-screen w-full overflow-x-hidden",
          isDarkMode ? "text-white" : "text-gray-900"
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* iOS Status Bar */}
        <IOSStatusBarContent isDarkMode={isDarkMode} />
        
        {/* App Sidebar */}
        <AppSidebar activePage="applevisionpro" />
        
        {/* Content */}
        <div className="relative z-10 pt-11">
          <AppleNavBar />
          
          <motion.main 
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Hero Section */}
            <HeroSection />
            
            {/* Parallax Features Section */}
            <ParallaxSection scrollY={scrollY} />
            
            {/* Features Grid */}
            <FeaturesSection />
            
            {/* Pricing Section */}
            <PricingSection />
          </motion.main>
          
          {/* Footer */}
          <footer className="py-8 px-4 text-center">
            <div className="max-w-7xl mx-auto">
              <p className="text-sm opacity-70">
                © {new Date().getFullYear()} Apple Vision Pro. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
        
        {/* iOS Home Indicator */}
        <div className="ios-home-indicator" />
      </motion.div>
    </SidebarProvider>
  );
};

export default AppleVisionPro;
