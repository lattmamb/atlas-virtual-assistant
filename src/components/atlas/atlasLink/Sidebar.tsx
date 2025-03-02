
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
      "md:w-72 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-r z-20 transition-transform duration-300",
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
            className="w-full justify-start"
            onClick={() => setActiveTab('dashboard')}
          >
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          
          <Button
            variant={activeTab === 'chat' ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab('chat')}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat
          </Button>
          
          <Button
            variant={activeTab === 'knowledge' ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab('knowledge')}
          >
            <Book className="mr-2 h-4 w-4" />
            Knowledge Base
          </Button>
          
          <Button
            variant={activeTab === 'store' ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab('store')}
          >
            <Store className="mr-2 h-4 w-4" />
            GPT Store
          </Button>
          
          <Button
            variant={activeTab === 'api' ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab('api')}
          >
            <Key className="mr-2 h-4 w-4" />
            API Integrations
          </Button>
          
          <Button
            variant={activeTab === 'settings' ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
        
        {activeTab === 'settings' && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">API Keys</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Input 
                type="password" 
                placeholder="OpenAI Key" 
                value={apiKeys.openai}
                onChange={e => setApiKeys({...apiKeys, openai: e.target.value})}
              />
              <Input 
                type="password" 
                placeholder="HuggingFace Key" 
                value={apiKeys.huggingface}
                onChange={e => setApiKeys({...apiKeys, huggingface: e.target.value})}
              />
              <Input 
                type="password" 
                placeholder="Supabase Key" 
                value={apiKeys.supabase}
                onChange={e => setApiKeys({...apiKeys, supabase: e.target.value})}
              />
              <Button onClick={handleSaveApiKeys} className="w-full">Save Keys</Button>
            </CardContent>
          </Card>
        )}
        
        {activeTab === 'chat' && (
          <Card>
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
                className="w-full"
              >
                Clear Instruction
              </Button>
            </CardContent>
          </Card>
        )}
        
        {activeTab === 'dashboard' && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Workflow Automations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">{automationStatus}</p>
              <Button onClick={handleScheduleAutomation} className="w-full">Schedule Task</Button>
            </CardContent>
          </Card>
        )}
        
        <Button 
          variant="outline" 
          onClick={toggleCelestialMode} 
          className="w-full flex items-center gap-2"
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
