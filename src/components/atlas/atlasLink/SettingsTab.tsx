
import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sun, Moon, LogOut } from "lucide-react";
import { useAtlasLink } from './AtlasLinkContext';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from '@/context/AuthContext';

const SettingsTab: React.FC = () => {
  const { celestialMode, setCelestialMode, apiKeys, setApiKeys, handleSaveApiKeys } = useAtlasLink();
  const { user, signOut } = useAuth();

  useEffect(() => {
    if (user) {
      fetchApiKeys();
    }
  }, [user]);

  const fetchApiKeys = async () => {
    try {
      const { data, error } = await supabase
        .from("api_keys")
        .select("*")
        .maybeSingle();

      if (error) {
        console.error("Error fetching API keys:", error);
        return;
      }

      if (data) {
        const updatedKeys = { ...apiKeys };
        
        if (data.api_key) updatedKeys.openai = data.api_key;
        if (data["hugging face"] || data.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) {
          updatedKeys.huggingface = data["hugging face"] || data.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;
        }
        // Remove the incorrect supabase property reference
        
        setApiKeys(updatedKeys);
      }
    } catch (error) {
      console.error("Error in fetchApiKeys:", error);
    }
  };

  const handleSaveApiKeysWithSupabase = async () => {
    try {
      if (!user) {
        toast.error("Please sign in to save API keys");
        return;
      }

      const keysToUpdate = {
        api_key: apiKeys.openai || null,
        "hugging face": apiKeys.huggingface || null,
        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: apiKeys.huggingface || "default_key",
        user_id: user.id,
      };

      const { error } = await supabase.from("api_keys").upsert([keysToUpdate]);

      if (error) {
        console.error("Error saving API keys:", error);
        toast.error("Failed to save API keys");
        return;
      }

      toast.success("API keys saved successfully");
      // Call the original handleSaveApiKeys for any local state updates
      handleSaveApiKeys();

    } catch (error) {
      console.error("Error in handleSaveApiKeysWithSupabase:", error);
      toast.error("An unexpected error occurred");
    }
  };

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
                    value={apiKeys.openai || ""}
                    onChange={e => setApiKeys({...apiKeys, openai: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground">Used for chat and workflow automation</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">HuggingFace API Key</label>
                  <Input 
                    type="password" 
                    placeholder="hf_..." 
                    value={apiKeys.huggingface || ""}
                    onChange={e => setApiKeys({...apiKeys, huggingface: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground">Used for additional AI models</p>
                </div>
                
                <Button onClick={handleSaveApiKeysWithSupabase} className="w-full">Save API Keys</Button>
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
                {user ? (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input value={user.email || ""} readOnly />
                    </div>
                    <Button 
                      variant="destructive" 
                      className="w-full flex items-center justify-center" 
                      onClick={signOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <p className="text-muted-foreground">Please sign in to view account settings</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default SettingsTab;
