
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sun, Moon } from "lucide-react";
import { useAtlasLink } from './AtlasLinkContext';

const SettingsTab: React.FC = () => {
  const { celestialMode, setCelestialMode, apiKeys, setApiKeys, handleSaveApiKeys } = useAtlasLink();

  return (
    <div className="p-4 h-full">
      <Tabs defaultValue="api" className="h-full flex flex-col">
        <TabsList className="mb-4">
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        
        <div className="flex-1 overflow-auto">
          <TabsContent value="api" className="h-full">
            <Card className={celestialMode ? "dark-apple-card" : "apple-card"}>
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">OpenAI API Key</label>
                  <Input 
                    type="password" 
                    placeholder="sk-..." 
                    value={apiKeys.openai}
                    onChange={e => setApiKeys({...apiKeys, openai: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground">Used for chat and workflow automation</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">HuggingFace API Key</label>
                  <Input 
                    type="password" 
                    placeholder="hf_..." 
                    value={apiKeys.huggingface}
                    onChange={e => setApiKeys({...apiKeys, huggingface: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground">Used for additional AI models</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Supabase API Key</label>
                  <Input 
                    type="password" 
                    placeholder="eyJ..." 
                    value={apiKeys.supabase}
                    onChange={e => setApiKeys({...apiKeys, supabase: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground">Used for data storage</p>
                </div>
                
                <Button onClick={handleSaveApiKeys} className="w-full">Save API Keys</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="h-full">
            <Card className={celestialMode ? "dark-apple-card" : "apple-card"}>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Theme</label>
                  <div className="flex gap-2">
                    <Button 
                      variant={!celestialMode ? "default" : "outline"} 
                      onClick={() => setCelestialMode(false)}
                      className="flex-1"
                    >
                      <Sun className="mr-2 h-4 w-4" />
                      Light
                    </Button>
                    <Button 
                      variant={celestialMode ? "default" : "outline"} 
                      onClick={() => setCelestialMode(true)}
                      className="flex-1"
                    >
                      <Moon className="mr-2 h-4 w-4" />
                      Dark
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account" className="h-full">
            <Card className={celestialMode ? "dark-apple-card" : "apple-card"}>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Account settings coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default SettingsTab;
