
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ApiKeyProvider, Message, ChatContextType } from "@/lib/types";

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
          
          // Check which providers have keys configured
          if (data[0].api_key) providers.push("openai");
          if (data[0].anthropic) providers.push("anthropic");
          if (data[0]["hugging face"] || data[0].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) providers.push("huggingface");
          if (data[0].google) providers.push("google");
          if (data[0].cohere) providers.push("cohere");
          if (data[0].openrouter) providers.push("openrouter");
          
          setAvailableProviders(providers);
          
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
      // Placeholder for actual API call
      // In a real implementation, this would send the message to the selected provider's API
      
      let responseMessage = "";
      
      if (selectedProvider === "openrouter") {
        // For OpenRouter, we'd fetch from their API
        responseMessage = `This is a response from OpenRouter to: "${content}"`;
        // In a real implementation, you would fetch from OpenRouter's API here
      } else {
        // Simulate API response for other providers
        responseMessage = `This is a response from the ${selectedProvider} model to: "${content}"`;
      }
      
      // Add assistant response
      addMessage(responseMessage, "assistant");
    } catch (error) {
      console.error("Error sending message:", error);
      addMessage("Sorry, there was an error processing your request.", "assistant");
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
