
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ApiKeys {
  openai: string;
  [key: string]: string;
}

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
  return (
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
  );
};

export default ApiKeysCard;
