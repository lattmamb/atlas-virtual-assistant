
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import SplashCursor from '@/components/effects/SplashCursor';
import HeroSection from '@/components/applevision/HeroSection';
import ParallaxSection from '@/components/applevision/ParallaxSection';
import FeaturesSection from '@/components/applevision/FeaturesSection';
import PricingSection from '@/components/applevision/PricingSection';
import AppleNavBar from '@/components/applevision/AppleNavBar';
import AppSidebar from '@/components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';

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
      <div className={cn(
        "relative min-h-screen w-full overflow-x-hidden",
        isDarkMode ? "text-white" : "text-gray-900"
      )}>
        {/* SplashCursor instead of AR Background */}
        <SplashCursor 
          BACK_COLOR={{ r: 0.0, g: 0.0, b: 0.15 }}
          SPLAT_RADIUS={0.25}
          DENSITY_DISSIPATION={3.0}
          TRANSPARENT={true}
        />
        
        {/* App Sidebar */}
        <AppSidebar activePage="applevisionpro" />
        
        {/* Content */}
        <div className="relative z-10">
          <AppleNavBar />
          
          <main className="flex flex-col items-center">
            {/* Hero Section */}
            <HeroSection />
            
            {/* Parallax Features Section */}
            <ParallaxSection scrollY={scrollY} />
            
            {/* Features Grid */}
            <FeaturesSection />
            
            {/* Pricing Section */}
            <PricingSection />
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
    </SidebarProvider>
  );
};

export default AppleVisionPro;
