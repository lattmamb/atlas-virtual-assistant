
import { useState, useEffect } from "react";
import { ApiKeyProvider } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function ApiKeySettings() {
  const [openaiKey, setOpenaiKey] = useState("");
  const [anthropicKey, setAnthropicKey] = useState("");
  const [cohereKey, setCohereKey] = useState("");
  const [huggingfaceKey, setHuggingfaceKey] = useState("");
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({
    openai: false,
    anthropic: false,
    cohere: false,
    huggingface: false,
  });
  const [loading, setLoading] = useState<Record<string, boolean>>({
    openai: false,
    anthropic: false,
    cohere: false,
    huggingface: false,
  });
  const { toast } = useToast();

  // Load saved keys on component mount
  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        const { data, error } = await supabase
          .from("api_keys")
          .select("*");

        if (error) {
          console.error("Error fetching API keys:", error);
          return;
        }

        if (data && data.length > 0) {
          // Map the keys to their respective state variables
          data.forEach((keyItem) => {
            if (keyItem.provider === "openai" && keyItem.api_key) {
              setOpenaiKey("********");
            }
            if (keyItem.provider === "anthropic" && keyItem.api_key) {
              setAnthropicKey("********");
            }
            if (keyItem.provider === "cohere" && keyItem.api_key) {
              setCohereKey("********");
            }
            if (keyItem.provider === "huggingface" && keyItem.api_key) {
              setHuggingfaceKey("********");
            }
          });
        }
      } catch (error) {
        console.error("Error in fetchApiKeys:", error);
      }
    };

    fetchApiKeys();
  }, []);

  const toggleVisibility = (provider: string) => {
    setVisibleKeys((prev) => ({
      ...prev,
      [provider]: !prev[provider],
    }));
  };

  const saveKey = async (provider: ApiKeyProvider, key: string) => {
    if (!key.trim() || key === "********") return;

    setLoading((prev) => ({ ...prev, [provider]: true }));

    try {
      // First check if the key already exists
      const { data: existingKeys, error: fetchError } = await supabase
        .from("api_keys")
        .select("*")
        .eq("provider", provider);

      if (fetchError) {
        throw fetchError;
      }

      let result;

      if (existingKeys && existingKeys.length > 0) {
        // Update existing key
        result = await supabase
          .from("api_keys")
          .update({ api_key: key })
          .eq("provider", provider);
      } else {
        // Insert new key
        result = await supabase
          .from("api_keys")
          .insert([{ provider, api_key: key }]);
      }

      if (result.error) {
        throw result.error;
      }

      toast({
        title: "API Key Saved",
        description: `Your ${provider.charAt(0).toUpperCase() + provider.slice(1)} API key has been saved successfully.`,
      });

      // Mask the key after saving
      switch (provider) {
        case "openai":
          setOpenaiKey("********");
          break;
        case "anthropic":
          setAnthropicKey("********");
          break;
        case "cohere":
          setCohereKey("********");
          break;
        case "huggingface":
          setHuggingfaceKey("********");
          break;
      }
    } catch (error) {
      console.error(`Error saving ${provider} API key:`, error);
      toast({
        title: "Error Saving API Key",
        description: `There was a problem saving your ${provider} API key. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setLoading((prev) => ({ ...prev, [provider]: false }));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">API Keys</h2>
        <p className="text-sm text-muted-foreground">
          Configure your AI service provider API keys to use with Atlas Assistant.
        </p>
      </div>
      
      <Tabs defaultValue="huggingface" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="huggingface">Hugging Face</TabsTrigger>
          <TabsTrigger value="openai">OpenAI</TabsTrigger>
          <TabsTrigger value="anthropic">Anthropic</TabsTrigger>
          <TabsTrigger value="cohere">Cohere</TabsTrigger>
        </TabsList>
        
        <TabsContent value="huggingface" className="p-4 border rounded-md mt-2">
          <div className="space-y-4">
            <label className="text-sm font-medium">Hugging Face API Token</label>
            <div className="relative">
              <input
                type={visibleKeys.huggingface ? "text" : "password"}
                value={huggingfaceKey}
                onChange={(e) => setHuggingfaceKey(e.target.value)}
                className="w-full rounded-md border border-input bg-background p-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring pr-10"
                placeholder="Enter your Hugging Face API token"
              />
              <button
                type="button"
                onClick={() => toggleVisibility("huggingface")}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {visibleKeys.huggingface ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <button
              onClick={() => saveKey("huggingface", huggingfaceKey)}
              disabled={!huggingfaceKey.trim() || huggingfaceKey === "********" || loading.huggingface}
              className="mt-2 px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center"
            >
              {loading.huggingface ? (
                <span className="inline-block h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></span>
              ) : null}
              Save Hugging Face Token
            </button>
          </div>
        </TabsContent>
        
        <TabsContent value="openai" className="p-4 border rounded-md mt-2">
          <div className="space-y-4">
            <label className="text-sm font-medium">OpenAI API Key</label>
            <div className="relative">
              <input
                type={visibleKeys.openai ? "text" : "password"}
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                className="w-full rounded-md border border-input bg-background p-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring pr-10"
                placeholder="Enter your OpenAI API key"
              />
              <button
                type="button"
                onClick={() => toggleVisibility("openai")}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {visibleKeys.openai ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <button
              onClick={() => saveKey("openai", openaiKey)}
              disabled={!openaiKey.trim() || openaiKey === "********" || loading.openai}
              className="mt-2 px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center"
            >
              {loading.openai ? (
                <span className="inline-block h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></span>
              ) : null}
              Save OpenAI Key
            </button>
          </div>
        </TabsContent>
        
        <TabsContent value="anthropic" className="p-4 border rounded-md mt-2">
          <div className="space-y-4">
            <label className="text-sm font-medium">Anthropic API Key</label>
            <div className="relative">
              <input
                type={visibleKeys.anthropic ? "text" : "password"}
                value={anthropicKey}
                onChange={(e) => setAnthropicKey(e.target.value)}
                className="w-full rounded-md border border-input bg-background p-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring pr-10"
                placeholder="Enter your Anthropic API key"
              />
              <button
                type="button"
                onClick={() => toggleVisibility("anthropic")}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {visibleKeys.anthropic ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <button
              onClick={() => saveKey("anthropic", anthropicKey)}
              disabled={!anthropicKey.trim() || anthropicKey === "********" || loading.anthropic}
              className="mt-2 px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center"
            >
              {loading.anthropic ? (
                <span className="inline-block h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></span>
              ) : null}
              Save Anthropic Key
            </button>
          </div>
        </TabsContent>
        
        <TabsContent value="cohere" className="p-4 border rounded-md mt-2">
          <div className="space-y-4">
            <label className="text-sm font-medium">Cohere API Key</label>
            <div className="relative">
              <input
                type={visibleKeys.cohere ? "text" : "password"}
                value={cohereKey}
                onChange={(e) => setCohereKey(e.target.value)}
                className="w-full rounded-md border border-input bg-background p-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring pr-10"
                placeholder="Enter your Cohere API key"
              />
              <button
                type="button"
                onClick={() => toggleVisibility("cohere")}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {visibleKeys.cohere ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <button
              onClick={() => saveKey("cohere", cohereKey)}
              disabled={!cohereKey.trim() || cohereKey === "********" || loading.cohere}
              className="mt-2 px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center"
            >
              {loading.cohere ? (
                <span className="inline-block h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></span>
              ) : null}
              Save Cohere Key
            </button>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="text-sm p-4 bg-blue-50 rounded-md">
        <p className="font-medium text-blue-800">Getting API Keys</p>
        <ul className="list-disc list-inside mt-2 text-blue-700 space-y-1">
          <li><a href="https://huggingface.co/settings/tokens" target="_blank" rel="noopener noreferrer" className="underline">Hugging Face API Tokens</a></li>
          <li><a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">OpenAI API Keys</a></li>
          <li><a href="https://console.anthropic.com/account/keys" target="_blank" rel="noopener noreferrer" className="underline">Anthropic API Keys</a></li>
          <li><a href="https://dashboard.cohere.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">Cohere API Keys</a></li>
        </ul>
      </div>
    </div>
  );
}
