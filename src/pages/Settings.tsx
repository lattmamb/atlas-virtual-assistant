
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiKeySettings from "@/components/api-key-settings";
import { Settings as SettingsIcon, Save, ArrowLeft, Sun, Moon, Sliders } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import AppleNavBar from "@/components/AppleNavBar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { GridPattern } from "@/components/ui/grid-pattern";
import { AppleWidget } from "@/components/icloud/AppleWidget";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Settings() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const isMobile = useIsMobile();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  const handleSaveSettings = () => {
    toast.success("Settings saved successfully", {
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
              <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gray-500/10 rounded-full blur-[120px] -z-10"></div>
              <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>
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
                Atlas <span className="font-medium">Settings</span>
              </h1>
              <Button 
                variant="outline"
                size="sm" 
                className="gap-2 backdrop-blur-sm bg-black/30 border-white/10 hover:bg-white/10 text-white"
                onClick={handleSaveSettings}
              >
                <Save size={16} />
                <span>Save Settings</span>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <AppleWidget
                title="API Settings"
                icon={<Sliders className="h-5 w-5 text-blue-400" />}
                className="col-span-1 md:col-span-2 overflow-hidden"
                minHeight="500px"
              >
                <div className="p-4">
                  <ApiKeySettings />
                </div>
              </AppleWidget>
              
              <AppleWidget
                title="Display Settings" 
                icon={isDarkMode ? <Moon className="h-5 w-5 text-blue-400" /> : <Sun className="h-5 w-5 text-blue-400" />}
                className="col-span-1 overflow-hidden"
                minHeight="500px"
              >
                <div className="p-4 flex flex-col gap-4">
                  <div className="p-4 rounded-lg border border-white/10 backdrop-blur-sm bg-white/5">
                    <div className="flex justify-between items-center mb-4">
                      <span>Theme Mode</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="gap-2 border-white/10 hover:bg-white/10"
                        onClick={toggleDarkMode}
                      >
                        {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
                        <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>System Font</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="gap-2 border-white/10 hover:bg-white/10"
                      >
                        SF Pro
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg border border-white/10 backdrop-blur-sm bg-white/5">
                    <div className="flex justify-between items-center mb-4">
                      <span>Notifications</span>
                      <div className="w-10 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                        <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>Sounds</span>
                      <div className="w-10 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                        <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </AppleWidget>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
