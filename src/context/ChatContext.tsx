
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuid } from "uuid";

// Define the message type
export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant" | "system";
  createdAt: Date;
}

// Define provider types
export type ApiKeyProvider = "openai" | "anthropic" | "google" | "hugging face" | "cohere";

interface ChatContextType {
  messages: Message[];
  addMessage: (content: string, role: "user" | "assistant" | "system") => void;
  clearMessages: () => void;
  isLoading: boolean;
  selectedProvider: ApiKeyProvider | null;
  setSelectedProvider: (provider: ApiKeyProvider | null) => void;
  availableProviders: ApiKeyProvider[];
}

const initialMessages: Message[] = [];

const ChatContext = createContext<ChatContextType>({
  messages: initialMessages,
  addMessage: () => {},
  clearMessages: () => {},
  isLoading: false,
  selectedProvider: null,
  setSelectedProvider: () => {},
  availableProviders: [],
});

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedProvider, setSelectedProvider] = useState<ApiKeyProvider | null>(null);
  const [availableProviders, setAvailableProviders] = useState<ApiKeyProvider[]>([]);

  const addMessage = (content: string, role: "user" | "assistant" | "system") => {
    const message: Message = {
      id: uuid(),
      content,
      role,
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, message]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        const { data, error } = await supabase.from("api_keys").select("*");
        
        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          // Extract available providers based on table structure
          // The table structure might vary, so we check for keys that contain valid API keys
          const providers: ApiKeyProvider[] = [];
          
          for (const row of data) {
            // Check each provider column in the row
            if (row.openai && row.openai.trim() !== '') {
              providers.push('openai');
            }
            if (row.anthropic && row.anthropic.trim() !== '') {
              providers.push('anthropic');
            }
            if (row.google && row.google.trim() !== '') {
              providers.push('google');
            }
            if (row["hugging face"] && row["hugging face"].trim() !== '') {
              providers.push('hugging face');
            }
            if (row.cohere && row.cohere.trim() !== '') {
              providers.push('cohere');
            }
          }
          
          // Remove duplicates
          const uniqueProviders = [...new Set(providers)];
          setAvailableProviders(uniqueProviders);
          
          // Select the first provider by default if none is selected
          if (!selectedProvider && uniqueProviders.length > 0) {
            setSelectedProvider(uniqueProviders[0]);
          }
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
  }, [selectedProvider]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        clearMessages,
        isLoading,
        selectedProvider,
        setSelectedProvider,
        availableProviders,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);
