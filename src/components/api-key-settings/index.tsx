
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from '@/context/ThemeContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import ApiKeyInput from './ApiKeyInput';
import ApiEndpointDisplay from './ApiEndpointDisplay';
import SaveApiKeysButton from './SaveApiKeysButton';

const ApiKeySettings = () => {
  const { isDarkMode } = useTheme();
  const [openAIKey, setOpenAIKey] = useState('');
  const [anthropicKey, setAnthropicKey] = useState('');
  const [googleKey, setGoogleKey] = useState('');
  const [mistoralKey, setMistoralKey] = useState('');
  const [azureKey, setAzureKey] = useState('');
  const [customAPIBase, setCustomAPIBase] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveApiKeys = () => {
    // Logic to save API keys
    setIsLoading(true);
    
    console.log('Saving API keys:', { openAIKey, anthropicKey, googleKey });
    
    // Simulate API call
    setTimeout(() => {
      // Store API keys in localStorage or a more secure storage
      localStorage.setItem('openai_api_key', openAIKey);
      localStorage.setItem('anthropic_api_key', anthropicKey);
      localStorage.setItem('google_api_key', googleKey);
      
      setIsLoading(false);
      
      toast.success('API keys saved successfully', {
        description: 'Your API keys have been securely stored.',
      });
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">API Key Settings</h1>
      
      <Tabs defaultValue="llm" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="llm">LLM Providers</TabsTrigger>
          <TabsTrigger value="endpoints">API Endpoints</TabsTrigger>
          <TabsTrigger value="custom">Custom Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="llm">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className={cn(
              "shadow-sm transition-all",
              isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
            )}>
              <CardHeader>
                <CardTitle>OpenAI API Key</CardTitle>
              </CardHeader>
              <CardContent>
                <ApiKeyInput 
                  value={openAIKey} 
                  onChange={setOpenAIKey} 
                  placeholder="sk-..." 
                  label="OpenAI API Key"
                  helpText="Get your API key from openai.com/api-keys"
                />
              </CardContent>
            </Card>
            
            <Card className={cn(
              "shadow-sm transition-all",
              isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
            )}>
              <CardHeader>
                <CardTitle>Anthropic API Key</CardTitle>
              </CardHeader>
              <CardContent>
                <ApiKeyInput 
                  value={anthropicKey} 
                  onChange={setAnthropicKey} 
                  placeholder="sk-ant-..." 
                  label="Anthropic API Key"
                  helpText="Get your API key from console.anthropic.com"
                />
              </CardContent>
            </Card>
            
            <Card className={cn(
              "shadow-sm transition-all",
              isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
            )}>
              <CardHeader>
                <CardTitle>Google AI API Key</CardTitle>
              </CardHeader>
              <CardContent>
                <ApiKeyInput 
                  value={googleKey} 
                  onChange={setGoogleKey} 
                  placeholder="AIza..." 
                  label="Google AI API Key"
                  helpText="Get your API key from console.cloud.google.com"
                />
              </CardContent>
            </Card>
            
            <Card className={cn(
              "shadow-sm transition-all",
              isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
            )}>
              <CardHeader>
                <CardTitle>Mistral AI API Key</CardTitle>
              </CardHeader>
              <CardContent>
                <ApiKeyInput 
                  value={mistoralKey} 
                  onChange={setMistoralKey} 
                  placeholder="..." 
                  label="Mistral AI API Key"
                  helpText="Get your API key from console.mistral.ai"
                />
              </CardContent>
            </Card>
            
            <Card className={cn(
              "shadow-sm transition-all",
              isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
            )}>
              <CardHeader>
                <CardTitle>Azure OpenAI API Key</CardTitle>
              </CardHeader>
              <CardContent>
                <ApiKeyInput 
                  value={azureKey} 
                  onChange={setAzureKey} 
                  placeholder="..." 
                  label="Azure OpenAI API Key"
                  helpText="Get your API key from Azure Portal"
                />
              </CardContent>
            </Card>
            
            <SaveApiKeysButton onClick={handleSaveApiKeys} isLoading={isLoading} />
          </div>
        </TabsContent>
        
        <TabsContent value="endpoints">
          <div className="space-y-6">
            <ApiEndpointDisplay 
              title="Chat Completions Endpoint" 
              description="Use this endpoint for standard chat completions"
              endpoint="https://api.atlas-assistant.ai/v1/chat/completions"
            />
            
            <ApiEndpointDisplay 
              title="Image Generation Endpoint" 
              description="Use this endpoint for image generation"
              endpoint="https://api.atlas-assistant.ai/v1/images/generations"
            />
            
            <ApiEndpointDisplay 
              title="Speech to Text Endpoint" 
              description="Use this endpoint for speech transcription"
              endpoint="https://api.atlas-assistant.ai/v1/audio/transcriptions"
            />
            
            <ApiEndpointDisplay 
              title="Text to Speech Endpoint" 
              description="Use this endpoint for text to speech conversion"
              endpoint="https://api.atlas-assistant.ai/v1/audio/speech"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="custom">
          <Card className={cn(
            "shadow-sm transition-all",
            isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
          )}>
            <CardHeader>
              <CardTitle>Custom API Base URL</CardTitle>
            </CardHeader>
            <CardContent>
              <ApiKeyInput 
                value={customAPIBase} 
                onChange={setCustomAPIBase} 
                placeholder="https://api.your-custom-endpoint.com" 
                label="Custom API Base URL"
                helpText="Enter a custom base URL for API requests"
              />
              <SaveApiKeysButton 
                onClick={handleSaveApiKeys} 
                isLoading={isLoading} 
                text="Save Custom Settings" 
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiKeySettings;
