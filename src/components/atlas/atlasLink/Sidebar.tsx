import React from 'react';
import { cn } from "@/lib/utils";
import { useAtlasLink } from './AtlasLinkContext';
import SubMenuSection from '@/components/sidebar/SubMenuSection';
import { useTheme } from '@/context/ThemeContext';
import { toast } from 'sonner';

// Import our newly created components
import SidebarHeader from './sidebar/SidebarHeader';
import QuickNav from './sidebar/QuickNav';
import ActiveInstructionCard from './sidebar/ActiveInstructionCard';
import ApiKeysCard from './sidebar/ApiKeysCard';
import ThemeToggle from './sidebar/ThemeToggle';
import SidebarFooter from './sidebar/SidebarFooter';
import { getAtlasFeatures, getSystemItems } from './sidebar/navigationItems';

const Sidebar: React.FC = () => {
  const { 
    sidebarOpen, 
    activeTab, 
    setActiveTab, 
    celestialMode, 
    toggleCelestialMode, 
    apiKeys,
    setApiKeys,
    handleSaveApiKeys,
    automationStatus,
    handleScheduleAutomation,
    selectedInstruction,
    setSelectedInstruction
  } = useAtlasLink();
  
  const { isDarkMode, toggleTheme } = useTheme();

  const atlasFeatures = getAtlasFeatures();
  const systemItems = getSystemItems();

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
        <QuickNav />
        
        {/* Atlas Features */}
        <SubMenuSection 
          label="Atlas Features"
          items={atlasFeatures}
          collapsible={true}
          onItemClick={(name) => {
            toast.info(`${name} feature coming soon`);
          }}
        />
        
        {/* System */}
        <SubMenuSection 
          label="System"
          items={systemItems}
          collapsible={true}
          onItemClick={(name) => {
            if (name === 'Appearance') {
              toggleTheme();
            } else {
              toast.info(`${name} feature coming soon`);
            }
          }}
        />
        
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
        />
      </div>
      
      <SidebarFooter />
    </div>
  );
};

export default Sidebar;
