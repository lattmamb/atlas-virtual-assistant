
import { useState } from "react";
import ApiKeyProvider from "./ApiKeyProvider";
import SaveButton from "./SaveButton";
import { ApiKey } from "@/lib/types";

interface ApiKeyFormProps {
  initialKeys: Partial<ApiKey>;
  onSave: (keys: Partial<ApiKey>) => Promise<void>;
}

const ApiKeyForm = ({ initialKeys, onSave }: ApiKeyFormProps) => {
  const [apiKeys, setApiKeys] = useState<Partial<ApiKey>>(initialKeys);
  const [loading, setLoading] = useState(false);

  const handleApiKeyChange = (provider: keyof ApiKey, value: string) => {
    setApiKeys((prev) => ({
      ...prev,
      [provider]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave(apiKeys);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <ApiKeyProvider 
        providerId="openai"
        providerName="OpenAI"
        keyValue={apiKeys.api_key || ""}
        onKeyChange={(value) => handleApiKeyChange("api_key", value)}
        placeholder="sk-..."
      />

      <ApiKeyProvider 
        providerId="openrouter"
        providerName="OpenRouter"
        keyValue={apiKeys.openrouter || ""}
        onKeyChange={(value) => handleApiKeyChange("openrouter", value)}
        placeholder="sk-or-..."
      />

      <ApiKeyProvider 
        providerId="anthropic"
        providerName="Anthropic"
        keyValue={apiKeys.anthropic || ""}
        onKeyChange={(value) => handleApiKeyChange("anthropic", value)}
        placeholder="sk-ant-..."
      />

      <ApiKeyProvider 
        providerId="google"
        providerName="Google"
        keyValue={apiKeys.google || ""}
        onKeyChange={(value) => handleApiKeyChange("google", value)}
        placeholder="AIza..."
      />

      <ApiKeyProvider 
        providerId="hugging-face"
        providerName="Hugging Face"
        keyValue={apiKeys["hugging face"] || ""}
        onKeyChange={(value) => handleApiKeyChange("hugging face", value)}
        placeholder="hf_..."
      />

      <ApiKeyProvider 
        providerId="cohere"
        providerName="Cohere"
        keyValue={apiKeys.cohere || ""}
        onKeyChange={(value) => handleApiKeyChange("cohere", value)}
        placeholder="co-..."
      />

      <SaveButton loading={loading} onClick={handleSave} />
    </div>
  );
};

export default ApiKeyForm;
