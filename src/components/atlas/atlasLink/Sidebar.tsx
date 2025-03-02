
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Home, MessageSquare, Book, Store, Key, Settings, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAtlasLink } from './AtlasLinkContext';

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

  return (
    <div className={cn(
      "md:w-72 apple-glass border-r z-20 transition-transform duration-300",
      "flex flex-col justify-between",
      sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
    )}>
      <div className="p-4 space-y-4">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-primary">Atlas Link</h2>
          <p className="text-sm text-muted-foreground">Powered by Agentic AI</p>
        </div>
        
        <div className="space-y-1">
          <Button
            variant={activeTab === 'dashboard' ? "default" : "ghost"}
            className="w-full justify-start rounded-lg"
            onClick={() => setActiveTab('dashboard')}
            aria-label="Dashboard"
            aria-current={activeTab === 'dashboard' ? 'page' : undefined}
          >
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          
          <Button
            variant={activeTab === 'chat' ? "default" : "ghost"}
            className="w-full justify-start rounded-lg"
            onClick={() => setActiveTab('chat')}
            aria-label="Chat"
            aria-current={activeTab === 'chat' ? 'page' : undefined}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat
          </Button>
          
          <Button
            variant={activeTab === 'knowledge' ? "default" : "ghost"}
            className="w-full justify-start rounded-lg"
            onClick={() => setActiveTab('knowledge')}
            aria-label="Knowledge Base"
            aria-current={activeTab === 'knowledge' ? 'page' : undefined}
          >
            <Book className="mr-2 h-4 w-4" />
            Knowledge Base
          </Button>
          
          <Button
            variant={activeTab === 'store' ? "default" : "ghost"}
            className="w-full justify-start rounded-lg"
            onClick={() => setActiveTab('store')}
            aria-label="GPT Store"
            aria-current={activeTab === 'store' ? 'page' : undefined}
          >
            <Store className="mr-2 h-4 w-4" />
            GPT Store
          </Button>
          
          <Button
            variant={activeTab === 'api' ? "default" : "ghost"}
            className="w-full justify-start rounded-lg"
            onClick={() => setActiveTab('api')}
            aria-label="API Integrations"
            aria-current={activeTab === 'api' ? 'page' : undefined}
          >
            <Key className="mr-2 h-4 w-4" />
            API Integrations
          </Button>
          
          <Button
            variant={activeTab === 'settings' ? "default" : "ghost"}
            className="w-full justify-start rounded-lg"
            onClick={() => setActiveTab('settings')}
            aria-label="Settings"
            aria-current={activeTab === 'settings' ? 'page' : undefined}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
        
        {activeTab === 'settings' && (
          <Card className={celestialMode ? "dark-apple-card" : "apple-card"}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">API Keys</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Input 
                type="password" 
                placeholder="OpenAI Key" 
                value={apiKeys.openai}
                onChange={e => setApiKeys({...apiKeys, openai: e.target.value})}
                aria-label="OpenAI API Key"
              />
              <Input 
                type="password" 
                placeholder="HuggingFace Key" 
                value={apiKeys.huggingface}
                onChange={e => setApiKeys({...apiKeys, huggingface: e.target.value})}
                aria-label="HuggingFace API Key"
              />
              <Button 
                onClick={handleSaveApiKeys} 
                className="w-full apple-button"
                aria-label="Save API Keys"
              >
                Save Keys
              </Button>
            </CardContent>
          </Card>
        )}
        
        {activeTab === 'chat' && (
          <Card className={celestialMode ? "dark-apple-card" : "apple-card"}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Active Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {selectedInstruction ? `Using: ${selectedInstruction}` : 'No instruction selected'}
              </p>
              <Button 
                onClick={() => setSelectedInstruction(null)} 
                variant="outline" 
                size="sm"
                disabled={!selectedInstruction}
                className="w-full rounded-lg"
                aria-label="Clear Instruction"
              >
                Clear Instruction
              </Button>
            </CardContent>
          </Card>
        )}
        
        {activeTab === 'dashboard' && (
          <Card className={celestialMode ? "dark-apple-card" : "apple-card"}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Workflow Automations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">{automationStatus}</p>
              <Button 
                onClick={handleScheduleAutomation} 
                className="w-full apple-button"
                aria-label="Schedule Task"
              >
                Schedule Task
              </Button>
            </CardContent>
          </Card>
        )}
        
        <Button 
          variant="outline" 
          onClick={toggleCelestialMode} 
          className="w-full flex items-center gap-2 rounded-lg"
          aria-label={celestialMode ? "Switch to Normal Mode" : "Switch to Celestial Mode"}
        >
          {celestialMode ? <Sun size={18} /> : <Moon size={18} />}
          {celestialMode ? "Normal Mode" : "Celestial Mode"}
        </Button>
      </div>
      
      <div className="p-4 text-center text-xs text-muted-foreground border-t">
        <p>© 2025 Atlas Intelligence LLC</p>
      </div>
    </div>
  );
};

export default Sidebar;
