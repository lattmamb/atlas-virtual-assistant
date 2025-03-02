
import React, { useState } from "react";
import WorkflowDashboard from "@/components/workflow";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import AppleNavBar from "@/components/AppleNavBar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { GridPattern } from "@/components/ui/grid-pattern";
import { AppleWidget } from "@/components/icloud/AppleWidget";
import { Workflow, Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Workflows = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const isMobile = useIsMobile();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  const handleNewWorkflow = () => {
    toast.success("New workflow feature coming soon", {
      position: "top-center",
      duration: 2000
    });
  };

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className={cn(
        "min-h-screen w-full overflow-hidden transition-colors duration-300",
        isDarkMode ? "bg-gradient-to-b from-[#1a1a1a] to-[#0c0c0c] text-white" : "bg-gradient-to-b from-[#f9f9f9] to-[#f1f1f1] text-gray-800"
      )}>
        <div className="fixed inset-0 z-0">
          <GridPattern 
            width={40} 
            height={40} 
            className={cn(
              "absolute inset-0 stroke-[0.5px] [mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
              isDarkMode 
                ? "fill-white/[0.01] stroke-white/[0.05]" 
                : "fill-black/[0.01] stroke-black/[0.05]"
            )}
            strokeDasharray="1 3"
          />
          {isDarkMode && (
            <>
              <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -z-10"></div>
              <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>
            </>
          )}
        </div>
        
        <AppSidebar />
        
        <main className="flex-1 flex flex-col overflow-hidden ml-[var(--sidebar-width)]">
          <AppleNavBar 
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
            showAppGridButton={false}
          />
          
          <div className="flex-1 flex flex-col h-full p-4 pt-16 animate-fade-in">
            <div className="mb-4 flex justify-between items-center">
              <h1 className="text-2xl font-light">
                Atlas <span className="font-medium">Workflows</span>
              </h1>
              <Button 
                variant="outline"
                size="sm" 
                className="gap-2 backdrop-blur-sm bg-black/30 border-white/10 hover:bg-white/10 text-white"
                onClick={handleNewWorkflow}
              >
                <Plus size={16} />
                <span>New Workflow</span>
              </Button>
            </div>
            
            <AppleWidget
              title="Automation Workflows"
              icon={<Workflow className="h-5 w-5 text-blue-400" />}
              headerActionIcon={<MoreHorizontal className="h-4 w-4" />}
              headerActionTooltip="Workflow Actions"
              className="flex-1 overflow-hidden"
              minHeight="calc(100vh - 160px)"
            >
              <div className="p-4">
                <WorkflowDashboard />
              </div>
            </AppleWidget>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Workflows;
