
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  Home, 
  MessageSquare, 
  Grid,
  Layers,
  Moon, 
  Sun
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAtlasLink } from './AtlasLinkContext';
import { useTheme } from '@/context/ThemeContext';
import SidebarNavigation from './sidebar/SidebarNavigation';

// Import sidebar component sections
import SidebarHeader from './sidebar/SidebarHeader';
import QuickNav from './sidebar/QuickNav';
import ActiveInstructionCard from './sidebar/ActiveInstructionCard';
import ApiKeysCard from './sidebar/ApiKeysCard';
import ThemeToggle from './sidebar/ThemeToggle';
import SidebarFooter from './sidebar/SidebarFooter';

const Sidebar: React.FC = () => {
  const { 
    sidebarOpen, 
    selectedInstruction,
    setSelectedInstruction,
    apiKeys,
    setApiKeys,
    handleSaveApiKeys,
    celestialMode, 
    toggleCelestialMode
  } = useAtlasLink();
  
  const { isDarkMode, toggleTheme } = useTheme();

  // Quick Nav buttons for the top section
  const quickNavButtons = [
    { icon: <Home className="h-4 w-4" />, ariaLabel: "Home" },
    { icon: <MessageSquare className="h-4 w-4" />, ariaLabel: "Messages" },
    { icon: <Grid className="h-4 w-4" />, ariaLabel: "Dashboard" },
    { icon: <Layers className="h-4 w-4" />, ariaLabel: "Workflows" }
  ];

  const handleItemClick = (name: string) => {
    if (name === 'Appearance') {
      toggleTheme();
    }
  };

  return (
    <div className={cn(
      "w-64 border-r border-gray-800 z-20 transition-transform duration-300 bg-black",
      "flex flex-col justify-between overflow-auto",
      sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
    )}>
      <div className="p-4 space-y-4">
        {/* Logo and Atlas Link title */}
        <SidebarHeader />
        
        {/* Quick Nav */}
        <QuickNav buttons={quickNavButtons} />
        
        {/* Navigation Sections */}
        <SidebarNavigation onItemClick={handleItemClick} />
        
        {/* Currently active chat instruction */}
        <ActiveInstructionCard 
          selectedInstruction={selectedInstruction}
          setSelectedInstruction={setSelectedInstruction}
        />
        
        {/* API Keys Section */}
        <ApiKeysCard 
          apiKeys={apiKeys}
          setApiKeys={setApiKeys}
          handleSaveApiKeys={handleSaveApiKeys}
        />
        
        {/* Theme Toggle */}
        <ThemeToggle 
          celestialMode={celestialMode}
          toggleCelestialMode={toggleCelestialMode}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
      </div>
      
      <SidebarFooter />
    </div>
  );
};

export default Sidebar;
