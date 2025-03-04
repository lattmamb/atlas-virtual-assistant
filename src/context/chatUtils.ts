
import { supabase } from "@/integrations/supabase/client";
import { ApiKeyProvider } from "@/lib/types";
import { toast } from "@/components/ui/use-toast";
import { MessageRequest } from "./types";

export async function fetchApiKeys(): Promise<ApiKeyProvider[]> {
  try {
    const { data, error } = await supabase.from("api_keys").select("*");
    
    if (error) {
      throw error;
    }

    if (data && data.length > 0) {
      // Extract available providers based on database structure
      const providers: ApiKeyProvider[] = [];
      
      // Check if API keys exist in the data
      if (data[0].api_key && data[0].api_key.trim() !== '') {
        providers.push('openai'); // Default for api_key
      }
      
      if (data[0]["hugging face"] && data[0]["hugging face"].trim() !== '') {
        providers.push('hugging face');
      }
      
      if (data[0].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 && 
          data[0].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.trim() !== '') {
        providers.push('huggingface');
      }
      
      // Additional providers if they have keys
      const additionalProviders: { [key: string]: ApiKeyProvider } = {
        'anthropic': 'anthropic',
        'cohere': 'cohere',
        'google': 'google'
      };
      
      Object.entries(additionalProviders).forEach(([key, provider]) => {
        if (data[0][key] && data[0][key].trim() !== '') {
          providers.push(provider);
        }
      });
      
      // Remove duplicates
      return [...new Set(providers)];
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching API keys:", error);
    toast({
      title: "Error fetching API keys",
      description: "Please check your database connection.",
      variant: "destructive",
    });
    return [];
  }
}

export async function sendMessageToAI(
  selectedProvider: ApiKeyProvider,
  messages: MessageRequest[]
) {
  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      provider: selectedProvider,
      messages,
    }),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `Error from ${selectedProvider} API`);
  }
  
  return await response.json();
}
