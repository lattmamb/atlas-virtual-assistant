
import React from 'react';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CheckCircle2, Copy, Loader2 } from 'lucide-react';
import { ApiKey } from '@/lib/types';

const ApiKeySettings = () => {
  const [openAIKey, setOpenAIKey] = useState('');
  const [anthropicKey, setAnthropicKey] = useState('');
  const [hfKey, setHFKey] = useState('');
  const [googleKey, setGoogleKey] = useState('');
  const [cohereKey, setCohereKey] = useState('');
  const [openRouterKey, setOpenRouterKey] = useState('');
  const [id, setId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  React.useEffect(() => {
    const getApiKey = async () => {
      setIsLoading(true);
      try {
        let { data, error, status } = await supabase
          .from('api_keys')
          .select(`api_key, anthropic, "hugging face", google, cohere, openrouter, id`)
          .single()

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          const apiKeys = data as ApiKey;
          setOpenAIKey(apiKeys.api_key || '');
          setAnthropicKey(apiKeys.anthropic || '');
          setHFKey(apiKeys["hugging face"] || '');
          setGoogleKey(apiKeys.google || '');
          setCohereKey(apiKeys.cohere || '');
          if ('openrouter' in apiKeys && apiKeys.openrouter) {
            setOpenRouterKey(apiKeys.openrouter as string);
          }
          setId(apiKeys.id ? Number(apiKeys.id) : null);
        }
      } catch (error: any) {
        toast({
          title: "Error fetching API keys",
          description: error.message,
        })
      } finally {
        setIsLoading(false);
      }
    }

    getApiKey();
  }, []);

  const saveApiKeys = async () => {
    setIsLoading(true);
    try {
      const apiKeyData: Partial<ApiKey> = {
        id: id ? String(id) : undefined,
        api_key: openAIKey,
        anthropic: anthropicKey,
        "hugging face": hfKey,
        google: googleKey,
        cohere: cohereKey,
        openrouter: openRouterKey,
        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: hfKey // Required field
      };

      const result = await supabase.from('api_keys').upsert([apiKeyData]);

      if (result.error) {
        throw result.error;
      }
      toast({
        title: "Success!",
        description: "API keys saved",
      })
    } catch (error: any) {
      toast({
        title: "Error saving API keys",
        description: error.message,
      })
    } finally {
      setIsLoading(false);
    }
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(window.location.origin + '/api/chat')
      .then(() => {
        setIsCopied(true);
        toast({
          title: "Copied!",
          description: "API endpoint copied to clipboard",
        })
        setTimeout(() => {
          setIsCopied(false);
        }, 3000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast({
          title: "Error copying",
          description: "Failed to copy API endpoint",
        })
      });
  };

  return (
    <div className="container max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">API Key Settings</h1>
      <div className="space-y-4">
        <div>
          <Label htmlFor="openai-key">OpenAI API Key</Label>
          <Input
            type="password"
            id="openai-key"
            placeholder="sk-..."
            value={openAIKey}
            onChange={(e) => setOpenAIKey(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="anthropic-key">Anthropic API Key</Label>
          <Input
            type="password"
            id="anthropic-key"
            placeholder="sk-ant-..."
            value={anthropicKey}
            onChange={(e) => setAnthropicKey(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="hf-key">Hugging Face API Key</Label>
          <Input
            type="password"
            id="hf-key"
            placeholder="hf_..."
            value={hfKey}
            onChange={(e) => setHFKey(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="google-key">Google API Key</Label>
          <Input
            type="password"
            id="google-key"
            placeholder="AIza..."
            value={googleKey}
            onChange={(e) => setGoogleKey(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="cohere-key">Cohere API Key</Label>
          <Input
            type="password"
            id="cohere-key"
            placeholder="xxxx-..."
            value={cohereKey}
            onChange={(e) => setCohereKey(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="openrouter-key">OpenRouter API Key</Label>
          <Input
            type="password"
            id="openrouter-key"
            placeholder="sk-or-..."
            value={openRouterKey}
            onChange={(e) => setOpenRouterKey(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-6">
        <Button onClick={saveApiKeys} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save API Keys"
          )}
        </Button>
      </div>
      <div className="mt-8 p-4 bg-gray-100 rounded-md">
        <h2 className="text-xl font-semibold mb-4">API Endpoint</h2>
        <p className="text-gray-700 mb-2">
          Use the following endpoint to send requests to your chat model:
        </p>
        <div className="relative">
          <Input
            type="text"
            value={window.location.origin + '/api/chat'}
            readOnly
            className="bg-gray-50 cursor-not-allowed"
          />
          <Button
            onClick={handleCopyToClipboard}
            disabled={isCopied}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {isCopied ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeySettings;
