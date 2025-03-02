
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ApiKeyProvider, Message, ChatContextType } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";
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
  const { user } = useAuth();

  useEffect(() => {
    // Fetch available providers on component mount
    if (user) {
      fetchApiKeys();
    }
  }, [user]);

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
      // In the future, this will call a Supabase Edge Function to handle API requests
      const apiResponse = await processWithAI(content, selectedProvider);
      
      // Add assistant response
      addMessage(apiResponse, "assistant");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Sorry, there was an error processing your request.");
      addMessage("Sorry, there was an error processing your request.", "assistant");
    } finally {
      setIsLoading(false);
    }
  };

  // Placeholder function for future API integration
  const processWithAI = async (content: string, provider: ApiKeyProvider | null): Promise<string> => {
    // Simulate API response delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return `This is a response from the ${provider} model to: "${content}". In the future, this will use a real API call to process your request.`;
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
