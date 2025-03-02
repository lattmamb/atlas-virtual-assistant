
import React from "react";
import WorkflowDashboard from "@/components/workflow";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import AppleNavBar from "@/components/AppleNavBar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/context/ThemeContext";
import { GridPattern } from "@/components/ui/grid-pattern";

const Workflows = () => {
  const isMobile = useIsMobile();
  const { currentTheme, isDarkMode } = useTheme();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className={cn(
        `flex h-screen w-full overflow-hidden theme-${currentTheme}`
      )}>
        <div 
          className="fixed inset-0 z-0 transition-all duration-700"
          style={{ background: `var(--background-gradient)` }}
        >
          <GridPattern 
            width={40} 
            height={40} 
            className={cn(
              "absolute inset-0 fill-white/[0.01] stroke-white/[0.05]",
              "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]"
            )}
            strokeDasharray="1 3"
          />
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] -z-10 transition-all duration-700" 
            style={{ backgroundColor: `var(--accent-color)`, opacity: 0.1 }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full blur-[100px] -z-10 transition-all duration-700"
            style={{ backgroundColor: `var(--accent-color)`, opacity: 0.05 }}></div>
        </div>
        
        <AppSidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <AppleNavBar 
            showAppGridButton={false}
          />
          
          <div className="flex-1 overflow-y-auto pt-14">
            <div className="animate-fade-in p-4">
              <WorkflowDashboard />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Workflows;
