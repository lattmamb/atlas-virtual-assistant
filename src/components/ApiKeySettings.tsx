
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ApiKeyProvider } from "@/context/ChatContext";

// Define a consistent type for API key data
interface ApiKeyData {
  openai?: string;
  anthropic?: string;
  google?: string;
  "hugging face"?: string;
  cohere?: string;
}

const ApiKeySettings = () => {
  const { toast } = useToast();
  const [apiKeys, setApiKeys] = useState<ApiKeyData>({
    openai: "",
    anthropic: "",
    google: "",
    "hugging face": "",
    cohere: "",
  });
  
  // Control visibility of API keys
  const [showKeys, setShowKeys] = useState({
    openai: false,
    anthropic: false,
    google: false,
    "hugging face": false,
    cohere: false,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        const { data, error } = await supabase.from("api_keys").select("*");

        if (error) {
          throw new Error(error.message);
        }

        if (data && data.length > 0) {
          // Use the first row of data
          const keysData: ApiKeyData = {};
          
          // Map database fields to our state
          if (data[0].openai) keysData.openai = "••••••••••••••••";
          if (data[0].anthropic) keysData.anthropic = "••••••••••••••••";
          if (data[0].google) keysData.google = "••••••••••••••••";
          if (data[0]["hugging face"]) keysData["hugging face"] = "••••••••••••••••";
          if (data[0].cohere) keysData.cohere = "••••••••••••••••";
          
          setApiKeys(keysData);
        }
      } catch (error) {
        console.error("Error fetching API keys:", error);
        toast({
          title: "Error fetching API keys",
          description: "Please check your database connection.",
          variant: "destructive",
        });
      }
    };

    fetchApiKeys();
  }, [toast]);

  const handleApiKeyChange = (provider: keyof ApiKeyData, value: string) => {
    setApiKeys((prev) => ({
      ...prev,
      [provider]: value,
    }));
  };

  const toggleShowKey = (provider: keyof typeof showKeys) => {
    setShowKeys((prev) => ({
      ...prev,
      [provider]: !prev[provider],
    }));
  };

  const handleSaveApiKeys = async () => {
    setLoading(true);
    try {
      // Filter out masked values and empty strings
      const keysToUpdate: ApiKeyData = {};
      
      // Only update keys that have been changed (not masked)
      if (apiKeys.openai && !apiKeys.openai.includes("•")) keysToUpdate.openai = apiKeys.openai;
      if (apiKeys.anthropic && !apiKeys.anthropic.includes("•")) keysToUpdate.anthropic = apiKeys.anthropic;
      if (apiKeys.google && !apiKeys.google.includes("•")) keysToUpdate.google = apiKeys.google;
      if (apiKeys["hugging face"] && !apiKeys["hugging face"].includes("•")) keysToUpdate["hugging face"] = apiKeys["hugging face"];
      if (apiKeys.cohere && !apiKeys.cohere.includes("•")) keysToUpdate.cohere = apiKeys.cohere;

      // If there are keys to update
      if (Object.keys(keysToUpdate).length > 0) {
        const { data, error } = await supabase.from("api_keys").upsert([keysToUpdate], {
          onConflict: "user_id",
        });

        if (error) {
          throw new Error(error.message);
        }

        // Mask the saved keys for display
        const maskedKeys = { ...apiKeys };
        for (const key in keysToUpdate) {
          maskedKeys[key as keyof ApiKeyData] = "••••••••••••••••";
        }
        setApiKeys(maskedKeys);

        toast({
          title: "API keys saved",
          description: "Your API keys have been securely saved.",
        });
      } else {
        toast({
          title: "No changes to save",
          description: "No API key changes were detected.",
        });
      }
    } catch (error) {
      console.error("Error saving API keys:", error);
      toast({
        title: "Error saving API keys",
        description: "An error occurred while saving your API keys.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Key Settings</CardTitle>
        <CardDescription>
          Configure your API keys for various language model providers.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* OpenAI API Key */}
        <div className="space-y-2">
          <Label htmlFor="openai">OpenAI API Key</Label>
          <div className="flex gap-2">
            <Input
              id="openai"
              type={showKeys.openai ? "text" : "password"}
              placeholder="sk-..."
              value={apiKeys.openai || ""}
              onChange={(e) => handleApiKeyChange("openai", e.target.value)}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => toggleShowKey("openai")}
              type="button"
            >
              {showKeys.openai ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>
        </div>

        {/* Anthropic API Key */}
        <div className="space-y-2">
          <Label htmlFor="anthropic">Anthropic API Key</Label>
          <div className="flex gap-2">
            <Input
              id="anthropic"
              type={showKeys.anthropic ? "text" : "password"}
              placeholder="sk-ant-..."
              value={apiKeys.anthropic || ""}
              onChange={(e) => handleApiKeyChange("anthropic", e.target.value)}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => toggleShowKey("anthropic")}
              type="button"
            >
              {showKeys.anthropic ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>
        </div>

        {/* Google API Key */}
        <div className="space-y-2">
          <Label htmlFor="google">Google API Key</Label>
          <div className="flex gap-2">
            <Input
              id="google"
              type={showKeys.google ? "text" : "password"}
              placeholder="aiz-..."
              value={apiKeys.google || ""}
              onChange={(e) => handleApiKeyChange("google", e.target.value)}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => toggleShowKey("google")}
              type="button"
            >
              {showKeys.google ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>
        </div>

        {/* Hugging Face API Key */}
        <div className="space-y-2">
          <Label htmlFor="hugging-face">Hugging Face API Key</Label>
          <div className="flex gap-2">
            <Input
              id="hugging-face"
              type={showKeys["hugging face"] ? "text" : "password"}
              placeholder="hf_..."
              value={apiKeys["hugging face"] || ""}
              onChange={(e) => handleApiKeyChange("hugging face", e.target.value)}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => toggleShowKey("hugging face")}
              type="button"
            >
              {showKeys["hugging face"] ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>
        </div>

        {/* Cohere API Key */}
        <div className="space-y-2">
          <Label htmlFor="cohere">Cohere API Key</Label>
          <div className="flex gap-2">
            <Input
              id="cohere"
              type={showKeys.cohere ? "text" : "password"}
              placeholder="co-..."
              value={apiKeys.cohere || ""}
              onChange={(e) => handleApiKeyChange("cohere", e.target.value)}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => toggleShowKey("cohere")}
              type="button"
            >
              {showKeys.cohere ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>
        </div>

        <Button
          onClick={handleSaveApiKeys}
          className="w-full"
          disabled={loading}
        >
          {loading ? (
            <div className="loading-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> Save API Keys
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ApiKeySettings;
