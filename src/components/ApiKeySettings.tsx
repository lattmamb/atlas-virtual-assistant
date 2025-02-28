
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

// Define a consistent type for API key display data
interface ApiKeyDisplayData {
  api_key?: string;
  "hugging face"?: string;
  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?: string;
  // These are for UI display only
  openai?: string;
  anthropic?: string;
  google?: string;
  cohere?: string;
}

const ApiKeySettings = () => {
  const { toast } = useToast();
  const [apiKeys, setApiKeys] = useState<ApiKeyDisplayData>({
    api_key: "",
    "hugging face": "",
    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: "",
    // UI display only
    openai: "",
    anthropic: "",
    google: "",
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
          const keysData: ApiKeyDisplayData = {};
          
          // Map database fields to our state
          if (data[0].api_key) keysData.api_key = data[0].api_key;
          if (data[0]["hugging face"]) keysData["hugging face"] = data[0]["hugging face"];
          if (data[0].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) keysData.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 = data[0].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;
          
          // For UI display - show the actual keys if we fetched them
          if (data[0].api_key) keysData.openai = data[0].api_key;
          if (data[0]["hugging face"]) keysData["hugging face"] = data[0]["hugging face"];
          
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

  const handleApiKeyChange = (provider: keyof ApiKeyDisplayData, value: string) => {
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
      // Prepare data for database update
      const keysToUpdate: any = {
        // Default values for required fields
        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: apiKeys.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 || apiKeys["hugging face"] || "default_key",
      };
      
      // Add the hugging face key if provided
      if (apiKeys["hugging face"]) {
        keysToUpdate["hugging face"] = apiKeys["hugging face"];
      } else {
        keysToUpdate["hugging face"] = "default_key";
      }
      
      // Add the openai key if provided
      if (apiKeys.openai) {
        keysToUpdate.api_key = apiKeys.openai;
      }
      
      console.log("Saving API keys:", keysToUpdate);
      
      // Update the database
      const { error } = await supabase.from("api_keys").upsert([keysToUpdate]);

      if (error) {
        console.error("Supabase error:", error);
        throw new Error(error.message);
      }

      toast({
        title: "API keys saved",
        description: "Your API keys have been securely saved.",
      });
      
      // Fetch the updated keys to confirm the save worked
      const { data: updatedData, error: fetchError } = await supabase.from("api_keys").select("*");
      
      if (fetchError) {
        throw new Error(fetchError.message);
      }
      
      console.log("Updated data:", updatedData);
      
      if (updatedData && updatedData.length > 0) {
        // Update local state with the saved keys
        const savedKeys: ApiKeyDisplayData = {
          ...apiKeys, // Keep any UI-only keys
          api_key: updatedData[0].api_key,
          "hugging face": updatedData[0]["hugging face"],
          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: updatedData[0].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,
          openai: updatedData[0].api_key,
        };
        
        setApiKeys(savedKeys);
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
