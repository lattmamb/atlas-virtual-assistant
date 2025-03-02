
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import ApiKeyForm from "./ApiKeyForm";

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
          
          // Additional provider keys
          if (data[0].anthropic) keysData.anthropic = data[0].anthropic;
          if (data[0].google) keysData.google = data[0].google;
          if (data[0].cohere) keysData.cohere = data[0].cohere;
          
          // For UI display - show the actual keys if we fetched them
          if (data[0].api_key) keysData.openai = data[0].api_key;
          if (data[0]["hugging face"]) {
            keysData["hugging face"] = data[0]["hugging face"];
            keysData.huggingface = data[0]["hugging face"];
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

    fetchApiKeys();
  }, [toast]);

  const handleSaveApiKeys = async (updatedKeys: ApiKeyDisplayData) => {
    try {
      // Prepare data for database update
      const keysToUpdate: any = {
        // Default values for required fields
        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: updatedKeys.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 || updatedKeys["hugging face"] || "default_key",
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
      const { data: updatedData, error: fetchError } = await supabase.from("api_keys").select("*");
      
      if (fetchError) {
        throw new Error(fetchError.message);
      }
      
      console.log("Updated data:", updatedData);
      
      if (updatedData && updatedData.length > 0) {
        // Update local state with the saved keys
        const savedKeys: ApiKeyDisplayData = {
          ...updatedKeys, // Keep any UI-only keys
          api_key: updatedData[0].api_key,
          "hugging face": updatedData[0]["hugging face"],
          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: updatedData[0].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,
          anthropic: updatedData[0].anthropic,
          google: updatedData[0].google,
          cohere: updatedData[0].cohere,
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
