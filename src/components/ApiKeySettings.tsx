
import { useState } from "react";
import { ApiKeyForm } from "./ApiKeyForm";
import { ApiKeyProvider } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ApiKeySettings() {
  const [selectedProvider, setSelectedProvider] = useState<ApiKeyProvider>("openai");

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
          <div className="space-y-4">
            <label className="text-sm font-medium">OpenAI API Key</label>
            <input
              type="password"
              className="w-full rounded-md border border-input bg-background p-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Enter your OpenAI API key"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="anthropic" className="p-4 border rounded-md mt-2">
          <div className="space-y-4">
            <label className="text-sm font-medium">Anthropic API Key</label>
            <input
              type="password"
              className="w-full rounded-md border border-input bg-background p-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Enter your Anthropic API key"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="cohere" className="p-4 border rounded-md mt-2">
          <div className="space-y-4">
            <label className="text-sm font-medium">Cohere API Key</label>
            <input
              type="password"
              className="w-full rounded-md border border-input bg-background p-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Enter your Cohere API key"
            />
          </div>
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
