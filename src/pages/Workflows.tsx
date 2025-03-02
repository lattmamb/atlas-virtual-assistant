
import React from "react";
import WorkflowDashboard from "@/components/workflow";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import AppleNavBar from "@/components/AppleNavBar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/context/ThemeContext";

const Workflows = () => {
  const isMobile = useIsMobile();
  const { currentTheme, isDarkMode } = useTheme();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className={cn(
        `flex h-screen w-full overflow-hidden theme-${currentTheme}`
      )}>
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
