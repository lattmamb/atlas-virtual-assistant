
import React, { useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/context/ThemeContext";
import ICloudLayout from "@/components/icloud/ICloudLayout";
import WidgetsGrid from "@/components/widgets/WidgetsGrid";
import HeaderSection from "@/components/widgets/HeaderSection";
import AppleNavBar from "@/components/icloud/AppleNavBar";
import { SparklesCore } from "@/components/ui/sparkles";
import BackgroundEffects from "@/components/widgets/BackgroundEffects";
import { HeroParallaxDemo } from "@/components/ui/hero-parallax.demo";

export default function Index() {
  const [showAppGrid, setShowAppGrid] = React.useState(false);
  const isMobile = useIsMobile();
  const { currentTheme, isDarkMode } = useTheme();

  // Auto close app grid on mobile when changing themes
  useEffect(() => {
    if (isMobile && showAppGrid) {
      setShowAppGrid(false);
    }
  }, [currentTheme, isMobile, showAppGrid]);

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
          <AppSidebar activePage="home" />
          <main className="flex-1 flex flex-col overflow-hidden">
            <AppleNavBar 
              showAppGridButton={true} 
              showAppGrid={showAppGrid}
              setShowAppGrid={setShowAppGrid}
            />
            
            <div className="relative z-10 mt-4 pt-4">
              <HeaderSection 
                isDarkMode={isDarkMode}
                setShowAppGrid={setShowAppGrid}
                showAppGrid={showAppGrid}
                title="Atlas Universe"
              />
              
              {/* Hero Parallax Section */}
              <div className="h-screen">
                <HeroParallaxDemo />
              </div>
              
              {/* Original Widgets Grid (can be below the Hero Parallax if desired) */}
              <ICloudLayout showAppGrid={showAppGrid}>
                <WidgetsGrid />
              </ICloudLayout>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
