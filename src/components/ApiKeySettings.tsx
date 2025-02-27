
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ApiKeyForm } from "./ApiKeyForm";
import { ApiKey, ApiKeyProvider } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ApiKeySettings() {
  const [apiKeys, setApiKeys] = useState<Partial<Record<ApiKeyProvider, ApiKey>>>({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchApiKeys = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("api_keys")
        .select("*");
      
      if (error) throw error;
      
      const keysByProvider: Partial<Record<ApiKeyProvider, ApiKey>> = {};
      
      if (data) {
        data.forEach((key: ApiKey) => {
          keysByProvider[key.provider as ApiKeyProvider] = key;
        });
      }
      
      setApiKeys(keysByProvider);
    } catch (error) {
      console.error("Error fetching API keys:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApiKeys();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center">
        <div className="loading-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">API Keys</h2>
        <p className="text-sm text-muted-foreground">
          Configure your AI service provider API keys to use with Atlas Assistant.
        </p>
      </div>
      
      <Tabs defaultValue="openai" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="openai">OpenAI</TabsTrigger>
          <TabsTrigger value="anthropic">Anthropic</TabsTrigger>
          <TabsTrigger value="cohere">Cohere</TabsTrigger>
        </TabsList>
        
        <TabsContent value="openai" className="p-4 border rounded-md mt-2">
          <ApiKeyForm
            provider="openai"
            currentKey={apiKeys.openai?.api_key}
            onSuccess={fetchApiKeys}
          />
        </TabsContent>
        
        <TabsContent value="anthropic" className="p-4 border rounded-md mt-2">
          <ApiKeyForm
            provider="anthropic"
            currentKey={apiKeys.anthropic?.api_key}
            onSuccess={fetchApiKeys}
          />
        </TabsContent>
        
        <TabsContent value="cohere" className="p-4 border rounded-md mt-2">
          <ApiKeyForm
            provider="cohere"
            currentKey={apiKeys.cohere?.api_key}
            onSuccess={fetchApiKeys}
          />
        </TabsContent>
      </Tabs>
      
      <div className="text-sm p-4 bg-blue-50 rounded-md">
        <p className="font-medium text-blue-800">Getting API Keys</p>
        <ul className="list-disc list-inside mt-2 text-blue-700 space-y-1">
          <li><a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">OpenAI API Keys</a></li>
          <li><a href="https://console.anthropic.com/account/keys" target="_blank" rel="noopener noreferrer" className="underline">Anthropic API Keys</a></li>
          <li><a href="https://dashboard.cohere.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">Cohere API Keys</a></li>
        </ul>
      </div>
    </div>
  );
}
