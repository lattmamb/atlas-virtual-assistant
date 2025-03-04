
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/context/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSwipeable } from '@/hooks/use-swipeable';

// AR Background Components
import ARBackground from '@/components/applevision/ARBackground';
import ARFloatingElements from '@/components/applevision/ARFloatingElements';
import ARHeader from '@/components/applevision/ARHeader';
import ARFooter from '@/components/applevision/ARFooter';

// Page Components
import HeroSection from '@/components/applevision/HeroSection';
import FeaturesSection from '@/components/applevision/FeaturesSection';
import ParallaxSection from '@/components/applevision/ParallaxSection';
import PricingSection from '@/components/applevision/PricingSection';
import ChatRoomPanel from '@/components/universe/ChatRoomPanel';
import AtlasPanel from '@/components/universe/AtlasPanel';
import WorkflowPanel from '@/components/universe/WorkflowPanel';
import SettingsPanel from '@/components/universe/SettingsPanel';
import SectionIndicator from '@/components/universe/SectionIndicator';

// Effects
import { LampEffect } from '@/components/ui/LampEffect';
import { GooeyText } from '@/components/ui/GooeyText';
import { SparklesCore } from '@/components/ui/sparkles';
import { StarBorder } from '@/components/ui/starBorder';

// Types
import { UniverseComponentProps } from '@/lib/types';

// Interface for section configuration
interface SectionConfig {
  id: string;
  title: string;
  component: React.ComponentType<UniverseComponentProps>;
  background?: boolean;
  glassmorphism?: boolean;
}

const UnifiedPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const isMobile = useIsMobile();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  // Define all app sections
  const sections: SectionConfig[] = [
    { id: 'vision', title: 'Vision Pro', component: HeroSection, background: true },
    { id: 'features', title: 'Features', component: FeaturesSection, background: true },
    { id: 'parallax', title: 'Experience', component: ParallaxSection, background: true },
    { id: 'pricing', title: 'Pricing', component: PricingSection, background: true },
    { id: 'chat', title: 'Chat', component: ChatRoomPanel, glassmorphism: true },
    { id: 'atlas', title: 'Atlas', component: AtlasPanel, glassmorphism: true },
    { id: 'workflow', title: 'Workflows', component: WorkflowPanel, glassmorphism: true },
    { id: 'settings', title: 'Settings', component: SettingsPanel, glassmorphism: true },
  ];

  // Swipe handler for mobile navigation
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNextSection(),
    onSwipedRight: () => handlePrevSection(),
  });

  // Welcome toast
  useEffect(() => {
    setTimeout(() => {
      toast.success("Welcome to the Future", {
        description: "Navigate between sections with the arrows or swipe",
        icon: <Sparkles className="h-5 w-5" />,
        duration: 5000,
      });
    }, 1500);
  }, []);

  // Simulated parallax effect for AR sections
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentSectionIndex < 4) { // Only for AR sections
        setScrollY(prev => (prev < 300 ? prev + 0.5 : 0));
      } else {
        setScrollY(0);
      }
    }, 30);
    
    return () => clearInterval(interval);
  }, [currentSectionIndex]);

  // Hide scroll indicator after delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowScrollIndicator(false);
    }, 8000);
    
    return () => clearTimeout(timeout);
  }, []);

  // Section navigation
  const handlePrevSection = () => {
    setCurrentSectionIndex(prev => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextSection = () => {
    setCurrentSectionIndex(prev => (prev < sections.length - 1 ? prev + 1 : prev));
  };

  const goToSection = (index: number) => {
    setCurrentSectionIndex(index);
  };

  // Get current section component
  const CurrentSectionComponent = sections[currentSectionIndex].component;
  const showBackground = sections[currentSectionIndex].background || false;
  const useGlassmorphism = sections[currentSectionIndex].glassmorphism || false;

  return (
    <div 
      className={cn(
        "relative min-h-screen w-full overflow-hidden",
        isDarkMode ? "text-white" : "text-gray-900"
      )}
      {...swipeHandlers}
    >
      {/* AR Background */}
      {showBackground && (
        <>
          <ARBackground scrollY={scrollY} />
          <ARFloatingElements scrollY={scrollY} />
        </>
      )}
      
      {/* Glassmorphism Background for non-AR sections */}
      {useGlassmorphism && (
        <div className="fixed inset-0 z-0">
          <div className={cn(
            "absolute inset-0",
            isDarkMode 
              ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" 
              : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
          )} />
          
          <LampEffect className="absolute inset-0 opacity-40" subtle={!isDarkMode} />
          
          <div className="absolute inset-0 opacity-20">
            <SparklesCore
              id="unified-sparkles"
              background="transparent"
              minSize={0.5}
              maxSize={1.5}
              particleColor={isDarkMode ? "#ffffff" : "#000000"}
              particleDensity={50}
              speed={0.1}
              className="w-full h-full"
            />
          </div>
          
          <div className={cn(
            "absolute inset-0 opacity-20",
            "bg-[linear-gradient(to_right,#8883_1px,transparent_1px),linear-gradient(to_bottom,#8883_1px,transparent_1px)]",
            "bg-[size:4rem_4rem]"
          )} />
        </div>
      )}
      
      <div className="relative z-10">
        {/* Header */}
        <ARHeader scrollY={scrollY} />
        
        {/* Main Content */}
        <main className="flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSectionIndex}
              className="min-h-[calc(100vh-120px)] w-full flex items-center justify-center"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              {useGlassmorphism ? (
                <div className={cn(
                  "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
                  "bg-white/10 dark:bg-black/10 backdrop-blur-xl",
                  "border border-white/20 dark:border-white/10",
                  "rounded-2xl my-8",
                  "shadow-xl"
                )}>
                  <StarBorder highlighted={currentSectionIndex === 6} className="h-full">
                    <CurrentSectionComponent scrollY={scrollY} />
                  </StarBorder>
                </div>
              ) : (
                <CurrentSectionComponent scrollY={scrollY} />
              )}
            </motion.div>
          </AnimatePresence>
          
          {/* Scroll Down Indicator - Only on first section */}
          {currentSectionIndex === 0 && showScrollIndicator && (
            <motion.div
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.5 }}
              exit={{ opacity: 0 }}
            >
              <motion.p
                className="text-sm font-light mb-2 text-white/70"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                Scroll Down
              </motion.p>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ChevronDown className="w-5 h-5 text-white/70" />
              </motion.div>
            </motion.div>
          )}
          
          {/* Section Navigation */}
          <div className="fixed bottom-8 left-0 right-0 flex justify-center items-center gap-4 z-20">
            <motion.button
              className={cn(
                "p-2 rounded-full backdrop-blur-md border",
                "shadow-lg",
                isDarkMode 
                  ? "bg-black/40 border-white/20 text-white" 
                  : "bg-white/40 border-black/10 text-black",
                currentSectionIndex === 0 && "opacity-50 cursor-not-allowed"
              )}
              whileHover={{ scale: currentSectionIndex > 0 ? 1.1 : 1 }}
              whileTap={{ scale: currentSectionIndex > 0 ? 0.95 : 1 }}
              onClick={handlePrevSection}
              disabled={currentSectionIndex === 0}
            >
              <ArrowLeft className="h-6 w-6" />
            </motion.button>
            
            <SectionIndicator 
              sections={sections} 
              currentIndex={currentSectionIndex}
              onSelectSection={goToSection}
            />
            
            <motion.button
              className={cn(
                "p-2 rounded-full backdrop-blur-md border",
                "shadow-lg",
                isDarkMode 
                  ? "bg-black/40 border-white/20 text-white" 
                  : "bg-white/40 border-black/10 text-black",
                currentSectionIndex === sections.length - 1 && "opacity-50 cursor-not-allowed"
              )}
              whileHover={{ scale: currentSectionIndex < sections.length - 1 ? 1.1 : 1 }}
              whileTap={{ scale: currentSectionIndex < sections.length - 1 ? 0.95 : 1 }}
              onClick={handleNextSection}
              disabled={currentSectionIndex === sections.length - 1}
            >
              <ArrowRight className="h-6 w-6" />
            </motion.button>
          </div>
        </main>
        
        {/* Footer - Show only on specific sections */}
        {(currentSectionIndex === 3) && <ARFooter />}
      </div>
    </div>
  );
};

export default UnifiedPage;
