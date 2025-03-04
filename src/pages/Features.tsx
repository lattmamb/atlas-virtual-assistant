
import React from 'react';
import { TailwindcssButtons } from '@/components/ui/TailwindcssButtons';
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/context/ThemeContext";
import AppleNavBar from "@/components/icloud/AppleNavBar";
import HeaderSection from "@/components/widgets/HeaderSection";
import BackgroundEffects from "@/components/widgets/BackgroundEffects";
import { SparklesCore } from "@/components/ui/sparkles";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Features = () => {
  const isMobile = useIsMobile();
  const { currentTheme, isDarkMode } = useTheme();

  React.useEffect(() => {
    // Display welcome toast on initial load
    setTimeout(() => {
      toast.info("Features Page", {
        description: "Explore our custom UI components library.",
        duration: 3000,
      });
    }, 1000);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <div className={`min-h-screen w-full overflow-hidden theme-${currentTheme}`}>
      <BackgroundEffects currentTheme={currentTheme} />
      
      {isDarkMode && (
        <div className="fixed inset-0 pointer-events-none z-0 opacity-50">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={20}
            className="w-full h-full"
            particleColor="#FFFFFF"
            speed={0.5}
          />
        </div>
      )}
      
      <SidebarProvider defaultOpen={!isMobile}>
        <div className={cn(
          `flex h-screen w-full overflow-hidden theme-${currentTheme}`
        )}>
          <AppSidebar activePage="features" />
          <main className="flex-1 flex flex-col overflow-hidden">
            <AppleNavBar 
              showAppGridButton={false}
            />
            
            <div className="relative z-10 mt-4 mb-8 pt-10">
              <HeaderSection 
                isDarkMode={isDarkMode}
                setShowAppGrid={() => {}}
                showAppGrid={false}
                title="UI Component Library"
              />
              
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex-1 overflow-y-auto"
              >
                <div className="animate-fade-in p-4">
                  <TailwindcssButtons />
                </div>
              </motion.div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Features;
