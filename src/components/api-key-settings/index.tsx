
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import ApiKeyForm from "./ApiKeyForm";
import { useAuth } from "@/context/AuthContext";

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
  huggingface?: string;
}

const ApiKeySettings = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [apiKeys, setApiKeys] = useState<ApiKeyDisplayData>({
    api_key: "",
    "hugging face": "",
    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: "",
    // UI display only
    openai: "",
    anthropic: "",
    google: "",
    cohere: "",
    huggingface: "",
  });

  useEffect(() => {
    if (user) {
      fetchApiKeys();
    }
  }, [user]);

  const fetchApiKeys = async () => {
    try {
      const { data, error } = await supabase
        .from("api_keys")
        .select("*")
        .maybeSingle();

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        // Use the first row of data
        const keysData: ApiKeyDisplayData = {};
        
        // Map database fields to our state
        if (data.api_key) keysData.api_key = data.api_key;
        if (data["hugging face"]) keysData["hugging face"] = data["hugging face"];
        if (data.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) keysData.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 = data.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;
        
        // Additional provider keys
        if (data.anthropic) keysData.anthropic = data.anthropic;
        if (data.google) keysData.google = data.google;
        if (data.cohere) keysData.cohere = data.cohere;
        
        // For UI display - show the actual keys if we fetched them
        if (data.api_key) keysData.openai = data.api_key;
        if (data["hugging face"]) {
          keysData["hugging face"] = data["hugging face"];
          keysData.huggingface = data["hugging face"];
        }
        
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

  const handleSaveApiKeys = async (updatedKeys: ApiKeyDisplayData) => {
    try {
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to save API keys",
          variant: "destructive",
        });
        return;
      }

      // Prepare data for database update
      const keysToUpdate: any = {
        // Default values for required fields
        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: updatedKeys.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 || updatedKeys["hugging face"] || "default_key",
        user_id: user.id,
      };
      
      // Add the hugging face key if provided
      if (updatedKeys["hugging face"]) {
        keysToUpdate["hugging face"] = updatedKeys["hugging face"];
      } else {
        keysToUpdate["hugging face"] = "default_key";
      }
      
      // Add the openai key if provided
      if (updatedKeys.openai) {
        keysToUpdate.api_key = updatedKeys.openai;
      }
      
      // Add additional provider keys
      if (updatedKeys.anthropic) {
        keysToUpdate.anthropic = updatedKeys.anthropic;
      }
      
      if (updatedKeys.google) {
        keysToUpdate.google = updatedKeys.google;
      }
      
      if (updatedKeys.cohere) {
        keysToUpdate.cohere = updatedKeys.cohere;
      }
      
      // If huggingface is provided but hugging face is not, use it
      if (updatedKeys.huggingface && !updatedKeys["hugging face"]) {
        keysToUpdate["hugging face"] = updatedKeys.huggingface;
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
      fetchApiKeys();
      
    } catch (error) {
      console.error("Error saving API keys:", error);
      toast({
        title: "Error saving API keys",
        description: "An error occurred while saving your API keys.",
        variant: "destructive",
      });
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
      <CardContent>
        <ApiKeyForm 
          initialKeys={apiKeys} 
          onSave={handleSaveApiKeys} 
        />
      </CardContent>
    </Card>
  );
};

export default ApiKeySettings;
