
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';
import { UniverseComponentProps } from '@/lib/types';

import ARBackground from '@/components/applevision/ARBackground';
import HeroSection from '@/components/applevision/HeroSection';
import ParallaxSection from '@/components/applevision/ParallaxSection';
import PricingSection from '@/components/applevision/PricingSection';

import ChatRoomPanel from '@/components/universe/ChatRoomPanel';
import AtlasPanel from '@/components/universe/AtlasPanel';
import WorkflowPanel from '@/components/universe/WorkflowPanel';
import SettingsPanel from '@/components/universe/SettingsPanel';
import UniverseNavBar from '@/components/universe/UniverseNavBar';
import SectionIndicator from '@/components/universe/SectionIndicator';
import { useSwipeable } from '@/hooks/use-swipeable';
import { HeroParallaxDemo } from '@/components/ui/hero-parallax.demo';

interface SectionConfig {
  id: string;
  title: string;
  component: React.ComponentType<UniverseComponentProps>;
}

const sections: SectionConfig[] = [
  { id: 'vision', title: 'Vision Pro', component: HeroSection },
  { id: 'parallax', title: 'Explore', component: ({ scrollY }) => <HeroParallaxDemo /> },
  { id: 'chat', title: 'Chat', component: ChatRoomPanel },
  { id: 'atlas', title: 'Atlas', component: AtlasPanel },
  { id: 'workflow', title: 'Workflows', component: WorkflowPanel },
  { id: 'settings', title: 'Settings', component: SettingsPanel },
];

const UniverseHome: React.FC = () => {
  const { isDarkMode } = useTheme();
  const isMobile = useIsMobile();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNextSection(),
    onSwipedRight: () => handlePrevSection(),
  });

  useEffect(() => {
    setTimeout(() => {
      toast.success("Welcome to Atlas Universe", {
        description: "Navigate between sections with the arrows or swipe",
        icon: <Sparkles className="h-5 w-5" />,
        duration: 5000,
      });
    }, 1500);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentSectionIndex === 0) {
        setScrollY(prev => (prev < 300 ? prev + 0.5 : 0));
      } else {
        setScrollY(0);
      }
    }, 30);
    
    return () => clearInterval(interval);
  }, [currentSectionIndex]);

  const handlePrevSection = () => {
    setCurrentSectionIndex(prev => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextSection = () => {
    setCurrentSectionIndex(prev => (prev < sections.length - 1 ? prev + 1 : prev));
  };

  const goToSection = (index: number) => {
    setCurrentSectionIndex(index);
  };

  const CurrentSectionComponent = sections[currentSectionIndex].component;

  return (
    <div 
      className={cn(
        "relative min-h-screen w-full overflow-hidden",
        isDarkMode ? "text-white" : "text-gray-900"
      )}
      {...swipeHandlers}
    >
      <ARBackground scrollY={scrollY} />
      
      <div className="relative z-10">
        <UniverseNavBar currentSection={sections[currentSectionIndex].id} />
        
        <main className="flex flex-col items-center">
          <motion.div 
            key={currentSectionIndex}
            className="min-h-[calc(100vh-120px)] w-full flex items-center justify-center"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <CurrentSectionComponent scrollY={scrollY} />
          </motion.div>
          
          <div className="fixed bottom-8 left-0 right-0 flex justify-center items-center gap-4 z-20">
            <motion.button
              className={cn(
                "p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20",
                "text-white shadow-lg",
                currentSectionIndex === 0 && "opacity-50 cursor-not-allowed"
              )}
              whileHover={{ scale: currentSectionIndex > 0 ? 1.1 : 1 }}
              whileTap={{ scale: currentSectionIndex > 0 ? 0.95 : 1 }}
              onClick={handlePrevSection}
              disabled={currentSectionIndex === 0}
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>
            
            <SectionIndicator 
              sections={sections} 
              currentIndex={currentSectionIndex}
              onSelectSection={goToSection}
            />
            
            <motion.button
              className={cn(
                "p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20",
                "text-white shadow-lg",
                currentSectionIndex === sections.length - 1 && "opacity-50 cursor-not-allowed"
              )}
              whileHover={{ scale: currentSectionIndex < sections.length - 1 ? 1.1 : 1 }}
              whileTap={{ scale: currentSectionIndex < sections.length - 1 ? 0.95 : 1 }}
              onClick={handleNextSection}
              disabled={currentSectionIndex === sections.length - 1}
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UniverseHome;
