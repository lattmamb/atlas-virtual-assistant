
import { ApiKey, ApiKeyProvider } from "@/lib/types";

export const extractApiKeys = (apiKeys: ApiKey[] | null): Record<ApiKeyProvider, string | null> => {
  const keys: Record<ApiKeyProvider, string | null> = {
    openai: null,
    anthropic: null,
    huggingface: null,
    google: null,
    cohere: null,
    openrouter: null,
  };

  if (!apiKeys || apiKeys.length === 0) {
    return keys;
  }

  const firstKey = apiKeys[0];
  
  keys.openai = firstKey.api_key;
  keys.anthropic = firstKey.anthropic;
  keys.huggingface = firstKey["hugging face"] || firstKey.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;
  keys.google = firstKey.google;
  keys.cohere = firstKey.cohere;
  keys.openrouter = firstKey.openrouter;

  return keys;
};

export const getAvailableProviders = (apiKeys: Record<ApiKeyProvider, string | null>): ApiKeyProvider[] => {
  return Object.entries(apiKeys)
    .filter(([_, value]) => value !== null && value !== '')
    .map(([key]) => key as ApiKeyProvider);
};
