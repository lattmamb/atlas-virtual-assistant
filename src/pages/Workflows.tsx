
import React, { useState } from "react";
import WorkflowDashboard from "@/components/workflow";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import AppleNavBar from "@/components/AppleNavBar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const Workflows = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const isMobile = useIsMobile();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className={cn(
        "flex h-screen w-full overflow-hidden",
        isDarkMode ? "bg-[#111111] text-white" : "bg-gray-50 text-gray-800"
      )}>
        <AppSidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <AppleNavBar 
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
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
