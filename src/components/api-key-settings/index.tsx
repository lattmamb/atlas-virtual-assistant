
import React from 'react';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { ApiKey } from '@/lib/types';
import ApiKeyInput from './ApiKeyInput';
import ApiEndpointDisplay from './ApiEndpointDisplay';
import SaveApiKeysButton from './SaveApiKeysButton';

const ApiKeySettings = () => {
  const [openAIKey, setOpenAIKey] = useState('');
  const [anthropicKey, setAnthropicKey] = useState('');
  const [hfKey, setHFKey] = useState('');
  const [googleKey, setGoogleKey] = useState('');
  const [cohereKey, setCohereKey] = useState('');
  const [openRouterKey, setOpenRouterKey] = useState('');
  const [id, setId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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
        toast.error(`Error fetching API keys: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }

    getApiKey();
  }, []);

  const saveApiKeys = async () => {
    setIsLoading(true);
    try {
      const apiKeyData = {
        id: id ? String(id) : undefined,
        api_key: openAIKey,
        anthropic: anthropicKey,
        "hugging face": hfKey,
        google: googleKey,
        cohere: cohereKey,
        openrouter: openRouterKey,
        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: hfKey // Required field
      };

      const result = await supabase.from('api_keys').upsert(apiKeyData);

      if (result.error) {
        throw result.error;
      }
      toast.success("API keys saved successfully");
    } catch (error: any) {
      toast.error(`Error saving API keys: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">API Key Settings</h1>
      <div className="space-y-4">
        <ApiKeyInput
          id="openai-key"
          label="OpenAI API Key"
          placeholder="sk-..."
          value={openAIKey}
          onChange={setOpenAIKey}
        />
        <ApiKeyInput
          id="anthropic-key"
          label="Anthropic API Key"
          placeholder="sk-ant-..."
          value={anthropicKey}
          onChange={setAnthropicKey}
        />
        <ApiKeyInput
          id="hf-key"
          label="Hugging Face API Key"
          placeholder="hf_..."
          value={hfKey}
          onChange={setHFKey}
        />
        <ApiKeyInput
          id="google-key"
          label="Google API Key"
          placeholder="AIza..."
          value={googleKey}
          onChange={setGoogleKey}
        />
        <ApiKeyInput
          id="cohere-key"
          label="Cohere API Key"
          placeholder="xxxx-..."
          value={cohereKey}
          onChange={setCohereKey}
        />
        <ApiKeyInput
          id="openrouter-key"
          label="OpenRouter API Key"
          placeholder="sk-or-..."
          value={openRouterKey}
          onChange={setOpenRouterKey}
        />
      </div>
      <SaveApiKeysButton isLoading={isLoading} onClick={saveApiKeys} />
      <ApiEndpointDisplay />
    </div>
  );
};

export default ApiKeySettings;
