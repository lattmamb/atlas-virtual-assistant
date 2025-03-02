
import React from "react";
import WorkflowDashboard from "@/components/workflow";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";

const Workflows = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="flex items-center p-4 border-b">
            <SidebarTrigger className="mr-2" />
            <h1 className="font-semibold text-xl">Workflows</h1>
          </div>
          <div className="animate-fade-in">
            <WorkflowDashboard />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Workflows;
