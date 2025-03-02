
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ApiKeyProvider, Message, ChatContextType, ApiKey } from "@/lib/types";
import { toast } from "sonner";

// Create Context with default values
const ChatContext = createContext<ChatContextType>({
  messages: [],
  addMessage: () => {},
  clearMessages: () => {},
  isLoading: false,
  selectedProvider: null,
  setSelectedProvider: () => {},
  availableProviders: [],
  sendMessage: () => {},
});

export const useChat = () => useContext(ChatContext);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<ApiKeyProvider | null>("openai");
  const [availableProviders, setAvailableProviders] = useState<ApiKeyProvider[]>(["openai"]);
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({});

  useEffect(() => {
    // Fetch available providers on component mount
    const fetchApiKeys = async () => {
      try {
        const { data, error } = await supabase.from("api_keys").select("*");
        
        if (error) {
          console.error("Error fetching API keys:", error);
          return;
        }
        
        if (data && data.length > 0) {
          const providers: ApiKeyProvider[] = [];
          const keys: Record<string, string> = {};
          
          const apiKeyData = data[0] as ApiKey;
          
          // Check which providers have keys configured
          if (apiKeyData.api_key) {
            providers.push("openai");
            keys["openai"] = apiKeyData.api_key;
          }
          if ('anthropic' in apiKeyData && apiKeyData.anthropic) {
            providers.push("anthropic");
            keys["anthropic"] = apiKeyData.anthropic;
          }
          if (apiKeyData["hugging face"] || apiKeyData.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) {
            providers.push("huggingface");
            keys["huggingface"] = apiKeyData["hugging face"] || apiKeyData.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 || "";
          }
          if ('google' in apiKeyData && apiKeyData.google) {
            providers.push("google");
            keys["google"] = apiKeyData.google;
          }
          if ('cohere' in apiKeyData && apiKeyData.cohere) {
            providers.push("cohere");
            keys["cohere"] = apiKeyData.cohere;
          }
          if ('openrouter' in apiKeyData && apiKeyData.openrouter) {
            providers.push("openrouter");
            keys["openrouter"] = apiKeyData.openrouter;
          }
          
          setAvailableProviders(providers);
          setApiKeys(keys);
          
          // Set default provider if available
          if (providers.length > 0 && !selectedProvider) {
            setSelectedProvider(providers[0]);
          }
        }
      } catch (error) {
        console.error("Error in fetchApiKeys:", error);
      }
    };
    
    fetchApiKeys();
  }, []);

  const addMessage = (content: string, role: "user" | "assistant" | "system") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role,
      createdAt: new Date(),
    };
    
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    return newMessage;
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    addMessage(content, "user");
    
    setIsLoading(true);
    
    try {
      let responseMessage = "";
      
      if (selectedProvider === "openrouter") {
        const apiKey = apiKeys["openrouter"];
        
        if (!apiKey) {
          throw new Error("OpenRouter API key is not configured");
        }
        
        // Make an actual call to OpenRouter API
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
            "HTTP-Referer": window.location.origin,
            "X-Title": "Atlas Assistant"
          },
          body: JSON.stringify({
            model: "openai/gpt-3.5-turbo", // Default model
            messages: [
              { role: "system", content: "You are Atlas, a friendly and helpful AI assistant for Trinity Dodge in Taylorville, Illinois." },
              ...messages.map(msg => ({ role: msg.role, content: msg.content })),
              { role: "user", content }
            ]
          })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || "Failed to get response from OpenRouter");
        }
        
        const data = await response.json();
        responseMessage = data.choices[0]?.message?.content || "No response from the model";
        
        // Log model used
        console.log("Used model:", data.model);
      } else {
        // Simulate API response for other providers
        responseMessage = `This is a response from the ${selectedProvider} model to: "${content}"`;
        // In a real implementation, you would fetch from the respective provider's API here
      }
      
      // Add assistant response
      addMessage(responseMessage, "assistant");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(`Error: ${error instanceof Error ? error.message : "Failed to process your request"}`);
      addMessage("Sorry, there was an error processing your request. Please try again later.", "assistant");
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    messages,
    addMessage,
    clearMessages,
    isLoading,
    selectedProvider,
    setSelectedProvider,
    availableProviders,
    sendMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
