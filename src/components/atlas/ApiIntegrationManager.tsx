
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ApiKeyInput from '../api-key-settings/ApiKeyInput';
import SaveApiKeysButton from '../api-key-settings/SaveApiKeysButton';
import { useState } from 'react';
import { toast } from 'sonner';

interface ApiIntegrationManagerProps {
  isDarkMode: boolean;
}

const ApiIntegrationManager: React.FC<ApiIntegrationManagerProps> = ({ isDarkMode }) => {
  const [openAIKey, setOpenAIKey] = useState('');
  const [anthropicKey, setAnthropicKey] = useState('');
  const [googleKey, setGoogleKey] = useState('');
  const [openRouterKey, setOpenRouterKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveKeys = () => {
    setIsLoading(true);
    
    // Simulate saving keys
    setTimeout(() => {
      setIsLoading(false);
      toast.success('API keys saved successfully');
    }, 1000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">API Integrations</h2>
      
      <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
        <CardHeader>
          <CardTitle>Configure API Keys</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <ApiKeyInput
            value={openAIKey}
            onChange={setOpenAIKey}
            label="OpenAI API Key"
            placeholder="sk-..."
            helpText="Required for GPT-3.5 and GPT-4 models"
          />
          
          <ApiKeyInput
            value={anthropicKey}
            onChange={setAnthropicKey}
            label="Anthropic API Key"
            placeholder="sk-ant-..."
            helpText="Required for Claude models"
          />
          
          <ApiKeyInput
            value={googleKey}
            onChange={setGoogleKey}
            label="Google Gemini API Key"
            placeholder="..."
            helpText="Required for Gemini models"
          />
          
          <ApiKeyInput
            value={openRouterKey}
            onChange={setOpenRouterKey}
            label="OpenRouter API Key"
            placeholder="sk-or-..."
            helpText="Access multiple models from one API"
          />
          
          <SaveApiKeysButton 
            onClick={handleSaveKeys} 
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiIntegrationManager;
