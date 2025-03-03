
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";
import { ApiKeys } from "../types";

interface ApiKeysCardProps {
  apiKeys: ApiKeys;
  setApiKeys: (keys: ApiKeys) => void;
  handleSaveApiKeys: () => void;
}

const ApiKeysCard: React.FC<ApiKeysCardProps> = ({
  apiKeys,
  setApiKeys,
  handleSaveApiKeys
}) => {
  const handleKeyChange = (key: keyof ApiKeys, value: string) => {
    setApiKeys({ ...apiKeys, [key]: value });
  };

  return (
    <Card className="bg-gray-950 border-gray-800 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center">
          <Key className="h-4 w-4 mr-2 text-blue-400" />
          API Keys
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xs space-y-3">
        <div>
          <label className="block text-gray-400 mb-1">OpenAI Key</label>
          <Input
            type="password"
            value={apiKeys.openai}
            onChange={(e) => handleKeyChange('openai', e.target.value)}
            className="h-7 text-xs bg-gray-900 border-gray-700"
            placeholder="sk-..."
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-1">HuggingFace Key</label>
          <Input
            type="password"
            value={apiKeys.huggingface}
            onChange={(e) => handleKeyChange('huggingface', e.target.value)}
            className="h-7 text-xs bg-gray-900 border-gray-700"
            placeholder="hf_..."
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Supabase Key</label>
          <Input
            type="password"
            value={apiKeys.supabase}
            onChange={(e) => handleKeyChange('supabase', e.target.value)}
            className="h-7 text-xs bg-gray-900 border-gray-700"
            placeholder="eyJh..."
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-1">OpenRouter Key</label>
          <Input
            type="password"
            value={apiKeys.openrouter || ''}
            onChange={(e) => handleKeyChange('openrouter', e.target.value)}
            className="h-7 text-xs bg-gray-900 border-gray-700"
            placeholder="router-..."
          />
        </div>
        <Button 
          onClick={handleSaveApiKeys}
          className="w-full h-7 mt-2 text-xs bg-blue-600 hover:bg-blue-500"
        >
          Save Keys
        </Button>
      </CardContent>
    </Card>
  );
};

export default ApiKeysCard;
