
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Key } from "lucide-react";
import { ApiKeyProvider } from "@/lib/types";

interface ApiKeyFormProps {
  provider: ApiKeyProvider;
  currentKey?: string;
  onSuccess: () => void;
}

export function ApiKeyForm({ provider, currentKey, onSuccess }: ApiKeyFormProps) {
  const [apiKey, setApiKey] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const providerNames = {
    openai: "OpenAI",
    anthropic: "Anthropic",
    cohere: "Cohere"
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session?.user.id) {
        throw new Error("You must be logged in to save API keys");
      }
      
      const { error } = await supabase.from("api_keys").upsert({
        user_id: sessionData.session.user.id,
        provider,
        api_key: apiKey
      }, {
        onConflict: "user_id,provider"
      });
      
      if (error) throw error;
      
      toast({
        title: "API Key Saved",
        description: `Your ${providerNames[provider]} API key has been saved successfully.`
      });
      
      setApiKey("");
      onSuccess();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to save API key";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">{providerNames[provider]} API Key</label>
        <div className="relative">
          <input
            type={isVisible ? "text" : "password"}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="pr-10 w-full rounded-md border border-input bg-background p-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder={currentKey ? "••••••••" : `Enter your ${providerNames[provider]} API key`}
          />
          <button
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          {currentKey ? "You already have a key saved. Enter a new one to update." : "Your API key is stored securely and never shared."}
        </p>
      </div>
      <button
        type="submit"
        disabled={isSubmitting || !apiKey.trim()}
        className="w-full flex items-center justify-center gap-2 rounded-md bg-primary p-3 text-sm font-medium text-white hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        <Key className="h-4 w-4" />
        {currentKey ? "Update API Key" : "Save API Key"}
      </button>
    </form>
  );
}
