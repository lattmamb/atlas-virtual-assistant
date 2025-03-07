
import React, { useEffect } from "react";
import WorkflowDashboard from "@/components/workflow";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/context/ThemeContext";
import AppleNavBar from "@/components/icloud/AppleNavBar";
import HeaderSection from "@/components/widgets/HeaderSection";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Workflows = () => {
  const isMobile = useIsMobile();
  const { currentTheme, isDarkMode } = useTheme();

  useEffect(() => {
    // Display welcome toast on initial load
    setTimeout(() => {
      toast.info("Workflow Dashboard", {
        description: "Create and manage your automation workflows.",
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
      <SidebarProvider defaultOpen={!isMobile}>
        <div className={cn(
          `flex h-screen w-full overflow-hidden theme-${currentTheme}`
        )}>
          <AppSidebar />
          <main className="flex-1 flex flex-col overflow-hidden">
            <AppleNavBar 
              showAppGridButton={false}
            />
            
            <div className="relative z-10 mt-4 mb-8 pt-10">
              <HeaderSection 
                isDarkMode={isDarkMode}
                setShowAppGrid={() => {}}
                showAppGrid={false}
                title="Workflow Dashboard"
              />
              
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex-1 overflow-y-auto"
              >
                <div className="animate-fade-in p-4">
                  <WorkflowDashboard />
                </div>
              </motion.div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Workflows;
