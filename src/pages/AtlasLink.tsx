
import React, { useState } from 'react';
import AtlasLinkComponent from '@/components/atlas/AtlasLink';
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import AppleNavBar from "@/components/AppleNavBar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { GridPattern } from "@/components/ui/grid-pattern";
import { AppleWidget } from "@/components/icloud/AppleWidget";
import { Shield, Link, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const AtlasLinkPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const isMobile = useIsMobile();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
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
              <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] -z-10"></div>
              <div className="absolute bottom-1/3 left-1/3 w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[100px] -z-10"></div>
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
                Atlas <span className="font-medium">Link</span>
              </h1>
              <Button 
                variant="outline"
                size="sm" 
                className="gap-2 backdrop-blur-sm bg-black/30 border-white/10 hover:bg-white/10 text-white"
              >
                <RefreshCw size={16} />
                <span>Refresh Connection</span>
              </Button>
            </div>
            
            <AppleWidget
              title="Secure Connect"
              icon={<Shield className="h-5 w-5 text-blue-400" />}
              headerActionIcon={<Link className="h-4 w-4" />}
              headerActionTooltip="Connection Info"
              className="flex-1 overflow-hidden max-w-2xl mx-auto"
              minHeight="calc(100vh - 160px)"
            >
              <div className="p-4">
                <AtlasLinkComponent />
              </div>
            </AppleWidget>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AtlasLinkPage;
