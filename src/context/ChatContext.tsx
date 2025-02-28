
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { ApiKeyProvider } from "@/lib/types";
import { toast } from "sonner";

// Updated structure to reflect the actual database schema
interface ApiKey {
  id?: string;
  user_id?: string;
  api_key?: string;
  provider?: ApiKeyProvider;
  created_at?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  isLoading?: boolean;
}

interface ChatContextProps {
  messages: ChatMessage[];
  sendMessage: (content: string) => void;
  clearMessages: () => void;
  isLoading: boolean;
  availableProviders: ApiKeyProvider[];
  selectedProvider: ApiKeyProvider | null;
  setSelectedProvider: (provider: ApiKeyProvider) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [availableProviders, setAvailableProviders] = useState<ApiKeyProvider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<ApiKeyProvider | null>(null);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);

  // Fetch API keys from Supabase
  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        const { data, error } = await supabase.from("api_keys").select("*");
        if (error) throw error;

        if (data && data.length > 0) {
          setApiKeys(data as ApiKey[]);
          
          // Create list of providers with valid keys
          const providers: ApiKeyProvider[] = [];
          data.forEach((key: ApiKey) => {
            if (key.provider && key.api_key) {
              providers.push(key.provider);
            }
          });
          
          setAvailableProviders(providers);
          
          // Set first provider as default if available
          if (providers.length > 0 && !selectedProvider) {
            setSelectedProvider(providers[0]);
          }
        }
      } catch (error: any) {
        console.error("Error fetching API keys:", error.message);
      }
    };

    fetchApiKeys();
  }, []);

  const clearMessages = () => {
    setMessages([]);
  };

  const sendMessage = async (content: string) => {
    if (!selectedProvider) {
      toast.error("Please select an AI provider first");
      return;
    }

    // Add user message
    const userMessage: ChatMessage = {
      id: uuidv4(),
      content,
      role: "user",
    };

    // Add loading assistant message
    const loadingMessage: ChatMessage = {
      id: uuidv4(),
      content: "",
      role: "assistant",
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setIsLoading(true);

    try {
      // Simulate AI response - in a real app you would call an API here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Convert loading message to actual message
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessage.id
            ? {
                ...msg,
                content: `This is a response from the ${selectedProvider} AI model. Your message was: "${content}"`,
                isLoading: false,
              }
            : msg
        )
      );
    } catch (error: any) {
      console.error("Error sending message:", error);
      
      // Convert loading message to error message
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessage.id
            ? {
                ...msg,
                content: "Sorry, there was an error processing your message.",
                isLoading: false,
              }
            : msg
        )
      );
      
      toast.error("Failed to get a response");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        clearMessages,
        isLoading,
        availableProviders,
        selectedProvider,
        setSelectedProvider,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
