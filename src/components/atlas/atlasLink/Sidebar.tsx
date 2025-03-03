
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  Home, 
  MessageSquare, 
  Book, 
  Store, 
  Key, 
  Settings, 
  Moon, 
  Sun, 
  Calendar,
  BarChart, 
  Grid,
  Layers,
  Monitor,
  Users,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAtlasLink } from './AtlasLinkContext';
import SubMenuSection from '@/components/sidebar/SubMenuSection';
import { useTheme } from '@/context/ThemeContext';
import { toast } from 'sonner';

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

  const atlasFeatures = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <BarChart className="h-4 w-4" />,
    },
    {
      name: 'Knowledge Base',
      path: '/knowledge',
      icon: <Book className="h-4 w-4" />,
    },
    {
      name: 'GPT Store',
      path: '/store',
      icon: <Store className="h-4 w-4" />,
    },
    {
      name: 'API Keys',
      path: '/api',
      icon: <Key className="h-4 w-4" />,
    },
    {
      name: 'Workflow',
      path: '/workflow',
      icon: <Layers className="h-4 w-4" />,
    },
    {
      name: 'Calendar',
      path: '/calendar',
      icon: <Calendar className="h-4 w-4" />,
      badge: {
        count: 2,
        color: 'blue-600'
      }
    },
  ];
  
  const systemItems = [
    {
      name: 'Appearance',
      path: '/appearance',
      icon: <Monitor className="h-4 w-4" />,
    },
    {
      name: 'Notifications',
      path: '/notifications',
      icon: <Bell className="h-4 w-4" />,
      badge: {
        count: 3,
        color: 'red-500'
      }
    },
    {
      name: 'Team',
      path: '/team',
      icon: <Users className="h-4 w-4" />,
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: <Settings className="h-4 w-4" />,
    },
  ];

  return (
    <div className={cn(
      "w-64 border-r border-gray-800 z-20 transition-transform duration-300 bg-black",
      "flex flex-col justify-between overflow-auto",
      sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
    )}>
      <div className="p-4 space-y-4">
        {/* Logo and Atlas Link title */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Atlas Link</h2>
          <p className="text-sm text-gray-400">Powered by Agentic AI</p>
        </div>
        
        {/* Quick Nav */}
        <div className="flex justify-center space-x-2 mb-4">
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-gray-800 hover:bg-gray-900">
            <Home className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-gray-800 hover:bg-gray-900">
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-gray-800 hover:bg-gray-900">
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-gray-800 hover:bg-gray-900">
            <Layers className="h-4 w-4" />
          </Button>
        </div>
        
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
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-300">Active Instruction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-xs text-gray-400">
              {selectedInstruction ? `Using: ${selectedInstruction}` : 'No instruction selected'}
            </p>
            <Button 
              onClick={() => setSelectedInstruction(null)} 
              variant="outline" 
              size="sm"
              disabled={!selectedInstruction}
              className="w-full rounded-lg text-xs border-gray-800 hover:bg-gray-800"
            >
              Clear Instruction
            </Button>
          </CardContent>
        </Card>
        
        {/* API Keys Section */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-300">API Keys</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Input 
              type="password" 
              placeholder="OpenAI Key" 
              value={apiKeys.openai}
              onChange={e => setApiKeys({...apiKeys, openai: e.target.value})}
              className="bg-gray-800 border-gray-700 text-xs"
            />
            <Button 
              onClick={handleSaveApiKeys} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs"
            >
              Save Keys
            </Button>
          </CardContent>
        </Card>
        
        {/* Theme Toggle */}
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={toggleCelestialMode} 
            className="flex-1 flex items-center justify-center gap-2 rounded-lg border-gray-800 hover:bg-gray-900 text-sm"
          >
            {celestialMode ? <Sun size={16} /> : <Moon size={16} />}
            {celestialMode ? "Normal" : "Celestial"}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={toggleTheme} 
            className="flex-1 flex items-center justify-center gap-2 rounded-lg border-gray-800 hover:bg-gray-900 text-sm"
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            {isDarkMode ? "Light" : "Dark"}
          </Button>
        </div>
      </div>
      
      <div className="p-4 text-center text-xs text-gray-500 border-t border-gray-800">
        <p>© 2025 Atlas Intelligence LLC</p>
      </div>
    </div>
  );
};

export default Sidebar;
