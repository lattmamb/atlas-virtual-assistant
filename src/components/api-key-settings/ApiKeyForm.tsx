
import { useState } from "react";
import ApiKeyProvider from "./ApiKeyProvider";
import SaveButton from "./SaveButton";

// Define a type for the API keys
interface ApiKeysState {
  api_key?: string;
  "hugging face"?: string;
  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?: string;
  openai?: string;
  anthropic?: string;
  google?: string;
  cohere?: string;
  huggingface?: string;
}

interface ApiKeyFormProps {
  initialKeys: ApiKeysState;
  onSave: (keys: ApiKeysState) => Promise<void>;
}

const ApiKeyForm = ({ initialKeys, onSave }: ApiKeyFormProps) => {
  const [apiKeys, setApiKeys] = useState<ApiKeysState>(initialKeys);
  const [loading, setLoading] = useState(false);

  const handleApiKeyChange = (provider: keyof ApiKeysState, value: string) => {
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
        keyValue={apiKeys.openai || ""}
        onKeyChange={(value) => handleApiKeyChange("openai", value)}
        placeholder="sk-..."
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
