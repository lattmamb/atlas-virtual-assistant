
import React, { createContext, useContext, useEffect, useState } from "react";
import { ApiKeyProvider } from "@/lib/types";
import { supabase } from "@/integrations/supabase/client";

// Define message types
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isLoading?: boolean;
}

// Define context type
interface ChatContextType {
  messages: Message[];
  sendMessage: (content: string) => void;
  isLoading: boolean;
  selectedProvider: ApiKeyProvider | null;
  setSelectedProvider: (provider: ApiKeyProvider | null) => void;
  availableProviders: ApiKeyProvider[];
}

// Create context with default values
const ChatContext = createContext<ChatContextType>({
  messages: [],
  sendMessage: () => {},
  isLoading: false,
  selectedProvider: null,
  setSelectedProvider: () => {},
  availableProviders: [],
});

// Hook to use the chat context
export const useChat = () => useContext(ChatContext);

// Chat provider component
export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<ApiKeyProvider | null>(null);
  const [availableProviders, setAvailableProviders] = useState<ApiKeyProvider[]>([]);

  // Function to fetch available API keys from Supabase
  const fetchAvailableProviders = async () => {
    try {
      const { data, error } = await supabase
        .from("api_keys")
        .select("provider, api_key");

      if (error) {
        console.error("Error fetching API keys:", error);
        return;
      }

      // Filter out providers with valid API keys
      const providers = data
        .filter(item => item.api_key && item.api_key.trim() !== "")
        .map(item => item.provider as ApiKeyProvider);

      setAvailableProviders(providers);

      // Set the first available provider as selected if none is selected
      if (providers.length > 0 && !selectedProvider) {
        setSelectedProvider(providers[0]);
      }
    } catch (error) {
      console.error("Error in fetchAvailableProviders:", error);
    }
  };

  // Fetch available API keys on component mount
  useEffect(() => {
    fetchAvailableProviders();
    
    // Set up a subscription to listen for changes to the api_keys table
    const subscription = supabase
      .channel('api_keys_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'api_keys' }, payload => {
        console.log('Changes detected in api_keys:', payload);
        fetchAvailableProviders();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Function to send a message
  const sendMessage = async (content: string) => {
    // Add user message immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Add loading assistant message
    const assistantMessageId = (Date.now() + 1).toString();
    const loadingMessage: Message = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
      isLoading: true,
    };
    
    setMessages(prev => [...prev, loadingMessage]);
    setIsLoading(true);
    
    try {
      // In a real implementation, you'd send the message to the selected API
      // For now, we'll simulate a response after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Fake response based on the selected provider
      let responseContent = "I'm sorry, I don't have enough information to respond.";
      
      switch (selectedProvider) {
        case "openai":
          responseContent = "This is a simulated response from OpenAI. In a real implementation, we would send your query to OpenAI's API and return the response.";
          break;
        case "anthropic":
          responseContent = "This is a simulated response from Anthropic. In a real implementation, we would send your query to Anthropic's API and return the response.";
          break;
        case "cohere":
          responseContent = "This is a simulated response from Cohere. In a real implementation, we would send your query to Cohere's API and return the response.";
          break;
        case "huggingface":
          responseContent = "This is a simulated response from Hugging Face. In a real implementation, we would send your query to Hugging Face's API and return the response.";
          break;
      }
      
      // Update the loading message with the response
      setMessages(prev =>
        prev.map(msg =>
          msg.id === assistantMessageId
            ? { ...msg, content: responseContent, isLoading: false }
            : msg
        )
      );
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Update the loading message with an error
      setMessages(prev =>
        prev.map(msg =>
          msg.id === assistantMessageId
            ? { ...msg, content: "Sorry, there was an error processing your request. Please try again.", isLoading: false }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        isLoading,
        selectedProvider,
        setSelectedProvider,
        availableProviders,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
